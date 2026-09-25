import type { PageSeoDefinition } from '@/lib/seo/pages';
import { buildPageStructuredData } from '@/lib/seo/structured-data';
import { JsonLd } from '@/components/seo/JsonLd';

interface PageStructuredDataProps {
  page: PageSeoDefinition;
}

export function PageStructuredData({ page }: PageStructuredDataProps) {
  const structuredData = buildPageStructuredData(page);

  return (
    <>
      {structuredData.map((schema, index) => (
        <JsonLd key={`${page.path}-schema-${index}`} data={schema} />
      ))}
    </>
  );
}
