import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { CHECKOUT, SPRINT, DEFENSE, checkoutUrl } from '@/lib/pitch-content';
import { Personalization } from '@/lib/pitch-personalization';

export default function PricingSection({ p }: { p: Personalization }) {
  return (
    <section id="pricing" className="border-b border-border scroll-mt-8">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Choose your starting point
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Start small to confirm the gap, get the exact plan, or have us ship the
            fixes for you. Whatever you&apos;ve paid carries forward — the Diagnostic is
            100% credited toward a Blueprint or Sprint, and the Blueprint toward a
            Sprint, within 14 days.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Diagnostic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="card-surface flex flex-col p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              AI Visibility Diagnostic
            </p>
            <p className="mt-1 text-4xl font-bold text-foreground">$199</p>
            <p className="mt-1 text-sm font-medium text-primary">Stop guessing whether AI is costing you deals</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              Confirm the gap first. Delivered in 3–5 business days, 100% credited toward what comes next.
            </p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {[
                'All 5 AI assistants (ChatGPT, Claude, Gemini, Perplexity, Grok)',
                '10 high-intent prompts for your category',
                '3 runs per prompt to reduce variance',
                'Executive scorecard + evidence excerpts',
                'Top 5 prioritised fixes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={checkoutUrl(CHECKOUT.diagnostic, p.brand, p.runId)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Confirm the gap — $199
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Growth Blueprint — recommended */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-surface relative flex flex-col border-primary/40 ring-2 ring-primary/15 p-6 md:scale-[1.02]"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most popular
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Growth Blueprint
            </p>
            <p className="mt-1 text-4xl font-bold text-foreground">$499</p>
            <p className="mt-1 text-sm font-medium text-primary">Your team ships the fix — without guessing what to build</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              A publish-ready plan for your 5–6 highest-priority pages, delivered in 5–7 business days.
            </p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {[
                'Everything in the Diagnostic, plus:',
                'Root-cause diagnosis of why competitors win',
                'Exact pages to create — titles and H2s',
                'Copy direction your team can execute',
                'Priority roadmap — what to ship first',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={checkoutUrl(CHECKOUT.growth, p.brand, p.runId)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get the {p.brand} Growth Blueprint — $499
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Sprint — custom, talk to us */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-surface flex flex-col border-primary/30 bg-primary-light/70 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {SPRINT.name}
            </p>
            <a
              href={SPRINT.href}
              className="mt-2 text-2xl font-bold leading-tight text-foreground underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary sm:text-3xl"
            >
              {SPRINT.priceRange}
            </a>
            <p className="mt-2 text-sm font-medium text-primary">{SPRINT.quickDiff}</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">{SPRINT.summary}</p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {SPRINT.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-muted-foreground">{SPRINT.note}</p>
            <a
              href={SPRINT.href}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="h-4 w-4" />
              {SPRINT.cta}
            </a>
          </motion.div>

          {/* Defense Plan — recurring monitoring, step four (Defend), talk to us */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-surface flex flex-col border-primary/30 bg-primary-light/70 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {DEFENSE.name}
            </p>
            <p className="mt-2 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {DEFENSE.price}
              <span className="text-base font-medium text-muted-foreground">{DEFENSE.cadence}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{DEFENSE.priceNote}</p>
            <p className="mt-2 text-sm font-medium text-primary">{DEFENSE.quickDiff}</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">{DEFENSE.summary}</p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {DEFENSE.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-muted-foreground">{DEFENSE.committedNote}</p>
            <a
              href={DEFENSE.href}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="h-4 w-4" />
              {DEFENSE.cta}
            </a>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Private engagement · Diagnostic in 3–5 days, Blueprint in 5–7 · Work directly with Umair
        </p>
      </div>
    </section>
  );
}
