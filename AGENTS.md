# Stone & Resin – Agent Operations Guide

Stone & Resin maintains a marketing site and lead-generation funnel for resin-bound surfacing projects in the greater Cincinnati area. This repository contains the production Next.js 14 application that powers stoneandresin.com. Follow the guidelines below when contributing with GitHub Agent HQ or other coding agents.

## Project snapshot

- **Framework:** Next.js 14 (App Router) with TypeScript and Tailwind CSS.
- **Key entry points:**
  - `app/page.tsx` – Home page, including the instant estimator.
  - `components/Estimator.tsx` – Lead capture form and pricing logic.
  - `app/api/lead/route.ts` – Server action that forwards leads to the configured webhook.
  - `app/layout.tsx` & `components/Navbar.tsx` – Global chrome, analytics, and CTA widgets.
- **Supporting libraries:** Cloudinary helpers, Vercel Analytics, Embla carousel.

## Required commands

Run these commands before opening, updating, or approving a pull request:

- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Production build smoke-test: `npm run build`
- Lint (Next.js + ESLint): `npm run lint`

> **Always** run `npm run lint` and `npm run build` locally (or in CI) before requesting a review. Include the results in the PR description.

## Code style & patterns

- Use TypeScript with functional React components and hooks.
- Tailwind CSS is the preferred styling approach; keep utility class groupings readable.
- Avoid direct DOM manipulation unless required by third-party scripts; prefer React patterns.
- Keep analytics and telemetry calls lightweight and guard against undefined globals.
- Favor small, composable components—co-locate helper functions when they are single-use.

## Testing expectations

There is no automated test suite yet. When you add tests, prefer Playwright for end-to-end coverage or Vitest/Jest for unit tests. If a change is risky (pricing logic, lead routing), add at least one automated check or document manual verification steps in the PR.

## Sensitive areas

Changes in the sections below require explicit human approval and careful review:

- `app/api/lead/route.ts` – Lead webhooks and environment variables.
- `components/Estimator.tsx` – Pricing calculations and analytics events.
- `lib/absolute-url.ts` and any future server utilities that touch request metadata.
- Deployment configuration (`next.config.js`, workflow files under `.github/`), unless the task is to update Agent HQ automation.

Do **not** hard-code secrets or tweak environment variable names without coordination. Respect existing GDPR/CCPA compliance measures (opt-out links, privacy copy).

## Allowed & discouraged work

**Agents may:**
- Update marketing copy, layout, and Tailwind styles.
- Add or refine reusable UI components inside `components/`.
- Hook up analytics events that call existing client-side wrappers.
- Improve accessibility, performance, or SEO metadata.
- Extend documentation (`README.md`, this file, onboarding guides).

**Agents must avoid unless a human requests it:**
- Altering webhook payloads or authentication flows.
- Introducing new npm dependencies.
- Touching billing, payments, or third-party integrations beyond analytics.
- Running or modifying production deployments.

## Pull request process

1. Create a feature branch off `main` (agents must never push directly to `main`).
2. Execute `npm run lint` and `npm run build`; capture any manual test notes.
3. Open a PR with:
   - Problem statement and the solution summary.
   - Verification steps (commands + manual checks).
   - Any follow-up work or flags for human attention.
4. Respond to review feedback promptly. If the task surfaces blockers outside the allowed scope, stop work and request guidance.

## Escalation

If linting/builds fail, an environment variable appears missing, or a task touches a sensitive subsystem, halt automation and notify the maintainer (Aaron Spaulding). Agents should never guess at secret values or bypass safeguards.

For more background, read the human-focused `README.md` and watch GitHub Actions results to ensure the Agent HQ workflows succeed before merging.
