"use client";

import { usePathname } from "next/navigation";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8.5h4V24h-4V8.5Zm7 0h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.8c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.76-2.6 3.58V24h-4V8.5Z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--bg-elevated)] backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <Link href={isHome ? "#" : "/"} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Beyond AI"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-7 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className="text-[13px] font-medium text-[var(--text-muted)] hover:text-brand transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* LinkedIn icons */}
          <div className="flex gap-2.5">
            <a
              href={CONTACT.linkedinTanmoy}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tanmoy on LinkedIn"
              className="w-9 h-9 rounded-lg border border-[var(--hairline-strong)] flex items-center justify-center text-[var(--text-muted)] hover:border-brand hover:text-brand transition-all duration-200"
            >
              <IconLinkedIn />
            </a>
            <a
              href={CONTACT.linkedinDipta}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dipta on LinkedIn"
              className="w-9 h-9 rounded-lg border border-[var(--hairline-strong)] flex items-center justify-center text-[var(--text-muted)] hover:border-brand hover:text-brand transition-all duration-200"
            >
              <IconLinkedIn />
            </a>
          </div>
        </div>

        <div className="border-t border-[var(--hairline)] pt-7 text-center">
          <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.2em]">
            © 2026 BEYOND AI · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
