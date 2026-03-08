// API response types for the AI Visibility report — matches /api/run/{run_id}

export interface ReportData {
  run_id: string;
  status: 'pending' | 'running' | 'complete' | 'failed';
  brand_name: string;
  website: string;
  competitors: string[];
  models_attempted: string[];
  error_message: string;
  questions: string[];
  answers: FlatAnswer[];
  model_answers: ModelAnswerGroup[];

  // Analysis
  visibility_rate: RateMetric;
  competitor_visibility: CompetitorVisibilityItem[];
  competitor_presence_card: CompetitorPresenceCard;
  open_opportunity_rate: RateMetric;
  opportunity_events: OpportunityEvent[];
  opportunity_model_breakdown: Record<string, number>;

  // Display helpers
  models_header: string;
  helper_text: string;
  top_insight: string;

  // Narrative
  what_this_means: WhatThisMeans;
  action_oriented: ActionOriented;
  cta_subline: string;
}

export interface RateMetric {
  percent: number;
  count: number;
  total: number;
}

export interface CompetitorVisibilityItem {
  brand: string;
  percent: number;
  count: number;
}

export interface CompetitorPresenceCard {
  brand_question_id: string;
  exclusion_applied: boolean;
  eligible_answer_count: number;
  piggyback_overall: { pct: number; num: number; denom: number };
  rows: PresenceRow[];
  top_rival: { competitor: string; assistants_count: number; assistants_denom: number };
}

export interface PresenceRow {
  model: string;
  denom: number;
  piggyback_pct: number;
  competitor_pct: Record<string, number>;
}

export interface OpportunityEvent {
  buyer_label: string;
  buyer_question: string;
  model: string;
  answer_text: string;
}

export interface WhatThisMeans {
  title: string;
  bullets: string[];
  note?: string;
}

export interface ActionOriented {
  title: string;
  teaser: string;
  bullets: string[];
}

export interface HighlightSpan {
  start: number;
  end: number;
  type: 'brand' | 'competitor';
  name: string;
}

export interface FlatAnswer {
  question_id: number;
  question: string;
  model: string;
  answer_text: string;
  recommended_brands: string[];
  highlights: HighlightSpan[];
}

export interface ModelAnswerGroup {
  model_key: string;
  model: string;
  status: string;
  completed_count: number;
  answers: ModelAnswerEntry[];
}

export interface ModelAnswerEntry {
  question_id: number;
  question: string;
  answer_text: string;
  status: string;
  highlights: HighlightSpan[];
}
