import { describe, it, expect } from 'vitest'
import { buildMetadata, buildArticleMetadata } from '../metadata'

describe('buildMetadata()', () => {

  // -------------------------------------------------------------------------
  // Core fields
  // -------------------------------------------------------------------------

  it('sets title and description', () => {
    const meta = buildMetadata({ title: 'Services', description: 'Our services', path: '/services' })
    expect(meta.title).toBe('Services')
    expect(meta.description).toBe('Our services')
  })

  it('sets canonical alternates from path', () => {
    const meta = buildMetadata({ title: 'T', description: 'D', path: '/about' })
    expect((meta.alternates as { canonical: string }).canonical).toBe('/about')
  })

  // -------------------------------------------------------------------------
  // Robots
  // -------------------------------------------------------------------------

  it('indexes by default (noIndex omitted)', () => {
    const meta = buildMetadata({ title: 'T', description: 'D', path: '/services' })
    expect((meta.robots as { index: boolean; follow: boolean }).index).toBe(true)
    expect((meta.robots as { index: boolean; follow: boolean }).follow).toBe(true)
  })

  it('sets noindex when noIndex: true', () => {
    const meta = buildMetadata({ title: 'T', description: 'D', path: '/thank-you', noIndex: true })
    const robots = meta.robots as { index: boolean; follow: boolean }
    expect(robots.index).toBe(false)
    expect(robots.follow).toBe(false)
  })

  // -------------------------------------------------------------------------
  // OpenGraph
  // -------------------------------------------------------------------------

  it('sets og:title and og:description', () => {
    const meta = buildMetadata({ title: 'SAP Practice', description: 'SAP experts', path: '/services/sap' })
    const og = meta.openGraph as { title: string; description: string }
    expect(og.title).toBe('SAP Practice')
    expect(og.description).toBe('SAP experts')
  })

  it('defaults to og:type website', () => {
    const meta = buildMetadata({ title: 'T', description: 'D', path: '/p' })
    expect((meta.openGraph as { type: string }).type).toBe('website')
  })

  it('sets og:type article when type="article"', () => {
    const meta = buildMetadata({ title: 'T', description: 'D', path: '/p', type: 'article' })
    expect((meta.openGraph as { type: string }).type).toBe('article')
  })

  it('includes og:images when image URL is provided', () => {
    const meta = buildMetadata({
      title: 'T', description: 'D', path: '/p',
      image: 'https://tryvion.com/og/services.jpg',
    })
    const og = meta.openGraph as { images?: { url: string; width: number; height: number; alt: string }[] }
    expect(og.images).toBeDefined()
    expect(og.images![0].url).toBe('https://tryvion.com/og/services.jpg')
    expect(og.images![0].width).toBe(1200)
    expect(og.images![0].height).toBe(630)
  })

  it('omits og:images when no image is provided', () => {
    const meta = buildMetadata({ title: 'T', description: 'D', path: '/p' })
    const og = meta.openGraph as { images?: unknown }
    expect(og.images).toBeUndefined()
  })

  it('sets publishedTime on article type', () => {
    const meta = buildMetadata({
      title: 'T', description: 'D', path: '/insights/test',
      type: 'article', publishedAt: '2025-01-15T00:00:00.000Z',
    })
    const og = meta.openGraph as { publishedTime?: string }
    expect(og.publishedTime).toBe('2025-01-15T00:00:00.000Z')
  })

  it('does not set publishedTime for website type', () => {
    const meta = buildMetadata({
      title: 'T', description: 'D', path: '/p',
      type: 'website', publishedAt: '2025-01-15T00:00:00.000Z',
    })
    const og = meta.openGraph as { publishedTime?: string }
    expect(og.publishedTime).toBeUndefined()
  })

  // -------------------------------------------------------------------------
  // Twitter card
  // -------------------------------------------------------------------------

  it('sets twitter card title and description', () => {
    const meta = buildMetadata({ title: 'Tweet title', description: 'Tweet desc', path: '/p' })
    const tw = meta.twitter as { title: string; description: string }
    expect(tw.title).toBe('Tweet title')
    expect(tw.description).toBe('Tweet desc')
  })

  it('includes twitter image when image is provided', () => {
    const meta = buildMetadata({
      title: 'T', description: 'D', path: '/p',
      image: 'https://tryvion.com/og.jpg',
    })
    const tw = meta.twitter as { images?: string[] }
    expect(tw.images).toContain('https://tryvion.com/og.jpg')
  })
})

// ---------------------------------------------------------------------------
// buildArticleMetadata() convenience wrapper
// ---------------------------------------------------------------------------

describe('buildArticleMetadata()', () => {
  it('sets og:type to article', () => {
    const meta = buildArticleMetadata({
      title: 'Article title',
      description: 'Article description',
      path: '/insights/test-slug',
      publishedAt: '2025-03-01T00:00:00.000Z',
    })
    expect((meta.openGraph as { type: string }).type).toBe('article')
  })

  it('sets publishedTime from publishedAt', () => {
    const meta = buildArticleMetadata({
      title: 'T', description: 'D',
      path: '/insights/test',
      publishedAt: '2025-06-01T00:00:00.000Z',
    })
    const og = meta.openGraph as { publishedTime?: string }
    expect(og.publishedTime).toBe('2025-06-01T00:00:00.000Z')
  })

  it('sets modifiedTime when modifiedAt is provided', () => {
    const meta = buildArticleMetadata({
      title: 'T', description: 'D',
      path: '/insights/test',
      publishedAt: '2025-01-01T00:00:00.000Z',
      modifiedAt:  '2025-06-15T00:00:00.000Z',
    })
    const og = meta.openGraph as { modifiedTime?: string }
    expect(og.modifiedTime).toBe('2025-06-15T00:00:00.000Z')
  })
})
