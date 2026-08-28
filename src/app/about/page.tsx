import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CompensationMix } from "@/components/CompensationMix";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LogoMark } from "@/components/Logo";
import { NameEquation } from "@/components/NameEquation";
import { PageHero } from "@/components/PageHero";
import { ScrollHint } from "@/components/ScrollHint";
import { SwedenMap } from "@/components/SwedenMap";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Debageri, a Gothenburg-based IT consultancy built around technical craft, trust, and freedom for experienced engineers.",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  {
    title: "Trust comes first",
    body: "We hire experienced people and trust them to make good decisions. That means open communication, short paths, and room to do your best work.",
    practice: "You talk to the founder, not to a chain of managers.",
  },
  {
    title: "Freedom should be real",
    body: "Your work should support the life and career you want. We make space for flexibility, autonomy, and choices that are genuinely yours.",
    practice: "You choose your own mix of salary, pension, gear and learning.",
  },
  {
    title: "Craft matters",
    body: "Good software is built with care. We value thoughtful engineering, continuous learning, and solutions that remain useful long after delivery.",
    practice: "Courses and conferences are part of the budget, not a favour.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="About Debageri"
          titleId="about-heading"
          title={
            <>
              A consultancy built for the people who{" "}
              <em className="not-italic text-[#E8833A]">do the work.</em>
            </>
          }
          lede={
            <p>
              We are a small Swedish IT consultancy with a simple belief:
              experienced engineers do their best work when they have trust,
              freedom, and a fair share in what they create.
            </p>
          }
          aside={<LogoMark size={260} color="#E8833A" sketch />}
          dense
        />
        <NameEquation />
        <StorySection />
        <PrinciplesSection />
        <CompensationSection />
        <LocationSection />
        <CtaSection />
      </main>
      <ScrollHint />
      <Footer />
    </>
  );
}

function StorySection() {
  return (
    <section aria-labelledby="story-heading" className="bg-[#fdfaf6] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <FadeIn>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">
                Our story
              </p>
              <div className="mt-5 h-px w-12 bg-[#E8833A]" />
              <h2
                id="story-heading"
                className="mt-7 font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl"
              >
                Small by design. Ambitious by nature.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={80} className="fi-blur">
            <div>
              <div className="space-y-5 text-base leading-relaxed text-[#7a5e4a] md:text-lg">
                <p>
                  Debageri was founded in Gothenburg by Shahab Bagheri, a senior
                  Java developer who wanted to build the kind of consultancy he
                  would choose to work for himself.
                </p>
                <p>
                  That means staying personal as we grow. No layers of management,
                  no generic career templates, and no distance between the people
                  doing the work and the decisions that shape the company.
                </p>
                <p>
                  Today, our consultants work on complex software and embedded
                  systems where quality matters. We bring senior expertise to our
                  clients and build long-term relationships through useful work,
                  honest communication, and dependable delivery.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FounderQuote />
      </div>
    </section>
  );
}

function FounderQuote() {
  return (
    <FadeIn delay={120} className="fi-blur">
      <figure className="mt-16 grid gap-7 rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-9 md:p-10">
        <Image
          src="/team/shahab.jpg"
          alt="Portrait of Shahab Bagheri"
          width={400}
          height={400}
          sizes="112px"
          className="h-28 w-28 rounded-full object-cover ring-1 ring-[#E8833A]/30"
        />
        <div>
          <blockquote className="font-display text-xl leading-snug font-bold tracking-tight text-[#3D3027] md:text-2xl">
            &ldquo;I wanted to build the consultancy I would have joined myself.
            That starts by trusting people who already know how to do the
            work.&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm text-[#9a7a63]">
            Shahab Bagheri
            <span className="text-[#c4a98e]"> — Founder &amp; CEO</span>
          </figcaption>
        </div>
      </figure>
    </FadeIn>
  );
}

function PrinciplesSection() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="border-t border-[#e8d8c8] bg-[#F7F2EA] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">
            What guides us
          </p>
          <h2
            id="principles-heading"
            className="font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl"
          >
            Simple principles, practiced every day.
          </h2>
        </FadeIn>

        <ul className="grid gap-4 md:grid-cols-3" role="list">
          {principles.map((principle, index) => (
            <li key={principle.title} className="h-full">
              <FadeIn delay={index * 110} className="fi-blur h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8">
                  <span
                    className="font-display text-4xl font-bold leading-none text-[#e8d8c8] transition-colors duration-300 group-hover:text-[#E8833A]/40"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold leading-snug tracking-tight text-[#3D3027]">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#7a5e4a]">
                    {principle.body}
                  </p>
                  <p className="mt-auto border-t border-[#e8d8c8] pt-5 text-sm leading-relaxed text-[#9a7a63]">
                    <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#B85F1E]">
                      In practice
                    </span>
                    <span className="mt-2 block">{principle.practice}</span>
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CompensationSection() {
  return (
    <section aria-labelledby="compensation-heading" className="bg-[#0B0B12] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="max-w-2xl">
            <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.22em] text-[#D08A4F]">
              A fairer model
            </p>
            <h2
              id="compensation-heading"
              className="font-display text-3xl font-bold tracking-tight text-[#F7F2EA] md:text-4xl"
            >
              What you earn should{" "}
              <em className="not-italic text-[#E8833A]">work for you.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#C7BFB4] md:text-lg">
              Our consultants receive a generous share of what they bill. You
              decide how to allocate it around your priorities, instead of being
              handed a one-size-fits-all package.
            </p>
          </div>
        </FadeIn>

        {/* Full width, not a side column: the segments have to be wide enough to
            carry their own names. */}
        <FadeIn delay={110} className="fi-blur">
          <div className="mt-12">
            <CompensationMix />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section aria-labelledby="location-heading" className="bg-[#fdfaf6] px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-4xl items-center gap-14 sm:grid-cols-[1fr_auto] sm:gap-20">
        <FadeIn>
          <div>
            <p className="font-display text-xs font-bold tracking-[0.22em] text-[#B85F1E] uppercase">
              Where we are
            </p>
            <h2
              id="location-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl"
            >
              Rooted on the{" "}
              <em className="not-italic text-[#B85F1E]">west coast.</em>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#7a5e4a]">
              Debageri is based in Gothenburg, and that is where you will find us
              when you want to talk in person. Our consultants work with clients
              across Sweden and beyond.
            </p>
            <p className="mt-7 font-display text-xs font-bold tracking-[0.18em] text-[#9a7a63] uppercase tabular-nums">
              57.70&deg; N, 11.97&deg; E
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={110} className="fi-blur">
          <SwedenMap />
        </FadeIn>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section aria-labelledby="about-cta-heading" className="bg-[#15151E] px-6 py-20 md:py-24">
      <FadeIn className="mx-auto max-w-3xl text-center">
        <h2
          id="about-cta-heading"
          className="font-display text-3xl font-bold tracking-tight text-[#F7F2EA] md:text-4xl"
        >
          Good work starts with the right environment.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#C7BFB4]">
          If our way of working sounds like yours, explore the team or see where
          you could fit in.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-8 py-3.5 text-sm font-semibold text-[#2A1B0E] shadow-lg shadow-[#E8833A]/20 transition-colors hover:from-[#F6A263] hover:to-[#E27C33]"
          >
            View open positions
            <ArrowRightIcon />
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center rounded-full border border-[#5C4A3C] px-8 py-3.5 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#1A1A24]"
          >
            Meet the team
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
