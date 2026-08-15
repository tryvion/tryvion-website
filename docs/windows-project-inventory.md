# TRYVION — Windows Project Inventory

**Generated:** 2026-08-09  
**Purpose:** Complete audit of the Windows-generated TRYVION project prior to Mac migration  
**Status:** Source-ready — all code committed to `migration/windows-to-mac` branch

---

## 1. Repository

| Item | Value |
|------|-------|
| Remote | `git@github-tryvion:tryvion/tryvion-website.git` |
| Branch (migration) | `migration/windows-to-mac` |
| Root package name | `tryvion-platform` |
| Monorepo tool | Turborepo 2.5.5 |
| Package manager | pnpm 10.34.5 |

---

## 2. Runtime Versions

| Tool | Required | Source |
|------|----------|--------|
| Node.js | `>=20.9.0` | `apps/cms/package.json` engines |
| pnpm | `>=10.x` | `package.json` packageManager |
| PostgreSQL | `>=15` | Payload db-postgres adapter |

---

## 3. Monorepo Structure

```
tryvion-website/
├── apps/
│   ├── web/          @tryvion/web       Next.js 16.3.0
│   └── cms/          @tryvion/cms       Payload CMS 3.87.1
├── packages/
│   ├── ui/           @tryvion/ui        Shared component library
│   ├── design-tokens/ @tryvion/design-tokens  CSS + TS design tokens
│   ├── utils/        @tryvion/utils     Shared utilities (cn, etc.)
│   ├── eslint-config/ @tryvion/eslint-config   ESLint presets
│   ├── tsconfig/     @tryvion/tsconfig  TypeScript base configs
│   └── types/        @tryvion/types     Shared TypeScript types
├── docs/             Project documentation
├── scripts/          (empty — setup done via setup.sh)
├── turbo.json        Turborepo pipeline
├── pnpm-workspace.yaml
├── package.json      Root workspace
├── .env.example      Root env template
├── .gitignore
├── setup.sh          First-run Mac setup script
└── dev.sh            Dev shortcut script
```

---

## 4. apps/web — Next.js Application

### Versions
| Package | Version |
|---------|---------|
| next | 16.3.0 |
| react | 19.2.8 |
| react-dom | 19.2.8 |
| typescript | ^5 |
| tailwindcss | ^4 |

### Key Dependencies
- `@tryvion/ui`, `@tryvion/design-tokens`, `@tryvion/utils` (workspace)
- `react-hook-form ^7`, `@hookform/resolvers ^5`, `zod ^3` (forms)

### Test Stack
- Vitest ^3 + @testing-library/react ^16 (unit/component)
- @playwright/test ^1 (E2E)
- axe-core ^4 (accessibility)

### Configuration Files
| File | Purpose |
|------|---------|
| `next.config.ts` | Security headers, image domains, CMS redirect |
| `tsconfig.json` | TypeScript — extends `@tryvion/tsconfig/next` |
| `postcss.config.mjs` | Tailwind v4 PostCSS setup |
| `vitest.config.ts` | Unit/component test config |
| `playwright.config.ts` | E2E test config |
| `eslint.config.mjs` | ESLint (flat config) |

### Source Directory Layout
```
apps/web/src/
├── app/              Next.js App Router pages
├── components/       Page-level and layout components
│   ├── analytics/
│   ├── consent/
│   ├── layout/       SiteHeader, SiteFooter, ServiceDetailLayout
│   └── navigation/   ScrollHeader, MobileNav, NavData
├── lib/              Data fetching, CMS client, insights data
├── config/
├── constants/
├── hooks/
├── modules/
├── providers/
├── styles/
├── test/
├── types/
└── utils/
```

---

## 5. apps/web — All Pages (41 page.tsx files)

