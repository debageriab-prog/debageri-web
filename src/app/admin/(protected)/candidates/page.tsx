import type { Metadata } from "next";
import Link from "next/link";
import { CandidateStatusEditor } from "@/components/CandidateStatusEditor";
import { DeleteCandidateButton } from "@/components/DeleteCandidateButton";
import { getApplications } from "@/lib/applications";
import { getEmailSettings, getEmailTemplates } from "@/lib/email-settings";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/types/application";

export const metadata: Metadata = { title: "Candidates" };

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const requested = (await searchParams).status;
  const status = APPLICATION_STATUSES.includes(requested as ApplicationStatus)
    ? (requested as ApplicationStatus)
    : undefined;
  const [applications, templates, emailSettings] = await Promise.all([
    getApplications(status),
    getEmailTemplates(),
    getEmailSettings(),
  ]);
  const emailConfigured = Boolean(
    emailSettings.host && emailSettings.fromEmail && emailSettings.hasPassword,
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#3D3027] md:text-4xl">
          Candidates
        </h1>
        <p className="mt-2 text-sm text-[#7a5e4a]">
          Review applicants, their position, resume, and hiring status.
        </p>
      </div>
      {!emailConfigured && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e8d8c8] bg-[#f0e8dc] px-5 py-4">
          <p className="text-sm text-[#5a4535]">
            <span className="font-semibold">
              Candidate email is not configured.
            </span>{" "}
            Add your SMTP connection to send status updates.
          </p>
          <Link
            href="/admin/settings/email"
            className="rounded-full bg-[#3D3027] px-4 py-2 text-xs font-semibold text-[#F7F2EA]"
          >
            Configure email
          </Link>
        </div>
      )}
      <nav
        aria-label="Filter candidates"
        className="mt-8 flex gap-2 overflow-x-auto pb-2"
      >
        {["all", ...APPLICATION_STATUSES].map((item) => (
          <Link
            key={item}
            href={
              item === "all"
                ? "/admin/candidates"
                : `/admin/candidates?status=${item}`
            }
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium capitalize ${item === (status ?? "all") ? "border-[#3D3027] bg-[#3D3027] text-[#F7F2EA]" : "border-[#e8d8c8] bg-[#fdfaf6] text-[#7a5e4a]"}`}
          >
            {item}
          </Link>
        ))}
      </nav>
      <div className="mt-6 space-y-4">
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] px-6 py-20 text-center">
            <p className="font-semibold">No candidates here.</p>
            <p className="mt-2 text-sm text-[#9a7a63]">
              New applications will appear here.
            </p>
          </div>
        ) : (
          applications.map((application) => (
            <article
              key={application.id}
              className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold">
                      {application.firstName} {application.lastName}
                    </h2>
                    <span className="rounded-full bg-[#e8d8c8] px-2.5 py-1 text-xs font-semibold capitalize text-[#5a4535]">
                      {application.status}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-[#5a4535]">
                    {application.jobTitle}{" "}
                    <span className="font-mono text-xs font-normal text-[#9a7a63]">
                      ({application.jobId})
                    </span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#7a5e4a]">
                    <a
                      href={`mailto:${application.email}`}
                      className="underline underline-offset-2"
                    >
                      {application.email}
                    </a>
                    <a
                      href={`tel:${application.phoneCountry}${application.phoneNumber.replace(/\D/g, "")}`}
                      className="underline underline-offset-2"
                    >
                      {application.phoneCountry} {application.phoneNumber}
                    </a>
                    <a
                      href={application.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2"
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                  <p className="mt-4 text-xs text-[#9a7a63]">
                    Applied {formatDate(application.createdAt)} · Consent
                    recorded {formatDate(application.consentedAt)}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={`/api/admin/applications/${application.id}/resume`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-[#c4a98e] px-4 py-2.5 text-center text-sm font-semibold text-[#5a4535]"
                  >
                    Open {application.resumeFileName} ↗
                  </a>
                  <CandidateStatusEditor
                    key={`${application.id}-${application.statusUpdatedAt?.getTime() ?? 0}`}
                    application={application}
                    templates={templates}
                    emailConfigured={emailConfigured}
                  />
                  <DeleteCandidateButton
                    candidateId={application.id}
                    candidateName={`${application.firstName} ${application.lastName}`}
                  />
                </div>
              </div>
              <div className="mt-5 border-t border-[#e8d8c8] pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a63]">
                  Latest candidate email
                </p>
                {application.lastEmailSentAt && application.lastEmailSubject ? (
                  <p className="mt-1 text-sm text-[#5a4535]">
                    <span className="font-semibold">
                      {application.lastEmailSubject}
                    </span>
                    <span className="text-[#9a7a63]">
                      {" "}
                      · Sent {formatDate(application.lastEmailSentAt)}
                    </span>
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-[#9a7a63]">
                    No status email has been sent.
                  </p>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-SE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
