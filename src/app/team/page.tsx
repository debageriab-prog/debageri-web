import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "People",
  description:
    "Meet the senior software engineers behind Debageri AB in Gothenburg.",
  alternates: {
    canonical: "/team",
  },
};

const people = [
  {
    name: "Shahab Bagheri",
    role: "CEO & Senior Java Developer",
    assignment: "Zenseact AB",
    photo: "/team/shahab.jpg",
    linkedin: "https://www.linkedin.com/in/shahabbagheri/",
    bio: "Shahab founded Debageri to create the consultancy he wanted to work for: transparent, flexible and built around experienced engineers. He cares about clean code, scalable systems and giving people the trust to do their best work.",
    focus: ["Java", "Backend systems", "Technical leadership"],
  },
  {
    name: "Vahid Bafghi",
    role: "Embedded Software Engineer",
    assignment: "Zenseact AB",
    photo: "/team/vahid.jpg",
    linkedin: "https://www.linkedin.com/in/vahid-a-bafghi-44336887/",
    bio: "Vahid works close to the hardware, turning complex requirements into dependable embedded software. He brings a thoughtful, practical approach to systems where reliability and precision matter.",
    focus: ["Embedded software", "Reliable systems", "Automotive technology"],
  },
] as const;

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="People"
          titleId="people-heading"
          align="center"
          title={
            <>
              Small team. <em className="not-italic text-[#E8833A]">Real impact.</em>
            </>
          }
          lede={
            <p>
              We are senior engineers who value craft, trust and the freedom to
              do meaningful work. Right now, both of us are on assignment at
              Zenseact in Gothenburg.
            </p>
          }
        />

        <section aria-label="Team members" className="bg-[#fdfaf6] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl space-y-8">
            {people.map((person, index) => (
              <FadeIn key={person.name} delay={index * 110} className="fi-blur">
                <article className="grid overflow-hidden rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] md:grid-cols-[minmax(260px,0.8fr)_1.2fr]">
                  <div className="group relative min-h-80 overflow-hidden bg-[#e8d8c8] md:min-h-[430px]">
                    <Image
                      src={person.photo}
                      alt={`Portrait of ${person.name}`}
                      fill
                      sizes="(min-width: 768px) 400px, 100vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      priority={index === 0}
                    />
                    {/* Warm wash ties the photo to the brand rather than leaving it neutral. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#3D3027]/25 to-transparent"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">
                      {person.role}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl">
                      {person.name}
                    </h2>
                    <div className="mt-5 flex items-center gap-2.5 text-sm text-[#7a5e4a]">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 text-[#B85F1E]"
                        aria-hidden="true"
                      >
                        <BriefcaseIcon />
                      </span>
                      <span>
                        Current assignment at{" "}
                        <strong className="font-semibold text-[#5a4535]">{person.assignment}</strong>
                      </span>
                    </div>
                    <p className="mt-6 text-base leading-relaxed text-[#7a5e4a]">
                      {person.bio}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${person.name}'s areas of focus`}>
                      {person.focus.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-[#e8d8c8] bg-[#fdfaf6] px-3.5 py-1.5 text-xs font-medium text-[#7a5e4a]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#c4a98e] px-6 py-3 text-sm font-semibold text-[#3D3027] transition-colors hover:border-[#B85F1E] hover:bg-[#e8d8c8]"
                    >
                      View LinkedIn profile
                      <LinkedInIcon />
                    </a>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        <section aria-labelledby="join-heading" className="bg-[#15151E] px-6 py-20 md:py-24">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#D08A4F]">
              Grow with us
            </p>
            <h2
              id="join-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#F7F2EA] md:text-4xl"
            >
              Good people make good software.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#C7BFB4]">
              We are building a consultancy where experienced engineers get
              meaningful assignments, a fair share and room to shape their work.
            </p>
            <Link
              href="/careers"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-8 py-3.5 text-sm font-semibold text-[#2A1B0E] shadow-lg shadow-[#E8833A]/20 transition-colors hover:from-[#F6A263] hover:to-[#E27C33]"
            >
              Explore careers
              <ArrowRightIcon />
            </Link>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="4.5" width="13" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 4.5V3A1.5 1.5 0 0 1 7 1.5h2A1.5 1.5 0 0 1 10.5 3v1.5M1.5 8.5h13M6.5 8.5v1h3v-1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

