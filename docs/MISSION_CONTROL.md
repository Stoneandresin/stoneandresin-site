# Mission Control

A single place to run, verify, and ship changes with Agent HQ.

## Daily Flow
- Create a branch off `main`:
  ```bash
  git checkout -b feature/short-name
  ```
- Run locally before any PR:
  ```bash
  npm install
  npm run lint
  npm run build
  ```
- Commit and push:
  ```bash
  git add -A
  git commit -m "<concise summary>"
  git push -u origin HEAD
  ```
- Open a PR to `main`. Fill out the PR template checklist.

## Agent HQ Workflows
- Agent HQ Quality Gate
  - Installs deps, runs `npm run lint`, `npm run build` and (optionally) coverage.
- Agent Provenance Gate
  - Warns if PR mentions sensitive areas and if PR body lacks lint/build confirmation.
- Find runs in GitHub → Actions tab. Both must pass before merge.

## Sensitive Areas (require human review)
- `app/api/lead/route.ts`, `components/Estimator.tsx`, server utilities under `lib/`.
- Any deployment or workflow file under `.github/`.

## Quick Commands
- Verify locally (same as CI):
  ```bash
  npm run ci:verify
  ```
- Start dev server:
  ```bash
  npm run dev
  ```

## PR Checklist (short)
- [ ] Ran `npm run lint` with no errors.
- [ ] Ran `npm run build` successfully.
- [ ] If risky logic changed, documented manual verification or added tests.
- [ ] No secrets added; env names unchanged.

## After Merge
- Confirm production deploy (Vercel) succeeds.
- Spot-check estimator and lead flow end-to-end.

See also: `AGENTS.md` for agent-specific rules and project context.
