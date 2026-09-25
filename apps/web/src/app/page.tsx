import { HomePage } from '@/components/home/HomePage';
import { PageStructuredData } from '@/components/seo/PageStructuredData';
import { pageMetadata, pageSeo } from '@/lib/seo/pages';

export const metadata = pageMetadata.home;

export default function Page() {
  return (
    <>
      <PageStructuredData page={pageSeo.home} />
      <HomePage />
    </>
  );
}
