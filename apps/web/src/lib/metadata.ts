import type { Metadata } from 'next'

// metadataBase is set in the root layout; helper uses path-relative URLs
// so they resolve correctly across environments.

export interface PageMetadataInput {
  /** Page title — the root layout template appends " | TRYVION" automatically */
  title: string
  description: string
  /** Absolute path from root, e.g. "/services" */
  path: string
  /** Absolute URL for a page-specific OG image. Falls back to the auto-generated /opengraph-image */
  image?: string
  /** Set true for non-indexed pages (thank-you, legal, admin redirects) */
  noIndex?: boolean
  /** Schema.org type override — defaults to "website" */
  type?: 'website' | 'article'
  /** ISO 8601 publish date — used when type is "article" */
  publishedAt?: string
  /** ISO 8601 modified date — used when type is "article" */
  modifiedAt?: string
}

/**
 * Builds a consistent Metadata object for a page.
 * The root layout already defines metadataBase, title.template, siteName, and
 * twitter.site — this helper fills in the page-specific fields only.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  type = 'website',
  publishedAt,
  modifiedAt,
}: PageMetadataInput): Metadata {
  const og: Metadata['openGraph'] = {
    title,
    description,
    url:  path,
    type: type === 'article' ? 'article' : 'website',
    ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    ...(type === 'article' && publishedAt
      ? { publishedTime: publishedAt }
      : {}),
    ...(type === 'article' && modifiedAt
      ? { modifiedTime: modifiedAt }
      : {}),
  }

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: og,
    twitter: {
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}

// ---------------------------------------------------------------------------
// Convenience wrappers
// ---------------------------------------------------------------------------

export function buildArticleMetadata(
  opts: Omit<PageMetadataInput, 'type'> & Required<Pick<PageMetadataInput, 'publishedAt'>>,
): Metadata {
  return buildMetadata({ ...opts, type: 'article' })
}
