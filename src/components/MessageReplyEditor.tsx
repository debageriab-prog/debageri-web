"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  replyToMessage,
  type MessageReplyState,
} from "@/app/admin/(protected)/messages/actions";
import { CloseIcon } from "@/components/icons";
import { EmailRichTextEditor } from "@/components/EmailRichTextEditor";
import type { ContactMessage } from "@/types/contact-message";

const INITIAL_STATE: MessageReplyState = { message: "", ok: false };

export function MessageReplyEditor({
  message,
  subject,
  body,
  emailConfigured,
}: {
  message: ContactMessage;
  subject: string;
  body: string;
  emailConfigured: boolean;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState(subject);
  const [emailBody, setEmailBody] = useState(body);
  const [state, action, pending] = useActionState(replyToMessage, INITIAL_STATE);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  function close() {
    setOpen(false);
    if (state.ok) router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={!emailConfigured}
        title={emailConfigured ? undefined : "Configure SMTP in Settings first"}
        className="inline-flex items-center justify-center rounded-lg bg-[#3D3027] px-5 py-2.5 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#5a4535] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reply by email
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a63]">Reply to</p>
            <h2 className="mt-1 text-2xl font-semibold">{message.fullName}</h2>
            <p className="mt-1 text-sm text-[#7a5e4a]">{message.email}</p>
          </div>
          <button type="button" onClick={close} aria-label="Close email editor" className="flex size-9 items-center justify-center rounded-full border border-[#c4a98e]">
            <CloseIcon size={15} />
          </button>
        </header>
        {state.ok ? (
          <div className="px-6 py-10 text-center">
            <p role="status" className="text-lg font-semibold">{state.message}</p>
            <button type="button" onClick={close} className="mt-7 rounded-full bg-[#3D3027] px-6 py-3 text-sm font-semibold text-[#F7F2EA]">Back to message</button>
          </div>
        ) : (
          <form action={action} className="space-y-5 px-6 py-6">
            <input type="hidden" name="id" value={message.id} />
            <label className="block text-sm font-semibold">
              Subject
              <input name="emailSubject" required maxLength={200} value={emailSubject} onChange={(event) => setEmailSubject(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e8d8c8] bg-white px-4 py-3 text-sm font-normal" />
            </label>
            <label className="block text-sm font-semibold" htmlFor={`message-reply-${message.id}`}>Message</label>
            <input type="hidden" name="emailBody" value={emailBody} />
            <EmailRichTextEditor editorId={`message-reply-${message.id}`} value={emailBody} onChange={setEmailBody} />
            {state.message && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.message}</p>}
            <div className="flex justify-end gap-3 border-t border-[#e8d8c8] pt-5">
              <button type="button" onClick={close} className="rounded-full border border-[#c4a98e] px-5 py-2.5 text-sm font-semibold">Cancel</button>
              <button disabled={pending} className="rounded-full bg-[#3D3027] px-6 py-2.5 text-sm font-semibold text-[#F7F2EA] disabled:opacity-60">{pending ? "Sending…" : "Send email"}</button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
