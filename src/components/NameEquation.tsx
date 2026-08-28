"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface Ingredient {
  src: string;
  alt: string;
  word: string;
  gloss: string;
  body: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    src: "/story/bug-sketch.webp",
    alt: "Sketch of a beetle crawling over circuit traces",
    word: "debug",
    gloss: "The part every developer knows",
    body: "Debugging is where the real work happens: reading someone else's intent, finding the one wrong assumption, and leaving the system better understood than you found it.",
  },
  {
    src: "/story/bageri-sketch.webp",
    alt: "Sketch of a Swedish bakery loaf labelled bageri",
    word: "bageri",
    gloss: "Swedish for bakery",
    body: "A bakery takes plain ingredients and a lot of patience, and turns them into something people actually want. Good software is made the same way, and it is just as obvious when it is rushed.",
  },
  {
    src: "/story/founder-sketch.webp",
    alt: "Sketch portrait of founder Shahab Bagheri",
    word: "Bagheri",
    gloss: "The founder's surname",
    body: "Bagheri happens to sound almost exactly like bageri. Naming the company after that coincidence felt more honest than picking something that could belong to anyone.",
  },
];

/** Fraction of the pinned runway spent on the morph; the rest holds the open rail. */
const MORPH_SPAN = 0.76;
/** Scroll travelled before the morph starts, so the row is legible on arrival. */
const MORPH_LEAD = 0.04;

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/** Maps a raw 0–1 progress onto a sub-range, clamped at both ends. */
function stage(progress: number, from: number, to: number): number {
  return clamp01((progress - from) / (to - from));
}

/**
 * Layout position of `el` relative to `ancestor`, summed along the offset chain.
 *
 * A single offsetLeft would not do: the nodes carry the morph transform, which makes
 * each one the containing block for its own figure, so the chain has a different
 * number of links depending on which element is being measured.
 */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement): { x: number; y: number } {
  let x = 0;
  let y = 0;
  let current: HTMLElement | null = el;

  while (current && current !== ancestor) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return { x, y };
}

/**
 * The three sketches arrive as the compact row people already met on the homepage,
 * then unpack into a vertical rail where each ingredient gets its own explanation.
 *
 * The open rail is the real DOM. The morph is measured backwards from it — the
 * compact row is a transform, never a second layout — so no-JS, small screens and
 * reduced-motion readers all land on the readable version with nothing to undo.
 */
