import { ArrowRight, CalendarClock } from 'lucide-react';
import { CHECKOUT, checkoutUrl } from '@/lib/pitch-content';

/**
 * Primary = buy now (existing checkout). Secondary = optional 1:1 with Umair,
 * a low-commitment rescue for hesitant buyers (no hard gate before purchase).
 */
export default function PitchCtaButtons({
  primaryLabel = 'Get my fix plan — $199',
  plan = 'diagnostic',
  align = 'center',
  brand,
  runId,
}: {
  primaryLabel?: string;
  plan?: 'growth' | 'diagnostic';
  align?: 'center' | 'start';
  brand?: string;
  runId?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row ${
        align === 'center' ? 'sm:justify-center' : 'sm:justify-start'
      }`}
    >
      <a
        href={checkoutUrl(CHECKOUT[plan], brand, runId)}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:gap-3"
      >
        {primaryLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href={CHECKOUT.call}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <CalendarClock className="h-4 w-4" />
        Not sure? Talk to Umair first
      </a>
    </div>
  );
}
