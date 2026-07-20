"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteJobButton({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function deleteJob() {
    if (!window.confirm(`Delete “${jobTitle}”? This cannot be undone.`)) return;
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
    <div>
      <button type="button" onClick={deleteJob} disabled={isDeleting} className="rounded-lg border border-[#b98775] px-4 py-2 text-sm font-semibold text-[#7a4030] hover:bg-[#f2e1da] disabled:opacity-60">
        {isDeleting ? "Deleting…" : "Delete job"}
      </button>
      {error && <p role="alert" className="mt-2 text-xs text-[#8a4934]">{error}</p>}
    </div>
  );
}
