"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CONTACT } from "@/lib/constants";


const SERVICES_LIST = [
  "AI Systems Integration",
  "Autonomous Agent Development",
  "RAG & Knowledge Systems",
  "Full-Stack AI Application Dev",
  "AI Infrastructure & DevOps",
  "AI Agent Development & Deployment",
  "AI-Powered Sales Workflow Automation",
  "Fractional Sales Engineering",
  "Enterprise Demo & POC Engineering",
  "Technical Presales Consulting",
];

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-4-1L3 20l1.5-5.5a8.38 8.38 0 0 1-1-4A8.5 8.5 0 0 1 21 11.5Z" strokeLinejoin="round" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const inputClass =
  "w-full px-4 py-3 text-sm bg-[var(--bg)] backdrop-blur border border-[var(--hairline-strong)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors duration-200";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${CONTACT.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-pad container-page">
      <Reveal as="span" className="eyebrow block mb-4">
        Get Started
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-primary)] mb-4">
          Ready to build with AI?
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-base text-[var(--text-secondary)] mb-12 max-w-lg leading-relaxed">
          Pick your preferred way to reach us. We respond within 24 hours.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Reveal delay={0.15} className="surface-card p-8 hover:!border-[var(--hairline)] hover:!bg-[var(--surface)]">
          <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase mb-6">
            Send a Message
          </p>

          {status === "sent" ? (
            <div className="py-12 text-center">
              <p className="font-display text-3xl text-brand mb-2">Message sent.</p>
              <p className="text-sm text-[var(--text-secondary)]">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your name" required className={inputClass} />
              <input type="email" name="email" placeholder="Email address" required className={inputClass} />
              <select name="service" className={`${inputClass} text-[var(--text-muted)]`}>
                <option value="">Select a service (optional)</option>
                {SERVICES_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <textarea
                name="message"
                placeholder="Tell us what you need..."
                required
                rows={4}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full disabled:opacity-60 disabled:translate-y-0"
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
              {status === "error" && (
                <p className="text-xs text-red-400 text-center" role="alert">
                  Something went wrong. Please try emailing us directly.
                </p>
              )}
            </form>
          )}
        </Reveal>

        {/* Quick Reach — frosted glass cards */}
        <Reveal delay={0.2} className="flex flex-col gap-4 justify-center">
          <a
            href={CONTACT.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a Discovery Call"
            className="surface-card flex items-center gap-4 p-5"
          >
            <span className="w-12 h-12 bg-brand text-white rounded-xl flex items-center justify-center flex-shrink-0">
              <IconCalendar />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-[var(--text-primary)]">Book a Discovery Call</span>
              <span className="block text-xs text-[var(--text-muted)] mt-0.5">30 min · Free · Calendly</span>
            </span>
            <span className="text-brand text-lg" aria-hidden>→</span>
          </a>

          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="surface-card flex items-center gap-4 p-5"
          >
            <span className="w-12 h-12 bg-whatsapp/15 text-whatsapp border border-whatsapp/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <IconChat />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-[var(--text-primary)]">Chat on WhatsApp</span>
              <span className="block text-xs text-[var(--text-muted)] mt-0.5">{CONTACT.whatsappDisplay} · Quick replies</span>
            </span>
            <span className="text-whatsapp text-lg" aria-hidden>→</span>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Email Directly"
            className="surface-card flex items-center gap-4 p-5"
          >
            <span className="w-12 h-12 border border-[var(--hairline-strong)] text-[var(--text-secondary)] rounded-xl flex items-center justify-center flex-shrink-0">
              <IconMail />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-[var(--text-primary)]">Email Directly</span>
              <span className="block text-xs text-[var(--text-muted)] mt-0.5 truncate">{CONTACT.email}</span>
            </span>
            <span className="text-[var(--text-muted)] text-lg" aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
