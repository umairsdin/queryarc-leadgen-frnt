import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, Loader2, ExternalLink } from 'lucide-react';
import {
  CanonicalReport, CompetitorPresenceCard,
  PiggybackRow, EvidenceResource
} from '@/types/report';

interface Props {
  report: CanonicalReport;
}

function isEvidenceAvailable(evidence?: EvidenceResource) {
  return (
    evidence?.ready === true &&
    evidence?.state === 'ready' &&
    !!evidence?.url_template
  );
}

export default function CompetitorCard({ report }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState<string | null>(null);
  const [loadingEvidence, setLoadingEvidence] = useState<string | null>(null);

  const cp: CompetitorPresenceCard | undefined = report.data?.competitor_presence_card as CompetitorPresenceCard | undefined;
  const fallback = report.metrics?.competitor_piggyback_rate;
  const overall = cp?.piggyback_overall ?? fallback;
  const evidence = report.resources?.evidence;
  const evidenceReady = isEvidenceAvailable(evidence);

  if (!overall) return null;

  const pct = overall.percent != null ? Math.round(overall.percent) : Math.round((overall.pct ?? 0) * 100);
  const count = overall.count ?? overall.num ?? 0;
  const topRival = cp?.top_rival ?? fallback?.top_rival;
  const rows = cp?.rows ?? fallback?.rows;

  const handleEvidenceClick = (model: string, competitor: string) => {
    if (!evidenceReady || !evidence?.url_template) return;

    const cellKey = `${model}::${competitor}`;

    // Toggle: clicking same cell closes it
    if (activeEvidence === cellKey) {
      setActiveEvidence(null);
      return;
    }

    setLoadingEvidence(cellKey);
    // Build evidence URL from template
    const url = evidence.url_template
      .replace('{model}', encodeURIComponent(model))
      .replace('{competitor}', encodeURIComponent(competitor));

    // Simulate brief loading then show
    setTimeout(() => {
      setActiveEvidence(cellKey);
      setLoadingEvidence(null);
      window.open(url, '_blank', 'noopener');
    }, 400);
  };

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
          <div className="mt-auto pt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span>{expanded ? 'Hide' : 'View'} competitor details</span>
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
                  <div className="mt-2 space-y-3 border-t border-border pt-3">
                    {rows.map((row: PiggybackRow, i: number) => {
                      const rowPct = row.piggyback_pct > 1 ? Math.round(row.piggyback_pct) : Math.round(row.piggyback_pct * 100);
                      return (
                        <div key={i} className="text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{row.model}</span>
                            <span className="text-muted-foreground tabular-nums">{rowPct}%</span>
                          </div>
                          {Object.entries(row.competitor_pct).some(([, v]) => v > 0) && (
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {Object.entries(row.competitor_pct).map(([name, val]) => {
                                const v = val as number;
                                const cellPct = v > 1 ? Math.round(v) : Math.round(v * 100);
                                const cellKey = `${row.model}::${name}`;
                                const isActive = activeEvidence === cellKey;
                                const isLoading = loadingEvidence === cellKey;
                                const isClickable = v > 0 && evidenceReady;
                                const isDisabled = v === 0 || !evidenceReady;

                                if (v === 0) {
                                  return (
                                    <span
                                      key={name}
                                      className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground/50 cursor-not-allowed"
                                      title="No competitor mentions"
                                    >
                                      {name}: {cellPct}%
                                    </span>
                                  );
                                }

                                return (
                                  <button
                                    key={name}
                                    onClick={() => handleEvidenceClick(row.model, name)}
                                    disabled={isLoading || isDisabled}
                                    className={`rounded px-1.5 py-0.5 transition-all inline-flex items-center gap-1 ${
                                      isActive
                                        ? 'bg-metric-red/20 text-metric-red ring-1 ring-metric-red/30'
                                        : isClickable
                                        ? 'bg-muted text-muted-foreground hover:bg-metric-red/10 hover:text-metric-red cursor-pointer'
                                        : 'bg-muted text-muted-foreground/50 cursor-not-allowed'
                                    } ${isLoading ? 'opacity-60' : ''}`}
                                    title={isClickable ? `View evidence: ${name} in ${row.model}` : 'Evidence not available'}
                                  >
                                    {isLoading && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
                                    {name}: {cellPct}%
                                    {isClickable && !isLoading && <ExternalLink className="h-2.5 w-2.5 opacity-50" />}
                                  </button>
                                );
                              })}
                            </div>
                          )}
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
