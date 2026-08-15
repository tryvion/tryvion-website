import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tryvion.com'

// Static routes — priorities and change frequencies follow Google's guidance:
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url:              `${BASE_URL}/`,
    lastModified:     new Date(),
    changeFrequency:  'weekly',
    priority:         1.0,
  },
  {
    url:              `${BASE_URL}/services`,
    lastModified:     new Date(),
    changeFrequency:  'monthly',
    priority:         0.9,
  },
  {
    url:              `${BASE_URL}/about`,
    lastModified:     new Date(),
    changeFrequency:  'monthly',
    priority:         0.8,
  },
  {
    url:              `${BASE_URL}/insights`,
    lastModified:     new Date(),
    changeFrequency:  'daily',
    priority:         0.8,
  },
  {
    url:              `${BASE_URL}/contact`,
    lastModified:     new Date(),
    changeFrequency:  'yearly',
    priority:         0.7,
  },
  {
    url:              `${BASE_URL}/get-started`,
    lastModified:     new Date(),
    changeFrequency:  'yearly',
    priority:         0.7,
  },
  // Service detail pages — TODO Phase 11+: generate from CMS
  {
    url:              `${BASE_URL}/services/sap`,
    lastModified:     new Date(),
    changeFrequency:  'monthly',
    priority:         0.8,
  },
  {
    url:              `${BASE_URL}/services/ai-data`,
    lastModified:     new Date(),
    changeFrequency:  'monthly',
    priority:         0.8,
  },
  {
    url:              `${BASE_URL}/services/cloud`,
    lastModified:     new Date(),
    changeFrequency:  'monthly',
    priority:         0.8,
  },
  {
    url:              `${BASE_URL}/services/digital-engineering`,
    lastModified:     new Date(),
    changeFrequency:  'monthly',
    priority:         0.8,
  },
  {
    url:              `${BASE_URL}/services/talent`,
    lastModified:     new Date(),
    changeFrequency:  'monthly',
    priority:         0.8,
  },
  {
    url:              `${BASE_URL}/services/managed-services`,
    lastModified:     new Date(),
    changeFrequency:  'monthly',
    priority:         0.8,
  },
]

// TODO Phase 11+: merge CMS-sourced insight article URLs here:
// const insightRoutes = await fetchPublishedInsightSlugs()
// const dynamicRoutes = insightRoutes.map(slug => ({ url: `${BASE_URL}/insights/${slug}`, ... }))

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES
}
