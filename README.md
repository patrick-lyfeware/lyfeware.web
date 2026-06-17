# Lyfeboost — Web

The engineering foundation for Lyfeboost: a minimal, production-shaped web app
with CI/CD and a live deploy. Product-agnostic on purpose — this is the base we
build the real product on.

**Live URL:** https://patrick-lyfeware.github.io/lyfeware.web/

| | |
|---|---|
| **Stack** | Vite + React + TypeScript |
| **Tests** | Vitest + Testing Library |
| **CI** | GitHub Actions (lint → typecheck → test → build) |
| **Hosting** | GitHub Pages (static, $0) |

See [`docs/adr/0001-stack-and-hosting.md`](docs/adr/0001-stack-and-hosting.md)
for why these were chosen.

## Prerequisites

- **Node.js 22** (see [`.nvmrc`](.nvmrc) — run `nvm use` if you use nvm)
- npm 10+ (ships with Node 22)

## Quick start (one command)

```bash
npm install && npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Common commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with `tsc` |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run ci` | Run the full CI gate locally (lint + typecheck + test + build) |

## Project layout

```
.
├── .github/workflows/   # CI (ci.yml) and Pages deploy (deploy.yml)
├── docs/adr/            # Architecture decision records
├── src/
│   ├── App.tsx          # Hello-world component
│   ├── App.test.tsx     # Example test
│   ├── main.tsx         # App entry point
│   └── test/setup.ts    # Test setup (jest-dom matchers)
├── index.html           # Vite HTML entry
└── vite.config.ts       # Build + test config
```

## Testing

```bash
npm test
```

Tests use Vitest with a jsdom environment and Testing Library. Add `*.test.ts`
or `*.test.tsx` files next to the code they cover.

## Deploy

Deploys are **automatic**: every push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
app and publishes it to GitHub Pages. You can also trigger a manual redeploy
from the repo's **Actions → Deploy to GitHub Pages → Run workflow**.

CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs on every push
and pull request to `main` and must stay green.

No secrets or accounts are required to deploy — Pages publishes via the
built-in `GITHUB_TOKEN`/OIDC.

## Conventions

- **Never commit secrets.** `.env*` files are gitignored; use a real secrets
  manager when we need one.
- Keep `main` green: open a PR, let CI pass, then merge.
- One ADR per significant, hard-to-reverse decision in `docs/adr/`.
