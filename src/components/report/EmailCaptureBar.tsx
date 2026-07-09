import { useState, useEffect } from 'react';
import { Mail, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { API_BASE } from '@/lib/api';

interface EmailCaptureBarProps {
  brand: string;
  reportId: string;
}

export default function EmailCaptureBar({ brand, reportId }: EmailCaptureBarProps) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [dismissed, setDismissed] = useState(false);

  // Show after 10 seconds — user has had time to read the report
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/lead-magnet/capture-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, brand, report_id: reportId }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!visible) return null;

  return (
    <div className="w-full card-surface p-4 mb-6">
      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-3 flex-1">
          <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />

          {status === 'success' ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <p className="text-sm text-foreground font-medium">
                Sent — check your inbox for your report and 3 fix tips.
              </p>
            </div>
          ) : (
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-1">
                Save this report + get a 3-tip fix guide for {brand}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                We&apos;ll email your report + 3 fix tips. No spam, unsubscribe any time.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-0"
                />
                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading' || !email.includes('@')}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors shrink-0"
                >
                  {status === 'loading' ? 'Sending...' : 'Send it'}
                  {status !== 'loading' && <ArrowRight className="h-3.5 w-3.5" />}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-xs text-red-500 mt-1.5">Something went wrong - please try again.</p>
              )}
            </div>
          )}
        </div>

        {status !== 'success' && (
          <button
            onClick={handleDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}

      </div>
    </div>
  );
}
