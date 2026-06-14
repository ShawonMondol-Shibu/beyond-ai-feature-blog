# Beyond AI Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page animated Next.js website for Beyond AI — a two-person AI consultancy — featuring dark/light mode, Framer Motion scroll animations, a 3-phase hero animation sequence, tabbed services grid, and a Formspree contact form.

**Architecture:** Next.js 14 App Router with a single `page.tsx` assembling all section components. Tailwind CSS with CSS custom properties handles theme tokens (toggled via next-themes). All copy and data lives in `lib/constants.ts` — components are purely presentational. Framer Motion `useInView` triggers refined fade-in animations on scroll entry.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS v3, Framer Motion v11, next-themes, Formspree (contact form), Jest + React Testing Library (component tests)

---

## Prerequisites (do before Task 1)

- Sign up at [formspree.io](https://formspree.io) → create a new form → copy the form ID (looks like `xpwzabcd`). You'll need it in Task 3.
- Have your Calendly URL ready (e.g. `https://calendly.com/your-handle`).

---

## File Map

```
beyond-ai/
├── app/
│   ├── layout.tsx              # Root layout: ThemeProvider, metadata, fonts
│   ├── page.tsx                # Assembles all 8 sections
│   └── globals.css             # CSS variables for theme tokens + grid bg + base resets
├── components/
│   ├── Navbar.tsx              # Sticky nav: logo, links, ThemeToggle, Book a Call CTA
│   ├── ThemeToggle.tsx         # Dark/light switch (uses next-themes)
│   ├── Hero.tsx                # Full-viewport hero: headline, stats, CTAs, AnimatedSequence
│   ├── AnimatedSequence.tsx    # 3-phase scroll-triggered animation (hero right column)
│   ├── About.tsx               # Two partner bio cards with tag chips
│   ├── Services.tsx            # Tab switcher + 2-col service card grid
│   ├── HowItWorks.tsx          # 4-step animated timeline (horizontal/vertical)
│   ├── WhyBeyondAI.tsx         # Animated stat counters + 3 differentiator cards
│   ├── Contact.tsx             # Formspree form + Calendly/WhatsApp/Email buttons
│   └── Footer.tsx              # Logo, nav links, LinkedIn icons, copyright
├── hooks/
│   └── useCountUp.ts           # Counter animation from 0 → target on inView
├── lib/
│   └── constants.ts            # All copy, services data, team data, contact info
├── __tests__/
│   ├── Navbar.test.tsx
│   ├── Hero.test.tsx
│   ├── Services.test.tsx
│   ├── AnimatedSequence.test.tsx
│   ├── Contact.test.tsx
│   └── useCountUp.test.ts
├── jest.config.ts
├── jest.setup.ts
├── tailwind.config.ts
├── next.config.ts
└── .gitignore
```

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `jest.config.ts`, `jest.setup.ts`, `.gitignore`, `tsconfig.json`

- [ ] **Step 1: Scaffold the Next.js project**

Run in the `C:\Projects\Beyond AI` directory:

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted, accept all defaults.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion next-themes
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom
```

- [ ] **Step 3: Create `jest.config.ts`**

```typescript
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterFramework: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
```

- [ ] **Step 4: Create `jest.setup.ts`**

```typescript
import "@testing-library/jest-dom";
```

- [ ] **Step 5: Create `__mocks__/framer-motion.tsx`** (so animations don't break tests)

```tsx
const actual = jest.requireActual("framer-motion");

module.exports = {
  ...actual,
  motion: new Proxy(
    {},
    {
      get: (_: unknown, prop: string) => {
        const Component = ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
          const Tag = prop as keyof JSX.IntrinsicElements;
          return <Tag {...props}>{children}</Tag>;
        };
        Component.displayName = `motion.${prop}`;
        return Component;
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({ start: jest.fn(), set: jest.fn() }),
};
```

- [ ] **Step 6: Add test script to `package.json`**

Open `package.json` and ensure the `scripts` block contains:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

- [ ] **Step 7: Verify setup**

```bash
npm run dev
```

Expected: Next.js dev server starts at `http://localhost:3000` with no errors.

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "chore: bootstrap Next.js 14 project with Tailwind, Framer Motion, next-themes, Jest"
```

---

## Task 2: Global CSS & Tailwind Color Tokens

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace `app/globals.css` with theme tokens**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: #ffffff;
    --bg-surface: #fff7f4;
    --text-primary: #111111;
    --text-secondary: #444444;
    --text-muted: #888888;
    --border-brand: rgba(255, 100, 50, 0.3);
    --grid-line: rgba(255, 100, 50, 0.06);
  }

  .dark {
    --bg: #050510;
    --bg-surface: rgba(255, 100, 50, 0.06);
    --text-primary: #ffffff;
    --text-secondary: #aaaaaa;
    --text-muted: #666666;
    --border-brand: rgba(255, 100, 50, 0.18);
    --grid-line: rgba(255, 100, 50, 0.04);
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--bg);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}

.grid-bg {
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 28px 28px;
}

.section-pad {
  @apply px-6 py-20 md:px-12 lg:px-20;
}
```

- [ ] **Step 2: Update `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "#ff6432",
        "dark-bg": "#050510",
        "whatsapp": "#25d366",
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: add CSS theme tokens and Tailwind brand colors"
```

---

## Task 3: Constants — All Copy & Data

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Create `lib/constants.ts`**

```typescript
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
  formspreeId: "YOUR_FORMSPREE_ID",   // Replace: formspree.io → new form → copy ID
  calendlyUrl: "YOUR_CALENDLY_URL",    // Replace: your Calendly scheduling link
  linkedinTanmoy: "https://www.linkedin.com/in/tanmoykumar-saha-4878b815b",
  linkedinDipta: "https://www.linkedin.com/in/dipto-bratadas",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
] as const;
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add site constants — all copy, services, team, and contact data"
```

---

## Task 4: Root Layout with ThemeProvider

**Files:**
- Create: `components/ThemeToggle.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/ThemeToggle.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/components/ThemeToggle";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: jest.fn(), resolvedTheme: "dark" }),
}));

test("renders a toggle button", () => {
  render(<ThemeToggle />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("has accessible label", () => {
  render(<ThemeToggle />);
  expect(screen.getByRole("button")).toHaveAttribute("aria-label");
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern="ThemeToggle" --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/ThemeToggle'`

- [ ] **Step 3: Create `components/ThemeToggle.tsx`**

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-5" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-10 h-5 rounded-full bg-brand/20 border border-brand/30 flex items-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <span
        className={`absolute w-4 h-4 rounded-full bg-brand transition-transform duration-300 ${
          isDark ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- --testPathPattern="ThemeToggle" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Update `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beyond AI — AI Integration & Revenue Engineering",
  description:
    "Autonomous agents, seamless integrations, and revenue systems that run while you sleep. Two specialists. One mission.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/ThemeToggle.tsx app/layout.tsx __tests__/ThemeToggle.test.tsx
git commit -m "feat: add ThemeProvider and ThemeToggle with dark/light mode support"
```

---

## Task 5: Navbar

**Files:**
- Create: `components/Navbar.tsx`
- Create: `__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: jest.fn() }),
}));

