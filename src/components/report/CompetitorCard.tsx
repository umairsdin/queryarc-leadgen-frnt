import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, Loader2, Trophy } from 'lucide-react';
import {
  CanonicalReport, CompetitorPresenceCard,
  PiggybackRow, EvidenceResource
} from '@/types/report';

interface EvidenceExample {
  question_id: number;
  buyer_question: string;
  snippet: string;
  snippet_highlights: { start: number; end: number; type: string }[];
  answer_text: string;
  model: string;
}

interface EvidenceData {
  run_id: string;
  model: string;
  competitor: string;
  examples: EvidenceExample[];
}

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

function renderSnippetWithHighlights(text: string, highlights: { start: number; end: number; type: string }[]) {
  if (!highlights || highlights.length === 0) return <span>{text}</span>;

  const sorted = [...highlights].sort((a, b) => a.start - b.start);
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  sorted.forEach((h, i) => {
    if (h.start > cursor) {
      parts.push(<span key={`t-${i}`}>{text.slice(cursor, h.start)}</span>);
    }
    parts.push(
      <mark
        key={`h-${i}`}
        className={
          h.type === 'competitor'
            ? 'rounded bg-metric-red/15 px-0.5 font-semibold text-metric-red not-italic'
            : 'rounded bg-metric-green/15 px-0.5 font-semibold text-metric-green not-italic'
        }
      >
        {text.slice(h.start, h.end)}
      </mark>
    );
    cursor = h.end;
  });

  if (cursor < text.length) {
    parts.push(<span key="tail">{text.slice(cursor)}</span>);
  }

  return <>{parts}</>;
}

export default function CompetitorCard({ report }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState<string | null>(null);
  const [loadingEvidence, setLoadingEvidence] = useState<string | null>(null);
  const [evidenceData, setEvidenceData] = useState<EvidenceData | null>(null);

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

  const handleEvidenceClick = useCallback(async (model: string, competitor: string) => {
    if (!evidenceReady || !evidence?.url_template) return;

    const cellKey = `${model}::${competitor}`;

    // Toggle off if same cell
    if (activeEvidence === cellKey) {
      setActiveEvidence(null);
      setEvidenceData(null);
      return;
    }

    setLoadingEvidence(cellKey);
    setActiveEvidence(cellKey);
    setEvidenceData(null);

    try {
      const url = evidence.url_template
        .replace('{model}', encodeURIComponent(model))
        .replace('{competitor}', encodeURIComponent(competitor));

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch evidence');
      const data: EvidenceData = await res.json();
      setEvidenceData(data);
    } catch (err) {
      console.error('Evidence fetch error:', err);
      setEvidenceData({ run_id: '', model, competitor, examples: [] });
    } finally {
      setLoadingEvidence(null);
    }
  }, [activeEvidence, evidenceReady, evidence?.url_template]);

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
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-metric-red/8 border border-metric-red/15 px-3 py-2.5 text-xs">
            <Trophy className="h-3.5 w-3.5 text-metric-red shrink-0" />
            <div>
              <span className="text-muted-foreground">Most surfaced: </span>
              <span className="font-bold text-metric-red">{topRival.competitor}</span>
              <span className="text-muted-foreground"> — in {topRival.assistants_count}/{topRival.assistants_denom} assistants</span>
            </div>
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

                                if (v === 0) {
                                  return (
                                    <span
                                      key={name}
                                      className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground/40 cursor-not-allowed text-[11px]"
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
                                    disabled={isLoading}
                                    className={`rounded px-1.5 py-0.5 transition-all inline-flex items-center gap-1 text-[11px] ${
                                      isActive
                                        ? 'bg-metric-red/20 text-metric-red ring-1 ring-metric-red/40 font-semibold shadow-sm'
                                        : isClickable
                                        ? 'bg-muted text-muted-foreground hover:bg-metric-red/10 hover:text-metric-red cursor-pointer font-medium'
                                        : 'bg-muted text-muted-foreground/40 cursor-not-allowed'
                                    } ${isLoading ? 'opacity-60 cursor-wait' : ''}`}
                                    title={isClickable ? `View evidence: ${name} in ${row.model}` : 'Evidence not available'}
                                  >
                                    {isLoading && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
                                    {name}: {cellPct}%
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Inline evidence panel */}
                  <AnimatePresence>
                    {activeEvidence && (
                      <motion.div
                        key={activeEvidence}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 rounded-lg border border-metric-red/20 bg-metric-red/5 p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-metric-red">
                              Evidence: {activeEvidence.replace('::', ' → ')}
                            </span>
                            <button
                              onClick={() => { setActiveEvidence(null); setEvidenceData(null); }}
                              className="text-[10px] text-muted-foreground hover:text-foreground"
                            >
                              Close
                            </button>
                          </div>

                          {loadingEvidence === activeEvidence ? (
                            <div className="flex items-center gap-2 py-4 justify-center text-xs text-muted-foreground">
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Loading evidence…
                            </div>
                          ) : evidenceData?.examples && evidenceData.examples.length > 0 ? (
                            <div className="space-y-3">
                              {evidenceData.examples.map((ex, idx) => (
                                <div key={idx} className="rounded-md bg-background/80 border border-border p-2.5 text-xs">
                                  <p className="font-medium text-foreground mb-1.5 leading-snug">
                                    Q: {ex.buyer_question}
                                  </p>
                                  <p className="text-muted-foreground leading-relaxed">
                                    {renderSnippetWithHighlights(ex.answer_text, ex.snippet_highlights)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : evidenceData ? (
                            <p className="text-xs text-muted-foreground py-2 text-center">
                              No evidence examples found for this combination.
                            </p>
                          ) : null}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
