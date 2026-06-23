"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]" aria-hidden>
      <rect x="8" y="4" width="8" height="4" rx="1" />
      <path d="M8 6H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" strokeLinecap="round" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" />
    </svg>
  );
}
function IconBot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]" aria-hidden>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4M9 13h.01M15 13h.01" strokeLinecap="round" />
    </svg>
  );
}

const BUILD_STEPS = [
  { icon: <IconClipboard />, label: "Scope" },
  { icon: <IconGear />, label: "Build" },
  { icon: <IconBot />, label: "AI Live" },
];

const TIMELINE = ["Day 1", "Week 2", "Live", "Scale ∞"];

export default function AnimatedSequence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-5 shadow-elevated backdrop-blur-sm">
      <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-[0.3em] uppercase mb-4">
        How It Works — Animated
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-3"
      >
        {/* Phase 1 — Tell Us */}
        <motion.div
          variants={card}
          className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elevated)] p-4"
        >
          <p className="font-mono text-[9px] text-brand tracking-[0.2em] uppercase font-semibold mb-3">
            Phase 1 · Tell Us What You Need
          </p>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
            <span className="text-[13px] text-[var(--text-secondary)]">
              &ldquo;I need AI to automate my sales workflow...&rdquo;
            </span>
          </div>
          <div className="h-1 rounded-full bg-[var(--hairline-strong)] overflow-hidden">
            <motion.div
              className="h-full bg-brand rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: "70%" } : { width: 0 }}
              transition={{ delay: reduce ? 0 : 0.7, duration: reduce ? 0 : 0.9, ease: EASE }}
            />
          </div>
        </motion.div>

        {/* Phase 2 — We Build */}
        <motion.div
          variants={card}
          className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elevated)] p-4"
        >
          <p className="font-mono text-[9px] text-brand tracking-[0.2em] uppercase font-semibold mb-4">
            Phase 2 · We Build The Solution
          </p>
          <div className="flex items-center justify-between gap-2">
            {BUILD_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <motion.div
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ delay: reduce ? 0 : 0.8 + i * 0.18, duration: 0.35, ease: EASE }}
                >
                  <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-[9px] font-semibold text-[var(--text-secondary)]">
                    {step.label}
                  </span>
                </motion.div>
                {i < BUILD_STEPS.length - 1 && (
                  <span className="text-[var(--text-muted)] text-sm mb-4" aria-hidden>→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phase 3 — Scale */}
        <motion.div
          variants={card}
          className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elevated)] p-4"
        >
          <p className="font-mono text-[9px] text-brand tracking-[0.2em] uppercase font-semibold mb-4">
            Phase 3 · You Scale
          </p>
          <div className="relative">
            <div className="absolute top-2 left-2 right-2 h-px bg-[var(--hairline-strong)] rounded-full" />
            <motion.div
              className="absolute top-2 left-2 h-px bg-brand rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: "72%" } : { width: 0 }}
              transition={{ delay: reduce ? 0 : 1.3, duration: reduce ? 0 : 1, ease: EASE }}
            />
            <div className="relative flex justify-between">
              {TIMELINE.map((label, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: reduce ? 0 : 1.2 + i * 0.12 }}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 ${
                      i < 3 ? "bg-brand border-brand" : "bg-transparent border-[var(--text-muted)]"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-semibold ${
                      i < 3 ? "text-brand" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
