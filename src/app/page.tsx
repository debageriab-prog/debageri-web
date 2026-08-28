import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LogoMark } from "@/components/Logo";
import { FadeIn } from "@/components/FadeIn";
import { HeroSpheres } from "@/components/HeroSpheres";

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
        <HeroBlock />
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

/* Hero and trust bar share one canvas so a single sphere layer spans both; the
   bar only draws its rules and lets the hero background through underneath. */
function HeroBlock() {
  return (
    <div className="relative overflow-hidden bg-[#0B0B12]">
      <HeroSpheres />
      <HeroSection />
      <TrustBar />
    </div>
  );
}

function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" data-hero className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-[168px] pb-20 md:pt-[212px] md:pb-28">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-8">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="mb-5 inline-flex items-center gap-2.5 font-display text-xs font-bold tracking-[0.22em] text-[#D08A4F] uppercase">
                <span className="hero-beacon" aria-hidden="true">
                  <PinIcon size={13} />
                </span>
                Gothenburg, Sweden
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <h1 id="hero-heading" className="font-display text-5xl font-bold leading-[1.08] tracking-tight text-[#F7F2EA] md:text-6xl lg:text-7xl">
                We build{" "}
                <em className="not-italic text-[#E8833A]">software.</em>
                <br />
                We build{" "}
                <em className="not-italic text-[#E8833A]">careers.</em>
                <br />
                We build{" "}
                <em className="not-italic text-[#E8833A]">trust.</em>
              </h1>
            </FadeIn>

            <FadeIn delay={160}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#C7BFB4]">
                Debageri is a Swedish IT consultancy for senior engineers.
                We believe in freedom, trust and flexibility. You decide
                how to make the most of what you earn.
              </p>
            </FadeIn>

            <FadeIn delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-8 py-3.5 text-sm font-semibold text-[#2A1B0E] shadow-lg shadow-[#E8833A]/20 hover:from-[#F6A263] hover:to-[#E27C33] transition-colors"
                >
                  View Open Positions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-[#5C4A3C] px-8 py-3.5 text-sm font-semibold text-[#F7F2EA] hover:bg-[#1A1A24] transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="hidden md:flex justify-end">
            <LogoMark size={320} color="#E8833A" sketch />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trust bar ─────────────────────────────────────────────────────────────── */

function TrustBar() {
  const items = [
    { icon: <PinIcon size={20} />, primary: "Based in Sweden", secondary: "Operating worldwide" },
    { icon: <PeopleIcon size={20} />, primary: "Senior Consultants", secondary: "With real impact" },
    { icon: <HeartIcon size={20} />, primary: "Freedom & Flexibility", secondary: "You choose what matters" },
  ];

  return (
    <div className="relative border-y border-[#1C1C28] bg-[#0E0E16]/55">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:divide-x sm:divide-[#1C1C28]">
            {items.map((item) => (
              <div key={item.primary} className="flex items-center gap-3 sm:px-8 first:pl-0 last:pr-0">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 text-[#E8833A]"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-[#F7F2EA] leading-tight">{item.primary}</p>
                  <p className="text-xs text-[#9A9089] mt-0.5">{item.secondary}</p>
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
          <p className="font-display text-xs font-bold tracking-[0.22em] text-[#B85F1E] uppercase mb-3">Why Debageri</p>
          <h2 id="why-heading" className="font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl">
            Why work with us?
          </h2>
          <p className="mt-4 text-[#7a5e4a] max-w-lg mx-auto">
            We offer more than just a job. We offer an environment where you can thrive.
          </p>
        </FadeIn>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {WHY_CARDS.map((card, i) => (
            <li key={card.title} className="h-full">
              {/* Staggered delay runs the reveal left to right across the row. */}
              <FadeIn delay={i * 110} className="fi-blur h-full">
                <div className="group h-full rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="text-[#B85F1E]" aria-hidden="true">{card.icon}</span>
                  <div>
                    <p className="font-display font-bold text-lg leading-snug tracking-tight text-[#3D3027] mb-2">{card.title}</p>
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

/* Each sketch stands for one ingredient in the name: the mark for debug, the founder
   for Bagheri, the bread for the Swedish bageri. */
const STORY_PIECES = [
  { src: "/story/bug-sketch.webp", alt: "Sketch of a beetle crawling over circuit traces", caption: "debug", tilt: "-rotate-2" },
  { src: "/story/founder-sketch.webp", alt: "Sketch portrait of founder Shahab Bagheri", caption: "Bagheri", tilt: "rotate-1" },
  { src: "/story/bageri-sketch.webp", alt: "Sketch of a Swedish bakery loaf labelled bageri", caption: "bageri", tilt: "-rotate-1" },
];

function NameStorySection() {
  return (
    <section aria-labelledby="story-heading" className="bg-[#0B0B12] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 md:gap-7" role="list">
            {STORY_PIECES.map((piece, i) => (
              <Fragment key={piece.src}>
                {i > 0 && (
                  <li aria-hidden="true" className="shrink-0">
                    <Image
                      src="/story/plus-sketch.webp"
                      alt=""
                      width={160}
                      height={160}
                      className="h-8 w-8 opacity-80 sm:h-10 sm:w-10"
                    />
                  </li>
                )}
                <li className={`shrink-0 ${piece.tilt} transition-transform duration-500 hover:rotate-0`}>
                  <figure className="flex flex-col items-center gap-3">
                    <Image
                      src={piece.src}
                      alt={piece.alt}
                      width={560}
                      height={560}
                      className="h-32 w-32 rounded-2xl border border-[#E8833A]/20 sm:h-40 sm:w-40 md:h-48 md:w-48"
                    />
                    <figcaption className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#D08A4F]">
                      {piece.caption}
                    </figcaption>
                  </figure>
                </li>
              </Fragment>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <div className="mx-auto mb-8 h-px w-10 bg-[#E8833A]" />
            <h2 id="story-heading" className="font-display text-3xl font-bold tracking-tight text-[#F7F2EA] md:text-4xl">
              The story behind Debageri
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#C7BFB4]">
              <p>
                As developers, we all know the word debug. In Swedish,{" "}
                <strong className="font-semibold text-[#F7F2EA]">bageri</strong>{" "}means
                bakery, and it also happens to sound very similar to the
                founder&apos;s last name, Bagheri.
              </p>
              <p>
                Mixing all of this together felt like a fun and personal idea,
                and that&apos;s how Debageri was born.
              </p>
              <p>
                You can think of it as a little{" "}
                <strong className="font-semibold text-[#F7F2EA]">&ldquo;debug bakery&rdquo;</strong>.
              </p>
            </div>

            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#3A3A4A] px-5 py-2.5">
              <span className="text-sm font-medium text-[#D08A4F]">debug</span>
              <span className="text-[#5C5C70]">+</span>
              <span className="text-sm font-medium text-[#D08A4F]">bageri</span>
              <span className="text-[#5C5C70]">=</span>
              <span className="font-display text-sm font-bold text-[#F7F2EA]">debageri</span>
            </div>
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
          <p className="font-display text-xs font-bold tracking-[0.22em] text-[#B85F1E] uppercase mb-3">The team</p>
          <h2 id="team-heading" className="font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl">
            Meet the team
          </h2>
          <p className="mt-4 text-[#7a5e4a]">We&apos;re a small team with big ambitions.</p>
        </FadeIn>

        <ul className="grid gap-14 sm:grid-cols-2" role="list">
          {TEAM.map((member, i) => (
            <li key={member.name}>
              <FadeIn delay={i * 110} className="fi-blur">
                <div className="group flex flex-col items-center text-center">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={400}
                    height={400}
                    sizes="(min-width: 640px) 208px, 60vw"
                    className="h-44 w-44 rounded-full object-cover ring-1 ring-[#E8833A]/30 transition-transform duration-500 ease-out group-hover:scale-105 md:h-52 md:w-52"
                  />
                  <p className="mt-7 font-display text-xl font-bold tracking-tight text-[#3D3027] md:text-2xl">
                    {member.name}
                  </p>
                  <p className="mt-1.5 text-sm text-[#9A9089]">{member.role}</p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-[#9a7a63]">
                    <PinIcon size={12} />
                    <span>{member.location}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#b89880]">{member.current}</p>
                  <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#7a5e4a]">{member.bio}</p>
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
    <section aria-labelledby="cta-heading" className="px-6 py-20 md:py-24 bg-[#15151E]">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="rounded-2xl border border-[#2A2A38] bg-[#1E1E2A] px-8 py-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 text-[#E8833A] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <CoffeeIcon size={22} />
              </div>
              <div>
                <h2 id="cta-heading" className="font-display font-bold text-[#F7F2EA] text-lg">
                  Interested in joining Debageri?
                </h2>
                <p className="text-sm text-[#9a7a63] mt-0.5">
                  We&apos;re always looking for talented senior engineers.
                </p>
              </div>
            </div>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-7 py-3 text-sm font-semibold text-[#2A1B0E] hover:from-[#F6A263] hover:to-[#E27C33] transition-colors whitespace-nowrap flex-shrink-0"
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

function PeopleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1 13.5c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="11.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M13.5 13c.33-.46.5-.97.5-1.5 0-1.93-1.567-3.5-3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function HeartIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 13.5S2 9.5 2 5.5A3.5 3.5 0 0 1 8 3.58 3.5 3.5 0 0 1 14 5.5C14 9.5 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 9h16" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="14.5" cy="13" r="1" fill="currentColor"/>
      <path d="M6 5V3.5A1.5 1.5 0 0 1 7.5 2h5A1.5 1.5 0 0 1 14 3.5V5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L3 5v5c0 4.418 3.134 7.628 7 8.5C13.866 17.628 17 14.418 17 10V5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4C10 4 7 3 4 4v12c3-1 6 0 6 0s3-1 6 0V4c-3-1-6 0-6 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1 15h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
