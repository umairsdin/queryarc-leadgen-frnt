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
      setData(result);
      return result.status;
    } catch {
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

  const isLoading = data?.status === 'pending' || data?.status === 'running';
  const isFailed = data?.status === 'failed' || !!error;
  const isComplete = data?.status === 'complete';

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ReportHeader data={data} />

        <AnimatePresence mode="wait">
          {isLoading && !error && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState status={data?.status} />
            </motion.div>
          )}

          {isFailed && (
            <motion.div key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FailedState
                message={error || data?.failed_message || 'Run failed.'}
                onBack={() => navigate('/ai-visibility')}
              />
            </motion.div>
          )}

          {isComplete && data && (
            <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Metric Cards */}
              {data.metrics && data.metrics.length > 0 && (
                <MetricCardSection metrics={data.metrics} brandName={data.brand_name} />
              )}

              {/* What This Means */}
              {data.what_this_means && (
                <WhatThisMeansSection data={data.what_this_means} />
              )}

              {/* Action Sections */}
              {data.action_sections && data.action_sections.map((action, i) => (
                <ActionSectionBlock key={i} action={action} isFirst={i === 0} ctaSubline={i > 0 ? data.cta_subline : undefined} />
              ))}

              {/* Proof / Model Answers */}
              {(data.questions_tested || data.model_answers) && (
                <ProofSection
                  questionsTested={data.questions_tested}
                  modelAnswers={data.model_answers}
                  highlights={data.highlights}
                  brandName={data.brand_name}
                />
              )}

              {/* Loom Strip */}
              {data.loom_url && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="card-premium mt-8 p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-foreground">{data.loom_title || 'Watch: how to read this report'}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{data.loom_helper || 'See how to interpret the cards and what to do next.'}</p>
                    </div>
                    <div className="aspect-video w-full overflow-hidden rounded-lg sm:w-72">
                      <iframe
                        src={data.loom_url}
                        title="Report walkthrough"
                        className="h-full w-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
