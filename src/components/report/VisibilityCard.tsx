import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CanonicalReport, CompetitorVisibilityItem } from '@/types/report';
import { displayPercent } from '@/lib/display-metrics';

function getVisibilityColor(percent: number) {
  if (percent >= 60) return 'text-metric-green';
  if (percent >= 30) return 'text-metric-amber';
  return 'text-metric-red';
}

function getVisibilityBg(percent: number) {
  if (percent >= 60) return 'bg-metric-green/10';
  if (percent >= 30) return 'bg-metric-amber/10';
  return 'bg-metric-red/10';
}

function getBarBg(percent: number) {
  if (percent >= 60) return 'bg-metric-green';
  if (percent >= 30) return 'bg-metric-amber';
  return 'bg-metric-red';
}

function getTrendIcon(percent: number) {
  if (percent >= 60) return TrendingUp;
  if (percent >= 30) return Minus;
  return TrendingDown;
}

export default function VisibilityCard({ report }: { report: CanonicalReport }) {
  const [expanded, setExpanded] = useState(false);
  const vr = report.metrics?.visibility_rate;
  const cv = report.metrics?.competitor_visibility;
  const topInsight = report.narratives?.top_insight;
  if (!vr) return null;

  const pct = displayPercent(vr);
  const TrendIcon = getTrendIcon(pct);

  return (
    <div className="card-surface flex h-full flex-col overflow-hidden">
      <div className={`h-1.5 w-full ${getBarBg(pct)}`} />
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Eye className="h-4 w-4 text-foreground" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Brand visibility</h3>
          </div>
          <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getVisibilityBg(pct)} ${getVisibilityColor(pct)}`}>
            <TrendIcon className="h-3 w-3" />
            {pct >= 60 ? 'Strong' : pct >= 30 ? 'Moderate' : 'Low'}
          </div>
        </div>

        <div className="mt-6">
          <div className={`text-4xl font-bold tracking-tight ${getVisibilityColor(pct)}`}>
            {pct}%
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {vr.count} of {vr.denom ?? vr.total} answers mention {report.input.brand_name}
          </p>
        </div>

        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`h-full rounded-full ${getBarBg(pct)}`}
          />
        </div>

        {topInsight && (
          <p className="mt-5 rounded-lg bg-secondary border border-border p-3 text-sm leading-relaxed text-muted-foreground">
            {topInsight}
          </p>
        )}

        {cv && cv.length > 0 && (
          <div className="mt-auto pt-5">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              <span>{expanded ? 'Hide' : 'View'} competitor visibility</span>
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
                    {cv.map((c: CompetitorVisibilityItem, i: number) => {
                      const cPct = displayPercent(c);
                      return (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{c.brand}</span>
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
                              <div className="h-full rounded-full bg-foreground/20" style={{ width: `${cPct}%` }} />
                            </div>
                            <span className="font-semibold text-foreground tabular-nums w-10 text-right">{cPct}%</span>
                          </div>
                        </div>
                      );
                    })}
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
