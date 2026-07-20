import "server-only";

import { Timestamp, type DocumentSnapshot } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { JOB_STATUSES, type Job, type JobStatus } from "@/types/job";

function dateValue(value: unknown): Date {
  return value instanceof Timestamp ? value.toDate() : new Date(0);
}

function nullableDateValue(value: unknown): Date | null {
  return value instanceof Timestamp ? value.toDate() : null;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function jobFromSnapshot(snapshot: DocumentSnapshot): Job | null {
  if (!snapshot.exists) return null;
  const data = snapshot.data();
  const status = data?.status;
  if (
    typeof data?.title !== "string" ||
    typeof data.description !== "string" ||
    typeof status !== "string" ||
    !JOB_STATUSES.includes(status as JobStatus)
  ) return null;

  return {
    id: snapshot.id,
    title: data.title,
    description: data.description,
    cities: stringList(data.cities),
    languages: stringList(data.languages),
    status: status as JobStatus,
    createdAt: dateValue(data.createdAt),
    updatedAt: dateValue(data.updatedAt),
    publishedAt: nullableDateValue(data.publishedAt),
    archivedAt: nullableDateValue(data.archivedAt),
    createdBy: typeof data.createdBy === "string" ? data.createdBy : "",
  };
}

export async function getPublishedJobs(): Promise<Job[]> {
  const snapshot = await getAdminDb()
    .collection("jobs")
    .where("status", "==", "published")
    .get();
  return snapshot.docs
    .map(jobFromSnapshot)
    .filter((job): job is Job => job !== null)
    .sort((left, right) =>
      (right.publishedAt?.getTime() ?? 0) - (left.publishedAt?.getTime() ?? 0),
    );
}

export async function getAllJobs(): Promise<Job[]> {
  const snapshot = await getAdminDb().collection("jobs").orderBy("createdAt", "desc").get();
  return snapshot.docs.map(jobFromSnapshot).filter((job): job is Job => job !== null);
}
