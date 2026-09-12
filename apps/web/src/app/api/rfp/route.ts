import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CMS_URL = (
  process.env.CMS_URL ||
  process.env.NEXT_PUBLIC_CMS_URL ||
  'http://localhost:3001'
).replace(/\/+$/, '');

const MAX_BODY_SIZE = 25 * 1024 * 1024;
const TIMEOUT_MS = 30_000;

export async function POST(request: NextRequest) {
  try {
    const contentLength = request.headers.get('content-length');

    if (contentLength && Number(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request is too large. Please keep the total upload size below 25 MB.',
        },
        { status: 413 },
      );
    }

    const contentType = request.headers.get('content-type') || '';

    if (!contentType.toLowerCase().includes('multipart/form-data')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format. The RFP form must be submitted as multipart/form-data.',
        },
        { status: 400 },
      );
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, TIMEOUT_MS);

    try {
      const response = await fetch(`${CMS_URL}/api/rfp-submissions/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': contentType,
          Accept: 'application/json',
        },
        body: request.body,
        cache: 'no-store',
        signal: controller.signal,
        // @ts-expect-error Next.js/TypeScript fetch types may not expose duplex,
        // but Node.js requires it when streaming a request body.
        duplex: 'half',
      });

      const responseContentType = response.headers.get('content-type') || '';

      let result: {
        success?: boolean;
        message?: string;
        error?: string;
        submissionId?: string;
        id?: string | number;
      };

      if (responseContentType.includes('application/json')) {
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
    console.error('[TRYVION Web RFP Proxy]', error);

    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        {
          success: false,
          message: 'The proposal service timed out. Please try again.',
        },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to connect to the proposal service.',
      },
      { status: 502 },
    );
  }
}
