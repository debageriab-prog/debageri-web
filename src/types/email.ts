import type { ApplicationStatus } from "@/types/application";

export interface EmailSettings {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  fromName: string;
  fromEmail: string;
  replyTo: string;
  hasPassword: boolean;
}

export interface EmailTemplate {
  status: ApplicationStatus;
  label: string;
  subject: string;
  body: string;
}

export interface EmailMergeData {
  candidateFirstName: string;
  candidateLastName: string;
  candidateFullName: string;
  candidateEmail: string;
  jobTitle: string;
  companyName: string;
  status: string;
}

