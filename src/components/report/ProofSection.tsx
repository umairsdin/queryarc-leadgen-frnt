import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
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

    // Sort highlights by start position
    const sorted = [...highlights].sort((a, b) => a.start - b.start);
    const parts: React.ReactNode[] = [];
    let lastEnd = 0;

    sorted.forEach((h, i) => {
      if (h.start > lastEnd) {
        parts.push(<span key={`t-${i}`}>{text.slice(lastEnd, h.start)}</span>);
      }
      const cls = h.type === 'brand'
        ? 'font-semibold text-foreground'
        : 'font-medium text-destructive';
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="card-surface mt-6 p-6 sm:p-7"
    >
      <h3 className="text-base font-medium text-foreground">Proof from this snapshot</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Verbatim model outputs used for this report. Brand and competitors are highlighted.
      </p>

      {questions && questions.length > 0 && (
        <div className="mt-5">
          <h4 className="text-label mb-2">Questions tested</h4>
          <ul className="space-y-1.5">
            {questions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border text-[10px] font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {modelAnswers && modelAnswers.length > 0 && (
        <div className="mt-5">
          <h4 className="text-label mb-3">Select a model to view answers</h4>
          <div className="flex flex-wrap gap-2">
            {modelAnswers.map(m => (
              <button
                key={m.model}
                onClick={() => setSelectedModel(selectedModel === m.model ? null : m.model)}
                className={`rounded-md px-3 py-1.5 text-sm transition-all ${
                  selectedModel === m.model ? 'btn-primary' : 'btn-outline'
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
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  {activeModel.answers.map((qa, i) => (
                    <div key={i} className="rounded-lg border border-border p-4">
                      <div className="flex items-start gap-2">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/40" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{qa.question}</p>
                          <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                            {renderHighlightedText(qa.answer_text, qa.highlights)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
