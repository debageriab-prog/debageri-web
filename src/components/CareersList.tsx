"use client";

import { useMemo, useState } from "react";
import { JobApplicationModal } from "@/components/JobApplicationModal";
import type { JobStatus } from "@/types/job";

interface SerializedJob {
  id: string;
  title: string;
  description: string;
  descriptionText: string;
  cities: string[];
  languages: string[];
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  archivedAt: string | null;
  expiresAt: string | null;
  createdBy: string;
  updatedBy: string | null;
}

export function CareersList({ jobs }: { jobs: SerializedJob[] }) {
  const [query, setQuery] = useState("");
  const filteredJobs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return jobs;
    return jobs.filter((job) =>
      [job.id, job.title, job.descriptionText, ...job.cities, ...job.languages]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [jobs, query]);

  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] px-7 py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8d8c8] text-xl text-[#5a4535]" aria-hidden="true">⌁</span>
        <h3 className="mt-5 text-xl font-semibold text-[#3D3027]">No open roles today.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#7a5e4a]">The right opportunity is worth waiting for. Check back soon or introduce yourself below.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <SearchIcon />
        <label htmlFor="career-search" className="sr-only">Search opportunities</label>
        <input
          id="career-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by role, city, language, or job ID..."
          className="w-full rounded-xl border border-[#e8d8c8] bg-[#F7F2EA] py-4 pl-12 pr-28 text-base text-[#3D3027] placeholder:text-[#b89880] focus:border-[#9a7a63] focus:outline-none"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#9a7a63]">
          {filteredJobs.length} {filteredJobs.length === 1 ? "role" : "roles"}
        </span>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#c4a98e] px-6 py-14 text-center">
          <p className="font-semibold text-[#3D3027]">No matching opportunities.</p>
          <p className="mt-2 text-sm text-[#9a7a63]">Try a different role, city, language, or job ID.</p>
          <button type="button" onClick={() => setQuery("")} className="mt-5 text-sm font-semibold text-[#5a4535] underline decoration-[#c4a98e] underline-offset-4">Clear search</button>
        </div>
      ) : (
        <ul className="mt-6 space-y-5" role="list">
          {filteredJobs.map((job) => (
            <li key={job.id}>
              <details className="career-job group overflow-hidden rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] transition-all duration-300 hover:border-[#c4a98e] hover:shadow-[0_12px_36px_rgba(61,48,39,0.06)] open:border-[#c4a98e] open:shadow-[0_16px_40px_rgba(61,48,39,0.07)]">
                <summary className="cursor-pointer list-none p-6 focus:outline-none sm:p-8 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#e8d8c8] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#7a5e4a]">{job.id}</span>
                        <span className="text-xs text-[#9a7a63]">Published {formatDate(job.publishedAt)}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#3D3027] sm:text-3xl">{job.title}</h3>
                    </div>
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#e8d8c8] bg-[#fdfaf6] text-[#7a5e4a] transition-transform duration-300 group-open:rotate-180" aria-hidden="true">
                      <ChevronIcon />
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 border-t border-[#e8d8c8] pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    <SummaryMeta label="Deadline" value={job.expiresAt ? formatDate(job.expiresAt) : "Open until filled"} icon={<CalendarIcon />} />
                    <SummaryMeta label="Cities" value={compactValues(job.cities)} icon={<PinIcon />} />
                    <SummaryMeta label="Languages" value={compactValues(job.languages)} icon={<LanguageIcon />} />
                    <div className="flex items-center justify-start gap-2 text-sm font-semibold text-[#5a4535] lg:justify-end">
                      <span className="group-open:hidden">View details</span>
                      <span className="hidden group-open:inline">Hide details</span>
                    </div>
                  </div>
                </summary>

                <div className="border-t border-[#e8d8c8] bg-[#fdfaf6] px-6 py-7 sm:px-8 sm:py-8">
                  <div className="job-rich-text text-base leading-7 text-[#7a5e4a]" dangerouslySetInnerHTML={{ __html: job.description }} />

                  <div className="mt-8 grid gap-5 border-t border-[#e8d8c8] pt-6 sm:grid-cols-2">
                    <MetaGroup label="Cities" values={job.cities} icon={<PinIcon />} />
                    <MetaGroup label="Languages" values={job.languages} icon={<LanguageIcon />} />
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#9a7a63]">{job.expiresAt ? `Applications close ${formatDate(job.expiresAt)}.` : "Applications are open until the position is filled."}</p>
                    <JobApplicationModal jobId={job.id} jobTitle={job.title} />
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SummaryMeta({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9a7a63]">{icon}{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-[#5a4535]" title={value}>{value}</p>
    </div>
  );
}

function compactValues(values: string[]) {
  if (values.length <= 2) return values.join(", ");
  return `${values.slice(0, 2).join(", ")} +${values.length - 2}`;
}

function MetaGroup({ label, values, icon }: { label: string; values: string[]; icon: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a63]">{icon}{label}</p>
      <ul className="mt-2 flex flex-wrap gap-2" aria-label={label}>{values.map((value) => <li key={value} className="rounded-full border border-[#e8d8c8] bg-[#fdfaf6] px-3 py-1.5 text-xs font-medium text-[#5a4535]">{value}</li>)}</ul>
    </div>
  );
}

function formatDate(value: string | null) {
  if (!value) return "recently";
  return new Intl.DateTimeFormat("en-SE", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function SearchIcon() {
  return <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a7a63]" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}

function PinIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>;
}

function LanguageIcon() {
  return <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1.8 8h12.4M8 1.5c2 1.8 3 4 3 6.5s-1 4.7-3 6.5M8 1.5C6 3.3 5 5.5 5 8s1 4.7 3 6.5" stroke="currentColor" strokeWidth="1.2"/></svg>;
}

function CalendarIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="3.5" width="12" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 1.5v4M11 1.5v4M2 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
}

function ChevronIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m3.5 6 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
