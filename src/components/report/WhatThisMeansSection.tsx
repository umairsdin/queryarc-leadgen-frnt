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
      className="card-surface mt-8 overflow-hidden"
    >
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-metric-amber/10">
            <Lightbulb className="h-4.5 w-4.5 text-metric-amber" />
          </div>
          <h3 className="text-lg font-bold text-foreground">{data.title}</h3>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <ul className="space-y-4">
          {data.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-metric-amber" />
              {b}
            </motion.li>
          ))}
        </ul>
        {data.note && (
          <p className="mt-5 rounded-xl bg-secondary border border-border px-5 py-3.5 text-sm italic text-muted-foreground leading-relaxed">
            {data.note}
          </p>
        )}
      </div>
    </motion.div>
  );
}