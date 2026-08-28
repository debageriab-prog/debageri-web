import Link from "next/link";
import { LogoLink } from "@/components/Logo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { ArrowUpIcon } from "@/components/icons";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/team", label: "People" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://linkedin.com/company/debageri",
    label: "Debageri on LinkedIn",
    icon: <LinkedInIcon />,
  },
  {
    href: "https://github.com/debageriab-prog",
    label: "Debageri on GitHub",
    icon: <GitHubIcon />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#050509]">
      {/* Warm light carried down from the page above; the wordmark sits in the glow. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8833A]/45 to-transparent" />
        <div className="absolute -top-32 left-[8%] h-72 w-[36rem] max-w-full rounded-full bg-[#E8833A]/[0.07] blur-3xl" />
        <div className="absolute -bottom-40 right-[-4rem] h-80 w-80 rounded-full bg-[#B85F1E]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1.2fr] md:gap-10 lg:gap-16">
          {/* Brand */}
          <div className="max-w-sm">
            <LogoLink height={26} color="#E8833A" />
            <p className="mt-6 text-sm leading-relaxed text-[#9A9089]">
              A Swedish IT consultancy for senior engineers. We believe in
              freedom, trust and flexibility — you decide how to make the most
              of what you earn.
            </p>
            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#23232E] bg-[#0C0C14] text-[#C7BFB4] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8833A]/55 hover:text-[#E8833A] hover:shadow-[0_10px_26px_-10px_rgba(232,131,58,0.6)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <h2 className="font-display text-xs font-bold tracking-[0.22em] text-[#D08A4F] uppercase">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-[#C7BFB4] transition-colors hover:text-[#F7F2EA]"
                  >
                    {/* Fixed-width rule: scaling it keeps the label from shifting. */}
                    <span
                      aria-hidden="true"
                      className="h-px w-4 origin-left scale-x-0 bg-[#E8833A] transition-transform duration-300 group-hover:scale-x-100"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-display text-xs font-bold tracking-[0.22em] text-[#D08A4F] uppercase">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-4" role="list">
              <li>
                <a
                  href="mailto:info@debageri.se"
                  className="group flex items-start gap-3 transition-colors"
                  aria-label="Email Debageri"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E8833A]/25 bg-[#E8833A]/10 text-[#E8833A] transition-colors group-hover:border-[#E8833A]/60 group-hover:bg-[#E8833A]/15">
                    <MailIcon />
                  </span>
                  <span>
                    <span className="block text-xs text-[#7C736C]">Email</span>
                    <span className="block text-sm text-[#C7BFB4] transition-colors group-hover:text-[#E8833A]">
                      info@debageri.se
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#23232E] bg-[#0C0C14] text-[#9A9089]">
                  <PinIcon />
                </span>
                <span>
                  <span className="block text-xs text-[#7C736C]">Based in</span>
                  <span className="block text-sm text-[#C7BFB4]">Gothenburg, Sweden</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#23232E] bg-[#0C0C14] text-[#9A9089]">
                  <IdIcon />
                </span>
                <span>
                  <span className="block text-xs text-[#7C736C]">Debageri AB</span>
                  <span className="block text-sm text-[#C7BFB4]">Org.nr 559555-8429</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-[#20202B] to-transparent" />
        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#7C736C]">
            © {currentYear} Debageri AB. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <CookieSettingsButton />
            <Link
              href="/privacy"
              className="text-xs text-[#C7BFB4] underline-offset-4 transition-colors hover:text-[#E8833A] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8833A]"
            >
              Privacy policy
            </Link>
            {/* "#top" needs no target element — browsers treat it as the document start. */}
            <a
              href="#top"
              aria-label="Back to top"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#23232E] bg-[#0C0C14] text-[#C7BFB4] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8833A]/55 hover:text-[#E8833A]"
            >
              <ArrowUpIcon size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, fading into the background it sits on. */}
      <p
        aria-hidden="true"
        className="footer-wordmark pointer-events-none relative -mb-[0.16em] select-none px-6 text-center font-display text-[clamp(3.5rem,17vw,12rem)] font-bold leading-[0.8] tracking-tight"
      >
        debageri
      </p>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.46-1.11-1.46-.907-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.097-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.392.1 2.646.64.698 1.028 1.59 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z" />
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
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18s6-5.686 6-10a6 6 0 1 0-12 0c0 4.314 6 10 6 10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="10" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IdIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7.5" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.8 13.6c.5-1.1 1.5-1.8 2.7-1.8s2.2.7 2.7 1.8M12.5 8.5h3.2M12.5 11.5h3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

