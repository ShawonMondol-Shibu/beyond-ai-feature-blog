# Beyond AI — Website Design Spec
_Date: 2026-05-05_

## Overview

A fully animated, single-page business website for **Beyond AI** — a two-person AI consultancy combining deep engineering integration with enterprise revenue and GTM expertise. The site must convert visitors into booked calls or enquiries.

---

## Team

### Tanmoy Kumar Saha — AI Integration Developer
- Full-Stack Engineer & AI Systems Builder
- Stack: LangGraph, LiteLLM, ChromaDB, Next.js, React, Laravel, PostgreSQL, Docker, Redis, Celery, LangSmith
- Speciality: Autonomous agents, AI-powered full-stack apps, RAG systems, AI infrastructure

### Dipta Brata Das — AI-Native Revenue Engineer
- Director of Sales Engineering & Alliances at AppsCode Inc. (4 years)
- Speciality: Enterprise GTM, PoC engineering, Kubernetes-native infrastructure, technical presales, sales workflow automation
- Background: Designed PoCs, ran technical evaluations, moved systems from idea → implementation → adoption for global enterprise buyers

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Dark/Light mode | next-themes |
| Deployment | Vercel |
| Contact form backend | Formspree (serverless, free tier) |

---

## Visual Design

### Color System

| Token | Dark Mode | Light Mode |
|---|---|---|
| Background | `#050510` | `#ffffff` |
| Surface | `rgba(255,100,50,0.06)` | `#fff7f4` |
| Border | `rgba(255,100,50,0.18)` | `#ff6432` (2px) |
| Primary accent | `#ff6432` | `#ff6432` |
| Text primary | `#ffffff` | `#111111` |
| Text secondary | `#888888` | `#444444` |
| Grid overlay | `rgba(255,100,50,0.04)` 28px | `rgba(255,100,50,0.06)` 28px |
| WhatsApp button | `rgba(37,211,102,0.08)` border | same |

### Typography
- Headings: System sans-serif, weight 900, tight line-height (1.15–1.2)
- Labels/monospace callouts: `font-family: monospace`, letter-spacing 3–4px, uppercase, `#ff6432`
- Body: weight 500 in light mode, weight 400 in dark mode, line-height 1.6–1.7

### Animation Style — Refined & Smooth
- Framer Motion `fadeInUp` variants on scroll entry (`useInView`, threshold 0.2)
- Smooth hover states: `scale(1.02)` + border brightens on service cards
- Dark/light toggle: smooth `transition-colors duration-300` on all bg/text tokens
- No particle systems, no parallax, no glitch effects
- Hero animated sequence: scroll-triggered, staggered phase reveals

---

## Page Structure (Single Scroll)

### 01 — Navbar (sticky)
- Logo: `Beyond` + `AI` (AI in `#ff6432`)
- Links: Services · About · How It Works · Contact (smooth scroll anchors)
- Dark/light toggle switch (right of links)
- CTA button: "Book a Call" → Calendly link
- Mobile: hamburger menu

### 02 — Hero (full viewport)
**Layout:** Two-column grid (50/50)

**Left column:**
- Eyebrow label: `AI INTEGRATION · REVENUE ENGINEERING` (monospace, orange)
- Headline: "We don't just **add AI** to your business. We rebuild it around it."
  - "add AI" in `#ff6432`
- Subtext: "Autonomous agents, seamless integrations, and revenue systems that run while you sleep."
- CTA row: `[See Our Services]` (filled orange) + `[Watch How It Works ↓]` (outlined orange)
- Stats row (no names/headcount):
  - `10+` Services
  - `$1K` Starting
  - `100%` Production-Ready

**Right column — 3-Phase Animated Sequence ("How Easy It Is"):**
- Eyebrow: `HOW IT WORKS — ANIMATED` (monospace)
- **Phase 1 · Tell Us What You Need** — Typewriter-effect text: `"I need AI to automate my sales workflow..."` + animated progress bar filling to 70%
- **Phase 2 · We Build The Solution** — Three icon steps animate in sequentially: 📋 Scope → ⚙️ Build → 🤖 AI Online, connected by animated arrows
- **Phase 3 · You Scale** — Horizontal timeline: Day 1 → Week 2 → Live → Scale ∞, progress line animates left-to-right
- All three phases reveal on scroll, staggered 0.3s apart

### 03 — About Us
Two side-by-side cards, each with:
- Role badge (orange pill label)
- Brief bio (2–3 sentences, drawn from LinkedIn backgrounds)
- Tech stack tags (small pill chips)

