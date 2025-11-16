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

## VS Code CLI & Extensions (Tip)
To use CLI checks and ensure GitHub/Copilot features work smoothly:

1) Install the `code` command (Stable) or `code-insiders` (Insiders)

- VS Code → Cmd+Shift+P → "Shell Command: Install 'code' command in PATH" → Enter
- Restart your terminal.

2) Verify the CLI

```bash
# Stable
code --version

# Insiders
code-insiders --version
```

3) Check GitHub/Copilot extensions

```bash
# List installed GitHub-related extensions
code --list-extensions --show-versions | grep -i github || true

# Install any missing ones (Stable)
code --install-extension GitHub.vscode-authentication
code --install-extension GitHub.vscode-pull-request-github
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat

# Insiders variant (if you use Insiders)
code-insiders --install-extension GitHub.vscode-authentication
code-insiders --install-extension GitHub.vscode-pull-request-github
code-insiders --install-extension GitHub.copilot
code-insiders --install-extension GitHub.copilot-chat
```

4) Prefer Copilot Chat Pre-Release (optional, recommended)

- Extensions view → search "GitHub Copilot Chat" → gear → "Switch to Pre-Release Version". Works best on VS Code Insiders.

Note: The workspace includes `.vscode/extensions.json` with recommendations. VS Code will prompt to install them when you open this folder.
