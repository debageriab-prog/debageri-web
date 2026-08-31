import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { DeleteMessageButton } from "@/components/DeleteMessageButton";
import { MessageReplyEditor } from "@/components/MessageReplyEditor";
import { notFound } from "next/navigation";
import { FieldValue } from "firebase-admin/firestore";
import { requireAdminSession } from "@/lib/admin-session";
import { getContactMessage } from "@/lib/contact-messages";
import { getAdminDb } from "@/lib/firebase/admin";
import { getContactReplyTemplate, getEmailSettings } from "@/lib/email-settings";
import { renderContactReplyTemplate } from "@/lib/email-templates";
import type { ContactMessageStatus } from "@/types/contact-message";
import { updateMessageStatus } from "@/app/admin/(protected)/messages/actions";

export const metadata: Metadata = { title: "Message details" };

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminSession();
  const { id } = await params;
  const message = await getContactMessage(id);
  if (!message) notFound();

  const [template, emailSettings] = await Promise.all([
    getContactReplyTemplate(),
    getEmailSettings(),
  ]);

  if (message.status === "unread") {
    await getAdminDb().collection("contactMessages").doc(id).update({
      status: "read",
      updatedAt: FieldValue.serverTimestamp(),
      statusUpdatedAt: FieldValue.serverTimestamp(),
      statusUpdatedBy: admin.uid,
    });
    message.status = "read";
  }

  const mergeData = {
    contactName: message.fullName,
    contactEmail: message.email,
    companyName: "Debageri AB",
  };
  const emailConfigured = Boolean(
    emailSettings.host && emailSettings.fromEmail && emailSettings.hasPassword,
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 md:py-14">
      <Link href="/admin/messages" className="inline-flex items-center gap-2 text-sm font-medium text-[#7a5e4a] hover:text-[#3D3027]">
        <ArrowLeftIcon /> Back to messages
      </Link>

      <article className="mt-6 overflow-hidden rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6]">
        <header className="border-b border-[#e8d8c8] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a63]">From</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#3D3027]">{message.fullName}</h1>
              <a href={`mailto:${message.email}`} className="mt-2 inline-block text-sm text-[#7a5e4a] underline decoration-[#c4a98e] underline-offset-4 hover:text-[#3D3027]">
                {message.email}
              </a>
            </div>
            <div className="sm:text-right">
              <StatusBadge status={message.status} />
              <time dateTime={message.createdAt.toISOString()} className="mt-2 block text-xs text-[#9a7a63]">
                {formatFullDate(message.createdAt)}
              </time>
            </div>
          </div>
        </header>

        <div className="p-6 sm:p-8">
          <p className="whitespace-pre-wrap text-base leading-8 text-[#5a4535]">{message.message}</p>
        </div>

        <footer className="flex flex-col gap-4 border-t border-[#e8d8c8] bg-[#F7F2EA] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-2">
            <MessageReplyEditor
              message={message}
              subject={renderContactReplyTemplate(template.subject, mergeData)}
              body={renderContactReplyTemplate(template.body, mergeData)}
              emailConfigured={emailConfigured}
            />
            <DeleteMessageButton messageId={id} senderName={message.fullName} />
          </div>
          <div className="flex flex-wrap gap-2">
            {message.status !== "read" && <StatusButton id={id} status="read" label="Mark read" />}
            {message.status !== "replied" && <StatusButton id={id} status="replied" label="Mark replied" />}
            {message.status !== "ignored" && <StatusButton id={id} status="ignored" label="Ignore" />}
          </div>
        </footer>
      </article>

      <p className="mt-4 text-xs text-[#9a7a63]">
        This message is scheduled for automatic deletion on {formatDateOnly(message.expiresAt)}.
      </p>
    </main>
  );
}

function StatusButton({ id, status, label }: { id: string; status: ContactMessageStatus; label: string }) {
  return (
    <form action={updateMessageStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className="rounded-lg border border-[#c4a98e] px-4 py-2 text-sm font-semibold text-[#3D3027] transition-colors hover:bg-[#e8d8c8]">
        {label}
      </button>
    </form>
  );
}

function StatusBadge({ status }: { status: ContactMessageStatus }) {
  const styles: Record<ContactMessageStatus, string> = {
    unread: "bg-[#e8d8c8] text-[#5a4535]",
    read: "bg-[#eee9e2] text-[#7a5e4a]",
    replied: "bg-[#dce8dc] text-[#476047]",
    ignored: "bg-[#eadfdb] text-[#765248]",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles[status]}`}>{status}</span>;
}

function formatFullDate(date: Date) {
  return new Intl.DateTimeFormat("en-SE", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function formatDateOnly(date: Date) {
  return new Intl.DateTimeFormat("en-SE", { dateStyle: "long" }).format(date);
}
