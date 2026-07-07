import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CalendarClock } from 'lucide-react';
import { FOUNDER, TEAM } from '@/lib/pitch-content';
import { Personalization } from '@/lib/pitch-personalization';

/**
 * Founder-led trust anchor. For an unknown brand, a visible human is the
 * differentiator. The `TEAM` array (empty for now) lets this grow later.
 */
export default function FounderSection({ p }: { p: Personalization }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="card-surface overflow-hidden"
        >
          <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
            {/* Photo / avatar */}
            <div className="flex items-center justify-center bg-primary-light/40 p-8">
              {imgOk ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={FOUNDER.photo}
                  alt={FOUNDER.name}
                  onError={() => setImgOk(false)}
                  className="h-28 w-28 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-md">
                  {FOUNDER.initials}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="p-7 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Who you actually work with
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                {FOUNDER.name}
              </h2>
              <p className="text-sm font-medium text-muted-foreground">{FOUNDER.role}</p>

              <p className="mt-4 text-base leading-relaxed text-foreground">{FOUNDER.bio}</p>

              <ul className="mt-5 space-y-2">
                {FOUNDER.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-lg bg-secondary/60 px-4 py-3 text-sm text-foreground">
                When you hire QueryArc, you get {FOUNDER.name.split(' ')[0]} on {p.brand} —
                not a junior account team. One-on-one, until it&apos;s shipped.
              </p>

              {FOUNDER.links?.book && (
                <a
                  href={FOUNDER.links.book}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <CalendarClock className="h-4 w-4" />
                  Book a 30-min call with {FOUNDER.name.split(' ')[0]}
                </a>
              )}
            </div>
          </div>

          {/* Future team — renders only when TEAM is populated */}
          {TEAM.length > 0 && (
            <div className="border-t border-border bg-secondary/30 px-7 py-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                And the team behind the work
              </p>
              <div className="flex flex-wrap gap-4">
                {TEAM.map((t) => (
                  <div key={t.name} className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {t.initials}
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
