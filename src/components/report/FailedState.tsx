import { AlertTriangle, ArrowLeft } from 'lucide-react';

interface Props {
  message: string;
  code?: string;
  onBack: () => void;
}

export default function FailedState({ message, code, onBack }: Props) {
  return (
    <div className="card-surface p-8 text-center">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-destructive/20">
        <AlertTriangle className="h-5 w-5 text-destructive" />
      </div>
      <h3 className="text-base font-medium text-destructive">Run failed</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{message}</p>
      {code && <p className="mt-1 text-xs text-muted-foreground">Code: {code}</p>}
      <button
        onClick={onBack}
        className="btn-primary mt-5 inline-flex items-center gap-2 px-4 py-2"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to AI Visibility
      </button>
    </div>
  );
}
