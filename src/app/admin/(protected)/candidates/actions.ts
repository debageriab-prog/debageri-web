"use server";

import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-session";
import { getAdminDb } from "@/lib/firebase/admin";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/types/application";

export async function updateApplicationStatus(formData: FormData) {
  const admin = await requireAdminSession();
  const id = formData.get("id"); const status = formData.get("status");
  if (typeof id !== "string" || !id || typeof status !== "string" || !APPLICATION_STATUSES.includes(status as ApplicationStatus)) throw new Error("Invalid application update.");
  await getAdminDb().collection("applications").doc(id).update({ status, updatedAt: FieldValue.serverTimestamp(), statusUpdatedAt: FieldValue.serverTimestamp(), statusUpdatedBy: admin.uid });
  revalidatePath("/admin/candidates");
}
