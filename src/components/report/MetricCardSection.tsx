import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Eye, Users, Target } from 'lucide-react';
import {
  ReportMetrics, ReportSections, CompetitorVisibilityItem,
  PiggybackRow, OpportunityEvent
} from '@/types/report';

interface Props {
  metrics: ReportMetrics;
  sections: ReportSections;
  brandName: string;
  topInsight?: string;
  opportunityEvents?: OpportunityEvent[];
}

export default function MetricCardSection({ metrics, sections, brandName, topInsight, opportunityEvents }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {sections.show_visibility_card !== false && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <VisibilityCard metrics={metrics} brandName={brandName} topInsight={topInsight} />
        </motion.div>
      )}
      {sections.show_competitor_card && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <CompetitorCard metrics={metrics} />
        </motion.div>
      )}
      {sections.show_opportunity_card && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <OpportunityCard metrics={metrics} opportunityEvents={opportunityEvents} />
        </motion.div>
      )}
    </div>
  );
}

function VisibilityCard({ metrics, brandName, topInsight }: { metrics: ReportMetrics; brandName: string; topInsight?: string }) {
  const [expanded, setExpanded] = useState(false);
  const vr = metrics.visibility_rate;
  const cv = metrics.competitor_visibility;

  return (
    <div className="card-surface flex h-full flex-col p-5">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Brand visibility</h3>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">How often AI assistants mention your brand</p>

      <div className="mt-4">
        <div className="metric-large">{vr.percent}%</div>
        <div className="mt-1 text-xs text-muted-foreground">{vr.count} of {vr.total} answers mention {brandName}</div>
      </div>

      {topInsight && (
        <p className="mt-3 rounded-md border border-border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          {topInsight}
        </p>
      )}

      {cv && cv.length > 0 && (
        <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="competitor visibility">
          {cv.map((c: CompetitorVisibilityItem, i: number) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{c.brand}</span>
              <span className="font-medium text-foreground">{c.percent}%</span>
            </div>
          ))}
        </ExpandableDetails>
      )}
    </div>
  );
}

function CompetitorCard({ metrics }: { metrics: ReportMetrics }) {
  const [expanded, setExpanded] = useState(false);
  const cp = metrics.competitor_piggyback_rate;
  if (!cp) return null;

  const pct = Math.round(cp.pct * 100);

  return (
    <div className="card-surface flex h-full flex-col p-5">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Competitor presence</h3>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">Competitors appearing alongside your brand</p>

      <div className="mt-4">
        <div className="metric-large">{pct}%</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {cp.num} of {cp.denom} eligible answers include a competitor
        </div>
      </div>

      {cp.top_rival && (
        <p className="mt-3 rounded-md border border-border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          Top rival: <span className="font-medium text-foreground">{cp.top_rival.competitor}</span> — appears in {cp.top_rival.assistants_count} of {cp.top_rival.assistants_denom} assistants
        </p>
      )}

      {cp.rows && cp.rows.length > 0 && (
        <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="model breakdown">
          {cp.rows.map((row: PiggybackRow, i: number) => (
            <div key={i} className="text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{row.model}</span>
                <span className="text-muted-foreground">{Math.round(row.piggyback_pct * 100)}% piggyback</span>
              </div>
              {Object.entries(row.competitor_pct).some(([, v]) => v > 0) && (
                <div className="mt-0.5 flex flex-wrap gap-1.5 text-muted-foreground">
                  {Object.entries(row.competitor_pct).filter(([, v]) => v > 0).map(([name, val]) => (
                    <span key={name}>{name}: {Math.round((val as number) * 100)}%</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ExpandableDetails>
      )}
    </div>
  );
}

function OpportunityCard({ metrics, opportunityEvents }: { metrics: ReportMetrics; opportunityEvents?: OpportunityEvent[] }) {
  const [expanded, setExpanded] = useState(false);
  const or = metrics.open_opportunity_rate;

  return (
    <div className="card-surface flex h-full flex-col p-5">
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Open opportunity</h3>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">Answers where no brand is recommended</p>

      <div className="mt-4">
        <div className="metric-large">{or.percent}%</div>
        <div className="mt-1 text-xs text-muted-foreground">{or.count} of {or.total} answers mention no brand</div>
      </div>

      {(metrics.opportunity_model_breakdown || opportunityEvents) && (
        <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="model breakdown">
          {metrics.opportunity_model_breakdown && Object.entries(metrics.opportunity_model_breakdown).map(([model, count]) => (
            <div key={model} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{model}</span>
              <span className="font-medium text-foreground">{count as number} open</span>
            </div>
          ))}

          {opportunityEvents && opportunityEvents.length > 0 && (
            <div className="mt-2 space-y-2 border-t border-border pt-2">
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Open answers</p>
              {opportunityEvents.map((ev, i) => (
                <div key={i} className="rounded-md border border-border p-2.5 text-xs">
                  <div className="font-medium text-foreground">{ev.model}</div>
                  <p className="mt-0.5 text-muted-foreground line-clamp-2">{ev.buyer_label}</p>
                </div>
              ))}
            </div>
          )}
        </ExpandableDetails>
      )}
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
        className="flex w-full items-center justify-between text-xs font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        <span>{expanded ? 'Hide' : 'View'} {label}</span>
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
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
