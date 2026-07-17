import { CanonicalReport } from '@/types/report';

type MetricWithDisplay = {
  display_percent?: number | null;
  percent?: number | null;
  pct?: number | null;
};

export const FALLBACK_DISPLAY_ADJUSTMENT_NOTE = 'Adjusted for untracked prompts.';

function toPercent(value: number | null | undefined): number {
  if (value == null || Number.isNaN(Number(value))) return 0;
  const n = Number(value);
  return n > 1 || n === 0 ? Math.round(n) : Math.round(n * 100);
}

export function displayPercent(metric?: MetricWithDisplay | null): number {
  if (!metric) return 0;
  return toPercent(metric.display_percent ?? metric.percent ?? metric.pct);
}

export function displayAdjustmentNote(report: CanonicalReport): string {
  const note = report.metrics?.display_adjustment?.note;
  return typeof note === 'string' && note.trim() ? note : FALLBACK_DISPLAY_ADJUSTMENT_NOTE;
}
