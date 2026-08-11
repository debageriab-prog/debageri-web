import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Settings" };

const sections = [
  { href: "/admin/settings/email", title: "Email settings", description: "Configure the secure SMTP connection and sender identity used for candidate communication.", icon: "@" },
  { href: "/admin/settings/email-templates", title: "Email templates", description: "Shape the prefilled messages used for each step of the candidate journey.", icon: "✦" },
];

export default function SettingsPage() {
  return <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Admin</p>
    <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Settings</h1>
    <p className="mt-2 max-w-2xl text-[#7a5e4a]">Manage the tools behind your candidate communication.</p>
    <div className="mt-10 grid gap-5 md:grid-cols-2">{sections.map((section) => <Link key={section.href} href={section.href} className="group rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-7 transition hover:-translate-y-0.5 hover:border-[#c4a98e] hover:shadow-[0_18px_45px_rgba(61,48,39,0.08)]">
      <span className="flex size-11 items-center justify-center rounded-xl bg-[#3D3027] text-lg font-semibold text-[#F7F2EA]" aria-hidden="true">{section.icon}</span>
      <h2 className="mt-6 text-xl font-semibold">{section.title}</h2><p className="mt-2 leading-relaxed text-[#7a5e4a]">{section.description}</p>
      <span className="mt-6 inline-block text-sm font-semibold text-[#5a4535]">Open settings →</span>
    </Link>)}</div>
  </main>;
}

