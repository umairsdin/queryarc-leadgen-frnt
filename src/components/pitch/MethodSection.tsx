import { motion } from 'framer-motion';
import { METHOD } from '@/lib/pitch-content';
import { Personalization } from '@/lib/pitch-personalization';

export default function MethodSection({ p }: { p: Personalization }) {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            The whole loop
          </span>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your report was Stage 1. Here&apos;s how we take it all the way.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            One loop, three stages: find the gap, close it, keep it closed. You can enter at any stage and
            move through at your pace — whatever you&apos;ve paid carries forward.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {METHOD.map((m, i) => (
            <motion.div
              key={m.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="card-surface flex flex-col p-6"
            >
              <span className="text-sm font-bold text-primary">{m.step}</span>
              <h3 className="mt-2 text-base font-bold text-foreground">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          The result: {p.brand} stops losing buyers to {p.topCompetitor || 'competitors'} in
          AI answers — with changes your team can actually ship.
        </motion.p>
      </div>
    </section>
  );
}
