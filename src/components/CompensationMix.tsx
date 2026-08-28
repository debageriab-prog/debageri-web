"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

/* Six distinct hues rather than one hue restepped, so segments are told apart by
   colour and not by shade. This exact ordering was validated against the card
   surface: worst adjacent pair is 9.4 deutan / 19.7 normal-vision (OKLab x100),
   every step sits inside the dark lightness band and clears 3:1 on the surface.
   Reordering changes which pairs sit adjacent, so re-validate if you touch it.
   Classes are written out in full so Tailwind's scanner sees them. */
const CATEGORIES = [
  { label: "Salary", short: "Salary", fill: "bg-[#d95926]", dot: "bg-[#d95926]" },
  { label: "Pension", short: "Pension", fill: "bg-[#199e70]", dot: "bg-[#199e70]" },
  { label: "Education", short: "Education", fill: "bg-[#3987e5]", dot: "bg-[#3987e5]" },
  { label: "Conferences", short: "Conferences", fill: "bg-[#c98500]", dot: "bg-[#c98500]" },
  { label: "Equipment", short: "Equipment", fill: "bg-[#9085e9]", dot: "bg-[#9085e9]" },
  { label: "Car leasing", short: "Car lease", fill: "bg-[#d55181]", dot: "bg-[#d55181]" },
];

/**
 * Relative shapes, not offers — no figure is ever printed, and the point of showing
 * four is that the split is a decision rather than a number we have already picked.
 */
const MIXES = [
  { name: "Higher salary now", shares: [72, 8, 5, 4, 6, 5] },
  { name: "Long-term security", shares: [46, 32, 6, 4, 6, 6] },
  { name: "Learning and conferences", shares: [50, 12, 16, 14, 5, 3] },
  { name: "Tools and mobility", shares: [48, 12, 5, 4, 16, 15] },
];

const CYCLE_MS = 3800;

/**
 * The billing share, shaped four different ways.
 *
 * It cycles on its own while on screen and pauses on hover or focus; the dots also
 * drive it directly, which keeps the rotation steerable for anyone who does not want
 * to wait for it — and keeps it usable when motion is turned down and it never
 * advances by itself.
 */
export function CompensationMix() {
  const [active, setActive] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const heldRef = useRef(false);

  const hold = useCallback(() => {
    heldRef.current = true;
  }, []);
  const release = useCallback(() => {
    heldRef.current = false;
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;

    // Observed on the card, never on the bar: the bar's own width is what animates,
    // and an element that can measure as zero-area cannot be trusted to report itself
    // as visible.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!timer) {
            timer = window.setInterval(() => {
              if (!heldRef.current) setActive((i) => (i + 1) % MIXES.length);
            }, CYCLE_MS);
          }
        } else if (timer) {
          window.clearInterval(timer);
          timer = 0;
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(card);
    return () => {
      observer.disconnect();
      if (timer) window.clearInterval(timer);
    };
  }, []);

  const mix = MIXES[active];

  // Segments run from roughly 3% to 72% of the bar, so most mixes have at least one
  // too narrow for its name. Measured against the target width rather than the
  // animating one, so labels resolve with the morph instead of flickering through it.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const fit = () => {
      const barWidth = bar.clientWidth;
      labelRefs.current.forEach((label, i) => {
        if (!label) return;
        const target = (mix.shares[i] / 100) * barWidth;
        label.classList.toggle("is-shown", target >= label.scrollWidth + 20);
      });
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [mix]);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-[#2A2A38] bg-[#1E1E2A] p-7 md:p-8"
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocusCapture={hold}
      onBlurCapture={release}
    >
      <p className="font-display text-sm font-bold text-[#F7F2EA]">Shape your own mix</p>

      <div ref={barRef} className="mt-6 flex h-12 overflow-hidden rounded-full" aria-hidden="true">
        {CATEGORIES.map((category, i) => (
          <span
            key={category.label}
            /* The right border is the 2px surface spacer between segments. Being a
               border rather than a flex gap keeps it inside the box, so the widths
               stay exactly proportional. */
            className={`mix-seg ${category.fill} flex items-center justify-center overflow-hidden border-r-2 border-[#1E1E2A] last:border-r-0`}
            /* The width is data, so it is rendered rather than applied afterwards:
               setting it from an effect would leave the server's markup at the 0%
               fallback and make the first paint depend on a transition arriving. The
               stylesheet still owns the animation between mixes. */
            style={{ "--seg-w": `${mix.shares[i]}%` } as CSSProperties}
          >
            <span
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="mix-label font-display text-[11px] font-bold tracking-[0.06em] whitespace-nowrap text-[#14141C]"
            >
              {category.short}
            </span>
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p key={mix.name} className="mix-name font-display text-sm font-bold text-[#E8833A]">
          {mix.name}
        </p>

        <div className="flex gap-1.5">
          {MIXES.map((option, i) => (
            <button
              key={option.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show the ${option.name} mix`}
              aria-current={i === active}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === active ? "bg-[#E8833A]" : "bg-[#3A3A4A] hover:bg-[#5C5C70]"
              }`}
            />
          ))}
        </div>
      </div>

      <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-6" role="list">
        {CATEGORIES.map((category) => (
          <li key={category.label} className="flex items-center gap-2.5 text-sm text-[#C7BFB4]">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${category.dot}`} aria-hidden="true" />
            {category.label}
          </li>
        ))}
      </ul>

      <p className="mt-7 border-t border-[#2A2A38] pt-6 text-xs leading-relaxed text-[#9A9089]">
        The same share, shaped four different ways. Yours is planned together,
        transparently and within the practical rules that apply.
      </p>
    </div>
  );
}
