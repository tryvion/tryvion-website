// Typed Payload v3 REST API client for apps/web
// CMS_URL is kept server-side only; NEXT_PUBLIC_CMS_URL is used for client reads (e.g. media URLs)

export const CMS_URL = process.env.CMS_URL ?? process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3001'

// ---------------------------------------------------------------------------
// Payload REST response shapes
// ---------------------------------------------------------------------------

export interface PaginatedDocs<T> {
  docs:          T[]
  totalDocs:     number
  limit:         number
  totalPages:    number
  page:          number
  pagingCounter: number
  hasPrevPage:   boolean
  hasNextPage:   boolean
  prevPage:      number | null
  nextPage:      number | null
}

export interface CMSMedia {
  id:        string
  alt:       string
  url:       string | null
  filename:  string
  mimeType:  string
  filesize:  number
  width?:    number
  height?:   number
  createdAt: string
  updatedAt: string
}

export interface CMSTeamMember {
  id:        string
  name:      string
  role:      string
  bio?:      string
  avatar?:   CMSMedia | string | null
  linkedin?: string
  email?:    string
}

// Lexical AST minimal types — used by the serializer
export interface LexicalRoot {
  type:     'root'
  children: LexicalNode[]
  version:  number
  direction?: string | null
  indent?:  number
  format?:  string
}

export interface LexicalNode {
  type:      string
  version:   number
  children?: LexicalNode[]
  text?:     string
  tag?:      string
  // bitfield: bold=1, italic=2, strikethrough=4, underline=8, code=16, subscript=32, superscript=64
  format?:   number | string
  listType?: 'bullet' | 'number' | 'check'
  fields?:   { url?: string; newTab?: boolean; linkType?: string }
  checked?:  boolean
  direction?: string | null
  indent?:   number
}

export interface CMSInsight {
  id:          string
  title:       string
  slug:        string
  excerpt:     string
  body:        { root: LexicalRoot } | null
  author?:     CMSTeamMember | string | null
  category:    string
  publishedAt: string
  readTime?:   string
  image:       CMSMedia | string
  seo?: {
    metaTitle?:       string
    metaDescription?: string
    ogImage?:         CMSMedia | string | null
  } | null
  _status:   'draft' | 'published'
  createdAt: string
  updatedAt: string
}

// ---------------------------------------------------------------------------
// Fetch helper — server-side only, never bundled to the browser
// ---------------------------------------------------------------------------

type QueryParams = Record<string, string | number | boolean | undefined>

function buildQS(params: QueryParams): string {
  const pairs = Object.entries(params).filter(([, v]) => v !== undefined)
  if (!pairs.length) return ''
  return '?' + pairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&')
}

export async function cmsGet<T>(
  path:   string,
  params: QueryParams = {},
  tags:   string[]    = [],
): Promise<T | null> {
  const url = `${CMS_URL}/api${path}${buildQS(params)}`
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      next:    { tags, revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    // CMS unreachable — callers fall back to static data
    return null
  }
}
