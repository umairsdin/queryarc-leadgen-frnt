import { AlertTriangle, ArrowLeft } from 'lucide-react';

interface Props {
  message: string;
  onBack: () => void;
}

export default function FailedState({ message, onBack }: Props) {
  return (
    <div className="card-premium p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="font-display text-lg text-destructive">Run failed</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <button
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to AI Visibility
      </button>
    </div>
  );
}
