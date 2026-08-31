"use client";

import { useState } from "react";
import { EmailRichTextEditor } from "@/components/EmailRichTextEditor";
import type { ContactReplyTemplate } from "@/types/email";

export function ContactReplyTemplateEditor({
  template,
  saved,
  action,
}: {
  template: ContactReplyTemplate;
  saved: boolean;
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [body, setBody] = useState(template.body);

  return (
    <form
      action={action}
      className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Contact message reply</h2>
          <p className="mt-2 text-sm text-[#9a7a63]">
            Prefilled when replying from the Messages section
          </p>
        </div>
        {saved && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            Saved
          </span>
        )}
      </div>
      <label className="mt-6 block text-sm font-semibold">
        Subject
        <input
          name="subject"
          required
          maxLength={200}
          defaultValue={template.subject}
          className="mt-2 w-full rounded-xl border border-[#e8d8c8] bg-white px-4 py-3 text-sm"
        />
      </label>
      <label
        className="mt-5 block text-sm font-semibold"
        htmlFor="contact-reply-template-body"
      >
        Message
      </label>
      <input type="hidden" name="body" value={body} />
      <div className="mt-2">
        <EmailRichTextEditor
          editorId="contact-reply-template-body"
          value={body}
          onChange={setBody}
        />
      </div>
      <div className="mt-5 flex justify-end">
        <button className="rounded-full border border-[#c4a98e] px-5 py-2.5 text-sm font-semibold hover:bg-[#e8d8c8]">
          Save template
        </button>
      </div>
    </form>
  );
}
