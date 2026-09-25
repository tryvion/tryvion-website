import type { Metadata } from 'next';

import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Talk to an Expert',
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function TalkToAnExpertLayout({ children }: { children: ReactNode }) {
  return children;
}
