import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { notFound } from "next/navigation";
import { AdminJobForm } from "@/components/AdminJobForm";
import { DeleteJobButton } from "@/components/DeleteJobButton";
import { getJob } from "@/lib/jobs";

export const metadata: Metadata = { title: "Edit job opportunity" };

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 md:py-14">
      <Link href="/admin/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-[#7a5e4a] hover:text-[#3D3027]"><ArrowLeftIcon /> Back to jobs</Link>
      <div className="mt-6 rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6 shadow-[0_20px_60px_rgba(61,48,39,0.05)] sm:p-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Edit opportunity</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">{job.title}</h1>
            <p className="mt-2 font-mono text-xs text-[#9a7a63]">{job.id}</p>
          </div>
          <DeleteJobButton jobId={job.id} jobTitle={job.title} />
        </div>
        <div className="my-8 h-px bg-[#e8d8c8]" />
        <AdminJobForm
          initialJob={{
            id: job.id,
            title: job.title,
            description: job.description,
            cities: job.cities,
            languages: job.languages,
            swedenOnly: job.swedenOnly,
            remotePosition: job.remotePosition,
            expiresAt: toSwedenDateTimeLocal(job.expiresAt),
          }}
        />
      </div>
    </main>
  );
}

function toSwedenDateTimeLocal(date: Date | null) {
  if (!date) return "";
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  return parts.replace(" ", "T");
}
