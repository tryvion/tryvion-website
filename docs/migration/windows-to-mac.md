# TRYVION — Windows → Mac Migration Guide

**Date:** 2026-08-09  
**Branch:** `migration/windows-to-mac`  
**Execute on:** Mac (macOS)  
**Estimated time:** 30–60 minutes

> **CRITICAL RULES before you start:**
> - DO NOT `git push --force` to `main`
> - DO NOT run `DROP DATABASE` or destructive SQL
> - DO NOT copy `.env` files from Windows to Mac
> - DO NOT overwrite `apps/cms/.env` — it has your real PostgreSQL credentials
> - Mac environment is the infrastructure source of truth
> - If anything unexpected happens, STOP and investigate before continuing

---

## Phase 0 — Prerequisites Checklist

Verify each item before starting the migration:

```zsh
# Check Node.js
node --version        # must be >=20.9.0

# Check pnpm
pnpm --version        # must be >=10.x

# Check PostgreSQL
pg_isready            # should output: accepting connections
psql tryvion -c "\l"  # database 'tryvion' should exist

# Check SSH alias for GitHub
ssh -T github-tryvion  # should output: Hi <username>! You've successfully authenticated...
```

If `ssh -T github-tryvion` fails, check `~/.ssh/config` for:
```
Host github-tryvion
  HostName github.com
  User git
  IdentityFile ~/.ssh/<your-tryvion-key>
```

---

## Phase 1 — Backup

**DO NOT SKIP THIS.** Takes 30 seconds and can save hours.

```zsh
# Backup the Mac PostgreSQL database
pg_dump tryvion > ~/tryvion-backup-$(date +%Y%m%d-%H%M%S).sql
echo "Backup saved: ~/tryvion-backup-$(date +%Y%m%d)*.sql"

# Verify the backup
ls -lh ~/tryvion-backup-*.sql
```

---

## Phase 2 — Fetch Migration Branch

```zsh
# Navigate to the repo root
cd ~/path/to/tryvion-website   # adjust to your actual path

# Check current status — stash if you have local changes
git status
# If you see uncommitted changes: git stash -u

# Fetch all branches from origin
git fetch origin

# Verify the migration branch exists on origin
git branch -r | grep migration
# Expected: origin/migration/windows-to-mac

# Check out the migration branch
git checkout migration/windows-to-mac

# Verify you are on the right branch
git branch --show-current
# Expected: migration/windows-to-mac

# See what's new in this branch vs main
git log main..HEAD --oneline
```

---

## Phase 3 — Verify .env (DO NOT OVERWRITE)

```zsh
# Verify your CMS .env exists and has the right variables
cat apps/cms/.env

# You should see:
# DATABASE_URL=postgresql://...  (pointing to localhost)
# PAYLOAD_SECRET=<non-empty value>

# If apps/cms/.env is MISSING (should not happen), create from template:
# cp apps/cms/.env.example apps/cms/.env
# Then edit and fill in DATABASE_URL and PAYLOAD_SECRET

# Verify the .env.example has been updated (should be PostgreSQL now, not MongoDB)
head -5 apps/cms/.env.example
# Expected first line after comment: DATABASE_URL=postgresql://...
```

---

## Phase 4 — Install Dependencies

```zsh
# Install all workspace dependencies
pnpm install

# This may take 2-5 minutes on first run (many new packages added)
# Expected: no errors, lockfile should not change significantly

# If you see peer dependency warnings, they are expected and safe to ignore
```

---

## Phase 5 — Type Check

```zsh
# Run TypeScript type checking across the monorepo
pnpm typecheck

# Expected: exits with code 0, no errors
# If you see errors, check the output carefully before proceeding
```

---

## Phase 6 — Start CMS and Run Database Migrations

Payload CMS will automatically detect new collections (Insights, Team, SiteSettings)
and run migrations to create the required tables.

```zsh
# Open a new terminal tab for the CMS
pnpm --filter @tryvion/cms dev

# Watch the startup output carefully.
# You should see:
#   ✓ Connected to database
#   ✓ Running migrations...   (or: migrations up to date)
#   ✓ Payload CMS listening on port 3001

# If prompted to confirm schema changes, type: y
```

**Verify database tables were created:**

```zsh
# In a separate terminal (while CMS is running)
psql tryvion -c "\dt;"

# You should now see tables for:
#   insights, team, site_settings
#   (plus existing: users, media, payload_migrations, etc.)
```

If the CMS fails to start, check the error and refer to `docs/database-migration.md`.

---

## Phase 7 — Start Web App

```zsh
# Open another terminal tab for the web app
pnpm --filter @tryvion/web dev

# Expected: Next.js starts on http://localhost:3000
# Wait for: "✓ Ready in Xms"
```

---

## Phase 8 — Validate in Browser

