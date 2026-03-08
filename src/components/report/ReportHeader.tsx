import { motion } from 'framer-motion';
import { ReportData } from '@/types/report';

interface Props {
  data: ReportData | null;
}

export default function ReportHeader({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-surface-elevated mb-8 p-6 sm:p-7"
    >
      <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        AI buyer visibility snapshot
      </h1>
      {data?.brand_name && (
        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{data.brand_name}</span>
          {data.website && <span>{data.website}</span>}
          {data.total_questions != null && <span>{data.total_questions} questions tested</span>}
          {data.models_tested && <span>{data.models_tested.join(', ')}</span>}
        </div>
      )}
    </motion.div>
  );
}
