import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FileText } from 'lucide-react';
import { ModelAnswerGroup, HighlightSpan } from '@/types/report';

interface Props {
  questions?: string[];
  modelAnswers?: ModelAnswerGroup[];
  brandName?: string;
}

export default function ProofSection({ questions, modelAnswers, brandName }: Props) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const activeModel = modelAnswers?.find(m => m.model === selectedModel);

  const renderHighlightedText = (text: string, highlights: HighlightSpan[]) => {
    if (!highlights || highlights.length === 0) return <span>{text}</span>;
    const sorted = [...highlights].sort((a, b) => a.start - b.start);
    const parts: React.ReactNode[] = [];
    let lastEnd = 0;

    sorted.forEach((h, i) => {
      if (h.start > lastEnd) {
        parts.push(<span key={`t-${i}`}>{text.slice(lastEnd, h.start)}</span>);
      }
      const cls = h.type === 'brand'
        ? 'rounded bg-metric-green/15 px-1 py-0.5 font-semibold text-metric-green'
        : 'rounded bg-metric-red/15 px-1 py-0.5 font-medium text-metric-red';
      parts.push(<span key={`h-${i}`} className={cls}>{text.slice(h.start, h.end)}</span>);
      lastEnd = h.end;
    });

    if (lastEnd < text.length) {
      parts.push(<span key="tail">{text.slice(lastEnd)}</span>);
    }

    return <>{parts}</>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="card-surface mt-8 overflow-hidden"
    >
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-metric-blue/10">
            <FileText className="h-4.5 w-4.5 text-metric-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Proof from this snapshot</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Verbatim model outputs. <span className="rounded bg-metric-green/15 px-1.5 py-0.5 text-metric-green font-medium">Brand</span> and <span className="rounded bg-metric-red/15 px-1.5 py-0.5 text-metric-red font-medium">competitors</span> highlighted.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {questions && questions.length > 0 && (
          <div className="mb-8">
            <h4 className="text-label mb-3">
              Questions tested
            </h4>
            <p className="text-xs text-muted-foreground mb-4">
              Snapshot note: only {questions.length} buyer question{questions.length !== 1 ? 's were' : ' was'} tested.
            </p>
            <div className="space-y-2.5">
              {questions.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.05 }}
                  className="flex items-start gap-3 rounded-xl bg-secondary border border-border p-3.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">{q}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {modelAnswers && modelAnswers.length > 0 && (
          <div>
            <h4 className="text-label mb-3">
              Select a model to view answers
            </h4>
            <div className="flex flex-wrap gap-2">
              {modelAnswers.map(m => (
                <button
                  key={m.model}
                  onClick={() => setSelectedModel(selectedModel === m.model ? null : m.model)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    selectedModel === m.model
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground border border-border'
                  }`}
                >
                  {m.model}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {activeModel && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 space-y-3">
                    {activeModel.answers.map((qa, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded-xl border border-border p-5 transition-colors hover:border-primary/20"
                      >
                        <div className="flex items-start gap-3">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground leading-snug">{qa.question}</p>
                            <p className="mt-3 whitespace-pre-wrap text-sm leading-[1.8] text-muted-foreground">
                              {renderHighlightedText(qa.answer_text, qa.highlights)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}