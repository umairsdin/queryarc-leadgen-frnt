import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Target } from 'lucide-react';
import { CanonicalReport, OpportunityEvent } from '@/types/report';
import { displayPercent } from '@/lib/display-metrics';

interface Props {
  report: CanonicalReport;
}

export default function OpportunityCard({ report }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const or = report.metrics?.open_opportunity_rate;
  const events = report.data?.opportunity_events;
  const breakdown = report.data?.opportunity_model_breakdown as Record<string, number> | undefined
    ?? report.metrics?.opportunity_model_breakdown;
  if (!or) return null;
  const pct = displayPercent(or);

  const handleEventToggle = (index: number) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  return (
    <div className="card-surface flex h-full flex-col overflow-hidden">
      <div className="h-1.5 w-full bg-metric-blue" />
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Target className="h-4 w-4 text-foreground" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Open opportunity</h3>
          </div>
          {(or.count ?? 0) > 0 && (
            <span className="rounded-full bg-metric-blue/10 px-2.5 py-1 text-[11px] font-semibold text-metric-blue">
              {or.count} unclaimed
            </span>
          )}
        </div>

        <div className="mt-6">
          <div className="text-4xl font-bold tracking-tight text-metric-blue">
            {pct}%
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {or.count} of {or.denom ?? or.total} answers mention no brand
          </p>
        </div>

        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-full rounded-full bg-metric-blue"
          />
        </div>

        {(breakdown || events) && (
          <div className="mt-auto pt-5">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              <span>{expanded ? 'Hide' : 'View'} opportunity details</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-3 border-t border-border pt-4">
                    {breakdown && Object.entries(breakdown).map(([model, count]) => (
                      <div key={model} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{model}</span>
                        <span className="font-semibold text-foreground tabular-nums">{count as number} open</span>
                      </div>
                    ))}
                    {events && events.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-border pt-3">
                        <p className="text-label mb-2">Open answers</p>
                        {events.map((ev: OpportunityEvent, i: number) => {
                          const isOpen = expandedEvent === i;
                          return (
                            <div key={i} className="rounded-lg border border-border overflow-hidden">
                              <button
                                onClick={() => handleEventToggle(i)}
                                className="flex w-full items-center gap-2.5 p-3 text-sm text-left transition-colors hover:bg-secondary/50"
                              >
                                <ChevronRight className={`h-3.5 w-3.5 shrink-0 text-metric-blue transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                                <div className="min-w-0 flex-1">
                                  <span className="font-semibold text-foreground">{ev.model}</span>
                                  <span className="text-muted-foreground"> — </span>
                                  <span className="text-muted-foreground line-clamp-1">{ev.buyer_label}</span>
                                </div>
                              </button>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="border-t border-border bg-secondary/50 p-4 space-y-3">
                                      {ev.buyer_question && (
                                        <div>
                                          <p className="text-label mb-1.5">Question</p>
                                          <p className="text-sm text-foreground leading-relaxed">{ev.buyer_question}</p>
                                        </div>
                                      )}
                                      {ev.answer_text && (
                                        <div>
                                          <p className="text-label mb-1.5">Answer</p>
                                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{ev.answer_text}</p>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
