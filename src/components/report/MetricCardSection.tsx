import { motion } from 'framer-motion';
import { CanonicalReport } from '@/types/report';
import VisibilityCard from './VisibilityCard';
import CompetitorCard from './CompetitorCard';
import OpportunityCard from './OpportunityCard';

interface Props {
  report: CanonicalReport;
}

export default function MetricCardSection({ report }: Props) {
  const sec = report.sections;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sec?.brand_visibility_card !== false && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
          <VisibilityCard report={report} />
        </motion.div>
      )}
      {sec?.competitor_presence_card !== false && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <CompetitorCard report={report} />
        </motion.div>
      )}
      {sec?.open_opportunity_card !== false && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
          <OpportunityCard report={report} />
        </motion.div>
      )}
    </div>
  );
}
