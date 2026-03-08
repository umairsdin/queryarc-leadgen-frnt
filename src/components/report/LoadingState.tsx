import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LLM_MODELS = [
  { name: 'ChatGPT', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', fallback: 'GPT' },
  { name: 'Claude', logo: 'https://cdn.simpleicons.org/anthropic/6366f1', fallback: 'CLD' },
  { name: 'Gemini', logo: 'https://cdn.simpleicons.org/googlegemini/6366f1', fallback: 'GEM' },
  { name: 'Perplexity', logo: 'https://cdn.simpleicons.org/perplexity/6366f1', fallback: 'PPX' },
  { name: 'Grok', logo: 'https://cdn.simpleicons.org/x/6366f1', fallback: 'GRK' },
];

const STEPS = [
  'Generating buyer questions',
  'Querying AI models',
  'Analyzing answers',
  'Calculating visibility',
];

interface Props {
  reportState?: string;
  stageLabel?: string;
  message?: string;
}

export default function LoadingState({ reportState, stageLabel, message }: Props) {
  const activeIndex = reportState === 'processing' ? 1 : 0;

  return (
    <div className="card-surface-elevated p-8 sm:p-10">
      <div className="flex items-center gap-3 mb-8">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <div>
          {stageLabel && <p className="text-base font-semibold text-foreground">{stageLabel}</p>}
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          {!stageLabel && !message && <p className="text-base font-semibold text-foreground">Processing your snapshot…</p>}
        </div>
      </div>

      {/* LLM Model indicators */}
      <div className="mb-8 rounded-xl bg-secondary/50 border border-border p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Querying AI platforms
        </p>
        <div className="flex items-center justify-between gap-3">
          {LLM_MODELS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{
                  opacity: i <= activeIndex ? [0.5, 1, 0.5] : 0.3,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                  i <= activeIndex
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-border bg-secondary/50'
                }`}
              >
                <img
                  src={m.logo}
                  alt={`${m.name} logo`}
                  className="h-6 w-6"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                />
                <span className="hidden text-xs font-bold text-primary">{m.fallback}</span>
              </motion.div>
              <span className="text-[11px] font-medium text-muted-foreground">{m.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {STEPS.map((step, i) => {
          const isDone = i < activeIndex;
          const isActive = i === activeIndex;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3.5 py-3.5 border-b border-border last:border-b-0"
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                isDone
                  ? 'bg-metric-green text-primary-foreground'
                  : isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground'
              }`}>
                {isDone ? '✓' : i + 1}
              </div>
              <span className={`text-sm transition-colors ${
                isDone ? 'text-muted-foreground line-through' : isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
              }`}>
                {step}
              </span>
              {isActive && (
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-primary"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}