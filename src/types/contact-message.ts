export const CONTACT_MESSAGE_STATUSES = [
  "unread",
  "read",
  "replied",
  "ignored",
] as const;

export type ContactMessageStatus = (typeof CONTACT_MESSAGE_STATUSES)[number];

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: Date;
  updatedAt: Date;
  statusUpdatedAt: Date | null;
  statusUpdatedBy: string | null;
  expiresAt: Date;
}

export interface ContactSubmission {
  fullName: string;
  email: string;
  message: string;
  website: string;
}

export type ContactFieldErrors = Partial<
  Record<keyof Pick<ContactSubmission, "fullName" | "email" | "message">, string>
>;