export function NameEquation() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const figureRefs = useRef<(HTMLElement | null)[]>([]);
  const plusRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const rail = railRef.current;
    if (!runway || !rail) return;

    const wideEnough = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Deltas from each node's open position to its slot in the compact row.
    let deltas: { x: number; y: number; scale: number }[] = [];
    let plusSlots: { x: number; y: number; size: number }[] = [];
    let line = { x: 0, y: 0, height: 0 };

    const measure = () => {
      const firstFigure = figureRefs.current[0];
      const lastFigure = figureRefs.current[INGREDIENTS.length - 1];
      if (!firstFigure || !lastFigure) return false;

      // Layout boxes, not bounding rects: the nodes carry the morph transform, and
      // feeding a transformed rect back in would make each one chase itself.
      const openSize = firstFigure.offsetWidth;
      if (openSize === 0) return false;

      const plusSize = Math.round(openSize * 0.25);
      const gap = Math.round(openSize * 0.14);
      const spacer = plusSize + gap * 2;

      const railWidth = rail.offsetWidth;
      const widest = (railWidth - spacer * (INGREDIENTS.length - 1)) / INGREDIENTS.length;
      const rowSize = Math.min(openSize * 1.14, widest);
      const rowWidth = rowSize * INGREDIENTS.length + spacer * (INGREDIENTS.length - 1);
      const rowLeft = (railWidth - rowWidth) / 2;
      // Top of the rail rather than its centre: it puts the row high enough to meet
      // the eye straight after the hero, and it means the first sketch never moves
      // vertically — the other two fan down out of it.
      const rowTop = 0;
      const scale = rowSize / openSize;

      deltas = INGREDIENTS.map((_, i) => {
        const node = nodeRefs.current[i];
        const figure = figureRefs.current[i];
        if (!node || !figure) return { x: 0, y: 0, scale: 1 };

        const nodeAt = offsetWithin(node, rail);
        const figureAt = offsetWithin(figure, rail);
        const slotX = rowLeft + i * (rowSize + spacer);

        // The node scales about its own top-left, so the delta has to absorb where
        // the figure sits inside it — that inset shrinks by the same factor.
        return {
          x: slotX - nodeAt.x - scale * (figureAt.x - nodeAt.x),
          y: rowTop - nodeAt.y - scale * (figureAt.y - nodeAt.y),
          scale,
        };
      });

      plusSlots = INGREDIENTS.slice(1).map((_, i) => ({
        x: rowLeft + rowSize + gap + i * (rowSize + spacer),
        y: rowTop + (rowSize - plusSize) / 2,
        size: plusSize,
      }));

      const firstAt = offsetWithin(firstFigure, rail);
      const lastAt = offsetWithin(lastFigure, rail);
      line = {
        x: firstAt.x + openSize / 2,
        y: firstAt.y + openSize,
        height: lastAt.y - firstAt.y - openSize,
      };

      return true;
    };

    const paint = (progress: number) => {
      const bodyOpacity = stage(progress, 0.45, 0.85);
      const rowOpacity = 1 - stage(progress, 0, 0.4);

      for (let i = 0; i < INGREDIENTS.length; i += 1) {
        const node = nodeRefs.current[i];
        const delta = deltas[i];
        if (!node || !delta) continue;

        const rest = 1 - progress;
        node.style.setProperty("--node-x", `${(delta.x * rest).toFixed(2)}px`);
        node.style.setProperty("--node-y", `${(delta.y * rest).toFixed(2)}px`);
        node.style.setProperty("--node-s", (delta.scale + (1 - delta.scale) * progress).toFixed(4));
        node.style.setProperty("--node-body", bodyOpacity.toFixed(3));
        node.style.setProperty("--node-caption", rowOpacity.toFixed(3));
      }

      for (let i = 0; i < plusRefs.current.length; i += 1) {
        const plus = plusRefs.current[i];
        const slot = plusSlots[i];
        if (!plus || !slot) continue;
        plus.style.setProperty("--plus-x", `${slot.x.toFixed(2)}px`);
        plus.style.setProperty("--plus-y", `${slot.y.toFixed(2)}px`);
        plus.style.setProperty("--plus-size", `${slot.size}px`);
        plus.style.setProperty("--plus-o", rowOpacity.toFixed(3));
      }

      if (lineRef.current) {
        lineRef.current.style.setProperty("--rail-x", `${line.x.toFixed(2)}px`);
        lineRef.current.style.setProperty("--rail-y", `${line.y.toFixed(2)}px`);
        lineRef.current.style.setProperty("--rail-h", `${Math.max(0, line.height).toFixed(2)}px`);
        lineRef.current.style.setProperty("--rail-p", stage(progress, 0.55, 1).toFixed(3));
      }
    };

    /** Hands every node back to the stylesheet's open-state defaults. */
    const release = () => {
      const props = ["--node-x", "--node-y", "--node-s", "--node-body", "--node-caption"];
      for (const node of nodeRefs.current) {
        if (node) props.forEach((prop) => node.style.removeProperty(prop));
      }
      for (const plus of plusRefs.current) {
        if (plus) plus.style.setProperty("--plus-o", "0");
      }
      lineRef.current?.style.setProperty("--rail-p", "1");
    };

    let frame = 0;
    let measured = false;
    // The resize observer keeps firing on layouts the morph does not own, so the
    // paint has to be gated here rather than only at the listeners.
    let active = false;

    const update = () => {
      frame = 0;
      if (!active) return;
      if (!measured) {
        measured = measure();
        if (!measured) return;
      }

      const rect = runway.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const travelled = span > 0 ? clamp01(-rect.top / span) : 1;
      paint(stage(travelled, MORPH_LEAD, MORPH_LEAD + MORPH_SPAN));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const remeasure = () => {
      measured = false;
      schedule();
    };

    const attach = () => {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", remeasure);
    };

    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const sync = () => {
      detach();
      active = wideEnough.matches && !reducedMotion.matches;
      if (active) {
        remeasure();
        attach();
      } else {
        release();
      }
    };

    sync();
    wideEnough.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    // Sketches load after hydration and settle the rail's height; measuring against
    // the pre-load layout would put every row slot in the wrong place.
    const figures = figureRefs.current.filter((el): el is HTMLElement => el !== null);
    const resizeObserver = new ResizeObserver(remeasure);
    figures.forEach((figure) => resizeObserver.observe(figure));
    resizeObserver.observe(rail);

    return () => {
      detach();
      resizeObserver.disconnect();
      wideEnough.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section
      aria-label="What is a Debageri"
      className="bg-[#0B0B12] px-6 pt-16 pb-20 md:pt-0 md:pb-28"
    >
      <div className="mx-auto max-w-5xl">
        <div ref={runwayRef} className="name-runway md:h-[200vh]">
          <div className="name-stage md:sticky md:top-0 md:h-screen md:pt-[104px]">
            <ol
              ref={railRef}
              className="ingredient-rail relative w-full space-y-10 md:flex md:h-full md:flex-col md:justify-between md:gap-14 md:space-y-0"
              role="list"
            >
              <span ref={lineRef} className="ingredient-rail-line hidden md:block" aria-hidden="true" />

              {INGREDIENTS.slice(1).map((ingredient, i) => (
                <span
                  key={`plus-${ingredient.word}`}
                  ref={(el) => {
                    plusRefs.current[i] = el;
                  }}
                  className="ingredient-plus hidden md:block"
                  aria-hidden="true"
                >
                  <Image
                    src="/story/plus-sketch.webp"
                    alt=""
                    width={160}
                    height={160}
                    className="h-full w-full"
                  />
                </span>
              ))}

              {INGREDIENTS.map((ingredient, i) => (
                <li
                  key={ingredient.word}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="ingredient-node"
                >
                  <div className="grid grid-cols-[6.5rem_1fr] items-center gap-5 md:grid-cols-[11rem_1fr] md:gap-10">
                    <figure
                      ref={(el) => {
                        figureRefs.current[i] = el;
                      }}
                      className="relative h-26 w-26 shrink-0 overflow-hidden rounded-2xl border border-[#E8833A]/20 md:h-44 md:w-44"
                    >
                      <Image
                        src={ingredient.src}
                        alt={ingredient.alt}
                        fill
                        sizes="(min-width: 768px) 176px, 104px"
                        className="object-cover"
                      />
                      {/* Only ever visible while the row is; the open node repeats
                          the same word as a real heading, so this stays silent. */}
                      <figcaption
                        aria-hidden="true"
                        className="ingredient-node__caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0B12] to-transparent pt-8 pb-3 text-center font-display text-xs font-bold uppercase tracking-[0.22em] text-[#D08A4F]"
                      >
                        {ingredient.word}
                      </figcaption>
                    </figure>

                    <div className="ingredient-node__body">
                      <p className="font-display text-xl font-bold tracking-tight text-[#F7F2EA] md:text-2xl">
                        {ingredient.word}
                      </p>
                      <p className="mt-1 font-display text-xs font-bold uppercase tracking-[0.22em] text-[#D08A4F]">
                        {ingredient.gloss}
                      </p>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#C7BFB4] md:text-base">
                        {ingredient.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </section>
  );
}
