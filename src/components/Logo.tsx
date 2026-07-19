import Link from "next/link";

/**
 * Debageri logo mark — faithful SVG recreation of the brand asset.
 *
 * The mark is a circle split by a vertical centre line:
 *   Left half  — intricate PCB circuit traces with connection nodes
 *   Right half — stacked leaf / feather shapes (organic, wide at base)
 *   Top centre — vertical antenna stem with two angled branches and dot tips
 *
 * In all lockups the mark acts as the letter "D", followed immediately
 * by "EBAGERI" to complete the wordmark.
 */

const STROKE = "#3D3027";
const SW = 1.4; // default stroke width

interface LogoMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LogoMark({ size = 48, color = STROKE, className }: LogoMarkProps) {
  // ViewBox: 100 wide × 118 tall
  return (
    <svg
      width={size}
      height={Math.round(size * 1.18)}
      viewBox="0 0 100 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Antenna ──────────────────────────────────────────────────────── */}
      {/* Centre stem */}
      <line x1="50" y1="8" x2="50" y2="30" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Left branch */}
      <line x1="50" y1="14" x2="36" y2="4"  stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Right branch */}
      <line x1="50" y1="14" x2="64" y2="4"  stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Tip dots */}
      <circle cx="35"  cy="3.5" r="2.2" fill={color} />
      <circle cx="65"  cy="3.5" r="2.2" fill={color} />

      {/* ── Circle outline ───────────────────────────────────────────────── */}
      <circle cx="50" cy="70" r="42" stroke={color} strokeWidth="1.8" />

      {/* ── Centre vertical divider ──────────────────────────────────────── */}
      <line x1="50" y1="28" x2="50" y2="112" stroke={color} strokeWidth="1.4" strokeLinecap="round" />

      {/* ═══════════════════════════════════════════════════════════════════
          LEFT HALF — PCB circuit traces
          All traces use right-angle paths. Nodes are filled circles.
         ═══════════════════════════════════════════════════════════════════ */}

      {/* Row 1 — near top */}
      <polyline points="50,38 28,38 28,46" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="28" cy="38" r="2" fill={color}/>
      <circle cx="28" cy="46" r="2" fill={color}/>

      <polyline points="50,38 40,38 40,46 34,46" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="40" cy="38" r="2" fill={color}/>
      <circle cx="40" cy="46" r="2" fill={color}/>
      <circle cx="34" cy="46" r="2" fill={color}/>

      {/* Row 2 */}
      <polyline points="50,52 22,52 22,62" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="22" cy="52" r="2" fill={color}/>
      <circle cx="22" cy="62" r="2" fill={color}/>

      <polyline points="50,52 34,52 34,58 28,58 28,62" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="34" cy="52" r="2" fill={color}/>
      <circle cx="34" cy="58" r="2" fill={color}/>
      <circle cx="28" cy="58" r="2" fill={color}/>
      <circle cx="28" cy="62" r="2" fill={color}/>

      <polyline points="34,46 34,52" stroke={color} strokeWidth={SW} strokeLinecap="round" fill="none"/>

      {/* Row 3 — widest */}
      <polyline points="50,64 16,64 16,74" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="16" cy="64" r="2" fill={color}/>
      <circle cx="16" cy="74" r="2" fill={color}/>

      <polyline points="50,64 28,64 28,70 22,70 22,74" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="28" cy="64" r="2" fill={color}/>
      <circle cx="28" cy="70" r="2" fill={color}/>
      <circle cx="22" cy="70" r="2" fill={color}/>
      <circle cx="22" cy="74" r="2" fill={color}/>

      <polyline points="22,62 22,64" stroke={color} strokeWidth={SW} strokeLinecap="round" fill="none"/>

      {/* Row 4 */}
      <polyline points="50,78 18,78 18,86" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="18" cy="78" r="2" fill={color}/>
      <circle cx="18" cy="86" r="2" fill={color}/>

      <polyline points="50,78 32,78 32,84 26,84 26,90" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="32" cy="78" r="2" fill={color}/>
      <circle cx="32" cy="84" r="2" fill={color}/>
      <circle cx="26" cy="84" r="2" fill={color}/>
      <circle cx="26" cy="90" r="2" fill={color}/>

      <polyline points="16,74 16,78" stroke={color} strokeWidth={SW} strokeLinecap="round" fill="none"/>

      {/* Row 5 — lower */}
      <polyline points="50,92 24,92 24,100 30,100" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="24" cy="92" r="2" fill={color}/>
      <circle cx="24" cy="100" r="2" fill={color}/>
      <circle cx="30" cy="100" r="2" fill={color}/>

      <polyline points="26,90 26,92" stroke={color} strokeWidth={SW} strokeLinecap="round" fill="none"/>
      <polyline points="18,86 18,92 24,92" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* ═══════════════════════════════════════════════════════════════════
          RIGHT HALF — stacked leaf / feather shapes
          Each leaf is a closed path: wide at the centre line, tapering right.
         ═══════════════════════════════════════════════════════════════════ */}

      {/* Leaf 1 — top, smallest */}
      <path
        d="M50,40 C56,38 66,36 70,34 C66,32 56,34 50,36 Z"
        stroke={color} strokeWidth={SW} strokeLinejoin="round" fill="none"
      />
      {/* Leaf 2 */}
      <path
        d="M50,50 C58,47 72,44 78,41 C72,38 58,42 50,46 Z"
        stroke={color} strokeWidth={SW} strokeLinejoin="round" fill="none"
      />
      {/* Leaf 3 — widest */}
      <path
        d="M50,62 C60,58 76,54 84,50 C76,47 60,52 50,58 Z"
        stroke={color} strokeWidth={SW} strokeLinejoin="round" fill="none"
      />
      {/* Leaf 4 */}
      <path
        d="M50,74 C60,70 76,66 84,62 C76,60 60,66 50,70 Z"
        stroke={color} strokeWidth={SW} strokeLinejoin="round" fill="none"
      />
      {/* Leaf 5 */}
      <path
        d="M50,86 C59,82 74,78 80,75 C74,72 59,78 50,82 Z"
        stroke={color} strokeWidth={SW} strokeLinejoin="round" fill="none"
      />
      {/* Leaf 6 — lower, tapering */}
      <path
        d="M50,97 C57,94 70,91 74,89 C70,87 57,90 50,93 Z"
        stroke={color} strokeWidth={SW} strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

/* ─── Wordmark lockup ───────────────────────────────────────────────────────
   The mark acts as the letter "D". "EBAGERI" follows immediately.
   Both sit on the same baseline / vertical centre.
*/

interface LogoWordmarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LogoWordmark({ size = 40, color = STROKE, className }: LogoWordmarkProps) {
  const textSize = Math.round(size * 0.52);
  return (
    <div className={`inline-flex items-center ${className ?? ""}`} style={{ gap: size * 0.04 }}>
      <LogoMark size={size} color={color} />
      <span
        className="font-semibold tracking-[0.08em] leading-none"
        style={{ fontSize: textSize, color, fontVariantNumeric: "tabular-nums" }}
      >
        EBAGERI
      </span>
    </div>
  );
}

interface LogoLinkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LogoLink({ size = 36, color = STROKE, className }: LogoLinkProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center hover:opacity-75 transition-opacity focus-visible:rounded ${className ?? ""}`}
      aria-label="Debageri AB — home"
      style={{ gap: size * 0.04 }}
    >
      <LogoMark size={size} color={color} />
      <span
        className="font-semibold tracking-[0.08em] leading-none"
        style={{ fontSize: Math.round(size * 0.52), color }}
      >
        EBAGERI
      </span>
    </Link>
  );
}
