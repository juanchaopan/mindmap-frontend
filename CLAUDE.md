# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (also runs type-check)
npm run lint     # ESLint
npx tsc --noEmit # Type-check without building
```

There are no tests configured yet.

## Environment

Copy `.env.local` and fill in the values before running:

```
AUTH_SECRET=          # openssl rand -base64 32
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=demo
KEYCLOAK_CLIENT_ID=   # Keycloak client ID
KEYCLOAK_CLIENT_SECRET=  # Leave empty for public clients
```

Keycloak client must have **Direct Access Grants** enabled (Resource Owner Password Credentials flow).

## Architecture

**Auth split — two config files are required by next-auth v5:**

- `auth.config.ts` — edge-compatible config (no Node-only imports). Used exclusively by `middleware.ts` to run route guards on the Edge runtime.
- `auth.ts` — full config that spreads `authConfig` and adds the Credentials provider. Imported by server components and API routes.

The Credentials provider calls Keycloak's token endpoint (`/protocol/openid-connect/token`) with `grant_type=password`, then fetches `/userinfo` to build the session user. Sessions are JWT-based (no database).

**Route protection flow:**

1. `middleware.ts` runs `auth` from the edge-compatible config on every request matching `/index` or `/index/*`.
2. Unauthenticated requests are redirected to `/login?callbackUrl=<original-path>` automatically by next-auth's `authorized` callback returning `false`.
3. After login, `app/login/page.tsx` reads `callbackUrl` from search params and pushes to it via `router.push`.

**State management:**

All client-side state lives in Zustand stores under `stores/`. Currently `stores/authStore.ts` owns login form fields (`username`, `password`), async state (`isLoading`, `error`), and the `login`/`logout` actions that delegate to next-auth's `signIn`/`signOut`.

**Component/page contract:**

Pages compose components from `components/` — pages must not contain raw Tailwind layout or form markup directly. Every visible UI element has a dedicated component. Layout components (`PageLayout`, `AppHeader`, `Card`, `Alert`) are Server Components by default; input/button components (`TextInput`, `PasswordInput`, `Button`) are Client Components (`"use client"`).

`AppHeader` is a Server Component so it can embed an inline Server Action (`"use server"`) for sign-out without needing a client boundary.

**Path aliases:** `@/` maps to the repo root (configured in `tsconfig.json`).
