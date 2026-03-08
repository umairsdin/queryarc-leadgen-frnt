import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Eye, Users, Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  CanonicalReport, CompetitorVisibilityItem,
  PiggybackRow, OpportunityEvent, CompetitorPresenceCard
} from '@/types/report';

interface Props {
  report: CanonicalReport;
}

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

export default function MetricCardSection({ report }: Props) {
  const sec = report.sections;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sec.brand_visibility_card && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
          <VisibilityCard report={report} />
        </motion.div>
      )}
      {sec.competitor_presence_card && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <CompetitorCard report={report} />
        </motion.div>
      )}
      {sec.open_opportunity_card && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
          <OpportunityCard report={report} />
        </motion.div>
      )}
    </div>
  );
}

function VisibilityCard({ report }: { report: CanonicalReport }) {
  const [expanded, setExpanded] = useState(false);
  const vr = report.metrics?.visibility_rate;
  const cv = report.metrics?.competitor_visibility;
  const topInsight = report.narratives?.top_insight;
  if (!vr) return null;

  const TrendIcon = getTrendIcon(vr.percent);

  return (
    <div className="card-surface flex h-full flex-col overflow-hidden">
      {/* Colored top bar */}
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

        {/* Visual bar */}
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

function CompetitorCard({ report }: { report: CanonicalReport }) {
  const [expanded, setExpanded] = useState(false);
  const cp: CompetitorPresenceCard | undefined = report.data?.competitor_presence_card as CompetitorPresenceCard | undefined;
  const fallback = report.metrics?.competitor_piggyback_rate;
  const overall = cp?.piggyback_overall ?? fallback;
  if (!overall) return null;

  // API may send percent (already 0-100) or pct (0-1 fraction)
  const pct = overall.percent != null ? Math.round(overall.percent) : Math.round((overall.pct ?? 0) * 100);
  const count = overall.count ?? overall.num ?? 0;
  const topRival = cp?.top_rival ?? fallback?.top_rival;
  const rows = cp?.rows ?? fallback?.rows;

  return (
    <div className="card-surface flex h-full flex-col overflow-hidden">
      <div className={`h-1 w-full ${pct >= 50 ? 'bg-metric-red' : pct >= 25 ? 'bg-metric-amber' : 'bg-metric-green'}`} />
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Competitor presence</h3>
          </div>
          {pct >= 50 && (
            <span className="rounded-full bg-metric-red/10 px-2 py-0.5 text-[10px] font-semibold text-metric-red">
              High risk
            </span>
          )}
        </div>

        <div className="mt-5">
          <div className={`text-4xl font-bold tracking-tight ${pct >= 50 ? 'text-metric-red' : pct >= 25 ? 'text-metric-amber' : 'text-metric-green'}`}>
            {pct}%
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {count} of {overall.denom} eligible answers include a competitor
          </p>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`h-full rounded-full ${pct >= 50 ? 'bg-metric-red' : pct >= 25 ? 'bg-metric-amber' : 'bg-metric-green'}`}
          />
        </div>

        {topRival && (
          <div className="mt-4 rounded-lg bg-surface-highlight px-3 py-2.5 text-xs">
            <span className="text-muted-foreground">Top rival: </span>
            <span className="font-semibold text-foreground">{topRival.competitor}</span>
            <span className="text-muted-foreground"> — in {topRival.assistants_count}/{topRival.assistants_denom} assistants</span>
          </div>
        )}

        {rows && rows.length > 0 && (
          <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="model breakdown">
            {rows.map((row: PiggybackRow, i: number) => (
              <div key={i} className="text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{row.model}</span>
                  <span className="text-muted-foreground tabular-nums">{Math.round(row.piggyback_pct * 100)}%</span>
                </div>
                {Object.entries(row.competitor_pct).some(([, v]) => v > 0) && (
                  <div className="mt-0.5 flex flex-wrap gap-1.5 text-muted-foreground">
                    {Object.entries(row.competitor_pct).filter(([, v]) => v > 0).map(([name, val]) => (
                      <span key={name} className="rounded bg-muted px-1.5 py-0.5">{name}: {Math.round((val as number) * 100)}%</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </ExpandableDetails>
        )}
      </div>
    </div>
  );
}

function OpportunityCard({ report }: { report: CanonicalReport }) {
  const [expanded, setExpanded] = useState(false);
  const or = report.metrics?.open_opportunity_rate;
  const events = report.data?.opportunity_events;
  const breakdown = report.data?.opportunity_model_breakdown as Record<string, number> | undefined
    ?? report.metrics?.opportunity_model_breakdown;
  if (!or) return null;

  return (
    <div className="card-surface flex h-full flex-col overflow-hidden">
      <div className="h-1 w-full bg-metric-blue" />
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Open opportunity</h3>
          </div>
          {or.percent > 0 && (
            <span className="rounded-full bg-metric-blue/10 px-2 py-0.5 text-[10px] font-semibold text-metric-blue">
              {or.count} unclaimed
            </span>
          )}
        </div>

        <div className="mt-5">
          <div className="text-4xl font-bold tracking-tight text-metric-blue">
            {or.percent}%
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {or.count} of {or.total} answers mention no brand
          </p>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${or.percent}%` }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-full rounded-full bg-metric-blue"
          />
        </div>

        {(breakdown || events) && (
          <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="details">
            {breakdown && Object.entries(breakdown).map(([model, count]) => (
              <div key={model} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{model}</span>
                <span className="font-semibold text-foreground tabular-nums">{count as number} open</span>
              </div>
            ))}
            {events && events.length > 0 && (
              <div className="mt-2 space-y-2 border-t border-border pt-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Open answers</p>
                {events.map((ev: OpportunityEvent, i: number) => (
                  <div key={i} className="rounded-lg bg-surface-highlight p-2.5 text-xs">
                    <div className="font-medium text-foreground">{ev.model}</div>
                    <p className="mt-0.5 text-muted-foreground line-clamp-2">{ev.buyer_label}</p>
                  </div>
                ))}
              </div>
            )}
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
