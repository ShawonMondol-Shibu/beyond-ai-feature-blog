# Beyond AI — "Refined Dark" Redesign

**Date:** 2026-06-14
**Scope:** Full site — landing page (8 sections) + blog (list + article reading experience)
**Direction:** Evolve the existing dark + orange identity into a premium, editorial, "expensive studio" feel without losing brand recognition.

## Personality

Confident, expensive, calm. Engineered substance with editorial polish. The accent earns attention because it is rare (~5% of surface). Moves the site decisively out of "generic AI-startup template" territory.

## Design Tokens

### Color (dark = default)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0A0A0F` | base near-black, slight blue depth |
| `--bg-elevated` | `#111119` | sections / raised areas |
| `--surface` | `rgba(255,255,255,0.025)` | cards (over hairline) |
| `--hairline` | `rgba(255,255,255,0.08)` | borders, dividers |
| `--text-primary` | `#F4F3EF` | warm off-white (not pure white) |
| `--text-secondary` | `#A1A1AA` | body |
| `--text-muted` | `#6B6B76` | labels, captions |
| `--accent` | `#FF5A1F` | surgical accent |
| `--accent-glow` | `rgba(255,90,31,0.35)` | used once/twice, not everywhere |

### Color (light theme — toggle retained)

| Token | Value |
|---|---|
| `--bg` | `#FAF8F5` warm paper |
| `--bg-elevated` | `#FFFFFF` |
| `--surface` | `rgba(20,17,14,0.02)` |
| `--hairline` | `rgba(20,17,14,0.10)` |
| `--text-primary` | `#14110E` ink |
| `--text-secondary` | `#52504B` |
| `--text-muted` | `#8A8780` |
| `--accent` | `#E8481F` (slightly deeper for contrast on light) |

### Typography

- **Display / headlines:** Fraunces (variable display serif, optical sizing). The primary "expensive" lever.
- **Body / UI:** Inter (retained).
- **Labels / eyebrows / data:** mono (retained), quieter and smaller role.
- Modular type scale with intentional line-heights and tracking. Hero `clamp(2.75rem, 6vw, 5rem)`, serif with tight leading (~1.05) and slight negative tracking.

### Texture & depth

- Replace flat full-bleed grid with a **radial-masked grid** that fades at edges.
- Very-low-opacity **grain/noise** overlay for tactile depth.
- Accent glow used sparingly (hero CTA, one signature moment).

## Components

- **Buttons:** primary = solid accent + restrained glow; secondary = hairline ghost. Consistent `rounded-lg`, proper padding/sizing, focus-visible rings.
- **Cards** (Services / Why / Blog): elevated surface + hairline, subtle lift + accent edge on hover, improved internal spacing.
- **Navbar:** refined glass-on-scroll, elegant wordmark, tighter spacing.
- **Hero:** serif headline with accent on one word, refined stat row, two-CTA layout.
- **Section rhythm:** consistent vertical spacing, generous whitespace, max-width container.

## Blog — editorial treatment

- **List page:** typographic cards with clear hierarchy, date/read-time meta, hover states.
- **Article page:** serif headings, ~68ch measure, refined MDX prose (paragraphs, headings, blockquotes, code, lists, links, images), polished sticky Table of Contents, comfortable reading rhythm.

## Motion (calm)

Scroll-reveal fade-ups with easing + stagger, gentle hover lifts, retained count-ups, one signature hero moment. Full `prefers-reduced-motion` support (reveals resolve to visible, no transforms).

## Non-goals

- No new content/copy rewrite beyond minor display formatting.
- No new dependencies beyond Google Fonts (Fraunces) via `next/font`.
- No backend/CMS changes; blog stays MDX-on-disk.
- No restructuring of section order on the landing page.

## Success criteria

1. Cohesive token system drives both landing and blog; no hard-coded ad-hoc colors.
2. Fraunces + Inter + mono trio applied consistently via `next/font`.
3. Accent appears surgically, not on every element.
4. Blog article reading experience is visibly premium (measure, prose styles, TOC).
5. Existing tests still pass (or are updated for intentional markup changes).
6. Light + dark themes both look intentional.
7. `prefers-reduced-motion` respected.
