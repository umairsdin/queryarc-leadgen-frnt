import type { MetadataRoute } from "next";

export type RouteType = "tool" | "report";

export type FaqEntry = {
  question: string;
  answer: string;
};

export type RouteEntry = {
  id: "aiVisibility" | "report" | "fix";
  path: string;
  title: string;
  description: string;
  h1: string;
  type: RouteType;
  index: boolean;
  dynamic?: boolean;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  legacyPaths?: string[];
  faqs?: FaqEntry[];
  facts?: string[];
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const siteConfig = {
  name: "QueryArc",
  url: trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://queryarc.com"),
  defaultTitle: "QueryArc AI Visibility Audit",
  defaultDescription:
    "Run QueryArc's free AI visibility audit to see whether your brand appears in AI answers before competitors win the recommendation.",
};

export const auditFaqs: FaqEntry[] = [
  {
    question: "What is an AI visibility audit?",
    answer:
      "An AI visibility audit checks whether AI assistants mention your brand when buyers ask for recommendations in your category.",
  },
  {
    question: "Which AI assistants does the free audit check?",
    answer:
      "The free snapshot checks ChatGPT, Claude, Gemini, Perplexity, and Grok across three buyer-style questions.",
  },
  {
    question: "What do the QueryArc scores mean?",
    answer:
      "The report summarizes brand visibility, competitor piggybacking, open opportunity, model-by-model answers, and next-step guidance.",
  },
];

export const routes: RouteEntry[] = [
  {
    id: "aiVisibility",
    path: "/ai-visibility/",
    title: "Free AI Visibility Audit | QueryArc",
    description:
      "Run QueryArc's free AI visibility audit to see whether your brand appears in ChatGPT, Claude, Gemini, Perplexity, and Grok answers before competitors win the recommendation.",
    h1: "Your buyers may already be choosing competitors in AI answers",
    type: "tool",
    index: true,
    priority: 1,
    changeFrequency: "weekly",
    legacyPaths: ["/"],
    faqs: auditFaqs,
    facts: [
      "Free AI visibility snapshot with no credit card required.",
      "Analyzes brand mentions, competitor pressure, and open AI-answer opportunities.",
      "Checks five AI assistants and returns guidance in under 60 seconds.",
    ],
  },
  {
    id: "report",
    path: "/report/[run_id]/",
    title: "AI Visibility Report | QueryArc",
    description:
      "View a QueryArc AI visibility report with brand visibility, competitor piggybacking, open opportunities, and next-step guidance.",
    h1: "AI Visibility Report",
    type: "report",
    index: false,
    dynamic: true,
    priority: 0,
    changeFrequency: "never",
  },
  {
    id: "fix",
    path: "/fix/[run_id]/",
    title: "Fix Your AI Visibility | QueryArc",
    description:
      "Turn your QueryArc AI visibility report into a done-with-you fix plan — built and executed with founder Umair Salahuddin.",
    h1: "Fix Your AI Visibility",
    type: "report",
    index: false,
    dynamic: true,
    priority: 0,
    changeFrequency: "never",
  },
];

export const getRoute = (id: RouteEntry["id"]) => {
  const route = routes.find((entry) => entry.id === id);
  if (!route) {
    throw new Error(`Unknown route: ${id}`);
  }
  return route;
};

export const canonicalUrl = (path: string) => `${siteConfig.url}${path}`;

export const sitemapRoutes = routes.filter((route) => route.index && !route.dynamic);

export const legacyRedirects = routes.flatMap((route) =>
  (route.legacyPaths || []).map((source) => ({
    source,
    destination: route.path,
  })),
);
