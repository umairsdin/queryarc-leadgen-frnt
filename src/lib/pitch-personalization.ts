import { CanonicalReport } from '@/types/report';
import { displayPercent, observedPercent } from '@/lib/display-metrics';

/** The painful, real "AI recommended your competitor, not you" quote. */
export interface AiQuote {
  text: string;
  model: string;
  competitor: string;
}

/** Everything the pitch page personalizes from the live report. */
export interface Personalization {
  runId: string;
  brand: string;
  website: string;
  topCompetitor?: string;
  competitors: string[];
  visibilityPct: number;
  competitorPct: number;
  opportunityPct: number;
  visibilityCount: number;
  visibilityDenom: number;
  answersAnalyzed: number;
  questionsTested: number;
  aiQuote?: AiQuote;
}

/** Trim a snippet to a readable length around the first competitor mention. */
function snippet(text: string, at: number, max = 260): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const start = Math.max(0, at - 80);
  const end = Math.min(clean.length, start + max);
  return `${start > 0 ? '…' : ''}${clean.slice(start, end).trim()}${end < clean.length ? '…' : ''}`;
}

/**
 * Find the most damaging real answer: an AI naming a competitor but NOT the
 * brand. Falls back to any competitor mention.
 */
function extractAiQuote(report: CanonicalReport): AiQuote | undefined {
  const groups = report.data?.model_answers;
  if (!Array.isArray(groups)) return undefined;

  let fallback: AiQuote | undefined;

  for (const group of groups) {
    for (const ans of group.answers || []) {
      const competitorHl = (ans.highlights || []).find((h) => h.type === 'competitor');
      if (!competitorHl) continue;
      const mentionsBrand = (ans.highlights || []).some((h) => h.type === 'brand');
      const quote: AiQuote = {
        text: snippet(ans.answer_text || '', competitorHl.start),
        model: group.model || group.model_key || 'An AI assistant',
        competitor: competitorHl.name,
      };
      if (!mentionsBrand) return quote; // strongest: competitor in, brand out
      if (!fallback) fallback = quote;
    }
  }
  return fallback;
}

/** `summary.top_competitor` is often empty; derive the rival from the data. */
function pickTopCompetitor(report: CanonicalReport): string | undefined {
  const m = report.metrics;
  return (
    report.summary?.top_competitor ||
    m?.competitor_piggyback_rate?.top_rival?.competitor ||
    report.data?.competitor_presence_card?.top_rival?.competitor ||
    m?.competitor_visibility?.[0]?.brand ||
    report.input?.competitors?.[0] ||
    undefined
  );
}

export function buildPersonalization(report: CanonicalReport, runId: string): Personalization {
  const m = report.metrics;
  return {
    runId,
    brand: report.input?.brand_name || 'your brand',
    website: report.input?.website || '',
    topCompetitor: pickTopCompetitor(report),
    competitors: report.input?.competitors || [],
    visibilityPct: displayPercent(m?.visibility_rate),
    competitorPct: observedPercent(m?.competitor_piggyback_rate),
    opportunityPct: displayPercent(m?.open_opportunity_rate),
    visibilityCount: m?.visibility_rate?.count ?? 0,
    visibilityDenom: m?.visibility_rate?.denom ?? m?.visibility_rate?.total ?? 0,
    answersAnalyzed: report.summary?.answers_analyzed ?? 0,
    questionsTested: report.summary?.questions_tested ?? 3,
    aiQuote: extractAiQuote(report),
  };
}
