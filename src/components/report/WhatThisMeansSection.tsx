import { motion } from 'framer-motion';
import { WhatThisMeans } from '@/types/report';

interface Props {
  data: WhatThisMeans;
}

export default function WhatThisMeansSection({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="card-surface mt-6 p-6 sm:p-7"
    >
      <h3 className="text-base font-medium text-foreground">{data.title}</h3>
      <ul className="mt-3 space-y-2">
        {data.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
            {b}
          </li>
        ))}
      </ul>
      {data.note && (
        <p className="mt-3 text-xs italic text-muted-foreground">{data.note}</p>
      )}
    </motion.div>
  );
}
