import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { ActionSection } from '@/types/report';

interface Props {
  action: ActionSection;
  isFirst: boolean;
  ctaSubline?: string[];
}

export default function ActionSectionBlock({ action, isFirst, ctaSubline }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isFirst ? 0.35 : 0.5 }}
      className="card-premium mt-8 overflow-hidden"
    >
      <div className="grid gap-0 sm:grid-cols-5">
        <div className="border-b border-border bg-accent/30 p-6 sm:col-span-3 sm:border-b-0 sm:border-r sm:p-8">
          <h3 className="font-display text-xl text-foreground">{action.primary_title}</h3>
          {action.locked_text && (
            <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{action.locked_text}</span>
            </div>
          )}
          <button className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            {action.cta_text}
            <ArrowRight className="h-4 w-4" />
          </button>
          {action.cta_proof && (
            <p className="mt-2 text-xs text-muted-foreground">{action.cta_proof}</p>
          )}
        </div>

        <div className="p-6 sm:col-span-2 sm:p-8">
          {action.secondary_title && (
            <h4 className="font-display text-base text-foreground">{action.secondary_title}</h4>
          )}
          {action.secondary_teaser && (
            <p className="mt-2 text-sm text-muted-foreground">{action.secondary_teaser}</p>
          )}
          {action.secondary_bullets && (
            <ul className="mt-3 space-y-1.5">
              {action.secondary_bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary/40" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {ctaSubline && (
            <ul className="mt-3 space-y-1.5">
              {ctaSubline.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary/40" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
