import type { BreadcrumbList, ContactPage, WebPage, WithContext } from 'schema-dts';

import { breadcrumbSchema, contactPageSchema, webPageSchema } from '@/lib/seo/schema';

import type { PageSeoDefinition } from '@/lib/seo/pages';

// ---------------------------------------------------------------------------
// Page structured data
// ---------------------------------------------------------------------------

export function buildPageStructuredData(
  page: PageSeoDefinition,
): Array<WithContext<WebPage | ContactPage | BreadcrumbList>> {
  const schemas: Array<WithContext<WebPage | ContactPage | BreadcrumbList>> = [];

  if (page.schemaType === 'ContactPage') {
    schemas.push(
      contactPageSchema({
        name: page.title,
        description: page.description,
        path: page.path,
      }),
    );
  } else {
    schemas.push(
      webPageSchema({
        title: page.title,
        description: page.description,
        path: page.path,
      }),
    );
  }

  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    schemas.push(breadcrumbSchema(page.breadcrumbs));
  }

  return schemas;
}
