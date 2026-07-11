/**
 * Editable content for the /fix pitch page.
 *
 * Everything the pitch page shows that is NOT pulled from the live report
 * lives here so it can be edited in one place.
 */

/** Book a 30-min call with Umair (cal.com). Used for every "talk to Umair" action. */
export const CAL_BOOKING_URL =
  "https://cal.com/umair-salahuddin-qtowvc/30min?overlayCalendar=true";

export const CHECKOUT = {
  // Existing checkout flow (queryarc.com handles payment).
  growth: "https://queryarc.com/checkout?plan=growth",
  diagnostic: "https://queryarc.com/checkout?plan=diagnostic",
  // Sprint is consultative and handled through the main contact flow.
  sprintContact: "https://queryarc.com/contact/",
  // Optional low-friction call for hesitant buyers — books a 30-min slot.
  call: CAL_BOOKING_URL,
};

/** Append brand + run context to a checkout URL so personalization carries over. */
export function checkoutUrl(base: string, brand?: string, runId?: string): string {
  const params = new URLSearchParams();
  if (brand && brand !== "your brand") params.set("brand", brand);
  if (runId) params.set("run", runId);
  const q = params.toString();
  if (!q) return base;
  return `${base}${base.includes("?") ? "&" : "?"}${q}`;
}

/** Custom done-for-you tier. Not a checkout plan — leads to "Talk to us". */
export const SPRINT = {
  name: "Fix-in-a-Box Sprint",
  priceRange: "$2,999–$4,900",
  priceNote: "custom scope",
  investmentRange: "$2,999–$4,900",
  quickDiff: "No bandwidth? We build it, ship it, and prove it moved",
  summary: "Custom scope — typically 3–6 priority pages, chosen with you on a quick call. Ready-to-publish or implemented in your CMS, then the same audit re-run for before/after proof.",
  includes: [
    "We implement the approved blueprint for you",
    "Ships in 2–3 weeks; controlled rerun 2–4 weeks after publication",
    "Before / after proof that your visibility moved",
  ],
  note: "Final page count is confirmed on a quick call — nothing rigid to squeeze into.",
  cta: "Talk to us about the Sprint",
  // Sprint is consultative — the CTA books a 30-min call directly (cal.com).
  href: CAL_BOOKING_URL,
};

/**
 * Recurring monitoring tier — step four (Defend) after the Sprint.
 * Kept in sync with the marketing site's Defense Plan. Consultative → "Talk to us".
 */
export const DEFENSE = {
  name: "Defense Plan",
  price: "$1,500",
  cadence: "/month",
  priceNote: "3-month minimum",
  committedNote:
    "$1,250/month on a 6-month commitment — priority turnaround + a quarterly review.",
  quickDiff: "Keep the AI visibility you earned",
  summary:
    "Most Sprint clients stay on a Defense Plan to protect what moved. This is step four — Defend — after the Sprint.",
  includes: [
    "A monthly rerun of your exact audit",
    "Drift alerts when AI assistants drop you or start surfacing a competitor",
    "One fix cycle per month",
    "A monthly memo",
  ],
  cta: "Talk to us about Defense",
  href: CAL_BOOKING_URL,
};

/** Founder-led trust block. Built to expand into a team later (see `team`). */
export const FOUNDER = {
  name: "Umair Salahuddin",
  role: "AI Visibility Research & Product",
  photo: "/team/umair.jpg",
  initials: "US",
  // Aligned with the marketing site's founder story (Arc Rank methodology).
  bio: "I'm the creator of QueryArc and the Arc Rank methodology, and I've spent years researching how large language models interpret, extract, and reuse content across AI search. QueryArc is small on purpose: when you work with us, you work directly with me — not a rotating cast of account managers.",
  credentials: [
    "Creator of QueryArc and the Arc Rank methodology",
    "Lead researcher behind AI-first content frameworks",
    "Years analyzing how ChatGPT, Claude, Gemini, Perplexity & Grok choose brands",
  ],
  // Founder CTA books a 30-min call directly (cal.com).
  links: {
    book: CAL_BOOKING_URL,
  },
};

/** Placeholder for the future team section. Leave empty to hide. */
export const TEAM: { name: string; role: string; initials: string }[] = [
  // TODO: add teammates here as you grow, e.g.
  // { name: "Jane Doe", role: "Content Strategist", initials: "JD" },
];

