"use client";

import { useState, type FormEvent } from "react";
import { getAppCheckToken } from "@/lib/firebase/client";
import type { ContactFieldErrors } from "@/types/contact-message";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

interface FormValues {
  fullName: string;
  email: string;
  message: string;
  website: string;
}

const INITIAL_VALUES: FormValues = {
  fullName: "",
  email: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setFormError("");
    setIsSubmitting(true);

    try {
      const appCheckToken = await getAppCheckToken();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(appCheckToken ? { "X-Firebase-AppCheck": appCheckToken } : {}),
        },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as {
        message?: string;
        fieldErrors?: ContactFieldErrors;
      };

      if (!response.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(result.message ?? "We could not send your message. Please try again.");
        return;
      }

      setValues(INITIAL_VALUES);
      setIsComplete(true);
    } catch {
      setFormError("We could not send your message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center text-center" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 text-[#B85F1E]">
          <CheckIcon size={28} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-[#3D3027]">
          Message received.
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-[#7a5e4a]">
          Thanks for getting in touch. We will read your note and get back to you as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setIsComplete(false)}
          className="mt-7 rounded-full border border-[#c4a98e] px-6 py-3 text-sm font-semibold text-[#3D3027] transition-colors hover:border-[#B85F1E] hover:bg-[#e8d8c8]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" error={fieldErrors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={values.fullName}
            onChange={(event) => setValues({ ...values, fullName: event.target.value })}
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
            className={inputClassName(Boolean(fieldErrors.fullName))}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={inputClassName(Boolean(fieldErrors.email))}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Message" error={fieldErrors.message}>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5_000}
            rows={7}
            value={values.message}
            onChange={(event) => setValues({ ...values, message: event.target.value })}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : "message-help"}
            className={`${inputClassName(Boolean(fieldErrors.message))} resize-y`}
            placeholder="Tell us about your project, opportunity, or question..."
          />
          <div id="message-help" className="mt-2 flex justify-between gap-4 text-xs text-[#9a7a63]">
            <span>At least 10 characters</span>
            <span>{values.message.length.toLocaleString()} / 5,000</span>
          </div>
        </Field>
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues({ ...values, website: event.target.value })}
        />
      </div>

      {formError && (
        <p className="mt-5 rounded-xl border border-[#d8b9a3] bg-[#f7ebe2] px-4 py-3 text-sm text-[#6f3e2d]" role="alert">
          {formError}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-[#9a7a63]">
          We use your details only to respond to your inquiry and delete stored messages after 12 months.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#F2924A] to-[#D9702A] px-7 py-3.5 text-sm font-semibold text-[#2A1B0E] shadow-lg shadow-[#E8833A]/20 transition-colors hover:from-[#F6A263] hover:to-[#E27C33] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send message"}
          {!isSubmitting && <ArrowRightIcon />}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = label === "Full name" ? "fullName" : label.toLowerCase();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#3D3027]">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#8a4934]">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClassName(hasError: boolean) {
  return `w-full rounded-xl border bg-[#F7F2EA] px-4 py-3.5 text-base text-[#3D3027] placeholder:text-[#b89880] transition-colors focus:border-[#B85F1E] focus:outline-none ${
    hasError ? "border-[#b66a50]" : "border-[#e8d8c8]"
  }`;
}


