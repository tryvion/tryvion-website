import type { Metadata } from 'next'
import {
  Section, Container, Grid, GridCol,
  InteriorHero, CTABanner,
  Heading, Text, Stack,
} from '@tryvion/ui'
import { ContactForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the TRYVION team. Tell us about your project and a consultant will respond within one business day.',
  openGraph: {
    title: 'Contact TRYVION',
    description: 'Connect with our enterprise consulting team.',
    url: 'https://thetryvion.com/contact',
  },
  alternates: { canonical: 'https://thetryvion.com/contact' },
}

const BREADCRUMBS = [
  { label: 'Home',    href: '/' },
  { label: 'Contact', href: '/contact' },
]

const OFFICES = [
  {
    city:    'New York',
    address: '1 World Trade Center, Suite 8500\nNew York, NY 10007',
    phone:   '+1 (212) 555-0100',
  },
  {
    city:    'London',
    address: '30 St Mary Axe, 15th Floor\nLondon EC3A 8BF',
    phone:   '+44 20 7946 0100',
  },
  {
    city:    'Singapore',
    address: '1 Raffles Place, Tower 2\nSingapore 048616',
    phone:   '+65 6809 0100',
  },
]

export default function ContactPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={BREADCRUMBS}
        eyebrow="Get In Touch"
        title="Let's start a conversation"
        description="Whether you have a specific challenge in mind or are exploring what's possible, our team is ready to help."
      />

      {/* ——— Main two-column layout ——————————————————————————————— */}
      <Section spacing="xl" background="default">
        <Container size="xl" padded>
          <Grid cols={12} gap={16}>
            {/* Left: context + office info */}
            <GridCol span={12} lg={4}>
              <Stack direction="vertical" gap={10}>
                <div>
                  <Heading level={2} size="h4" className="mb-4">
                    How we can help
                  </Heading>
                  <Stack direction="vertical" gap={3}>
                    {[
                      'Scoping and advisory for transformation programmes',
                      'Rapid proof-of-concept engagements',
                      'Talent augmentation and managed services',
                      'Executive briefings and workshops',
                    ].map((item) => (
                      <Stack key={item} direction="horizontal" gap={3} align="start">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-momentum" aria-hidden />
                        <Text variant="body-md" color="secondary">{item}</Text>
                      </Stack>
                    ))}
                  </Stack>
                </div>

                <div>
                  <Heading level={2} size="h5" className="mb-5">
                    Global offices
                  </Heading>
                  <Stack direction="vertical" gap={6}>
                    {OFFICES.map(({ city, address, phone }) => (
                      <div key={city}>
                        <Text variant="ui-sm" weight="semibold" color="primary" className="mb-1">
                          {city}
                        </Text>
                        <Text variant="body-sm" color="secondary" className="whitespace-pre-line">
                          {address}
                        </Text>
                        <a
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="mt-1 block text-body-sm text-action-primary hover:text-action-primary-hover"
                        >
                          {phone}
                        </a>
                      </div>
                    ))}
                  </Stack>
                </div>

                {/* Response time assurance */}
                <div className="rounded-xl border border-border-subtle bg-surface-subtle p-5">
                  <Text variant="ui-sm" weight="semibold" color="primary" className="mb-1">
                    Response time
                  </Text>
                  <Text variant="body-sm" color="secondary">
                    We aim to respond to all enquiries within one business day.
                    For urgent matters, call our main line directly.
                  </Text>
                </div>
              </Stack>
            </GridCol>

            {/* Right: form */}
            <GridCol span={12} lg={8}>
              <div className="rounded-2xl border border-border-subtle bg-white p-8 shadow-sm lg:p-10">
                <Heading level={2} size="h4" className="mb-2">
                  Send us a message
                </Heading>
                <Text variant="body-md" color="secondary" className="mb-8">
                  Fields marked <span className="text-error-500" aria-hidden>*</span> are required.
                </Text>
                <ContactForm />
              </div>
            </GridCol>
          </Grid>
        </Container>
      </Section>

      {/* ——— CTA ————————————————————————————————————————————————— */}
      <CTABanner
        variant="ink"
        eyebrow="Prefer to talk?"
        headline="Book a 30-minute discovery call"
        subtext="Speak directly with one of our senior consultants at a time that suits you."
        primaryCTA={{ label: 'Schedule a call', href: '/get-started' }}
        secondaryCTA={{ label: 'View our services', href: '/services' }}
      />
    </>
  )
}