### Static Pages
| Route | File |
|-------|------|
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/about/certifications` | `app/about/certifications/page.tsx` |
| `/about/leadership` | `app/about/leadership/page.tsx` |
| `/about/locations` | `app/about/locations/page.tsx` |
| `/about/partners` | `app/about/partners/page.tsx` |
| `/about/values` | `app/about/values/page.tsx` |
| `/accessibility` | `app/accessibility/page.tsx` |
| `/careers` | `app/careers/page.tsx` |
| `/careers/life` | `app/careers/life/page.tsx` |
| `/careers/roles` | `app/careers/roles/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/cookies` | `app/cookies/page.tsx` |
| `/events` | `app/events/page.tsx` |
| `/get-started` | `app/get-started/page.tsx` |
| `/industries` | `app/industries/page.tsx` |
| `/insights` | `app/insights/page.tsx` |
| `/insights/blog` | `app/insights/blog/page.tsx` |
| `/insights/case-studies` | `app/insights/case-studies/page.tsx` |
| `/insights/subscribe` | `app/insights/subscribe/page.tsx` |
| `/insights/topics` | `app/insights/topics/page.tsx` |
| `/insights/whitepapers` | `app/insights/whitepapers/page.tsx` |
| `/newsroom` | `app/newsroom/page.tsx` |
| `/privacy` | `app/privacy/page.tsx` |
| `/services` | `app/services/page.tsx` |
| `/services/ai-data` | `app/services/ai-data/page.tsx` |
| `/services/cloud` | `app/services/cloud/page.tsx` |
| `/services/digital-engineering` | `app/services/digital-engineering/page.tsx` |
| `/services/managed-services` | `app/services/managed-services/page.tsx` |
| `/services/sap` | `app/services/sap/page.tsx` |
| `/services/talent` | `app/services/talent/page.tsx` |
| `/services/talent-solutions` | `app/services/talent-solutions/page.tsx` |
| `/terms` | `app/terms/page.tsx` |

### Dynamic Routes
| Route | File |
|-------|------|
| `/industries/[slug]` | `app/industries/[slug]/page.tsx` |
| `/insights/[slug]` | `app/insights/[slug]/page.tsx` |
| `/insights/blog/[slug]` | `app/insights/blog/[slug]/page.tsx` |
| `/insights/case-studies/[slug]` | `app/insights/case-studies/[slug]/page.tsx` |
| `/insights/whitepapers/[slug]` | `app/insights/whitepapers/[slug]/page.tsx` |
| `/services/ai-data/[slug]` | `app/services/ai-data/[slug]/page.tsx` |
| `/services/cloud/[slug]` | `app/services/cloud/[slug]/page.tsx` |
| `/services/sap/[slug]` | `app/services/sap/[slug]/page.tsx` |

### Special App Router Files
| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout — fonts, metadata, SiteHeader, SiteFooter |
| `app/loading.tsx` | Global loading skeleton |
| `app/error.tsx` | Global error boundary |
| `app/not-found.tsx` | 404 page |
| `app/opengraph-image.tsx` | Dynamic OG image |
| `app/robots.ts` | robots.txt generation |
| `app/sitemap.ts` | sitemap.xml generation |

### Public Assets
| File | Purpose |
|------|---------|
| `public/favicon.svg` | SVG favicon (compass mark on navy) |
| `public/logo.svg` | Full wordmark — dark (for light bg) |
| `public/logo-white.svg` | Full wordmark — white (for dark bg) |

---

## 6. apps/cms — Payload CMS

### Versions
| Package | Version |
|---------|---------|
| payload | 3.87.1 |
| @payloadcms/next | 3.87.1 |
| @payloadcms/db-postgres | 3.87.1 |
| @payloadcms/richtext-lexical | 3.87.1 |
| next | 16.3.0 |

### Database
- **Adapter:** `@payloadcms/db-postgres`
- **Connection:** Via `DATABASE_URL` env var (PostgreSQL)
- **No Prisma** — Payload manages all schema natively

### Collections
| Slug | File | Purpose |
|------|------|---------|
| `users` | `src/collections/Users.ts` | CMS admin users |
| `media` | `src/collections/Media.ts` | Image/file uploads |
| `insights` | `src/collections/Insights.ts` | Blog/whitepaper/case-study content |
| `team` | `src/collections/Team.ts` | Team member profiles |

### Globals
| Slug | File | Purpose |
|------|------|---------|
| `site-settings` | `src/globals/SiteSettings.ts` | Nav, footer, metadata config |

### CMS Routes
| Route | Purpose |
|-------|---------|
| `http://localhost:3001/admin` | Payload Admin Panel |
| `http://localhost:3001/api/*` | REST API |
| `http://localhost:3001/api/graphql` | GraphQL endpoint |

---

## 7. packages/ui — Component Library

### All Components
| Component | Path |
|-----------|------|
| Badge | `components/Badge` |
| Breadcrumbs | `components/Breadcrumbs` |
| Button | `components/Button` |
| Card | `components/Card` |
| CTABanner | `components/CTABanner` |
| FeatureBlock | `components/FeatureBlock` |
| Footer | `components/Footer` |
| Form | `components/Form` |
| Header | `components/Header` |
| Heading | `components/Heading` |
| Hero | `components/Hero` |
| Icon | `components/Icon` |
| InsightCard | `components/InsightCard` |
| Link | `components/Link` |
| Logo / TryvionLogo | `components/Logo` |
| MegaMenu | `components/MegaMenu` |
| MobileNav | `components/MobileNav` |
| ServiceCard | `components/ServiceCard` |
| Skeleton | `components/Skeleton` |
| Spinner | `components/Spinner` |
| StatBlock | `components/StatBlock` |
| Testimonial | `components/Testimonial` |
| Text | `components/Text` |

