import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL_VARIABLES } from "@/lib/email-templates";
import { getEmailTemplates } from "@/lib/email-settings";
import { updateEmailTemplate } from "../actions";
import { EmailTemplateEditor } from "@/components/EmailTemplateEditor";

export const metadata: Metadata = { title: "Email templates" };

export default async function EmailTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [templates, query] = await Promise.all([
    getEmailTemplates(),
    searchParams,
  ]);
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <Link
        href="/admin/settings"
        className="text-sm font-semibold text-[#7a5e4a]"
      >
        ← Settings
      </Link>
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
          Candidate communication
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Email templates
        </h1>
        <p className="mt-2 max-w-2xl text-[#7a5e4a]">
          Create a thoughtful starting point for every status update. You can
          still edit each message before it is sent.
        </p>
      </div>
      <aside className="mt-8 rounded-2xl border border-[#e8d8c8] bg-[#f0e8dc] p-5">
        <p className="text-sm font-semibold">Available personalisation</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {EMAIL_VARIABLES.map((variable) => (
            <code
              key={variable}
              className="rounded-md bg-[#fdfaf6] px-2 py-1 text-xs text-[#5a4535]"
            >
              {"{{"}
              {variable}
              {"}}"}
            </code>
          ))}
        </div>
      </aside>
      <div className="mt-6 space-y-5">
        {templates.map((template, index) => (
          <EmailTemplateEditor
            key={template.status}
            template={template}
            index={index}
            saved={query.saved === template.status}
            action={updateEmailTemplate}
          />
        ))}
      </div>
    </main>
  );
}
