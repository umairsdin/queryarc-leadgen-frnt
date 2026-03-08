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
      className="card-surface mt-6 overflow-hidden"
    >
      <div className="border-b border-border px-6 py-4 sm:px-7">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-metric-blue/10">
            <FileText className="h-3.5 w-3.5 text-metric-blue" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Proof from this snapshot</h3>
            <p className="text-xs text-muted-foreground">Verbatim model outputs. <span className="rounded bg-metric-green/15 px-1 py-0.5 text-metric-green">Brand</span> and <span className="rounded bg-metric-red/15 px-1 py-0.5 text-metric-red">competitors</span> highlighted.</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        {questions && questions.length > 0 && (
          <div className="mb-6">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Questions tested
            </h4>
            <div className="space-y-2">
              {questions.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.05 }}
                  className="flex items-start gap-3 rounded-lg bg-surface-highlight p-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-foreground text-[10px] font-bold text-background">
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
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Select a model to view answers
            </h4>
            <div className="flex flex-wrap gap-2">
              {modelAnswers.map(m => (
                <button
                  key={m.model}
                  onClick={() => setSelectedModel(selectedModel === m.model ? null : m.model)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    selectedModel === m.model
                      ? 'bg-foreground text-background shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
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
                  <div className="mt-4 space-y-3">
                    {activeModel.answers.map((qa, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/20"
                      >
                        <div className="flex items-start gap-2.5">
                          <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-metric-blue" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{qa.question}</p>
                            <p className="mt-2.5 whitespace-pre-wrap text-xs leading-[1.7] text-muted-foreground">
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
