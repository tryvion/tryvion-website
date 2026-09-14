import { issueSignedToken, presignUrl } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { getCustomerSupportBlobToken } from '../../../../lib/customerSupportBlob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ALLOWED_CONTENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'image/png',
  'image/jpeg',
  'application/zip',
] as const;

const EXTENSIONS_BY_CONTENT_TYPE: Record<string, string[]> = {
  'application/pdf': ['pdf'],
  'application/msword': ['doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'application/vnd.ms-excel': ['xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
  'text/plain': ['txt'],
  'image/png': ['png'],
  'image/jpeg': ['jpg', 'jpeg'],
  'application/zip': ['zip'],
};

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}

function sanitiseFileName(fileName: string): string {
  return fileName
    .normalize('NFKC')
    .replace(/[/\\]/g, '-')
    .replace(/[^\p{L}\p{N}._()\- ]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.');

  return lastDot === -1
    ? ''
    : fileName.slice(lastDot + 1).toLowerCase();
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const requestContentType = request.headers.get('content-type') || '';

    if (!requestContentType.toLowerCase().includes('application/json')) {
      return jsonError('This endpoint requires an application/json request.');
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return jsonError('The upload request contains invalid JSON.');
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return jsonError('The upload request is invalid.');
    }

    const requestBody = body as {
      fileName?: unknown;
      contentType?: unknown;
      fileSize?: unknown;
    };

    if (typeof requestBody.fileName !== 'string') {
      return jsonError('The file name is required.');
    }

    const originalFileName = requestBody.fileName.trim();

    if (!originalFileName) {
      return jsonError('The file name is required.');
    }

    if (originalFileName.length > 255) {
      return jsonError('The file name must not exceed 255 characters.');
    }

    const fileName = sanitiseFileName(originalFileName);

    if (!fileName) {
      return jsonError('The file name is invalid.');
    }

    if (typeof requestBody.contentType !== 'string') {
      return jsonError('The file content type is required.');
    }

    const requestedContentType = requestBody.contentType.trim().toLowerCase();

    if (!ALLOWED_CONTENT_TYPES.includes(
      requestedContentType as (typeof ALLOWED_CONTENT_TYPES)[number],
    )) {
      return jsonError(`The file type "${requestedContentType}" is not supported.`);
    }

    if (
      typeof requestBody.fileSize !== 'number' ||
      !Number.isFinite(requestBody.fileSize)
    ) {
      return jsonError('The file size is required.');
    }

    const fileSize = requestBody.fileSize;

    if (fileSize <= 0) {
      return jsonError('The uploaded file must not be empty.');
    }

    if (fileSize > MAX_FILE_SIZE) {
      return jsonError('The uploaded file exceeds the 2 MB maximum size.');
    }

    const extension = getExtension(fileName);
    const allowedExtensions = EXTENSIONS_BY_CONTENT_TYPE[requestedContentType] || [];

    if (!extension || !allowedExtensions.includes(extension)) {
      return jsonError('The file extension does not match the supplied file type.');
    }

    /*
     * The pathname is generated server-side so a public client cannot
     * choose an arbitrary Blob location.
     */
    const pathname = `support-pending/${crypto.randomUUID()}-${fileName}`;

    const validUntil = Date.now() + 10 * 60 * 1000;
    const blobToken = getCustomerSupportBlobToken();

    const token = await issueSignedToken({
      token: blobToken,
      pathname,
      operations: ['put'],
      allowedContentTypes: [requestedContentType],
      maximumSizeInBytes: MAX_FILE_SIZE,
      validUntil,
    });

    /*
     * IMPORTANT:
     * Keep addRandomSuffix disabled. The returned pathname must be the
     * exact pathname that is later verified by the submission endpoint.
     */
    const { presignedUrl } = await presignUrl(token, {
      pathname,
      operation: 'put',
      access: 'private',
      validUntil,
      addRandomSuffix: false,
    });

    return NextResponse.json(
      {
        success: true,
        presignedUrl,
        pathname,
        fileName,
        contentType: requestedContentType,
        expiresAt: new Date(validUntil).toISOString(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (error) {
    console.error('[TRYVION CUSTOMER SUPPORT DOCUMENT UPLOAD]', error);

    return NextResponse.json(
      {
        success: false,
        message:
          'Unable to prepare the document upload at this time. Please try again shortly.',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  }
}
