"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMessage } from "@/app/admin/(protected)/messages/actions";
import { TrashIcon } from "@/components/icons";

export function DeleteMessageButton({ messageId, senderName }: { messageId: string; senderName: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function confirmDelete() {
    setError("");
    startTransition(async () => {
      const result = await deleteMessage(messageId);
      if (!result.ok) {
        setError("The message could not be deleted. Please try again.");
        return;
      }
      router.push("/admin/messages");
      router.refresh();
    });
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} aria-label={`Delete message from ${senderName}`} className="inline-flex size-10 items-center justify-center rounded-lg border border-[#b98775] text-[#7a4030] transition-colors hover:bg-[#f2e1da]">
        <TrashIcon size={18} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a1f16]/50 px-6 py-10 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !pending) setIsOpen(false); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="delete-message-title" aria-describedby="delete-message-description" className="w-full max-w-md rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-7 shadow-2xl sm:p-9">
            <h2 id="delete-message-title" className="text-2xl font-semibold tracking-tight text-[#3D3027]">Delete this message?</h2>
            <p id="delete-message-description" className="mt-3 text-sm leading-relaxed text-[#7a5e4a]">This permanently deletes the message from <strong className="font-semibold text-[#3D3027]">{senderName}</strong>. This action cannot be undone.</p>
            {error && <p role="alert" className="mt-4 text-sm text-[#8a4934]">{error}</p>}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setIsOpen(false)} disabled={pending} className="rounded-lg border border-[#c4a98e] px-5 py-2.5 text-sm font-semibold text-[#3D3027] hover:bg-[#e8d8c8] disabled:opacity-60">No, keep it</button>
              <button type="button" onClick={confirmDelete} disabled={pending} className="rounded-lg bg-[#8a4934] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#703827] disabled:opacity-40">{pending ? "Deleting…" : "Yes, delete"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
