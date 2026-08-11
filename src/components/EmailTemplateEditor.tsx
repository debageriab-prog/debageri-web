"use client";

import { useState } from "react";
import { EmailRichTextEditor } from "@/components/EmailRichTextEditor";
import type { EmailTemplate } from "@/types/email";

export function EmailTemplateEditor({
  template,
  index,
  saved,
  action,
}: {
  template: EmailTemplate;
  index: number;
  saved: boolean;
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [body, setBody] = useState(template.body);
  return (
    <form
      action={action}
      className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6 md:p-8"
    >
      <input type="hidden" name="status" value={template.status} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#3D3027] text-xs font-semibold text-[#F7F2EA]">
              {index + 1}
            </span>
            <h2 className="text-xl font-semibold">{template.label}</h2>
          </div>
          <p className="mt-2 pl-11 text-sm capitalize text-[#9a7a63]">
            When status changes to {template.status}
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
        htmlFor={`template-body-${template.status}`}
      >
        Message
      </label>
      <input type="hidden" name="body" value={body} />
      <div className="mt-2">
        <EmailRichTextEditor
          editorId={`template-body-${template.status}`}
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
