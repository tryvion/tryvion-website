import type { Metadata } from 'next';

// metadataBase is set in the root layout.

// All paths are relative to the production site origin.

export interface PageMetadataInput {
  /** Page title — the root layout appends " | TRYVION" when needed */
  title: string;

  /** Search-engine meta description */
  description: string;

  /** Absolute path from root, e.g. "/services" */
  path: string;

  /**
   * Absolute or root-relative URL for a page-specific OG image.
   * Falls back to the global generated /opengraph-image.
   */
  image?: string;

  /**
   * Set true for pages that should not appear in search engines,
   * such as thank-you, preview, or other non-public pages.
   */
  noIndex?: boolean;

  /** Schema.org content type — defaults to "website" */
  type?: 'website' | 'article';

  /** ISO 8601 publish date — used when type is "article" */
  publishedAt?: string;

  /** ISO 8601 modified date — used when type is "article" */
  modifiedAt?: string;
}

/**
 * Builds consistent page-level metadata for TRYVION.
 *
 * The root layout provides:
 * - metadataBase
 * - title template
 * - default title
 * - default description
 *
 * This helper provides page-specific:
 * - title
 * - description
 * - canonical URL
 * - robots directives
 * - Open Graph metadata
 * - Twitter/X metadata
 */
export function buildMetadata({
  title,
  description,
  path,
  image = '/opengraph-image',
  noIndex = false,
  type = 'website',
  publishedAt,
  modifiedAt,
}: PageMetadataInput): Metadata {
  const isArticle = type === 'article';

  const robots = noIndex
    ? {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
          'max-snippet': -1,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
          'max-snippet': -1,
        },
      };

  const normalizedTitle = title.trim();

  const finalTitle = /(?:\s*\|\s*TRYVION)$/i.test(normalizedTitle)
    ? normalizedTitle
    : `${normalizedTitle} | TRYVION`;

  const openGraph: Metadata['openGraph'] = {
    title: normalizedTitle,
    description,
    url: path,
    siteName: 'TRYVION',
    locale: 'en_US',
    type: isArticle ? 'article' : 'website',
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: normalizedTitle,
      },
    ],
    ...(isArticle && publishedAt
      ? {
          publishedTime: publishedAt,
        }
      : {}),
    ...(isArticle && modifiedAt
      ? {
          modifiedTime: modifiedAt,
        }
      : {}),
  };

  return {
    title: finalTitle,
    description,

    alternates: {
      canonical: path,
    },

    robots,

    openGraph,

    twitter: {
      card: 'summary_large_image',
      title: normalizedTitle,
      description,
      images: [image],
    },
  };
}

// ---------------------------------------------------------------------------
// Convenience wrappers
// ---------------------------------------------------------------------------

export function buildArticleMetadata(
  opts: Omit<PageMetadataInput, 'type'> & Required<Pick<PageMetadataInput, 'publishedAt'>>,
): Metadata {
  return buildMetadata({
    ...opts,
    type: 'article',
  });
}
