import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MetricCard } from '@/types/report';

interface Props {
  metrics: MetricCard[];
  brandName?: string;
}

export default function MetricCardSection({ metrics }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <SingleMetricCard metric={metric} />
        </motion.div>
      ))}
    </div>
  );
}

function SingleMetricCard({ metric }: { metric: MetricCard }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = metric.details || metric.assistant_breakdown || metric.evidence;

  return (
    <div className="card-surface flex h-full flex-col p-5">
      <h3 className="text-sm font-medium text-foreground">{metric.title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{metric.subtitle}</p>

      <div className="mt-4">
        <div className="metric-large">{metric.metric_value}</div>
        <div className="mt-1 text-xs text-muted-foreground">{metric.metric_label}</div>
        {metric.metric_support && (
          <p className="mt-1.5 text-xs text-muted-foreground">{metric.metric_support}</p>
        )}
      </div>

      {metric.insight && (
        <p className="mt-3 rounded-md border border-border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          {metric.insight}
        </p>
      )}

      {hasDetails && (
        <div className="mt-auto pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-between text-xs font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            <span>{expanded ? 'Hide' : 'View'} {metric.detail_label || 'details'}</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2 border-t border-border pt-3">
                  {metric.details && Array.isArray(metric.details) && metric.details.map((d: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{d.name || d.model || d.question}</span>
                      <span className="font-medium text-foreground">{d.value || d.answer || ''}</span>
                    </div>
                  ))}

                  {metric.proof_line && (
                    <p className="text-xs text-muted-foreground">{metric.proof_line}</p>
                  )}
                  {metric.top_rival_line && (
                    <p className="text-xs font-medium text-foreground">{metric.top_rival_line}</p>
                  )}

                  {metric.assistant_breakdown && metric.assistant_breakdown.map((ab, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-medium text-foreground">{ab.model}: </span>
                      <span className="text-muted-foreground">
                        {ab.competitors.map(c => `${c.name} (${c.count})`).join(', ')}
                      </span>
                    </div>
                  ))}

                  {metric.evidence && metric.evidence.map((ev, idx) => (
                    <div key={idx} className="rounded-md border border-border p-2.5 text-xs">
                      <div className="font-medium text-foreground">{ev.model} — {ev.question}</div>
                      <p className="mt-1 text-muted-foreground line-clamp-3">{ev.answer}</p>
                      {ev.competitors_found.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {ev.competitors_found.map(c => (
                            <span key={c} className="rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-foreground">{c}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
