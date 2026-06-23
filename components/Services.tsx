"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { TANMOY_SERVICES, DIPTA_SERVICES } from "@/lib/constants";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = { id: string; title: string; desc: string; price: string };

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
      className="surface-card group p-7 flex flex-col"
    >
      <div className="flex justify-between items-baseline mb-5">
        <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-[0.15em]">
          {service.id}
        </span>
        <span className="font-mono text-[11px] text-brand font-medium tabular-nums">
          {service.price}
        </span>
      </div>
      <h3 className="font-display text-xl text-[var(--text-primary)] mb-2.5 leading-snug">
        {service.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
        {service.desc}
      </p>
      <Link
        href="#contact"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand transition-transform duration-200 group-hover:gap-2.5 w-fit"
      >
        Get started <span aria-hidden>→</span>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<"tanmoy" | "dipta">("tanmoy");
  const services = activeTab === "tanmoy" ? TANMOY_SERVICES : DIPTA_SERVICES;

  return (
    <section id="services" className="section-pad grid-bg">
      <div className="container-page">
        <Reveal as="span" className="eyebrow block mb-4">
          What We Do
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-primary)] mb-5 max-w-3xl">
            Two specialties.{" "}
            <em className="text-brand">One outcome: AI that works.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base text-[var(--text-secondary)] mb-12 max-w-xl leading-relaxed">
            We split the problem so you don&apos;t have to. Engineering handles
            the stack. Revenue Engineering handles the deal.
          </p>
        </Reveal>

        {/* Tab switcher */}
        <div className="flex border-b border-[var(--hairline)] mb-10">
          {(["tanmoy", "dipta"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-3.5 font-mono text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {tab === "tanmoy" ? "AI Integration" : "Revenue Engineering"}
              {activeTab === tab && (
                <motion.span
                  layoutId="serviceTab"
                  className="absolute -bottom-px left-0 right-0 h-0.5 bg-brand"
                />
              )}
            </button>
          ))}
        </div>

        {/* Service cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
