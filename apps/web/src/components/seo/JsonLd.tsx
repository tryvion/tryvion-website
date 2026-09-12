import type { BreadcrumbList, Organization, WebPage, WebSite, WithContext } from 'schema-dts';

type JsonLdData =
  | WithContext<Organization>
  | WithContext<WebSite>
  | WithContext<WebPage>
  | WithContext<BreadcrumbList>;

function safeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />
  );
}
