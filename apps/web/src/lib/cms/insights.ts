import type { CMSInsight, PaginatedDocs } from './client'
import { cmsGet }          from './client'
import { lexicalToHtml }   from './lexical-to-html'
import {
  ARTICLES,
  type InsightArticle,
  getRelatedArticles as staticRelated,
} from '../insights-data'

// ---------------------------------------------------------------------------
// Adapter — CMS document → InsightArticle (used by page components)
// ---------------------------------------------------------------------------

const FALLBACK_AVATAR = '/images/team/default.jpg'

function adaptCMSInsight(doc: CMSInsight): InsightArticle {
  const image = typeof doc.image === 'string' ? '' : (doc.image?.url ?? '')

  const author =
    !doc.author || typeof doc.author === 'string'
      ? { name: 'TRYVION Editorial', role: 'Editorial Team', avatar: FALLBACK_AVATAR }
      : {
          name:   doc.author.name,
          role:   doc.author.role,
          avatar: typeof doc.author.avatar === 'string' || !doc.author.avatar
            ? FALLBACK_AVATAR
            : (doc.author.avatar.url ?? FALLBACK_AVATAR),
        }

  return {
    slug:        doc.slug,
    title:       doc.title,
    excerpt:     doc.excerpt,
    category:    doc.category,
    publishedAt: doc.publishedAt,
    readTime:    doc.readTime ?? '',
    image,
    author,
    body:        lexicalToHtml(doc.body),
  }
}

// ---------------------------------------------------------------------------
// Public API — falls back to static data when CMS is unreachable
// ---------------------------------------------------------------------------

export async function getInsights(limit = 20): Promise<InsightArticle[]> {
  const data = await cmsGet<PaginatedDocs<CMSInsight>>(
    '/insights',
    { limit, 'where[_status][equals]': 'published', depth: 1 },
    ['insights'],
  )
  if (!data?.docs?.length) return ARTICLES.slice(0, limit)
  return data.docs.map(adaptCMSInsight)
}

export async function getInsightBySlug(slug: string): Promise<InsightArticle | undefined> {
  const data = await cmsGet<PaginatedDocs<CMSInsight>>(
    '/insights',
    { 'where[slug][equals]': slug, 'where[_status][equals]': 'published', limit: 1, depth: 2 },
    [`insight:${slug}`, 'insights'],
  )
  if (!data?.docs?.[0]) return ARTICLES.find((a) => a.slug === slug)
  return adaptCMSInsight(data.docs[0])
}

export async function getRelatedInsights(
  slug:     string,
  category: string,
  count = 3,
): Promise<InsightArticle[]> {
  const data = await cmsGet<PaginatedDocs<CMSInsight>>(
    '/insights',
    {
      'where[and][0][slug][not_equals]':    slug,
      'where[and][1][category][equals]':    category,
      'where[and][2][_status][equals]':     'published',
      limit: count,
      depth: 1,
    },
    ['insights'],
  )
  if (!data?.docs?.length) return staticRelated(slug, category, count)
  return data.docs.map(adaptCMSInsight)
}

// Used by generateStaticParams — returns all published slugs
export async function getInsightSlugs(): Promise<string[]> {
  const data = await cmsGet<PaginatedDocs<CMSInsight>>(
    '/insights',
    { 'where[_status][equals]': 'published', limit: 500, depth: 0 },
    ['insights'],
  )
  if (!data?.docs?.length) return ARTICLES.map((a) => a.slug)
  return data.docs.map((d) => d.slug)
}
