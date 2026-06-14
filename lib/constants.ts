export const SITE = {
  name: "Beyond AI",
  tagline: "We don't just add AI to your business. We rebuild it around it.",
  description:
    "Autonomous agents, seamless integrations, and revenue systems that run while you sleep.",
  eyebrow: "AI INTEGRATION · REVENUE ENGINEERING",
} as const;

export const TEAM = [
  {
    id: "tanmoy",
    role: "AI Integration Developer",
    bio: "Full-stack engineer and AI systems builder. Designs and ships autonomous agent pipelines, RAG knowledge systems, and production AI infrastructure using LangGraph, LiteLLM, and Next.js.",
    tags: ["LangGraph", "LiteLLM", "Next.js", "Docker", "ChromaDB", "React"],
  },
  {
    id: "dipta",
    role: "AI-Native Revenue Engineer",
    bio: "4 years at AppsCode as Director of Sales Engineering. Designs PoCs, runs technical evaluations, and moves AI systems from idea to enterprise adoption — having sold Kubernetes-native infrastructure to global engineering teams.",
    tags: ["Enterprise GTM", "PoC Engineering", "Kubernetes", "Presales", "Sales Engineering"],
  },
] as const;

export const TANMOY_SERVICES = [
  {
    id: "01",
    title: "AI Systems Integration",
    desc: "Connect LLMs and AI APIs to your existing CRMs, ERPs, and databases without a full rebuild. Your stack becomes AI-powered from day one.",
    price: "$1,500+",
  },
  {
    id: "02",
    title: "Autonomous Agent Development",
    desc: "LangGraph-powered agents that reason and execute multi-step workflows without human intervention. Built for production, not prototypes.",
    price: "$2,000+",
  },
  {
    id: "03",
    title: "RAG & Knowledge Systems",
    desc: "ChromaDB-powered retrieval-augmented generation on your company data — ask questions, get answers sourced directly from your own docs.",
    price: "$1,500+",
  },
  {
    id: "04",
    title: "Full-Stack AI Application Dev",
    desc: "End-to-end AI-native web applications built with Next.js and LangGraph. From architecture to production deployment.",
    price: "$3,000+",
  },
  {
    id: "05",
    title: "AI Infrastructure & DevOps",
    desc: "Docker, Redis, Celery, LangSmith — production-grade deployment so your AI workloads run reliably and observably at scale.",
    price: "$1,000+",
  },
] as const;

export const DIPTA_SERVICES = [
  {
    id: "01",
    title: "AI Agent Development & Deployment",
    desc: "Production-grade autonomous systems built for real commercial workflows — not demos. From architecture to deployment.",
    price: "$3,000+",
  },
  {
    id: "02",
    title: "AI-Powered Sales Workflow Automation",
    desc: "Automate prospect research, demo preparation, discovery call summaries, RFP drafting, and competitive analysis — so your team closes deals.",
    price: "$2,000+",
  },
  {
    id: "03",
    title: "Fractional Sales Engineering",
    desc: "Enterprise-grade SE leadership without the full-time hire. Embedded into your team — running demos, building technical sales process, training reps.",
    price: "$2,000/mo",
  },
  {
    id: "04",
    title: "Enterprise Demo & POC Engineering",
    desc: "Demo environments and POC frameworks built to speak your buyer's technical reality — making your product feel inevitable before the contract.",
    price: "$2,000+",
  },
  {
    id: "05",
    title: "Technical Presales Consulting",
    desc: "Discovery strategy, demo design, objection handling, SE team structure, and GTM positioning from someone who has sat on both sides of the enterprise deal.",
    price: "$150/hr",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Consult",
    desc: "We understand your workflow, stack, and bottlenecks in a free discovery call. No pitch — just listening.",
  },
  {
    step: "02",
    title: "Scope",
    desc: "We define the exact deliverable, timeline, and success criteria. Fixed scope, no surprises.",
  },
  {
    step: "03",
    title: "Build",
    desc: "We engineer and test in a production-like environment with real data and real constraints.",
  },
  {
    step: "04",
    title: "Deploy",
    desc: "We ship, monitor, and hand off with full documentation. You own everything.",
  },
] as const;

export const STATS = [
  { value: 10, suffix: "+", label: "Services" },
  { value: 1, prefix: "$", suffix: "K", label: "Starting" },
  { value: 4, suffix: "yrs", label: "Enterprise SE Experience" },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Beyond the Demo",
    desc: "We don't build for demos. We build for real data, real constraints, and real users — systems that survive contact with production.",
  },
  {
    title: "End-to-End Ownership",
    desc: "From first discovery call to live deployment and monitoring. We own the outcome, not just the deliverable.",
  },
  {
    title: "Engineering Meets Revenue",
    desc: "Deep technical build capability paired with enterprise sales engineering expertise — in one engagement.",
  },
] as const;

export const CONTACT = {
  email: "tanmoysaha162111@gmail.com",
  whatsappNumber: "8801323190275",
  whatsappDisplay: "+880 1323 190275",
  formspreeId: "xpqbrarb",
  calendlyUrl: "https://calendly.com/princedevil818",
  linkedinTanmoy: "https://www.linkedin.com/in/tanmoykumar-saha-4878b815b",
  linkedinDipta: "https://www.linkedin.com/in/dipto-bratadas",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;

