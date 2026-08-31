"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-session";
import {
  saveContactReplyTemplate,
  saveEmailSettings,
  saveEmailTemplate,
} from "@/lib/email-settings";
import { emailHtmlToText, sanitizeEmailHtml } from "@/lib/email-rich-text";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/types/application";

function required(formData: FormData, name: string, maxLength: number): string {
  const value = formData.get(name);
  if (typeof value !== "string" || !value.trim() || value.length > maxLength)
    throw new Error(`Invalid ${name}.`);
  return value.trim();
}

export async function updateEmailSettings(formData: FormData) {
  const admin = await requireAdminSession();
  const port = Number(formData.get("port"));
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("Enter a valid SMTP port.");
  const fromEmail = required(formData, "fromEmail", 254);
  if (!/^\S+@\S+\.\S+$/.test(fromEmail))
    throw new Error("Enter a valid sender email.");
  const replyToValue = formData.get("replyTo");
  const replyTo = typeof replyToValue === "string" ? replyToValue.trim() : "";
  if (replyTo && !/^\S+@\S+\.\S+$/.test(replyTo))
    throw new Error("Enter a valid reply-to email.");
  const adminNotificationValue = formData.get("adminNotificationEmail");
  const adminNotificationEmail =
    typeof adminNotificationValue === "string"
      ? adminNotificationValue.trim()
      : "";
  if (adminNotificationEmail && !/^\S+@\S+\.\S+$/.test(adminNotificationEmail))
    throw new Error("Enter a valid admin notification email.");

  await saveEmailSettings(
    {
      host: required(formData, "host", 253),
      port,
      secure: formData.get("secure") === "on",
      username: required(formData, "username", 254),
      fromName: required(formData, "fromName", 100),
      fromEmail,
      replyTo,
      adminNotificationEmail,
    },
    typeof formData.get("password") === "string"
      ? String(formData.get("password"))
      : "",
    admin.uid,
  );
  revalidatePath("/admin/settings/email");
  redirect("/admin/settings/email?saved=true");
}

export async function updateEmailTemplate(formData: FormData) {
  const admin = await requireAdminSession();
  const status = formData.get("status");
  if (
    typeof status !== "string" ||
    !APPLICATION_STATUSES.includes(status as ApplicationStatus)
  )
    throw new Error("Invalid template type.");
  const body = sanitizeEmailHtml(required(formData, "body", 10_000));
  if (!emailHtmlToText(body)) throw new Error("Enter an email message.");
  await saveEmailTemplate(
    status as ApplicationStatus,
    required(formData, "subject", 200),
    body,
    admin.uid,
  );
  revalidatePath("/admin/settings/email-templates");
  revalidatePath("/admin/candidates");
  redirect(`/admin/settings/email-templates?saved=${status}`);
}

export async function updateContactReplyTemplate(formData: FormData) {
  const admin = await requireAdminSession();
  const body = sanitizeEmailHtml(required(formData, "body", 10_000));
  if (!emailHtmlToText(body)) throw new Error("Enter an email message.");
  await saveContactReplyTemplate(
    required(formData, "subject", 200),
    body,
    admin.uid,
  );
  revalidatePath("/admin/settings/email-templates");
  revalidatePath("/admin/messages");
  redirect("/admin/settings/email-templates?saved=contact-reply");
}
