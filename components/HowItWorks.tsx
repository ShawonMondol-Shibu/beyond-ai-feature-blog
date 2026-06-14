"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { HOW_IT_WORKS } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="section-pad">
      <div ref={ref} className="container-page">
        <Reveal as="span" className="eyebrow block mb-4">
          The Process
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-primary)] mb-16 max-w-3xl">
            From conversation to{" "}
            <em className="text-brand">production in four steps.</em>
          </h2>
        </Reveal>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-[var(--hairline-strong)]" />
          <motion.div
            className="absolute top-7 left-[12.5%] h-px bg-brand origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: reduce ? 0 : 0.4, duration: reduce ? 0 : 1.1, ease: EASE }}
            style={{ width: "75%" }}
          />

          <div className="grid grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.55, ease: EASE }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)] flex items-center justify-center mb-5 relative z-10">
                  <span className="font-mono text-[13px] font-medium text-brand tabular-nums">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-lg text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-7 relative">
          <div className="absolute left-7 top-2 bottom-2 w-px bg-[var(--hairline-strong)]" />
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.45, ease: EASE }}
              className="flex gap-5 relative z-10"
            >
              <div className="w-14 h-14 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-xs font-medium text-brand tabular-nums">
                  {item.step}
                </span>
              </div>
              <div className="pt-2.5">
                <h3 className="font-display text-base text-[var(--text-primary)] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
