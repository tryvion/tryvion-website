import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Called by the Payload afterChange hook in apps/cms/src/collections/Insights.ts
// to trigger on-demand ISR when content is published or updated.
//
// Security: validate the shared secret set in both:
//   apps/cms  env: REVALIDATE_SECRET
//   apps/web  env: REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { collection?: string; slug?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { collection, slug } = body

  switch (collection) {
    case 'insights':
      revalidateTag('insights')
      if (slug) revalidateTag(`insight:${slug}`)
      break

    case 'site-settings':
      // Revalidate all pages that might use site settings
      revalidateTag('site-settings')
      break

    case 'team':
      // Team changes affect article author blocks
      revalidateTag('insights')
      break

    default:
      return NextResponse.json({ error: `Unknown collection: ${collection}` }, { status: 400 })
  }

  return NextResponse.json({
    revalidated: true,
    collection,
    slug:        slug ?? null,
    ts:          Date.now(),
  })
}
