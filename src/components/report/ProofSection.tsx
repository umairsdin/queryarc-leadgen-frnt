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
    // Simple highlight - wrap brand/competitor names
    if (brandName) {
      const regex = new RegExp(`(${brandName})`, 'gi');
      result = result.replace(regex, '**$1**');
    }
    return result;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card-premium mt-8 p-6 sm:p-8"
    >
      <h3 className="font-display text-xl text-foreground">Proof from this snapshot</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Verbatim model outputs used for this report. Brand and competitors are highlighted.
      </p>

      {/* Questions tested */}
      {questionsTested && questionsTested.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Questions tested
          </h4>
          <ul className="space-y-1.5">
            {questionsTested.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent text-[10px] font-bold text-accent-foreground">
                  {q.index || i + 1}
                </span>
                {q.question}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Model selector */}
      {modelAnswers && modelAnswers.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select a model to view answers
          </h4>
          <div className="flex flex-wrap gap-2">
            {modelAnswers.map(m => (
              <button
                key={m.model}
                onClick={() => setSelectedModel(selectedModel === m.model ? null : m.model)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  selectedModel === m.model
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
                <div className="mt-4 space-y-4">
                  {activeModel.questions.map((qa, i) => (
                    <div key={i} className="rounded-lg border border-border bg-muted/30 p-4">
                      <div className="flex items-start gap-2">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{qa.question}</p>
                          <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                            {highlightText(qa.answer)}
                          </p>
                          {qa.competitors_highlighted && qa.competitors_highlighted.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {qa.competitors_highlighted.map(c => (
                                <span key={c} className="rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
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
