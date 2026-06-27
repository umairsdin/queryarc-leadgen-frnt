import { motion } from 'framer-motion';
import QueryArcLogo from '@/components/shared/QueryArcLogo';
import PitchCtaButtons from '@/components/pitch/PitchCtaButtons';
import { Personalization } from '@/lib/pitch-personalization';

export default function PitchHero({ p }: { p: Personalization }) {
  const headline = p.topCompetitor
    ? `${p.topCompetitor} is winning your buyers in AI answers. Let's take them back.`
    : `Your buyers are choosing competitors in AI answers. Let's fix that.`;

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-light/40 to-background">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-center gap-2.5"
        >
          <QueryArcLogo />
          <span className="text-lg font-bold text-foreground">QueryArc</span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block rounded-full bg-metric-red/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-metric-red"
        >
          Your report is the diagnosis · This is the cure
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          Your free snapshot showed the gap. The hard part isn&apos;t spotting it —
          it&apos;s fixing it. We build and execute the plan that earns {p.brand} the
          AI answer mentions, working with you directly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-9"
        >
          <PitchCtaButtons primaryLabel={`Fix ${p.brand}'s AI visibility — from $199`} brand={p.brand} runId={p.runId} />
          <p className="mt-4 text-xs text-muted-foreground/70">
            Plan within 48 hours · Diagnostic credited toward your Blueprint · No long contracts
          </p>
        </motion.div>
      </div>
    </section>
  );
}
