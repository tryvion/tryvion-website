import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users }    from './collections/Users'
import { Media }    from './collections/Media'
import { Insights } from './collections/Insights'
import { Team }     from './collections/Team'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname  = path.dirname(filename)

// Origins allowed to read from the Payload REST API
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL     ?? 'http://localhost:3000',
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
      favicon:     '/favicon.ico',
    },
  },
  collections: [Users, Media, Insights, Team],
  globals:     [SiteSettings],
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
  // Allow apps/web to read the REST API cross-origin in development
  cors: ALLOWED_ORIGINS,
  csrf: ALLOWED_ORIGINS,
  sharp,
  plugins: [],
})
