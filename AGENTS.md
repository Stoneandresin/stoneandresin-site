Solo dev. Node/TypeScript monorepo. Primary apps:
- /apps/quote-builder (Next.js)
- /functions (Twilio/Zapier helpers)
- /data (JSON sources)
Install: `npm ci`
- Lint: `npm run lint`
- Test: `npm test -- --coverage`
- Build (web): `npm run build`
- Dev (web): `npm run dev`
TypeScript strict; fix all ESLint errors.
- Conventional commits (`feat:`, `fix:`, etc.).
- Keep pricing math in `/apps/quote-builder/lib/pricing.ts`.

- Small features (<200 LOC), unit tests, JSON/data updates, doc edits, refactors without API changes.

- Auth/security, payments, real secrets, deployment keys, production envs.

- Explain what changed and **why**, list commands run, paste test summary.
- Don’t modify payment/auth or .env files.
