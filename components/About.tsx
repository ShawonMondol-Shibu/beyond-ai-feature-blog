"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { TEAM } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="section-pad container-page">
      <Reveal as="span" className="eyebrow block mb-4">
        Who We Are
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-primary)] mb-14 max-w-3xl">
          Built at the intersection of{" "}
          <em className="text-brand">engineering and revenue.</em>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
            className="surface-card p-8"
          >
            <span className="inline-block rounded-full border border-[var(--hairline-strong)] px-3 py-1 font-mono text-[10px] tracking-[0.15em] uppercase text-brand mb-5">
              {member.role}
            </span>
            <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-6">
              {member.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--hairline)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