**Tanmoy's card:** AI Integration Developer · LangGraph · LiteLLM · Next.js · Docker · ChromaDB
**Dipta's card:** AI-Native Revenue Engineer · Enterprise GTM · PoC Engineering · Kubernetes · Sales Engineering

### 04 — Services (tabbed)
Tab switcher with two tabs:
- `AI INTEGRATION` (Tanmoy's services)
- `REVENUE ENGINEERING` (Dipta's services)

Default active: AI Integration tab.

**Tanmoy's Services (2-column grid):**
| # | Service | Starting Price |
|---|---|---|
| 01 | AI Systems Integration — Connect LLMs & AI APIs to existing CRMs, ERPs, databases | $1,500 |
| 02 | Autonomous Agent Development — LangGraph multi-step agents for production workflows | $2,000 |
| 03 | RAG & Knowledge Systems — ChromaDB-powered retrieval on company data | $1,500 |
| 04 | Full-Stack AI Application Development — End-to-end Next.js + LangGraph apps | $3,000 |
| 05 | AI Infrastructure & DevOps — Docker, Redis, Celery, LangSmith production deployment | $1,000 |

**Dipta's Services (2-column grid):**
| # | Service | Starting Price |
|---|---|---|
| 01 | AI Agent Development & Deployment — Production-grade autonomous systems | $3,000 |
| 02 | AI-Powered Sales Workflow Automation — Automate prospect research, RFP drafting, discovery summaries | $2,000 |
| 03 | Fractional Sales Engineering — Embedded SE leadership for Series A–C SaaS companies | $2,000/mo |
| 04 | Enterprise Demo & POC Engineering — Demo environments and POC frameworks for enterprise deals | $2,000 |
| 05 | Technical Presales Consulting — Discovery strategy, demo design, objection handling, GTM positioning | $150/hr |

Each card: service number (monospace), title, 1-line description, price badge, "Learn more →" link.

### 05 — How It Works
4-step horizontal animated timeline (desktop) / vertical stack (mobile):
1. **Consult** — We understand your workflow, stack, and bottlenecks
2. **Scope** — We define the exact deliverable and timeline
3. **Build** — We engineer and test in a production-like environment
4. **Deploy** — We ship, monitor, and hand off with documentation

Steps animate in sequentially on scroll. Connecting line draws left-to-right.

### 06 — Why Beyond AI
Three differentiator cards + animated stat counters:

**Stats (counter animation on scroll entry):**
- `10+` Services across both disciplines
- `$1K` Minimum engagement — no enterprise-only gatekeeping
- `4yrs` Enterprise SE experience (Dipta's AppsCode tenure — no name shown, just the credential)

**Differentiator cards:**
1. **Beyond the Demo** — We don't build for demos. We build for real data, real constraints, real users.
2. **End-to-End Ownership** — From first discovery call to live deployment and monitoring.
3. **Two Disciplines, One Team** — Engineering and revenue expertise in one engagement.

### 07 — Contact
**Layout:** Two-column grid

**Left — Contact Form:**
- Fields: Name, Email, Service Interest (dropdown of all 10 services), Message
- Submit → Formspree serverless handler → email to `tanmoysaha162111@gmail.com`
- Success state: inline confirmation, no page reload

**Right — Quick Reach:**
- 📅 **Book a Discovery Call** — Calendly link (placeholder, user to supply URL)
- 💬 **Chat on WhatsApp** — `https://wa.me/8801323190275`
- ✉️ **Email Directly** — `mailto:tanmoysaha162111@gmail.com`

### 08 — Footer
- Logo left: `Beyond` + `AI`
- Center: nav links (Services · About · How It Works · Contact)
- Right: LinkedIn icons for both partners
- Bottom bar: `© 2026 Beyond AI. All rights reserved.`

---

## Responsive Behaviour
- **Desktop (≥1024px):** All two-column layouts as designed
- **Tablet (768–1023px):** Hero stacks to single column, services grid 1-col
- **Mobile (<768px):** Full single column, hamburger nav, timeline goes vertical

---

## Constraints & Open Items
- Calendly link: user to provide before launch
- Partner photos: not included in this design (text/role-based About section only)
- Contact form backend: Formspree free tier (100 submissions/month — upgrade to Resend if volume grows)
- No CMS — copy lives in code; easy to update via constants file
- `.superpowers/` to be added to `.gitignore`
