import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Eye, Users, Target } from 'lucide-react';
import { submitRun } from '@/lib/api';

const AI_MODELS = [
  { name: 'ChatGPT', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', fallback: 'GPT' },
  { name: 'Claude', logo: 'https://cdn.simpleicons.org/anthropic/111111', fallback: 'CLD' },
  { name: 'Gemini', logo: 'https://cdn.simpleicons.org/googlegemini/111111', fallback: 'GEM' },
  { name: 'Perplexity', logo: 'https://cdn.simpleicons.org/perplexity/111111', fallback: 'PPX' },
  { name: 'Grok', logo: 'https://cdn.simpleicons.org/x/111111', fallback: 'GRK' },
];

const PREVIEW_ITEMS = [
  { label: 'AI Visibility', value: '44%' },
  { label: 'Competitor Piggyback', value: '78%' },
  { label: 'Open Opportunity', value: '22%' },
  { label: 'Most surfaced competitor', value: 'Alpha CRM' },
];

const VALUE_PROPS = [
  { icon: Eye, text: 'See whether your brand appears when buyers ask AI what to choose' },
  { icon: Users, text: 'Find where competitors are being recommended ahead of you' },
  { icon: Target, text: 'Spot open opportunities before competitors own them' },
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
      const { run_id } = await submitRun({ brand_name: brandName, website, competitors: comps });
      navigate(`/report/${run_id}`);
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Instant snapshot • Free • No login required
          </div>
          <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Your buyers may already be<br />
            <span className="text-gradient">choosing competitors in AI</span>
          </h1>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form Card - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card-elevated p-6 sm:p-8">
              <h2 className="font-display text-2xl text-foreground">Check your AI visibility</h2>
              <p className="mt-1 text-sm text-muted-foreground">See how AI assistants talk about your brand.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="brand_name">Brand name</label>
                  <input
                    id="brand_name"
                    type="text"
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                  {errors.brand_name && <p className="mt-1 text-xs text-destructive">{errors.brand_name}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="website">Brand website</label>
                  <input
                    id="website"
                    type="text"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                  {errors.website && <p className="mt-1 text-xs text-destructive">{errors.website}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="competitors">
                    Competitors <span className="text-muted-foreground">(optional, up to 3)</span>
                  </label>
                  <textarea
                    id="competitors"
                    value={competitors}
                    onChange={e => setCompetitors(e.target.value)}
                    placeholder="Zendesk, Intercom, Freshdesk"
                    rows={3}
                    className="w-full resize-none rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                  {errors.competitors && <p className="mt-1 text-xs text-destructive">{errors.competitors}</p>}
                </div>

                {errors.submit && <p className="text-sm text-destructive">{errors.submit}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Running...
                    </span>
                  ) : (
                    <>
                      Get my AI visibility snapshot
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* AI Models strip */}
              <div className="mt-6 border-t border-border pt-4">
                <p className="mb-3 text-xs font-medium text-muted-foreground">Analyzed across 5 AI assistants</p>
                <div className="flex items-center gap-4">
                  {AI_MODELS.map(m => (
                    <div key={m.name} className="flex flex-col items-center gap-1">
                      <img
                        src={m.logo}
                        alt={`${m.name} logo`}
                        className="h-5 w-5"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                      />
                      <span className="hidden text-[10px] font-bold text-muted-foreground">{m.fallback}</span>
                      <span className="text-[10px] text-muted-foreground">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 lg:col-span-3"
          >
            {/* Value Props */}
            <div className="card-premium p-6 sm:p-8">
              <div className="space-y-5">
                {VALUE_PROPS.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                      <p.icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{p.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Preview Card */}
            <div className="card-premium p-6 sm:p-8">
              <h3 className="font-display text-lg text-foreground">What your snapshot includes</h3>
              <div className="mt-4 space-y-0 overflow-hidden rounded-lg border border-border">
                {PREVIEW_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-border px-4 py-3 last:border-b-0"
                  >
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Snapshot also includes competitor visibility, model breakdowns, open opportunities, and deeper findings.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom support section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <div className="card-premium p-8 sm:p-12">
            <h2 className="font-display text-2xl text-foreground sm:text-3xl">
              AI answers can redirect buyers before they ever reach your website
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              When buyers ask AI assistants for recommendations, they often skip Google and choose from the brands mentioned in the answer. That means competitors can gain consideration and conversions without any obvious drop showing up in your analytics.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
