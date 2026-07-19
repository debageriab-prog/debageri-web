import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-[#3D3027] md:text-5xl">
            Open positions
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#7a5e4a]">
            We&apos;re not actively hiring right now, but we&apos;re always
            interested in talking to great engineers. Reach out at{" "}
            <a
              href="mailto:info@debageri.se"
              className="font-medium text-[#3D3027] underline underline-offset-2 hover:text-[#5a4535]"
            >
              info@debageri.se
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
