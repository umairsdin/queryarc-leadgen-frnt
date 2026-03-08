import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { QuestionTested, ModelAnswer, Highlight } from '@/types/report';

interface Props {
  questionsTested?: QuestionTested[];
  modelAnswers?: ModelAnswer[];
  highlights?: Highlight[];
  brandName?: string;
}

export default function ProofSection({ questionsTested, modelAnswers, highlights, brandName }: Props) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const activeModel = modelAnswers?.find(m => m.model === selectedModel);

  const highlightText = (text: string) => {
    if (!highlights || highlights.length === 0) return text;
    let result = text;
    if (brandName) {
      const regex = new RegExp(`(${brandName})`, 'gi');
      result = result.replace(regex, '**$1**');
    }
    return result;
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

      {questionsTested && questionsTested.length > 0 && (
        <div className="mt-5">
          <h4 className="text-label mb-2">Questions tested</h4>
          <ul className="space-y-1.5">
            {questionsTested.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border text-[10px] font-semibold text-muted-foreground">
                  {q.index || i + 1}
                </span>
                {q.question}
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
                  selectedModel === m.model
                    ? 'btn-primary'
                    : 'btn-outline'
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
                  {activeModel.questions.map((qa, i) => (
                    <div key={i} className="rounded-lg border border-border p-4">
                      <div className="flex items-start gap-2">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/40" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{qa.question}</p>
                          <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                            {highlightText(qa.answer)}
                          </p>
                          {qa.competitors_highlighted && qa.competitors_highlighted.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {qa.competitors_highlighted.map(c => (
                                <span key={c} className="rounded border border-destructive/20 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                                  {c}
                                </span>
                              ))}
                            </div>
                          )}
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
