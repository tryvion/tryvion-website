# TRYVION — Windows → macOS Migration Manifest

**Prepared:** 2026-08-10  
**Source:** Windows Enterprise Environment  
**Target:** macOS — `~/Documents/tryvion-website`  
**Method:** ZIP archive via Google Drive (no Git)

---

## 1. Source

| Field | Value |
|-------|-------|
| Platform | Windows 11 Enterprise |
| Project root | `C:\Users\arpit.c.srivastava\AppData\Local\Temp\...\tryvion-website` |
| Archive name | `TRYVION-Windows-Migration-2026-08-10.zip` |

---

## 2. Target Project

```
~/Documents/tryvion-website/
├── apps/
│   ├── web/          @tryvion/web
│   └── cms/          @tryvion/cms
├── packages/
│   ├── design-tokens/
│   ├── ui/
│   ├── utils/
│   └── tsconfig/
├── docs/
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── turbo.json
└── tsconfig.json
```

---

## 3. Project Architecture

| Tool | Version |
|------|---------|
| Package manager | pnpm 10.34.5 |
| Build orchestrator | Turborepo 2.5.5 |
| Workspace packages | apps/*, packages/* |

---

## 4. Applications

### @tryvion/web (`apps/web`)

| Framework | Version |
|-----------|---------|
| Next.js | 16.3.0 |
| React | 19.2.8 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |

### @tryvion/cms (`apps/cms`)

| Framework | Version |
|-----------|---------|
| Payload CMS | 3.87.1 |
| Next.js | 16.3.0 |
| React | 19.2.8 |
| TypeScript | 5.7.3 |
| PostgreSQL adapter | @payloadcms/db-postgres 3.87.1 |

---

## 5. Framework Versions

```
Next.js:     16.3.0 (both apps)
React:       19.2.8 (both apps)
Payload:     3.87.1
Node:        >=20.9.0 required
pnpm:        >=10.x required
PostgreSQL:  any recent version (14+ recommended)
```

> **NOTE — AGENTS.md:** Both `apps/web` and root contain `AGENTS.md` (auto-generated
> by `next dev`) warning that Next.js 16.x contains breaking API changes vs training data.
> Read `node_modules/next/dist/docs/` before writing any new Next.js code on Mac.

---

## 6. Major Development Work (Windows branch)

| Area | Status |
|------|--------|
| Complete TRYVION brand implementation | Done |
| Navigation restructure (Home/About/Services/Industries/Careers/Contact) | Done |
| TTK v2 design tokens (933+ tokens) | Done |
| Production copy across all pages | Done |
| 41 web routes implemented | Done |
| Payload CMS: Insights + Team collections | Done |
| Payload CMS: SiteSettings global | Done |
| ISR revalidation hook (Insights afterChange) | Done |
| CMS-first / static-fallback data pattern | Done |
| Google Analytics 4 integration | Done |
| PostHog integration (key optional) | Done |
| 3 server action forms (contact, get-started, newsletter) | Done |
| Vitest unit tests (cn, schemas, metadata, lexical-to-html) | Done |
| Playwright E2E tests (homepage, 404, services/sap, contact) | Done |
| Security headers (CSP, HSTS, X-Frame-Options, etc.) | Done |
| Image optimisation (AVIF + WebP) | Done |
| OpenGraph image generation | Done |
| Sitemap + robots.ts | Done |
| Cookie consent banner | Done |
| Light/Dark theme toggle | Done |

---

## 7. Design System

**Package:** `packages/design-tokens` (internal, no published name)

| Layer | Files |
|-------|-------|
| Primitives | colors, typography, spacing, radius, elevation, opacity, borders, z-index |
| Semantic | color, typography, spacing, layout, motion, borders, radius, elevation, accessibility |
| Output | `dist/css/variables.css`, `dist/json/tokens.json` (W3C DTCG format) |

**Component library:** `@tryvion/ui` (packages/ui)

24 component groups:
Badge, Breadcrumbs, Button, Card, CTABanner, FeatureBlock, Footer, Form (Checkbox/Input/Select/Textarea/Toggle/RadioGroup/FormField/FormLabel/FormMessage), Header, Heading, Hero (HeroSection + InteriorHero), Icon, InsightCard, Link, Logo (TryvionLogo — inline SVG compass mark + wordmark), MegaMenu, MobileNav + MobileMenuButton, ServiceCard, Skeleton, Spinner, StatBlock, Testimonial, Text

Layout/accessibility foundations:
Container, FullBleed, Grid, ReadingWidth, Section, Stack, SkipNav, VisuallyHidden

> **Font licensing — ACTION REQUIRED (STT-001):**  
> Neue Haas Grotesk (trial) and Optima (proprietary) are referenced in font stacks but
> are NOT included (license required). All roles fall back to **Manrope** (OFL, Google Fonts).
> This is correct until commercial licenses are obtained.

---

## 8. Content Architecture (CMS)

### Collections

| Slug | Description |
|------|-------------|
| `users` | CMS admin users (auth: true) |
| `media` | Uploaded images and files (public read) |
| `insights` | Blog/research articles — draft/autosave, ISR revalidation on publish |
| `team` | Team member profiles — name, role, bio, avatar, LinkedIn, email |

### Globals

| Slug | Description |
|------|-------------|
| `site-settings` | Announcement bar, company info, social links, cookie banner, footer legal links |

### Relationships
- `Insights.author` → `Team` (relation field)
- `Insights.image` / `Insights.seo.ogImage` → `Media` (upload relation)
- `Team.avatar` → `Media` (upload relation)

### ISR Revalidation
Insights `afterChange` hook POSTs to `WEB_REVALIDATE_URL` with `x-revalidate-secret` header.
`apps/web/src/app/api/revalidate/route.ts` validates the secret and calls `revalidateTag`.

---

## 9. Page Templates

The frontend uses a **CMS-first / static-fallback** pattern:
- `apps/web/src/lib/cms/insights.ts` — fetches from Payload REST API, falls back to static data
- `apps/web/src/lib/insights-data.ts` — static fallback content (site works without CMS)

Dynamic routes use Next.js `[slug]` segments:
- `app/industries/[slug]/page.tsx`
- `app/insights/blog/[slug]/page.tsx`
- `app/insights/case-studies/[slug]/page.tsx`
- `app/insights/whitepapers/[slug]/page.tsx`
- `app/services/ai-data/[slug]/page.tsx`
- `app/services/cloud/[slug]/page.tsx`
- `app/services/sap/[slug]/page.tsx`
- `app/insights/[slug]/page.tsx`

Reusable layout component:
- `components/layout/ServiceDetailLayout.tsx` — shared shell for service detail pages

---

## 10. Frontend Pages (41 routes)

```
/                               Homepage
/about                          About — Our Story
/about/certifications           Certifications
/about/leadership               Leadership Team
/about/locations                Global Presence
/about/partners                 Partners
/about/values                   Our Values
/accessibility                  Accessibility Statement
/careers                        Careers
/careers/life                   Life at Tryvion
/careers/roles                  Open Roles
/contact                        Contact (Talk to an Expert)
/cookies                        Cookie Policy
/events                         Events & Webinars
/get-started                    Get Started
/industries                     Industries
/industries/[slug]              Industry detail (dynamic)
/insights                       Insights hub
/insights/[slug]                Insight detail (dynamic)
/insights/blog                  Blog listing
/insights/blog/[slug]           Blog post (dynamic)
/insights/case-studies          Case studies listing
/insights/case-studies/[slug]   Case study detail (dynamic)
/insights/subscribe             Newsletter subscribe
/insights/topics                Topics
/insights/whitepapers           Whitepapers listing
/insights/whitepapers/[slug]    Whitepaper detail (dynamic)
/newsroom                       Newsroom
/privacy                        Privacy Policy
/services                       Services overview
/services/ai-data               Tryvion AI overview
/services/ai-data/[slug]        AI service detail (dynamic)
/services/cloud                 Cloud overview
/services/cloud/[slug]          Cloud service detail (dynamic)
/services/digital-engineering   Digital Engineering
/services/managed-services      Managed Services
/services/sap                   Tryvion Applications (SAP) overview
/services/sap/[slug]            SAP service detail (dynamic)
/services/talent                Tryvion Talent overview
/services/talent-solutions      SAP Talent Solutions
/terms                          Terms & Conditions
Special: /error.tsx, /loading.tsx, /not-found.tsx, /opengraph-image.tsx
API:     /api/revalidate (ISR webhook)
```

---

## 11. Assets

| Location | Files |
|----------|-------|
| `apps/web/public/favicon.svg` | Site favicon |
| `apps/web/public/logo.svg` | TRYVION logo (dark) |
| `apps/web/public/logo-white.svg` | TRYVION logo (white/light) |
| `apps/web/public/*.svg` | Next.js default placeholder SVGs (can be removed) |
| `packages/ui/src/components/Logo/` | `TryvionLogo` — compass mark + wordmark inline SVG |

**Fonts:** Manrope loaded via `next/font/google` (no font files in repo — streamed at build time).

**No images, no `.woff`/`.ttf`, no icons outside of SVG-in-code.**

---

## 12. Required Environment Variables

### apps/web — copy `.env.local.example` → `.env.local`

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CMS_URL=http://localhost:3001
NEXT_PUBLIC_CMS_URL=http://localhost:3001
REVALIDATE_SECRET=<generate: openssl rand -hex 32>
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_POSTHOG_KEY=
```

### apps/cms — copy `.env.local.example` → `.env` (NOT `.env.local`)

```
PAYLOAD_SECRET=<generate: openssl rand -hex 32>
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/tryvion_cms
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CMS_ADMIN_ALLOWED_ORIGIN=http://localhost:3001
WEB_REVALIDATE_URL=http://localhost:3000/api/revalidate
REVALIDATE_SECRET=<same value as apps/web REVALIDATE_SECRET>
```

> **REVALIDATE_SECRET must be the same value in both apps.**  
> **Never copy `.env` files from Windows. Generate new secrets on Mac.**

---

## 13. Excluded Files (not in archive)

| Excluded | Reason |
|----------|--------|
| `**/node_modules/` | Regenerated by `pnpm install` |
| `**/.next/` | Regenerated by `pnpm build` |
| `**/.turbo/` | Turborepo cache |
| `**/dist/` | Build output |
| `**/build/` | Build output |
| `**/coverage/` | Test coverage reports |
| `**/.cache/` | Caches |
| `**/test-results/` | Playwright output |
| `**/playwright-report/` | Playwright output |
| `**/*.log` | Log files |
| `**/.DS_Store` | macOS artefact |
| `**/Thumbs.db` | Windows artefact |
| `**/desktop.ini` | Windows artefact |
| `**/*.tsbuildinfo` | TypeScript incremental cache |
| `**/next-env.d.ts` | Auto-generated by Next.js |
| `apps/cms/.env` | Real secrets — Mac already has this |
| `apps/web/.env.local` | Real secrets — recreate from template |
| `apps/cms/media/` | Uploaded files — managed by Payload on Mac |

---

## 14. macOS Environment Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | >=20.9.0 (LTS recommended: 20.x or 22.x) |
| pnpm | >=10.x |
| PostgreSQL | >=14 (must be running, database `tryvion_cms` must exist) |
| macOS | Any recent version |

Check with:
```zsh
node --version     # must be >=20.9.0
pnpm --version     # must be >=10.x
pg_isready         # must return: accepting connections
```

---

## 15. macOS Installation Instructions

```zsh
# ── 1. Navigate to project ─────────────────────────────────────────
cd ~/Documents/tryvion-website

