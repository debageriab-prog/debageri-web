import type { Metadata } from "next";
import Link from "next/link";
import { AdminJobForm } from "@/components/AdminJobForm";

export const metadata: Metadata = { title: "New job opportunity" };

export default function NewJobPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 md:py-14">
      <Link href="/admin/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-[#7a5e4a] hover:text-[#3D3027]"><span aria-hidden="true">←</span> Back to jobs</Link>
      <div className="mt-6 rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6 shadow-[0_20px_60px_rgba(61,48,39,0.05)] sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">New opportunity</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">Find the next great colleague.</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#7a5e4a]">Create a clear, inviting job ad. It will be published as soon as you submit it.</p>
        <div className="my-8 h-px bg-[#e8d8c8]" />
        <AdminJobForm />
      </div>
    </main>
  );
}
