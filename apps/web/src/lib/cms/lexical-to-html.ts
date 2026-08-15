import type { LexicalNode, LexicalRoot } from './client'

// ---------------------------------------------------------------------------
// Lightweight Lexical AST → HTML serializer
// Handles all nodes produced by Payload's default lexicalEditor() config.
// No external dependencies — runs on the server during SSG/SSR.
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g, '&#039;')
}

function serializeChildren(children: LexicalNode[]): string {
  return children.map(serializeNode).join('')
}

function serializeNode(node: LexicalNode): string {
  switch (node.type) {
    case 'root':
      return serializeChildren(node.children ?? [])

    case 'paragraph': {
      const inner = serializeChildren(node.children ?? [])
      // Empty paragraphs become spacing
      return inner ? `<p>${inner}</p>` : '<p>&nbsp;</p>'
    }

    case 'heading': {
      const tag = (node.tag && /^h[1-6]$/.test(node.tag)) ? node.tag : 'h2'
      return `<${tag}>${serializeChildren(node.children ?? [])}</${tag}>`
    }

    case 'list': {
      const tag   = node.listType === 'number' ? 'ol' : 'ul'
      const inner = serializeChildren(node.children ?? [])
      return `<${tag}>${inner}</${tag}>`
    }

    case 'listitem': {
      const inner = serializeChildren(node.children ?? [])
      return `<li>${inner}</li>`
    }

    case 'quote':
      return `<blockquote>${serializeChildren(node.children ?? [])}</blockquote>`

    case 'link': {
      const url    = node.fields?.url ?? '#'
      const newTab = node.fields?.newTab
      const target = newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${escapeHtml(url)}"${target}>${serializeChildren(node.children ?? [])}</a>`
    }

    case 'autolink': {
      const url = node.fields?.url ?? '#'
      return `<a href="${escapeHtml(url)}">${serializeChildren(node.children ?? [])}</a>`
    }

    case 'text': {
      let text = escapeHtml(node.text ?? '')
      // Format bitfield: bold=1, italic=2, strikethrough=4, underline=8, code=16
      const fmt = typeof node.format === 'number' ? node.format : 0
      if (fmt & 16) text = `<code>${text}</code>`
      if (fmt & 8)  text = `<u>${text}</u>`
      if (fmt & 4)  text = `<s>${text}</s>`
      if (fmt & 2)  text = `<em>${text}</em>`
      if (fmt & 1)  text = `<strong>${text}</strong>`
      return text
    }

    case 'linebreak':
      return '<br>'

    case 'horizontalrule':
      return '<hr>'

    case 'code': {
      const inner = escapeHtml(
        (node.children ?? []).map((c) => c.text ?? '').join(''),
      )
      return `<pre><code>${inner}</code></pre>`
    }

    case 'upload': {
      // Inline media upload — render as <img> or skip non-image types
      const fields  = (node as unknown as { value?: { url?: string; alt?: string; mimeType?: string } }).value
      if (!fields?.url) return ''
      if (fields.mimeType?.startsWith('image/')) {
        return `<img src="${escapeHtml(fields.url)}" alt="${escapeHtml(fields.alt ?? '')}" loading="lazy">`
      }
      return `<a href="${escapeHtml(fields.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(fields.alt ?? fields.url)}</a>`
    }

    default:
      // Unknown node — recurse into children if present, else discard
      return serializeChildren(node.children ?? [])
  }
}

export function lexicalToHtml(
  state: { root: LexicalRoot } | null | undefined,
): string {
  if (!state?.root) return ''
  return serializeNode(state.root as unknown as LexicalNode)
}
