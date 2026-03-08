import { motion } from 'framer-motion';
import { CanonicalReport } from '@/types/report';

interface Props {
  report: CanonicalReport | null;
}

export default function ReportHeader({ report }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-surface-elevated mb-8 p-6 sm:p-7"
    >
      <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        AI buyer visibility snapshot
      </h1>
      {report?.input?.brand_name && (
        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{report.input.brand_name}</span>
          {report.input.website && <span>{report.input.website}</span>}
          {report.summary?.answers_analyzed > 0 && (
            <span>{report.summary.answers_analyzed} answers analyzed</span>
          )}
          {report.summary?.models_header && <span>{report.summary.models_header}</span>}
        </div>
      )}
    </motion.div>
  );
}
