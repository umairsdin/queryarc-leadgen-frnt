import { motion } from 'framer-motion';
import { ActionOriented } from '@/types/report';

interface Props {
  action: ActionOriented;
}

export default function ActionSectionBlock({ action }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="mt-8 overflow-hidden rounded-2xl"
      style={{ backgroundImage: 'var(--gradient-primary)' }}
    >
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold text-primary-foreground">{action.title}</h3>
        <p className="mt-2.5 text-base leading-relaxed text-primary-foreground/75">{action.teaser}</p>
      </div>
    </motion.div>
  );
}
