import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import PitchCtaButtons from '@/components/pitch/PitchCtaButtons';
import { SCARCITY } from '@/lib/pitch-content';
import { Personalization } from '@/lib/pitch-personalization';

export default function ClosingCta({ p }: { p: Personalization }) {
  return (
    <section className="bg-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {SCARCITY.slotsPerMonth > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-3.5 py-1.5 text-xs font-semibold text-background/90">
              <Clock className="h-3.5 w-3.5" />
              Only {SCARCITY.slotsPerMonth} new clients this month
            </span>
          )}

          <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-bold tracking-tight text-background sm:text-3xl">
            Every week you wait, {p.topCompetitor || 'a competitor'} gets harder to unseat.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-background/70">
            {SCARCITY.note} The report showed you the problem — let&apos;s fix it before the
            AI answers harden around someone else.
          </p>

          <div className="mt-9">
            <PitchCtaButtons primaryLabel={`Fix ${p.brand}'s AI visibility — from $199`} brand={p.brand} runId={p.runId} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
