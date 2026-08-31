import type { Application } from "@/types/application";
import type {
  ContactReplyMergeData,
  ContactReplyTemplate,
  EmailMergeData,
  EmailTemplate,
} from "@/types/email";

export const EMAIL_VARIABLES = [
  "candidateFirstName", "candidateLastName", "candidateFullName", "candidateEmail",
  "jobTitle", "companyName", "status",
] as const;

export const DEFAULT_EMAIL_TEMPLATES: EmailTemplate[] = [
  { status: "new", label: "Application received", subject: "We received your application for {{jobTitle}}", body: "Hi {{candidateFirstName}},\n\nThank you for applying for the {{jobTitle}} position at {{companyName}}. We have received your application and will review it carefully.\n\nWe will be in touch as soon as we have an update.\n\nWarm regards,\n{{companyName}}" },
  { status: "interesting", label: "Moving forward", subject: "An update on your {{jobTitle}} application", body: "Hi {{candidateFirstName}},\n\nWe enjoyed reviewing your application for {{jobTitle}} and would like to continue the conversation.\n\nWe will contact you shortly with the next steps.\n\nWarm regards,\n{{companyName}}" },
  { status: "interview", label: "Interview", subject: "Interview for the {{jobTitle}} position", body: "Hi {{candidateFirstName}},\n\nWe would be delighted to invite you to an interview for the {{jobTitle}} position.\n\nWe will follow up with suggested times and practical details.\n\nWarm regards,\n{{companyName}}" },
  { status: "offer", label: "Offer", subject: "An offer from {{companyName}}", body: "Hi {{candidateFirstName}},\n\nWe are excited to let you know that we would like to offer you the {{jobTitle}} position.\n\nWe will contact you separately to walk through the details and answer any questions.\n\nWarm regards,\n{{companyName}}" },
  { status: "rejected", label: "Application outcome", subject: "An update on your application to {{companyName}}", body: "Hi {{candidateFirstName}},\n\nThank you for the time and care you put into your application for {{jobTitle}}. After careful consideration, we will not be moving forward with your application at this time.\n\nWe appreciate your interest in {{companyName}} and wish you every success.\n\nWarm regards,\n{{companyName}}" },
];

export const CONTACT_REPLY_VARIABLES = [
  "contactName",
  "contactEmail",
  "companyName",
] as const;

export const DEFAULT_CONTACT_REPLY_TEMPLATE: ContactReplyTemplate = {
  subject: "Re: Your message to {{companyName}}",
  body: "Hi {{contactName}},\n\nThank you for getting in touch.\n\nWarm regards,\n{{companyName}}",
};

export function getMergeData(application: Application): EmailMergeData {
  return {
    candidateFirstName: application.firstName,
    candidateLastName: application.lastName,
    candidateFullName: `${application.firstName} ${application.lastName}`.trim(),
    candidateEmail: application.email,
    jobTitle: application.jobTitle,
    companyName: "Debageri AB",
    status: application.status,
  };
}

export function renderEmailTemplate(value: string, data: EmailMergeData): string {
  return value.replace(/{{\s*([a-zA-Z]+)\s*}}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(data, key) ? data[key as keyof EmailMergeData] : match,
  );
}

export function renderContactReplyTemplate(
  value: string,
  data: ContactReplyMergeData,
): string {
  return value.replace(/{{\s*([a-zA-Z]+)\s*}}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(data, key)
      ? data[key as keyof ContactReplyMergeData]
      : match,
  );
}

