"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { getAppCheckToken } from "@/lib/firebase/client";
import type { ApplicationFieldErrors } from "@/types/application";

const COUNTRY_CODES = [
  ["Sweden", "+46"], ["Norway", "+47"], ["Denmark", "+45"], ["Finland", "+358"],
  ["Germany", "+49"], ["United Kingdom", "+44"], ["United States / Canada", "+1"],
  ["India", "+91"], ["Iran", "+98"],
] as const;

export function JobApplicationModal({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [errors, setErrors] = useState<ApplicationFieldErrors>({});
  const [formError, setFormError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setErrors({}); setFormError("");
    const form = event.currentTarget;
    const body = new FormData(form);
    body.set("jobId", jobId);
    body.set("privacyConsent", String(body.has("privacyConsent")));
    body.set("dataProcessingConsent", String(body.has("dataProcessingConsent")));
    try {
      const token = await getAppCheckToken();
      const response = await fetch("/api/applications", { method: "POST", headers: token ? { "X-Firebase-AppCheck": token } : {}, body });
      const result = await response.json() as { message?: string; fieldErrors?: ApplicationFieldErrors };
      if (!response.ok) { setErrors(result.fieldErrors ?? {}); setFormError(result.message ?? "We could not submit your application."); return; }
      form.reset(); setComplete(true);
    } catch { setFormError("We could not submit your application. Please try again."); }
    finally { setSubmitting(false); }
  }

  function close() { setOpen(false); setComplete(false); setErrors({}); setFormError(""); }

  return <>
    <button type="button" onClick={() => setOpen(true)} className="inline-flex flex-none items-center justify-center rounded-lg bg-[#3D3027] px-6 py-2.5 text-sm font-semibold text-[#F7F2EA] hover:bg-[#5a4535]">Apply now</button>
    <dialog ref={dialogRef} onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => setOpen(false)} className="m-auto max-h-[92vh] w-[min(94vw,720px)] overflow-y-auto rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-0 text-[#3D3027] shadow-2xl backdrop:bg-[#2a1f16]/55">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-[#e8d8c8] bg-[#fdfaf6] px-6 py-5 sm:px-8">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a63]">Apply for</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">{jobTitle}</h2><p className="mt-1 font-mono text-xs text-[#9a7a63]">{jobId}</p></div>
        <button type="button" onClick={close} aria-label="Close application form" className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#e8d8c8] text-xl text-[#7a5e4a] hover:bg-[#F7F2EA]">×</button>
      </div>
      {complete ? <div className="px-8 py-20 text-center" role="status"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dce8dc] text-2xl text-[#476047]">✓</div><h3 className="mt-6 text-2xl font-semibold">Application received.</h3><p className="mx-auto mt-3 max-w-md leading-relaxed text-[#7a5e4a]">Thank you for applying. We will review your experience and contact you if there is a match.</p><button type="button" onClick={close} className="mt-7 rounded-lg bg-[#3D3027] px-6 py-3 text-sm font-semibold text-[#F7F2EA]">Close</button></div> :
      <form onSubmit={submit} noValidate className="px-6 py-7 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2"><Input id={`${jobId}-firstName`} name="firstName" label="First name" autoComplete="given-name" error={errors.firstName}/><Input id={`${jobId}-lastName`} name="lastName" label="Last name" autoComplete="family-name" error={errors.lastName}/><Input id={`${jobId}-email`} name="email" label="Email" type="email" autoComplete="email" error={errors.email}/><div><label htmlFor={`${jobId}-phone`} className="mb-2 block text-sm font-semibold">Phone number</label><div className="grid grid-cols-[145px_1fr] gap-2"><select name="phoneCountry" aria-label="Country calling code" defaultValue="+46" className={fieldClass(Boolean(errors.phoneCountry))}>{COUNTRY_CODES.map(([country, code]) => <option key={country} value={code}>{country} {code}</option>)}</select><input id={`${jobId}-phone`} name="phoneNumber" type="tel" autoComplete="tel-national" placeholder="70 123 45 67" className={fieldClass(Boolean(errors.phoneNumber))}/></div><ErrorText error={errors.phoneCountry ?? errors.phoneNumber}/></div></div>
        <div className="mt-5"><Input id={`${jobId}-linkedinUrl`} name="linkedinUrl" label="LinkedIn URL" type="url" autoComplete="url" placeholder="https://www.linkedin.com/in/your-name" error={errors.linkedinUrl}/></div>
        <div className="mt-5"><label htmlFor={`${jobId}-resume`} className="mb-2 block text-sm font-semibold">Resume</label><input id={`${jobId}-resume`} name="resume" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="w-full rounded-lg border border-[#e8d8c8] bg-[#F7F2EA] px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#e8d8c8] file:px-4 file:py-2 file:font-semibold file:text-[#5a4535]"/><p className="mt-2 text-xs text-[#9a7a63]">PDF, DOC, or DOCX · maximum 5 MB</p><ErrorText error={errors.resume}/></div>
        <div className="mt-6 space-y-4 border-t border-[#e8d8c8] pt-6"><Consent name="privacyConsent" error={errors.privacyConsent}>I have read and agree to the <Link href="/privacy" target="_blank" className="font-semibold underline underline-offset-2">privacy policy</Link>.</Consent><Consent name="dataProcessingConsent" error={errors.dataProcessingConsent}>I agree that Debageri AB may store and process my personal data for this job application.</Consent></div>
        {formError && <p role="alert" className="mt-5 rounded-lg border border-[#d8b9a3] bg-[#f7ebe2] px-4 py-3 text-sm text-[#6f3e2d]">{formError}</p>}
        <div className="mt-7 flex justify-end"><button type="submit" disabled={submitting} className="rounded-lg bg-[#3D3027] px-7 py-3 text-sm font-semibold text-[#F7F2EA] hover:bg-[#5a4535] disabled:opacity-60">{submitting ? "Submitting…" : "Submit application"}</button></div>
      </form>}
    </dialog>
  </>;
}

function Input({ id, name, label, type = "text", error, ...props }: { id: string; name: string; label: string; type?: string; error?: string; autoComplete?: string; placeholder?: string }) { return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label><input id={id} name={name} type={type} required maxLength={254} aria-invalid={Boolean(error)} className={fieldClass(Boolean(error))} {...props}/><ErrorText error={error}/></div>; }
function Consent({ name, error, children }: { name: string; error?: string; children: React.ReactNode }) { return <div><label className="flex items-start gap-3 text-sm leading-relaxed text-[#5a4535]"><input name={name} type="checkbox" required className="mt-1 h-4 w-4 accent-[#3D3027]"/><span>{children}</span></label><ErrorText error={error}/></div>; }
function ErrorText({ error }: { error?: string }) { return error ? <p className="mt-2 text-sm text-[#8a4934]">{error}</p> : null; }
function fieldClass(error: boolean) { return `w-full rounded-lg border bg-[#F7F2EA] px-4 py-3 text-base outline-none focus:border-[#9a7a63] ${error ? "border-[#b66a50]" : "border-[#e8d8c8]"}`; }
