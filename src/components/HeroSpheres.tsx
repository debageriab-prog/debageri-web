"use client";

import { useEffect, useRef } from "react";

type HeroSphere = {
  wrap: string;
  sphere: string;
  /** Resting diameter in px; sets how far away the sphere notices the pointer. */
  size: number;
  /** Parallax weight — spheres nearer the viewer give way more readily. */
  strength: number;
};

/* Position classes are written out in full so Tailwind's scanner can see them;
   interpolated arbitrary values would never reach the generated stylesheet. */
const HERO_SPHERES: HeroSphere[] = [
  // Anchor: the corner planet, mostly off-canvas.
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--mid bottom-[-52%] right-[-13%]",
    sphere: "hero-sphere hero-sphere--xl hero-sphere--deep hero-sphere--mid hero-sphere--float-slow",
    size: 420,
    strength: 0.4,
  },
  // Drifting in from the top edge, clipped by the section's overflow.
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--far hero-sphere-wrap--delay-1 top-[-6%] right-[12%] hidden md:block",
    sphere: "hero-sphere hero-sphere--lg hero-sphere--dim hero-sphere--mid hero-sphere--float",
    size: 110,
    strength: 0.45,
  },
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--far hero-sphere-wrap--delay-2 top-[8%] right-[30%]",
    sphere: "hero-sphere hero-sphere--sm hero-sphere--far hero-sphere--float-slow",
    size: 22,
    strength: 0.35,
  },
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--far hero-sphere-wrap--delay-3 top-[84%] right-[30%]",
    sphere: "hero-sphere hero-sphere--xs hero-sphere--far hero-sphere--float",
    size: 12,
    strength: 0.35,
  },
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--mid hero-sphere-wrap--delay-4 top-[48%] right-[37%]",
    sphere: "hero-sphere hero-sphere--xs hero-sphere--mid hero-sphere--float-slow",
    size: 12,
    strength: 0.7,
  },
  // Sharp focal ball, centred in the open right-hand space.
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--near hero-sphere-wrap--delay-5 top-[37%] right-[20%] hidden md:block",
    sphere: "hero-sphere hero-sphere--md hero-sphere--float",
    size: 38,
    strength: 1,
  },
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--near hero-sphere-wrap--delay-6 top-[65%] right-[7%]",
    sphere: "hero-sphere hero-sphere--sm hero-sphere--float",
    size: 22,
    strength: 1,
  },
];

/* Page heroes are roughly half the height of the homepage one, so the same field
   would put the anchor planet right through the headline. This set keeps the depth
   cues but pulls the mass further out and drops the near-field focal ball. */
const PAGE_SPHERES: HeroSphere[] = [
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--mid bottom-[-96%] right-[-20%]",
    sphere: "hero-sphere hero-sphere--xl hero-sphere--deep hero-sphere--mid hero-sphere--float-slow",
    size: 340,
    strength: 0.35,
  },
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--far hero-sphere-wrap--delay-1 top-[12%] right-[14%] hidden md:block",
    sphere: "hero-sphere hero-sphere--sm hero-sphere--far hero-sphere--float",
    size: 22,
    strength: 0.4,
  },
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--far hero-sphere-wrap--delay-2 top-[62%] right-[28%]",
    sphere: "hero-sphere hero-sphere--xs hero-sphere--far hero-sphere--float-slow",
    size: 12,
    strength: 0.35,
  },
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--mid hero-sphere-wrap--delay-3 top-[34%] right-[38%] hidden md:block",
    sphere: "hero-sphere hero-sphere--xs hero-sphere--mid hero-sphere--float",
    size: 12,
    strength: 0.6,
  },
  {
    wrap: "hero-sphere-wrap hero-sphere-wrap--near hero-sphere-wrap--delay-4 top-[74%] right-[8%] hidden md:block",
    sphere: "hero-sphere hero-sphere--sm hero-sphere--float",
    size: 22,
    strength: 0.9,
  },
];

/** Fraction of the remaining distance closed per frame — lower is smoother/laggier. */
const EASE = 0.09;
/** Displacement in px at full strength and zero distance. */
const MAX_PUSH = 38;
/** Drift in px at full strength when the pointer sits at the edge of the hero. */
const MAX_PARALLAX = 26;
/** Below this the offset is treated as settled and the loop can stop. */
const SETTLED = 0.05;

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

