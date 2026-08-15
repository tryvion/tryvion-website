import type { ReactNode } from 'react'
import {
  Section, Container, Grid, GridCol,
  InteriorHero, CTABanner, StatBlock,
  Heading, Text, Stack, Badge,
  ServiceCard,
} from '@tryvion/ui'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ServiceCapability {
  title:       string
  description: string
  icon:        ReactNode
}

export interface ServiceApproachStep {
  step:        string
  title:       string
  description: string
}

export interface ServiceStat {
  value: string
  label: string
  trend?: 'up' | 'down'
}

export interface RelatedServiceLink {
  title:       string
  description: string
  href:        string
  icon:        ReactNode
  accent:      'blue' | 'violet' | 'teal' | 'amber' | 'momentum' | 'choice' | 'purple' | 'orange'
}

const ACCENT_MAP: Record<string, 'momentum' | 'choice' | 'teal' | 'purple' | 'orange'> = {
  blue:     'momentum',
  violet:   'choice',
  amber:    'orange',
  teal:     'teal',
  purple:   'purple',
  orange:   'orange',
  momentum: 'momentum',
  choice:   'choice',
}

export interface ServiceDetailLayoutProps {
  // Hero
  breadcrumbs:  { label: string; href: string }[]
  eyebrow:      string
  title:        string
  description:  string

  // Overview
  overviewTitle:      string
  overviewParagraphs: string[]
  stats:              ServiceStat[]

  // Capabilities
  capabilities: ServiceCapability[]

  // Approach (optional)
  approach?: {
    title: string
    steps: ServiceApproachStep[]
  }

  // Certifications/partners (optional)
  certifications?: string[]

  // Related services (optional)
  relatedServices?: RelatedServiceLink[]

  // CTA
  ctaVariant?:      'ink' | 'momentum' | 'light'
  ctaEyebrow?:      string
  ctaTitle?:        string
  ctaDescription?:  string
  ctaPrimaryLabel?: string
  ctaSecondaryLabel?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ServiceDetailLayout({
  breadcrumbs,
  eyebrow,
  title,
  description,
  overviewTitle,
  overviewParagraphs,
  stats,
  capabilities,
  approach,
  certifications,
  relatedServices,
  ctaVariant       = 'ink',
  ctaEyebrow       = 'Ready to begin?',
  ctaTitle         = 'Talk to a TRYVION specialist',
  ctaDescription   = 'Tell us about your challenge and we\'ll match you with the right expertise.',
  ctaPrimaryLabel  = 'Get started',
  ctaSecondaryLabel = 'Contact us',
}: ServiceDetailLayoutProps) {
  return (
    <>
      <InteriorHero
        breadcrumbs={breadcrumbs}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      {/* ——— Overview ————————————————————————————————————————————— */}
      <Section spacing="xl" background="default">
        <Container size="xl" padded>
          <Grid cols={12} gap={16}>
            <GridCol span={12} lg={5}>
              <div className="sticky top-28">
                <Heading level={2} size="h3" balance className="mb-6">
                  {overviewTitle}
                </Heading>
                <Grid cols={2} gap={6}>
                  {stats.map(({ value, label, trend }) => (
                    <StatBlock key={label} value={value} label={label} trend={trend} />
                  ))}
                </Grid>
                {certifications && certifications.length > 0 && (
                  <div className="mt-8">
                    <Text variant="ui-sm" weight="semibold" color="secondary" className="mb-3 uppercase tracking-wider">
                      Certifications &amp; partnerships
                    </Text>
                    <Stack direction="horizontal" gap={2} wrap>
                      {certifications.map((cert) => (
                        <Badge key={cert} variant="outline" size="sm">{cert}</Badge>
                      ))}
                    </Stack>
                  </div>
                )}
              </div>
            </GridCol>
            <GridCol span={12} lg={7}>
              <Stack direction="vertical" gap={5}>
                {overviewParagraphs.map((p, i) => (
                  <Text key={i} variant={i === 0 ? 'body-lg' : 'body-md'} color={i === 0 ? 'primary' : 'secondary'}>
                    {p}
                  </Text>
                ))}
              </Stack>
            </GridCol>
          </Grid>
        </Container>
      </Section>

      {/* ——— Capabilities ———————————————————————————————————————— */}
      <Section spacing="xl" background="subtle">
        <Container size="xl" padded>
          <div className="mb-12">
            <Text variant="overline" color="accent" className="mb-3">Capabilities</Text>
            <Heading level={2} size="h3" balance>What we deliver</Heading>
          </div>
          <Grid cols={3} gap={8}>
            {capabilities.map(({ title: capTitle, description: capDesc, icon }) => (
              <div
                key={capTitle}
                className="rounded-xl border border-border-subtle bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-momentum-subtle text-momentum">
                  {icon}
                </div>
                <Heading level={3} size="h6" className="mb-2">{capTitle}</Heading>
                <Text variant="body-sm" color="secondary">{capDesc}</Text>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ——— Approach (optional) ————————————————————————————————— */}
      {approach && (
        <Section spacing="xl" background="default">
          <Container size="xl" padded>
            <div className="mb-12">
              <Text variant="overline" color="accent" className="mb-3">Our approach</Text>
              <Heading level={2} size="h3" balance>{approach.title}</Heading>
            </div>
            <div className="relative">
              {/* Connector line */}
              <div
                className="absolute left-[1.625rem] top-0 hidden h-full w-px bg-border-subtle lg:block"
                aria-hidden
              />
              <Stack direction="vertical" gap={8}>
                {approach.steps.map(({ step, title: stepTitle, description: stepDesc }) => (
                  <Stack key={step} direction="horizontal" gap={6} align="start">
                    <div className="relative z-[1] flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full border-2 border-momentum bg-white text-momentum text-ui-sm font-bold">
                      {step}
                    </div>
                    <div className="pb-2 pt-3">
                      <Heading level={3} size="h5" className="mb-2">{stepTitle}</Heading>
                      <Text variant="body-md" color="secondary">{stepDesc}</Text>
                    </div>
                  </Stack>
                ))}
              </Stack>
            </div>
          </Container>
        </Section>
      )}

      {/* ——— Related services ————————————————————————————————————— */}
      {relatedServices && relatedServices.length > 0 && (
        <Section spacing="xl" background="subtle">
          <Container size="xl" padded>
            <Heading level={2} size="h4" className="mb-8">Related services</Heading>
            <Grid cols={3} gap={8}>
              {relatedServices.map((svc) => (
                <ServiceCard
                  key={svc.href}
                  title={svc.title}
                  description={svc.description}
                  href={svc.href}
                  icon={svc.icon}
                  accentColor={ACCENT_MAP[svc.accent] ?? 'momentum'}
                />
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      {/* ——— CTA ————————————————————————————————————————————————— */}
      <CTABanner
        variant={ctaVariant}
        eyebrow={ctaEyebrow}
        headline={ctaTitle}
        subtext={ctaDescription}
        primaryCTA={{ label: ctaPrimaryLabel, href: '/get-started' }}
        secondaryCTA={{ label: ctaSecondaryLabel, href: '/contact' }}
      />
    </>
  )
}
