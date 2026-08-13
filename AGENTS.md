# AGENTS.md

React 19 + Vite + TanStack Router/Query + Tailwind v4 SPA ("futaverse-frontend"). Package manager: **pnpm** (ignore the stale `package-lock.json`).

## Commands

- `pnpm dev` / `pnpm start` — dev server on port 3000
- `pnpm build` — `vite build && tsc` (tsc is `noEmit`; typecheck runs _after_ the build). Typecheck only: `npx tsc`
- `pnpm check` — `prettier --write . && eslint --fix` (mutates files; fastest way to fix lint/format before committing)
- `pnpm test` — `vitest run`. **Currently broken**: the `test` block (jsdom env) in `vite.config.ts` is commented out, so the one existing test (`src/App.test.tsx`) fails with `document is not defined`. Uncomment that block or add `// @vitest-environment jsdom` to test files to make DOM tests work.

Requires `.env` with `VITE_API_URL` (backend base URL).

## Routing: code-based, NOT file-based

Despite the `tanstackRouter()` vite plugin and the generated `src/routeTree.gen.ts`, routing is **hand-built** — `routeTree.gen.ts` is empty and unused. The real tree is `src/routes/route.tsx`, assembled from:

- `src/routes/__root.tsx` — root route (`createRootRouteWithContext<{ auth }>`)
- `src/routes/public.tsx` — landing, login, signup/OTP, onboarding routes
- `src/routes/user-student.tsx`, `src/routes/user-alumnus.tsx` — role dashboards

To add a route: `createRoute` in the appropriate file, then register it in `route.tsx`. Do not expect files added to `src/routes/` to become routes automatically. (The README's routing sections are stale create-tanstack boilerplate — trust the code.)

**Continue with this code-based TanStack Router setup** — do not migrate to file-based routing or another router.

## Auth & API

- Auth state lives in `sessionStorage` (`access_token`, `role`), mirrored into React via `AuthProvider` (`src/hooks/auth-context.tsx`) and into the router via context.
- Protect routes with `beforeLoad: requireRole(['student' | 'alumnus'])` from `src/lib/guard.tsx` (reads sessionStorage directly, so it works before React renders).
- Roles: `student`, `alumnus` (full dashboards), `lecturer` (onboarding only).
- Use the shared client `src/lib/api.tsx` for backend calls: attaches the Bearer token and hard-redirects to `/login` on 401.
- **Prefer native `fetch` over axios for new code** (user preference) — don't add new axios usage. The axios instance stays for existing callers until migrated; replicate its behavior (Bearer token from `sessionStorage`, redirect to `/login` on 401) in new fetch code.

## Layout

- Feature pages: `src/pages/user/{Student,Alumnus}/<Feature>/` and `src/pages/onboarding/{Student,Lecturer,Alumnus}/`
- Shared UI: `src/components/ui/` (shadcn, new-york style, zinc) — add more with `pnpx shadcn@latest add <name>`
- `src/hooks/` (data hooks + auth context), `src/services/` (API service layer over the api client), `src/types/`, `src/data/` (mocks), `src/lib/` (api, guard, utils)
- Path alias `@/*` → `src/*` (configured in both vite and tsconfig)

## Conventions & gotchas

- Prettier: **no semicolons, single quotes**, trailing commas.
- ESLint enforces `import/order`: alphabetized, blank line between groups, `@tanstack/**` before other externals. Just run `pnpm check`.
- Always import from `@tanstack/react-query` (v5). Legacy `react-query` v3 is installed but unused — never import it.
- Icons: `lucide-react` (used everywhere); `iconsax-reactjs` appears in only one file — prefer lucide.
- Zustand is used for onboarding form stores; TanStack Query for server state.
- Deploys to Vercel as an SPA (`vercel.json` rewrites all paths to `/`). No CI.
