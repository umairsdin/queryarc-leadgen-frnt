import { ArrowRight, AlertTriangle } from 'lucide-react';

interface FixCtaSectionProps {
  brand: string;
  topCompetitor?: string;
  visibilityPct: number;
  competitorPct: number;
  opportunityPct: number;
  runId: string;
}

/**
 * Replaces the old on-report pricing cards. Its only job is the click:
 * reframe the 3-prompt snapshot as the *best case* and send people to the
 * personalized pitch page (/fix/[run_id]/) where the real selling happens.
 */
function urgencyLine(
  brand: string,
  topCompetitor: string | undefined,
  visibilityPct: number,
  opportunityPct: number
): string {
  if (topCompetitor) {
    return `And remember — these were the friendly questions. We named ${brand} directly and ${topCompetitor} still showed up. On neutral buyer questions, where nobody types your name, it gets worse.`;
  }
  if (visibilityPct <= 30) {
    return `And these were the friendly questions — we named ${brand} directly. On neutral buyer questions, where nobody types your name, the gap is usually wider.`;
  }
  if (opportunityPct >= 30) {
    return `${Math.round(opportunityPct)}% of these answers named no brand at all — open space a competitor will take first. And this was only 3 questions.`;
  }
  return `This was only 3 questions, and the friendly ones at that. The real gaps show on neutral buyer prompts — that's what we fix.`;
}

export default function FixCtaSection({
  brand,
  topCompetitor,
  visibilityPct,
  competitorPct,
  opportunityPct,
  runId,
}: FixCtaSectionProps) {
  const line = urgencyLine(brand, topCompetitor, visibilityPct, opportunityPct);

  return (
    <section className="w-full border-t border-border pt-10 mt-10">
      <div className="card-surface relative overflow-hidden">
        <div className="h-1.5 w-full bg-metric-red" />
        <div className="p-7 sm:p-10 text-center">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-metric-red/10">
            <AlertTriangle className="h-5 w-5 text-metric-red" />
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            This is the problem. Here&apos;s how {brand} fixes it.
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {line}
          </p>

          <a
            href={`/fix/${runId}/`}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:gap-3"
          >
            Show me how to fix {brand}&apos;s AI visibility
            <ArrowRight className="h-4 w-4" />
          </a>

          <p className="mt-4 text-xs text-muted-foreground/70">
            See exactly what we&apos;d change — and who does it. No call required.
          </p>
        </div>
      </div>
    </section>
  );
}