### Foundations
| Module | Purpose |
|--------|---------|
| `foundations/accessibility` | Focus management, skip-nav |
| `foundations/layout` | Grid, Container, Section, GridCol |

---

## 8. packages/design-tokens

- CSS custom properties (`variables.css`)
- TypeScript token constants
- TRYVION color system: Ink Navy (#0B1E3D), Momentum Blue (#1458F2), Choice Gold (#C9A24B), etc.
- Typography: `--tryvion-font-primary` (Neue Haas Grotesk/Inter fallback), `--tryvion-font-secondary` (Manrope)
- Spacing, border-radius, elevation, motion tokens

---

## 9. packages/utils

- `cn()` — className merging utility (clsx + tailwind-merge)
- Shared helper functions

---

## 10. Design System Features

- Tailwind v4 with `@import "tailwindcss"` + `@source`
- `@source inline()` for dynamic class generation (GridCol)
- CSS custom properties via `@theme inline`
- All grid variants explicitly generated (col-span-1 through col-span-12, all breakpoints)
- WCAG 2.2 AA targeted throughout
- Responsive via Tailwind breakpoints: sm/md/lg/xl/2xl

---

## 11. Navigation

- Mega-menu with keyboard navigation
- Mobile drawer (native `<dialog>`)
- Scroll-aware header (transparent → solid on scroll)
- Logo: TRYVION compass SVG mark + wordmark (light/dark/mono variants)

---

## 12. Logo Implementation

The `TryvionLogo` component in `packages/ui/src/components/Logo/Logo.tsx`:
- Exact SVG paths extracted from `tryvion.svg` design file
- 4-armed compass mark from Inkscape source
- Variants: `light` (navy on white), `dark` (white on navy), `mono`
- Props: `height`, `variant`, `showTagline`, `markOnly`, `ariaLabel`
- Used in: ScrollHeader, SiteFooter, MobileNav

---

## 13. CMS Integration (Web App)

- `apps/web/src/lib/cms/client.ts` — REST API client with error catch + null return
- `apps/web/src/lib/insights-data.ts` — Static fallback data (7 articles)
- CMS fetch failures silently fall back to static data — site works without CMS running

---

## 14. SEO & Metadata

- `app/layout.tsx` — Root metadata with title template `'%s | TRYVION'`
- `app/robots.ts` — robots.txt
- `app/sitemap.ts` — sitemap.xml
- `app/opengraph-image.tsx` — OG image
- All 41 pages have individual `export const metadata` blocks

---

## 15. Environment Variables (all)

See `/docs/environment-migration.md` for full details.

Summary:
| Variable | Location | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | `apps/cms/.env` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | `apps/cms/.env` | Payload CMS signing secret |
| `NEXT_PUBLIC_SITE_URL` | root `.env` / `apps/cms/.env` | Web app public URL |
| `NEXT_PUBLIC_API_URL` | root `.env` | Payload REST API base URL |
| `NEXT_PUBLIC_CMS_URL` | root `.env` | CMS origin (for image domains) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | root `.env` | Google Analytics GA4 ID |
| `CMS_ADMIN_ALLOWED_ORIGIN` | `apps/cms/.env` | CORS allow-list for admin |

---

## 16. Scripts

| Script (root) | Command |
|---------------|---------|
| `pnpm dev` | `turbo run dev` (all apps) |
| `pnpm build` | `turbo run build` |
| `pnpm lint` | `turbo run lint` |
| `pnpm typecheck` | `turbo run typecheck` |
| `pnpm format` | `prettier --write .` |
| `pnpm clean` | `turbo run clean` |

| Shell script | Purpose |
|--------------|---------|
| `setup.sh` | Full first-run Mac setup (nvm, pnpm, PostgreSQL via brew) |
| `dev.sh` | Quick dev shortcut |

---

## 17. Source-of-Truth Decisions

See `/docs/source-of-truth.md` for full register. Key resolved decisions:

| ID | Decision |
|----|---------|
| STT-001 | Neue Haas Grotesk (trial) + Manrope — fonts need commercial license before production |
| STT-002 | Interactive states derived from Momentum Blue |
| STT-003 | System success color `#16A34A` (needs brand team validation) |
| STT-004 | Prisma replaced by `@payloadcms/db-postgres` |
| STT-005 | IA branded service names used over SoW generic names |
| STT-006 | Together for Tomorrow / Marg_Rekha — awaiting brief |
| STT-007 | `motion` (Framer Motion v11+) for animations, not GSAP |
