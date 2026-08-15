import type { Metadata } from 'next'
import {
  Section, Container, Grid, GridCol,
  InteriorHero, StatBlock,
  Heading, Text, Stack, Badge,
} from '@tryvion/ui'
import { GetStartedForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Get Started',
  description:
    'Tell us about your transformation goals. Our team will match you with the right expertise and reach out within one business day.',
  openGraph: {
    title: 'Get Started with TRYVION',
    description: 'Begin your enterprise transformation journey.',
    url: 'https://thethetryvion.com/get-started',
  },
  alternates: { canonical: 'https://thetryvion.com/get-started' },
}

const BREADCRUMBS = [
  { label: 'Home',        href: '/' },
  { label: 'Get Started', href: '/get-started' },
]

const TRUST_STATS = [
  { value: 'SAP + AI',      label: 'Deep expertise across transformation, AI and talent' },
  { value: '3 Pillars',     label: 'Transformation, Academy and Talent — one ecosystem' },
  { value: 'Global Reach',  label: 'Enterprise clients across key markets worldwide' },
  { value: 'Clean Core',    label: 'Every engagement designed for long-term value' },
]

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Submit your request',
    description: 'Tell us about your organisation, the services you need, and your timeline.',
  },
  {
    step: '02',
    title: 'We match your needs',
    description: 'A senior consultant reviews your request and identifies the right team.',
  },
  {
    step: '03',
    title: 'Discovery conversation',
    description: 'A focused 30-minute call to align on scope, approach, and next steps.',
  },
]

export default function GetStartedPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={BREADCRUMBS}
        eyebrow="Begin Your Journey"
        title="Tell us about your goals"
        description="Fill out the form below and a TRYVION consultant will be in touch within one business day to explore how we can help."
      />

      {/* ——— Trust stats bar ————————————————————————————————————— */}
      <Section spacing="sm" background="subtle">
        <Container size="xl" padded>
          <Grid cols={4} gap={8}>
            {TRUST_STATS.map(({ value, label }) => (
              <StatBlock key={label} value={value} label={label} variant="default" />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ——— Main layout ————————————————————————————————————————— */}
      <Section spacing="xl" background="default">
        <Container size="xl" padded>
          <Grid cols={12} gap={16}>
            {/* Left: form */}
            <GridCol span={12} lg={7}>
              <div className="rounded-2xl border border-border-subtle bg-white p-8 shadow-sm lg:p-10">
                <GetStartedForm />
              </div>
            </GridCol>

            {/* Right: process + trust signals */}
            <GridCol span={12} lg={5}>
              <Stack direction="vertical" gap={10}>
                {/* What happens next */}
                <div>
                  <Heading level={2} size="h5" className="mb-6">
                    What happens next
                  </Heading>
                  <Stack direction="vertical" gap={6}>
                    {PROCESS_STEPS.map(({ step, title, description }) => (
                      <Stack key={step} direction="horizontal" gap={4} align="start">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-momentum text-white text-ui-sm font-bold">
                          {step}
                        </div>
                        <div>
                          <Text variant="ui-md" weight="semibold" color="primary" className="mb-1">
                            {title}
                          </Text>
                          <Text variant="body-sm" color="secondary">{description}</Text>
                        </div>
                      </Stack>
                    ))}
                  </Stack>
                </div>

                {/* Certifications */}
                <div className="rounded-xl border border-border-subtle bg-surface-subtle p-5">
                  <Text variant="ui-sm" weight="semibold" color="secondary" className="mb-3 uppercase tracking-wider">
                    Trusted and certified
                  </Text>
                  <Stack direction="horizontal" gap={2} wrap>
                    {[
                      'SAP Partner',
                      'AWS',
                      'Google Cloud',
                      'Microsoft Azure',
                      'RISE with SAP',
                    ].map((cert) => (
                      <Badge key={cert} variant="outline" size="sm">{cert}</Badge>
                    ))}
                  </Stack>
                </div>

                {/* NDA assurance */}
                <div className="rounded-xl bg-ink text-white p-5">
                  <Text variant="ui-sm" weight="semibold" className="mb-1 text-white">
                    Confidentiality guaranteed
                  </Text>
                  <Text variant="body-sm" className="text-content-inverse-secondary">
                    All information you share is treated as strictly confidential.
                    We sign NDAs before any detailed discussions.
                  </Text>
                </div>
              </Stack>
            </GridCol>
          </Grid>
        </Container>
      </Section>
    </>
  )
}
