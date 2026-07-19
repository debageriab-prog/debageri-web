import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e8d8c8] bg-[#F7F2EA]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="flex items-center gap-2">
              <BugIcon />
              <span className="font-semibold text-[#3D3027] tracking-tight">Debageri AB</span>
            </div>
            <p className="text-sm text-[#9a7a63] leading-relaxed">
              A debug bakery. Senior engineers. Real work.
              <br />
              Gothenburg, Sweden.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7a5e4a] hover:text-[#3D3027] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-[#e8d8c8] flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[#9a7a63]">
            © {currentYear} Debageri AB. Registered in Sweden.
          </p>
          <p className="text-xs text-[#c4a98e]" aria-label="Debug bakery tagline">
            {"{ debug: true, bakery: true }"}
          </p>
        </div>
      </div>
    </footer>
  );
}

function BugIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="7" fill="#3D3027" />
      <ellipse cx="14" cy="15" rx="5.5" ry="6.5" fill="#F7F2EA" />
      <circle cx="14" cy="8.5" r="2.5" fill="#F7F2EA" />
      <line x1="12" y1="6.5" x2="9.5" y2="4" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="6.5" x2="18.5" y2="4" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8.5" y1="13" x2="6" y2="11.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8.5" y1="15.5" x2="6" y2="15.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8.5" y1="18" x2="6" y2="19.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19.5" y1="13" x2="22" y2="11.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19.5" y1="15.5" x2="22" y2="15.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19.5" y1="18" x2="22" y2="19.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="10" x2="14" y2="21" stroke="#3D3027" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
