"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const CONFIRMATION_PHRASE = "I am sure";

export function DeleteJobButton({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const canDelete = confirmation === CONFIRMATION_PHRASE;

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isDeleting) {
        setIsOpen(false);
        setConfirmation("");
        setError("");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDeleting]);

  function closeDialog() {
    if (isDeleting) return;
    setIsOpen(false);
    setConfirmation("");
    setError("");
  }

  async function deleteJob() {
    if (!canDelete) return;
    setIsDeleting(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/jobs/${encodeURIComponent(jobId)}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      router.push("/admin/jobs?deleted=1");
      router.refresh();
    } catch {
      setError("The job could not be deleted. Please try again.");
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-[#b98775] px-4 py-2 text-sm font-semibold text-[#7a4030] transition-colors hover:bg-[#f2e1da]"
      >
        Delete job
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a1f16]/50 px-6 py-10 backdrop-blur-sm" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}>
          <div role="dialog" aria-modal="true" aria-labelledby="delete-job-title" aria-describedby="delete-job-description" className="w-full max-w-md rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-7 shadow-2xl sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2e1da] text-[#8a4934]" aria-hidden="true">
              <WarningIcon />
            </span>
            <h2 id="delete-job-title" className="mt-5 text-2xl font-semibold tracking-tight text-[#3D3027]">
              Delete this job?
            </h2>
            <p id="delete-job-description" className="mt-3 text-sm leading-relaxed text-[#7a5e4a]">
              You are about to permanently delete <strong className="font-semibold text-[#3D3027]">{jobTitle}</strong>.
              This cannot be undone and the opportunity will immediately disappear from Careers.
            </p>

            <label htmlFor="delete-confirmation" className="mt-6 block text-sm font-semibold text-[#3D3027]">
              Type <span className="rounded bg-[#e8d8c8] px-1.5 py-0.5 font-mono text-xs">{CONFIRMATION_PHRASE}</span> to confirm
            </label>
            <input
              ref={inputRef}
              id="delete-confirmation"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              disabled={isDeleting}
              autoComplete="off"
              className="mt-2 w-full rounded-lg border border-[#e8d8c8] bg-[#F7F2EA] px-4 py-3 text-[#3D3027] focus:border-[#9a7a63] focus:outline-none disabled:opacity-60"
              placeholder={CONFIRMATION_PHRASE}
            />

            {error && <p role="alert" className="mt-3 text-sm text-[#8a4934]">{error}</p>}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeDialog} disabled={isDeleting} className="rounded-lg border border-[#c4a98e] px-5 py-2.5 text-sm font-semibold text-[#3D3027] hover:bg-[#e8d8c8] disabled:opacity-60">
                Cancel
              </button>
              <button type="button" onClick={deleteJob} disabled={!canDelete || isDeleting} className="rounded-lg bg-[#8a4934] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#703827] disabled:cursor-not-allowed disabled:opacity-40">
                {isDeleting ? "Deleting…" : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WarningIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
