import type { Metadata } from "next";
import Link from "next/link";
import {
  CONTACT_MESSAGE_STATUSES,
  type ContactMessageStatus,
} from "@/types/contact-message";
import {
  getContactMessageCounts,
  getContactMessages,
} from "@/lib/contact-messages";

export const metadata: Metadata = { title: "Messages" };

const filters = ["all", ...CONTACT_MESSAGE_STATUSES] as const;

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const requestedStatus = (await searchParams).status;
  const status = CONTACT_MESSAGE_STATUSES.includes(requestedStatus as ContactMessageStatus)
    ? (requestedStatus as ContactMessageStatus)
    : undefined;
  const [messages, counts] = await Promise.all([
    getContactMessages(status),
    getContactMessageCounts(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">Messages</h1>
          <p className="mt-2 text-sm text-[#7a5e4a]">Contact inquiries, newest first.</p>
        </div>
        <p className="text-sm text-[#9a7a63]">Showing up to 100 messages</p>
      </div>

      <nav aria-label="Filter messages by status" className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => {
          const isActive = filter === (status ?? "all");
          return (
            <Link
              key={filter}
              href={filter === "all" ? "/admin/messages" : `/admin/messages?status=${filter}`}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                isActive
                  ? "border-[#3D3027] bg-[#3D3027] text-[#F7F2EA]"
                  : "border-[#e8d8c8] bg-[#fdfaf6] text-[#7a5e4a] hover:border-[#c4a98e]"
              }`}
            >
              {filter} <span className="ml-1 opacity-70">{counts[filter]}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6]">
        {messages.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <p className="font-semibold text-[#3D3027]">No messages here.</p>
            <p className="mt-2 text-sm text-[#9a7a63]">New contact inquiries will appear in this inbox.</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#e8d8c8]" role="list">
            {messages.map((message) => (
              <li key={message.id}>
                <Link
                  href={`/admin/messages/${message.id}`}
                  className="grid gap-3 px-5 py-5 transition-colors hover:bg-[#F7F2EA] sm:grid-cols-[minmax(150px,0.7fr)_minmax(240px,1.5fr)_auto] sm:items-center sm:px-6"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {message.status === "unread" && <span className="h-2 w-2 flex-none rounded-full bg-[#9a7a63]" aria-label="Unread" />}
                      <p className={`truncate text-sm ${message.status === "unread" ? "font-semibold text-[#3D3027]" : "font-medium text-[#5a4535]"}`}>
                        {message.fullName}
                      </p>
                    </div>
                    <p className="mt-1 truncate text-xs text-[#9a7a63]">{message.email}</p>
                  </div>
                  <p className={`line-clamp-2 text-sm leading-relaxed ${message.status === "unread" ? "font-medium text-[#5a4535]" : "text-[#7a5e4a]"}`}>
                    {message.message}
                  </p>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <StatusBadge status={message.status} />
                    <time dateTime={message.createdAt.toISOString()} className="text-xs text-[#9a7a63]">
                      {formatDate(message.createdAt)}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: ContactMessageStatus }) {
  const styles: Record<ContactMessageStatus, string> = {
    unread: "bg-[#e8d8c8] text-[#5a4535]",
    read: "bg-[#eee9e2] text-[#7a5e4a]",
    replied: "bg-[#dce8dc] text-[#476047]",
    ignored: "bg-[#eadfdb] text-[#765248]",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[status]}`}>{status}</span>;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-SE", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
