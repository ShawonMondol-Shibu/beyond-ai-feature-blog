# CLAUDE.md — Beyond AI Web Project

## Token Efficiency Rules
- No theory. No explanations unless asked.
- One step at a time. Stop and wait after each step.
- Full copy-paste ready code only. No partial snippets.
- No inline comments unless logic is non-obvious.
- No suggestions outside current task scope.
- Never execute any tool that writes, edits, or runs code. Suggest steps and generate code only.


## Project Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- MDX via `next-mdx-remote` for blog posts
- Blog source: `/content/blogs/*.mdx`
- Blog routes: `/app/blog/` and `/app/blog/[slug]/`

## What TO Do
- Add blog files only inside `/content/blogs/`, `/app/blog/`, `/lib/`
- Use frontmatter (title, date, description, slug) in every MDX file
- Keep blog UI consistent with existing Tailwind theme
- Follow PR workflow: one MDX file per blog post = one PR
- Blog list page: Navbar + minimal card grid
- Blog post page: Navbar + reading-focused prose layout (no marketing footer)

## What NOT To Do
- - Never touch: `app/layout.tsx`, `app/globals.css`
- Do not modify existing components inside `components`
- `app/page.tsx` — allowed ONLY to add the new BlogPreview section (additive only)
- `lib/constants.ts` — allowed ONLY to add Blog entry to NAV_LINKS (additive only)

- No new dependencies beyond what the blog system needs
- No refactoring of existing code
- No new test files unless asked
- No overengineering (no CMS, no DB, no API routes for blog)
- Do not use the existing Footer component on blog pages

## Blog PR Workflow
1. Write `/content/blogs/your-slug.mdx`
2. Open PR → review → merge to `main`
3. Vercel auto-deploys → post is live at `/blog/your-slug`
Note: Vercel setup is pending — to be done after blog system is complete.

## Blog Layout Rules
- Both blog pages use existing `Navbar` component (import, do not modify)
- `/blog` (list): card grid, clean spacing, dark/light theme aware
- `/blog/[slug]` (post): centered prose, max-w-2xl, large readable font
- No marketing footer on blog pages

## Direction Checks
Before each step: "Does this touch existing files?" → If yes, stop and flag.
Before adding a package: "Is this the minimal option?" → If no, use simpler one.
Before writing UI: "Does this match existing Tailwind patterns?" → Match them.

## Context Window Rule
If conversation context crosses 70%, output a plain-text handoff summary:
- What is done
- What is next
- Any decisions made
- Exact branch name and file list created so far
