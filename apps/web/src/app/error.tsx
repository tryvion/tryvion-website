'use client'

import { useEffect } from 'react'
import {
  Section, Container,
  Heading, Text, Stack, Button,
} from '@tryvion/ui'

interface ErrorPageProps {
  error:  Error & { digest?: string }
  reset:  () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // TODO Phase 11+: send to error tracking (Sentry / Datadog)
    if (process.env.NODE_ENV === 'development') {
      console.error('[TRYVION] Unhandled route error:', error)
    }
  }, [error])

  return (
    <Section spacing="2xl" background="default">
      <Container size="md" padded>
        <Stack direction="vertical" gap={8} align="center" className="py-16 text-center">
          <Text variant="overline" color="accent">
            Something went wrong
          </Text>

          <Heading level={1} size="display-sm" balance>
            An unexpected error occurred
          </Heading>

          <Text variant="body-lg" color="secondary" className="max-w-prose">
            We&rsquo;ve been notified and are looking into it. You can try again or
            return to the homepage while we investigate.
          </Text>

          {/* Show digest in production for support references, never the raw message */}
          {error.digest && (
            <Text variant="caption" color="secondary" className="font-mono">
              Error ID: {error.digest}
            </Text>
          )}

          <Stack direction="horizontal" gap={4} wrap justify="center">
            <Button variant="primary" onClick={reset}>
              Try again
            </Button>
            <Button variant="outline" href="/">
              Go to homepage
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Section>
  )
}
