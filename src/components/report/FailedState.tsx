import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

interface Props {
  message: string;
  code?: string;
  onBack: () => void;
  onRetry?: () => void;
}

export default function FailedState({ message, code, onBack, onRetry }: Props) {
  return (
    <div className="card-surface p-8 text-center">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-destructive/20">
        <AlertTriangle className="h-5 w-5 text-destructive" />
      </div>
      <h3 className="text-base font-medium text-destructive">Run failed</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{message}</p>
      {code && <p className="mt-1 text-xs text-muted-foreground">Code: {code}</p>}
      <div className="mt-5 flex items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2 px-4 py-2"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        )}
        <button
          onClick={onBack}
          className={`${onRetry ? 'btn-outline' : 'btn-primary'} inline-flex items-center gap-2 px-4 py-2`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to AI Visibility
        </button>
      </div>
    </div>
  );
}
