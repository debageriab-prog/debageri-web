"use client";

import { useActionState, useMemo, useState } from "react";
import { updateApplicationStatus, type CandidateUpdateState } from "@/app/admin/(protected)/candidates/actions";
import { renderEmailTemplate } from "@/lib/email-templates";
import { APPLICATION_STATUSES, type Application, type ApplicationStatus } from "@/types/application";
import type { EmailTemplate } from "@/types/email";

const INITIAL_STATE: CandidateUpdateState = { message: "", ok: false };

export function CandidateStatusEditor({ application, templates, emailConfigured }: { application: Application; templates: EmailTemplate[]; emailConfigured: boolean }) {
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [sendEmail, setSendEmail] = useState(false);
  const [state, action, pending] = useActionState(updateApplicationStatus, INITIAL_STATE);
  const template = templates.find((item) => item.status === status) ?? templates[0];
  const mergeData = useMemo(() => ({
    candidateFirstName: application.firstName, candidateLastName: application.lastName,
    candidateFullName: `${application.firstName} ${application.lastName}`.trim(), candidateEmail: application.email,
    jobTitle: application.jobTitle, companyName: "Debageri AB", status,
  }), [application, status]);
  const subject = template ? renderEmailTemplate(template.subject, mergeData) : "";
  const body = template ? renderEmailTemplate(template.body, mergeData) : "";

  return <form action={action} className="rounded-xl border border-[#e8d8c8] bg-[#F7F2EA]/70 p-4 lg:w-[28rem]">
    <input type="hidden" name="id" value={application.id} />
    <div className="flex gap-2"><label className="sr-only" htmlFor={`status-${application.id}`}>Candidate status</label><select id={`status-${application.id}`} name="status" value={status} onChange={(event) => setStatus(event.target.value as ApplicationStatus)} className="min-w-0 flex-1 rounded-lg border border-[#e8d8c8] bg-white px-3 py-2.5 text-sm font-medium">{APPLICATION_STATUSES.map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}</select><button disabled={pending} className="rounded-lg bg-[#3D3027] px-5 py-2 text-sm font-semibold text-[#F7F2EA] disabled:opacity-60">{pending ? "Saving…" : "Save"}</button></div>
    <label className="mt-4 flex items-start gap-3 text-sm"><input name="sendEmail" type="checkbox" checked={sendEmail} onChange={(event) => setSendEmail(event.target.checked)} disabled={!emailConfigured} className="mt-0.5 size-4 accent-[#3D3027]" /><span><span className="font-semibold">Send an email to {application.firstName}</span><span className="mt-0.5 block text-xs text-[#9a7a63]">{emailConfigured ? "Review and edit the prefilled message before saving." : "Configure SMTP in Settings to enable email."}</span></span></label>
    {sendEmail && emailConfigured && <div className="mt-4 border-t border-[#e8d8c8] pt-4"><div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7a63]">Email preview</p><span className="rounded-full bg-[#e8d8c8] px-2.5 py-1 text-xs font-medium">To: {application.email}</span></div>
      <label className="block text-xs font-semibold">Subject<input key={`subject-${status}`} name="emailSubject" required maxLength={200} defaultValue={subject} className="mt-1.5 w-full rounded-lg border border-[#e8d8c8] bg-white px-3 py-2.5 text-sm font-normal" /></label>
      <label className="mt-3 block text-xs font-semibold">Message<textarea key={`body-${status}`} name="emailBody" required maxLength={10000} rows={10} defaultValue={body} className="mt-1.5 w-full resize-y rounded-lg border border-[#e8d8c8] bg-white px-3 py-2.5 text-sm font-normal leading-relaxed" /></label>
    </div>}
    {state.message && <p role="status" className={`mt-3 text-xs font-medium ${state.ok ? "text-emerald-700" : "text-red-700"}`}>{state.message}</p>}
  </form>;
}

