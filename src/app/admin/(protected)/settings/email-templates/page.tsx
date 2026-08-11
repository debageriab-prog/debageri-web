import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL_VARIABLES } from "@/lib/email-templates";
import { getEmailTemplates } from "@/lib/email-settings";
import { updateEmailTemplate } from "../actions";

export const metadata: Metadata = { title: "Email templates" };

export default async function EmailTemplatesPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [templates, query] = await Promise.all([getEmailTemplates(), searchParams]);
  return <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
    <Link href="/admin/settings" className="text-sm font-semibold text-[#7a5e4a]">← Settings</Link>
    <div className="mt-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Candidate communication</p><h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Email templates</h1><p className="mt-2 max-w-2xl text-[#7a5e4a]">Create a thoughtful starting point for every status update. You can still edit each message before it is sent.</p></div>
    <aside className="mt-8 rounded-2xl border border-[#e8d8c8] bg-[#f0e8dc] p-5"><p className="text-sm font-semibold">Available personalisation</p><div className="mt-3 flex flex-wrap gap-2">{EMAIL_VARIABLES.map((variable) => <code key={variable} className="rounded-md bg-[#fdfaf6] px-2 py-1 text-xs text-[#5a4535]">{"{{"}{variable}{"}}"}</code>)}</div></aside>
    <div className="mt-6 space-y-5">{templates.map((template, index) => <form action={updateEmailTemplate} key={template.status} className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6 md:p-8">
      <input type="hidden" name="status" value={template.status} /><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-[#3D3027] text-xs font-semibold text-[#F7F2EA]">{index + 1}</span><h2 className="text-xl font-semibold">{template.label}</h2></div><p className="mt-2 pl-11 text-sm capitalize text-[#9a7a63]">When status changes to {template.status}</p></div>{query.saved === template.status && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">Saved</span>}</div>
      <label className="mt-6 block text-sm font-semibold">Subject<input name="subject" required maxLength={200} defaultValue={template.subject} className="mt-2 w-full rounded-xl border border-[#e8d8c8] bg-white px-4 py-3 text-sm" /></label>
      <label className="mt-5 block text-sm font-semibold">Message<textarea name="body" required maxLength={10000} rows={9} defaultValue={template.body} className="mt-2 w-full resize-y rounded-xl border border-[#e8d8c8] bg-white px-4 py-3 text-sm leading-relaxed" /></label>
      <div className="mt-5 flex justify-end"><button className="rounded-full border border-[#c4a98e] px-5 py-2.5 text-sm font-semibold hover:bg-[#e8d8c8]">Save template</button></div>
    </form>)}</div>
  </main>;
}
