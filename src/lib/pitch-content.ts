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
  priceNote: "defined scope",
  investmentRange: "$2,999–$4,900",
  quickDiff: "No bandwidth? We build it, ship it, and prove it moved",
  summary: "~3 priority pages at $2,999, up to 6 at $4,900 — ready-to-publish or implemented in your CMS, then the same audit re-run for before/after proof.",
  includes: [
    "We implement the approved blueprint for you",
    "Ships in 2–3 weeks; controlled rerun 2–4 weeks after publication",
    "Before / after proof that your visibility moved",
  ],
  note: "Final page count is confirmed on a quick call — nothing rigid to squeeze into.",
  cta: "Talk to us about the Sprint",
  href: CHECKOUT.sprintContact,
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

/** The 3-step method (Diagnose → Plan → Execute). */
export const METHOD = [
  {
    step: "01",
    title: "Diagnose the root cause",
    body: "We go past the score to find why AI assistants pick your competitors — the exact gaps in your content, positioning and signals.",
  },
  {
    step: "02",
    title: "Build your fix plan",
    body: "You get the specific pages to create, with titles, H2s and copy direction — prioritised by what moves the needle first.",
  },
  {
    step: "03",
    title: "Execute it together",
    body: "This isn't a PDF you file away. We work with you to ship the changes and earn the AI mentions your competitors already have.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Before working with Umair, we knew AI search mattered but had no clear path. The audit showed exactly where we were missing in ChatGPT-style answers and what needed to change.",
    name: "Sophie Laurent",
    title: "Head of Marketing, Paris, France",
  },
  {
    quote:
      "The biggest value was clarity. Instead of vague SEO advice, we got a practical plan our team in Berlin could actually execute.",
    name: "Markus Weber",
    title: "Founder, Berlin, Germany",
  },
  {
    quote:
      "Umair helped us understand why competitors were being mentioned and we were not. The recommendations were specific, commercial, and easy to prioritize.",
    name: "Thomas De Smet",
    title: "Commercial Director, Brussels, Belgium",
  },
  {
    quote:
      "This was the first time an audit connected SEO, content, and AI visibility in a way that made sense for our market.",
    name: "Ana Ferreira",
    title: "CMO, Lisbon, Portugal",
  },
  {
    quote:
      "The report gave us a clear view of where our brand was missing in AI-generated answers and what we needed to fix first.",
    name: "James Whitaker",
    title: "Business Development Lead, London, United Kingdom",
  },
  {
    quote:
      "The recommendations were not generic. They were based on how our market, competitors, and buyers actually show up in AI search.",
    name: "Lars Jensen",
    title: "Commercial Director, Copenhagen, Denmark",
  },
];

/** Headline stats — factual / process-based (no fabricated outcome claims). */
export const RESULT_STATS = [
  { value: "5", label: "AI assistants analyzed" },
  { value: "3–5 days", label: "to your diagnosis" },
  { value: "1:1", label: "direct with Umair" },
];

/** Client logos — empty until real assets exist (row hides when empty). */
export const CLIENT_LOGOS: string[] = [];

/** Risk reversal. Two distinct outcomes — no double-counting. */
export const GUARANTEE = {
  title: "Specific findings, or you don't pay",
  body: "Start the $199 Diagnostic risk-free. If your report doesn't give you specific, brand-level findings — the actual AI answers, where you're missing, and what to fix first — email within 14 days for a full refund. And if you move ahead, that $199 is 100% credited toward your Blueprint or Sprint within 14 days, so the diagnosis ends up costing you nothing.",
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
    a: "The free snapshot only runs 3 questions — and they lean on questions that mention your brand by name. Real buyers don't type your name. Neutral buyer questions are where the real gaps show, and that's what the paid report uncovers.",
  },
  {
    q: "What exactly do I get?",
    a: "The $199 Diagnostic confirms and quantifies the gap across more prompts and runs. The $499 Blueprint adds the root-cause diagnosis plus the exact pages and copy to fix it — and the Diagnostic price is credited toward it.",
  },
];
