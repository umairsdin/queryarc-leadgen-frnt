"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchRun } from '@/lib/api';
import { CanonicalReport } from '@/types/report';
import {
  buildPersonalization,
  type Personalization,
} from '@/lib/pitch-personalization';
import PitchHero from '@/components/pitch/PitchHero';
import PainSection from '@/components/pitch/PainSection';
import WhyHumanSection from '@/components/pitch/WhyHumanSection';
import MethodSection from '@/components/pitch/MethodSection';
import FounderSection from '@/components/pitch/FounderSection';
import AgencyComparison from '@/components/pitch/AgencyComparison';
import PricingSection from '@/components/pitch/PricingSection';
import SocialProofSection from '@/components/pitch/SocialProofSection';
import GuaranteeSection from '@/components/pitch/GuaranteeSection';
import PitchFaqSection from '@/components/pitch/PitchFaqSection';
import ClosingCta from '@/components/pitch/ClosingCta';

/** Generic fallback so the page never breaks if the report can't load. */
const FALLBACK: Personalization = {
  runId: '',
  brand: 'your brand',
  website: '',
  competitors: [],
  visibilityPct: 0,
  competitorPct: 0,
  opportunityPct: 0,
  visibilityCount: 0,
  visibilityDenom: 0,
  answersAnalyzed: 0,
  questionsTested: 3,
};

export default function PitchPage({ runId }: { runId: string }) {
  const [p, setP] = useState<Personalization | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const report: CanonicalReport = await fetchRun(runId);
        if (!cancelled) setP(buildPersonalization(report, runId));
      } catch (err) {
        console.error('Pitch load error:', err);
        if (!cancelled) setP({ ...FALLBACK, runId });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [runId]);

  if (!p) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <PitchHero p={p} />
      <PainSection p={p} />
      <WhyHumanSection />
      <MethodSection p={p} />
      <FounderSection p={p} />
      <AgencyComparison />
      <SocialProofSection />
      <PricingSection p={p} />
      <GuaranteeSection />
      <PitchFaqSection />
      <ClosingCta p={p} />
    </main>
  );
}
