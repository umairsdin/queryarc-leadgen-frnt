/**
 * Editable content for the /fix pitch page.
 *
 * ⚠️ DUMMY DATA — replace the values marked `TODO` with real content.
 * Everything the pitch page shows that is NOT pulled from the live report
 * lives here so it can be edited in one place.
 */

export const CHECKOUT = {
  // Existing checkout flow (queryarc.com handles payment).
  growth: "https://queryarc.com/checkout?plan=growth",
  diagnostic: "https://queryarc.com/checkout?plan=diagnostic",
  // Sprint is consultative — "Talk to us", price confirmed on a call.
  sprintContact: "https://queryarc.com/contact/",
  // Optional low-friction call for hesitant buyers.
  call: "https://queryarc.com/contact/",
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
  // A range, not a fixed number — final price is set on the call.
  priceRange: "$2,999–$4,900",
  priceNote: "custom scope",
  quickDiff: "Done-for-you — we ship the fixes for you",
  summary: "We implement the fixes and rerun the audit to prove your visibility moved.",
  includes: [
    "We implement the approved blueprint for you",
    "Priority pages shipped, aligned to how AI assistants answer",
    "Before / after proof that your visibility moved",
  ],
  note: "Final scope and price are confirmed on a quick call — nothing rigid to squeeze into.",
  cta: "Talk to us about the Sprint",
  href: "https://queryarc.com/contact/",
};

/** Founder-led trust block. Built to expand into a team later (see `team`). */
export const FOUNDER = {
  name: "Umair Salahuddin",
  role: "Founder of QueryArc",
  // TODO: drop a real headshot at /public/team/umair.jpg
  photo: "/team/umair.jpg",
  initials: "US",
  // Aligned with the marketing site's founder story (Arc Rank methodology).
  bio: "I'm the creator of QueryArc and the Arc Rank methodology, and I've spent years researching how large language models interpret, extract, and reuse content across AI search. QueryArc is small on purpose: when you work with us, you work directly with me — not a rotating cast of account managers.",
  credentials: [
    "Creator of QueryArc and the Arc Rank methodology",
    "Lead researcher behind AI-first content frameworks",
    "Years analyzing how ChatGPT, Claude, Gemini, Perplexity & Grok choose brands",
  ],
  // TODO: add real links or remove.
  links: {
    linkedin: "https://www.linkedin.com/in/umair-salahuddin/",
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
      queryarc: "The founder, directly with you",
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
      queryarc: "Plan within 48 hours",
    },
    {
      label: "Typical cost",
      agency: "$5,000–$15,000 / month", // TODO: confirm framing
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

/** Social proof — DUMMY. Replace with real testimonials/logos/results. */
export const TESTIMONIALS = [
  {
    quote:
      "We went from invisible to being the first brand ChatGPT named in our category. Umair didn't just tell us what was wrong — he fixed it with us.", // TODO
    name: "Sample Client", // TODO
    title: "Head of Marketing, B2B SaaS", // TODO
    initials: "SC",
  },
  {
    quote:
      "Cheaper than a month of our old agency, and we actually shipped the changes. The plan was specific enough that my team just executed it.", // TODO
    name: "Sample Client", // TODO
    title: "Founder, E-commerce", // TODO
    initials: "SC",
  },
];

/** Headline result stats — DUMMY. */
export const RESULT_STATS = [
  { value: "3x", label: "more AI answer mentions" }, // TODO
  { value: "48h", label: "to your fix plan" }, // TODO
  { value: "1:1", label: "direct with the founder" },
];

/** Client logos — DUMMY (text fallbacks until real assets exist). */
export const CLIENT_LOGOS = ["Acme", "Northwind", "Globex", "Initech", "Umbrella"]; // TODO

/** Risk reversal. */
export const GUARANTEE = {
  title: "The gap is real, or you don't pay",
  // TODO: confirm exact guarantee terms.
  body: "Start with the $199 Diagnostic. If we can't show you a clear, fixable reason AI assistants skip you, we'll refund it. And the full $199 is credited toward your Blueprint within 14 days.",
};

/** Genuine scarcity — 1:1 with the founder means limited capacity. */
export const SCARCITY = {
  // TODO: set the real number you can actually take on.
  slotsPerMonth: 5,
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
    a: "You work directly with Umair, not a junior account team — at a fraction of agency cost, with a plan in 48 hours instead of months.",
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
