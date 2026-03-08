import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { ActionOriented } from '@/types/report';

interface Props {
  action: ActionOriented;
  ctaSubline?: string;
}

export default function ActionSectionBlock({ action, ctaSubline }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-surface mt-6 overflow-hidden"
    >
      <div className="grid gap-0 sm:grid-cols-5">
        <div className="border-b border-border p-6 sm:col-span-3 sm:border-b-0 sm:border-r sm:p-7">
          <h3 className="text-base font-medium text-foreground">{action.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{action.teaser}</p>
          <button className="btn-primary mt-4 inline-flex items-center gap-2 px-4 py-2">
            Get my full audit + fix plan
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="p-6 sm:col-span-2 sm:p-7">
          <h4 className="text-sm font-medium text-foreground">What the audit covers</h4>
          {action.bullets && (
            <ul className="mt-3 space-y-1.5">
              {action.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {ctaSubline && (
            <p className="mt-3 text-xs italic text-muted-foreground">{ctaSubline}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
