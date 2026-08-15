import { describe, it, expect } from 'vitest'
import { lexicalToHtml } from '../lexical-to-html'

// Helper — wraps children in the root node shape Payload produces
function doc(children: object[]) {
  return { root: { type: 'root', version: 1, children } }
}

function para(text: string, format = 0) {
  return {
    type: 'paragraph', version: 1,
    children: [{ type: 'text', version: 1, text, format }],
  }
}

describe('lexicalToHtml()', () => {

  // -------------------------------------------------------------------------
  // Null / empty input
  // -------------------------------------------------------------------------

  it('returns empty string for null', () => {
    expect(lexicalToHtml(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(lexicalToHtml(undefined)).toBe('')
  })

  it('returns empty string for object without root', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(lexicalToHtml({} as any)).toBe('')
  })

  // -------------------------------------------------------------------------
  // Paragraphs
  // -------------------------------------------------------------------------

  it('renders a paragraph', () => {
    expect(lexicalToHtml(doc([para('Hello world')]))).toBe('<p>Hello world</p>')
  })

  it('renders an empty paragraph as &nbsp;', () => {
    const state = doc([{
      type: 'paragraph', version: 1,
      children: [{ type: 'text', version: 1, text: '', format: 0 }],
    }])
    expect(lexicalToHtml(state)).toBe('<p>&nbsp;</p>')
  })

  // -------------------------------------------------------------------------
  // Headings
  // -------------------------------------------------------------------------

  it('renders h1 through h6', () => {
    for (const tag of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
      const state = doc([{
        type: 'heading', tag, version: 1,
        children: [{ type: 'text', version: 1, text: 'Title', format: 0 }],
      }])
      expect(lexicalToHtml(state)).toBe(`<${tag}>Title</${tag}>`)
    }
  })

  it('falls back to h2 for invalid heading tag', () => {
    const state = doc([{
      type: 'heading', tag: 'div', version: 1,
      children: [{ type: 'text', version: 1, text: 'Title', format: 0 }],
    }])
    expect(lexicalToHtml(state)).toBe('<h2>Title</h2>')
  })

  // -------------------------------------------------------------------------
  // Text formats (bitfield)
  // -------------------------------------------------------------------------

  it('renders bold text (format=1)', () => {
    expect(lexicalToHtml(doc([para('bold', 1)]))).toContain('<strong>bold</strong>')
  })

  it('renders italic text (format=2)', () => {
    expect(lexicalToHtml(doc([para('italic', 2)]))).toContain('<em>italic</em>')
  })

  it('renders strikethrough text (format=4)', () => {
    expect(lexicalToHtml(doc([para('strike', 4)]))).toContain('<s>strike</s>')
  })

  it('renders underline text (format=8)', () => {
    expect(lexicalToHtml(doc([para('under', 8)]))).toContain('<u>under</u>')
  })

  it('renders inline code text (format=16)', () => {
    expect(lexicalToHtml(doc([para('code', 16)]))).toContain('<code>code</code>')
  })

  it('renders bold + italic (format=3)', () => {
    const html = lexicalToHtml(doc([para('both', 3)]))
    // Order: code(16) → underline(8) → strike(4) → italic(2) → bold(1)
    // bold wraps last, so: <strong><em>both</em></strong>
    expect(html).toContain('<strong><em>both</em></strong>')
  })

  // -------------------------------------------------------------------------
  // XSS safety
  // -------------------------------------------------------------------------

  it('escapes < > & in text nodes', () => {
    const html = lexicalToHtml(doc([para('<script>alert("xss")</script>')]))
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&amp;')
  })

  it('escapes double quotes in text nodes', () => {
    const html = lexicalToHtml(doc([para('say "hello"')]))
    expect(html).toContain('&quot;')
  })

  it('escapes URL in link href', () => {
    const state = doc([{
      type: 'paragraph', version: 1,
      children: [{
        type: 'link', version: 1,
        fields: { url: 'https://example.com/?a=1&b=2', newTab: false },
        children: [{ type: 'text', version: 1, text: 'link', format: 0 }],
      }],
    }])
    expect(lexicalToHtml(state)).toContain('&amp;')
  })

  // -------------------------------------------------------------------------
  // Lists
  // -------------------------------------------------------------------------

  it('renders an unordered list', () => {
    const state = doc([{
      type: 'list', listType: 'bullet', version: 1,
      children: [
        { type: 'listitem', version: 1, children: [{ type: 'text', version: 1, text: 'One', format: 0 }] },
        { type: 'listitem', version: 1, children: [{ type: 'text', version: 1, text: 'Two', format: 0 }] },
      ],
    }])
    const html = lexicalToHtml(state)
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>One</li>')
    expect(html).toContain('<li>Two</li>')
    expect(html).toContain('</ul>')
  })

  it('renders an ordered list', () => {
    const state = doc([{
      type: 'list', listType: 'number', version: 1,
      children: [
        { type: 'listitem', version: 1, children: [{ type: 'text', version: 1, text: 'First', format: 0 }] },
      ],
    }])
    expect(lexicalToHtml(state)).toContain('<ol>')
  })

  // -------------------------------------------------------------------------
  // Blockquote
  // -------------------------------------------------------------------------

  it('renders a blockquote', () => {
    const state = doc([{
      type: 'quote', version: 1,
      children: [{ type: 'text', version: 1, text: 'A quote', format: 0 }],
    }])
    const html = lexicalToHtml(state)
    expect(html).toContain('<blockquote>')
    expect(html).toContain('A quote')
  })

  // -------------------------------------------------------------------------
  // Links
  // -------------------------------------------------------------------------

  it('renders a standard link', () => {
    const state = doc([{
      type: 'paragraph', version: 1,
      children: [{
        type: 'link', version: 1,
        fields: { url: 'https://tryvion.com', newTab: false },
        children: [{ type: 'text', version: 1, text: 'TRYVION', format: 0 }],
      }],
    }])
    expect(lexicalToHtml(state)).toContain('<a href="https://tryvion.com">TRYVION</a>')
  })

  it('adds target="_blank" and rel for new-tab links', () => {
    const state = doc([{
      type: 'paragraph', version: 1,
      children: [{
        type: 'link', version: 1,
        fields: { url: 'https://external.com', newTab: true },
        children: [{ type: 'text', version: 1, text: 'Ext', format: 0 }],
      }],
    }])
    const html = lexicalToHtml(state)
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('uses # when link has no URL', () => {
    const state = doc([{
      type: 'paragraph', version: 1,
      children: [{
        type: 'link', version: 1,
        fields: {},
        children: [{ type: 'text', version: 1, text: 'no url', format: 0 }],
      }],
    }])
    expect(lexicalToHtml(state)).toContain('href="#"')
  })

  // -------------------------------------------------------------------------
  // Inline elements
  // -------------------------------------------------------------------------

  it('renders a linebreak as <br>', () => {
    const state = doc([{
      type: 'paragraph', version: 1,
      children: [
        { type: 'text', version: 1, text: 'Line 1', format: 0 },
        { type: 'linebreak', version: 1 },
        { type: 'text', version: 1, text: 'Line 2', format: 0 },
      ],
    }])
    expect(lexicalToHtml(state)).toContain('<br>')
  })

  it('renders a horizontal rule as <hr>', () => {
    const state = doc([{ type: 'horizontalrule', version: 1 }])
    expect(lexicalToHtml(state)).toContain('<hr>')
  })

  // -------------------------------------------------------------------------
  // Code block
  // -------------------------------------------------------------------------

  it('renders a code block as <pre><code>', () => {
    const state = doc([{
      type: 'code', version: 1,
      children: [{ type: 'text', version: 1, text: 'const x = 1', format: 0 }],
    }])
    const html = lexicalToHtml(state)
    expect(html).toContain('<pre><code>')
    expect(html).toContain('const x = 1')
  })

  it('escapes HTML inside code blocks', () => {
    const state = doc([{
      type: 'code', version: 1,
      children: [{ type: 'text', version: 1, text: '<div>', format: 0 }],
    }])
    expect(lexicalToHtml(state)).toContain('&lt;div&gt;')
  })

  // -------------------------------------------------------------------------
  // Upload (media)
  // -------------------------------------------------------------------------

  it('renders an image upload as <img>', () => {
    const state = doc([{
      type: 'upload', version: 1,
      value: { url: '/media/hero.jpg', alt: 'Hero image', mimeType: 'image/jpeg' },
    }])
    const html = lexicalToHtml(state)
    expect(html).toContain('<img')
    expect(html).toContain('src="/media/hero.jpg"')
    expect(html).toContain('alt="Hero image"')
    expect(html).toContain('loading="lazy"')
  })

  it('renders a non-image upload as a link', () => {
    const state = doc([{
      type: 'upload', version: 1,
      value: { url: '/docs/report.pdf', alt: 'Annual Report', mimeType: 'application/pdf' },
    }])
    const html = lexicalToHtml(state)
    expect(html).toContain('<a href="/docs/report.pdf"')
    expect(html).toContain('Annual Report')
  })

  it('returns empty string for upload with no URL', () => {
    const state = doc([{
      type: 'upload', version: 1,
      value: { mimeType: 'image/png' },
    }])
    expect(lexicalToHtml(state)).toBe('')
  })

  // -------------------------------------------------------------------------
  // Unknown nodes
  // -------------------------------------------------------------------------

  it('recurses into children of unknown node types', () => {
    const state = doc([{
      type: 'unknown-future-type', version: 1,
      children: [{ type: 'text', version: 1, text: 'fallback', format: 0 }],
    }])
    expect(lexicalToHtml(state)).toContain('fallback')
  })

})
