"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LogoLink } from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/team", label: "People" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F2EA]/95 backdrop-blur-md shadow-sm py-2"
          : "bg-[#F7F2EA] py-4"
      } border-b border-[#e8d8c8]`}
    >
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between gap-8">
        {/* The logo mark acts as the "D" in DEBAGERI. */}
        <LogoLink height={scrolled ? 22 : 28} />

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex flex-1 justify-center items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#5a4535] hover:text-[#3D3027] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#3D3027] px-5 py-2 text-sm font-medium text-[#F7F2EA] hover:bg-[#5a4535] transition-colors whitespace-nowrap"
          >
            View Open Positions
            <ArrowRight />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-[#e8d8c8] transition-colors"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((p) => !p)}
        >
          <span className={`block h-0.5 w-5 bg-[#3D3027] transition-transform origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[#3D3027] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[#3D3027] transition-transform origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="md:hidden border-t border-[#e8d8c8] px-6 py-5 flex flex-col gap-4 bg-[#F7F2EA]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-base font-medium text-[#3D3027]" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/careers"
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#3D3027] px-5 py-2.5 text-sm font-medium text-[#F7F2EA]"
            onClick={() => setMenuOpen(false)}
          >
            View Open Positions <ArrowRight />
          </Link>
        </nav>
      )}
    </header>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
