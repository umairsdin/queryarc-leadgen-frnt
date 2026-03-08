import { motion } from 'framer-motion';

const STEPS = [
  'Generating buyer questions',
  'Querying AI models',
  'Analyzing answers',
  'Calculating visibility',
];

interface Props {
  status?: string;
}

export default function LoadingState({ status }: Props) {
  const activeIndex = status === 'processing' ? 1 : 0;

  return (
    <div className="card-surface p-7">
      <ul className="space-y-3.5">
        {STEPS.map((step, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-3"
          >
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
              i <= activeIndex
                ? 'bg-foreground text-background'
                : 'border border-border text-muted-foreground'
            }`}>
              {i < activeIndex ? '✓' : i + 1}
            </div>
            <span className={`text-sm ${
              i <= activeIndex ? 'font-medium text-foreground' : 'text-muted-foreground'
            }`}>
              {step}
            </span>
            {i === activeIndex && (
              <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-foreground" />
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
