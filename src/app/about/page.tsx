import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LogoMark } from "@/components/Logo";
import { PageHero } from "@/components/PageHero";
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
  },
  {
    title: "Freedom should be real",
    body: "Your work should support the life and career you want. We make space for flexibility, autonomy, and choices that are genuinely yours.",
  },
  {
    title: "Craft matters",
    body: "Good software is built with care. We value thoughtful engineering, continuous learning, and solutions that remain useful long after delivery.",
  },
];

const compensationChoices = [
  "Salary",
  "Pension",
  "Equipment",
  "Conferences",
  "Education",
  "Car leasing",
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
        />
        <StorySection />
        <PrinciplesSection />
        <CompensationSection />
        <NameSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

function StorySection() {
  return (
    <section aria-labelledby="story-heading" className="bg-[#fdfaf6] px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[0.65fr_1.35fr] md:gap-20">
        <FadeIn>
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">
              Our story
            </p>
            <div className="mt-5 h-px w-12 bg-[#E8833A]" />
          </div>
        </FadeIn>
        <FadeIn delay={80} className="fi-blur">
          <div>
            <h2
              id="story-heading"
              className="font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl"
            >
              Small by design. Ambitious by nature.
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-[#7a5e4a] md:text-lg">
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
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section aria-labelledby="principles-heading" className="bg-[#F7F2EA] px-6 py-20 md:py-28">
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
                <div className="h-full rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8">
                  <span className="mb-5 block h-px w-8 bg-[#E8833A]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-[#3D3027]">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#7a5e4a]">
                    {principle.body}
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
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center md:gap-20">
        <FadeIn>
          <div>
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

        <FadeIn delay={110} className="fi-blur">
          <div className="rounded-2xl border border-[#2A2A38] bg-[#1E1E2A] p-7 md:p-8">
            <p className="font-display text-sm font-bold text-[#F7F2EA]">Shape your own mix</p>
            <ul className="mt-6 grid grid-cols-2 gap-3" role="list">
              {compensationChoices.map((choice) => (
                <li key={choice} className="flex items-center gap-2.5 text-sm text-[#C7BFB4]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8833A]" aria-hidden="true" />
                  {choice}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-[#2A2A38] pt-6 text-xs leading-relaxed text-[#9A9089]">
              The details are planned together, transparently and within the
              practical rules that apply.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function NameSection() {
  return (
    <section aria-labelledby="name-heading" className="bg-[#fdfaf6] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">
            What is a Debageri?
          </p>
          <h2
            id="name-heading"
            className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl"
          >
            Part debug. Part bakery. Entirely personal.
          </h2>
        </FadeIn>

        <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <FadeIn className="fi-blur h-full">
            <WordCard word="debug" detail="The craft of finding and fixing what matters." />
          </FadeIn>
          <Operator>+</Operator>
          <FadeIn delay={110} className="fi-blur h-full">
            <WordCard word="bageri" detail="Swedish for bakery: careful work from raw ingredients." />
          </FadeIn>
          <Operator>+</Operator>
          <FadeIn delay={220} className="fi-blur h-full">
            <WordCard word="Bagheri" detail="The founder&rsquo;s surname, baked right into the name." />
          </FadeIn>
        </div>

        <FadeIn delay={300}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-[#7a5e4a]">
            Mix them together and you get Debageri: a little debug bakery where
            technical ingredients become software people can actually use.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function WordCard({ word, detail }: { word: string; detail: string }) {
  return (
    <div className="h-full rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-6 text-center">
      <p className="font-display text-lg font-bold text-[#B85F1E]">{word}</p>
      <p className="mt-3 text-xs leading-relaxed text-[#7a5e4a]">{detail}</p>
    </div>
  );
}

function Operator({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center justify-center py-1 text-xl text-[#c4a98e]" aria-hidden="true">
      {children}
    </span>
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

