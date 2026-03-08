import { motion } from 'framer-motion';
import { WhatThisMeans } from '@/types/report';
import { Lightbulb } from 'lucide-react';

interface Props {
  data: WhatThisMeans;
}

export default function WhatThisMeansSection({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="card-surface mt-6 overflow-hidden"
    >
      <div className="border-b border-border px-6 py-4 sm:px-7">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-metric-amber/10">
            <Lightbulb className="h-3.5 w-3.5 text-metric-amber" />
          </div>
          <h3 className="text-base font-semibold text-foreground">{data.title}</h3>
        </div>
      </div>
      <div className="p-6 sm:p-7">
        <ul className="space-y-3">
          {data.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-metric-amber" />
              {b}
            </motion.li>
          ))}
        </ul>
        {data.note && (
          <p className="mt-4 rounded-lg bg-surface-highlight px-4 py-3 text-xs italic text-muted-foreground">
            {data.note}
          </p>
        )}
      </div>
    </motion.div>
  );
}
