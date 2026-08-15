# TRYVION — Database Migration Plan

**Generated:** 2026-08-09  
**Database:** PostgreSQL >=15  
**ORM/Adapter:** `@payloadcms/db-postgres` (Payload CMS manages all schema)  
**No Prisma** — resolved by STT-004

---

## 1. Current State

### Windows Development Environment
- PostgreSQL instance (local, Windows)
- Database: `tryvion` (or as configured in `apps/cms/.env`)
- Tables created by Payload's initial migration from `feat(cms): setup Payload CMS` commit

### Mac Development Environment
- PostgreSQL instance (local, macOS via Homebrew)
- Database: `tryvion` (or as configured in Mac's `apps/cms/.env`)
- Same initial state — tables created by same initial commits

---

## 2. How Payload Manages the Database

Payload CMS uses its own migration system (not Prisma, not raw SQL):

```
apps/cms/src/migrations/   ← Payload auto-generates these
```

When you run `pnpm --filter @tryvion/cms dev` or `pnpm --filter @tryvion/cms payload migrate`:
1. Payload reads all migration files in `src/migrations/`
2. Checks `payload_migrations` table for which have been run
3. Runs any pending migrations
4. All schema changes are applied automatically

---

## 3. New Collections Being Added

The Windows project adds:
- `src/collections/Insights.ts` — published article/whitepaper/case-study content
- `src/collections/Team.ts` — team member profiles
- `src/globals/SiteSettings.ts` — site-wide settings (nav, footer)

These require new database tables. Payload will handle this automatically on first start.

---

## 4. Migration Strategy

### Safe approach (recommended)

**NEVER run `DROP DATABASE` or destructive migrations.**

Step 1 — Back up the Mac database before starting:
```bash
pg_dump tryvion > ~/tryvion-backup-$(date +%Y%m%d).sql
```

Step 2 — After pulling the migration branch, start the CMS:
```bash
pnpm --filter @tryvion/cms dev
```

Payload will detect the new collections (Insights, Team, SiteSettings) and run its internal migration to create the corresponding tables.

Step 3 — Verify tables were created:
```bash
psql tryvion -c "\dt;"
```

Expected new tables: `insights`, `team`, `site_settings` (and their relations/locales/etc. per Payload's schema).

Step 4 — If prompted by Payload to confirm schema changes, type `y` to proceed.

---

## 5. If Migrations Fail

If Payload reports migration conflicts:

```bash
# Check pending migrations
pnpm --filter @tryvion/cms payload migrate:status

# Run migrations explicitly
pnpm --filter @tryvion/cms payload migrate

# If a migration needs to be freshly generated:
pnpm --filter @tryvion/cms payload migrate:create --name add_insights_team
```

---

## 6. Data Classification

| Data Type | Location | Mac Status | Action |
|-----------|----------|------------|--------|
| Payload admin users | `users` table | Exists on Mac | **Preserve** |
| Media uploads | `media` table | Exists on Mac | **Preserve** |
| Site settings | New `site_settings` table | Not yet created | **Payload creates on first run** |
| Insight articles | `insights` table | Not yet created | **Payload creates on first run** |
| Team profiles | `team` table | Not yet created | **Payload creates on first run** |
| Web app static fallback data | `apps/web/src/lib/insights-data.ts` | Not in DB | **Static code — no DB action needed** |

---

## 7. Static Fallback Architecture

The web app (`apps/web`) does NOT require a running CMS for basic functionality:

- `src/lib/cms/client.ts` — CMS fetch catches all errors, returns `null`
- `src/lib/insights-data.ts` — 7 hardcoded articles used when CMS is unreachable
- All pages fall back to static data gracefully

This means: **the website works even if the Mac CMS/PostgreSQL is not running.**

---

## 8. Production Database

Before deploying to Vercel:

| Requirement | Detail |
|-------------|--------|
| Provider | Neon, Supabase, Vercel Postgres, or any PostgreSQL >=15 |
| Connection | Must support serverless (connection pooling via PgBouncer/Neon's pooler) |
| SSL | Required (`?sslmode=require` in connection string) |
| Payload migrations | Run automatically on first `pnpm build` or `payload migrate` |
| Seed data | Create initial admin user via `/admin` on first CMS deployment |

---

## 9. Rollback Procedure

If the migration causes any issues:

```bash
# Restore from backup
psql tryvion < ~/tryvion-backup-YYYYMMDD.sql

# Reset Payload migration state if needed
psql tryvion -c "DELETE FROM payload_migrations WHERE name = 'migration_name';"

# Or restore the Mac database entirely
dropdb tryvion
createdb tryvion
psql tryvion < ~/tryvion-backup-YYYYMMDD.sql
```

---

## 10. Checklist

- [ ] Mac PostgreSQL is running (`brew services start postgresql@15`)
- [ ] Database `tryvion` exists (`createdb tryvion` if not)
- [ ] Mac `apps/cms/.env` has correct `DATABASE_URL`
- [ ] Backup taken before migration (`pg_dump tryvion > backup.sql`)
- [ ] Migration branch pulled on Mac
- [ ] `pnpm install` completed
- [ ] CMS started — Payload ran schema migrations for Insights, Team, SiteSettings
- [ ] `psql tryvion -c "\dt;"` confirms new tables created
- [ ] CMS admin accessible at `http://localhost:3001/admin`
