import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { CONTACT_REPLY_VARIABLES, EMAIL_VARIABLES } from "@/lib/email-templates";
import { getContactReplyTemplate, getEmailTemplates } from "@/lib/email-settings";
import { updateContactReplyTemplate, updateEmailTemplate } from "../actions";
import { ContactReplyTemplateEditor } from "@/components/ContactReplyTemplateEditor";
import { EmailTemplateEditor } from "@/components/EmailTemplateEditor";

export const metadata: Metadata = { title: "Email templates" };

export default async function EmailTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [templates, contactReplyTemplate, query] = await Promise.all([
    getEmailTemplates(),
    getContactReplyTemplate(),
    searchParams,
  ]);
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <Link
        href="/admin/settings"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#7a5e4a]"
      >
        <ArrowLeftIcon /> Settings
      </Link>
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
          Email communication
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Email templates
        </h1>
        <p className="mt-2 max-w-2xl text-[#7a5e4a]">
          Create a thoughtful starting point for candidate updates and contact
          replies. You can still edit each message before it is sent.
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
        <div className="pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7a63]">
            Contact messages · variables: {CONTACT_REPLY_VARIABLES.map((variable) => `{{${variable}}}`).join(", ")}
          </p>
          <ContactReplyTemplateEditor
            template={contactReplyTemplate}
            saved={query.saved === "contact-reply"}
            action={updateContactReplyTemplate}
          />
        </div>
      </div>
    </main>
  );
}
