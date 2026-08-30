import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Insights } from './collections/Insights'
import { Team } from './collections/Team'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Origins allowed to read from the Payload REST API
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  process.env.CMS_ADMIN_ALLOWED_ORIGIN ?? 'http://localhost:3001',
].filter(Boolean)

export default buildConfig({
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },

    meta: {
      titleSuffix: '— TRYVION CMS',
    },
  },

  collections: [Users, Media, Insights, Team, ContactSubmissions],

  globals: [SiteSettings],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  /*
   * Email
   *
   * Payload uses Nodemailer to send system emails through
   * the configured SMTP transport.
   *
   * SMTP credentials remain in the environment and are never
   * exposed to the browser.
   */
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER || 'tryvion2026@gmail.com',

    defaultFromName: 'TRYVION',

    transportOptions: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',

      port: Number(process.env.SMTP_PORT || 465),

      secure: process.env.SMTP_SECURE === 'true',

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),

  // Allow apps/web to read the REST API cross-origin in development
  cors: ALLOWED_ORIGINS,

  csrf: ALLOWED_ORIGINS,

  sharp,

  plugins: [],
})
