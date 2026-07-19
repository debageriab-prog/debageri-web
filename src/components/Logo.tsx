import Link from "next/link";

/**
 * The Debageri logo mark: a circle split vertically.
 * Left half — circuit board traces and nodes.
 * Right half — layered leaf / feather shapes.
 * Top center — antenna with two branches.
 *
 * Use <LogoMark /> for the icon only.
 * Use <LogoFull /> for icon + wordmark.
 * Use <LogoLink /> for a linked header version.
 */

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 48, className }: LogoMarkProps) {
  const s = size;
  // All coordinates are in a 100×110 viewBox
  return (
    <svg
      width={s}
      height={Math.round(s * 1.1)}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Antenna ─────────────────────────────────────────────────── */}
      {/* Center vertical stem above circle */}
      <line x1="50" y1="10" x2="50" y2="30" stroke="#3D3027" strokeWidth="1.8" strokeLinecap="round" />
      {/* Left antenna branch */}
      <line x1="50" y1="15" x2="36" y2="6" stroke="#3D3027" strokeWidth="1.8" strokeLinecap="round" />
      {/* Right antenna branch */}
      <line x1="50" y1="15" x2="64" y2="6" stroke="#3D3027" strokeWidth="1.8" strokeLinecap="round" />
      {/* Antenna tip dots */}
      <circle cx="35" cy="5.5" r="2" fill="#3D3027" />
      <circle cx="65" cy="5.5" r="2" fill="#3D3027" />

      {/* ── Circle outline ───────────────────────────────────────────── */}
      <circle cx="50" cy="68" r="38" stroke="#3D3027" strokeWidth="1.8" />

      {/* ── Center dividing line ─────────────────────────────────────── */}
      <line x1="50" y1="30" x2="50" y2="106" stroke="#3D3027" strokeWidth="1.4" />

      {/* ── Left half — circuit board traces ────────────────────────── */}
      {/* Horizontal traces */}
      <line x1="50" y1="48" x2="20" y2="48" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="60" x2="16" y2="60" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="72" x2="14" y2="72" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="84" x2="18" y2="84" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />

      {/* Vertical connectors on the left */}
      <line x1="20" y1="48" x2="20" y2="60" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="60" x2="16" y2="72" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="28" y1="72" x2="28" y2="84" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="72" x2="16" y2="84" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />

      {/* Short horizontal to node */}
      <line x1="16" y1="84" x2="18" y2="84" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="28" y1="60" x2="28" y2="72" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="28" y1="48" x2="28" y2="60" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />

      {/* Circuit nodes (filled circles) */}
      <circle cx="20" cy="48" r="2.2" fill="#3D3027" />
      <circle cx="20" cy="60" r="2.2" fill="#3D3027" />
      <circle cx="16" cy="60" r="2.2" fill="#3D3027" />
      <circle cx="16" cy="72" r="2.2" fill="#3D3027" />
      <circle cx="28" cy="60" r="2.2" fill="#3D3027" />
      <circle cx="28" cy="72" r="2.2" fill="#3D3027" />
      <circle cx="28" cy="84" r="2.2" fill="#3D3027" />
      <circle cx="18" cy="84" r="2.2" fill="#3D3027" />

      {/* Extra short trace near top of left half */}
      <line x1="50" y1="38" x2="34" y2="38" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="34" y1="38" x2="34" y2="48" stroke="#3D3027" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="34" cy="38" r="2.2" fill="#3D3027" />
      <circle cx="34" cy="48" r="2.2" fill="#3D3027" />

      {/* ── Right half — leaf / feather shapes ───────────────────────── */}
      {/* Five stacked leaf curves, largest at middle, tapering to tips */}
      <path
        d="M50 92 Q72 88 76 78 Q72 74 50 78 Z"
        stroke="#3D3027" strokeWidth="1.4" fill="none" strokeLinejoin="round"
      />
      <path
        d="M50 82 Q74 76 80 64 Q74 60 50 66 Z"
        stroke="#3D3027" strokeWidth="1.4" fill="none" strokeLinejoin="round"
      />
      <path
        d="M50 70 Q74 62 82 50 Q74 46 50 54 Z"
        stroke="#3D3027" strokeWidth="1.4" fill="none" strokeLinejoin="round"
      />
      <path
        d="M50 58 Q70 50 76 40 Q68 36 50 42 Z"
        stroke="#3D3027" strokeWidth="1.4" fill="none" strokeLinejoin="round"
      />
      <path
        d="M50 46 Q64 40 66 32 Q60 30 50 34 Z"
        stroke="#3D3027" strokeWidth="1.4" fill="none" strokeLinejoin="round"
      />
    </svg>
  );
}

interface LogoFullProps {
  iconSize?: number;
  className?: string;
}

export function LogoFull({ iconSize = 36, className }: LogoFullProps) {
  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      <LogoMark size={iconSize} />
      <span
        className="font-semibold text-[#3D3027] tracking-wide"
        style={{ fontSize: iconSize * 0.6, letterSpacing: "0.04em" }}
      >
        EBAGERI
      </span>
    </div>
  );
}

interface LogoLinkProps {
  iconSize?: number;
  className?: string;
}

export function LogoLink({ iconSize = 36, className }: LogoLinkProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-1 hover:opacity-80 transition-opacity ${className ?? ""}`}
      aria-label="Debageri AB — home"
    >
      <LogoMark size={iconSize} />
      <span
        className="font-semibold text-[#3D3027] tracking-wide"
        style={{ fontSize: iconSize * 0.58, letterSpacing: "0.06em" }}
      >
        EBAGERI
      </span>
    </Link>
  );
}
