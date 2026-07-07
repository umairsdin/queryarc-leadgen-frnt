import { motion } from 'framer-motion';
import { AGENCY_COMPARISON } from '@/lib/pitch-content';

export default function AgencyComparison() {
  const { columns, rows } = AGENCY_COMPARISON;

  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Agency results without the agency price
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            You don&apos;t need a $5,000–$15,000/month retainer to win AI answers. You need
            the right plan and someone to execute it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-9 overflow-x-auto"
        >
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-[28%] p-3 text-left" />
                {columns.map((c, i) => (
                  <th
                    key={c}
                    className={`p-3 text-left font-bold ${
                      i === columns.length - 1 ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="p-3 font-semibold text-foreground">{row.label}</td>
                  <td className="p-3 text-muted-foreground">{row.agency}</td>
                  <td className="p-3 text-muted-foreground">{row.tool}</td>
                  <td className="bg-primary-light/30 p-3 font-medium text-foreground">
                    {row.queryarc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
