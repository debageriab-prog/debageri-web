import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LogoMark } from "@/components/Logo";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Debageri AB | IT Consultancy in Gothenburg",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <WhySection />
        <NameStorySection />
        <TeamSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-[#F7F2EA]">
      {/* Full-bleed circuit background */}
      <CircuitBg className="absolute inset-0 w-full h-full pointer-events-none select-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-6 items-center">

          {/* Headline and calls to action */}
          <div className="max-w-2xl">
            <FadeIn>
              <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#9a7a63] uppercase">
                Gothenburg, Sweden
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <h1 id="hero-heading" className="text-5xl font-semibold leading-[1.08] tracking-tight text-[#3D3027] md:text-6xl lg:text-7xl">
                We build{" "}
                <em className="not-italic text-[#9a7a63]">software.</em>
                <br />
                We build{" "}
                <em className="not-italic text-[#9a7a63]">careers.</em>
                <br />
                We build{" "}
                <em className="not-italic text-[#9a7a63]">trust.</em>
              </h1>
            </FadeIn>

            <FadeIn delay={160}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#7a5e4a]">
                Debageri is a Swedish IT consultancy for senior engineers.
                We believe in freedom, trust and flexibility. You decide
                how to make the most of what you earn.
              </p>
            </FadeIn>

            <FadeIn delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3D3027] px-7 py-3 text-sm font-semibold text-[#F7F2EA] hover:bg-[#5a4535] transition-colors"
                >
                  View Open Positions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#c4a98e] px-7 py-3 text-sm font-semibold text-[#3D3027] hover:bg-[#e8d8c8] transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Logo mark hero graphic */}
          <FadeIn delay={120} className="hidden md:flex justify-end">
            <LogoMark size={300} className="opacity-95" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Trust bar ─────────────────────────────────────────────────────────────── */

function TrustBar() {
  const items = [
    { icon: <PinIcon />, primary: "Based in Sweden", secondary: "Operating worldwide" },
    { icon: <PeopleIcon />, primary: "Senior Consultants", secondary: "With real impact" },
    { icon: <HeartIcon />, primary: "Freedom & Flexibility", secondary: "You choose what matters" },
  ];

  return (
    <div className="border-y border-[#e8d8c8] bg-[#fdfaf6]">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:divide-x sm:divide-[#e8d8c8]">
            {items.map((item) => (
              <div key={item.primary} className="flex items-center gap-3 sm:px-8 first:pl-0 last:pr-0">
                <span className="text-[#9a7a63]" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-[#3D3027] leading-tight">{item.primary}</p>
                  <p className="text-xs text-[#9a7a63] mt-0.5">{item.secondary}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

/* ─── Why work with us ──────────────────────────────────────────────────────── */

const WHY_CARDS = [
  {
    icon: <WalletIcon />,
    title: "You decide",
    body: "Shape your compensation around what matters to you: salary, pension, equipment, conferences, and more.",
  },
  {
    icon: <ShieldIcon />,
    title: "Built on trust",
    body: "We hire experienced engineers and give you the freedom to do what you do best.",
  },
  {
    icon: <BookIcon />,
    title: "Invest in growth",
    body: "We invest in your development through courses, books, certifications and conferences.",
  },
  {
    icon: <LaptopIcon />,
    title: "Flexible lifestyle",
    body: "Work the way you work best. We support remote, hybrid and on-site arrangements.",
  },
  {
    icon: <GroupIcon />,
    title: "Small & personal",
    body: "Short decision paths, open communication and a flat structure. Just good people.",
  },
];

function WhySection() {
  return (
    <section aria-labelledby="why-heading" className="px-6 py-20 md:py-28 bg-[#F7F2EA]">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9a7a63] uppercase mb-3">Why Debageri</p>
          <h2 id="why-heading" className="text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">
            Why work with us?
          </h2>
          <p className="mt-4 text-[#7a5e4a] max-w-lg mx-auto">
            We offer more than just a job. We offer an environment where you can thrive.
          </p>
        </FadeIn>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {WHY_CARDS.map((card, i) => (
            <li key={card.title}>
              <FadeIn delay={i * 70}>
                <div className="group h-full rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="text-[#7a5e4a]" aria-hidden="true">{card.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-[#3D3027] mb-1.5">{card.title}</p>
                    <p className="text-xs leading-relaxed text-[#7a5e4a]">{card.body}</p>
                  </div>
                </div>
              </FadeIn>
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
    <section aria-labelledby="story-heading" className="bg-[#3D3027]">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Dark panel with large logo mark */}
        <FadeIn className="flex items-center justify-center">
          <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full border border-[#5a4535] opacity-40" />
            <div className="absolute inset-6 rounded-full border border-[#5a4535] opacity-20" />
            <LogoMark size={200} color="#c4a98e" />
          </div>
        </FadeIn>

        {/* Name story */}
        <FadeIn delay={100}>
          <div className="w-10 h-px bg-[#9a7a63] mb-8" />
          <h2 id="story-heading" className="text-3xl font-semibold tracking-tight text-[#F7F2EA] md:text-4xl">
            The story behind Debageri
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#c4a98e]">
            <p>
              As developers, we all know the word debug. In Swedish,{" "}
              <strong className="text-[#F7F2EA] font-semibold">bageri</strong>{" "}means
              bakery, and it also happens to sound very similar to the
              founder&apos;s last name, Bagheri.
            </p>
            <p>
              Mixing all of this together felt like a fun and personal idea,
              and that&apos;s how Debageri was born.
            </p>
            <p>
              You can think of it as a little{" "}
              <strong className="text-[#F7F2EA] font-semibold">&ldquo;debug bakery&rdquo;</strong>.
            </p>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#5a4535] px-5 py-2.5">
            <span className="text-sm font-medium text-[#9a7a63]">debug</span>
            <span className="text-[#5a4535]">+</span>
            <span className="text-sm font-medium text-[#9a7a63]">bageri</span>
            <span className="text-[#5a4535]">=</span>
            <span className="text-sm font-semibold text-[#F7F2EA]">debageri</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Team ───────────────────────────────────────────────────────────────────── */

const TEAM = [
  {
    name: "Shahab Bagheri",
    initials: "SB",
    photo: "/team/shahab.jpg",
    role: "CEO & Senior Java Developer",
    location: "Gothenburg, Sweden",
    current: "Currently at Zenseact",
    bio: "Passionate about clean code, scalable systems and creating an environment where developers can do their best work.",
  },
  {
    name: "Vahid Bafghi",
    initials: "VB",
    photo: "/team/vahid.jpg",
    role: "Embedded Software Developer",
    location: "Gothenburg, Sweden",
    current: "Currently at Zenseact",
    bio: "Enjoys solving complex problems close to the hardware and building reliable systems that make a difference.",
  },
];

function TeamSection() {
  return (
    <section aria-labelledby="team-heading" className="px-6 py-20 md:py-28 bg-[#fdfaf6]">
      <div className="mx-auto max-w-4xl">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9a7a63] uppercase mb-3">The team</p>
          <h2 id="team-heading" className="text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">
            Meet the team
          </h2>
          <p className="mt-4 text-[#7a5e4a]">We&apos;re a small team with big ambitions.</p>
        </FadeIn>

        <ul className="grid gap-5 md:grid-cols-2" role="list">
          {TEAM.map((member, i) => (
            <li key={member.name}>
            <FadeIn delay={i * 100}>
              <div className="group h-full rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                {/* Warm top bar */}
                <div className="h-1 bg-gradient-to-r from-[#c4a98e] to-[#9a7a63]" />
                <div className="p-7">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-[#3D3027] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                        onError={undefined}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3D3027]">{member.name}</p>
                      <p className="text-sm text-[#9a7a63] mt-0.5">{member.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#9a7a63] mb-1">
                    <PinIcon size={12} />
                    <span>{member.location}</span>
                  </div>
                  <p className="text-xs text-[#b89880] mb-4">{member.current}</p>
                  <p className="text-sm leading-relaxed text-[#7a5e4a]">{member.bio}</p>
                </div>
              </div>
            </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── CTA section ────────────────────────────────────────────────────────────── */

function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="px-6 py-20 md:py-24 bg-[#F7F2EA]">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] px-8 py-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-[#e8d8c8] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <CoffeeIcon size={22} />
              </div>
              <div>
                <h2 id="cta-heading" className="font-semibold text-[#3D3027] text-lg">
                  Interested in joining Debageri?
                </h2>
                <p className="text-sm text-[#9a7a63] mt-0.5">
                  We&apos;re always looking for talented senior engineers.
                </p>
              </div>
            </div>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3D3027] px-6 py-2.5 text-sm font-semibold text-[#F7F2EA] hover:bg-[#5a4535] transition-colors whitespace-nowrap flex-shrink-0"
            >
              View Open Positions
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────────────── */

function PinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1 13.5c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="11.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M13.5 13c.33-.46.5-.97.5-1.5 0-1.93-1.567-3.5-3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 13.5S2 9.5 2 5.5A3.5 3.5 0 0 1 8 3.58 3.5 3.5 0 0 1 14 5.5C14 9.5 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 9h16" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="14.5" cy="13" r="1" fill="currentColor"/>
      <path d="M6 5V3.5A1.5 1.5 0 0 1 7.5 2h5A1.5 1.5 0 0 1 14 3.5V5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L3 5v5c0 4.418 3.134 7.628 7 8.5C13.866 17.628 17 14.418 17 10V5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4C10 4 7 3 4 4v12c3-1 6 0 6 0s3-1 6 0V4c-3-1-6 0-6 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1 15h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 17c0-3.038 2.462-5.5 5.5-5.5S13 13.962 13 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="13.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M15.5 16.5c.5-.8 1-1.6 1-2.5 0-1.62-1.3-2.8-3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function CoffeeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2c0 0 1 2 0 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 2c0 0 1 2 0 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 2c0 0 1 2 0 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 8h12l-1.5 9A2 2 0 0 1 12.515 19H7.485A2 2 0 0 1 5.5 17L4 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 10h2a2 2 0 1 1 0 4h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="2" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Circuit background ─────────────────────────────────────────────────────── */

function CircuitBg({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1200 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.045 }}
      {...props}
    >
      {/* Horizontal traces */}
      <line x1="0"    y1="120" x2="300"  y2="120" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="400"  y1="120" x2="700"  y2="120" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="800"  y1="200" x2="1200" y2="200" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="0"    y1="350" x2="200"  y2="350" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="500"  y1="450" x2="900"  y2="450" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="1000" y1="550" x2="1200" y2="550" stroke="#3D3027" strokeWidth="1.5"/>

      {/* Vertical traces */}
      <line x1="300"  y1="0"   x2="300"  y2="120" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="300"  y1="120" x2="300"  y2="300" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="700"  y1="0"   x2="700"  y2="120" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="700"  y1="200" x2="700"  y2="450" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="200"  y1="350" x2="200"  y2="700" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="900"  y1="200" x2="900"  y2="450" stroke="#3D3027" strokeWidth="1.5"/>
      <line x1="1000" y1="450" x2="1000" y2="700" stroke="#3D3027" strokeWidth="1.5"/>

      {/* Nodes */}
      {[
        [300,120],[700,120],[700,200],[300,300],
        [200,350],[700,450],[900,450],[1000,550],
      ].map(([x,y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#3D3027"/>
      ))}

      {/* IC chip rectangles */}
      <rect x="280" y="280" width="40" height="40" rx="4" stroke="#3D3027" strokeWidth="1.5" fill="none"/>
      <rect x="880" y="180" width="40" height="40" rx="4" stroke="#3D3027" strokeWidth="1.5" fill="none"/>
      <rect x="180" y="430" width="40" height="40" rx="4" stroke="#3D3027" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
