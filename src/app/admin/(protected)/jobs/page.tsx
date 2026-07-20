import type { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/lib/jobs";

export const metadata: Metadata = { title: "Jobs" };

export default async function AdminJobsPage({ searchParams }: { searchParams: Promise<{ created?: string; updated?: string; deleted?: string }> }) {
  const [jobs, params] = await Promise.all([getAllJobs(), searchParams]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">Job opportunities</h1>
          <p className="mt-2 text-sm text-[#7a5e4a]">Publish opportunities for the public Careers page.</p>
        </div>
        <Link href="/admin/jobs/new" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3D3027] px-5 py-2.5 text-sm font-semibold text-[#F7F2EA] hover:bg-[#5a4535]">
          <span aria-hidden="true">＋</span> New opportunity
        </Link>
      </div>

      {params.created === "1" && <p role="status" className="mt-7 rounded-lg border border-[#c8d9c8] bg-[#edf4ed] px-4 py-3 text-sm text-[#476047]">The opportunity is published and visible on Careers.</p>}
      {params.updated === "1" && <p role="status" className="mt-7 rounded-lg border border-[#c8d9c8] bg-[#edf4ed] px-4 py-3 text-sm text-[#476047]">The opportunity was updated.</p>}
      {params.deleted === "1" && <p role="status" className="mt-7 rounded-lg border border-[#c8d9c8] bg-[#edf4ed] px-4 py-3 text-sm text-[#476047]">The opportunity was deleted.</p>}

      <div className="mt-7 overflow-hidden rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6]">
        {jobs.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <p className="font-semibold text-[#3D3027]">No opportunities yet.</p>
            <p className="mt-2 text-sm text-[#9a7a63]">Publish the first role when you are ready to grow the team.</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#e8d8c8]" role="list">
            {jobs.map((job) => (
              <li key={job.id}>
                <Link href={`/admin/jobs/${job.id}/edit`} className="grid gap-4 px-5 py-5 transition-colors hover:bg-[#F7F2EA] sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-[#3D3027]">{job.title}</h2>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${isExpired(job.expiresAt) ? "bg-[#eadfdb] text-[#765248]" : "bg-[#dce8dc] text-[#476047]"}`}>{isExpired(job.expiresAt) ? "expired" : job.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#9a7a63]">{job.id} · {job.cities.join(", ")} · {job.languages.join(", ")}{job.expiresAt ? ` · Expires ${formatDate(job.expiresAt)}` : ""}</p>
                </div>
                <span className="text-sm font-semibold text-[#7a5e4a]">Edit →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function isExpired(expiresAt: Date | null) {
  return Boolean(expiresAt && expiresAt.getTime() <= Date.now());
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-SE", { dateStyle: "medium", timeStyle: "short" }).format(date);
}