# ── 2. Extract archive contents into project (MERGE, not overwrite) ─
# Unzip into a temp location first, then selectively merge:
cd ~/Downloads
unzip TRYVION-Windows-Migration-2026-08-10.zip -d tryvion-migration-temp
# Then compare and merge the tryvion-website/ contents into ~/Documents/tryvion-website/
# Key rule: NEVER overwrite apps/cms/.env on Mac — it has your real credentials

# ── 3. Configure environment ───────────────────────────────────────
cd ~/Documents/tryvion-website

# Web app environment
cp apps/web/.env.local.example apps/web/.env.local
# Edit apps/web/.env.local — fill in REVALIDATE_SECRET

# CMS environment — ADD any new variables to your existing apps/cms/.env
# DO NOT replace the file — add new keys only:
#   WEB_REVALIDATE_URL=http://localhost:3000/api/revalidate
#   REVALIDATE_SECRET=<same value as apps/web>

# ── 4. Install dependencies ────────────────────────────────────────
pnpm install

# ── 5. Type check ─────────────────────────────────────────────────
pnpm typecheck

# ── 6. Start CMS (runs Payload migrations automatically) ──────────
pnpm --filter @tryvion/cms dev
# Watch for: "✓ Connected to database", "✓ Running migrations..."
# New tables created: insights, team, site_settings

