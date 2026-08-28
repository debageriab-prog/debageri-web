"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LogoMark } from "@/components/Logo";

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
  // Pages with no dark hero have nothing for a transparent bar to sit on, so they
  // stay solid throughout. Defaults to false so the bar renders solid before
  // hydration rather than flashing cream text over a light page.
  const [hasHero, setHasHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");

    const update = () => {
      setHasHero(hero !== null);
      setScrolled(window.scrollY > 8);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const solid = scrolled || !hasHero;

  return (
    <header
      // Fixed rather than sticky: a transparent bar must occupy no layout space at
      // all, or the body colour shows through the gap it reserves.
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"} ${
        solid ? "bg-[#0B0B12]/75 backdrop-blur-md shadow-sm shadow-black/30" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between gap-8">
        <Link
          href="/"
          aria-label="Debageri AB home"
          className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-75"
        >
          <LogoMark size={scrolled ? 26 : 32} color="#E8833A" />
          <span className="font-display text-xl font-bold tracking-tight text-[#F7F2EA] md:text-[1.35rem]">
            Debageri
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex flex-1 justify-center items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#C7BFB4] hover:text-[#F7F2EA] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E8833A] px-5 py-2 text-sm font-medium text-[#E8833A] hover:bg-[#E8833A] hover:text-[#2A1B0E] transition-colors whitespace-nowrap"
          >
            View Open Positions
            <ArrowRight />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-[#1A1A24] transition-colors"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((p) => !p)}
        >
          <span className={`block h-0.5 w-5 bg-[#F7F2EA] transition-transform origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[#F7F2EA] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[#F7F2EA] transition-transform origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="md:hidden border-t border-[#1E1E2A] px-6 py-5 flex flex-col gap-4 bg-[#0B0B12]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-base font-medium text-[#F7F2EA]" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/careers"
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E8833A] px-5 py-2.5 text-sm font-medium text-[#E8833A]"
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
