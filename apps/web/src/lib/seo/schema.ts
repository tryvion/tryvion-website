import type { WithContext, Organization, WebSite, WebPage, BreadcrumbList } from 'schema-dts';
import { getSiteOrigin } from '@/lib/seo/config';

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

export function organizationSchema(): WithContext<Organization> {
  const origin = getSiteOrigin();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'TRYVION',
    url: origin,
    logo: {
      '@type': 'ImageObject',
      url: `${origin}/images/tryvion_dark_logo.svg`,
    },
  };
}

// ---------------------------------------------------------------------------
// WebSite
// ---------------------------------------------------------------------------

export function websiteSchema(): WithContext<WebSite> {
  const origin = getSiteOrigin();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: 'TRYVION',
    url: origin,
    publisher: {
      '@id': `${origin}/#organization`,
    },
  };
}

// ---------------------------------------------------------------------------
// WebPage
// ---------------------------------------------------------------------------

export interface WebPageSchemaInput {
  title: string;
  description: string;
  path: string;
}

export function webPageSchema({
  title,
  description,
  path,
}: WebPageSchemaInput): WithContext<WebPage> {
  const origin = getSiteOrigin();
  const url = new URL(path, origin).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: title,
    description,
    url,
    isPartOf: {
      '@id': `${origin}/#website`,
    },
    about: {
      '@id': `${origin}/#organization`,
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  const origin = getSiteOrigin();

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, origin).toString(),
    })),
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
