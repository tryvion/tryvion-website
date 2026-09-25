import type {
  BreadcrumbList,
  ContactPage,
  Organization,
  WebPage,
  WebSite,
  WithContext,
} from 'schema-dts';

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
    inLanguage: 'en-IN',
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
    inLanguage: 'en-IN',
  };
}

// ---------------------------------------------------------------------------
// ContactPage
// ---------------------------------------------------------------------------

export interface ContactPageSchemaInput {
  name: string;
  description: string;
  path: string;
}

export function contactPageSchema({
  name,
  description,
  path,
}: ContactPageSchemaInput): WithContext<ContactPage> {
  const origin = getSiteOrigin();
  const url = new URL(path, origin).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contactpage`,
    name,
    description,
    url,
    isPartOf: {
      '@id': `${origin}/#website`,
    },
    about: {
      '@id': `${origin}/#organization`,
    },
    inLanguage: 'en-IN',
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

// ---------------------------------------------------------------------------
// JSON-LD serialization
// ---------------------------------------------------------------------------

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
