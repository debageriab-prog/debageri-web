import Link from "next/link";
import { LogoLink } from "@/components/Logo";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/team", label: "People" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e8d8c8] bg-[#F7F2EA]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <LogoLink size={28} />
            <div className="text-sm text-[#7a5e4a] space-y-0.5">
              <p className="font-medium text-[#3D3027]">Debageri AB</p>
              <p>Gothenburg, Sweden</p>
              <p>Org.nr: 559594-5023</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@debageri.se"
                className="text-sm text-[#7a5e4a] hover:text-[#3D3027] transition-colors"
                aria-label="Email Debageri"
              >
                hello@debageri.se
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/debageri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7a5e4a] hover:text-[#3D3027] transition-colors"
                aria-label="Debageri on LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/debageriab-prog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7a5e4a] hover:text-[#3D3027] transition-colors"
                aria-label="Debageri on GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#7a5e4a] hover:text-[#3D3027] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-[#e8d8c8] flex items-center justify-between">
          <p className="text-xs text-[#9a7a63]">
            © {currentYear} Debageri AB. All rights reserved.
          </p>
        </div>
      </div>
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
