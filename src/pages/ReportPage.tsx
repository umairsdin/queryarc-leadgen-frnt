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
      return result;
    } catch (err) {
      console.error('Poll error:', err);
      setError('Failed to load report.');
      return null;
    }
  }, [run_id]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const doPoll = async () => {
      const result = await poll();
      if (cancelled) return;
      // Keep polling until readiness.is_terminal
      if (result && !result.readiness?.is_terminal) {
        timer = setTimeout(doPoll, 3000);
      }
    };
    doPoll();

    return () => { cancelled = true; clearTimeout(timer); };
  }, [poll]);

  const isLoading = !report || ['queued', 'processing'].includes(report.report_state);
  const isFailed = report?.report_state === 'failed' || !!error;
  const canRender = report?.readiness?.is_ready_for_render === true;
  const sections = report?.sections;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ReportHeader report={report} />

        <AnimatePresence mode="wait">
          {isLoading && !isFailed && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState status={report?.report_state} />
            </motion.div>
          )}

          {isFailed && (
            <motion.div key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FailedState
                message={error || report?.errors?.message || 'Run failed.'}
                onBack={() => navigate('/ai-visibility')}
              />
            </motion.div>
          )}

          {canRender && report && (
            <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {sections?.show_visibility_card !== false && report.metrics && (
                <MetricCardSection
                  metrics={report.metrics}
                  sections={sections!}
                  brandName={report.input.brand_name}
                  topInsight={report.narratives?.top_insight}
                  opportunityEvents={report.data?.opportunity_events}
                />
              )}

              {sections?.show_what_this_means && report.narratives?.what_this_means && (
                <WhatThisMeansSection data={report.narratives.what_this_means} />
              )}

              {sections?.show_action_block && report.narratives?.action_oriented && (
                <ActionSectionBlock
                  action={report.narratives.action_oriented}
                  ctaSubline={report.narratives.cta_subline}
                />
              )}

              {sections?.show_proof && (report.data?.questions || report.data?.model_answers) && (
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
