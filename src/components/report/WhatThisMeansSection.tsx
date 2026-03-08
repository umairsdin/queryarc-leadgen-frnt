import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { WhatThisMeans } from '@/types/report';

interface Props {
  data: WhatThisMeans;
}

export default function WhatThisMeansSection({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-premium mt-8 p-6 sm:p-8"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl text-foreground">{data.title}</h3>
          <ul className="mt-3 space-y-2">
            {data.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                {b}
              </li>
            ))}
          </ul>
          {data.note && (
            <p className="mt-3 text-xs italic text-muted-foreground">{data.note}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
