import type { Metadata } from 'next'
import {
  Section, Container, Grid,GridCol,
  InteriorHero, CTABanner, StatBlock, FeatureBlock,
  Heading, Text, Stack, Badge,
} from '@tryvion/ui'

export const metadata: Metadata = {
  title: 'About TRYVION | Enterprise Transformation Consultancy',
  description:
    'TRYVION is an independent enterprise technology consultancy. We bring together SAP, AI, cloud, and engineering expertise to help complex organisations transform with confidence.',
  openGraph: {
    title: 'About TRYVION',
    description: 'Independent enterprise transformation, end to end.',
    url: 'https://thetryvion.com/about',
  },
  alternates: { canonical: 'https://thetryvion.com/about' },
}

const BREADCRUMBS = [
  { label: 'Home',  href: '/' },
  { label: 'About', href: '/about' },
]

const PILLARS = [
  {
    layout:      'horizontal' as const,
    eyebrow:     'Independence',
    title:       'Advice you can trust',
    description: 'We are not tied to a single technology vendor. Our recommendations are based on what is right for your organisation, not what generates the most partner revenue.',
    accent:      'blue' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    layout:      'horizontal' as const,
    eyebrow:     'Depth',
    title:       'Specialists, not generalists',
    description: 'Every engagement is led by practitioners who have done the work before. We hire experienced professionals who bring genuine domain knowledge to complex enterprise challenges.',
    accent:      'violet' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    layout:      'horizontal' as const,
    eyebrow:     'Accountability',
    title:       'Outcomes over outputs',
    description: 'We measure success by what changes in your business, not by deliverables delivered. That means staying involved beyond go-live and treating your programme goals as our own.',
    accent:      'teal' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
]

const STATS = [
  { value: 'SAP + AI',  label: 'Core transformation expertise' },
  { value: '3',         label: 'Interconnected ecosystem pillars' },
  { value: '25+',       label: 'Years combined SAP leadership' },
  { value: 'Global',    label: 'Reach across Europe, APAC & Middle East' },
]

const INDUSTRIES = [
  'Financial Services', 'Professional Services', 'Manufacturing',
  'Retail & Consumer', 'Public Sector', 'Energy & Utilities',
  'Healthcare', 'Engineering & Construction',
]

export default function AboutPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={BREADCRUMBS}
        eyebrow="Our Story"
        title="The future is built, not waited for"
        description="TRYVION was founded to solve a challenge every complex organisation faces — transformation that is not just about technology, but about strategy, process, people and sustained momentum."
      />

      {/* ——— Mission narrative ——————————————————————————————————— */}
      <Section spacing="xl" background="default">
        <Container size="xl" padded>
          <Grid cols="12" gap="16">
            <GridCol span={12} lg={5}>
              <div className="sticky top-28">
                <Text variant="overline" color="accent" className="mb-3">Our purpose</Text>
                <Heading level={2} size="h2" balance className="mb-6">
                  We exist to make enterprise transformation succeed
                </Heading>
                <Grid cols="2" gap="6">
                  {STATS.map(({ value, label }) => (
                    <StatBlock key={label} value={value} label={label} variant="default" />
                  ))}
                </Grid>
              </div>
            </GridCol>

            <GridCol span={12} lg={7}>
              <Stack direction="vertical" gap={6}>
                <Text variant="body-lg" color="primary">
                  Every generation witnesses a shift that redefines how businesses operate. Today, that
                  shift is being driven by Cloud, Artificial Intelligence, Automation, and Software-as-a-Service.
                  Organisations across the world are reimagining how they engage employees, serve customers,
                  manage operations, and make decisions — yet many continue to struggle with fragmented
                  processes, complex technology landscapes, and an ever-growing shortage of skilled digital talent.
                </Text>
                <Text variant="body-lg" color="secondary">
                  TRYVION was founded to solve this challenge. We believe successful transformation is never
                  just about implementing technology. It is about bringing together business strategy,
                  standardised processes, intelligent platforms, innovation and people to create sustainable
                  business value. Our focus is to help organisations embrace modern enterprise solutions that
                  simplify operations, accelerate innovation, and build resilient digital businesses.
                </Text>
                <Text variant="body-lg" color="secondary">
                  What makes TRYVION different is our belief that technology transformation and talent
                  transformation must happen together. Very few firms bring together enterprise transformation,
                  innovation, digital learning and talent enablement as one integrated ecosystem. That is
                  the vision behind TRYVION — a continuous cycle where businesses transform, professionals
                  grow, and knowledge continuously fuels future success.
                </Text>
                <Text variant="body-lg" color="secondary">
                  The name TRYVION represents our commitment to transformation powered by vision, trust,
                  innovation, and execution. Every engagement we undertake is guided by these principles
                  as we help organisations embrace change with confidence.
                </Text>
              </Stack>
            </GridCol>
          </Grid>
        </Container>
      </Section>

      {/* ——— Pillars ————————————————————————————————————————————— */}
      <Section spacing="xl" background="subtle">
        <Container size="xl" padded>
          <div className="mb-12 text-center">
            <Text variant="overline" color="accent" className="mb-3">
              Our principles
            </Text>
            <Heading level={2} size="h2" balance>
              How we work
            </Heading>
          </div>
          <Stack direction="vertical" gap={6}>
            {PILLARS.map((pillar) => (
              <FeatureBlock key={pillar.title} {...pillar} />
            ))}
          </Stack>     
        </Container>
      </Section>

      {/* ——— Industries ————————————————————————————————————————— */}
      <Section spacing="lg" background="default">
        <Container size="xl" padded>
          <div className="text-center mb-10">
            <Text variant="overline" color="accent" className="mb-3">
              Sectors we serve
            </Text>
            <Heading level={2} size="h3" balance>
              Deep industry experience
            </Heading>
          </div>
          <Stack direction="horizontal" gap={3} wrap justify="center">
            {INDUSTRIES.map((industry) => (
              <Badge key={industry} variant="outline" size="lg">{industry}</Badge>
            ))}
          </Stack>
        </Container>
      </Section>

      {/* ——— CTA ————————————————————————————————————————————————— */}
      <CTABanner
        variant="ink"
        eyebrow="Work with us"
        headline="Join us while we're building it"
        subtext="TRYVION is a growing enterprise transformation practice. Come build it with us — you'll do more than step into a role. You'll help shape what it becomes."
        primaryCTA={{ label: 'Explore careers', href: '/careers' }}
        secondaryCTA={{ label: 'Get in touch', href: '/contact' }}
      />
    </>
  )
}
