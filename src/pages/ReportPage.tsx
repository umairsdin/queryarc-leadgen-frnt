import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRun } from '@/lib/api';
import { CanonicalReport } from '@/types/report';
import ReportHeader from '@/components/report/ReportHeader';
import LoadingState from '@/components/report/LoadingState';
import FailedState from '@/components/report/FailedState';
import MetricCardSection from '@/components/report/MetricCardSection';
import WhatThisMeansSection from '@/components/report/WhatThisMeansSection';
import ActionSectionBlock from '@/components/report/ActionSectionBlock';
import ProofSection from '@/components/report/ProofSection';

export default function ReportPage() {
  const { run_id } = useParams<{ run_id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<CanonicalReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const poll = useCallback(async () => {
    if (!run_id) return;
    try {
      const result = await fetchRun(run_id);
      console.log('Canonical response:', result.report_state, result.readiness);
      setReport(result);
      setError(null);
      return result;
    } catch (err) {
      console.error('Poll error:', err);
      setError('Failed to load report.');
      return null;
    }
  }, [run_id]);

  const startPolling = useCallback(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const doPoll = async () => {
      const result = await poll();
      if (cancelled) return;
      if (result && !result.readiness?.is_terminal) {
        timer = setTimeout(doPoll, 3000);
      }
    };
    doPoll();

    return () => { cancelled = true; clearTimeout(timer); };
  }, [poll]);

  useEffect(() => {
    const cleanup = startPolling();
    return cleanup;
  }, [startPolling]);

  const handleRetry = useCallback(() => {
    setError(null);
    setReport(null);
    const cleanup = startPolling();
    // Cleanup on next retry or unmount handled by effect
    return cleanup;
  }, [startPolling]);

  const reportState = report?.report_state;
  const isLoading = !report || reportState === 'queued' || reportState === 'processing';
  const isFailed = reportState === 'failed' || !!error;
  const canRender = report?.readiness?.is_ready_for_render === true;
  const sec = report?.sections;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header: gated by sections.header */}
        {(!sec || sec.header !== false) && (
          <ReportHeader report={report} />
        )}

        <AnimatePresence mode="wait">
          {/* Progress block: gated by sections.progress */}
          {isLoading && !isFailed && (!sec || sec.progress !== false) && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState
                reportState={reportState}
                stageLabel={report?.progress?.stage_label}
                message={report?.progress?.message}
              />
            </motion.div>
          )}

          {/* Failed state with retry */}
          {isFailed && (
            <motion.div key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FailedState
                message={error || report?.run?.error_message || report?.errors?.message || 'Run failed.'}
                code={report?.errors?.code}
                onBack={() => navigate('/ai-visibility')}
                onRetry={handleRetry}
              />
            </motion.div>
          )}

          {/* Main report: render only when readiness.is_ready_for_render === true */}
          {canRender && report && (
            <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Metric cards */}
              <MetricCardSection report={report} />

              {/* What this means */}
              {sec?.what_this_means !== false && report.narratives?.what_this_means && (
                <WhatThisMeansSection data={report.narratives.what_this_means} />
              )}

              {/* CTA / Action block */}
              {(sec?.primary_cta !== false || sec?.final_cta !== false) && report.narratives?.action_oriented && (
                <ActionSectionBlock
                  action={report.narratives.action_oriented}
                  ctaSubline={report.narratives.cta_subline}
                />
              )}

              {/* Proof from snapshot */}
              {sec?.proof_from_snapshot !== false && (report.data?.questions || report.data?.model_answers) && (
                <ProofSection
                  questions={report.data.questions}
                  modelAnswers={report.data.model_answers}
                  brandName={report.input.brand_name}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
