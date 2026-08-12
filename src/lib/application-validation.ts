import type { ApplicationFieldErrors } from "@/types/application";

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export interface ApplicationSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  linkedinUrl: string;
  privacyConsent: boolean;
  dataProcessingConsent: boolean;
  swedenLocationConfirmed: boolean;
  onsiteRequirementAcknowledged: boolean;
}

interface JobApplicationRequirements {
  swedenOnly: boolean;
  remotePosition: boolean;
}

function value(formData: FormData, key: string) {
  const entry = formData.get(key);
  return typeof entry === "string" ? entry.trim() : "";
}

export function validateApplication(formData: FormData, requirements: JobApplicationRequirements) {
  const data: ApplicationSubmission = {
    firstName: value(formData, "firstName"),
    lastName: value(formData, "lastName"),
    email: value(formData, "email").toLowerCase(),
    phoneCountry: value(formData, "phoneCountry"),
    phoneNumber: value(formData, "phoneNumber"),
    linkedinUrl: value(formData, "linkedinUrl"),
    privacyConsent: formData.get("privacyConsent") === "true",
    dataProcessingConsent: formData.get("dataProcessingConsent") === "true",
    swedenLocationConfirmed: formData.get("swedenLocationConfirmed") === "true",
    onsiteRequirementAcknowledged: formData.get("onsiteRequirementAcknowledged") === "true",
  };
  const errors: ApplicationFieldErrors = {};

  if (data.firstName.length < 1 || data.firstName.length > 80) errors.firstName = "Enter your first name.";
  if (data.lastName.length < 1 || data.lastName.length > 80) errors.lastName = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254) errors.email = "Enter a valid email address.";
  if (!/^\+[1-9]\d{0,3}$/.test(data.phoneCountry)) errors.phoneCountry = "Select a country code.";
  if (!/^[0-9 ()-]{5,30}$/.test(data.phoneNumber)) errors.phoneNumber = "Enter a valid phone number.";
  try {
    const url = new URL(data.linkedinUrl);
    if (url.protocol !== "https:" || !/(^|\.)linkedin\.com$/i.test(url.hostname)) throw new Error();
  } catch {
    errors.linkedinUrl = "Enter a valid LinkedIn URL.";
  }
  if (!data.privacyConsent) errors.privacyConsent = "You must agree to the privacy policy.";
  if (!data.dataProcessingConsent) errors.dataProcessingConsent = "Consent is required to process your application.";
  if (requirements.swedenOnly && !data.swedenLocationConfirmed) {
    errors.swedenLocationConfirmed = "Confirm that you are based in Sweden and have the right to work here.";
  }
  if (!requirements.remotePosition && !data.onsiteRequirementAcknowledged) {
    errors.onsiteRequirementAcknowledged = "Acknowledge that this role requires on-site presence.";
  }

  return { data, errors };
}

export function validateResume(entry: FormDataEntryValue | null) {
  if (!(entry instanceof File) || entry.size === 0) return "Choose a resume to upload.";
  if (entry.size > MAX_RESUME_BYTES) return "Your resume must be 5 MB or smaller.";
  if (!RESUME_TYPES.has(entry.type)) return "Upload a PDF, DOC, or DOCX file.";
  return undefined;
}

export function safeResumeName(name: string) {
  const cleaned = name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  return cleaned.slice(0, 120) || "resume";
}
