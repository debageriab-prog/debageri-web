import "server-only";

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { getAdminDb } from "@/lib/firebase/admin";
import { DEFAULT_EMAIL_TEMPLATES } from "@/lib/email-templates";
import type { ApplicationStatus } from "@/types/application";
import type { EmailSettings, EmailTemplate } from "@/types/email";

const SETTINGS_REF = () => getAdminDb().collection("appSettings").doc("email");

function encryptionKey(): Buffer {
  const encoded = process.env.EMAIL_SETTINGS_ENCRYPTION_KEY;
  if (!encoded) throw new Error("EMAIL_SETTINGS_ENCRYPTION_KEY is not configured.");
  const key = Buffer.from(encoded, "base64");
  if (key.length !== 32) throw new Error("EMAIL_SETTINGS_ENCRYPTION_KEY must be a base64-encoded 32-byte key.");
  return key;
}

function encrypt(value: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return ["v1", iv.toString("base64"), cipher.getAuthTag().toString("base64"), ciphertext.toString("base64")].join(".");
}

function decrypt(value: string): string {
  const [version, iv, tag, ciphertext] = value.split(".");
  if (version !== "v1" || !iv || !tag || !ciphertext) throw new Error("Stored SMTP password is invalid.");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(ciphertext, "base64")), decipher.final()]).toString("utf8");
}

export async function getEmailSettings(): Promise<EmailSettings> {
  const data = (await SETTINGS_REF().get()).data();
  return {
    host: typeof data?.host === "string" ? data.host : "",
    port: typeof data?.port === "number" ? data.port : 587,
    secure: data?.secure === true,
    username: typeof data?.username === "string" ? data.username : "",
    fromName: typeof data?.fromName === "string" ? data.fromName : "Debageri AB",
    fromEmail: typeof data?.fromEmail === "string" ? data.fromEmail : "",
    replyTo: typeof data?.replyTo === "string" ? data.replyTo : "",
    hasPassword: typeof data?.passwordEncrypted === "string" && Boolean(data.passwordEncrypted),
  };
}

export async function getSmtpCredentials() {
  const snapshot = await SETTINGS_REF().get();
  const data = snapshot.data();
  const settings = await getEmailSettings();
  if (!settings.host || !settings.fromEmail || !data?.passwordEncrypted) throw new Error("Complete the SMTP settings before sending email.");
  return { ...settings, password: decrypt(String(data.passwordEncrypted)) };
}

export async function saveEmailSettings(settings: Omit<EmailSettings, "hasPassword">, password: string, adminUid: string) {
  const update: Record<string, unknown> = { ...settings, updatedAt: new Date(), updatedBy: adminUid };
  if (password) update.passwordEncrypted = encrypt(password);
  await SETTINGS_REF().set(update, { merge: true });
}

export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  const data = (await SETTINGS_REF().get()).data();
  const saved = data?.templates && typeof data.templates === "object" ? data.templates as Record<string, unknown> : {};
  return DEFAULT_EMAIL_TEMPLATES.map((template) => {
    const value = saved[template.status];
    if (!value || typeof value !== "object") return template;
    const candidate = value as Record<string, unknown>;
    return { ...template, subject: typeof candidate.subject === "string" ? candidate.subject : template.subject, body: typeof candidate.body === "string" ? candidate.body : template.body };
  });
}

export async function saveEmailTemplate(status: ApplicationStatus, subject: string, body: string, adminUid: string) {
  await SETTINGS_REF().set({ templates: { [status]: { subject, body } }, updatedAt: new Date(), updatedBy: adminUid }, { merge: true });
}
