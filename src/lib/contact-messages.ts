import "server-only";

import { Timestamp, type DocumentSnapshot } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import {
  CONTACT_MESSAGE_STATUSES,
  type ContactMessage,
  type ContactMessageStatus,
} from "@/types/contact-message";

function dateValue(value: unknown): Date {
  return value instanceof Timestamp ? value.toDate() : new Date(0);
}

function nullableDateValue(value: unknown): Date | null {
  return value instanceof Timestamp ? value.toDate() : null;
}

export function contactMessageFromSnapshot(
  snapshot: DocumentSnapshot,
): ContactMessage | null {
  if (!snapshot.exists) return null;
  const data = snapshot.data();
  const status = data?.status;
  if (
    typeof data?.fullName !== "string" ||
    typeof data.email !== "string" ||
    typeof data.message !== "string" ||
    typeof status !== "string" ||
    !CONTACT_MESSAGE_STATUSES.includes(status as ContactMessageStatus)
  ) {
    return null;
  }

  return {
    id: snapshot.id,
    fullName: data.fullName,
    email: data.email,
    message: data.message,
    status: status as ContactMessageStatus,
    createdAt: dateValue(data.createdAt),
    updatedAt: dateValue(data.updatedAt),
    statusUpdatedAt: nullableDateValue(data.statusUpdatedAt),
    statusUpdatedBy: typeof data.statusUpdatedBy === "string" ? data.statusUpdatedBy : null,
    expiresAt: dateValue(data.expiresAt),
  };
}

export async function getContactMessages(status?: ContactMessageStatus) {
  let query = getAdminDb().collection("contactMessages").orderBy("createdAt", "desc");
  if (status) query = query.where("status", "==", status);
  const snapshot = await query.limit(100).get();
  return snapshot.docs
    .map(contactMessageFromSnapshot)
    .filter((message): message is ContactMessage => message !== null);
}

export async function getContactMessage(id: string) {
  const snapshot = await getAdminDb().collection("contactMessages").doc(id).get();
  return contactMessageFromSnapshot(snapshot);
}

export async function getContactMessageCounts() {
  const collection = getAdminDb().collection("contactMessages");
  const [all, ...statusCounts] = await Promise.all([
    collection.count().get(),
    ...CONTACT_MESSAGE_STATUSES.map((status) =>
      collection.where("status", "==", status).count().get(),
    ),
  ]);

  return {
    all: all.data().count,
    ...Object.fromEntries(
      CONTACT_MESSAGE_STATUSES.map((status, index) => [
        status,
        statusCounts[index]?.data().count ?? 0,
      ]),
    ),
  } as Record<"all" | ContactMessageStatus, number>;
}
