"use server";

import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-session";
import { getAdminDb } from "@/lib/firebase/admin";
import {
  CONTACT_MESSAGE_STATUSES,
  type ContactMessageStatus,
} from "@/types/contact-message";

export async function updateMessageStatus(formData: FormData) {
  const admin = await requireAdminSession();
  const id = formData.get("id");
  const status = formData.get("status");

  if (
    typeof id !== "string" ||
    !id ||
    typeof status !== "string" ||
    !CONTACT_MESSAGE_STATUSES.includes(status as ContactMessageStatus)
  ) {
    throw new Error("Invalid message update.");
  }

  await getAdminDb().collection("contactMessages").doc(id).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
    statusUpdatedAt: FieldValue.serverTimestamp(),
    statusUpdatedBy: admin.uid,
  });

  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
}
