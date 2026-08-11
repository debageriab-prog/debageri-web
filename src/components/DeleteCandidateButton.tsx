"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteCandidateButton({ candidateId, candidateName }: { candidateId: string; candidateName: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function deleteCandidate() {
    setIsDeleting(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/applications/${encodeURIComponent(candidateId)}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      setIsOpen(false);
      router.refresh();
    } catch {
      setError("The candidate could not be deleted. Please try again.");
      setIsDeleting(false);
    }
  }

  return <>
    <button type="button" onClick={() => setIsOpen(true)} className="rounded-lg border border-[#b98775] px-4 py-2.5 text-sm font-semibold text-[#7a4030] transition-colors hover:bg-[#f2e1da]">Delete candidate</button>
    {isOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a1f16]/50 px-6 py-10 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !isDeleting) setIsOpen(false); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="delete-candidate-title" aria-describedby="delete-candidate-description" className="w-full max-w-md rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-7 shadow-2xl sm:p-9">
        <h2 id="delete-candidate-title" className="text-2xl font-semibold tracking-tight text-[#3D3027]">Delete this candidate?</h2>
        <p id="delete-candidate-description" className="mt-3 text-sm leading-relaxed text-[#7a5e4a]">This permanently deletes <strong className="font-semibold text-[#3D3027]">{candidateName}</strong>&apos;s application and resume. They will be able to apply for this role again.</p>
        {error && <p role="alert" className="mt-4 text-sm text-[#8a4934]">{error}</p>}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => setIsOpen(false)} disabled={isDeleting} className="rounded-lg border border-[#c4a98e] px-5 py-2.5 text-sm font-semibold text-[#3D3027] hover:bg-[#e8d8c8] disabled:opacity-60">Cancel</button>
          <button type="button" onClick={deleteCandidate} disabled={isDeleting} className="rounded-lg bg-[#8a4934] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#703827] disabled:opacity-40">{isDeleting ? "Deleting…" : "Delete permanently"}</button>
        </div>
      </div>
    </div>}
  </>;
}
