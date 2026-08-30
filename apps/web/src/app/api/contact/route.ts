import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CMS_URL = (
  process.env.CMS_URL ||
  process.env.NEXT_PUBLIC_CMS_URL ||
  'http://localhost:3001'
).replace(/\/+$/, '');

const CONTACT_API_SECRET = process.env.CONTACT_API_SECRET || '';

const MAX_BODY_SIZE = 20_000;

export async function POST(request: NextRequest) {
  try {
    const contentLength = request.headers.get('content-length');

    if (contentLength && Number(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request is too large.',
        },
        { status: 413 },
      );
    }

    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request.',
        },
        { status: 400 },
      );
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 20_000);

    try {
      const response = await fetch(`${CMS_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',

          ...(CONTACT_API_SECRET
            ? {
                'x-contact-api-secret': CONTACT_API_SECRET,
              }
            : {}),
        },
        body: JSON.stringify(body),
        cache: 'no-store',
        signal: controller.signal,
      });

      const contentType = response.headers.get('content-type') || '';

      let result: {
        success?: boolean;
        message?: string;
        error?: string;
        id?: string | number;
      };

      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();

        result = {
          success: response.ok,
          message: text || undefined,
        };
      }

      return NextResponse.json(result, {
        status: response.status,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error('[TRYVION Web Contact Proxy]', error);

    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        {
          success: false,
          message: 'The contact service timed out. Please try again.',
        },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to connect to the contact service.',
      },
      { status: 502 },
    );
  }
}
