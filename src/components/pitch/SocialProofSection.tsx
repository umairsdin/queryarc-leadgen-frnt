import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, RESULT_STATS, CLIENT_LOGOS } from '@/lib/pitch-content';

/** Social proof — edit content in src/lib/pitch-content.ts. */
export default function SocialProofSection() {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Result stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {RESULT_STATS.map((s) => (
            <div key={s.label} className="card-surface p-6 text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
              className="card-surface flex flex-col p-6"
            >
              <div className="mb-3 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Quote className="h-4 w-4" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-muted-foreground">{t.title}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Logos */}
        {CLIENT_LOGOS.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
              Trusted by teams like
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {CLIENT_LOGOS.map((logo) => (
                <span key={logo} className="text-lg font-bold text-muted-foreground/40">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
