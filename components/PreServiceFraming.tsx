"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const NODES = [
  { id: "01", label: "Monitored Architecture" },
  { id: "02", label: "Turnkey IaC Deployment" },
  { id: "03", label: "Continuous MLOps Lifecycle" },
];

function Card({ node, index, reduce, className: cn }: {
  node: (typeof NODES)[number];
  index: number;
  reduce: boolean | null;
  className?: string;
}) {
  const fromLeft = cn?.includes("col-start-1");
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: fromLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.55, ease: EASE }}
      className={`group ${cn || ""}`}
    >
      <div className="rounded-xl backdrop-blur-sm border border-[var(--hairline-strong)] bg-[var(--surface)] px-5 py-4 transition-all duration-300 group-hover:border-[rgb(var(--accent-rgb)/0.35)] group-hover:bg-[var(--surface-hover)]">
        <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">
          {node.label}
        </p>
      </div>
    </motion.div>
  );
}

function Badge({ node, index, reduce, className: cn }: {
  node: (typeof NODES)[number];
  index: number;
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.span
      initial={reduce ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.25 + index * 0.15, duration: 0.4, ease: EASE }}
      className={`font-mono text-[11px] tracking-[0.15em] text-brand bg-[var(--bg)] w-7 h-7 flex items-center justify-center rounded-full border border-[var(--hairline-strong)] z-10 ${cn || ""}`}
    >
      {node.id}
    </motion.span>
  );
}

function PipelineNode({
  node,
  index,
  reduce,
}: {
  node: (typeof NODES)[number];
  index: number;
  reduce: boolean | null;
}) {
  const onRight = index !== 1;
  return (
    <div className="grid items-center" style={{ gridTemplateColumns: "1fr 3rem 1fr" }}>
      <Card
        node={node}
        index={index}
        reduce={reduce}
        className={onRight ? "col-start-3 col-end-4" : "col-start-1 col-end-2"}
      />
      <Badge
        node={node}
        index={index}
        reduce={reduce}
        className="col-start-2 col-end-3 justify-self-center"
      />
    </div>
  );
}

function PipelineCenter({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none">
      <div className="absolute inset-0 border-l border-dashed border-[rgb(var(--accent-rgb)/0.25)]" />
      <motion.div
        className="absolute inset-0 origin-top border-l border-[rgb(var(--accent-rgb)/0.6)]"
        initial={reduce ? undefined : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
      />
    </div>
  );
}

export default function PreServiceFraming() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-center">
          {/* Left: Typography */}
          <div>
            <Reveal as="span" className="eyebrow block mb-5">
              [ SYSTEM ARCHITECTURE &amp; LIFECYCLE ]
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-primary)] mb-6 max-w-2xl leading-[1.08]">
                We engineer the core systems.{" "}
                <em className="text-brand">We also manage the infrastructure.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-lg">
                We do not ship unconfigured codebases or leave your team to
                manage complex deployments. Every system engineered below
                includes automated infrastructure provisioning, white-glove
                CI/CD integration, and continuous MLOps drift monitoring
                standard. You own the strategic outcome; our engineers run the
                operational lifecycle.
              </p>
            </Reveal>
          </div>

          {/* Right: Pipeline Visualization */}
          <Reveal delay={0.15}>
            <div className="relative">
              <PipelineCenter reduce={reduce} />
              <div className="relative space-y-16">
                {NODES.map((node, i) => (
                  <PipelineNode key={node.id} node={node} index={i} reduce={reduce} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
