import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_SIZE = 32_000;
const TIMEOUT_MS = 20_000;

function getCmsUrl(request: NextRequest): string | null {
  const configured = process.env.CMS_URL?.trim() || process.env.NEXT_PUBLIC_CMS_URL?.trim();

  if (!configured) {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3001';
    }

    return null;
  }

  return configured.replace(/\/+$/, '');
}

export async function POST(request: NextRequest) {
  const cmsUrl = getCmsUrl(request);

  if (!cmsUrl) {
    console.error('[TRYVION Sales Enquiries] CMS_URL is not configured.');

    return NextResponse.json(
      {
        success: false,
        message: 'Sales enquiry service is not configured.',
      },
      { status: 503 },
    );
  }

  let cmsOrigin: string;

  try {
    cmsOrigin = new URL(cmsUrl).origin;
  } catch {
    console.error('[TRYVION Sales Enquiries] Invalid CMS_URL:', cmsUrl);

    return NextResponse.json(
      {
        success: false,
        message: 'Sales enquiry service configuration is invalid.',
      },
      { status: 503 },
    );
  }

  /*
   * Prevent accidental Web → Web recursion.
   *
   * If CMS_URL points back to the public website, the request can
   * resolve to a normal Next.js page and return HTML instead of the
   * Payload API response.
   */
  const requestOrigin = new URL(request.url).origin;

  if (cmsOrigin === requestOrigin) {
    console.error('[TRYVION Sales Enquiries] CMS_URL points to the Web application:', cmsOrigin);

    return NextResponse.json(
      {
        success: false,
        message: 'Sales enquiry service is pointing to the website instead of the CMS.',
      },
      { status: 503 },
    );
  }

  try {
    const contentLength = Number(request.headers.get('content-length') || 0);

    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request is too large.',
        },
        { status: 413 },
      );
    }

    const body = await request.text();

    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: 'Empty request.',
        },
        { status: 400 },
      );
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, TIMEOUT_MS);

    try {
      const cmsResponse = await fetch(`${cmsUrl}/api/sales-enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body,
        cache: 'no-store',
        signal: controller.signal,
      });

      const responseContentType = cmsResponse.headers.get('content-type') || '';

      /*
       * The CMS endpoint MUST return JSON.
       *
       * If HTML comes back, do not pass the HTML to the browser.
       * This protects the UI and immediately identifies a CMS URL /
       * deployment-routing problem.
       */
      if (!responseContentType.toLowerCase().includes('application/json')) {
        const responseText = await cmsResponse.text();

        console.error('[TRYVION Sales Enquiries] CMS returned non-JSON response.', {
          cmsOrigin,
          status: cmsResponse.status,
          contentType: responseContentType,
          preview: responseText.slice(0, 300),
        });

        return NextResponse.json(
          {
            success: false,
            message:
              'The sales enquiry service is not responding correctly. The website reached the wrong service endpoint.',
          },
          { status: 502 },
        );
      }

      const result = await cmsResponse.json();

      return NextResponse.json(result, {
        status: cmsResponse.status,
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error('[TRYVION Web → CMS Sales Enquiries]', error);

    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        {
          success: false,
          message: 'The sales enquiry service timed out. Please try again.',
        },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to connect to the sales enquiry service. Please try again shortly.',
      },
      { status: 502 },
    );
  }
}
