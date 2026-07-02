"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSequence from "./AnimatedSequence";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: (reduce: boolean) => (reduce ? { opacity: 0 } : { opacity: 0, y: 24 }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.65, ease: EASE },
  }),
};

const HERO_STATS = [
  { value: "10+", label: "Services" },
  { value: "$1K", label: "Starting" },
  { value: "100%", label: "Production-Ready" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen grid-bg flex items-center pt-24 overflow-hidden"
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[36rem] w-[36rem] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent-glow), transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto w-full px-6 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center z-10">
        {/* Left column */}
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate="visible"
            className="eyebrow mb-6"
          >
            AI INTEGRATION · REVENUE ENGINEERING
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate="visible"
            className="display text-[clamp(2.75rem,6vw,5rem)] text-[var(--text-primary)] mb-7"
          >
            We don&apos;t just{" "}
            <span className="text-[var(--text-muted)]">add AI</span> to your
            business.
            <br />
            We <em className="text-brand">rebuild</em>&nbsp;it around&nbsp;it.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate="visible"
            className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-md"
          >
            Autonomous agents, seamless integrations, and revenue systems that
            run while you sleep.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate="visible"
            className="flex flex-wrap gap-4 mb-14"
          >
            <Link href="#services" className="btn-primary">
              See Our Services
            </Link>
            <Link href="#how-it-works" className="btn-ghost">
              Watch How It Works
              <span aria-hidden>↓</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate="visible"
            className="flex gap-10 pt-8 border-t border-[var(--hairline)]"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl text-[var(--text-primary)] tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — Animated Sequence */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
        >
          <AnimatedSequence />
        </motion.div>
      </div>
    </section>
  );
}




