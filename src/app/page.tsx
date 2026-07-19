import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Debageri AB — IT Consultancy in Gothenburg",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CompensationSection />
        <NameStorySection />
        <CareersSection />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-6 pt-24 pb-28 md:pt-36 md:pb-40"
    >
      {/* Subtle circuit-board background graphic */}
      <CircuitPattern
        className="absolute right-0 top-0 h-full w-1/2 opacity-[0.04] pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Eyebrow */}
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8d8c8] bg-[#fdfaf6] px-4 py-1.5 text-xs font-medium tracking-widest text-[#9a7a63] uppercase">
          <span aria-hidden="true">⬡</span>
          Gothenburg, Sweden
        </p>

        <h1
          id="hero-heading"
          className="text-4xl font-semibold leading-tight tracking-tight text-[#3D3027] md:text-6xl md:leading-[1.1]"
        >
          Engineers who ship.
          <br />
          <span className="text-[#9a7a63]">No fluff.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#7a5e4a] md:text-xl">
          Debageri is a Swedish IT consultancy built for engineers who want to
          do great work, earn fairly, and own their path.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/careers"
            className="inline-flex items-center justify-center rounded-full bg-[#3D3027] px-7 py-3 text-sm font-medium text-[#F7F2EA] hover:bg-[#5a4535] transition-colors"
          >
            See open positions
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-[#c4a98e] px-7 py-3 text-sm font-medium text-[#3D3027] hover:bg-[#e8d8c8] transition-colors"
          >
            Learn about us
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────────────────────────── */

function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 md:items-center">
          {/* Text */}
          <div>
            <SectionLabel>Who we are</SectionLabel>
            <h2
              id="about-heading"
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#3D3027] md:text-4xl"
            >
              A small team.
              <br />A serious craft.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#7a5e4a]">
              Debageri AB is a boutique IT consultancy founded by Shahab Bagheri
              in Gothenburg. Our engineers consult at leading Swedish tech
              companies — currently Zenseact AB — delivering high-quality
              software across Java backends and embedded systems.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#7a5e4a]">
              We stay small intentionally. Every person on the team is senior,
              trusted, and treated like a partner.
            </p>
          </div>

          {/* Stats card */}
          <div className="rounded-2xl bg-[#fdfaf6] border border-[#e8d8c8] p-8 flex flex-col gap-6">
            <Stat value="2" label="Senior engineers" />
            <div className="h-px bg-[#e8d8c8]" />
            <Stat value="Gothenburg" label="Headquartered in" />
            <div className="h-px bg-[#e8d8c8]" />
            <Stat value="Sweden" label="Registered in" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Compensation ───────────────────────────────────────────────────────────── */

function CompensationSection() {
  const items = [
    { icon: "₿", label: "Salary", description: "Choose how much you take home" },
    { icon: "⛺", label: "Pension", description: "Contribute more than the minimum" },
    { icon: "🖥", label: "Equipment", description: "Get the tools you actually need" },
    { icon: "✈", label: "Conferences", description: "Invest in your knowledge" },
    { icon: "🎓", label: "Education", description: "Courses, books, certifications" },
    { icon: "🚗", label: "Car leasing", description: "Use your package flexibly" },
  ];

  return (
    <section
      aria-labelledby="compensation-heading"
      className="px-6 py-20 md:py-28 bg-[#fdfaf6]"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Compensation</SectionLabel>
          <h2
            id="compensation-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#3D3027] md:text-4xl"
          >
            You earn it.
            <br />
            You decide what to do with it.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#7a5e4a]">
            Our model is simple: consultants receive a generous share of what
            they bill and choose how to allocate it across the benefits that
            matter to them.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="list">
          {items.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-6 flex flex-col gap-2"
            >
              <span className="text-2xl" aria-hidden="true">{item.icon}</span>
              <span className="font-semibold text-[#3D3027]">{item.label}</span>
              <span className="text-sm text-[#9a7a63]">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Name story ─────────────────────────────────────────────────────────────── */

function NameStorySection() {
  return (
    <section
      aria-labelledby="name-story-heading"
      className="px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Our name</SectionLabel>
        <h2
          id="name-story-heading"
          className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#3D3027] md:text-4xl"
        >
          A debug bakery.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[#7a5e4a]">
          <em>Debageri</em> is a portmanteau of{" "}
          <strong className="font-semibold text-[#5a4535]">debug</strong> and{" "}
          <strong className="font-semibold text-[#5a4535]">bageri</strong> — the
          Swedish word for bakery — with a nod to the founder&apos;s surname,
          Bagheri.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#7a5e4a]">
          Like a bakery, we take raw ingredients, apply craft and patience, and
          deliver something people can actually use. We just do it in code.
        </p>

        {/* Decorative pill */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#e8d8c8] bg-[#fdfaf6] px-6 py-3">
          <span className="text-xl" aria-hidden="true">🐛</span>
          <span className="text-sm font-medium text-[#7a5e4a]">debug</span>
          <span className="text-[#c4a98e]">+</span>
          <span className="text-sm font-medium text-[#7a5e4a]">bageri</span>
          <span className="text-[#c4a98e]">=</span>
          <span className="text-sm font-semibold text-[#3D3027]">debageri</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Careers CTA ────────────────────────────────────────────────────────────── */

function CareersSection() {
  return (
    <section
      aria-labelledby="careers-heading"
      className="px-6 py-20 md:py-28 bg-[#3D3027]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs font-medium tracking-widest text-[#c4a98e] uppercase">
          Join us
        </p>
        <h2
          id="careers-heading"
          className="text-3xl font-semibold leading-tight tracking-tight text-[#F7F2EA] md:text-4xl"
        >
          Work on hard problems.
          <br />
          Keep what you earn.
        </h2>
        <p className="mt-5 max-w-lg mx-auto text-base leading-relaxed text-[#c4a98e]">
          We&apos;re building a team of engineers who value autonomy, craft, and
          fair compensation. If that sounds like you, we&apos;d like to talk.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/careers"
            className="inline-flex items-center justify-center rounded-full bg-[#F7F2EA] px-7 py-3 text-sm font-medium text-[#3D3027] hover:bg-[#e8d8c8] transition-colors"
          >
            View open positions
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-[#7a5e4a] px-7 py-3 text-sm font-medium text-[#F7F2EA] hover:border-[#c4a98e] hover:text-[#c4a98e] transition-colors"
          >
            About the company
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-widest text-[#9a7a63] uppercase">
      {children}
    </p>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold text-[#3D3027]">{value}</p>
      <p className="text-sm text-[#9a7a63] mt-0.5">{label}</p>
    </div>
  );
}

/* ─── SVG Circuit Pattern ────────────────────────────────────────────────────── */

function CircuitPattern({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M50 50 L50 200 L150 200 L150 350" stroke="#3D3027" strokeWidth="1.5" />
      <path d="M100 100 L250 100 L250 300 L350 300" stroke="#3D3027" strokeWidth="1.5" />
      <path d="M200 50 L200 150 L350 150 L350 400" stroke="#3D3027" strokeWidth="1.5" />
      <path d="M50 350 L150 350 L150 500 L300 500" stroke="#3D3027" strokeWidth="1.5" />
      <path d="M300 200 L400 200" stroke="#3D3027" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="5" fill="#3D3027" />
      <circle cx="50" cy="200" r="5" fill="#3D3027" />
      <circle cx="150" cy="200" r="5" fill="#3D3027" />
      <circle cx="150" cy="350" r="5" fill="#3D3027" />
      <circle cx="100" cy="100" r="5" fill="#3D3027" />
      <circle cx="250" cy="100" r="5" fill="#3D3027" />
      <circle cx="250" cy="300" r="5" fill="#3D3027" />
      <circle cx="350" cy="300" r="5" fill="#3D3027" />
      <circle cx="200" cy="150" r="5" fill="#3D3027" />
      <circle cx="350" cy="150" r="5" fill="#3D3027" />
      <circle cx="350" cy="400" r="5" fill="#3D3027" />
      <circle cx="300" cy="500" r="5" fill="#3D3027" />
      <rect x="42" y="42" width="16" height="16" rx="2" stroke="#3D3027" strokeWidth="1" fill="none" />
      <rect x="242" y="292" width="16" height="16" rx="2" stroke="#3D3027" strokeWidth="1" fill="none" />
      <rect x="142" y="342" width="16" height="16" rx="2" stroke="#3D3027" strokeWidth="1" fill="none" />
    </svg>
  );
}
