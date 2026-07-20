"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const auth = getClientAuth();

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!response.ok) throw new Error("Authentication failed");

      await signOut(auth);
      router.replace("/admin/messages");
      router.refresh();
    } catch {
      await signOut(auth).catch(() => undefined);
      setError("The email or password is incorrect, or this account is not an administrator.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-[#3D3027]">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-[#e8d8c8] bg-[#F7F2EA] px-4 py-3 text-[#3D3027] focus:border-[#9a7a63] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-[#3D3027]">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-[#e8d8c8] bg-[#F7F2EA] px-4 py-3 text-[#3D3027] focus:border-[#9a7a63] focus:outline-none"
        />
      </div>
      {error && (
        <p role="alert" className="rounded-lg border border-[#d8b9a3] bg-[#f7ebe2] px-4 py-3 text-sm text-[#6f3e2d]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[#3D3027] px-5 py-3 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#5a4535] disabled:opacity-60"
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
