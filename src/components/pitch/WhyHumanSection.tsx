import { motion } from 'framer-motion';
import { Eye, Wrench, X, Check } from 'lucide-react';

/**
 * The "human intervention" argument: tools only track; fixing AI visibility
 * needs tailored content + execution that no dashboard can do.
 */
export default function WhyHumanSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          A dashboard can&apos;t fix this. A person has to.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground"
        >
          Most &ldquo;AI visibility&rdquo; products just track prompts and tell you where
          you&apos;re missing. That&apos;s the easy 10%. Earning the mention is the other 90% —
          and it takes judgement, new content, and positioning tuned to your exact business.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-surface p-6"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-base font-bold text-foreground">Tracking tools</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[
                'Tell you where you’re invisible',
                'Same generic metrics for everyone',
                'Charge you monthly, forever',
                'Leave the actual fixing to you',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-metric-red" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-surface border-primary/30 bg-primary-light/30 p-6"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Wrench className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground">QueryArc</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground">
              {[
                'Finds the root cause, not just the score',
                'A plan built for your category & rivals',
                'One-time — you own the result',
                'We build and ship the fix with you',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-metric-green" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
