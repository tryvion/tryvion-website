import { issueSignedToken, presignUrl } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { getRFPBlobAuthOptions } from '../../../../lib/rfpBlob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/*
 * ================================================================
 * REQUEST LIMITS
 * ================================================================
 */

const MAX_FILE_SIZE = 10 * 1024 * 1024

const MAX_FILES = 10

const ALLOWED_CONTENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
] as const

/*
 * ================================================================
 * HELPERS
 * ================================================================
 */

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
  )
}

function sanitiseFileName(fileName: string): string {
  return fileName
    .normalize('NFKC')
    .replace(/[/\\]/g, '-')
    .replace(/[^\p{L}\p{N}._()\- ]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.')

  if (lastDot === -1) {
    return ''
  }

  return fileName.slice(lastDot + 1).toLowerCase()
}

function isAllowedContentType(contentType: string): boolean {
  return ALLOWED_CONTENT_TYPES.includes(contentType as (typeof ALLOWED_CONTENT_TYPES)[number])
}

/*
 * ================================================================
 * POST
 * ================================================================
 *
 * The browser does NOT upload the file to this endpoint.
 *
 * This endpoint:
 *
 * 1. Validates the requested upload.
 * 2. Creates a private rfp-pending pathname.
 * 3. Issues a short-lived signed PUT token.
 * 4. Generates a presigned private Blob PUT URL.
 * 5. Returns that URL to the browser.
 *
 * The browser then uploads the actual file directly to Vercel Blob.
 *
 * ================================================================
 */

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    /*
     * ==============================================================
     * REQUEST VALIDATION
     * ==============================================================
     */

    const contentType = request.headers.get('content-type') || ''

    if (!contentType.toLowerCase().includes('application/json')) {
      return jsonError('This endpoint requires an application/json request.')
    }

    let body: unknown

    try {
      body = await request.json()
    } catch {
      return jsonError('The upload request contains invalid JSON.')
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return jsonError('The upload request is invalid.')
    }

    const requestBody = body as {
      fileName?: unknown
      contentType?: unknown
      fileSize?: unknown
    }

    /*
     * ==============================================================
     * FILE NAME
     * ==============================================================
     */

    if (typeof requestBody.fileName !== 'string') {
      return jsonError('The file name is required.')
    }

    const originalFileName = requestBody.fileName.trim()

    if (!originalFileName) {
      return jsonError('The file name is required.')
    }

    if (originalFileName.length > 255) {
      return jsonError('The file name must not exceed 255 characters.')
    }

    const fileName = sanitiseFileName(originalFileName)

    if (!fileName) {
      return jsonError('The file name is invalid.')
    }

    if (fileName.length > 255) {
      return jsonError('The file name is too long.')
    }

    /*
     * ==============================================================
     * CONTENT TYPE
     * ==============================================================
     */

    if (typeof requestBody.contentType !== 'string') {
      return jsonError('The file content type is required.')
    }

    const requestedContentType = requestBody.contentType.trim().toLowerCase()

    if (!requestedContentType) {
      return jsonError('The file content type is required.')
    }

    if (!isAllowedContentType(requestedContentType)) {
      return jsonError(`The file type "${requestedContentType}" is not supported.`)
    }

    /*
     * ==============================================================
     * FILE SIZE
     * ==============================================================
     */

    if (typeof requestBody.fileSize !== 'number' || !Number.isFinite(requestBody.fileSize)) {
      return jsonError('The file size is required.')
    }

    const fileSize = requestBody.fileSize

    if (fileSize <= 0) {
      return jsonError('The uploaded file must not be empty.')
    }

    if (fileSize > MAX_FILE_SIZE) {
      return jsonError('The uploaded file exceeds the 10 MB maximum size.')
    }

    /*
     * ==============================================================
     * EXTENSION VALIDATION
     * ==============================================================
     *
     * The extension is checked independently from MIME type so that
     * an obviously mismatched filename/content-type combination is
     * not accepted.
     *
     * ==============================================================
     */

    const extension = getExtension(fileName)

    const allowedExtensionsByContentType: Record<string, string[]> = {
      'application/pdf': ['pdf'],

      'application/msword': ['doc'],

      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],

      'application/vnd.ms-excel': ['xls'],

      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],

      'application/vnd.ms-powerpoint': ['ppt'],

      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx'],

      'text/plain': ['txt'],

      'text/csv': ['csv'],
    }

    const allowedExtensions = allowedExtensionsByContentType[requestedContentType] || []

    if (!extension || !allowedExtensions.includes(extension)) {
      return jsonError(`The file extension does not match the supplied file type.`)
    }

    /*
     * ==============================================================
     * FILE COUNT
     * ==============================================================
     *
     * The frontend enforces the maximum number of files.
     *
     * This endpoint authorises one file per request, so MAX_FILES is
     * retained here as the canonical application limit.
     *
     * ==============================================================
     */

    void MAX_FILES

    /*
     * ==============================================================
     * PRIVATE BLOB PATHNAME
     * ==============================================================
     *
     * Every RFP document begins with:
     *
     *     rfp-pending/
     *
     * The pathname is intentionally generated server-side.
     *
     * The browser cannot choose an arbitrary Blob pathname.
     *
     * ==============================================================
     */

    const randomId = crypto.randomUUID()

    const pathname = `rfp-pending/${randomId}-${fileName}`

    /*
     * ==============================================================
     * SIGNED UPLOAD TOKEN
     * ==============================================================
     *
     * The OIDC-authenticated signed token:
     *
     * - permits PUT only
     * - is restricted to the exact content type
     * - is restricted to 10 MB
     * - expires after 10 minutes
     *
     * ==============================================================
     */

    const validUntil = Date.now() + 10 * 60 * 1000

    const token = await issueSignedToken({
      ...getRFPBlobAuthOptions(),
      pathname,
      operations: ['put'],
      allowedContentTypes: [requestedContentType],
      maximumSizeInBytes: MAX_FILE_SIZE,
      validUntil,
    })

    /*
     * ==============================================================
     * PRESIGNED PRIVATE PUT URL
     * ==============================================================
     *
     * IMPORTANT:
     *
     * `access: 'private'` belongs here because this is the Blob
     * presigning operation.
     *
     * It does NOT belong on `head()` in the RFP submission route.
     *
     * ==============================================================
     */

    const { presignedUrl } = await presignUrl(token, {
      pathname,
      operation: 'put',
      access: 'private',
      validUntil,
      addRandomSuffix: false,
    })

    /*
     * ==============================================================
     * RESPONSE
     * ==============================================================
     */

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
    )
  } catch (error) {
    console.error('[TRYVION RFP DOCUMENT UPLOAD]', error)

    return NextResponse.json(
      {
        success: false,

        message: 'Unable to prepare the document upload at this time. Please try again shortly.',
      },
      {
        status: 500,

        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  }
}
