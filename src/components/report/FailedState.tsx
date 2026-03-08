import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

interface Props {
  message: string;
  code?: string;
  onBack: () => void;
  onRetry?: () => void;
}

export default function FailedState({ message, code, onBack, onRetry }: Props) {
  return (
    <div className="card-surface-elevated p-10 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/20">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-lg font-bold text-destructive">Run failed</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{message}</p>
      {code && <p className="mt-1 text-xs text-muted-foreground">Code: {code}</p>}
      <div className="mt-6 flex items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        )}
        <button
          onClick={onBack}
          className={`${onRetry ? 'btn-outline' : 'btn-primary'} inline-flex items-center gap-2 px-5 py-2.5`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to AI Visibility
        </button>
      </div>
    </div>
  );
}