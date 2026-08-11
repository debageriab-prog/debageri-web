"use server";

import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-session";
import { sendCandidateEmail } from "@/lib/email";
import { emailHtmlToText, sanitizeEmailHtml } from "@/lib/email-rich-text";
import { getAdminDb } from "@/lib/firebase/admin";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/types/application";

export interface CandidateUpdateState {
  message: string;
  ok: boolean;
  statusSaved: boolean;
}

export async function updateApplicationStatus(
  _previous: CandidateUpdateState,
  formData: FormData,
): Promise<CandidateUpdateState> {
  const admin = await requireAdminSession();
  const id = formData.get("id");
  const status = formData.get("status");
  if (
    typeof id !== "string" ||
    !id ||
    typeof status !== "string" ||
    !APPLICATION_STATUSES.includes(status as ApplicationStatus)
  )
    return {
      message: "The status update is invalid.",
      ok: false,
      statusSaved: false,
    };
  const sendEmail = formData.get("sendEmail") === "on";
  const subject = formData.get("emailSubject");
  const body = formData.get("emailBody");
  const sanitizedBody = typeof body === "string" ? sanitizeEmailHtml(body) : "";
  if (
    sendEmail &&
    (typeof subject !== "string" ||
      !subject.trim() ||
      subject.length > 200 ||
      !emailHtmlToText(sanitizedBody) ||
      sanitizedBody.length > 10_000)
  )
    return {
      message: "Review the email subject and message.",
      ok: false,
      statusSaved: false,
    };
  const reference = getAdminDb().collection("applications").doc(id);
  const snapshot = await reference.get();
  if (!snapshot.exists)
    return { message: "Candidate not found.", ok: false, statusSaved: false };
  const email = snapshot.data()?.email;
  if (sendEmail && (typeof email !== "string" || !email))
    return {
      message: "This candidate does not have a valid email address.",
      ok: false,
      statusSaved: false,
    };
  try {
    await reference.update({
      status,
      updatedAt: FieldValue.serverTimestamp(),
      statusUpdatedAt: FieldValue.serverTimestamp(),
      statusUpdatedBy: admin.uid,
    });
  } catch (error) {
    console.error("Failed to update candidate", error);
    return {
      message: "The status could not be saved.",
      ok: false,
      statusSaved: false,
    };
  }
  if (sendEmail) {
    try {
      await sendCandidateEmail(
        email as string,
        (subject as string).trim(),
        sanitizedBody,
      );
    } catch (error) {
      console.error("Failed to send candidate email", error);
      revalidatePath("/admin/candidates");
      return {
        message:
          "The status was saved, but the email could not be sent. Check SMTP settings and try again.",
        ok: false,
        statusSaved: true,
      };
    }
    try {
      await reference.update({
        lastEmailSentAt: FieldValue.serverTimestamp(),
        lastEmailSubject: (subject as string).trim(),
      });
    } catch (error) {
      console.error("Failed to record candidate email delivery", error);
      revalidatePath("/admin/candidates");
      return {
        message:
          "The status was saved and the email was sent, but its delivery history could not be saved.",
        ok: false,
        statusSaved: true,
      };
    }
  }
  revalidatePath("/admin/candidates");
  return {
    message: sendEmail
      ? "Status saved and email sent."
      : "Status saved. No email was sent.",
    ok: true,
    statusSaved: true,
  };
}
