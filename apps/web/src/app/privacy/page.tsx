import type { Metadata } from 'next'
import {
  Section, Container, ReadingWidth,
  InteriorHero,
  Heading, Text, Stack,
} from '@tryvion/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How TRYVION collects, uses, and protects your personal data in compliance with GDPR and applicable data protection law.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://thetryvion.com/privacy' },
}

const BREADCRUMBS = [
  { label: 'Home',    href: '/' },
  { label: 'Privacy', href: '/privacy' },
]

const LAST_UPDATED = '1 August 2025'

export default function PrivacyPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={BREADCRUMBS}
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${LAST_UPDATED}`}
      />

      <Section spacing="xl" background="default">
        <Container size="xl" padded>
          <ReadingWidth centered>
            <Stack direction="vertical" gap={10} as="article" aria-label="Privacy policy">

              <section aria-labelledby="intro-heading">
                <Heading level={2} id="intro-heading" size="h4" className="mb-4">
                  1. Introduction
                </Heading>
                <Stack direction="vertical" gap={4}>
                  <Text variant="body-md" color="secondary">
                    TRYVION Consulting Limited (&ldquo;TRYVION&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)
                    is committed to protecting and respecting your privacy. This policy sets out the basis
                    on which any personal data we collect from you, or that you provide to us, will be
                    processed by us.
                  </Text>
                  <Text variant="body-md" color="secondary">
                    For the purpose of the UK General Data Protection Regulation (&ldquo;UK GDPR&rdquo;) and
                    EU GDPR, the data controller is TRYVION Consulting Limited, registered in England and
                    Wales (Company No. 06789123), whose registered office is at 1 World Trade Center,
                    Suite 8500, New York, NY 10007.
                  </Text>
                </Stack>
              </section>

              <section aria-labelledby="data-collected-heading">
                <Heading level={2} id="data-collected-heading" size="h4" className="mb-4">
                  2. Information we collect
                </Heading>
                <Stack direction="vertical" gap={4}>
                  <Text variant="body-md" color="secondary">
                    We may collect and process the following data about you:
                  </Text>
                  <ul className="list-disc space-y-2 pl-6">
                    {[
                      'Identity data: name, job title, company name',
                      'Contact data: email address, telephone number, postal address',
                      'Technical data: IP address, browser type, operating system, referring URLs, pages visited, time spent on pages',
                      'Usage data: information about how you use our website and services',
                      'Marketing and communications data: your preferences for receiving marketing from us',
                    ].map((item) => (
                      <li key={item}>
                        <Text variant="body-md" color="secondary" as="span">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </Stack>
              </section>

              <section aria-labelledby="use-heading">
                <Heading level={2} id="use-heading" size="h4" className="mb-4">
                  3. How we use your information
                </Heading>
                <Stack direction="vertical" gap={4}>
                  <Text variant="body-md" color="secondary">
                    We use information held about you in the following ways:
                  </Text>
                  <ul className="list-disc space-y-2 pl-6">
                    {[
                      'To respond to enquiries and provide the services you have requested',
                      'To carry out our obligations arising from any contracts entered into between you and us',
                      'To notify you about changes to our services',
                      'To send you our newsletter and marketing communications where you have consented',
                      'To improve our website and services through analytics',
                      'To comply with our legal and regulatory obligations',
                    ].map((item) => (
                      <li key={item}>
                        <Text variant="body-md" color="secondary" as="span">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </Stack>
              </section>

              <section aria-labelledby="lawful-basis-heading">
                <Heading level={2} id="lawful-basis-heading" size="h4" className="mb-4">
                  4. Lawful basis for processing
                </Heading>
                <Stack direction="vertical" gap={4}>
                  <Text variant="body-md" color="secondary">
                    We process your personal data on the following lawful bases:
                  </Text>
                  <ul className="list-disc space-y-2 pl-6">
                    {[
                      'Consent — where you have given explicit consent (e.g., newsletter subscription)',
                      'Contract — where processing is necessary to fulfil a contract with you',
                      'Legitimate interests — where processing is necessary for our legitimate business interests and those interests are not overridden by your rights',
                      'Legal obligation — where we must process data to comply with a legal requirement',
                    ].map((item) => (
                      <li key={item}>
                        <Text variant="body-md" color="secondary" as="span">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </Stack>
              </section>

              <section aria-labelledby="retention-heading">
                <Heading level={2} id="retention-heading" size="h4" className="mb-4">
                  5. Data retention
                </Heading>
                <Text variant="body-md" color="secondary">
                  We will only retain your personal data for as long as necessary to fulfil the purposes
                  for which it was collected, including any legal, accounting, or reporting requirements.
                  Contact form submissions are retained for 24 months. Newsletter subscriptions are
                  retained until you unsubscribe. Analytics data is retained for 26 months.
                </Text>
              </section>

              <section aria-labelledby="rights-heading">
                <Heading level={2} id="rights-heading" size="h4" className="mb-4">
                  6. Your rights
                </Heading>
                <Stack direction="vertical" gap={4}>
                  <Text variant="body-md" color="secondary">
                    Under data protection law you have rights including:
                  </Text>
                  <ul className="list-disc space-y-2 pl-6">
                    {[
                      'The right to access a copy of your personal data',
                      'The right to rectification of inaccurate personal data',
                      'The right to erasure (&ldquo;the right to be forgotten&rdquo;)',
                      'The right to restrict processing',
                      'The right to data portability',
                      'The right to object to processing based on legitimate interests',
                      'Rights in relation to automated decision-making and profiling',
                    ].map((item) => (
                      <li key={item}>
                        <Text
                          variant="body-md"
                          color="secondary"
                          as="span"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      </li>
                    ))}
                  </ul>
                  <Text variant="body-md" color="secondary">
                    To exercise any of these rights, please contact our Data Protection Officer at{' '}
                    <a href="mailto:dpo@tryvion.com" className="underline">dpo@tryvion.com</a>.
                  </Text>
                </Stack>
              </section>

              <section aria-labelledby="cookies-heading">
                <Heading level={2} id="cookies-heading" size="h4" className="mb-4">
                  7. Cookies
                </Heading>
                <Text variant="body-md" color="secondary">
                  Our website uses cookies to distinguish you from other users and to improve your
                  experience. We use strictly necessary cookies (required for the website to function),
                  analytical cookies (to understand how visitors use our site), and marketing cookies
                  (where you have consented). You can control cookie preferences via our cookie banner.
                  For full details see our{' '}
                  <a href="/cookies" className="underline">Cookie Policy</a>.
                </Text>
              </section>

              <section aria-labelledby="contact-heading">
                <Heading level={2} id="contact-heading" size="h4" className="mb-4">
                  8. Contact and complaints
                </Heading>
                <Stack direction="vertical" gap={4}>
                  <Text variant="body-md" color="secondary">
                    Questions, comments, and requests regarding this privacy policy are welcome.
                    Please contact us at{' '}
                    <a href="mailto:dpo@tryvion.com" className="underline">dpo@tryvion.com</a>{' '}
                    or by post at: Data Protection Officer, TRYVION Consulting Limited,
                    1 World Trade Center, Suite 8500, New York, NY 10007.
                  </Text>
                  <Text variant="body-md" color="secondary">
                    You also have the right to lodge a complaint with your local supervisory authority.
                    In the UK this is the Information Commissioner&apos;s Office (ICO) at{' '}
                    <a href="https://ico.org.uk" className="underline" rel="noopener noreferrer" target="_blank">
                      ico.org.uk
                    </a>.
                  </Text>
                </Stack>
              </section>

            </Stack>
          </ReadingWidth>
        </Container>
      </Section>
    </>
  )
}
