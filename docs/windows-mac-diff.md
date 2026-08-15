# TRYVION — Windows vs Mac Difference Analysis

**Generated:** 2026-08-09  
**Classification Key:**

| Code | Meaning |
|------|---------|
| **A** | KEEP MAC VERSION — Mac has the authoritative version |
| **B** | MIGRATE WINDOWS VERSION — Windows has new work that Mac lacks |
| **C** | MERGE BOTH — both sides have changes that must be reconciled |
| **D** | REMOVE / DEPRECATE — no longer needed |
| **E** | REQUIRES HUMAN DECISION — conflicting intent, human must decide |

---

## 1. Infrastructure & Configuration

| File | Windows | Mac | Classification | Notes |
|------|---------|-----|----------------|-------|
| `package.json` (root) | Updated scripts, pnpm config | Initial version | **C** | Merge: Windows adds `pnpm.onlyBuiltDependencies`. Keep Mac runtime versions |
| `pnpm-workspace.yaml` | `apps/* packages/*` | Same | **A** | Identical — Mac is fine |
| `turbo.json` | Full pipeline with test/e2e/clean | Basic dev/build | **B** | Migrate Windows version (adds lint, typecheck, test, clean tasks) |
| `.npmrc` | `auto-install-peers=true` etc. | Unknown | **B** | Migrate Windows version |
| `.gitignore` | Comprehensive (DS_Store, pem, etc.) | Assumed same | **A** | Mac version is adequate; verify .env exclusions |
| `.editorconfig` | 2-space indent, LF | Unknown | **B** | Migrate Windows version for consistency |
| `.prettierrc` | Standard config | Unknown | **B** | Migrate Windows version |
| `tsconfig.json` (root) | References apps/* | Basic | **B** | Migrate Windows version |

---

## 2. apps/web Configuration

| File | Windows | Mac | Classification | Notes |
|------|---------|-----|----------------|-------|
| `apps/web/package.json` | Full deps: next 16.3.0, react 19.2.8, full test stack | Minimal initial | **B** | Migrate Windows version entirely |
| `apps/web/next.config.ts` | Security headers, images, CMS redirect, transpilePackages | Basic | **B** | Migrate Windows version |
| `apps/web/tsconfig.json` | Extends `@tryvion/tsconfig/next`, path aliases | Basic | **B** | Migrate Windows version |
| `apps/web/postcss.config.mjs` | Tailwind v4 PostCSS | Unknown | **B** | Migrate Windows version |
| `apps/web/eslint.config.mjs` | Flat config | Unknown | **B** | Migrate Windows version |
| `apps/web/vitest.config.ts` | Full unit test config | Not present | **B** | New file |
| `apps/web/playwright.config.ts` | Full E2E config | Not present | **B** | New file |

---

## 3. apps/web Source — Core Files

| File | Windows | Mac | Classification | Notes |
|------|---------|-----|----------------|-------|
| `src/app/globals.css` | Full Tailwind v4 + tokens + `@source inline()` | Minimal | **B** | Migrate — critical for grid layout |
| `src/app/layout.tsx` | Complete: fonts, metadata, header, footer | Placeholder | **B** | Migrate Windows version |
| `src/app/page.tsx` | Full homepage | Placeholder | **B** | Migrate Windows version |
| `src/app/loading.tsx` | Skeleton loader | Not present | **B** | New file |
| `src/app/error.tsx` | Error boundary | Not present | **B** | New file |
| `src/app/not-found.tsx` | 404 page | Not present | **B** | New file |
| `src/app/robots.ts` | robots.txt gen | Not present | **B** | New file |
| `src/app/sitemap.ts` | sitemap.xml gen | Not present | **B** | New file |
| `src/app/opengraph-image.tsx` | OG image | Not present | **B** | New file |

---

## 4. apps/web Pages (all new — all B)

All 41 `page.tsx` files are **B — Migrate Windows Version**.  
None of these exist on Mac's current `main` branch.

Routes added:
- `/about` and 5 sub-pages
- `/accessibility`
- `/careers` and 2 sub-pages
- `/contact`
- `/cookies`
- `/events`
- `/get-started`
- `/industries` + `[slug]`
- `/insights` + 6 sub-routes + `[slug]` dynamic
- `/newsroom`
- `/privacy`
- `/services` + 7 service pages + 3 `[slug]` dynamic routes
- `/terms`

---

## 5. apps/web Components and Libs (all new — all B)

| Directory | Status |
|-----------|--------|
| `src/components/analytics/` | **B** — New |
| `src/components/consent/` | **B** — New |
| `src/components/layout/` | **B** — New (SiteHeader, SiteFooter, ServiceDetailLayout) |
| `src/components/navigation/` | **B** — New (ScrollHeader, MobileNav, NavData) |
| `src/lib/cms/` | **B** — New (CMS client with static fallback) |
| `src/lib/insights-data.ts` | **B** — New (7 static articles) |
| `src/lib/metadata.ts` | **B** — New (buildMetadata helper) |
| `src/test/` | **B** — New |
| `apps/web/tests/` | **B** — New (E2E tests) |

---

## 6. apps/cms

| File | Windows | Mac | Classification | Notes |
|------|---------|-----|----------------|-------|
| `src/payload.config.ts` | PostgreSQL, Insights + Team + SiteSettings | PostgreSQL, Users + Media only | **C** | Merge: Windows adds new collections/globals; preserve Mac DB credentials |
| `src/collections/Users.ts` | Same | Same | **A** | No change needed |
| `src/collections/Media.ts` | Same | Same | **A** | No change needed |
| `src/collections/Insights.ts` | New collection | Not present | **B** | New file |
| `src/collections/Team.ts` | New collection | Not present | **B** | New file |
| `src/globals/SiteSettings.ts` | New global | Not present | **B** | New file |
| `src/payload-types.ts` | Generated types | Generated types | **E** | Regenerate on Mac after migration (`payload generate:types`) |
| `.env.example` | PostgreSQL template (fixed) | MongoDB template (wrong) | **B** | Windows version is correct |
| `.env` | Mac credentials (ignored by git) | Mac credentials | **A** | NEVER overwrite — Mac .env has real DB credentials |

---

## 7. packages/ui

| Item | Windows | Mac | Classification |
|------|---------|-----|----------------|
| All 23 components | Complete implementation | Placeholder/empty | **B** |
| `foundations/` | Complete | Placeholder/empty | **B** |
| `index.ts` | Full exports | Minimal | **B** |
| `package.json` | Full with peer deps | Minimal | **B** |

---

## 8. packages/design-tokens

| Item | Windows | Mac | Classification |
|------|---------|-----|----------------|
| `src/` (token definitions) | Complete TRYVION token system | Minimal/placeholder | **B** |
| `dist/` | Build output | Stale or absent | **D** | Regenerate via `pnpm build` |

---

## 9. packages/utils

| Item | Windows | Mac | Classification |
|------|---------|-----|----------------|
| `src/cn.ts` | `cn()` utility | Unknown | **B** |
| `package.json` | With clsx + tailwind-merge deps | Unknown | **B** |

---

## 10. Environment Variables

| Variable | Windows | Mac | Classification |
|----------|---------|-----|----------------|
| `DATABASE_URL` | Placeholder in `.env.example` | Real value in `.env` (ignored by git) | **A** | Mac value is authoritative |
| `PAYLOAD_SECRET` | Placeholder in `.env.example` | Real value in `.env` (ignored by git) | **A** | Mac value is authoritative |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Same | **A** | No change |
| `NEXT_PUBLIC_CMS_URL` | `http://localhost:3001` | Same | **A** | No change |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Not set (empty) | Not set (empty) | **A** | Set in Vercel when ready |

---

## 11. Documentation

| File | Windows | Mac | Classification |
|------|---------|-----|----------------|
| `docs/mac-environment.md` | Present | Present (same) | **A** |
| `docs/source-of-truth.md` | Present | Present (same) | **A** |
| `docs/windows-project-inventory.md` | New | Not present | **B** |
| `docs/mac-project-inventory.md` | New | Not present | **B** |
| `docs/windows-mac-diff.md` | This file | Not present | **B** |
| `docs/environment-migration.md` | New | Not present | **B** |
| `docs/database-migration.md` | New | Not present | **B** |
| `docs/deployment.md` | New | Not present | **B** |
| `docs/migration/windows-to-mac.md` | New | Not present | **B** |
| `README.md` (root) | Present | Present | **C** | Merge if Mac has local changes |
| `AGENTS.md` | Present | Present | **A** | Keep existing |
| `CLAUDE.md` | Present | Present | **A** | Keep existing |

---

## 12. Public Assets

| File | Windows | Mac | Classification |
|------|---------|-----|----------------|
| `apps/web/public/favicon.svg` | New compass mark favicon | Not present | **B** |
| `apps/web/public/logo.svg` | New wordmark SVG | Not present | **B** |
| `apps/web/public/logo-white.svg` | New white wordmark | Not present | **B** |
| `apps/web/public/file.svg` | Default Next.js placeholder | Same | **D** | Can be removed later |
| `apps/web/public/globe.svg` | Default Next.js placeholder | Same | **D** | Can be removed later |

---

## 13. Items Requiring Human Decision (E)

| Item | Decision Needed |
|------|----------------|
| `apps/cms/src/payload-types.ts` | Must be regenerated on Mac after adding new collections (`pnpm --filter @tryvion/cms payload generate:types`). Do NOT copy from Windows as it may embed Windows-specific paths. |
| Font licenses | Neue Haas Grotesk and Optima require commercial licenses. Current implementation uses trial/fallback fonts. See STT-001. |
| Marg_Rekha / Together for Tomorrow | Awaiting project brief. See STT-006. |
| Production PostgreSQL | Must be provisioned before Vercel deployment. |
| GA4 ID | `NEXT_PUBLIC_GA_MEASUREMENT_ID` must be set in Vercel env vars. |
| Media storage | Local disk storage does not persist on Vercel. Cloudflare R2 or S3 required. |

---

## 14. Summary

| Classification | Count |
|----------------|-------|
| **A** — Keep Mac | ~12 items (env secrets, initial configs, git history) |
| **B** — Migrate Windows | ~150+ files (all new pages, components, design system) |
| **C** — Merge | ~5 files (root package.json, turbo.json, README, payload.config.ts) |
| **D** — Remove/Deprecate | ~3 files (default Next.js placeholder SVGs — low priority) |
| **E** — Human Decision | 6 items (payload-types, fonts, Marg_Rekha, production DB, GA4, media storage) |
