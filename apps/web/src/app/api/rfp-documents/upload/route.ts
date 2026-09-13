import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CMS_URL = (
  process.env.CMS_URL ||
  process.env.NEXT_PUBLIC_CMS_URL ||
  'http://localhost:3001'
).replace(/\/+$/, '');

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const response = await fetch(`${CMS_URL}/api/rfp-documents/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
      },
      body,
      cache: 'no-store',
    });

    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('[TRYVION RFP BLOB PROXY]', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to connect to the document upload service.',
      },
      {
        status: 502,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  }
}
