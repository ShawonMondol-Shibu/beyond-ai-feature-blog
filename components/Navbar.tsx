"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Section anchors (#services, …) only exist on the homepage. When viewing
  // another route (e.g. /blog), resolve them to the homepage so they navigate
  // there instead of dead-ending on the current page.
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg)]/70 backdrop-blur-xl border-b border-[var(--hairline)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href={isHome ? "#" : "/"}
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Beyond AI"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href)}
              className="relative text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-brand after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: toggle + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          <a
            href={CONTACT.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-cta px-4 py-2 text-[13px] font-semibold text-white shadow-cta-sm transition-all duration-200 hover:shadow-cta hover:-translate-y-0.5"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-px bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-px bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--hairline)] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href)}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-brand transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--hairline)]">
            <ThemeToggle />
            <a
              href={CONTACT.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-cta px-4 py-2 text-[13px] font-semibold text-white"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
