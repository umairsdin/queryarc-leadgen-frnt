import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FinalCtaSectionProps {
  brand: string;
  topCompetitor?: string;
  visibilityPct: number;
  competitorPct: number;
  opportunityPct: number;
}

function getDynamicSummary(
  brand: string,
  topCompetitor: string | undefined,
  visibilityPct: number,
  competitorPct: number,
  opportunityPct: number
): string {
  if (visibilityPct > 80 && competitorPct >= 70 && topCompetitor) {
    return `${brand} shows up when named — but ${topCompetitor} dominates neutral buyer queries across AI assistants. This snapshot used brand-directed questions. Neutral prompts tell a different story.`;
  }
  if (visibilityPct > 80 && competitorPct < 70) {
    return `This snapshot showed strong numbers — but 2 of 3 questions named ${brand} directly. Neutral buyer queries, where your name isn't in the prompt, tell a different story.`;
  }
  if (visibilityPct <= 30) {
    return `AI assistants skipped ${brand} in most answers. The gaps causing assistants to default to competitors are identifiable and fixable.`;
  }
  if (opportunityPct >= 30) {
    return `${Math.round(opportunityPct)}% of answers in your category named no brand at all. That's unclaimed space — but only if you move first.`;
  }
  if (topCompetitor) {
    return `${topCompetitor} is showing up in neutral buyer questions alongside ${brand}. The exact pages and signals driving that pattern are identifiable.`;
  }
  return `This snapshot ran 3 questions. The full picture requires 10 neutral prompts across 3 runs each.`;
}

export default function FinalCtaSection({
  brand,
  topCompetitor,
  visibilityPct,
  competitorPct,
  opportunityPct,
}: FinalCtaSectionProps) {
  const summary = getDynamicSummary(
    brand,
    topCompetitor,
    visibilityPct,
    competitorPct,
    opportunityPct
  );

  const handleBlueprint = () => {
    window.location.href = 'https://queryarc.com/checkout?plan=growth';
  };

  const handleDiagnostic = () => {
    window.location.href = 'https://queryarc.com/checkout?plan=diagnostic';
  };

  return (
    <section className="w-full border-t border-border pt-10 mt-10">

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
          What happens next for {brand}
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {summary}
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground/60">
          This snapshot ran 3 questions. Paid reports run 10 neutral prompts
          with 3 runs each — where the real gaps emerge.
        </p>
      </div>

      {/* Two cards — matches card-surface pattern from existing report */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl mx-auto">

        {/* Blueprint — Primary / Recommended */}
        <div className="relative card-surface flex flex-col p-6">

          {/* Recommended badge — sits above card top edge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              Recommended
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Growth Blueprint
            </p>
            <p className="text-4xl font-bold text-foreground mt-1">$499</p>
            <p className="text-sm text-muted-foreground mt-1 leading-snug">
              The exact pages and copy direction to fix it — ready for your team to ship.
            </p>
          </div>

          {/* Feature list */}
          <ul className="mt-5 space-y-2.5 flex-1">
            {[
              'Root-cause diagnosis of why competitors win',
              'Exact pages to create with titles and H2s',
              'Copy direction your team can execute',
              'Priority roadmap — what to ship first',
              'Includes full Diagnostic report',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={handleBlueprint}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get the {brand} Blueprint — $499
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Diagnostic — Secondary */}
        <div className="card-surface flex flex-col p-6">

          {/* Pricing */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              AI Visibility Diagnostic
            </p>
            <p className="text-4xl font-bold text-foreground mt-1">$199</p>
            <p className="text-sm text-muted-foreground mt-1 leading-snug">
              Confirm the gap first. 100% credited toward Blueprint within 14 days.
            </p>
          </div>

          {/* Feature list */}
          <ul className="mt-5 space-y-2.5 flex-1">
            {[
              '10 neutral prompts — none name your brand',
              '3 runs per prompt to reduce variance',
              'Executive scorecard across ChatGPT + Gemini',
              'Top 5 prioritised fixes',
              '100% credited toward Blueprint',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={handleDiagnostic}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Confirm the gap first — $199
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Trust line */}
      <p className="text-center text-xs text-muted-foreground mt-6 pb-2">
        Private report · No calls required · Delivered within 48 hours ·
        Diagnostic 100% credited toward Blueprint within 14 days
      </p>

    </section>
  );
}
