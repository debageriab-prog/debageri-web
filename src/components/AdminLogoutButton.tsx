"use client";

import { useState } from "react";

export function AdminLogoutButton() {
  const [isPending, setIsPending] = useState(false);

  async function logout() {
    setIsPending(true);
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } finally {
      window.location.assign("/admin/login");
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={isPending}
      className="text-sm font-medium text-[#7a5e4a] transition-colors hover:text-[#3D3027] disabled:opacity-60"
    >
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
