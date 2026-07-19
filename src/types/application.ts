import type { Timestamp } from "firebase/firestore";

export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "interview"
  | "technical_interview"
  | "offer"
  | "hired"
  | "rejected"
  | "withdrawn";

export interface InternalNote {
  id: string;
  text: string;
  createdAt: Timestamp;
  createdBy: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  message: string;
  resumeStoragePath: string;
  resumeFileName: string;
  status: ApplicationStatus;
  internalNotes: InternalNote[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
