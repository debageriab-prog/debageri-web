import "server-only";

import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Application, ApplicationStatus } from "@/types/application";

function toDate(value: unknown) {
  return value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
    ? (value.toDate() as Date)
    : new Date(0);
}

function mapApplication(
  snapshot: QueryDocumentSnapshot<DocumentData>,
): Application {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    jobId: String(data.jobId ?? ""),
    jobTitle: String(data.jobTitle ?? ""),
    firstName: String(data.firstName ?? ""),
    lastName: String(data.lastName ?? ""),
    email: String(data.email ?? ""),
    phoneCountry: String(data.phoneCountry ?? ""),
    phoneNumber: String(data.phoneNumber ?? ""),
    linkedinUrl: String(data.linkedinUrl ?? ""),
    resumeStoragePath: String(data.resumeStoragePath ?? ""),
    resumeFileName: String(data.resumeFileName ?? ""),
    resumeContentType: String(
      data.resumeContentType ?? "application/octet-stream",
    ),
    privacyConsent: true,
    dataProcessingConsent: true,
    consentedAt: toDate(data.consentedAt),
    status: data.status as ApplicationStatus,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
    statusUpdatedAt: data.statusUpdatedAt ? toDate(data.statusUpdatedAt) : null,
    statusUpdatedBy:
      typeof data.statusUpdatedBy === "string" ? data.statusUpdatedBy : null,
    lastEmailSentAt: data.lastEmailSentAt ? toDate(data.lastEmailSentAt) : null,
    lastEmailSubject:
      typeof data.lastEmailSubject === "string" ? data.lastEmailSubject : null,
  };
}

export async function getApplications(status?: ApplicationStatus) {
  let query: FirebaseFirestore.Query = getAdminDb().collection("applications");
  if (status) query = query.where("status", "==", status);
  const snapshot = await query.limit(200).get();
  return snapshot.docs
    .map(mapApplication)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
