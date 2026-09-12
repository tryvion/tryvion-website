import type { MetadataRoute } from 'next';
import { getSiteOrigin } from '@/lib/seo/config';

const BASE_URL = getSiteOrigin();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All well-behaved crawlers
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/cms/', '/studio/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
