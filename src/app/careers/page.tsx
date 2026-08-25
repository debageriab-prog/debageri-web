import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { CareersList } from "@/components/CareersList";
import { getPublishedJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore open software consulting opportunities at Debageri AB.",
  alternates: {
    canonical: "/careers",
  },
};

const benefits = [
  { icon: <OwnershipIcon />, label: "Real ownership" },
  { icon: <WalletIcon />, label: "Flexible compensation" },
  { icon: <PeopleIcon />, label: "Senior community" },
];

export default async function CareersPage() {
  const jobs = await getPublishedJobs();
  const serializedJobs = jobs.map((job) => ({
    ...job,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
    publishedAt: job.publishedAt?.toISOString() ?? null,
    archivedAt: job.archivedAt?.toISOString() ?? null,
    expiresAt: job.expiresAt?.toISOString() ?? null,
  }));

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Careers"
          titleId="careers-heading"
          align="center"
          title={
            <>
              Do work that matters.
              <br />
              Keep the <em className="not-italic text-[#E8833A]">freedom</em> you earned.
            </>
          }
          lede={
            <p>
              Join a consultancy built for experienced engineers, with meaningful
              assignments, transparent compensation, and trust from day one.
            </p>
          }
        >
          <ul className="mt-9 flex flex-wrap justify-center gap-3" role="list">
            {benefits.map((benefit) => (
              <li
                key={benefit.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#2A2A38] bg-[#12121B] px-5 py-2.5 text-sm text-[#C7BFB4]"
              >
                <span className="text-[#E8833A]" aria-hidden="true">
                  {benefit.icon}
                </span>
                {benefit.label}
              </li>
            ))}
          </ul>
        </PageHero>

        <section className="bg-[#fdfaf6] px-6 py-20 md:py-24" aria-labelledby="open-roles-heading">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="mb-9">
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">
                  Opportunities
                </p>
                <h2
                  id="open-roles-heading"
                  className="mt-3 font-display text-3xl font-bold tracking-tight text-[#3D3027] md:text-4xl"
                >
                  Find your next challenge.
                </h2>
              </div>
            </FadeIn>
            <CareersList jobs={serializedJobs} />
          </div>
        </section>

        <section aria-labelledby="open-application-heading" className="bg-[#15151E] px-6 py-20 md:py-24">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#D08A4F]">
              Nothing quite right?
            </p>
            <h2
              id="open-application-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#F7F2EA] md:text-4xl"
            >
              Good conversations do not need a job ID.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#C7BFB4]">
              If you are an experienced engineer who shares our values, we would
              still like to hear from you.
            </p>
            <a
              href="mailto:info@debageri.se"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-8 py-3.5 text-sm font-semibold text-[#2A1B0E] shadow-lg shadow-[#E8833A]/20 transition-colors hover:from-[#F6A263] hover:to-[#E27C33]"
            >
              Introduce yourself
              <ArrowRightIcon />
            </a>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}

function OwnershipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5 12.4 7.4l5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L2.2 8.2l5.4-.8L10 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 9h16" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 17c0-3.038 2.462-5.5 5.5-5.5S13 13.962 13 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="13.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M15.5 16.5c.5-.8 1-1.6 1-2.5 0-1.62-1.3-2.8-3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
