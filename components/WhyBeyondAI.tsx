"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { STATS, DIFFERENTIATORS } from "@/lib/constants";
import useCountUp from "@/hooks/useCountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

function StatCounter({
  stat,
  active,
}: {
  stat: (typeof STATS)[number];
  active: boolean;
}) {
  const count = useCountUp({ target: stat.value, active });
  return (
    <div className="text-center">
      <p className="font-display text-5xl md:text-6xl text-[var(--text-primary)] mb-2 tabular-nums">
        {"prefix" in stat ? stat.prefix : ""}
        {count}
        {stat.suffix}
      </p>
      <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase">
        {stat.label}
      </p>
    </div>
  );
}

export default function WhyBeyondAI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <section id="why" className="section-pad grid-bg">
      <div ref={ref} className="container-page">
        <Reveal as="span" className="eyebrow block mb-4">
          Why Beyond AI
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-primary)] mb-16 max-w-3xl">
            Built differently. <em className="text-brand">By design.</em>
          </h2>
        </Reveal>

        {/* Animated stats */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          className="flex flex-wrap justify-center gap-14 md:gap-28 mb-20 py-14 border-y border-[var(--hairline)]"
        >
          {STATS.map((stat) => (
            <StatCounter key={stat.label} stat={stat} active={inView} />
          ))}
        </motion.div>

        {/* Differentiator cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
              className="surface-card p-8"
            >
              <div className="w-8 h-0.5 bg-brand mb-5" />
              <h3 className="font-display text-xl text-[var(--text-primary)] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
