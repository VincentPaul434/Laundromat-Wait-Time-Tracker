// ============================================================
// WashlineLogo — shared brand mark used in the Login navbar and
// the Dashboard navbar so both surfaces stay visually consistent.
//
// `size` controls the icon mark's square dimension (px) and scales
// the wordmark text alongside it, so the same component can be
// dropped into both a compact mobile header and a roomier desktop
// navbar without prop sprawl.
// ============================================================

interface WashlineLogoProps {
  /** Pixel size of the icon mark. Wordmark type scales relative to this. */
  size?: number;
  /** Show the "Washline" wordmark next to the mark. Defaults to true. */
  withWordmark?: boolean;
  className?: string;
}

export function WashlineLogo({
  size = 28,
  withWordmark = true,
  className = "",
}: WashlineLogoProps): JSX.Element {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 24 24"
          width={size * 0.62}
          height={size * 0.62}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Drum ring */}
          <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.8" />
          {/* Wash "wave" line, evokes water/spin without literal washer art */}
          <path
            d="M5.5 12c1 1.6 2.3 1.6 3.3 0s2.3-1.6 3.2 0 2.3 1.6 3.2 0 2.3-1.6 3.3 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {withWordmark && (
        <span
          className="font-extrabold tracking-tight text-foreground"
          style={{ fontSize: Math.max(13, size * 0.5) }}
        >
          Washline
        </span>
      )}
    </span>
  );
}
