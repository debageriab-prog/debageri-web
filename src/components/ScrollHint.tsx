"use client";

import { useEffect, useRef } from "react";

/** Distance from the foot of the page over which the hint fades out, in px. */
const FADE_ZONE = 220;

/**
 * Floating "keep scrolling" mark, pinned to the bottom of the viewport.
 *
 * It stays up for the whole page and only stands down once there is genuinely
 * nothing left below, since an arrow pointing at the end of the document is worse
 * than no arrow at all. The stylesheet defaults it to visible so it is already
 * there on the server render, before this effect runs.
 */
export function ScrollHint() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const remaining = doc.scrollHeight - (window.scrollY + window.innerHeight);
      const opacity = Math.max(0, Math.min(1, remaining / FADE_ZONE));
      el.style.setProperty("--hint-o", opacity.toFixed(3));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className="scroll-hint hidden md:block" aria-hidden="true">
      <span className="scroll-hint__track">
        <span className="scroll-hint__dot" />
      </span>
    </span>
  );
}