Open your browser and verify each route:

| URL | Expected |
|-----|----------|
| `http://localhost:3000/` | Homepage with TRYVION hero section |
| `http://localhost:3000/about` | About page |
| `http://localhost:3000/services` | Services listing |
| `http://localhost:3000/insights` | Insights listing (static fallback data) |
| `http://localhost:3000/contact` | Contact page |
| `http://localhost:3000/get-started` | Get Started page |
| `http://localhost:3000/does-not-exist` | 404 page (custom not-found) |
| `http://localhost:3001/admin` | Payload CMS admin panel |

---

## Phase 9 — Run Full Validation Suite

```zsh
# Stop the dev servers (Ctrl+C in both terminal tabs), then:

# Full type check
pnpm typecheck

# Lint check
pnpm lint

# Build (tests that the production build works)
pnpm build

# All three should exit with code 0
```

---

## Phase 10 — Regenerate Payload Types

The `apps/cms/src/payload-types.ts` file must be regenerated on Mac
(NOT copied from Windows — it may embed absolute paths).

```zsh
# Start CMS in dev mode first (if not already running)
pnpm --filter @tryvion/cms dev &

# Wait for CMS to finish starting (~10 seconds), then:
pnpm --filter @tryvion/cms payload generate:types

# This overwrites payload-types.ts with Mac-generated types
# The file will be different from the Windows version — that's correct
```

---

## Phase 11 — Merge to Main (when ready)

After all validations pass:

```zsh
# Switch back to main
git checkout main

# Merge the migration branch (no fast-forward — preserve branch history)
git merge --no-ff migration/windows-to-mac -m "feat: merge Windows implementation into Mac environment"

# Push to GitHub
git push origin main

# Clean up migration branch (optional, after push)
git branch -d migration/windows-to-mac
git push origin --delete migration/windows-to-mac
```

---

## Rollback Procedures

### If pnpm install fails
```zsh
# Clear the node_modules and try again
pnpm clean
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### If database migrations fail
```zsh
# Check migration status
pnpm --filter @tryvion/cms payload migrate:status

# Run migrations explicitly
pnpm --filter @tryvion/cms payload migrate

# If still failing, restore from backup:
dropdb tryvion
createdb tryvion
psql tryvion < ~/tryvion-backup-YYYYMMDD-HHMMSS.sql
```

### If you need to go back to main
```zsh
git checkout main
# Your .env files are not tracked by git — they are safe
# Your database is not touched by git checkout — it is safe
```

---

## Troubleshooting

### SSH: `github-tryvion: No such host`
Check `~/.ssh/config`. The Host alias must match exactly: `github-tryvion`.

### TypeScript errors after install
Run `pnpm --filter @tryvion/cms payload generate:types` — stale `payload-types.ts` causes type errors.

### CMS won't connect to database
Verify `apps/cms/.env` has a valid `DATABASE_URL` pointing to your local PostgreSQL.
Check PostgreSQL is running: `pg_isready`

### Build fails with "Module not found"
Run `pnpm install` again. Some packages may need a clean install.

### Port 3000 already in use
```zsh
lsof -ti:3000 | xargs kill -9
```

---

## Final Validation Checklist

```
[ ] pnpm install — succeeded
[ ] pnpm typecheck — 0 errors
[ ] pnpm lint — 0 errors  
[ ] pnpm build — 0 errors
[ ] CMS starts on localhost:3001
[ ] Web app starts on localhost:3000
[ ] Homepage renders correctly
[ ] CMS admin panel accessible
[ ] Database has new tables (insights, team, site_settings)
[ ] payload-types.ts regenerated on Mac
[ ] All 41 routes manually spot-checked (or automated tests pass)
[ ] Migration branch merged to main
[ ] Pushed to GitHub origin
```

---

## What Was Migrated

| Category | Count | Status |
|----------|-------|--------|
| Web pages (page.tsx) | 41 | All new routes |
| UI components | 23 | Full design system |
| Design tokens | Full token set | TRYVION brand system |
| CMS collections | +2 (Insights, Team) | New Payload collections |
| CMS globals | +1 (SiteSettings) | New Payload global |
| Config files | ~15 | Updated turbo, tsconfig, postcss, etc. |
| Documentation | 7 new docs | Migration + deployment guides |
| Public assets | favicon.svg, logo.svg, logo-white.svg | Logo assets |

## What Was NOT Migrated (intentionally)

| Item | Reason |
|------|--------|
| `apps/cms/.env` | Mac env has real credentials — preserved |
| `apps/cms/src/payload-types.ts` | Must be regenerated on Mac (Phase 10) |
| Windows absolute paths | None exist in source — verified during audit |
| Font files (Neue Haas Grotesk, Optima) | Require commercial licenses — see STT-001 |
