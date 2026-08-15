import type { LexicalNode } from './client';

// ---------------------------------------------------------------------------
// Lightweight Lexical AST → HTML serializer
// Handles all nodes produced by Payload's default lexicalEditor() config.
// No external dependencies — runs on the server during SSG/SSR.
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function serializeChildren(children: LexicalNode[]): string {
  return children.map(serializeNode).join('');
}

function serializeNode(node: LexicalNode): string {
  switch (node.type) {
    case 'root':
      return serializeChildren(node.children ?? []);

    case 'paragraph': {
      const inner = serializeChildren(node.children ?? []);

      // Empty paragraphs become spacing.
      return inner ? `<p>${inner}</p>` : '<p>&nbsp;</p>';
    }

    case 'heading': {
      const tag = node.tag && /^h[1-6]$/.test(node.tag) ? node.tag : 'h2';

      return `<${tag}>${serializeChildren(node.children ?? [])}</${tag}>`;
    }

    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul';
      const inner = serializeChildren(node.children ?? []);

      return `<${tag}>${inner}</${tag}>`;
    }

    case 'listitem': {
      const inner = serializeChildren(node.children ?? []);

      return `<li>${inner}</li>`;
    }

    case 'quote':
      return `<blockquote>${serializeChildren(node.children ?? [])}</blockquote>`;

    case 'link': {
      const url = node.fields?.url ?? '#';
      const newTab = node.fields?.newTab;

      const target = newTab ? ' target="_blank" rel="noopener noreferrer"' : '';

      return `<a href="${escapeHtml(url)}"${target}>${serializeChildren(node.children ?? [])}</a>`;
    }

    case 'autolink': {
      const url = node.fields?.url ?? '#';

      return `<a href="${escapeHtml(url)}">${serializeChildren(node.children ?? [])}</a>`;
    }

    case 'text': {
      let text = escapeHtml(node.text ?? '');

      /*
       * Lexical format bitfield:
       *
       * 1  = bold
       * 2  = italic
       * 4  = strikethrough
       * 8  = underline
       * 16 = code
       */

      const fmt = typeof node.format === 'number' ? node.format : 0;

      if (fmt & 16) text = `<code>${text}</code>`;
      if (fmt & 8) text = `<u>${text}</u>`;
      if (fmt & 4) text = `<s>${text}</s>`;
      if (fmt & 2) text = `<em>${text}</em>`;
      if (fmt & 1) text = `<strong>${text}</strong>`;

      return text;
    }

    case 'linebreak':
      return '<br>';

    case 'horizontalrule':
      return '<hr>';

    case 'code': {
      const inner = escapeHtml((node.children ?? []).map((child) => child.text ?? '').join(''));

      return `<pre><code>${inner}</code></pre>`;
    }

    case 'upload': {
      /*
       * Inline media upload.
       *
       * Images are rendered as <img>.
       * Other files are rendered as downloadable links.
       */

      const fields = (
        node as unknown as {
          value?: {
            url?: string;
            alt?: string;
            mimeType?: string;
          };
        }
      ).value;

      if (!fields?.url) return '';

      if (fields.mimeType?.startsWith('image/')) {
        return `<img src="${escapeHtml(fields.url)}" alt="${escapeHtml(
          fields.alt ?? '',
        )}" loading="lazy">`;
      }

      return `<a href="${escapeHtml(
        fields.url,
      )}" target="_blank" rel="noopener noreferrer">${escapeHtml(fields.alt ?? fields.url)}</a>`;
    }

    default:
      /*
       * Unknown node:
       * recurse into children where possible rather than
       * silently losing nested content.
       */
      return serializeChildren(node.children ?? []);
  }
}

// ---------------------------------------------------------------------------
// Public input type
//
// Payload's Lexical JSON can come from CMS responses, fixtures,
// tests, or other loosely typed data. The public function therefore
// accepts an unknown root and validates it at the serializer boundary.
// ---------------------------------------------------------------------------

type LexicalInput = {
  root?: unknown;
};

// ---------------------------------------------------------------------------
// Runtime guard
// ---------------------------------------------------------------------------

function isLexicalNode(value: unknown): value is LexicalNode {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const node = value as {
    type?: unknown;
  };

  return typeof node.type === 'string';
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function lexicalToHtml(state: LexicalInput | null | undefined): string {
  if (!state?.root) {
    return '';
  }

  if (!isLexicalNode(state.root)) {
    return '';
  }

  return serializeNode(state.root);
}
