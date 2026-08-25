import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Debageri AB handles personal data and analytics cookies.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Privacy"
          titleId="privacy-heading"
          title={
            <>
              Your information, handled{" "}
              <em className="not-italic text-[#E8833A]">with care.</em>
            </>
          }
          lede={
            <p>
              Debageri AB processes the information you provide to evaluate and
              manage your job application. This can include your contact details,
              LinkedIn profile, resume, the position you applied for, and our
              recruitment status.
            </p>
          }
        />

        <section className="bg-[#fdfaf6] px-6 py-16 md:py-24">
          <article className="mx-auto max-w-3xl">
            <FadeIn className="fi-blur">
              <div className="space-y-8 rounded-2xl border border-[#e8d8c8] bg-[#F7F2EA] p-7 sm:p-10">
                <Section title="Why we use it">
                  We use applicant data only for recruitment: reviewing your
                  experience, contacting you, and managing the hiring process.
                </Section>
                <Section title="Who can access it">
                  Access is restricted to authorised Debageri administrators.
                  Resumes are private and available through time-limited download
                  links.
                </Section>
                <Section title="Analytics cookies">
                  With your permission, we use Google Analytics 4 to understand
                  visits and which pages are viewed. Google may process information
                  such as page URLs, approximate location, device details, and
                  analytics identifiers. Analytics remains disabled unless you
                  accept it. You can change your choice at any time through Cookie
                  settings in the footer.
                </Section>
                <Section title="Retention and your rights">
                  We retain application data only as long as needed for recruitment
                  and applicable legal obligations. You may request access,
                  correction, or deletion by emailing{" "}
                  <a
                    href="mailto:info@debageri.se"
                    className="font-semibold text-[#B85F1E] underline decoration-[#E8833A]/40 underline-offset-2 transition-colors hover:decoration-[#E8833A]"
                  >
                    info@debageri.se
                  </a>
                  .
                </Section>
              </div>
            </FadeIn>
            <p className="mt-6 text-xs text-[#9a7a63]">Last updated: 11 August 2026</p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-lg font-bold tracking-tight text-[#3D3027]">{title}</h2>
      <p className="mt-2.5 leading-relaxed text-[#7a5e4a]">{children}</p>
    </section>
  );
}
