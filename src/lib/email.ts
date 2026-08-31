import "server-only";

import nodemailer from "nodemailer";
import { getEmailSettings, getSmtpCredentials } from "@/lib/email-settings";
import { emailHtmlToText, sanitizeEmailHtml } from "@/lib/email-rich-text";

export async function sendCandidateEmail(
  to: string,
  subject: string,
  body: string,
) {
  const settings = await getSmtpCredentials();
  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: { user: settings.username, pass: settings.password },
  });
  const html = sanitizeEmailHtml(body);
  await transporter.sendMail({
    from: { name: settings.fromName, address: settings.fromEmail },
    replyTo: settings.replyTo || undefined,
    to,
    subject,
    text: emailHtmlToText(html),
    html: `<div style="font-family:Inter,Arial,sans-serif;line-height:1.7;color:#3D3027">${html}</div>`,
  });
}

export async function sendContactReply(
  to: string,
  subject: string,
  body: string,
) {
  await sendCandidateEmail(to, subject, body);
}

export async function sendAdminApplicationNotification(input: {
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  jobId: string;
}) {
  const configured = await getEmailSettings();
  if (!configured.adminNotificationEmail) return;
  const settings = await getSmtpCredentials();
  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: { user: settings.username, pass: settings.password },
  });
  const subject = `New application: ${input.candidateName} — ${input.jobTitle}`;
  const text = [
    `${input.candidateName} applied for ${input.jobTitle} (${input.jobId}).`,
    `Candidate email: ${input.candidateEmail}`,
    "Open the admin candidate page to review the application.",
  ].join("\n\n");
  await transporter.sendMail({
    from: { name: settings.fromName, address: settings.fromEmail },
    replyTo: settings.replyTo || undefined,
    to: settings.adminNotificationEmail,
    subject,
    text,
  });
}
