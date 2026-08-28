import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Debageri AB about software consulting, careers, or collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Contact"
          titleId="contact-heading"
          title={
            <>
              Let&apos;s make something{" "}
              <em className="not-italic text-[#E8833A]">useful.</em>
            </>
          }
          lede={
            <p>
              Have a project, an opportunity, or simply a good question? Tell us
              what is on your mind and we will get back to you.
            </p>
          }
        >
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="mailto:info@debageri.se"
              className="group inline-flex items-center gap-3 text-[#F7F2EA] transition-colors hover:text-[#E8833A]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 text-[#E8833A] transition-colors group-hover:border-[#E8833A]/60">
                <MailIcon />
              </span>
              <span className="text-lg font-semibold">info@debageri.se</span>
            </a>
            <span className="inline-flex items-center gap-3 text-sm text-[#9A9089]">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2A2A38] bg-[#12121B] text-[#9A9089]"
                aria-hidden="true"
              >
                <PinIcon />
              </span>
              Gothenburg, Sweden
            </span>
          </div>
        </PageHero>

        <section aria-labelledby="message-heading" className="bg-[#fdfaf6] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <FadeIn className="fi-blur">
              <div className="rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-6 shadow-[0_20px_60px_rgba(61,48,39,0.07)] sm:p-9 md:p-12">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#B85F1E]">
                      Send a message
                    </p>
                    <h2
                      id="message-heading"
                      className="mt-3 font-display text-2xl font-bold tracking-tight text-[#3D3027] md:text-3xl"
                    >
                      What can we help with?
                    </h2>
                  </div>
                  <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 text-[#B85F1E] sm:flex">
                    <MessageIcon />
                  </span>
                </div>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function MessageIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 8h9M7 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="m3 6 7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
