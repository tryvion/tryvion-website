import Script from 'next/script'

// GoogleAnalytics — loads GA4 only after the page becomes interactive.
//
// Implements Google Consent Mode v2:
//  • All consent types default to 'denied'
//  • GA4 loads after the consent defaults are established
//  • CookieBanner updates consent through window.__tryvionUpdateConsent()
//  • Previously stored consent is restored for returning visitors
//
// Only rendered when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.

interface GoogleAnalyticsProps {
  gaId: string
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      {/* Google Consent Mode v2 defaults */}
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}

          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>

      {/* GA4 measurement script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />

      {/* Initialise GA4 and restore persisted consent */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });

          window.__tryvionUpdateConsent = function(granted) {
            gtag('consent', 'update', {
              analytics_storage: granted ? 'granted' : 'denied'
            });

            if (granted) {
              gtag('event', 'page_view');
            }
          };

          try {
            var stored = localStorage.getItem('tryvion-cookie-consent');

            if (stored === 'accepted') {
              window.__tryvionUpdateConsent(true);
            }
          } catch (e) {}
        `}
      </Script>
    </>
  )
}
