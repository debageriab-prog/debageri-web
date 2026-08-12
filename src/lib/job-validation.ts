import type { JobFieldErrors, JobSubmission } from "@/types/job";

const JOB_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{1,49}$/;

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(stringValue).filter((item) => item.length > 0 && item.length <= 80))].slice(0, 20);
}

export function validateJobSubmission(value: unknown): {
  data: JobSubmission;
  errors: JobFieldErrors;
} {
  const input = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const data: JobSubmission = {
    id: stringValue(input.id),
    title: stringValue(input.title),
    description: stringValue(input.description),
    cities: stringList(input.cities),
    languages: stringList(input.languages),
    swedenOnly: input.swedenOnly === true,
    remotePosition: input.remotePosition === true,
    expiresAt: stringValue(input.expiresAt) || null,
  };
  const errors: JobFieldErrors = {};

  if (!JOB_ID_PATTERN.test(data.id)) {
    errors.id = "Use 2 to 50 letters, numbers, underscores, or hyphens.";
  }
  if (data.title.length < 3 || data.title.length > 120) {
    errors.title = "Enter a title between 3 and 120 characters.";
  }
  if (data.description.length < 40 || data.description.length > 10_000) {
    errors.description = "Enter a description between 40 and 10,000 characters.";
  }
  if (data.cities.length === 0) errors.cities = "Add at least one city.";
  if (data.languages.length === 0) errors.languages = "Add at least one language.";
  if (data.expiresAt && Number.isNaN(new Date(data.expiresAt).getTime())) {
    errors.expiresAt = "Enter a valid expiry date and time.";
  }

  return { data, errors };
}
