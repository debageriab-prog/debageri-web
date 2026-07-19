import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Debageri AB — IT Consultancy in Gothenburg",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhySection />
        <NameStorySection />
        <TeamSection />
        <CtaBanner />
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
      className="relative overflow-hidden px-6 pt-16 pb-12 md:pt-24 md:pb-20"
    >
      {/* Subtle background circuit pattern */}
      <CircuitBg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none select-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-6 items-center">
          {/* Left — text */}
          <div>
            <h1
              id="hero-heading"
              className="text-4xl font-semibold leading-tight tracking-tight text-[#3D3027] md:text-5xl lg:text-6xl"
            >
              We build{" "}
              <span className="text-[#9a7a63]">software.</span>
              <br />
              We build{" "}
              <span className="text-[#9a7a63]">careers.</span>
              <br />
              We build{" "}
              <span className="text-[#9a7a63]">trust.</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#7a5e4a] md:text-lg">
              Debageri is a Swedish IT consultancy for senior engineers. We
              believe in freedom, trust and flexibility — you decide how to make
              the most of what you earn.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center rounded-lg bg-[#3D3027] px-6 py-2.5 text-sm font-medium text-[#F7F2EA] hover:bg-[#5a4535] transition-colors"
              >
                View Open Positions →
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-[#c4a98e] bg-transparent px-6 py-2.5 text-sm font-medium text-[#3D3027] hover:bg-[#e8d8c8] transition-colors"
              >
                Learn More About Us
              </Link>
            </div>

            {/* Stat badges */}
            <div className="mt-10 flex flex-wrap gap-5">
              <StatBadge icon={<PinIcon />} primary="Based in Sweden" secondary="Operating worldwide" />
              <StatBadge icon={<PeopleIcon />} primary="Senior Consultants" secondary="With real impact" />
              <StatBadge icon={<HeartIcon />} primary="Freedom & Flexibility" secondary="You choose what matters" />
            </div>
          </div>

          {/* Right — large logo mark */}
          <div className="flex justify-center md:justify-end">
            <LogoMark size={280} className="opacity-90" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why work with us ──────────────────────────────────────────────────────── */

function WhySection() {
  const cards = [
    {
      icon: <WalletIcon />,
      title: "You decide",
      body: "Shape your compensation the way you want — salary, pension, equipment, conferences, and more.",
    },
    {
      icon: <ShieldIcon />,
      title: "Built on trust",
      body: "We hire experienced engineers and give you the freedom to do what you do best.",
    },
    {
      icon: <BookIcon />,
      title: "Invest in growth",
      body: "Courses, books, certifications and conferences — we invest in your development.",
    },
    {
      icon: <LaptopIcon />,
      title: "Flexible lifestyle",
      body: "Work the way you work best. Remote, hybrid or on-site — we're flexible.",
    },
    {
      icon: <GroupIcon />,
      title: "Small & personal",
      body: "Short decisions paths, open communication and a flat structure. Just good people.",
    },
  ];

  return (
    <section aria-labelledby="why-heading" className="px-6 py-16 md:py-24 bg-[#fdfaf6]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2
            id="why-heading"
            className="text-2xl font-semibold tracking-tight text-[#3D3027] md:text-3xl"
          >
            Why work with us?
          </h2>
          <p className="mt-3 text-[#7a5e4a]">
            We offer more than just a job. We offer an environment where you can thrive.
          </p>
        </div>

        <ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          role="list"
        >
          {cards.map((card) => (
            <li
              key={card.title}
              className="rounded-xl border border-[#e8d8c8] bg-[#F7F2EA] p-5 flex flex-col gap-3"
            >
              <span className="text-[#9a7a63]" aria-hidden="true">
                {card.icon}
              </span>
              <span className="font-semibold text-sm text-[#3D3027]">{card.title}</span>
              <span className="text-xs leading-relaxed text-[#7a5e4a]">{card.body}</span>
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
      aria-labelledby="story-heading"
      className="px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left — warm photo placeholder */}
        <div
          className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#e8d8c8] flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-3 text-[#c4a98e]">
            <CoffeeIcon size={48} />
            <span className="text-xs font-medium tracking-widest uppercase opacity-60">Photo coming soon</span>
          </div>
        </div>

        {/* Right — text */}
        <div>
          <div className="w-8 h-px bg-[#c4a98e] mb-6" />
          <h2
            id="story-heading"
            className="text-2xl font-semibold tracking-tight text-[#3D3027] md:text-3xl"
          >
            The story behind Debageri
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-[#7a5e4a]">
            <p>
              As developers, we all know the word debug. In Swedish,{" "}
              <em>bageri</em> means bakery, and it also happens to sound very
              similar to the founder&apos;s last name, Bagheri.
            </p>
            <p>
              Mixing all of this together felt like a fun and personal idea, and
              that&apos;s how Debageri was born.
            </p>
            <p>You can think of it as a little &ldquo;debug bakery&rdquo;.</p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <LogoMark size={56} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Team ───────────────────────────────────────────────────────────────────── */

function TeamSection() {
  const members = [
    {
      name: "Shahab Bagheri",
      role: "CEO & Senior Java Developer",
      location: "Gothenburg, Sweden",
      current: "Currently at Zenseact",
      bio: "Passionate about clean code, scalable systems and creating an environment where developers can do their best work.",
    },
    {
      name: "Vahid Bafghi",
      role: "Embedded Software Developer",
      location: "Gothenburg, Sweden",
      current: "Currently at Zenseact",
      bio: "Enjoys solving complex problems close to the hardware and building reliable systems that make a difference.",
    },
  ];

  return (
    <section aria-labelledby="team-heading" className="px-6 py-16 md:py-24 bg-[#fdfaf6]">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2
            id="team-heading"
            className="text-2xl font-semibold tracking-tight text-[#3D3027] md:text-3xl"
          >
            Meet the team
          </h2>
          <p className="mt-3 text-[#7a5e4a]">We&apos;re a small team with big ambitions.</p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2" role="list">
          {members.map((member) => (
            <li
              key={member.name}
              className="rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-6"
            >
              {/* Avatar placeholder */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-full bg-[#e8d8c8] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-[#9a7a63] text-xl font-semibold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[#3D3027]">{member.name}</p>
                  <p className="text-sm text-[#9a7a63]">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#9a7a63] mb-1">
                <PinIcon size={12} />
                <span>{member.location}</span>
              </div>
              <p className="text-xs text-[#b89880] mb-3">{member.current}</p>
              <p className="text-sm leading-relaxed text-[#7a5e4a]">{member.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─────────────────────────────────────────────────────────────── */

function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="px-6 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] px-8 py-7 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div
              className="w-12 h-12 rounded-full bg-[#e8d8c8] flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <CoffeeIcon size={22} />
            </div>
            <div>
              <h2 id="cta-heading" className="font-semibold text-[#3D3027]">
                Interested in joining Debageri?
              </h2>
              <p className="text-sm text-[#9a7a63] mt-0.5">
                We&apos;re always looking for talented senior engineers.
              </p>
            </div>
          </div>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center rounded-lg bg-[#3D3027] px-6 py-2.5 text-sm font-medium text-[#F7F2EA] hover:bg-[#5a4535] transition-colors whitespace-nowrap flex-shrink-0"
          >
            View Open Positions →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Stat badge ─────────────────────────────────────────────────────────────── */

function StatBadge({
  icon,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[#9a7a63]" aria-hidden="true">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-[#3D3027] leading-none">{primary}</p>
        <p className="text-xs text-[#9a7a63] mt-0.5">{secondary}</p>
      </div>
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────────────── */

function PinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 13.5c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="11.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M13.5 13c.33-.46.5-.97.5-1.5 0-1.93-1.567-3.5-3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 13.5S2 9.5 2 5.5A3.5 3.5 0 0 1 8 3.58 3.5 3.5 0 0 1 14 5.5C14 9.5 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 9h16" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" />
      <path d="M6 5V3.5A1.5 1.5 0 0 1 7.5 2h5A1.5 1.5 0 0 1 14 3.5V5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L3 5v5c0 4.418 3.134 7.628 7 8.5C13.866 17.628 17 14.418 17 10V5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4C10 4 7 3 4 4v12c3-1 6 0 6 0s3-1 6 0V4c-3-1-6 0-6 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 15h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 17c0-3.038 2.462-5.5 5.5-5.5S13 13.962 13 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="13.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15.5 16.5C16 15.7 16.5 14.9 16.5 14c0-1.62-1.3-2.8-3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CoffeeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2c0 0 1 2 0 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 2c0 0 1 2 0 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 2c0 0 1 2 0 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 8h12l-1.5 9A2 2 0 0 1 12.515 19H7.485A2 2 0 0 1 5.5 17L4 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 10h2a2 2 0 1 1 0 4h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Background circuit SVG ─────────────────────────────────────────────────── */

function CircuitBg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="100" y1="0" x2="100" y2="200" stroke="#3D3027" strokeWidth="1" />
      <line x1="100" y1="200" x2="300" y2="200" stroke="#3D3027" strokeWidth="1" />
      <line x1="300" y1="200" x2="300" y2="400" stroke="#3D3027" strokeWidth="1" />
      <line x1="300" y1="400" x2="600" y2="400" stroke="#3D3027" strokeWidth="1" />
      <line x1="200" y1="0" x2="200" y2="100" stroke="#3D3027" strokeWidth="1" />
      <line x1="200" y1="100" x2="500" y2="100" stroke="#3D3027" strokeWidth="1" />
      <line x1="500" y1="100" x2="500" y2="300" stroke="#3D3027" strokeWidth="1" />
      <line x1="500" y1="300" x2="700" y2="300" stroke="#3D3027" strokeWidth="1" />
      <line x1="400" y1="0" x2="400" y2="150" stroke="#3D3027" strokeWidth="1" />
      <line x1="400" y1="350" x2="400" y2="600" stroke="#3D3027" strokeWidth="1" />
      <line x1="600" y1="0" x2="600" y2="250" stroke="#3D3027" strokeWidth="1" />
      <line x1="600" y1="250" x2="800" y2="250" stroke="#3D3027" strokeWidth="1" />
      <circle cx="100" cy="200" r="4" fill="#3D3027" />
      <circle cx="300" cy="200" r="4" fill="#3D3027" />
      <circle cx="300" cy="400" r="4" fill="#3D3027" />
      <circle cx="200" cy="100" r="4" fill="#3D3027" />
      <circle cx="500" cy="100" r="4" fill="#3D3027" />
      <circle cx="500" cy="300" r="4" fill="#3D3027" />
      <circle cx="600" cy="250" r="4" fill="#3D3027" />
      <rect x="92" y="42" width="16" height="16" rx="3" stroke="#3D3027" strokeWidth="1" fill="none" />
      <rect x="492" y="92" width="16" height="16" rx="3" stroke="#3D3027" strokeWidth="1" fill="none" />
      <rect x="292" y="392" width="16" height="16" rx="3" stroke="#3D3027" strokeWidth="1" fill="none" />
    </svg>
  );
}
