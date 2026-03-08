import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock } from 'lucide-react';
import { ActionOriented } from '@/types/report';

interface Props {
  action: ActionOriented;
  ctaSubline?: string;
}

export default function ActionSectionBlock({ action, ctaSubline }: Props) {
  const handleCtaClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="mt-8 overflow-hidden rounded-2xl"
      style={{ backgroundImage: 'var(--gradient-primary)' }}
    >
      <div className="grid gap-0 sm:grid-cols-5">
        <div className="border-b border-primary-foreground/10 p-6 sm:col-span-3 sm:border-b-0 sm:border-r sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4.5 w-4.5 text-primary-foreground/70" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">Next step</span>
          </div>
          <h3 className="text-xl font-bold text-primary-foreground">{action.title}</h3>
          <p className="mt-2.5 text-base leading-relaxed text-primary-foreground/75">{action.teaser}</p>
          <button
            onClick={handleCtaClick}
            className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-primary-foreground px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary-foreground/90 hover:shadow-lg active:scale-[0.98]"
          >
            <Lock className="h-4 w-4" />
            Get my full audit + fix plan
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 sm:col-span-2 sm:p-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">What the audit covers</h4>
          {action.bullets && (
            <ul className="mt-5 space-y-3">
              {action.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-primary-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground/50" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {ctaSubline && (
            <p className="mt-5 text-sm italic text-primary-foreground/55">{ctaSubline}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}