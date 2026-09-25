import type { MetadataRoute } from 'next';
import { getSiteOrigin } from '@/lib/seo/config';

const BASE_URL = getSiteOrigin();

const ROUTES: Array<{
  path: string;
  priority: number;
}> = [
  // =========================================================================
  // CORE WEBSITE
  // =========================================================================

  {
    path: '/',
    priority: 1.0,
  },
  {
    path: '/about',
    priority: 0.9,
  },
  {
    path: '/services',
    priority: 0.9,
  },
  {
    path: '/industries',
    priority: 0.8,
  },
  {
    path: '/careers',
    priority: 0.8,
  },
  {
    path: '/contact',
    priority: 0.8,
  },

  // =========================================================================
  // ABOUT
  // =========================================================================

  {
    path: '/about/our-story',
    priority: 0.7,
  },
  {
    path: '/about/leadership',
    priority: 0.8,
  },
  {
    path: '/about/our-values',
    priority: 0.7,
  },
  {
    path: '/about/what-we-believe',
    priority: 0.7,
  },

  // =========================================================================
  // SERVICES — TRYVION APPLICATIONS
  // =========================================================================

  {
    path: '/services/applications',
    priority: 0.9,
  },
  {
    path: '/services/applications/sap-s4hana',
    priority: 0.9,
  },
  {
    path: '/services/applications/sap-successfactors',
    priority: 0.8,
  },
  {
    path: '/services/applications/sap-btp',
    priority: 0.8,
  },

  // SAP S/4HANA editions
  {
    path: '/services/applications/sap-s4hana/private-edition',
    priority: 0.8,
  },
  {
    path: '/services/applications/sap-s4hana/public-edition',
    priority: 0.8,
  },

  // =========================================================================
  // SERVICES — TRYVION AI
  // =========================================================================

  {
    path: '/services/artificial-intelligence',
    priority: 0.9,
  },
  {
    path: '/services/artificial-intelligence/enterprise-ai-strategy',
    priority: 0.9,
  },
  {
    path: '/services/artificial-intelligence/enterprise-ai-platforms',
    priority: 0.8,
  },
  {
    path: '/services/artificial-intelligence/intelligent-automation',
    priority: 0.8,
  },

  // =========================================================================
  // SERVICES — TRYVION TALENT
  // =========================================================================

  {
    path: '/services/talent',
    priority: 0.9,
  },

  // =========================================================================
  // SERVICES — TRYVION ACADEMY
  // =========================================================================

  {
    path: '/services/academy',
    priority: 0.8,
  },

  // =========================================================================
  // SERVICES — TRYVION OPERATE
  // =========================================================================

  {
    path: '/services/operate',
    priority: 0.8,
  },
  {
    path: '/services/operate/sap-run-in-the-new',
    priority: 0.8,
  },

  // =========================================================================
  // CAREERS
  // =========================================================================

  {
    path: '/careers/life-at-tryvion',
    priority: 0.7,
  },
  {
    path: '/careers/roles',
    priority: 0.8,
  },

  // =========================================================================
  // CONTACT
  // =========================================================================

  {
    path: '/contact/request-a-proposal',
    priority: 0.8,
  },
  {
    path: '/contact/sales-enquiries',
    priority: 0.6,
  },
  {
    path: '/contact/customer-support',
    priority: 0.6,
  },
  {
    path: '/contact/global-offices',
    priority: 0.7,
  },

  // =========================================================================
  // LEGAL / ACCESSIBILITY
  // =========================================================================

  {
    path: '/privacy',
    priority: 0.3,
  },
  {
    path: '/terms',
    priority: 0.2,
  },
  {
    path: '/cookie-policy',
    priority: 0.2,
  },
  {
    path: '/accessibility',
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: new URL(path, BASE_URL).toString(),
    priority,
  }));
}
