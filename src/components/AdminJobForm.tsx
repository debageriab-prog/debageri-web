"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { JobFieldErrors } from "@/types/job";
import { RichTextEditor } from "@/components/RichTextEditor";

interface InitialJob {
  id: string;
  title: string;
  description: string;
  cities: string[];
  languages: string[];
  expiresAt: string;
}

export function AdminJobForm({ initialJob }: { initialJob?: InitialJob }) {
  const router = useRouter();
  const [id, setId] = useState(initialJob?.id ?? "");
  const [title, setTitle] = useState(initialJob?.title ?? "");
  const [description, setDescription] = useState(initialJob?.description ?? "");
  const [cities, setCities] = useState<string[]>(initialJob?.cities ?? []);
  const [languages, setLanguages] = useState<string[]>(initialJob?.languages ?? []);
  const [expiresAt, setExpiresAt] = useState(initialJob?.expiresAt ?? "");
  const [fieldErrors, setFieldErrors] = useState<JobFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(initialJob ? `/api/admin/jobs/${encodeURIComponent(initialJob.id)}` : "/api/admin/jobs", {
        method: initialJob ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title,
          description,
          cities,
          languages,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        }),
      });
      const result = (await response.json()) as {
        id?: string;
        message?: string;
        fieldErrors?: JobFieldErrors;
      };
      if (!response.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(result.message ?? "The job could not be published.");
        return;
      }

      router.push(`/admin/jobs?${initialJob ? "updated" : "created"}=1`);
      router.refresh();
    } catch {
      setFormError("The job could not be published. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Job ID" htmlFor="job-id" error={fieldErrors.id} help="A unique internal ID, such as JAVA-2026-01.">
          <input
            id="job-id"
            value={id}
            onChange={(event) => setId(event.target.value)}
            required
            disabled={Boolean(initialJob)}
            maxLength={50}
            className={inputClass(Boolean(fieldErrors.id))}
            placeholder="JAVA-2026-01"
          />
        </Field>
        <Field label="Job title" htmlFor="job-title" error={fieldErrors.title} help="The position name shown to candidates.">
          <input
            id="job-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            maxLength={120}
            className={inputClass(Boolean(fieldErrors.title))}
            placeholder="Senior Java Developer"
          />
        </Field>
      </div>

      <Field label="Job description" htmlFor="job-description-editor" error={fieldErrors.description} help="Describe the assignment, responsibilities, and the person you are looking for.">
        <RichTextEditor value={description} onChange={setDescription} hasError={Boolean(fieldErrors.description)} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <TagField
          id="cities"
          label="Cities"
          placeholder="Add a city"
          values={cities}
          onChange={setCities}
          error={fieldErrors.cities}
          suggestion="Press Enter after each city."
        />
        <TagField
          id="languages"
          label="Languages"
          placeholder="Add a language"
          values={languages}
          onChange={setLanguages}
          error={fieldErrors.languages}
          suggestion="Press Enter after each language."
        />
      </div>

      <Field label="Expiry date" htmlFor="job-expiry" error={fieldErrors.expiresAt} help="Optional, in Sweden time. The job disappears from Careers automatically.">
        <input
          id="job-expiry"
          type="datetime-local"
          value={expiresAt}
          onChange={(event) => setExpiresAt(event.target.value)}
          className={inputClass(Boolean(fieldErrors.expiresAt))}
        />
      </Field>

      {formError && (
        <p role="alert" className="rounded-lg border border-[#d8b9a3] bg-[#f7ebe2] px-4 py-3 text-sm text-[#6f3e2d]">
          {formError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-[#e8d8c8] pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-[#9a7a63]">Publishing makes this opportunity immediately visible on Careers.</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[#3D3027] px-6 py-3 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#5a4535] disabled:opacity-60"
        >
          {isSubmitting ? (initialJob ? "Saving…" : "Publishing…") : (initialJob ? "Save changes" : "Publish opportunity")}
        </button>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, help, error, children }: { label: string; htmlFor: string; help: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-[#3D3027]">{label}</label>
      {children}
      <p className={`mt-2 text-xs ${error ? "text-[#8a4934]" : "text-[#9a7a63]"}`}>{error ?? help}</p>
    </div>
  );
}

function TagField({ id, label, placeholder, values, onChange, error, suggestion }: { id: string; label: string; placeholder: string; values: string[]; onChange: (values: string[]) => void; error?: string; suggestion: string }) {
  const [draft, setDraft] = useState("");

  function addValue() {
    const value = draft.trim();
    if (!value || values.some((item) => item.toLowerCase() === value.toLowerCase())) return;
    onChange([...values, value]);
    setDraft("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addValue();
    }
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#3D3027]">{label}</label>
      <div className={`rounded-lg border bg-[#F7F2EA] p-2 ${error ? "border-[#b66a50]" : "border-[#e8d8c8]"}`}>
        {values.length > 0 && (
          <ul className="mb-2 flex flex-wrap gap-2" aria-label={`Added ${label.toLowerCase()}`}>
            {values.map((value) => (
              <li key={value} className="inline-flex items-center gap-1.5 rounded-full bg-[#e8d8c8] py-1 pl-3 pr-1.5 text-xs font-medium text-[#5a4535]">
                {value}
                <button type="button" onClick={() => onChange(values.filter((item) => item !== value))} className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-[#c4a98e]" aria-label={`Remove ${value}`}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2">
          <input
            id={id}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-[#3D3027] placeholder:text-[#b89880] focus:outline-none"
            placeholder={placeholder}
          />
          <button type="button" onClick={addValue} className="rounded-md border border-[#c4a98e] px-3 text-xs font-semibold text-[#5a4535] hover:bg-[#e8d8c8]">Add</button>
        </div>
      </div>
      <p className={`mt-2 text-xs ${error ? "text-[#8a4934]" : "text-[#9a7a63]"}`}>{error ?? suggestion}</p>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-[#F7F2EA] px-4 py-3 text-base text-[#3D3027] placeholder:text-[#b89880] focus:border-[#9a7a63] focus:outline-none ${hasError ? "border-[#b66a50]" : "border-[#e8d8c8]"}`;
}
