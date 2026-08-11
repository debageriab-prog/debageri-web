export const APPLICATION_STATUSES = [
  "new",
  "interesting",
  "interview",
  "offer",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  linkedinUrl: string;
  resumeStoragePath: string;
  resumeFileName: string;
  resumeContentType: string;
  privacyConsent: true;
  dataProcessingConsent: true;
  consentedAt: Date;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
  statusUpdatedAt: Date | null;
  statusUpdatedBy: string | null;
  lastEmailSentAt: Date | null;
  lastEmailSubject: string | null;
}

export type ApplicationField =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneCountry"
  | "phoneNumber"
  | "linkedinUrl"
  | "resume"
  | "privacyConsent"
  | "dataProcessingConsent";

export type ApplicationFieldErrors = Partial<Record<ApplicationField, string>>;
