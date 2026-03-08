import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { ActionOriented } from '@/types/report';

interface Props {
  action: ActionOriented;
  ctaSubline?: string;
}

export default function ActionSectionBlock({ action, ctaSubline }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="mt-6 overflow-hidden rounded-xl border border-foreground/10 bg-foreground text-primary-foreground"
    >
      <div className="grid gap-0 sm:grid-cols-5">
        <div className="border-b border-primary-foreground/10 p-6 sm:col-span-3 sm:border-b-0 sm:border-r sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-primary-foreground/60" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">Next step</span>
          </div>
          <h3 className="text-lg font-bold text-primary-foreground">{action.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{action.teaser}</p>
          <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-primary-foreground/90 active:scale-[0.98]">
            Get my full audit + fix plan
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="p-6 sm:col-span-2 sm:p-8">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">What the audit covers</h4>
          {action.bullets && (
            <ul className="mt-4 space-y-2.5">
              {action.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-primary-foreground/80">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-foreground/40" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {ctaSubline && (
            <p className="mt-4 text-xs italic text-primary-foreground/50">{ctaSubline}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
