"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import { getAppCheckToken } from "@/lib/firebase/client";
import type { ApplicationFieldErrors } from "@/types/application";

const COUNTRIES = [
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "+47", flag: "🇳🇴" },
  { name: "Denmark", code: "+45", flag: "🇩🇰" },
  { name: "Finland", code: "+358", flag: "🇫🇮" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United States / Canada", code: "+1", flag: "🇺🇸" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Iran", code: "+98", flag: "🇮🇷" },
] as const;

const ACCEPTED_RESUMES = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function JobApplicationModal({ jobId, jobTitle, swedenOnly, remotePosition, instanceId = "primary" }: { jobId: string; jobTitle: string; swedenOnly: boolean; remotePosition: boolean; instanceId?: string }) {
  const fieldId = `${jobId}-${instanceId}`;
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
    event.preventDefault();
    setSubmitting(true); setErrors({}); setFormError("");
    const form = event.currentTarget;
    const body = new FormData(form);
    body.set("jobId", jobId);
    body.set("privacyConsent", String(body.has("privacyConsent")));
    body.set("dataProcessingConsent", String(body.has("dataProcessingConsent")));
    body.set("swedenLocationConfirmed", String(body.has("swedenLocationConfirmed")));
    body.set("onsiteRequirementAcknowledged", String(body.has("onsiteRequirementAcknowledged")));
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
    <button type="button" onClick={() => setOpen(true)} className="group inline-flex flex-none items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-7 py-3.5 text-sm font-semibold text-[#2A1B0E] shadow-lg shadow-[#E8833A]/25 transition-all hover:-translate-y-0.5 hover:from-[#F6A263] hover:to-[#E27C33]">Apply now <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span></button>
    <dialog ref={dialogRef} onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => setOpen(false)} className="m-auto max-h-[94vh] w-[min(95vw,760px)] overflow-y-auto rounded-[1.75rem] border border-[#c4a98e] bg-[#fdfaf6] p-0 text-[#3D3027] shadow-[0_30px_90px_rgba(42,31,22,0.32)] backdrop:bg-[#2a1f16]/60 backdrop:backdrop-blur-sm">
      <div className="relative overflow-hidden bg-[#0B0B12] px-6 py-7 text-[#F7F2EA] sm:px-9 sm:py-9">
        <div className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full border border-[#E8833A]/25"/><div className="pointer-events-none absolute -right-2 top-8 h-24 w-24 rounded-full border border-[#E8833A]/15"/><div className="pointer-events-none absolute -left-16 -bottom-24 h-56 w-56 rounded-full bg-[#E8833A]/[0.07] blur-3xl"/>
        <div className="relative flex items-start justify-between gap-5"><div><p className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-[#D08A4F]">Your next chapter</p><h2 className="mt-2 max-w-xl font-display text-2xl font-bold tracking-tight sm:text-3xl">Apply for {jobTitle}</h2><div className="mt-4 flex items-center gap-2 text-xs text-[#9A9089]"><span className="rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 px-2.5 py-1 font-mono text-[#D08A4F]">{jobId}</span><span>Usually takes 3 minutes</span></div></div><button type="button" onClick={close} aria-label="Close application form" className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#E8833A]/30 text-xl text-[#F7F2EA] transition-colors hover:border-[#E8833A]/60 hover:bg-[#E8833A]/10">×</button></div>
      </div>
      {complete ? <SuccessState close={close}/> :
      <form onSubmit={submit} noValidate className="px-6 py-7 sm:px-9 sm:py-9">
        <FormSection number="01" title="A little about you" description="The essentials, so we know who we are speaking with.">
          <div className="grid gap-5 sm:grid-cols-2"><Input id={`${fieldId}-firstName`} name="firstName" label="First name" autoComplete="given-name" error={errors.firstName}/><Input id={`${fieldId}-lastName`} name="lastName" label="Last name" autoComplete="family-name" error={errors.lastName}/><Input id={`${fieldId}-email`} name="email" label="Email" type="email" autoComplete="email" error={errors.email}/><PhoneField jobId={fieldId} countryError={errors.phoneCountry} phoneError={errors.phoneNumber}/></div>
          <div className="mt-5"><Input id={`${fieldId}-linkedinUrl`} name="linkedinUrl" label="LinkedIn profile" type="url" autoComplete="url" placeholder="linkedin.com/in/your-name" error={errors.linkedinUrl}/></div>
        </FormSection>
        <div className="my-8 h-px bg-[#e8d8c8]"/>
        <FormSection number="02" title="Share your experience" description="Drop your resume here and we will take it from there."><ResumeDropzone jobId={fieldId} error={errors.resume}/></FormSection>
        <div className="my-8 h-px bg-[#e8d8c8]"/>
        {(swedenOnly || !remotePosition) && <>
          <FormSection number="03" title="Role requirements" description="Please confirm the practical requirements for this position.">
            <div className="space-y-3">
              {swedenOnly && <Consent name="swedenLocationConfirmed" error={errors.swedenLocationConfirmed}>I confirm that I am currently based in Sweden and have the right to live and work here.</Consent>}
              {!remotePosition && <Consent name="onsiteRequirementAcknowledged" error={errors.onsiteRequirementAcknowledged}>I understand that this role requires regular presence at the client&apos;s office and is not a remote position.</Consent>}
            </div>
          </FormSection>
          <div className="my-8 h-px bg-[#e8d8c8]"/>
        </>}
        <FormSection number={swedenOnly || !remotePosition ? "04" : "03"} title="Your privacy" description="Clear consent, with no small-print surprises.">
          <div className="space-y-3"><Consent name="privacyConsent" error={errors.privacyConsent}>I have read and agree to the <Link href="/privacy" target="_blank" className="font-semibold underline decoration-[#c4a98e] underline-offset-2">privacy policy</Link>.</Consent><Consent name="dataProcessingConsent" error={errors.dataProcessingConsent}>I agree that Debageri AB may store and process my personal data for this job application.</Consent></div>
        </FormSection>
        {formError && <p role="alert" className="mt-6 rounded-xl border border-[#d8b9a3] bg-[#f7ebe2] px-4 py-3 text-sm text-[#6f3e2d]">{formError}</p>}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-[#9a7a63]">Your information is sent securely.</p><button type="submit" disabled={submitting} className="inline-flex min-w-48 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-7 py-3.5 text-sm font-semibold text-[#2A1B0E] shadow-lg shadow-[#E8833A]/25 transition-all hover:from-[#F6A263] hover:to-[#E27C33] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Submitting…" : <>Send application <span aria-hidden="true">→</span></>}</button></div>
      </form>}
    </dialog>
  </>;
}

function PhoneField({ jobId, countryError, phoneError }: { jobId: string; countryError?: string; phoneError?: string }) {
  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>(COUNTRIES[0]);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  return <div><label htmlFor={`${jobId}-phone`} className="mb-2 block text-sm font-semibold">Phone number</label><div className="flex gap-2"><details ref={detailsRef} className="relative"><summary aria-label={`Country code: ${country.name} ${country.code}`} className={`${fieldClass(Boolean(countryError))} flex h-full min-w-28 cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden`}><span aria-hidden="true" className="text-lg leading-none">{country.flag}</span><span className="font-medium">{country.code}</span><span className="text-xs text-[#9a7a63]" aria-hidden="true">▾</span></summary><div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 max-h-64 w-72 overflow-y-auto rounded-xl border border-[#d9c5b2] bg-[#fdfaf6] p-1.5 shadow-[0_18px_50px_rgba(61,48,39,0.18)]">{COUNTRIES.map((item) => <button key={item.name} type="button" onClick={() => { setCountry(item); detailsRef.current?.removeAttribute("open"); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#F7F2EA]"><span className="text-xl" aria-hidden="true">{item.flag}</span><span className="flex-1 font-medium">{item.name}</span><span className="text-[#9a7a63]">{item.code}</span></button>)}</div></details><input type="hidden" name="phoneCountry" value={country.code}/><input id={`${jobId}-phone`} name="phoneNumber" type="tel" required autoComplete="tel-national" placeholder="70 123 45 67" className={`${fieldClass(Boolean(phoneError))} min-w-0 flex-1`}/></div><ErrorText error={countryError ?? phoneError}/></div>;
}

function ResumeDropzone({ jobId, error }: { jobId: string; error?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  function receiveFile(nextFile: File | undefined) { if (!nextFile) return; setFile(nextFile); if (inputRef.current) { const transfer = new DataTransfer(); transfer.items.add(nextFile); inputRef.current.files = transfer.files; } }
  function drop(event: DragEvent<HTMLLabelElement>) { event.preventDefault(); setDragging(false); receiveFile(event.dataTransfer.files[0]); }
  return <div><label htmlFor={`${jobId}-resume`} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={drop} className={`group flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed px-6 py-9 text-center transition-all ${dragging ? "border-[#7a5e4a] bg-[#e8d8c8]/55" : error ? "border-[#b66a50] bg-[#f7ebe2]/40" : "border-[#c4a98e] bg-[#F7F2EA] hover:border-[#9a7a63] hover:bg-[#f3eadf]"}`}><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8d8c8] text-[#5a4535] transition-transform group-hover:-translate-y-1"><UploadIcon/></span>{file ? <><span className="mt-4 max-w-full truncate font-semibold text-[#3D3027]">{file.name}</span><span className="mt-1 text-xs text-[#9a7a63]">{formatBytes(file.size)} · Click or drop another file to replace</span></> : <><span className="mt-4 font-semibold text-[#3D3027]">Drop your resume here</span><span className="mt-1 text-sm text-[#7a5e4a]">or <span className="font-semibold underline decoration-[#c4a98e] underline-offset-2">choose a file</span> from your device</span><span className="mt-3 text-xs text-[#9a7a63]">PDF, DOC, or DOCX · maximum 5 MB</span></>}<input ref={inputRef} id={`${jobId}-resume`} name="resume" type="file" required accept={ACCEPTED_RESUMES} onChange={(event) => receiveFile(event.target.files?.[0])} className="sr-only"/></label><ErrorText error={error}/></div>;
}

function FormSection({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) { return <section><div className="mb-5 flex items-start gap-3"><span className="mt-0.5 font-mono text-xs font-semibold text-[#B85F1E]">{number}</span><div><h3 className="font-display font-bold text-[#3D3027]">{title}</h3><p className="mt-0.5 text-sm text-[#9a7a63]">{description}</p></div></div>{children}</section>; }
function SuccessState({ close }: { close: () => void }) { return <div className="px-8 py-20 text-center" role="status"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dce8dc] text-2xl text-[#476047]">✓</div><p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">Application sent</p><h3 className="mt-3 font-display text-3xl font-bold tracking-tight">Now leave the rest to us.</h3><p className="mx-auto mt-3 max-w-md leading-relaxed text-[#7a5e4a]">Thank you for applying. We will review your experience and contact you if there is a match.</p><button type="button" onClick={close} className="mt-8 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-7 py-3.5 text-sm font-semibold text-[#2A1B0E] transition-colors hover:from-[#F6A263] hover:to-[#E27C33]">Back to opportunities</button></div>; }
function Input({ id, name, label, type = "text", error, ...props }: { id: string; name: string; label: string; type?: string; error?: string; autoComplete?: string; placeholder?: string }) { return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label><input id={id} name={name} type={type} required maxLength={254} aria-invalid={Boolean(error)} className={fieldClass(Boolean(error))} {...props}/><ErrorText error={error}/></div>; }
function Consent({ name, error, children }: { name: string; error?: string; children: React.ReactNode }) { return <div className={`rounded-xl border p-4 ${error ? "border-[#b66a50] bg-[#f7ebe2]/45" : "border-[#e8d8c8] bg-[#F7F2EA]"}`}><label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#5a4535]"><input name={name} type="checkbox" required className="mt-0.5 h-5 w-5 flex-none accent-[#3D3027]"/><span>{children}</span></label><ErrorText error={error}/></div>; }
function ErrorText({ error }: { error?: string }) { return error ? <p className="mt-2 text-sm text-[#8a4934]">{error}</p> : null; }
function fieldClass(error: boolean) { return `w-full rounded-xl border bg-[#F7F2EA] px-4 py-3 text-base outline-none transition-all placeholder:text-[#b89880] focus:bg-[#fdfaf6] focus:shadow-[0_0_0_3px_rgba(196,169,142,0.2)] ${error ? "border-[#b66a50]" : "border-[#e8d8c8] focus:border-[#9a7a63]"}`; }
function formatBytes(bytes: number) { return bytes < 1024 * 1024 ? `${Math.ceil(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`; }
function UploadIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 15.5v2.75A1.75 1.75 0 0 0 6.75 20h10.5A1.75 1.75 0 0 0 19 18.25V15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
