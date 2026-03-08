import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';

interface Props {
  ctaSubline?: string;
}

export default function FinalCtaSection({ ctaSubline }: Props) {
  const handleCtaClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="mt-8 overflow-hidden rounded-2xl border border-border bg-secondary text-center p-8 sm:p-12"
    >
      <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
        Convert this snapshot into fixes.
      </h3>
      <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground leading-relaxed">
        Get the full audit with 10+ prompts, multiple LLMs, reruns, and copy-ready action items.
      </p>
      <button
        onClick={handleCtaClick}
        className="btn-primary mt-6 inline-flex items-center gap-2.5 px-8 py-3.5"
      >
        <Lock className="h-4 w-4" />
        Get my full audit + fix plan
        <ArrowRight className="h-4 w-4" />
      </button>
      {ctaSubline && (
        <p className="mt-4 text-sm text-muted-foreground">{ctaSubline}</p>
      )}
      <p className="mt-3 text-xs text-muted-foreground/70">
        10+ prompts · 2 major LLMs · reruns · copy-ready outputs
      </p>
    </motion.div>
  );
}