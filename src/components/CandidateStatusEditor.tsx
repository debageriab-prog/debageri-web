"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateApplicationStatus,
  type CandidateUpdateState,
} from "@/app/admin/(protected)/candidates/actions";
import { EmailRichTextEditor } from "@/components/EmailRichTextEditor";
import { renderEmailTemplate } from "@/lib/email-templates";
import {
  APPLICATION_STATUSES,
  type Application,
  type ApplicationStatus,
} from "@/types/application";
import type { EmailTemplate } from "@/types/email";

const INITIAL_STATE: CandidateUpdateState = {
  message: "",
  ok: false,
  statusSaved: false,
};

export function CandidateStatusEditor({
  application,
  templates,
  emailConfigured,
}: {
  application: Application;
  templates: EmailTemplate[];
  emailConfigured: boolean;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [sendEmail, setSendEmail] = useState(false);
  const [state, action, pending] = useActionState(
    updateApplicationStatus,
    INITIAL_STATE,
  );
  function emailForStatus(nextStatus: ApplicationStatus) {
    const template =
      templates.find((item) => item.status === nextStatus) ?? templates[0];
    const mergeData = {
      candidateFirstName: application.firstName,
      candidateLastName: application.lastName,
      candidateFullName:
        `${application.firstName} ${application.lastName}`.trim(),
      candidateEmail: application.email,
      jobTitle: application.jobTitle,
      companyName: "Debageri AB",
      status: nextStatus,
    };
    return {
      subject: template ? renderEmailTemplate(template.subject, mergeData) : "",
      body: template ? renderEmailTemplate(template.body, mergeData) : "",
    };
  }
  const initialEmail = emailForStatus(application.status);
  const [subject, setSubject] = useState(initialEmail.subject);
  const [body, setBody] = useState(initialEmail.body);

  function changeStatus(nextStatus: ApplicationStatus) {
    const email = emailForStatus(nextStatus);
    setStatus(nextStatus);
    setSubject(email.subject);
    setBody(email.body);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  function close() {
    setOpen(false);
    if (state.statusSaved) router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[#3D3027] px-4 py-2.5 text-sm font-semibold text-[#F7F2EA] hover:bg-[#5a4535]"
      >
        Change status
      </button>
      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => setOpen(false)}
        className="m-auto max-h-[94vh] w-[min(95vw,720px)] overflow-y-auto rounded-2xl border border-[#c4a98e] bg-[#fdfaf6] p-0 text-[#3D3027] shadow-[0_30px_90px_rgba(42,31,22,0.32)] backdrop:bg-[#2a1f16]/60 backdrop:backdrop-blur-sm"
      >
        <header className="flex items-start justify-between gap-5 border-b border-[#e8d8c8] px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a63]">
              Candidate
            </p>
            <h2 className="mt-1 text-2xl font-semibold">
              Change status for {application.firstName} {application.lastName}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close status editor"
            className="flex size-9 items-center justify-center rounded-full border border-[#c4a98e] text-xl"
          >
            ×
          </button>
        </header>
        {state.statusSaved ? (
          <div className="px-6 py-10 text-center">
            <div
              className={`mx-auto flex size-12 items-center justify-center rounded-full ${state.ok ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
              aria-hidden="true"
            >
              ✓
            </div>
            <p role="status" className="mt-4 text-lg font-semibold">
              {state.message}
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-7 rounded-full bg-[#3D3027] px-6 py-3 text-sm font-semibold text-[#F7F2EA]"
            >
              Back to candidate
            </button>
          </div>
        ) : (
          <form action={action} className="space-y-5 px-6 py-6">
            <input type="hidden" name="id" value={application.id} />
            <label
              className="block text-sm font-semibold"
              htmlFor={`status-${application.id}`}
            >
              Status
              <select
                id={`status-${application.id}`}
                name="status"
                value={status}
                onChange={(event) =>
                  changeStatus(event.target.value as ApplicationStatus)
                }
                className="mt-2 w-full rounded-xl border border-[#e8d8c8] bg-white px-4 py-3 text-sm font-medium"
              >
                {APPLICATION_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {item[0].toUpperCase() + item.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-start gap-3 rounded-xl border border-[#e8d8c8] bg-[#F7F2EA]/60 p-4 text-sm">
              <input
                name="sendEmail"
                type="checkbox"
                checked={sendEmail}
                onChange={(event) => setSendEmail(event.target.checked)}
                disabled={!emailConfigured}
                className="mt-0.5 size-4 accent-[#3D3027]"
              />
              <span>
                <span className="font-semibold">
                  Save and send email to {application.firstName}
                </span>
                <span className="mt-1 block text-xs text-[#9a7a63]">
                  {emailConfigured
                    ? "Review and edit the message before saving."
                    : "Configure SMTP in Settings to enable email."}
                </span>
              </span>
            </label>
            {sendEmail && emailConfigured && (
              <div className="space-y-4 border-t border-[#e8d8c8] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7a63]">
                  Email to {application.email}
                </p>
                <label className="block text-sm font-semibold">
                  Subject
                  <input
                    name="emailSubject"
                    required
                    maxLength={200}
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#e8d8c8] bg-white px-4 py-3 text-sm font-normal"
                  />
                </label>
                <label
                  className="block text-sm font-semibold"
                  htmlFor={`email-body-${application.id}`}
                >
                  Message
                </label>
                <input type="hidden" name="emailBody" value={body} />
                <EmailRichTextEditor
                  editorId={`email-body-${application.id}`}
                  value={body}
                  onChange={setBody}
                />
              </div>
            )}
            {state.message && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {state.message}
              </p>
            )}
            <div className="flex justify-end gap-3 border-t border-[#e8d8c8] pt-5">
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-[#c4a98e] px-5 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={pending}
                className="rounded-full bg-[#3D3027] px-6 py-2.5 text-sm font-semibold text-[#F7F2EA] disabled:opacity-60"
              >
                {pending
                  ? "Saving…"
                  : sendEmail
                    ? "Save and send email"
                    : "Save status"}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
