# TRYVION — Mac Project Inventory

**Generated:** 2026-08-09  
**Purpose:** Record of the Mac environment state before migration merges  
**Note:** The Mac environment was not directly accessible during Windows-side audit.
This inventory is reconstructed from Git history, repository structure, and the existing
Mac setup documentation at `docs/mac-environment.md`.

---

## 1. Repository State (from Git history)

The Mac shares the same Git remote:

```
git@github-tryvion:tryvion/tryvion-website.git
```

Before the Windows migration branch is merged, the Mac has these commits on `main`:

| Hash | Message |
|------|---------|
| ca7352a | `feat(cms): setup Payload CMS with PostgreSQL and Next.js` |
| 3d228a1 | `Setup pnpm monorepo foundation` |
| 4440fea | `chore: establish monorepo foundation` |
| 34e2728 | `Initial Next.js project setup` |
| 9c8ef6c | `Initial commit` |

---

## 2. Known Mac Infrastructure

| Tool | Expected Version | Install Method |
|------|-----------------|----------------|
| Node.js | >=20.9.0 | nvm |
| pnpm | >=10.x | npm |
| PostgreSQL | >=15 | homebrew |
| Git | any | brew/xcode |
| Turborepo | ^2.5.5 | package.json devDep |

### SSH Configuration

The remote URL uses `github-tryvion` as the SSH host alias (not `github.com`).
This alias must be defined in `~/.ssh/config` on the Mac:

```
Host github-tryvion
  HostName github.com
  User git
  IdentityFile ~/.ssh/<your-tryvion-key>
```

---

## 3. Existing Mac Workspace (before migration)

Based on the initial commits, the Mac environment has:

### apps/web (initial setup)
- Basic Next.js 16.3.0 project
- Root layout, homepage placeholder
- `globals.css` — initial Tailwind v4 config
- `next.config.ts` — basic Next.js config

### apps/cms (initial Payload setup)
- Payload CMS 3.87.1 with PostgreSQL adapter
- `payload.config.ts` — basic config
- `collections/Users.ts` — users collection only
- `collections/Media.ts` — media collection only
- No `Insights` collection, no `Team` collection, no `SiteSettings` global

### packages
- Structure exists: `ui/`, `design-tokens/`, `utils/`, `eslint-config/`, `tsconfig/`, `types/`
- Content is minimal / placeholder

---

## 4. Mac Database State

The Mac should have a local PostgreSQL database named `tryvion`:

```bash
# Verify on Mac
psql tryvion -c "\dt;"
```

Expected: Payload-managed tables from the initial CMS setup. If migrations have been run, tables exist for `users`, `media`, `payload_migrations`, `payload_preferences`, `payload_jobs_queue`.

**The Mac database must be preserved.** New collections (Insights, Team, SiteSettings) will be added via Payload's migration system.

---

## 5. Mac .env State

The Mac should have `apps/cms/.env` with:
```
DATABASE_URL=postgresql://...   (Mac-local credentials)
PAYLOAD_SECRET=<existing-secret>
```

**These credentials must NOT be overwritten by the migration.**

After migration, the `.env` format changes from the old template (MongoDB placeholder) to the new PostgreSQL template. Since the Mac `.env` already has correct PostgreSQL values, no env changes are needed.

---

## 6. What the Mac Does NOT Have (Windows additions)

These files/directories exist on Windows but NOT yet on Mac's `main` branch:

### apps/web — New pages (all 41 page.tsx files)
All page routes under: `about/`, `accessibility/`, `careers/`, `contact/`, `cookies/`, `events/`, `get-started/`, `industries/`, `insights/`, `newsroom/`, `privacy/`, `services/`, `terms/`

### apps/web — New components and libs
- `src/components/` — SiteHeader, SiteFooter, ScrollHeader, ServiceDetailLayout, etc.
- `src/lib/` — CMS client, insights data, metadata helpers
- `src/app/error.tsx`, `loading.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`

### apps/web — Updated core files
- `src/app/globals.css` — full Tailwind v4 config + `@source inline()` for grid
- `src/app/layout.tsx` — complete root layout with fonts, metadata, headers
- `src/app/page.tsx` — full homepage
- `next.config.ts` — security headers, image config

### apps/cms — New collections/globals
- `src/collections/Insights.ts`
- `src/collections/Team.ts`
- `src/globals/SiteSettings.ts`
- `src/payload.config.ts` — updated to include new collections + globals

### packages — Full design system
- `packages/ui/` — 23 components + foundations
- `packages/design-tokens/` — TRYVION token system
- `packages/utils/` — cn() and utilities

### docs/
- `docs/windows-project-inventory.md`
- `docs/mac-project-inventory.md`
- `docs/windows-mac-diff.md`
- `docs/environment-migration.md`
- `docs/database-migration.md`
- `docs/deployment.md`
- `docs/migration/windows-to-mac.md`

---

## 7. Mac Validation Checklist (to complete on Mac)

After pulling the migration branch:

- [ ] `pnpm install` succeeds
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] CMS starts: `http://localhost:3001/admin`
- [ ] Web starts: `http://localhost:3000`
- [ ] PostgreSQL connects (check CMS startup log)
- [ ] All critical routes return 200

See `/docs/migration/windows-to-mac.md` for the complete execution sequence.
