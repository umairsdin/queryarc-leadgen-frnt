import { cn } from "@/lib/utils";

const QueryArcLogo = ({ className }: { className?: string }) => (
  <div className={cn("w-9 h-9 relative shrink-0", className)}>
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="qa-bg" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsl(239 80% 63%)" />
          <stop offset="100%" stopColor="hsl(228 72% 54%)" />
        </linearGradient>
        <linearGradient id="qa-signal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(0 0% 100% / 0)" />
          <stop offset="42%" stopColor="hsl(0 0% 100% / 0.5)" />
          <stop offset="58%" stopColor="hsl(0 0% 100% / 0.5)" />
          <stop offset="100%" stopColor="hsl(0 0% 100% / 0)" />
        </linearGradient>
      </defs>

      <rect x="1.5" y="1.5" width="33" height="33" rx="8.5" fill="url(#qa-bg)" />

      <path
        d="M10 24 C13.5 16.5, 18.5 13, 26 12"
        stroke="hsl(0 0% 100% / 0.32)"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M10 24 C13.5 16.5, 18.5 13, 26 12"
        stroke="url(#qa-signal)"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="5 42"
        strokeDashoffset="0"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="47"
          to="0"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </path>

      <circle cx="10" cy="24" r="2.3" fill="white" opacity="0.92" />
      <circle cx="17.8" cy="15.2" r="1.5" fill="white" opacity="0.48" />
      <circle cx="26" cy="12" r="2.3" fill="white" opacity="0.92" />
    </svg>
  </div>
);

export default QueryArcLogo;