export function HeroSpheres({ variant = "home" }: { variant?: "home" | "page" }) {
  const spheres = variant === "page" ? PAGE_SPHERES : HERO_SPHERES;
  const layerRef = useRef<HTMLDivElement>(null);
  const wrapRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    // Centres are measured from layout boxes rather than getBoundingClientRect:
    // the wrappers carry animated transforms, and feeding a transformed rect back
    // into the distance test would make each sphere chase its own displacement.
    const centres = spheres.map(() => ({ x: 0, y: 0, visible: false }));
    const offsets = spheres.map(() => ({ x: 0, y: 0 }));

    // Driven by the sphere list, not by the ref array: the refs can outlive a
    // variant swap and still hold entries this set no longer has.
    const measure = () => {
      for (let i = 0; i < spheres.length; i += 1) {
        const el = wrapRefs.current[i];
        const centre = centres[i];
        if (!el || el.offsetParent === null) {
          centre.visible = false;
          continue;
        }
        centre.visible = true;
        centre.x = el.offsetLeft + el.offsetWidth / 2;
        centre.y = el.offsetTop + el.offsetHeight / 2;
      }
    };

    let pointerX = Number.NEGATIVE_INFINITY;
    let pointerY = Number.NEGATIVE_INFINITY;
    let frame = 0;

    const tick = () => {
      const layerRect = layer.getBoundingClientRect();
      const tracking = Number.isFinite(pointerX);

      // Cursor position across the hero, -1 to 1 on each axis. Drives the drift that
      // every sphere feels, independent of how near the pointer actually is.
      let driftX = 0;
      let driftY = 0;
      if (tracking && layerRect.width > 0 && layerRect.height > 0) {
        driftX = clamp(((pointerX - layerRect.left) / layerRect.width) * 2 - 1);
        driftY = clamp(((pointerY - layerRect.top) / layerRect.height) * 2 - 1);
      }

      let active = false;

      for (let i = 0; i < spheres.length; i += 1) {
        const el = wrapRefs.current[i];
        const centre = centres[i];
        const offset = offsets[i];
        if (!el || !centre.visible) continue;

        const { size, strength } = spheres[i];

        // Field-wide parallax: opposite the cursor, weighted by depth so the near
        // spheres travel further than the distant ones.
        let targetX = -driftX * MAX_PARALLAX * strength;
        let targetY = -driftY * MAX_PARALLAX * strength;

        // Local repulsion, added on top of the drift.
        const radius = Math.max(280, size * 1.15);
        const dx = layerRect.left + centre.x - pointerX;
        const dy = layerRect.top + centre.y - pointerY;
        const distance = Math.hypot(dx, dy);
        if (tracking && distance < radius && distance > 0) {
          // Quadratic falloff so the nudge builds gently instead of snapping on.
          const falloff = (1 - distance / radius) ** 2;
          const push = falloff * MAX_PUSH * strength;
          targetX += (dx / distance) * push;
          targetY += (dy / distance) * push;
        }

        // Settle against the target, not against zero — the drift target is rarely
        // zero, so testing the offset itself would spin the loop forever.
        if (Math.abs(targetX - offset.x) > SETTLED || Math.abs(targetY - offset.y) > SETTLED) {
          offset.x += (targetX - offset.x) * EASE;
          offset.y += (targetY - offset.y) * EASE;
          active = true;
        } else {
          offset.x = targetX;
          offset.y = targetY;
        }

        el.style.setProperty("--sphere-x", `${offset.x.toFixed(2)}px`);
        el.style.setProperty("--sphere-y", `${offset.y.toFixed(2)}px`);
      }

      frame = active ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      start();
    };

    const onPointerLeave = () => {
      pointerX = Number.NEGATIVE_INFINITY;
      pointerY = Number.NEGATIVE_INFINITY;
      start();
    };

    measure();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [spheres]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="hero-spheres pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {spheres.map(({ wrap, sphere }, index) => (
        <span
          key={wrap}
          ref={(el) => {
            wrapRefs.current[index] = el;
            wrapRefs.current.length = spheres.length;
          }}
          className={wrap}
        >
          <span className="hero-sphere-pointer">
            <span className={sphere} />
          </span>
        </span>
      ))}
    </div>
  );
}
