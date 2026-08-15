import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
  Section, Container, Grid, GridCol,
  InsightCard, CTABanner, Breadcrumbs,
  Heading, Text, Stack, Badge,
} from '@tryvion/ui'
import { buildArticleMetadata } from '@/lib/metadata'
import { getInsightBySlug, getRelatedInsights, getInsightSlugs } from '@/lib/cms/insights'
import { NewsletterForm } from '@/components/forms'

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return (await getInsightSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getInsightBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  return buildArticleMetadata({
    title:       article.title,
    description: article.excerpt,
    path:        `/insights/${slug}`,
    image:       article.image,
    publishedAt: article.publishedAt,
    modifiedAt:  article.modifiedAt,
  })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getInsightBySlug(slug)
  if (!article) notFound()

  const related = await getRelatedInsights(slug, article.category)
  const breadcrumbs = [
    { label: 'Home',           href: '/' },
    { label: 'Insights',       href: '/insights' },
    { label: article.category, href: `/insights?category=${article.category}` },
    { label: article.title,    href: `/insights/${slug}` },
  ]

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      {/* Hero ————————————————————————————————————————————————————— */}
      <Section spacing="lg" background="subtle">
        <Container size="xl" padded>
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 max-w-3xl">
            <Stack direction="horizontal" gap={3} className="mb-4">
              <Badge variant="primary" size="sm">{article.category}</Badge>
              <Text variant="caption" color="secondary">{article.readTime}</Text>
            </Stack>
            <Heading level={1} size="display-sm" balance className="mb-6">
              {article.title}
            </Heading>
            <Text variant="body-xl" color="secondary" className="mb-8">
              {article.excerpt}
            </Text>
            <Stack direction="horizontal" gap={4} align="center">
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-surface-subtle">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <Text variant="ui-sm" weight="semibold" color="primary">{article.author.name}</Text>
                <Text variant="caption" color="secondary">{article.author.role}</Text>
              </div>
              <div className="ml-auto">
                <time dateTime={article.publishedAt}>
                  <Text variant="caption" color="secondary">{formattedDate}</Text>
                </time>
              </div>
            </Stack>
          </div>
        </Container>
      </Section>

      {/* Hero image ——————————————————————————————————————————————— */}
      <div className="relative h-[28rem] w-full bg-surface-subtle">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Body + sidebar ——————————————————————————————————————————— */}
      <Section spacing="xl" background="default">
        <Container size="xl" padded>
          <Grid cols={12} gap={16}>
            <GridCol span={12} lg={8}>
              <article
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-content-primary
                  prose-p:text-content-secondary prose-p:leading-relaxed
                  prose-a:text-action-primary prose-a:underline
                  prose-blockquote:border-l-momentum"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
              {/* Share */}
              <div className="mt-12 border-t border-border-subtle pt-8">
                <Stack direction="horizontal" gap={3} align="center" wrap>
                  <Text variant="ui-sm" weight="semibold" color="secondary">Share:</Text>
                  {[
                    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=https://tryvion.com/insights/${slug}` },
                    { label: 'X / Twitter', href: `https://twitter.com/intent/tweet?url=https://tryvion.com/insights/${slug}&text=${encodeURIComponent(article.title)}` },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-1.5 text-ui-sm text-content-secondary hover:border-border-default hover:text-content-primary transition-colors"
                    >
                      {label}
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5v5M14 2L8 8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </Stack>
              </div>
            </GridCol>

            {/* Sidebar */}
            <GridCol span={12} lg={4}>
              <div className="sticky top-28 space-y-8">
                <div className="rounded-xl border border-border-subtle bg-surface-subtle p-6">
                  <Text variant="ui-sm" weight="semibold" color="secondary" className="mb-4 uppercase tracking-wider">About the author</Text>
                  <Stack direction="horizontal" gap={3} align="center">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-default">
                      <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <Text variant="ui-sm" weight="semibold" color="primary">{article.author.name}</Text>
                      <Text variant="caption" color="secondary">{article.author.role}</Text>
                    </div>
                  </Stack>
                </div>
                <div className="rounded-xl bg-ink p-6">
                  <Text variant="ui-md" weight="semibold" className="mb-1 text-white">Get TRYVION Insights</Text>
                  <Text variant="body-sm" className="mb-5 text-content-inverse-secondary">Fortnightly briefing for enterprise technology leaders.</Text>
                  <NewsletterForm layout="stacked" buttonLabel="Subscribe free" />
                </div>
              </div>
            </GridCol>
          </Grid>
        </Container>
      </Section>

      {/* Related ————————————————————————————————————————————————— */}
      {related.length > 0 && (
        <Section spacing="xl" background="subtle">
          <Container size="2xl" padded>
            <Heading level={2} size="h4" className="mb-8">Related articles</Heading>
            <Grid cols={3} gap={8}>
              {related.map((rel) => (
                <InsightCard
                  key={rel.slug}
                  title={rel.title}
                  excerpt={rel.excerpt}
                  href={`/insights/${rel.slug}`}
                  category={rel.category}
                  publishedAt={rel.publishedAt}
                  readTime={rel.readTime}
                  image={rel.image}
                  layout="vertical"
                />
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      <CTABanner
        variant="ink"
        eyebrow="Work with TRYVION"
        headline="Put these insights into practice"
        subtext="Talk to our practice leads about how these findings apply to your organisation."
        primaryCTA={{ label: 'Get started', href: '/get-started' }}
        secondaryCTA={{ label: 'Contact us', href: '/contact' }}
      />
    </>
  )
}