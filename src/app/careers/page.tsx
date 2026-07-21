import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { CareersList } from "@/components/CareersList";
import { getPublishedJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore open software consulting opportunities at Debageri AB.",
};

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
        <section className="relative overflow-hidden border-b border-[#e8d8c8] px-6 py-20 md:py-28">
          <CareersCircuit className="pointer-events-none absolute inset-0 h-full w-full text-[#c4a98e] opacity-25" />
          <div className="relative mx-auto max-w-5xl text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Careers</p>
              <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#3D3027] md:text-6xl">
                Do work that matters.<br />Keep the freedom you earned.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#7a5e4a]">
                Join a consultancy built for experienced engineers, with meaningful assignments,
                transparent compensation, and trust from day one.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3 text-sm text-[#5a4535]">
                <Benefit icon="↗" label="Real ownership" />
                <Benefit icon="◎" label="Flexible compensation" />
                <Benefit icon="◇" label="Senior community" />
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[#fdfaf6] px-6 py-20 md:py-24" aria-labelledby="open-roles-heading">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="mb-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Opportunities</p>
                <h2 id="open-roles-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">Find your next challenge.</h2>
              </div>
            </FadeIn>
            <CareersList jobs={serializedJobs} />
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <FadeIn className="mx-auto max-w-5xl">
            <div className="rounded-2xl bg-[#3D3027] px-8 py-10 text-center sm:px-12 md:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a98e]">Nothing quite right?</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#F7F2EA]">Good conversations do not need a job ID.</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#c4a98e]">If you are an experienced engineer who shares our values, we would still like to hear from you.</p>
              <a href="mailto:info@debageri.se" className="mt-7 inline-flex rounded-lg bg-[#F7F2EA] px-6 py-3 text-sm font-semibold text-[#3D3027] hover:bg-[#e8d8c8]">Introduce yourself</a>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Benefit({ icon, label }: { icon: string; label: string }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-[#e8d8c8] bg-[#fdfaf6] px-4 py-2"><span className="text-[#9a7a63]" aria-hidden="true">{icon}</span>{label}</span>;
}

function CareersCircuit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 520" fill="none" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <path d="M0 108h190l56 56h180l58-58h150" stroke="currentColor" />
      <path d="M1440 410h-216l-60-60H992l-56 56H788" stroke="currentColor" />
      <path d="M1122 0v112l-48 48v94M286 520v-98l54-54v-92" stroke="currentColor" />
      <circle cx="634" cy="106" r="5" fill="currentColor" /><circle cx="788" cy="406" r="5" fill="currentColor" /><circle cx="340" cy="276" r="5" fill="currentColor" /><circle cx="1074" cy="254" r="5" fill="currentColor" />
    </svg>
  );
}
