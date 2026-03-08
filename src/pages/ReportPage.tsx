import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRun } from '@/lib/api';
import { ReportData } from '@/types/report';
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
  const [data, setData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const poll = useCallback(async () => {
    if (!run_id) return;
    try {
      const result = await fetchRun(run_id);
      console.log('API response status:', result.status, 'keys:', Object.keys(result));
      setData(result);
      return result.status;
    } catch (err) {
      console.error('Poll error:', err);
      setError('Failed to load report.');
      return 'failed';
    }
  }, [run_id]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const doPoll = async () => {
      const status = await poll();
      if (cancelled) return;
      if (status === 'pending' || status === 'running') {
        timer = setTimeout(doPoll, 3000);
      }
    };
    doPoll();

    return () => { cancelled = true; clearTimeout(timer); };
  }, [poll]);

  const isLoading = !data || data.status === 'pending' || data.status === 'running';
  const isFailed = data?.status === 'failed' || !!error;
  const isComplete = data?.status === 'complete';

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ReportHeader data={data} />

        <AnimatePresence mode="wait">
          {isLoading && !isFailed && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState status={data?.status} />
            </motion.div>
          )}

          {isFailed && (
            <motion.div key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FailedState
                message={error || data?.error_message || 'Run failed.'}
                onBack={() => navigate('/ai-visibility')}
              />
            </motion.div>
          )}

          {isComplete && data && (
            <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {data.visibility_rate && (
                <MetricCardSection data={data} />
              )}

              {data.what_this_means && (
                <WhatThisMeansSection data={data.what_this_means} />
              )}

              {data.action_oriented && (
                <ActionSectionBlock
                  action={data.action_oriented}
                  ctaSubline={data.cta_subline}
                />
              )}

              {(data.questions || data.model_answers) && (
                <ProofSection
                  questions={data.questions}
                  modelAnswers={data.model_answers}
                  brandName={data.brand_name}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
