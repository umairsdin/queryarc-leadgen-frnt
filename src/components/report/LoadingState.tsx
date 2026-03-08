import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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
    <div className="card-surface p-8">
      <div className="flex items-center gap-3 mb-6">
        <Loader2 className="h-5 w-5 animate-spin text-foreground" />
        <div>
          {stageLabel && <p className="text-sm font-semibold text-foreground">{stageLabel}</p>}
          {message && <p className="text-xs text-muted-foreground">{message}</p>}
          {!stageLabel && !message && <p className="text-sm font-semibold text-foreground">Processing your snapshot…</p>}
        </div>
      </div>

      <div className="space-y-0">
        {STEPS.map((step, i) => {
          const isDone = i < activeIndex;
          const isActive = i === activeIndex;
          const isPending = i > activeIndex;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                isDone
                  ? 'bg-metric-green text-primary-foreground'
                  : isActive
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {isDone ? '✓' : i + 1}
              </div>
              <span className={`text-sm transition-colors ${
                isDone ? 'text-muted-foreground line-through' : isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
              }`}>
                {step}
              </span>
              {isActive && (
                <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
