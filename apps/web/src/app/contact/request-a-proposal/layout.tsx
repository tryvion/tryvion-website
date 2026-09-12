import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Request a Proposal (RFP) | TRYVION',
  description:
    'Submit your RFP, project scope or transformation requirements to TRYVION and receive a tailored proposal from our enterprise transformation specialists.',
  path: '/contact/request-a-proposal',
});

export default function RequestAProposalLayout({ children }: { children: ReactNode }) {
  return children;
}
