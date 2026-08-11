import "server-only";

import nodemailer from "nodemailer";
import { getSmtpCredentials } from "@/lib/email-settings";

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export async function sendCandidateEmail(to: string, subject: string, body: string) {
  const settings = await getSmtpCredentials();
  const transporter = nodemailer.createTransport({ host: settings.host, port: settings.port, secure: settings.secure, auth: { user: settings.username, pass: settings.password } });
  await transporter.sendMail({
    from: { name: settings.fromName, address: settings.fromEmail },
    replyTo: settings.replyTo || undefined,
    to,
    subject,
    text: body,
    html: `<div style="font-family:Inter,Arial,sans-serif;line-height:1.7;color:#3D3027;white-space:pre-wrap">${escapeHtml(body)}</div>`,
  });
}
