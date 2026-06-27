import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { CHECKOUT, SPRINT, checkoutUrl } from '@/lib/pitch-content';
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
            fixes for you. The Diagnostic is credited toward whatever comes next.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <p className="mt-1 text-sm font-medium text-primary">Clarity on where you&apos;re losing visibility</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              Confirm the gap first. 100% credited toward what comes next.
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
            <p className="mt-1 text-sm font-medium text-primary">The exact pages and copy to fix it</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              Get the exact plan, structure and copy direction your team can ship.
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
              Get the {p.brand} Blueprint — $499
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Sprint — custom, talk to us */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-surface flex flex-col bg-foreground p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-background/60">
              {SPRINT.name}
            </p>
            <p className="mt-1 text-4xl font-bold text-background">{SPRINT.priceRange}</p>
            <p className="mt-1 text-sm font-medium text-background/90">{SPRINT.quickDiff}</p>
            <p className="mt-2 text-sm leading-snug text-background/60">{SPRINT.summary}</p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {SPRINT.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-background/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-background/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-background/50">{SPRINT.note}</p>
            <a
              href={SPRINT.href}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background/90"
            >
              <MessageCircle className="h-4 w-4" />
              {SPRINT.cta}
            </a>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Private engagement · Plan delivered within 48 hours · Work directly with Umair
        </p>
      </div>
    </section>
  );
}
