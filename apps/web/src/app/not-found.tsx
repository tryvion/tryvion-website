import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Section, Container,
  Heading, Text, Stack, Button,
} from '@tryvion/ui'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <Section spacing="2xl" background="default">
      <Container size="md" padded>
        <Stack direction="vertical" gap={8} align="center" className="py-16 text-center">
          <Text variant="overline" color="accent">
            404
          </Text>

          <Heading level={1} size="display-sm" balance>
            Page not found
          </Heading>

          <Text variant="body-lg" color="secondary" className="max-w-prose">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
            It may have been removed, had its name changed, or is temporarily unavailable.
          </Text>

          <Stack direction="horizontal" gap={4} wrap justify="center">
            <Button variant="primary" href="/">
              Go to homepage
            </Button>
            <Button variant="outline" href="/contact">
              Contact support
            </Button>
          </Stack>

          {/* Quick-access navigation */}
          <div className="mt-8 w-full max-w-sm rounded-xl border border-border-subtle bg-surface-subtle p-6">
            <Text variant="ui-sm" weight="semibold" color="primary" className="mb-4">
              You might be looking for
            </Text>
            <Stack direction="vertical" gap={2}>
              {[
                { label: 'Our services',      href: '/services' },
                { label: 'About TRYVION',     href: '/about' },
                { label: 'Insights',           href: '/insights' },
                { label: 'Get started',        href: '/get-started' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-body-sm text-action-primary hover:bg-surface-default hover:text-action-primary-hover transition-colors"
                >
                  {label}
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
