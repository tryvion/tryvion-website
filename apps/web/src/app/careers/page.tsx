import type { Metadata } from 'next'
import {
  Section, Container,
  InteriorHero, CTABanner, FeatureBlock,
  Heading, Text, Stack,
} from '@tryvion/ui'

export const metadata: Metadata = {
  title: 'Careers at TRYVION',
  description:
    'Join TRYVION at a stage where you can do more than step into a role — help shape what the company becomes. We are building a specialist SAP, AI and enterprise transformation practice. Come build it with us.',
  alternates: { canonical: 'https://thetryvion.com/careers' },
}

const BREADCRUMBS = [
  { label: 'Home',    href: '/' },
  { label: 'Careers', href: '/careers' },
]

const VALUES = [
  {
    layout:      'horizontal' as const,
    eyebrow:     'Build',
    title:       'Join while we\'re building it',
    description: 'TRYVION is a growing enterprise transformation practice. The people who join now are not stepping into an established firm — they are shaping what it becomes. The opportunity is to leave a lasting mark on the organisation itself.',
    accent:      'blue' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    layout:      'horizontal' as const,
    eyebrow:     'Expertise',
    title:       'We hire people who know their domain',
    description: 'TRYVION teams are made up of practitioners with genuine SAP, AI and enterprise technology expertise — not generalists. We invest in depth because our clients depend on it.',
    accent:      'violet' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 013.741-3.342" />
      </svg>
    ),
  },
  {
    layout:      'horizontal' as const,
    eyebrow:     'Impact',
    title:       'Enterprise-critical work',
    description: 'TRYVION engagements are SAP S/4HANA transformations, Enterprise AI strategies and cloud programmes that fundamentally change how organisations operate. The problems are real and the outcomes are visible.',
    accent:      'teal' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
]

const PRACTICE_AREAS = [
  { practice: 'SAP Applications', skills: 'S/4HANA, SuccessFactors, BTP, Ariba, Integration Suite' },
  { practice: 'Enterprise AI', skills: 'SAP Business AI & Joule, Microsoft Copilot, OpenAI, Agentic AI' },
  { practice: 'Cloud', skills: 'AWS, Azure, GCP, RISE with SAP, cloud architecture' },
  { practice: 'TRYVION OPERATE', skills: 'Managed services, AMS, SAP operations, intelligent monitoring' },
  { practice: 'TRYVION TALENT', skills: 'SAP talent acquisition, permanent hiring, executive search' },
  { practice: 'TRYVION Academy', skills: 'SkillVerse learning, enterprise technology training, curriculum development' },
]

export default function CareersPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={BREADCRUMBS}
        eyebrow="Join TRYVION"
        title="Come build with us"
        description="TRYVION is a growing SAP, AI and enterprise transformation practice. The people who join now are not stepping into an established firm — they are shaping what it becomes. If you want to do more than inherit a role, we should talk."
      />

      {/* ——— Culture pillars ————————————————————————————————————— */}
      <Section spacing="xl" background="default">
        <Container size="xl" padded>
          <div className="mb-12">
            <Text variant="overline" color="accent" className="mb-3">Why TRYVION</Text>
            <Heading level={2} size="h2" balance>What it is like to build here</Heading>
          </div>
          <Stack direction="vertical" gap={6}>
            {VALUES.map((v) => (
              <FeatureBlock key={v.title} {...v} />
            ))}
          </Stack>
        </Container>
      </Section>

      {/* ——— Practice areas ——————————————————————————————————————— */}
      <Section spacing="xl" background="subtle">
        <Container size="xl" padded>
          <div className="mb-8">
            <Text variant="overline" color="accent" className="mb-2">Practice Areas</Text>
            <Heading level={2} size="h3">Where we hire</Heading>
          </div>

          <div className="space-y-3">
            {PRACTICE_AREAS.map(({ practice, skills }) => (
              <div
                key={practice}
                className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <Heading level={3} size="h6" className="min-w-0 flex-1">
                  {practice}
                </Heading>
                <Text variant="body-sm" color="secondary" className="sm:text-right">
                  {skills}
                </Text>
              </div>
            ))}
          </div>

          <p className="mt-8 text-body-sm text-content-secondary">
            Don&rsquo;t see an exact match? We are always interested in exceptional SAP, AI and enterprise technology talent.{' '}
            <a href="/contact" className="underline">Send us a speculative application.</a>
          </p>
        </Container>
      </Section>

      <CTABanner
        variant="ink"
        eyebrow="Let's talk"
        headline="Choose your future. Build it with TRYVION."
        subtext="Introduce yourself and tell us about the work you want to do. We are building something and we are looking for the people who want to help shape it."
        primaryCTA={{ label: 'Get in touch', href: '/contact' }}
        secondaryCTA={{ label: 'Life at TRYVION', href: '/careers/life' }}
      />
    </>
  )
}
