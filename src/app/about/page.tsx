import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Debageri, a Gothenburg-based IT consultancy built around technical craft, trust, and freedom for experienced engineers.",
};

const principles = [
  {
    number: "01",
    title: "Trust comes first",
    body: "We hire experienced people and trust them to make good decisions. That means open communication, short paths, and room to do your best work.",
  },
  {
    number: "02",
    title: "Freedom should be real",
    body: "Your work should support the life and career you want. We make space for flexibility, autonomy, and choices that are genuinely yours.",
  },
  {
    number: "03",
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
        <HeroSection />
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

function HeroSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-b border-[#e8d8c8] bg-[#F7F2EA]"
    >
      <AboutCircuit className="absolute inset-0 h-full w-full text-[#c4a98e] opacity-45" />
      <div className="relative mx-auto grid max-w-6xl items-end gap-12 px-6 py-20 md:grid-cols-[1fr_0.55fr] md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <FadeIn>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
              About Debageri
            </p>
          </FadeIn>
          <FadeIn delay={80}>
            <h1
              id="about-heading"
              className="text-5xl font-semibold leading-[1.06] tracking-tight text-[#3D3027] md:text-6xl lg:text-7xl"
            >
              A consultancy built for the people who do the work.
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#7a5e4a] md:text-xl">
              We are a small Swedish IT consultancy with a simple belief:
              experienced engineers do their best work when they have trust,
              freedom, and a fair share in what they create.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={200} className="hidden justify-self-end md:block">
          <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-[#e8d8c8] bg-[#fdfaf6]/80 lg:h-64 lg:w-64">
            <div className="absolute inset-5 rounded-full border border-[#e8d8c8]" />
            <LogoMark size={132} className="relative" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section aria-labelledby="story-heading" className="bg-[#fdfaf6] px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[0.65fr_1.35fr] md:gap-20">
        <FadeIn>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
              Our story
            </p>
            <div className="mt-5 h-px w-12 bg-[#c4a98e]" />
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div>
            <h2 id="story-heading" className="text-3xl font-semibold tracking-tight text-[#3D3027] md:text-5xl">
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
            What guides us
          </p>
          <h2 id="principles-heading" className="text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">
            Simple principles, practiced every day.
          </h2>
        </FadeIn>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-[#e8d8c8] bg-[#e8d8c8] md:grid-cols-3">
          {principles.map((principle, index) => (
            <li key={principle.title} className="bg-[#fdfaf6] p-7 md:p-8">
              <FadeIn delay={index * 80}>
                <span className="font-mono text-xs text-[#9a7a63]">{principle.number}</span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-[#3D3027]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#7a5e4a]">
                  {principle.body}
                </p>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CompensationSection() {
  return (
    <section aria-labelledby="compensation-heading" className="bg-[#3D3027] px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center md:gap-20">
        <FadeIn>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a98e]">
              A fairer model
            </p>
            <h2 id="compensation-heading" className="text-3xl font-semibold tracking-tight text-[#F7F2EA] md:text-4xl">
              What you earn should work for you.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#c4a98e] md:text-lg">
              Our consultants receive a generous share of what they bill. You
              decide how to allocate it around your priorities, instead of being
              handed a one-size-fits-all package.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="rounded-2xl border border-[#5a4535] bg-[#46372d] p-7 md:p-8">
            <p className="text-sm font-medium text-[#F7F2EA]">Shape your own mix</p>
            <ul className="mt-6 grid grid-cols-2 gap-3" role="list">
              {compensationChoices.map((choice) => (
                <li key={choice} className="flex items-center gap-2 text-sm text-[#c4a98e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9a7a63]" aria-hidden="true" />
                  {choice}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-[#5a4535] pt-6 text-xs leading-relaxed text-[#9a7a63]">
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
            What is a Debageri?
          </p>
          <h2 id="name-heading" className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[#3D3027] md:text-5xl">
            Part debug. Part bakery. Entirely personal.
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <WordCard word="debug" detail="The craft of finding and fixing what matters." />
            <Operator>+</Operator>
            <WordCard word="bageri" detail="Swedish for bakery: careful work from raw ingredients." />
            <Operator>+</Operator>
            <WordCard word="Bagheri" detail="The founder’s surname, baked right into the name." />
          </div>
        </FadeIn>

        <FadeIn delay={160}>
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
    <div className="rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-6 text-center">
      <p className="font-mono text-lg font-semibold text-[#3D3027]">{word}</p>
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
    <section aria-labelledby="about-cta-heading" className="border-t border-[#e8d8c8] bg-[#F7F2EA] px-6 py-20 md:py-24">
      <FadeIn className="mx-auto max-w-3xl text-center">
        <h2 id="about-cta-heading" className="text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">
          Good work starts with the right environment.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#7a5e4a]">
          If our way of working sounds like yours, explore the team or see where
          you could fit in.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/careers" className="inline-flex items-center rounded-lg bg-[#3D3027] px-7 py-3 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#5a4535] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D3027]">
            View open positions
          </Link>
          <Link href="/team" className="inline-flex items-center rounded-lg border border-[#c4a98e] px-7 py-3 text-sm font-semibold text-[#3D3027] transition-colors hover:bg-[#e8d8c8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D3027]">
            Meet the team
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

function AboutCircuit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 650" fill="none" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <path d="M0 126h188l54 54h152l52-52h168" stroke="currentColor" />
      <path d="M1440 482h-190l-65-65h-173l-54 54H812" stroke="currentColor" />
      <path d="M1120 0v124l-52 52v105" stroke="currentColor" />
      <path d="M244 650V526l58-58v-96" stroke="currentColor" />
      <circle cx="614" cy="128" r="5" fill="currentColor" />
      <circle cx="812" cy="471" r="5" fill="currentColor" />
      <circle cx="302" cy="372" r="5" fill="currentColor" />
      <circle cx="1068" cy="281" r="5" fill="currentColor" />
    </svg>
  );
}
