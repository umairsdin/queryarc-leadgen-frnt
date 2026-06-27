import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { GUARANTEE } from '@/lib/pitch-content';

export default function GuaranteeSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="card-surface flex flex-col items-start gap-5 border-metric-green/30 bg-metric-green-light/40 p-7 sm:flex-row sm:items-center sm:p-8"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-metric-green/15">
            <ShieldCheck className="h-6 w-6 text-metric-green" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{GUARANTEE.title}</h2>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              {GUARANTEE.body}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
