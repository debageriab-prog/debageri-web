"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F7F2EA]/90 backdrop-blur-sm border-b border-[#e8d8c8]">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#3D3027] hover:opacity-80 transition-opacity focus-visible:rounded"
          aria-label="Debageri AB — home"
        >
          <DebageriLogo />
          <span className="font-semibold text-lg tracking-tight">Debageri</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#7a5e4a] hover:text-[#3D3027] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/careers"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-[#3D3027] px-5 py-2 text-sm font-medium text-[#F7F2EA] hover:bg-[#5a4535] transition-colors"
          >
            We&apos;re hiring
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-[#e8d8c8] transition-colors"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-0.5 w-5 bg-[#3D3027] transition-transform origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#3D3027] transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#3D3027] transition-transform origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="md:hidden border-t border-[#e8d8c8] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-[#3D3027] hover:text-[#7a5e4a] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/careers"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#3D3027] px-5 py-2.5 text-sm font-medium text-[#F7F2EA] hover:bg-[#5a4535] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            We&apos;re hiring
          </Link>
        </nav>
      )}
    </header>
  );
}

function DebageriLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded square background */}
      <rect width="28" height="28" rx="7" fill="#3D3027" />
      {/* Bug body — stylised circuit/bread shape */}
      <ellipse cx="14" cy="15" rx="5.5" ry="6.5" fill="#F7F2EA" />
      {/* Bug head */}
      <circle cx="14" cy="8.5" r="2.5" fill="#F7F2EA" />
      {/* Antenna left */}
      <line x1="12" y1="6.5" x2="9.5" y2="4" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      {/* Antenna right */}
      <line x1="16" y1="6.5" x2="18.5" y2="4" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      {/* Legs */}
      <line x1="8.5" y1="13" x2="6" y2="11.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8.5" y1="15.5" x2="6" y2="15.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8.5" y1="18" x2="6" y2="19.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19.5" y1="13" x2="22" y2="11.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19.5" y1="15.5" x2="22" y2="15.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19.5" y1="18" x2="22" y2="19.5" stroke="#F7F2EA" strokeWidth="1.2" strokeLinecap="round" />
      {/* Center dividing line */}
      <line x1="14" y1="10" x2="14" y2="21" stroke="#3D3027" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