/** Why a tool/agency can't do this — the "human intervention" argument. */
export const AGENCY_COMPARISON = {
  columns: ["Traditional SEO agency", "AI-visibility tools", "QueryArc (with Umair)"],
  rows: [
    {
      label: "Who does the work",
      agency: "Junior team, account managers",
      tool: "Nobody — it just reports",
      queryarc: "Umair, directly with you",
    },
    {
      label: "What you get",
      agency: "Generic SEO retainer",
      tool: "Dashboards & alerts",
      queryarc: "A built + executed fix plan",
    },
    {
      label: "Tailored to your business",
      agency: "Sometimes",
      tool: "No — same metrics for everyone",
      queryarc: "Yes — per category & competitor",
    },
    {
      label: "Time to value",
      agency: "Weeks to months",
      tool: "Instant data, zero fixes",
      queryarc: "Diagnosis in days, not months",
    },
    {
      label: "Typical cost",
      agency: "$5,000–$15,000 / month",
      tool: "$99–$500 / month, ongoing",
      queryarc: "From $199, one-time",
    },
  ],
};

/** The loop: Audit → Optimization → Monitoring. The report the buyer just read is Stage 1. */
export const METHOD = [
  {
    step: "Stage 1 · Audit",
    title: "Find the gap",
    body: "The report you just read is a 3-question sample of this. The full Audit runs 10 buyer prompts, 3 times each, across all 5 assistants — so you see every gap and exactly who's winning it.",
  },
  {
    step: "Stage 2 · Optimization",
    title: "Tilt the answers your way",
    body: "We apply our methodology to change what AI recommends — the exact pages, positioning and signals. You ship the plan (Blueprint), or we ship it for you (Sprint) and prove the movement.",
  },
  {
    step: "Stage 3 · Monitoring",
    title: "Keep winning",
    body: "Models shift and rivals keep publishing, so the gap reopens. We re-run your audit on schedule, catch it automatically, and act early — the cycle repeats, so you stay recommended.",
  },
];

/** Headline stats — factual / process-based (no fabricated outcome claims). */
export const RESULT_STATS = [
  { value: "5", label: "AI assistants analyzed" },
  { value: "3–5 days", label: "to your diagnosis" },
  { value: "1:1", label: "direct with Umair" },
];

/** Risk reversal. Two distinct outcomes — no double-counting. */
export const GUARANTEE = {
  title: "Specific findings, or you don't pay",
  body: "14-day money-back guarantee. If your report doesn't give you specific, brand-level findings you can act on, email within 14 days for a full refund. We don't promise AI rankings — no one honestly can — but the report will be specific to your brand, and it's still 100% credited toward a Blueprint or Sprint if you move ahead.",
};

/** Founder-led capacity. Kept qualitative — no specific (unverifiable) number. */
export const SCARCITY = {
  // Set to a real number you can commit to if you want a hard "only N slots" badge.
  slotsPerMonth: 0,
  note: "Because every engagement is run directly by Umair, only a handful of new clients start each month.",
};

export const PITCH_FAQS = [
  {
    q: "Why can't I just use an AI-visibility tracking tool?",
    a: "Tracking tools tell you where you're invisible — they don't fix it. Earning AI mentions takes new content and positioning work tailored to your business. A dashboard can't write your pages or change how AI describes you.",
  },
  {
    q: "I already have a marketing team. Do I still need this?",
    a: "Perfect — the Blueprint is built for teams to execute. You get the exact pages, titles and copy direction so your team ships the right things instead of guessing.",
  },
  {
    q: "How is this different from an SEO agency?",
    a: "You work directly with Umair, not a junior account team — at a fraction of agency cost, with your diagnosis in days instead of months.",
  },
  {
    q: "What if the free report didn't look that bad?",
    a: "The free snapshot is 3 questions, run once each — a small sample. Showing up there is good news, but it isn't a moat: answers shift run to run, and buyers phrase the same question hundreds of ways. The paid report runs 10 high-intent prompts, 3 times each, across all 5 assistants — enough to see whether you're reliably recommended or just occasionally mentioned.",
  },
  {
    q: "What exactly do I get?",
    a: "The $199 Diagnostic confirms and quantifies the gap across more prompts and runs. The $499 Blueprint adds the root-cause diagnosis plus the exact pages and copy to fix it — and the Diagnostic price is credited toward it.",
  },
];