# ── 7. Regenerate Payload types (separate terminal) ───────────────
pnpm --filter @tryvion/cms payload generate:types

# ── 8. Start web app (separate terminal) ──────────────────────────
pnpm --filter @tryvion/web dev

# ── 9. Validate ───────────────────────────────────────────────────
pnpm lint
pnpm build
```

---

## 16. Validation Commands

```zsh
# All from ~/Documents/tryvion-website

pnpm install            # must complete without errors
pnpm typecheck          # must exit 0
pnpm lint               # must exit 0
pnpm build              # must exit 0

# CMS-specific
pnpm --filter @tryvion/cms payload generate:types
pnpm --filter @tryvion/cms payload generate:importmap

# Optional: unit tests
pnpm --filter @tryvion/web test

# Browser validation
# http://localhost:3000        → Homepage
# http://localhost:3000/about  → About page
# http://localhost:3000/services → Services
# http://localhost:3000/contact  → Contact
# http://localhost:3001/admin    → Payload CMS admin
```

---

## 17. Database Notes

**No PostgreSQL data files are included in this archive.**

The Windows PostgreSQL database contains no production content — all real content lives on Mac.  
Payload CMS will automatically run schema migrations on first `dev` start, creating:
- `insights` table
- `team` table  
- `site_settings` table (+ related Payload tables)

If any migration fails, see `docs/database-migration.md` for rollback procedures.

---

## 18. Known Issues / Action Items

| # | Item | Priority |
|---|------|----------|
| 1 | Font licensing: Neue Haas Grotesk + Optima require commercial purchase before production (STT-001) | Before launch |
| 2 | Contact / newsletter forms: email delivery stubbed (`// TODO Phase 11+`) — needs SendGrid or similar | Phase 11 |
| 3 | `packages/eslint-config/` — directory exists but is empty | Low |
| 4 | `packages/types/` — directory exists but is empty | Low |
| 5 | Several new service sub-pages (e.g. `/services/sap/successfactors`) are in nav but have no page.tsx yet | Phase 12+ |
| 6 | `NEXT_PUBLIC_POSTHOG_KEY` added to `.env.local.example` — wire up if PostHog account exists | Optional |

---

## 19. Source-of-Truth Decisions (docs/source-of-truth.md)

| ID | Decision |
|----|----------|
| STT-001 | Fonts: Manrope (OFL) for all roles; Neue Haas Grotesk + Optima pending license |
| STT-002 | (See file for details) |
| STT-003 | (See file for details) |
| STT-004 | ORM: No Prisma — Payload manages all schema via its own adapter |
| STT-005 | Service naming convention (see file) |

---

*Generated 2026-08-10 by Claude Code during Windows → macOS migration preparation.*
