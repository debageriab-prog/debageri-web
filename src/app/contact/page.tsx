import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
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
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <ContactCircuit className="pointer-events-none absolute inset-0 h-full w-full text-[#c4a98e] opacity-25" />
          <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
            <FadeIn>
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a63]">
                  Contact
                </p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#3D3027] md:text-6xl">
                  Let&apos;s make something useful.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#7a5e4a]">
                  Have a project, an opportunity, or simply a good question? Tell
                  us what is on your mind and we will get back to you.
                </p>

                <div className="mt-10 border-t border-[#e8d8c8] pt-8">
                  <p className="text-sm font-semibold text-[#3D3027]">
                    Prefer your own inbox?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#7a5e4a]">
                    You can also write directly to
                  </p>
                  <a
                    href="mailto:info@debageri.se"
                    className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-[#3D3027] underline decoration-[#c4a98e] underline-offset-4 transition-colors hover:text-[#5a4535]"
                  >
                    info@debageri.se
                    <ArrowUpRightIcon />
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-3 text-sm text-[#9a7a63]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8d8c8] text-[#5a4535]">
                    <PinIcon />
                  </span>
                  Gothenburg, Sweden
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-6 shadow-[0_20px_60px_rgba(61,48,39,0.07)] sm:p-9 md:p-12">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a63]">
                      Send a message
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#3D3027]">
                      What can we help with?
                    </h2>
                  </div>
                  <span className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#3D3027] text-[#F7F2EA] sm:flex">
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

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M4 11 11 4M5 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactCircuit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 760" fill="none" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <path d="M0 112h182l58 58h162l54-54h158" stroke="currentColor" />
      <path d="M1440 612h-206l-64-64h-166l-58 58H804" stroke="currentColor" />
      <path d="M1138 0v136l-48 48v102M274 760V622l56-56v-104" stroke="currentColor" />
      <circle cx="614" cy="116" r="5" fill="currentColor" />
      <circle cx="804" cy="606" r="5" fill="currentColor" />
      <circle cx="330" cy="462" r="5" fill="currentColor" />
      <circle cx="1090" cy="286" r="5" fill="currentColor" />
    </svg>
  );
}
