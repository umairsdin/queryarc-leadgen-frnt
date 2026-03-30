import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Users, Target, Shield, Zap, CheckCircle } from 'lucide-react';
import { submitRun } from '@/lib/api';
import QueryArcLogo from '@/components/shared/QueryArcLogo';

const AI_MODELS = [
  { name: 'ChatGPT', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', fallback: 'GPT' },
  { name: 'Claude', logo: 'https://cdn.simpleicons.org/anthropic/6366f1', fallback: 'CLD' },
  { name: 'Gemini', logo: 'https://cdn.simpleicons.org/googlegemini/6366f1', fallback: 'GEM' },
  { name: 'Perplexity', logo: 'https://cdn.simpleicons.org/perplexity/6366f1', fallback: 'PPX' },
  { name: 'Grok', logo: 'https://cdn.simpleicons.org/x/6366f1', fallback: 'GRK' },
];

const VALUE_PROPS = [
  { icon: Eye, title: 'Brand visibility', text: 'See whether your brand appears when buyers ask AI what to choose' },
  { icon: Users, title: 'Competitor tracking', text: 'Find where competitors are being recommended ahead of you' },
  { icon: Target, title: 'Open opportunities', text: 'Spot unclaimed answers before competitors own them' },
];

const TRUST_SIGNALS = [
  'Free — no credit card',
  'No login required',
  'Results in under 60 seconds',
];

export default function AIVisibilityPage() {
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState('');
  const [website, setWebsite] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!brandName.trim()) e.brand_name = 'Brand name is required.';
    if (!website.trim()) e.website = 'Brand website is required.';
    const comps = competitors.split(',').map(c => c.trim()).filter(Boolean);
    if (comps.length > 3) e.competitors = 'You can add up to 3 competitors.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const comps = competitors.split(',').map(c => c.trim()).filter(Boolean);
      const payload = { brand_name: brandName, website, competitors: comps };
      const { run_id } = await submitRun(payload);
      navigate(`/report/${run_id}`);
    } catch (err) {
      setErrors({ submit: `Something went wrong: ${err instanceof Error ? err.message : 'Unknown error'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(239_84%_67%/0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        {/* Brand header */}
        <div className="flex items-center gap-2.5 mb-10">
          <QueryArcLogo />
          <span className="font-bold text-lg text-foreground">QueryArc</span>
        </div>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            Free AI visibility audit
          </div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your buyers may already be
            <br />
            <span className="text-gradient">choosing competitors</span> in AI answers
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            When buyers ask ChatGPT, Gemini, or Perplexity for recommendations, they skip Google.
            See if your brand shows up — or if competitors are winning.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="card-surface-elevated p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Run your free AI visibility audit</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                See how 5 AI assistants talk about your brand to buyers, then use the report to decide whether you need the QueryArc Diagnostic or Growth Blueprint.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="brand_name">
                    Brand name
                  </label>
                  <input
                    id="brand_name"
                    type="text"
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    placeholder="e.g. Datadog"
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm transition-all placeholder:text-muted-foreground/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                  {errors.brand_name && <p className="mt-1 text-xs text-destructive">{errors.brand_name}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="website">
                    Brand website
                  </label>
                  <input
                    id="website"
                    type="text"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    placeholder="e.g. datadoghq.com"
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm transition-all placeholder:text-muted-foreground/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                  {errors.website && <p className="mt-1 text-xs text-destructive">{errors.website}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="competitors">
                    Competitors <span className="font-normal text-muted-foreground">(optional, up to 3)</span>
                  </label>
                  <textarea
                    id="competitors"
                    value={competitors}
                    onChange={e => setCompetitors(e.target.value)}
                    placeholder="e.g. Dynatrace, New Relic, Splunk"
                    rows={2}
                    className="flex w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm transition-all placeholder:text-muted-foreground/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                  {errors.competitors && <p className="mt-1 text-xs text-destructive">{errors.competitors}</p>}
                </div>

                {errors.submit && (
                  <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3 text-sm text-destructive">
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex w-full items-center justify-center gap-2.5 px-5 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Running…
                    </span>
                  ) : (
                    <>
                      Run my free AI visibility audit
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Trust signals */}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {TRUST_SIGNALS.map((s, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-metric-green" />
                    {s}
                  </span>
                ))}
              </div>

              {/* AI Models */}
              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 text-label">Analyzed across 5 AI assistants</p>
                <div className="flex items-center gap-5">
                  {AI_MODELS.map(m => (
                    <div key={m.name} className="flex flex-col items-center gap-1.5">
                      <img
                        src={m.logo}
                        alt={`${m.name} logo`}
                        className="h-6 w-6"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                      />
                      <span className="hidden rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">{m.fallback}</span>
                      <span className="text-[11px] text-muted-foreground">{m.name}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground/70 leading-snug">
                  Free snapshot: all 5 engines · 3 questions. Paid Diagnostic: ChatGPT + Gemini · 10 neutral prompts · 3 runs each.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-6 lg:col-span-3"
          >
            {/* Value Props */}
            <div className="space-y-4">
              {VALUE_PROPS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="group card-surface p-5 sm:p-6 transition-all hover:border-primary/20 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <p.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="card-surface p-5 sm:p-6"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">What your free audit includes</h3>
              <div className="overflow-hidden rounded-lg border border-border">
                {[
                  { label: 'AI Visibility', value: '44%', color: 'text-metric-amber' },
                  { label: 'Competitor Piggyback', value: '78%', color: 'text-metric-red' },
                  { label: 'Open Opportunity', value: '22%', color: 'text-metric-blue' },
                  { label: 'Most surfaced competitor', value: 'Alpha CRM', color: 'text-foreground' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-border px-4 py-3 text-sm last:border-b-0 hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={`font-semibold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Plus competitor visibility breakdown, model-by-model answers, open opportunities, and clear next-step guidance if you need the Diagnostic or Growth Blueprint.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom urgency section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-20 max-w-3xl text-center"
        >
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-8 sm:p-12">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              AI answers can redirect buyers before they ever reach your website
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              When buyers ask AI assistants for recommendations, they often skip Google and choose from the brands mentioned in the answer. That means competitors can gain consideration and conversions without any obvious drop showing up in your analytics.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
