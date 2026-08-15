# TRYVION — Deployment Guide

**Generated:** 2026-08-09  
**Target:** Vercel (web app) + Vercel/external (CMS)  
**Status:** Pre-deployment — complete all prerequisites below first

---

## 1. Pre-Deployment Checklist

These must be completed before any production deployment:

- [ ] Commercial font licenses acquired (Neue Haas Grotesk, Optima) — see STT-001
- [ ] Production PostgreSQL provisioned (Neon / Supabase / Vercel Postgres)
- [ ] All Vercel environment variables configured
- [ ] Media/file storage configured (Cloudflare R2 or AWS S3)
- [ ] Domain DNS configured (`tryvion.com`, `cms.tryvion.com`)
- [ ] Google Analytics GA4 property created and Measurement ID obtained
- [ ] Production `PAYLOAD_SECRET` generated (different from dev)
- [ ] GitHub repository up to date with `main` branch

---

## 2. Architecture

```
Production
├── Vercel (web)           apps/web → tryvion.com
├── Vercel (cms)           apps/cms → cms.tryvion.com   [or separate]
├── PostgreSQL             Neon / Supabase / Vercel Postgres
└── Media Storage          Cloudflare R2 / AWS S3
```

Vercel deploys both `apps/web` and `apps/cms` from the monorepo.
Configure each as a separate Vercel project linked to the same GitHub repository.

---

## 3. Vercel Project Setup

### 3a. Web App (`apps/web`)

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `apps/web` |
| Build Command | `cd ../.. && pnpm turbo run build --filter=@tryvion/web` |
| Install Command | `pnpm install --frozen-lockfile` |
| Output Directory | `.next` |
| Node.js Version | 20.x |

### 3b. CMS (`apps/cms`)

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `apps/cms` |
| Build Command | `cd ../.. && pnpm turbo run build --filter=@tryvion/cms` |
| Install Command | `pnpm install --frozen-lockfile` |
| Output Directory | `.next` |
| Node.js Version | 20.x |

---

## 4. Vercel Environment Variables

### Web App (`apps/web`)

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://tryvion.com` |
| `NEXT_PUBLIC_CMS_URL` | `https://cms.tryvion.com` |
| `NEXT_PUBLIC_API_URL` | `https://cms.tryvion.com/api` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` |

### CMS (`apps/cms`)

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | PostgreSQL connection string (with `?sslmode=require`) |
| `PAYLOAD_SECRET` | Strong random string — `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | `https://tryvion.com` |
| `NEXT_PUBLIC_API_URL` | `https://cms.tryvion.com/api` |
| `CMS_ADMIN_ALLOWED_ORIGIN` | `https://tryvion.com` |

---

## 5. PostgreSQL for Production

### Recommended: Neon (serverless PostgreSQL)

```
1. Create account at neon.tech
2. Create a new project: "tryvion"
3. Copy the connection string (includes ?sslmode=require)
4. Set DATABASE_URL in Vercel CMS project environment
```

The connection string format:
```
postgresql://<user>:<password>@<host>.neon.tech/<dbname>?sslmode=require
```

Neon's serverless driver works with Vercel's serverless functions without connection pool issues.

### Alternative: Supabase
Same process — use the "Connection pooling" URL (port 6543) for serverless compatibility.

---

## 6. Media Storage for Production

Payload's local disk storage does NOT persist on Vercel (ephemeral filesystem).

Before deploying CMS to production, configure a cloud storage adapter:

### Cloudflare R2 (recommended — free egress)
```bash
pnpm --filter @tryvion/cms add @payloadcms/storage-cloudflare-r2
```

Add to `apps/cms/src/payload.config.ts`:
```ts
import { cloudflareR2Storage } from '@payloadcms/storage-cloudflare-r2'

plugins: [
  cloudflareR2Storage({
    collections: { media: true },
    bucket: process.env.R2_BUCKET,
    config: {
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId:     process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
      region: 'auto',
    },
  }),
],
```

Add to Vercel env vars: `R2_BUCKET`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`

---

## 7. GitHub → Vercel CI/CD

```
Push to main
    ↓
GitHub webhook fires
    ↓
Vercel builds both apps/web and apps/cms
    ↓
Production deploy (if build passes)
```

### Branch strategy
- `main` → Production deploy
- `staging` or feature branches → Preview deployments (Vercel automatic)

---

## 8. First Production Deployment Steps

```bash
# 1. Ensure main branch is up to date
git checkout main
git pull origin main

# 2. Verify build passes locally
pnpm build

# 3. Push to GitHub
git push origin main

# 4. Watch Vercel dashboard for build status
# Vercel → your-project → Deployments

# 5. After CMS deploys, visit admin to create first admin user
# https://cms.tryvion.com/admin/create-first-user

# 6. Verify web app routes
curl -I https://tryvion.com/
curl -I https://tryvion.com/about
curl -I https://tryvion.com/services
```

---

## 9. Domain Configuration

In Vercel → Project Settings → Domains:

| App | Domain |
|-----|--------|
| `apps/web` | `tryvion.com`, `www.tryvion.com` |
| `apps/cms` | `cms.tryvion.com` |

In your DNS provider:
```
A record:     tryvion.com      → 76.76.21.21  (Vercel's IP)
CNAME record: www.tryvion.com  → cname.vercel-dns.com
CNAME record: cms.tryvion.com  → cname.vercel-dns.com
```

---

## 10. Post-Deployment Validation

| Check | Command / URL |
|-------|--------------|
| Homepage | `https://tryvion.com/` |
| Services | `https://tryvion.com/services` |
| About | `https://tryvion.com/about` |
| Insights | `https://tryvion.com/insights` |
| Contact | `https://tryvion.com/contact` |
| 404 | `https://tryvion.com/does-not-exist` |
| CMS Admin | `https://cms.tryvion.com/admin` |
| CMS API | `https://cms.tryvion.com/api/insights` |
| robots.txt | `https://tryvion.com/robots.txt` |
| sitemap.xml | `https://tryvion.com/sitemap.xml` |
| Security headers | `curl -I https://tryvion.com/` |

---

## 11. DO NOT Deploy Until

```
[ ] Font licenses acquired (STT-001)
[ ] Production PostgreSQL provisioned
[ ] Media storage configured (R2/S3)
[ ] All Vercel env vars set
[ ] Local build passes (pnpm build)
[ ] All routes return 200
[ ] CMS admin accessible
[ ] Database migrations run on production DB
```
