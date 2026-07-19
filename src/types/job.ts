import type { Timestamp } from "firebase/firestore";

export type JobStatus = "draft" | "published" | "archived";

export interface Job {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  summary: string;
  description: string;
  requirements: string[];
  niceToHave: string[];
  status: JobStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
  archivedAt: Timestamp | null;
  createdBy: string;
}
