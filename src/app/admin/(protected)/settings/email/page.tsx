import type { Metadata } from "next";
import Link from "next/link";
import { getEmailSettings } from "@/lib/email-settings";
import { updateEmailSettings } from "../actions";

export const metadata: Metadata = { title: "Email settings" };

export default async function EmailSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, query] = await Promise.all([
    getEmailSettings(),
    searchParams,
  ]);
  const input =
    "mt-2 w-full rounded-xl border border-[#e8d8c8] bg-white px-4 py-3 text-sm placeholder:text-[#c4a98e]";
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 md:py-14">
      <Link
        href="/admin/settings"
        className="text-sm font-semibold text-[#7a5e4a]"
      >
        ← Settings
      </Link>
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
          Delivery
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Email settings
        </h1>
        <p className="mt-2 text-[#7a5e4a]">
          Connect the mailbox used to send candidate updates.
        </p>
      </div>
      {query.saved === "true" && (
        <p
          role="status"
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
        >
          Email settings saved.
        </p>
      )}
      <form
        action={updateEmailSettings}
        className="mt-8 overflow-hidden rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6]"
      >
        <section className="grid gap-6 border-b border-[#e8d8c8] p-6 md:grid-cols-2 md:p-8">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold">SMTP connection</h2>
            <p className="mt-1 text-sm text-[#7a5e4a]">
              Credentials are encrypted before they are stored.
            </p>
          </div>
          <label className="text-sm font-semibold">
            SMTP host
            <input
              className={input}
              name="host"
              required
              defaultValue={settings.host}
              placeholder="smtp.example.com"
            />
          </label>
          <label className="text-sm font-semibold">
            Port
            <input
              className={input}
              name="port"
              required
              type="number"
              min="1"
              max="65535"
              defaultValue={settings.port}
            />
          </label>
          <label className="text-sm font-semibold">
            Username
            <input
              className={input}
              name="username"
              required
              autoComplete="username"
              defaultValue={settings.username}
            />
          </label>
          <label className="text-sm font-semibold">
            Password
            <input
              className={input}
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder={
                settings.hasPassword
                  ? "Leave blank to keep saved password"
                  : "SMTP password"
              }
              required={!settings.hasPassword}
            />
          </label>
          <label className="flex items-center gap-3 text-sm font-medium md:col-span-2">
            <input
              className="size-4 accent-[#3D3027]"
              name="secure"
              type="checkbox"
              defaultChecked={settings.secure}
            />
            Use implicit TLS (usually port 465)
          </label>
        </section>
        <section className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold">Sender identity</h2>
            <p className="mt-1 text-sm text-[#7a5e4a]">
              This is how your messages appear in a candidate’s inbox.
            </p>
          </div>
          <label className="text-sm font-semibold">
            From name
            <input
              className={input}
              name="fromName"
              required
              defaultValue={settings.fromName}
            />
          </label>
          <label className="text-sm font-semibold">
            From email
            <input
              className={input}
              name="fromEmail"
              type="email"
              required
              defaultValue={settings.fromEmail}
              placeholder="careers@debageri.se"
            />
          </label>
          <label className="text-sm font-semibold md:col-span-2">
            Reply-to email{" "}
            <span className="font-normal text-[#9a7a63]">(optional)</span>
            <input
              className={input}
              name="replyTo"
              type="email"
              defaultValue={settings.replyTo}
            />
          </label>
          <label className="text-sm font-semibold md:col-span-2">
            New application notification email{" "}
            <span className="font-normal text-[#9a7a63]">(optional)</span>
            <input
              className={input}
              name="adminNotificationEmail"
              type="email"
              defaultValue={settings.adminNotificationEmail}
              placeholder="admin@debageri.se"
            />
            <span className="mt-2 block text-xs font-normal text-[#9a7a63]">
              A notification is sent here after a candidate successfully
              applies.
            </span>
          </label>
        </section>
        <div className="flex justify-end border-t border-[#e8d8c8] bg-[#F7F2EA]/60 px-6 py-4 md:px-8">
          <button className="rounded-full bg-[#3D3027] px-6 py-3 text-sm font-semibold text-[#F7F2EA] hover:bg-[#5a4535]">
            Save email settings
          </button>
        </div>
      </form>
    </main>
  );
}
