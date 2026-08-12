import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

  return <>
    <Header />
    <main>
      <section className="border-b border-[#e8d8c8] bg-[#F7F2EA] px-6 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-[#7a5e4a] transition-colors hover:text-[#3D3027]">
            <span aria-hidden="true">←</span> Back to careers
          </Link>
          <div className="mt-9 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9a7a63]">
                <span className="rounded-full bg-[#e8d8c8] px-3 py-1.5 font-mono font-semibold text-[#5a4535]">{job.id}</span>
                <span>Published {formatDate(job.publishedAt)}</span>
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#3D3027] md:text-6xl">{job.title}</h1>
              <p className="mt-5 text-base text-[#7a5e4a]">{job.expiresAt ? `Applications close ${formatDate(job.expiresAt)}.` : "Applications are open until the position is filled."}</p>
            </div>
            <JobApplicationModal jobId={job.id} jobTitle={job.title} swedenOnly={job.swedenOnly} remotePosition={job.remotePosition} />
          </div>
        </div>
      </section>

      <section className="bg-[#fdfaf6] px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">The opportunity</p>
            <div className="job-rich-text mt-6 text-base leading-7 text-[#7a5e4a]" dangerouslySetInnerHTML={{ __html: job.description }} />
          </article>
          <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Opportunity details">
            <div className="rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-6">
              <DetailGroup title="Cities" values={job.cities} />
              <div className="my-6 h-px bg-[#e8d8c8]" />
              <DetailGroup title="Languages" values={job.languages} />
              <div className="my-6 h-px bg-[#e8d8c8]" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a63]">Deadline</p>
              <p className="mt-2 text-sm font-medium text-[#5a4535]">{job.expiresAt ? formatDate(job.expiresAt) : "Open until filled"}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#e8d8c8] bg-[#F7F2EA] px-6 py-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] px-7 py-8 text-[#3D3027] sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a63]">Interested?</p><h2 className="mt-2 text-2xl font-semibold">Let us get to know you.</h2></div>
          <JobApplicationModal jobId={job.id} jobTitle={job.title} swedenOnly={job.swedenOnly} remotePosition={job.remotePosition} instanceId="footer" />
        </div>
      </section>
    </main>
    <Footer />
  </>;
}

function DetailGroup({ title, values }: { title: string; values: string[] }) {
  return <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a63]">{title}</p><ul className="mt-3 flex flex-wrap gap-2" role="list">{values.map((value) => <li key={value} className="rounded-full border border-[#e8d8c8] bg-[#fdfaf6] px-3 py-1.5 text-xs font-medium text-[#5a4535]">{value}</li>)}</ul></div>;
}

function formatDate(value: Date | null) {
  if (!value) return "recently";
  return new Intl.DateTimeFormat("en-SE", { day: "numeric", month: "long", year: "numeric" }).format(value);
}