test("renders logo text", () => {
  render(<Navbar />);
  expect(screen.getByText("Beyond")).toBeInTheDocument();
  expect(screen.getByText("AI")).toBeInTheDocument();
});

test("renders all nav links", () => {
  render(<Navbar />);
  expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "How It Works" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
});

test("renders Book a Call CTA", () => {
  render(<Navbar />);
  expect(screen.getByRole("link", { name: /book a call/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern="Navbar" --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/Navbar'`

- [ ] **Step 3: Create `components/Navbar.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-brand/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0.5 text-lg font-black tracking-tight">
          <span className="text-[var(--text-primary)]">Beyond</span>
          <span className="text-brand">AI</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[var(--text-muted)] hover:text-brand transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href={CONTACT.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-brand text-white text-xs font-black rounded tracking-wide hover:bg-brand/90 transition-colors duration-200"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)] border-t border-brand/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-[var(--text-secondary)] hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-brand/10">
            <ThemeToggle />
            <a
              href={CONTACT.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand text-white text-xs font-black rounded tracking-wide"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- --testPathPattern="Navbar" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx __tests__/Navbar.test.tsx
git commit -m "feat: add sticky Navbar with mobile menu, dark/light toggle, and Book a Call CTA"
```

---

## Task 6: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Create: `__tests__/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

jest.mock("@/components/AnimatedSequence", () => ({
  default: () => <div data-testid="animated-sequence" />,
}));

test("renders the main headline", () => {
  render(<Hero />);
  expect(screen.getByText(/We don't just/i)).toBeInTheDocument();
});

test("renders the eyebrow label", () => {
  render(<Hero />);
  expect(screen.getByText(/AI INTEGRATION/i)).toBeInTheDocument();
});

test("renders the See Our Services CTA", () => {
  render(<Hero />);
  expect(screen.getByRole("link", { name: /see our services/i })).toBeInTheDocument();
});

test("renders the animated sequence", () => {
  render(<Hero />);
  expect(screen.getByTestId("animated-sequence")).toBeInTheDocument();
});

test("renders stat: 10+ Services", () => {
  render(<Hero />);
  expect(screen.getByText(/Services/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern="Hero" --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/Hero'`

- [ ] **Step 3: Create `components/Hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import AnimatedSequence from "./AnimatedSequence";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const HERO_STATS = [
  { value: "10+", label: "Services" },
  { value: "$1K", label: "Starting" },
  { value: "100%", label: "Production-Ready" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen grid-bg flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left column */}
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-[10px] text-brand tracking-[4px] uppercase mb-4"
          >
            AI INTEGRATION · REVENUE ENGINEERING
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-[var(--text-primary)] mb-6"
          >
            We don&apos;t just{" "}
            <span className="text-brand">add AI</span> to your
            business.
            <br />
            We rebuild it around&nbsp;it.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md"
          >
            Autonomous agents, seamless integrations, and revenue systems that run while you sleep.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 mb-10"
          >
            <a
              href="#services"
              className="px-6 py-3 bg-brand text-white font-black text-sm rounded shadow-[0_4px_20px_rgba(255,100,50,0.35)] hover:bg-brand/90 transition-all duration-200"
            >
              See Our Services
            </a>
            <a
              href="#how-it-works"
              className="px-6 py-3 border-2 border-brand text-brand font-black text-sm rounded hover:bg-brand/10 transition-all duration-200"
            >
              Watch How It Works ↓
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex gap-8 pt-6 border-t border-[var(--border-brand)]"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-brand">{stat.value}</p>
                <p className="text-[10px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — Animated Sequence */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <AnimatedSequence />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern="Hero" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx __tests__/Hero.test.tsx
git commit -m "feat: add Hero section with headline, CTAs, stats, and animated sequence slot"
```

---

## Task 7: Animated Sequence (3-Phase Hero Animation)

**Files:**
- Create: `components/AnimatedSequence.tsx`
- Create: `__tests__/AnimatedSequence.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import AnimatedSequence from "@/components/AnimatedSequence";

test("renders all three phase labels", () => {
  render(<AnimatedSequence />);
  expect(screen.getByText(/TELL US/i)).toBeInTheDocument();
  expect(screen.getByText(/WE BUILD/i)).toBeInTheDocument();
  expect(screen.getByText(/YOU SCALE/i)).toBeInTheDocument();
});

test("renders the typewriter phrase in phase 1", () => {
  render(<AnimatedSequence />);
  expect(screen.getByText(/automate my sales workflow/i)).toBeInTheDocument();
});

test("renders all build step labels in phase 2", () => {
  render(<AnimatedSequence />);
  expect(screen.getByText("Scope")).toBeInTheDocument();
  expect(screen.getByText("Build")).toBeInTheDocument();
  expect(screen.getByText("AI Live")).toBeInTheDocument();
});

test("renders timeline milestones in phase 3", () => {
  render(<AnimatedSequence />);
  expect(screen.getByText("Day 1")).toBeInTheDocument();
  expect(screen.getByText("Week 2")).toBeInTheDocument();
  expect(screen.getByText("Live")).toBeInTheDocument();
  expect(screen.getByText("Scale ∞")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern="AnimatedSequence" --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/AnimatedSequence'`

- [ ] **Step 3: Create `components/AnimatedSequence.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const BUILD_STEPS = [
  { icon: "📋", label: "Scope" },
  { icon: "⚙️", label: "Build" },
  { icon: "🤖", label: "AI Live" },
];

const TIMELINE = ["Day 1", "Week 2", "Live", "Scale ∞"];

export default function AnimatedSequence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-3">
      <p className="font-mono text-[9px] text-brand tracking-[3px] uppercase mb-4">
        HOW IT WORKS — ANIMATED
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
          className="bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-lg p-4"
        >
          <p className="font-mono text-[8px] text-brand tracking-[2px] uppercase font-bold mb-3">
            PHASE 1 · TELL US WHAT YOU NEED
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0" />
            <span className="text-xs text-[var(--text-secondary)]">
              &ldquo;I need AI to automate my sales workflow...&rdquo;
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-brand/15 overflow-hidden">
            <motion.div
              className="h-full bg-brand rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: "70%" } : { width: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Phase 2 — We Build */}
        <motion.div
          variants={card}
          className="bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-lg p-4"
        >
          <p className="font-mono text-[8px] text-brand tracking-[2px] uppercase font-bold mb-3">
            PHASE 2 · WE BUILD THE SOLUTION
          </p>
          <div className="flex items-center justify-between gap-2">
            {BUILD_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <motion.div
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.7 + i * 0.2, duration: 0.3 }}
                >
                  <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-content text-base leading-none flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-[9px] font-bold text-[var(--text-secondary)]">
                    {step.label}
                  </span>
                </motion.div>
                {i < BUILD_STEPS.length - 1 && (
                  <span className="text-brand font-black text-sm mb-3">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phase 3 — Scale */}
        <motion.div
          variants={card}
          className="bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-lg p-4"
        >
          <p className="font-mono text-[8px] text-brand tracking-[2px] uppercase font-bold mb-4">
            PHASE 3 · YOU SCALE
          </p>
          <div className="relative">
            {/* Track */}
            <div className="absolute top-2 left-2 right-2 h-0.5 bg-brand/15 rounded-full" />
            {/* Fill */}
            <motion.div
              className="absolute top-2 left-2 h-0.5 bg-brand rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: "72%" } : { width: 0 }}
              transition={{ delay: 1.2, duration: 0.9, ease: "easeOut" }}
            />
            {/* Dots */}
            <div className="relative flex justify-between">
              {TIMELINE.map((label, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.1 + i * 0.12 }}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      i < 3
                        ? "bg-brand border-brand"
                        : "bg-transparent border-brand"
                    }`}
                  />
                  <span
                    className={`text-[8px] font-bold ${
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
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern="AnimatedSequence" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/AnimatedSequence.tsx __tests__/AnimatedSequence.test.tsx
git commit -m "feat: add 3-phase scroll-triggered AnimatedSequence for hero"
```

---

## Task 8: About Section

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create `components/About.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TEAM } from "@/lib/constants";

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-pad max-w-7xl mx-auto">
      <div ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="font-mono text-[10px] text-brand tracking-[4px] uppercase mb-3"
        >
          WHO WE ARE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-12"
        >
          Built at the intersection of{" "}
          <span className="text-brand">engineering and revenue.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.id}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-xl p-8 hover:border-brand/40 transition-colors duration-300"
            >
              <span className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-black tracking-wider uppercase rounded-full mb-4">
                {member.role}
              </span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-semibold bg-brand/8 border border-brand/15 text-[var(--text-muted)] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add About section with two partner bio cards and tag chips"
```

---

## Task 9: Services Section (Tabbed)

**Files:**
- Create: `components/Services.tsx`
- Create: `__tests__/Services.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Services from "@/components/Services";

test("renders both tab labels", () => {
  render(<Services />);
  expect(screen.getByRole("button", { name: /AI INTEGRATION/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /REVENUE ENGINEERING/i })).toBeInTheDocument();
});

test("shows Tanmoy's services by default", () => {
  render(<Services />);
  expect(screen.getByText("AI Systems Integration")).toBeInTheDocument();
});

test("switches to Dipta's services on tab click", async () => {
  render(<Services />);
  await userEvent.click(screen.getByRole("button", { name: /REVENUE ENGINEERING/i }));
  expect(screen.getByText("AI Agent Development & Deployment")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern="Services" --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/Services'`

- [ ] **Step 3: Create `components/Services.tsx`**

```tsx
"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TANMOY_SERVICES, DIPTA_SERVICES } from "@/lib/constants";

type Service = { id: string; title: string; desc: string; price: string };

function ServiceCard({ service, index, inView }: { service: Service; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-xl p-6 hover:border-brand/40 hover:scale-[1.01] transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="font-mono text-[9px] text-brand tracking-[2px] font-bold">{service.id}</span>
        <span className="font-mono text-[9px] text-brand font-bold">{service.price}</span>
      </div>
      <h3 className="text-sm font-black text-[var(--text-primary)] mb-2">{service.title}</h3>
      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">{service.desc}</p>
      <a href="#contact" className="text-[10px] font-bold text-brand hover:underline">
        Get started →
      </a>
    </motion.div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<"tanmoy" | "dipta">("tanmoy");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const services = activeTab === "tanmoy" ? TANMOY_SERVICES : DIPTA_SERVICES;

  return (
    <section id="services" className="section-pad grid-bg">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-mono text-[10px] text-brand tracking-[4px] uppercase mb-3"
        >
          WHAT WE DO
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4"
        >
          Two specialties.{" "}
          <span className="text-brand">One outcome: AI that works.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-sm text-[var(--text-muted)] mb-10 max-w-xl"
        >
          We split the problem so you don&apos;t have to. Engineering handles the stack. Revenue Engineering handles the deal.
        </motion.p>

        {/* Tab switcher */}
        <div className="flex border-b border-brand/15 mb-8">
          {(["tanmoy", "dipta"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-mono text-[10px] tracking-[2px] uppercase font-bold transition-all duration-200 border-b-2 -mb-[2px] ${
                activeTab === tab
                  ? "text-brand border-brand"
                  : "text-[var(--text-muted)] border-transparent hover:text-brand/70"
              }`}
            >
              {tab === "tanmoy" ? "AI Integration" : "Revenue Engineering"}
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                inView={inView}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern="Services" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Services.tsx __tests__/Services.test.tsx
git commit -m "feat: add tabbed Services section with Framer Motion card animations"
```

---

## Task 10: How It Works Section

**Files:**
- Create: `components/HowItWorks.tsx`

- [ ] **Step 1: Create `components/HowItWorks.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/constants";

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="section-pad">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-mono text-[10px] text-brand tracking-[4px] uppercase mb-3"
        >
          THE PROCESS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-16"
        >
          From conversation to{" "}
          <span className="text-brand">production in four steps.</span>
        </motion.h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-0.5 bg-brand/15" />
          <motion.div
            className="absolute top-8 left-[calc(12.5%)] h-0.5 bg-brand origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            style={{ width: "75%" }}
          />

          <div className="grid grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full border-2 border-brand bg-brand/10 flex items-center justify-center mb-4 relative z-10">
                  <span className="font-mono text-sm font-black text-brand">{item.step}</span>
                </div>
                <h3 className="text-base font-black text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-6 relative">
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-brand/15" />
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
              className="flex gap-5 relative z-10"
            >
              <div className="w-14 h-14 rounded-full border-2 border-brand bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-xs font-black text-brand">{item.step}</span>
              </div>
              <div className="pt-3">
                <h3 className="text-sm font-black text-[var(--text-primary)] mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: add HowItWorks section with animated 4-step timeline"
```

---

## Task 11: Why Beyond AI (Stats + Differentiators)

**Files:**
- Create: `hooks/useCountUp.ts`
- Create: `__tests__/useCountUp.test.ts`
- Create: `components/WhyBeyondAI.tsx`

- [ ] **Step 1: Write the failing test for useCountUp**

```typescript
import { renderHook } from "@testing-library/react";
import useCountUp from "@/hooks/useCountUp";

test("returns 0 when not active", () => {
  const { result } = renderHook(() => useCountUp({ target: 10, active: false }));
  expect(result.current).toBe(0);
});

test("returns target value when active with duration 0", () => {
  jest.useFakeTimers();
  const { result } = renderHook(() => useCountUp({ target: 10, active: true, duration: 0 }));
  jest.runAllTimers();
  expect(result.current).toBe(10);
  jest.useRealTimers();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern="useCountUp" --no-coverage
```

Expected: FAIL — `Cannot find module '@/hooks/useCountUp'`

- [ ] **Step 3: Create `hooks/useCountUp.ts`**

```typescript
import { useState, useEffect } from "react";

interface Options {
  target: number;
  active: boolean;
  duration?: number;
}

export default function useCountUp({ target, active, duration = 1500 }: Options): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return count;
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern="useCountUp" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Create `components/WhyBeyondAI.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS, DIFFERENTIATORS } from "@/lib/constants";
import useCountUp from "@/hooks/useCountUp";

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
      <p className="text-4xl md:text-5xl font-black text-brand mb-1">
        {stat.prefix ?? ""}{count}{stat.suffix}
      </p>
      <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">
        {stat.label}
      </p>
    </div>
  );
}

export default function WhyBeyondAI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why" className="section-pad grid-bg">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-mono text-[10px] text-brand tracking-[4px] uppercase mb-3"
        >
          WHY BEYOND AI
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-16"
        >
          Built differently.{" "}
          <span className="text-brand">By design.</span>
        </motion.h2>

        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-12 md:gap-24 mb-20 py-12 border-y border-brand/15"
        >
          {STATS.map((stat) => (
            <StatCounter key={stat.label} stat={stat} active={inView} />
          ))}
        </motion.div>

        {/* Differentiator cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              className="bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-xl p-7 hover:border-brand/40 transition-colors duration-300"
            >
              <div className="w-8 h-0.5 bg-brand mb-4" />
              <h3 className="text-base font-black text-[var(--text-primary)] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add hooks/useCountUp.ts __tests__/useCountUp.test.ts components/WhyBeyondAI.tsx
git commit -m "feat: add WhyBeyondAI section with animated stat counters and differentiator cards"
```

---

## Task 12: Contact Section

**Files:**
- Create: `components/Contact.tsx`
- Create: `__tests__/Contact.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/components/Contact";

test("renders the contact form fields", () => {
  render(<Contact />);
  expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/tell us/i)).toBeInTheDocument();
});

test("renders Book a Discovery Call button", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /book a discovery call/i })).toBeInTheDocument();
});

test("renders WhatsApp button", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /whatsapp/i })).toBeInTheDocument();
});

test("renders Email button", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /email directly/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern="Contact" --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/Contact'`

- [ ] **Step 3: Create `components/Contact.tsx`**

```tsx
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
    <section id="contact" className="section-pad">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-mono text-[10px] text-brand tracking-[4px] uppercase mb-3"
        >
          GET STARTED
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4"
        >
          Ready to build with AI?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-sm text-[var(--text-muted)] mb-12"
        >
          Pick your preferred way to reach us. We respond within 24 hours.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-xl p-8"
          >
            <p className="font-mono text-[10px] text-brand tracking-[3px] uppercase font-bold mb-6">
              SEND A MESSAGE
            </p>

            {status === "sent" ? (
              <div className="py-12 text-center">
                <p className="text-2xl font-black text-brand mb-2">Message sent!</p>
                <p className="text-sm text-[var(--text-muted)]">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 text-sm bg-[var(--bg)] border border-[var(--border-brand)] rounded text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-brand transition-colors duration-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full px-4 py-3 text-sm bg-[var(--bg)] border border-[var(--border-brand)] rounded text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-brand transition-colors duration-200"
                />
                <select
                  name="service"
                  className="w-full px-4 py-3 text-sm bg-[var(--bg)] border border-[var(--border-brand)] rounded text-[var(--text-muted)] focus:outline-none focus:border-brand transition-colors duration-200"
                >
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
                  className="w-full px-4 py-3 text-sm bg-[var(--bg)] border border-[var(--border-brand)] rounded text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-brand transition-colors duration-200 resize-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 bg-brand text-white font-black text-sm rounded shadow-[0_4px_20px_rgba(255,100,50,0.3)] hover:bg-brand/90 disabled:opacity-60 transition-all duration-200"
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-400 text-center">
                    Something went wrong. Please try emailing us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Quick Reach */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col gap-4 justify-center"
          >
            <a
              href={CONTACT.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a discovery call"
              className="flex items-center gap-4 p-5 bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-xl hover:border-brand/40 hover:scale-[1.01] transition-all duration-200"
            >
              <div className="w-12 h-12 bg-brand rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                📅
              </div>
              <div>
                <p className="text-sm font-black text-[var(--text-primary)]">Book a Discovery Call</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">30 min · Free · Calendly</p>
              </div>
              <span className="ml-auto text-brand font-black text-lg">→</span>
            </a>

            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center gap-4 p-5 bg-whatsapp/5 border border-whatsapp/20 rounded-xl hover:border-whatsapp/40 hover:scale-[1.01] transition-all duration-200"
            >
              <div className="w-12 h-12 bg-whatsapp rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                💬
              </div>
              <div>
                <p className="text-sm font-black text-[var(--text-primary)]">Chat on WhatsApp</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{CONTACT.whatsappDisplay} · Quick replies</p>
              </div>
              <span className="ml-auto text-whatsapp font-black text-lg">→</span>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              aria-label="Email directly"
              className="flex items-center gap-4 p-5 bg-[var(--bg-surface)] border border-[var(--border-brand)] rounded-xl hover:border-brand/40 hover:scale-[1.01] transition-all duration-200"
            >
              <div className="w-12 h-12 bg-[var(--border-brand)] border border-[var(--border-brand)] rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                ✉️
              </div>
              <div>
                <p className="text-sm font-black text-[var(--text-primary)]">Email Directly</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{CONTACT.email}</p>
              </div>
              <span className="ml-auto text-[var(--text-muted)] font-black text-lg">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern="Contact" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Contact.tsx __tests__/Contact.test.tsx
git commit -m "feat: add Contact section with Formspree form and Calendly/WhatsApp/Email quick-reach"
```

---

## Task 13: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
import { NAV_LINKS, CONTACT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-brand/10 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <a href="#" className="text-lg font-black">
            <span className="text-[var(--text-primary)]">Beyond</span>
            <span className="text-brand">AI</span>
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 justify-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-[var(--text-muted)] hover:text-brand transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* LinkedIn icons */}
          <div className="flex gap-3">
            <a
              href={CONTACT.linkedinTanmoy}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tanmoy on LinkedIn"
              className="w-8 h-8 rounded border border-[var(--border-brand)] flex items-center justify-center text-[var(--text-muted)] hover:border-brand hover:text-brand transition-all duration-200 text-xs font-bold"
            >
              in
            </a>
            <a
              href={CONTACT.linkedinDipta}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dipta on LinkedIn"
              className="w-8 h-8 rounded border border-[var(--border-brand)] flex items-center justify-center text-[var(--text-muted)] hover:border-brand hover:text-brand transition-all duration-200 text-xs font-bold"
            >
              in
            </a>
          </div>
        </div>

        <div className="border-t border-brand/10 pt-6 text-center">
          <p className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest">
            © 2026 BEYOND AI · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with logo, nav links, LinkedIn icons, and copyright"
```

---

## Task 14: Page Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with the assembled page**

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyBeyondAI from "@/components/WhyBeyondAI";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <WhyBeyondAI />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Run the dev server and verify the full page loads**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: all 8 sections render in sequence with no console errors.

- [ ] **Step 3: Run the full test suite**

```bash
npm test -- --no-coverage
```

Expected: ALL PASS

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble all sections into root page"
```

---

## Task 15: Mobile Responsiveness Pass

**Files:**
- Review all components for mobile breakpoints (no new files)

- [ ] **Step 1: Test on mobile viewport in browser**

In Chrome DevTools, set viewport to 375×812 (iPhone 14). Check each section:

- Navbar: hamburger menu opens/closes, all links work
- Hero: single column, headline readable, CTAs stack properly
- AnimatedSequence: all 3 phases visible and readable
- About: single column cards
- Services: single column grid, tab switcher scrolls if needed
- HowItWorks: vertical timeline renders (desktop horizontal is hidden)
- WhyBeyondAI: stats wrap, differentiator cards stack
- Contact: form full-width, quick-reach buttons full-width
- Footer: links wrap cleanly

- [ ] **Step 2: Fix any overflow issues**

If any section causes horizontal overflow, add `overflow-x: hidden` to `body` in `globals.css`:

```css
body {
  background-color: var(--bg);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;  /* add this line */
}
```

- [ ] **Step 3: Test dark/light toggle on mobile**

Toggle theme via the hamburger menu. Verify all sections transition smoothly between modes.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "fix: prevent horizontal overflow on mobile"
```

---

## Task 16: Pre-Launch Configuration

**Files:**
- Create: `vercel.json`
- Modify: `.gitignore`
- Update: `lib/constants.ts` (fill in real Formspree ID + Calendly URL)

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

- [ ] **Step 2: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and append:

```
.superpowers/
```

- [ ] **Step 3: Fill in real Formspree ID**

In `lib/constants.ts`, replace `"YOUR_FORMSPREE_ID"` with your actual Formspree form ID (e.g. `"xpwzabcd"`).

- [ ] **Step 4: Fill in real Calendly URL**

In `lib/constants.ts`, replace `"YOUR_CALENDLY_URL"` with your actual Calendly link.

- [ ] **Step 5: Run build to verify no errors**

```bash
npm run build
```

Expected: Build completes with no TypeScript or lint errors.

- [ ] **Step 6: Run full test suite one final time**

```bash
npm test -- --no-coverage
```

Expected: ALL PASS

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "chore: pre-launch config — vercel.json, .gitignore, real Formspree and Calendly values"
```

- [ ] **Step 8: Deploy to Vercel**

```bash
npx vercel --prod
```

Follow the prompts. Your site will be live at a `.vercel.app` URL within ~90 seconds.

---

## Self-Review Checklist

| Spec requirement | Covered in |
|---|---|
| Visual style C (bold orange on dark, grid overlay) | Task 2 (CSS tokens, grid-bg class) |
| Light mode with white bg + dark text | Task 2 (CSS variables), Task 4 (ThemeProvider) |
| Dark/light toggle | Task 4 (ThemeToggle) |
| Animation: refined & smooth (Framer Motion fade-ins) | Tasks 6, 7, 8, 9, 10, 11, 12 |
| Sticky navbar with mobile hamburger | Task 5 |
| Hero headline + 3-phase animated sequence | Tasks 6, 7 |
| Hero stats (no names/headcount) | Task 6 (10+, $1K, 100%) |
| About: two partner bio cards | Task 8 |
| Services tabbed (5 Tanmoy + 5 Dipta) | Task 9 |
| How It Works 4-step timeline | Task 10 |
| Why Beyond AI stat counters + differentiators | Task 11 |
| Contact form → Formspree | Task 12 |
| Calendly, WhatsApp, Email quick-reach | Task 12 |
| Footer with LinkedIn links | Task 13 |
| Mobile responsive | Task 15 |
| Vercel deployment | Task 16 |
| .superpowers/ in .gitignore | Task 16 |
| Contact email: tanmoysaha162111@gmail.com | Task 3 (constants) |
