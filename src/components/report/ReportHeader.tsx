import { motion } from 'framer-motion';
import { CanonicalReport } from '@/types/report';

interface Props {
  report: CanonicalReport | null;
}

export default function ReportHeader({ report }: Props) {
  const input = report?.input;
  const summary = report?.summary;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 rounded-full bg-foreground" />
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          AI Visibility Report
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {input?.brand_name || 'Loading…'}
      </h1>

      {input && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {input.website && (
            <span className="rounded-full bg-badge-bg px-3 py-1 text-xs font-medium text-muted-foreground">
              {input.website}
            </span>
          )}
          {summary?.answers_analyzed != null && summary.answers_analyzed > 0 && (
            <span className="rounded-full bg-badge-bg px-3 py-1 text-xs font-medium text-muted-foreground">
              {summary.answers_analyzed} answers analyzed
            </span>
          )}
          {summary?.models_header && (
            <span className="rounded-full bg-badge-bg px-3 py-1 text-xs font-medium text-muted-foreground">
              {summary.models_header}
            </span>
          )}
        </div>
      )}
    </motion.header>
  );
}
