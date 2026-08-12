export const JOB_STATUSES = ["draft", "published", "archived"] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export interface Job {
  id: string;
  title: string;
  description: string;
  descriptionText: string;
  cities: string[];
  languages: string[];
  swedenOnly: boolean;
  remotePosition: boolean;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  archivedAt: Date | null;
  expiresAt: Date | null;
  createdBy: string;
  updatedBy: string | null;
}

export interface JobSubmission {
  id: string;
  title: string;
  description: string;
  cities: string[];
  languages: string[];
  swedenOnly: boolean;
  remotePosition: boolean;
  expiresAt: string | null;
}

export type JobFieldErrors = Partial<Record<keyof JobSubmission, string>>;
