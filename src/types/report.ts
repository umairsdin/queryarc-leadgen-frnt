// Canonical API response types — GET /api/run/{run_id}

export interface CanonicalReport {
  schema_version: string;
  report_state: 'queued' | 'processing' | 'partial' | 'completed' | 'failed';
  status: string; // legacy display state
  readiness: Readiness;
  run: RunMeta;
  input: ReportInput;
  progress: ReportProgress;
  summary: ReportSummary;
  metrics: ReportMetrics;
  sections: ReportSections;
  resources: ReportResources;
  data: ReportDataPayload;
  narratives: ReportNarratives;
  errors: ReportErrors;
  field_contract?: unknown;
}

export interface Readiness {
  is_terminal: boolean;
  is_ready_for_render: boolean;
}

export interface RunMeta {
  id: string;
  error_message?: string;
  [key: string]: unknown;
}

export interface ReportInput {
  brand_name: string;
  website: string;
  competitors: string[];
}

export interface ReportProgress {
  stage_label?: string;
  message?: string;
  [key: string]: unknown;
}

export interface ReportSummary {
  answers_analyzed: number;
  models_header: string;
  questions_tested: number;
  top_competitor?: string;
  [key: string]: unknown;
}

export interface RateMetric {
  percent: number;
  count: number;
  total?: number;
  denom?: number;
}

export interface CompetitorVisibilityItem {
  brand: string;
  percent: number;
  count: number;
}

export interface CompetitorPiggybackRate {
  pct: number;
  num: number;
  denom: number;
  top_rival?: {
    competitor: string;
    assistants_count: number;
    assistants_denom: number;
  };
  rows?: PiggybackRow[];
}

export interface PiggybackRow {
  model: string;
  denom: number;
  piggyback_pct: number;
  competitor_pct: Record<string, number>;
}

export interface ReportMetrics {
  visibility_rate: RateMetric;
  competitor_piggyback_rate: CompetitorPiggybackRate;
  open_opportunity_rate: RateMetric;
  competitor_visibility: CompetitorVisibilityItem[];
  opportunity_model_breakdown?: Record<string, number>;
  [key: string]: unknown;
}

export interface CompetitorPresenceCard {
  brand_question_id?: string;
  exclusion_applied?: boolean;
  eligible_answer_count?: number;
  piggyback_overall: { pct: number; num: number; denom: number };
  rows?: PiggybackRow[];
  top_rival?: { competitor: string; assistants_count: number; assistants_denom: number };
}

export interface ReportSections {
  header?: boolean;
  progress?: boolean;
  brand_visibility_card?: boolean;
  competitor_presence_card?: boolean;
  open_opportunity_card?: boolean;
  what_this_means?: boolean;
  proof_from_snapshot?: boolean;
  primary_cta?: boolean;
  final_cta?: boolean;
  [key: string]: boolean | undefined;
}

export interface EvidenceResource {
  ready: boolean;
  state: string;
  url_template?: string;
}

export interface ReportResources {
  evidence: EvidenceResource;
  [key: string]: unknown;
}

export interface HighlightSpan {
  start: number;
  end: number;
  type: 'brand' | 'competitor';
  name: string;
}

export interface ModelAnswerEntry {
  question_id: number;
  question: string;
  answer_text: string;
  status: string;
  highlights: HighlightSpan[];
}

export interface ModelAnswerGroup {
  model_key: string;
  model: string;
  status: string;
  completed_count: number;
  answers: ModelAnswerEntry[];
}

export interface OpportunityEvent {
  buyer_label: string;
  buyer_question: string;
  model: string;
  answer_text: string;
}

export interface ReportDataPayload {
  questions?: string[];
  model_answers?: ModelAnswerGroup[];
  opportunity_events?: OpportunityEvent[];
  opportunity_model_breakdown?: Record<string, number>;
  competitor_presence_card?: CompetitorPresenceCard;
  [key: string]: unknown;
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

export interface ReportNarratives {
  what_this_means?: WhatThisMeans;
  action_oriented?: ActionOriented;
  cta_subline?: string;
  top_insight?: string;
  [key: string]: unknown;
}

export interface ReportErrors {
  message?: string;
  code?: string;
  [key: string]: unknown;
}
