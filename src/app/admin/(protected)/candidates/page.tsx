import type { Metadata } from "next";
import Link from "next/link";
import { DeleteCandidateButton } from "@/components/DeleteCandidateButton";
import { getApplications } from "@/lib/applications";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/types/application";
import { updateApplicationStatus } from "./actions";

export const metadata: Metadata = { title: "Candidates" };

export default async function CandidatesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const requested = (await searchParams).status;
  const status = APPLICATION_STATUSES.includes(requested as ApplicationStatus) ? requested as ApplicationStatus : undefined;
  const applications = await getApplications(status);
  return <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
    <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Admin</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">Candidates</h1><p className="mt-2 text-sm text-[#7a5e4a]">Review applicants, their position, resume, and hiring status.</p></div>
    <nav aria-label="Filter candidates" className="mt-8 flex gap-2 overflow-x-auto pb-2">{["all", ...APPLICATION_STATUSES].map((item) => <Link key={item} href={item === "all" ? "/admin/candidates" : `/admin/candidates?status=${item}`} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium capitalize ${item === (status ?? "all") ? "border-[#3D3027] bg-[#3D3027] text-[#F7F2EA]" : "border-[#e8d8c8] bg-[#fdfaf6] text-[#7a5e4a]"}`}>{item}</Link>)}</nav>
    <div className="mt-6 space-y-4">{applications.length === 0 ? <div className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] px-6 py-20 text-center"><p className="font-semibold">No candidates here.</p><p className="mt-2 text-sm text-[#9a7a63]">New applications will appear here.</p></div> : applications.map((application) => <article key={application.id} className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-semibold">{application.firstName} {application.lastName}</h2><span className="rounded-full bg-[#e8d8c8] px-2.5 py-1 text-xs font-semibold capitalize text-[#5a4535]">{application.status}</span></div><p className="mt-2 font-semibold text-[#5a4535]">{application.jobTitle} <span className="font-mono text-xs font-normal text-[#9a7a63]">({application.jobId})</span></p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#7a5e4a]"><a href={`mailto:${application.email}`} className="underline underline-offset-2">{application.email}</a><a href={`tel:${application.phoneCountry}${application.phoneNumber.replace(/\D/g, "")}`} className="underline underline-offset-2">{application.phoneCountry} {application.phoneNumber}</a><a href={application.linkedinUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">LinkedIn ↗</a></div><p className="mt-4 text-xs text-[#9a7a63]">Applied {formatDate(application.createdAt)} · Consent recorded {formatDate(application.consentedAt)}</p></div>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><a href={`/api/admin/applications/${application.id}/resume`} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#c4a98e] px-4 py-2.5 text-center text-sm font-semibold text-[#5a4535]">Open {application.resumeFileName} ↗</a><form action={updateApplicationStatus} className="flex gap-2"><input type="hidden" name="id" value={application.id}/><label className="sr-only" htmlFor={`status-${application.id}`}>Candidate status</label><select id={`status-${application.id}`} name="status" defaultValue={application.status} className="rounded-lg border border-[#e8d8c8] bg-[#F7F2EA] px-3 py-2 text-sm">{APPLICATION_STATUSES.map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}</select><button className="rounded-lg bg-[#3D3027] px-4 py-2 text-sm font-semibold text-[#F7F2EA]">Save</button></form><DeleteCandidateButton candidateId={application.id} candidateName={`${application.firstName} ${application.lastName}`}/></div></div>
    </article>)}</div>
  </main>;
}

function formatDate(date: Date) { return new Intl.DateTimeFormat("en-SE", { dateStyle: "medium", timeStyle: "short" }).format(date); }
