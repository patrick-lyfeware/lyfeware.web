# ADR 0001 — Stack and hosting for the engineering foundation

- **Status:** Accepted
- **Date:** 2026-06-17
- **Decider:** CTO (LYF-2)

## Context

Lyfeboost has no codebase yet. We need a foundation that lets us ship and
iterate fast, with CI/CD and a live deploy, before the product is even decided.
The brief: pick something pragmatic, boring, and well-supported; optimize for
speed of learning and reversibility; flag any recurring cost before committing.

## Decision

**Frontend stack: Vite + React + TypeScript.**

- Vite is the de-facto standard build tool for modern web apps: instant dev
  server, fast HMR, near-zero config.
- React + TypeScript is the most widely-known, most-hireable, best-documented
  combination. Boring on purpose — easy to staff, easy to get help with.
- Vitest + Testing Library for tests: same config as Vite, fast, familiar API.

**Hosting/CI/CD: GitHub Actions → GitHub Pages.**

- GitHub Pages serves the static build for **$0**, with **no extra accounts or
  vendors** to manage. CI/CD is GitHub Actions, which we already have via the
  repo.
- One workflow gates `main` (lint → typecheck → test → build); another builds
  and publishes to Pages on every push to `main`.
- Deploys use the built-in `GITHUB_TOKEN`/OIDC — no secrets to store.

## Why not the alternatives

- **Next.js / Remix (SSR frameworks):** more power (server rendering, API
  routes) but also more complexity and a server to host/pay for. Premature for a
  hello-world. We can adopt one later when the product needs server-side logic.
- **Vercel / Netlify / Cloudflare Pages:** excellent DX and free tiers that also
  support *private* repos, but each adds a vendor account + auth to set up. We
  chose the path we could stand up end-to-end today with only our GitHub
  credentials. Easy to migrate to later (it's still a static build).
- **A backend now (Node/Postgres/etc.):** no product requirements yet, so any
  backend choice would be a guess. Defer until we know what we're building.

## Consequences

- ✅ Zero recurring infra cost. Zero new vendors. Reachable URL today.
- ✅ Fully reversible: it's a standard Vite static build, portable to any host.
- ⚠️ **Public repo trade-off.** GitHub Pages on the free plan requires a
  **public** repo. Our other repos are private, so this is a deliberate
  exception for a zero-IP hello-world. **Flagged to the CEO (LYF-2).** When we
  put real IP in this repo we will either:
  1. upgrade to **GitHub Team (~$4/user/mo)** for private-repo Pages, or
  2. move hosting to **Cloudflare Pages / Vercel / Netlify** (free tier supports
     private repos), which needs a one-time vendor-account setup.
- ⚠️ Static-only for now. When we need a backend/SSR, revisit hosting (this ADR
  gets superseded).

## Revisit when

- We add real proprietary code (→ make repo private + pick private hosting).
- We need server-side rendering, auth, a database, or background jobs.
