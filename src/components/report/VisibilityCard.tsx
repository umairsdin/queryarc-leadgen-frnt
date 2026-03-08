import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CanonicalReport, CompetitorVisibilityItem } from '@/types/report';

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

  const TrendIcon = getTrendIcon(vr.percent);

  return (
    <div className="card-surface flex h-full flex-col overflow-hidden">
      <div className={`h-1 w-full ${vr.percent >= 60 ? 'bg-metric-green' : vr.percent >= 30 ? 'bg-metric-amber' : 'bg-metric-red'}`} />
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Brand visibility</h3>
          </div>
          <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${getVisibilityBg(vr.percent)} ${getVisibilityColor(vr.percent)}`}>
            <TrendIcon className="h-3 w-3" />
            {vr.percent >= 60 ? 'Strong' : vr.percent >= 30 ? 'Moderate' : 'Low'}
          </div>
        </div>

        <div className="mt-5">
          <div className={`text-4xl font-bold tracking-tight ${getVisibilityColor(vr.percent)}`}>
            {vr.percent}%
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {vr.count} of {vr.denom ?? vr.total} answers mention {report.input.brand_name}
          </p>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${vr.percent}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`h-full rounded-full ${vr.percent >= 60 ? 'bg-metric-green' : vr.percent >= 30 ? 'bg-metric-amber' : 'bg-metric-red'}`}
          />
        </div>

        {topInsight && (
          <p className="mt-4 rounded-lg bg-surface-highlight px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
            {topInsight}
          </p>
        )}

        {cv && cv.length > 0 && (
          <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="competitor visibility">
            {cv.map((c: CompetitorVisibilityItem, i: number) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{c.brand}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-foreground/30" style={{ width: `${c.percent}%` }} />
                  </div>
                  <span className="font-semibold text-foreground tabular-nums w-8 text-right">{c.percent}%</span>
                </div>
              </div>
            ))}
          </ExpandableDetails>
        )}
      </div>
    </div>
  );
}

function ExpandableDetails({ expanded, onToggle, label, children }: {
  expanded: boolean;
  onToggle: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-auto pt-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <span>{expanded ? 'Hide' : 'View'} {label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
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
            <div className="mt-2 space-y-2.5 border-t border-border pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
