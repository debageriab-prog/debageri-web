import type {
  ContactFieldErrors,
  ContactSubmission,
} from "@/types/contact-message";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactValidationResult {
  data: ContactSubmission;
  errors: ContactFieldErrors;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(
  value: unknown,
): ContactValidationResult {
  const input = value && typeof value === "object" ? value : {};
  const record = input as Record<string, unknown>;
  const data: ContactSubmission = {
    fullName: stringValue(record.fullName),
    email: stringValue(record.email).toLowerCase(),
    message: stringValue(record.message),
    website: stringValue(record.website),
  };
  const errors: ContactFieldErrors = {};

  if (data.fullName.length < 2 || data.fullName.length > 100) {
    errors.fullName = "Enter a name between 2 and 100 characters.";
  }
  if (
    data.email.length > 254 ||
    !EMAIL_PATTERN.test(data.email)
  ) {
    errors.email = "Enter a valid email address.";
  }
  if (data.message.length < 10 || data.message.length > 5_000) {
    errors.message = "Enter a message between 10 and 5,000 characters.";
  }

  return { data, errors };
}
