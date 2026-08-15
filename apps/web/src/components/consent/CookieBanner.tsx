'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Stack, Text } from '@tryvion/ui'

// Key used in localStorage to persist the user's consent decision
const CONSENT_KEY = 'tryvion-cookie-consent'

declare global {
  interface Window {
    __tryvionUpdateConsent?: (granted: boolean) => void
  }
}

function applyConsent(granted: boolean) {
  try { localStorage.setItem(CONSENT_KEY, granted ? 'accepted' : 'declined') } catch { /* private browsing */ }
  window.__tryvionUpdateConsent?.(granted)
}

export function CookieBanner() {
  // Invisible until we confirm there is no stored decision (avoids flash on return visits)
  const [state, setState] = useState<'hidden' | 'visible'>(() => {
    if (typeof window === 'undefined') return 'hidden'

    try {
      return localStorage.getItem(CONSENT_KEY) ? 'hidden' : 'visible'
    } catch {
      return 'hidden'
    }
  })

  const handleAccept = () => {
    applyConsent(true)
    setState('hidden')
  }

  const handleDecline = () => {
    applyConsent(false)
    setState('hidden')
  }

  if (state !== 'visible') return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-describedby="cookie-banner-message"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border-subtle bg-white/95 shadow-elevation-4 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Text
          id="cookie-banner-message"
          variant="body-sm"
          color="secondary"
          className="max-w-prose"
        >
          We use cookies to improve your browsing experience and to analyse site traffic.
          By clicking &ldquo;Accept cookies&rdquo; you consent to our use of analytics cookies.
          Read our{' '}
          <Link href="/privacy" className="underline hover:text-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary rounded-sm">
            Privacy Policy
          </Link>{' '}
          for details.
        </Text>

        <Stack direction="horizontal" gap={3} className="shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDecline}
            aria-label="Decline analytics cookies"
          >
            Decline
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAccept}
            aria-label="Accept analytics cookies"
          >
            Accept cookies
          </Button>
        </Stack>
      </div>
    </div>
  )
}
