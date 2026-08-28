/**
 * Shared line icons.
 *
 * These replace the typographic stand-ins (→ ← ↗ × ✓ ▾) that were scattered
 * through the UI: glyphs pick up the text font, shift baseline between
 * platforms, and get read aloud by screen readers. Every icon here is
 * `aria-hidden` and sized in `em` so it tracks the surrounding text.
 */

interface IconProps {
  /** Pixel size; defaults to 1em so the icon scales with its label. */
  size?: number | string;
  className?: string;
}

function iconSize(size: IconProps["size"]) {
  return size === undefined ? "1em" : size;
}

export function ArrowRightIcon({ size, className }: IconProps = {}) {
  return (
    <svg
      width={iconSize(size)}
      height={iconSize(size)}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon({ size, className }: IconProps = {}) {
  return (
    <svg
      width={iconSize(size)}
      height={iconSize(size)}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 7H2M6 3 2 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpIcon({ size, className }: IconProps = {}) {
  return (
    <svg
      width={iconSize(size)}
      height={iconSize(size)}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 12V2M3 6l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Outbound link marker — the old ↗. */
export function ArrowUpRightIcon({ size, className }: IconProps = {}) {
  return (
    <svg
      width={iconSize(size)}
      height={iconSize(size)}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 10 10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ size, className }: IconProps = {}) {
  return (
    <svg
      width={iconSize(size)}
      height={iconSize(size)}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="m3 7.5 2.8 2.8L11 4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size, className }: IconProps = {}) {
  return (
    <svg
      width={iconSize(size)}
      height={iconSize(size)}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="m3.5 3.5 7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ size, className }: IconProps = {}) {
  return (
    <svg
      width={iconSize(size)}
      height={iconSize(size)}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="m3.5 5.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Empty-state mark: a circuit trace running to an open node. */
export function TraceIcon({ size, className }: IconProps = {}) {
  return (
    <svg
      width={iconSize(size)}
      height={iconSize(size)}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 15h4l3-6 3 12 3-9 2 3h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
