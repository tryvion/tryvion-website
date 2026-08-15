# TRYVION — Environment Variable Migration

**Generated:** 2026-08-09  
**Critical Rule:** Environment files (`.env`, `.env.local`) are NEVER committed to Git.
Secrets stay on each machine. Only `.env.example` template files are committed.

---

## 1. Complete Variable Register

### apps/cms

| Variable | Required | Purpose | Mac Setup |
|----------|----------|---------|-----------|
| `DATABASE_URL` | **Required** | PostgreSQL connection string | Already set in Mac `.env` |
| `PAYLOAD_SECRET` | **Required** | Signs Payload JWT tokens — must be strong random string | Already set in Mac `.env` |
| `NEXT_PUBLIC_SITE_URL` | Required | Web app URL (used for CORS) | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Optional | Payload REST API base | `http://localhost:3001/api` |
| `CMS_ADMIN_ALLOWED_ORIGIN` | Optional | Additional CORS origin | `http://localhost:3001` |

### apps/web (root `.env` or `.env.local`)

| Variable | Required | Purpose | Mac Setup |
|----------|----------|---------|-----------|
| `NEXT_PUBLIC_CMS_URL` | Optional | CMS origin for image domains | `http://localhost:3001` |
| `NEXT_PUBLIC_SITE_URL` | Optional | Used in metadata/OG tags | `http://localhost:3000` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics GA4 — omit to disable | Leave blank in dev |

---

## 2. Template Files (committed to Git)

### Root `.env.example`
```env
DATABASE_URL=

PAYLOAD_SECRET=

NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### `apps/cms/.env.example`
```env
# PostgreSQL connection string
# Format: postgresql://<user>:<password>@<host>:<port>/<dbname>
DATABASE_URL=postgresql://postgres:password@localhost:5432/tryvion

# Payload CMS secret — generate: openssl rand -base64 32
PAYLOAD_SECRET=

# URL of the Next.js web app (CORS allow-list)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# URL of the CMS itself
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# (Optional) Additional origin allowed to call the Payload REST API
CMS_ADMIN_ALLOWED_ORIGIN=http://localhost:3001
```

---

## 3. Mac Setup Instructions

The Mac should already have `apps/cms/.env` from the initial setup.
**Do NOT overwrite it** — it contains the real local PostgreSQL credentials.

If creating from scratch:

```bash
# Copy template
cp apps/cms/.env.example apps/cms/.env

# Edit with real values
nano apps/cms/.env   # or: code apps/cms/.env
```

**DATABASE_URL** — Mac local example:
```
postgresql://postgres:@localhost:5432/tryvion
```
(If no password set on Mac Postgres, omit the password.)

**PAYLOAD_SECRET** — Generate a strong value:
```bash
openssl rand -base64 32
```

---

## 4. What NOT to Do

```
DO NOT:  copy apps/cms/.env from Windows to Mac
DO NOT:  commit any .env file
DO NOT:  put real secrets in .env.example files
DO NOT:  hardcode credentials in source files
DO NOT:  share PAYLOAD_SECRET between environments
```

---

## 5. Production Variables (Vercel)

When deploying to Vercel, configure these in the Vercel dashboard under **Project → Settings → Environment Variables**:

| Variable | Production Value |
|----------|----------------|
| `DATABASE_URL` | Neon / Supabase / Vercel Postgres connection string (with SSL) |
| `PAYLOAD_SECRET` | Strong random — DIFFERENT from development |
| `NEXT_PUBLIC_SITE_URL` | `https://tryvion.com` |
| `NEXT_PUBLIC_CMS_URL` | `https://cms.tryvion.com` or Vercel deployment URL |
| `NEXT_PUBLIC_API_URL` | `https://cms.tryvion.com/api` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` |

**Never set `DATABASE_URL` to a local PostgreSQL instance in Vercel.**

The production PostgreSQL must:
- Accept SSL connections
- Be accessible from Vercel's serverless functions
- Use a connection pooler (Neon/PgBouncer) for serverless compatibility

---

## 6. Environment File Locations Summary

```
tryvion-website/
├── .env.example              ← committed — root variables template
├── .env                      ← ignored  — root local overrides (optional)
├── apps/
│   ├── cms/
│   │   ├── .env.example      ← committed — CMS variables template
│   │   ├── .env              ← ignored  — real CMS credentials (Mac-local)
│   │   └── .env.local.example ← committed — extra local template
│   └── web/
│       └── .env.local        ← ignored  — web-only overrides (optional)
```

---

## 7. Migration Checklist

- [x] `apps/cms/.env.example` corrected to PostgreSQL format
- [x] Root `.env.example` present with all variable names
- [ ] Mac `apps/cms/.env` verified to have PostgreSQL `DATABASE_URL`
- [ ] Mac `apps/cms/.env` verified to have non-empty `PAYLOAD_SECRET`
- [ ] Production Vercel env vars set before deployment
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` obtained from Google Analytics
- [ ] Production `DATABASE_URL` points to cloud PostgreSQL with SSL
