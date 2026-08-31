"use server";

import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-session";
import { sendContactReply } from "@/lib/email";
import { emailHtmlToText, sanitizeEmailHtml } from "@/lib/email-rich-text";
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

export interface MessageReplyState {
  message: string;
  ok: boolean;
}

export async function replyToMessage(
  _previous: MessageReplyState,
  formData: FormData,
): Promise<MessageReplyState> {
  const admin = await requireAdminSession();
  const id = formData.get("id");
  const subject = formData.get("emailSubject");
  const body = formData.get("emailBody");
  const sanitizedBody = typeof body === "string" ? sanitizeEmailHtml(body) : "";
  if (
    typeof id !== "string" ||
    !id ||
    typeof subject !== "string" ||
    !subject.trim() ||
    subject.length > 200 ||
    !emailHtmlToText(sanitizedBody) ||
    sanitizedBody.length > 10_000
  ) {
    return { message: "Review the email subject and message.", ok: false };
  }

  const reference = getAdminDb().collection("contactMessages").doc(id);
  const snapshot = await reference.get();
  const email = snapshot.data()?.email;
  if (!snapshot.exists || typeof email !== "string" || !email) {
    return { message: "This contact message could not be found.", ok: false };
  }

  try {
    await sendContactReply(email, subject.trim(), sanitizedBody);
  } catch (error) {
    console.error("Failed to reply to contact message", error);
    return {
      message: "The email could not be sent. Check SMTP settings and try again.",
      ok: false,
    };
  }
  try {
    await reference.update({
      status: "replied",
      updatedAt: FieldValue.serverTimestamp(),
      statusUpdatedAt: FieldValue.serverTimestamp(),
      statusUpdatedBy: admin.uid,
      lastEmailSentAt: FieldValue.serverTimestamp(),
      lastEmailSubject: subject.trim(),
    });
  } catch (error) {
    console.error("Failed to record contact reply", error);
    return {
      message: "The email was sent, but the message status could not be updated.",
      ok: true,
    };
  }

  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
  return { message: "Email sent and message marked as replied.", ok: true };
}

export async function deleteMessage(id: string): Promise<{ ok: boolean }> {
  await requireAdminSession();
  if (!id) return { ok: false };
  try {
    await getAdminDb().collection("contactMessages").doc(id).delete();
  } catch (error) {
    console.error("Failed to delete contact message", error);
    return { ok: false };
  }
  revalidatePath("/admin/messages");
  return { ok: true };
}
