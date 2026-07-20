export const JOB_STATUSES = ["draft", "published", "archived"] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export interface Job {
  id: string;
  title: string;
  description: string;
  cities: string[];
  languages: string[];
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  archivedAt: Date | null;
  createdBy: string;
}

export interface JobSubmission {
  id: string;
  title: string;
  description: string;
  cities: string[];
  languages: string[];
}

export type JobFieldErrors = Partial<Record<keyof JobSubmission, string>>;
