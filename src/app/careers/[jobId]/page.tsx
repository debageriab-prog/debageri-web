import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { JobApplicationModal } from "@/components/JobApplicationModal";
import { getPublishedJob } from "@/lib/jobs";

export const dynamic = "force-dynamic";

interface JobPageProps {
  params: Promise<{ jobId: string }>;
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = await getPublishedJob(jobId);
  if (!job) return { title: "Opportunity not found" };
  return {
    title: job.title,
    description: `Apply for ${job.title} at Debageri AB. ${job.cities.join(", ")}.`,
    alternates: {
      canonical: `/careers/${encodeURIComponent(job.id)}`,
    },
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { jobId } = await params;
  const job = await getPublishedJob(jobId);
  if (!job) notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Open position"
          titleId="job-heading"
          title={job.title}
          above={
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#C7BFB4] transition-colors hover:text-[#E8833A]"
            >
              <span
                className="transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              >
                ←
              </span>
              Back to careers
            </Link>
          }
          lede={
            <p>
              {job.expiresAt
                ? `Applications close ${formatDate(job.expiresAt)}.`
                : "Applications are open until the position is filled."}
            </p>
          }
        >
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#9A9089]">
            <span className="rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 px-3 py-1.5 font-mono font-semibold text-[#D08A4F]">
              {job.id}
            </span>
            <span>Published {formatDate(job.publishedAt)}</span>
          </div>

          <div className="mt-8">
            <JobApplicationModal
              jobId={job.id}
              jobTitle={job.title}
              swedenOnly={job.swedenOnly}
              remotePosition={job.remotePosition}
            />
          </div>
        </PageHero>

        <section className="bg-[#fdfaf6] px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <FadeIn>
              <article>
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">
                  The opportunity
                </p>
                <div
                  className="job-rich-text mt-6 text-base leading-7 text-[#7a5e4a]"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </article>
            </FadeIn>

            <FadeIn delay={110} className="fi-blur lg:sticky lg:top-28 lg:self-start">
              <aside aria-label="Opportunity details">
                <div className="rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-6">
                  <DetailGroup title="Cities" values={job.cities} />
                  <div className="my-6 h-px bg-[#e8d8c8]" />
                  <DetailGroup title="Languages" values={job.languages} />
                  <div className="my-6 h-px bg-[#e8d8c8]" />
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7a63]">
                    Deadline
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#5a4535]">
                    {job.expiresAt ? formatDate(job.expiresAt) : "Open until filled"}
                  </p>
                </div>
              </aside>
            </FadeIn>
          </div>
        </section>

        <section aria-labelledby="job-cta-heading" className="bg-[#15151E] px-6 py-16 md:py-20">
          <FadeIn className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-6 rounded-2xl border border-[#2A2A38] bg-[#1E1E2A] px-8 py-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#D08A4F]">
                  Interested?
                </p>
                <h2
                  id="job-cta-heading"
                  className="mt-2 font-display text-2xl font-bold tracking-tight text-[#F7F2EA]"
                >
                  Let us get to know you.
                </h2>
              </div>
              <JobApplicationModal
                jobId={job.id}
                jobTitle={job.title}
                swedenOnly={job.swedenOnly}
                remotePosition={job.remotePosition}
                instanceId="footer"
              />
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DetailGroup({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7a63]">
        {title}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2" role="list">
        {values.map((value) => (
          <li
            key={value}
            className="rounded-full border border-[#e8d8c8] bg-[#fdfaf6] px-3.5 py-1.5 text-xs font-medium text-[#5a4535]"
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDate(value: Date | null) {
  if (!value) return "recently";
  return new Intl.DateTimeFormat("en-SE", { day: "numeric", month: "long", year: "numeric" }).format(value);
}
