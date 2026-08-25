import type { ReactNode } from "react";
import { FadeIn } from "@/components/FadeIn";
import { HeroSpheres } from "@/components/HeroSpheres";

interface PageHeroProps {
  eyebrow: string;
  /** Wrap accent words in <em className="not-italic text-[#E8833A]"> to pick up the brand orange. */
  title: ReactNode;
  titleId: string;
  lede?: ReactNode;
  /** Buttons, pills or meta rendered under the lede. */
  children?: ReactNode;
  /** Optional visual for the right-hand column; hidden below md. */
  aside?: ReactNode;
  /** Rendered above the eyebrow — a back link, breadcrumb, or similar. */
  above?: ReactNode;
  align?: "left" | "center";
}

/**
 * The dark hero shared by every public page below the homepage.
 *
 * Carries `data-hero`, which the Header watches to decide whether it can render
 * transparent — a page without one gets the solid bar instead.
 */
export function PageHero({
  eyebrow,
  title,
  titleId,
  lede,
  children,
  aside,
  above,
  align = "left",
}: PageHeroProps) {
  const centred = align === "center";

  return (
    <section
      aria-labelledby={titleId}
      data-hero
      className="relative overflow-hidden bg-[#0B0B12]"
    >
      <HeroSpheres variant="page" />

      <div className="relative mx-auto max-w-6xl px-6 pt-[136px] pb-16 md:pt-[184px] md:pb-24">
        <div
          className={
            aside
              ? "grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-8"
              : undefined
          }
        >
          <div className={centred ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
            {above ? <FadeIn className="mb-8">{above}</FadeIn> : null}

            <FadeIn>
              <p className="mb-5 font-display text-xs font-bold tracking-[0.22em] text-[#D08A4F] uppercase">
                {eyebrow}
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <h1
                id={titleId}
                className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#F7F2EA] md:text-5xl lg:text-6xl"
              >
                {title}
              </h1>
            </FadeIn>

            {lede ? (
              <FadeIn delay={160}>
                <div
                  className={`mt-6 text-lg leading-relaxed text-[#C7BFB4] ${
                    centred ? "mx-auto max-w-2xl" : "max-w-2xl"
                  }`}
                >
                  {lede}
                </div>
              </FadeIn>
            ) : null}

            {children ? <FadeIn delay={240}>{children}</FadeIn> : null}
          </div>

          {aside ? <div className="hidden md:flex md:justify-end">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
