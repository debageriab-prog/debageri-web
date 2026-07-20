import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogoLink } from "@/components/Logo";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { verifyAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = { title: "Admin sign in" };

export default async function AdminLoginPage() {
  if (await verifyAdminSession()) redirect("/admin/messages");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F2EA] px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <LogoLink height={30} />
        </div>
        <div className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-7 shadow-[0_20px_60px_rgba(61,48,39,0.08)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Admin</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#3D3027]">Welcome back.</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#7a5e4a]">Sign in to review messages sent to Debageri.</p>
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
