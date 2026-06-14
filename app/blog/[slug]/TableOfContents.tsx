"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-28 self-start w-60 shrink-0">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-5">
          On this page
        </p>
        <ul className="flex flex-col border-l border-[var(--hairline)]">
          {headings.map((h) => {
            const active = activeId === h.id;
            return (
              <li key={h.id} className="relative">
                {active && (
                  <span className="absolute -left-px top-0 bottom-0 w-0.5 bg-brand" />
                )}
                <a
                  href={`#${h.id}`}
                  className={`block py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-150 ${
                    active
                      ? "text-brand font-medium"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: collapsible inline */}
      <div className="lg:hidden surface-card hover:!border-[var(--hairline)] p-4 mb-8 w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)]"
          aria-expanded={isOpen}
        >
          On this page
          <span className="text-brand" aria-hidden>{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <ul className="flex flex-col gap-2.5 mt-4">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-[var(--text-secondary)] hover:text-brand transition-colors"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
