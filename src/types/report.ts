// API response types for the AI Visibility report

export interface RunRequest {
  brand_name: string;
  website: string;
  competitors: string[];
}

export interface RunResponse {
  run_id: string;
}

export interface MetricCard {
  title: string;
  subtitle: string;
  metric_value: string;
  metric_label: string;
  metric_support?: string;
  insight?: string;
  details?: CompetitorVisibility[] | ModelBreakdown[] | OpportunityEvent[];
  detail_label?: string;
  // Competitor presence specific
  proof_line?: string;
  top_rival_line?: string;
  assistant_breakdown?: AssistantBreakdown[];
  evidence?: EvidenceItem[];
}

export interface CompetitorVisibility {
  name: string;
  value: string;
}

export interface ModelBreakdown {
  model: string;
  value: string;
}

export interface OpportunityEvent {
  question: string;
  model: string;
  answer: string;
}

export interface AssistantBreakdown {
  model: string;
  competitors: { name: string; count: number }[];
}

export interface EvidenceItem {
  model: string;
  question: string;
  answer: string;
  competitors_found: string[];
}

export interface WhatThisMeans {
  title: string;
  bullets: string[];
  note?: string;
}

export interface ActionSection {
  primary_title: string;
  locked_text?: string;
  cta_text: string;
  cta_proof?: string;
  secondary_title?: string;
  secondary_teaser?: string;
  secondary_bullets?: string[];
}

export interface QuestionTested {
  question: string;
  index: number;
}

export interface ModelAnswer {
  model: string;
  questions: {
    question: string;
    answer: string;
    brand_highlighted?: boolean;
    competitors_highlighted?: string[];
  }[];
}

export interface Highlight {
  type: 'brand' | 'competitor';
  text: string;
}

export interface ReportData {
  status: 'pending' | 'running' | 'complete' | 'failed';
  brand_name?: string;
  website?: string;
  total_questions?: number;
  models_tested?: string[];
  failed_message?: string;
  metrics?: MetricCard[];
  what_this_means?: WhatThisMeans;
  action_sections?: ActionSection[];
  questions_tested?: QuestionTested[];
  model_answers?: ModelAnswer[];
  highlights?: Highlight[];
  loom_url?: string;
  loom_title?: string;
  loom_helper?: string;
  cta_subline?: string[];
}
