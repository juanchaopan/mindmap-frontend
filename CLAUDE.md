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

Keycloak client must have **Standard flow** enabled (Authorization Code flow).

## Architecture

**Auth — single config file:**

- `auth.ts` — sole NextAuth config. Owns `pages`, `authorized` callback, `session` strategy, and the Keycloak provider. Imported by server components, API routes, and `proxy.ts`.

`auth.config.ts` has been deleted. The edge-compatible split it provided was only necessary when `middleware.ts` ran on the Edge runtime. Next.js 16 replaced `middleware.ts` with `proxy.ts`, which runs on Node.js, so the split is no longer needed.

Login uses Keycloak's OAuth flow (Authorization Code + PKCE). Sessions are JWT-based (no database). No access or ID tokens are stored in the session — only the default `user` object (name, email, image) from Keycloak's userinfo endpoint.

**Route protection flow:**

1. `proxy.ts` re-exports `auth` from `./auth` as its default and matches `/index` and `/index/*`.
2. Unauthenticated requests are redirected to `/login?callbackUrl=<original-path>` automatically by next-auth's `authorized` callback returning `false`.
3. `app/login/page.tsx` fires `signIn("keycloak", { callbackUrl })` on mount, delegating the full OAuth redirect to next-auth.

**State management:**

No Zustand stores are currently in use. Call next-auth's `signIn`/`signOut` directly where needed.

**Component/page contract:**

Pages compose components from `components/` — pages must not contain raw Tailwind layout or form markup directly. Every visible UI element has a dedicated component. Layout components (`PageLayout`, `AppHeader`, `Card`, `Alert`) are Server Components by default; input/button components (`TextInput`, `PasswordInput`, `Button`) are Client Components (`"use client"`).

`AppHeader` is a Server Component so it can embed an inline Server Action (`"use server"`) for sign-out without needing a client boundary.

**Path aliases:** `@/` maps to the repo root (configured in `tsconfig.json`).
