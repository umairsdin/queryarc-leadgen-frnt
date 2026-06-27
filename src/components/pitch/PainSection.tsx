import { motion } from 'framer-motion';
import { Quote, TrendingDown } from 'lucide-react';
import { Personalization } from '@/lib/pitch-personalization';

/**
 * The core "make 3 prompts hurt" section. We do NOT fake more data — we reframe
 * the snapshot as the best case and amplify the consequences of the real gap.
 */
export default function PainSection({ p }: { p: Personalization }) {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            And that was the <span className="text-metric-red">easy</span> test.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Your free snapshot ran just {p.questionsTested} questions — and they leaned
            on questions that mention {p.brand} by name. Real buyers don&apos;t type your
            name. They ask AI for the best option in your category. That&apos;s where the
            real leakage happens, and it&apos;s exactly what the paid report uncovers.
          </p>
        </motion.div>

        {/* Tip-of-the-iceberg visual */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 grid gap-4 sm:grid-cols-3"
        >
          <div className="card-surface p-5">
            <p className="text-3xl font-bold text-foreground">{p.questionsTested}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              buyer questions tested — free
            </p>
          </div>
          <div className="card-surface p-5">
            <p className="text-3xl font-bold text-foreground">100s</p>
            <p className="mt-1 text-sm text-muted-foreground">
              of ways buyers actually ask {/* TODO: real number if available */}
            </p>
          </div>
          <div className="card-surface border-metric-red/30 bg-metric-red/5 p-5">
            <p className="flex items-center gap-1.5 text-3xl font-bold text-metric-red">
              <TrendingDown className="h-6 w-6" />
              {p.competitorPct}%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              already going to competitors
            </p>
          </div>
        </motion.div>

        {/* The real, damaging AI quote */}
        {p.aiQuote && (
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 rounded-xl border border-metric-red/20 bg-background p-6"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-metric-red">
              <Quote className="h-4 w-4" />
              What {p.aiQuote.model} actually told your buyers
            </div>
            <blockquote className="text-base leading-relaxed text-foreground">
              “{p.aiQuote.text}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              It recommended <span className="font-semibold text-metric-red">{p.aiQuote.competitor}</span>
              {p.visibilityCount === 0 ? ` — and never mentioned ${p.brand}.` : `.`} Every time
              that happens, a buyer never even hears your name.
            </figcaption>
          </motion.figure>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-foreground"
        >
          AI answers compound. The brand cited today gets cited more tomorrow — until one
          name owns the category. Right now that race is still open. But only if you move first.
        </motion.p>
      </div>
    </section>
  );
}
