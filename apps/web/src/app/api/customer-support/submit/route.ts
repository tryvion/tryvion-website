import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 32_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

const SUPPORT_AREAS = new Set([
  'SAP Applications',
  'AI & Automation',
  'Integration & Technology',
  'Operate',
  'Other Enquiry',
]);

const SUPPORT_PRIORITIES = new Set([
  'Low',
  'Medium',
  'High',
  'Critical / Urgent',
]);

type RateEntry = {
  count: number;
  resetAt: number;
};

const globalStore = globalThis as typeof globalThis & {
  __tryvionCustomerSupportRateLimit?: Map<string, RateEntry>;
};

const rateLimit =
  globalStore.__tryvionCustomerSupportRateLimit ??
  new Map<string, RateEntry>();

globalStore.__tryvionCustomerSupportRateLimit = rateLimit;

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return (forwarded?.split(',')[0]?.trim() || realIp || 'unknown').slice(0, 120);
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const current = rateLimit.get(key);

  if (!current || current.resetAt <= now) {
    rateLimit.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count += 1;
  return true;
}

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  if (!value) return true;
  return value.length >= 7 && value.length <= 40 && /^[+0-9().\-\s]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);

    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Request is too large.' },
        { status: 413 },
      );
    }

    if (!checkRateLimit(getClientKey(request))) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many submissions. Please try again later.',
        },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;

    const website = text(body.website);

    // Honeypot: return a successful-looking response without creating a record.
    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Your support request has been received.',
      });
    }

    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    if (attachments.length > 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'A maximum of 5 files may be attached.',
        },
        { status: 400 },
      );
    }

    const fullName = text(body.fullName);
    const company = text(body.company);
    const workEmail = text(body.workEmail).toLowerCase();
    const phone = text(body.phone);
    const supportArea = text(body.supportArea);
    const supportPriority = text(body.supportPriority);
    const customerProjectReference = text(body.customerProjectReference);
    const issue = text(body.issue);
    const privacyConsent = body.privacyConsent === true;
    const marketingConsent = body.marketingConsent === true;

    if (fullName.length < 2 || fullName.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Please enter your full name.' },
        { status: 400 },
      );
    }

    if (company.length < 2 || company.length > 150) {
      return NextResponse.json(
        { success: false, message: 'Please enter your company name.' },
        { status: 400 },
      );
    }

    if (!isValidEmail(workEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid work email address.' },
        { status: 400 },
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid phone number.' },
        { status: 400 },
      );
    }

    if (!SUPPORT_AREAS.has(supportArea)) {
      return NextResponse.json(
        { success: false, message: 'Please select a valid support area.' },
        { status: 400 },
      );
    }

    if (!SUPPORT_PRIORITIES.has(supportPriority)) {
      return NextResponse.json(
        { success: false, message: 'Please select a valid support priority.' },
        { status: 400 },
      );
    }

    if (customerProjectReference.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message: 'Customer / Project Reference must be 200 characters or fewer.',
        },
        { status: 400 },
      );
    }

    if (issue.length < 10 || issue.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please describe the issue in between 10 and 5000 characters.',
        },
        { status: 400 },
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please agree to the Privacy Policy before submitting.',
        },
        { status: 400 },
      );
    }

    for (const item of attachments) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return NextResponse.json(
          { success: false, message: 'One or more attachment records are invalid.' },
          { status: 400 },
        );
      }

      const attachment = item as Record<string, unknown>;
      const fileName = text(attachment.fileName);
      const blobPathname = text(attachment.blobPathname);
      const contentType = text(attachment.contentType);
      const fileSize = Number(attachment.fileSize);

      if (!fileName || fileName.length > 255) {
        return NextResponse.json(
          { success: false, message: 'One or more attachment file names are invalid.' },
          { status: 400 },
        );
      }

      if (!blobPathname || blobPathname.includes('..') || !blobPathname.startsWith('support-pending/')) {
        return NextResponse.json(
          { success: false, message: 'One or more attachment storage paths are invalid.' },
          { status: 400 },
        );
      }

      if (!contentType || !Number.isFinite(fileSize) || fileSize <= 0 || fileSize > 2 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: `The attachment "${fileName}" is invalid.` },
          { status: 400 },
        );
      }
    }

    const configuredCmsUrl =
      process.env.CMS_URL?.trim().replace(/\/+$/, '') ||
      process.env.NEXT_PUBLIC_CMS_URL?.trim().replace(/\/+$/, '') ||
      'http://localhost:3001';

    const response = await fetch(`${configuredCmsUrl}/api/customer-support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        fullName,
        company,
        workEmail,
        phone,
        supportArea,
        supportPriority,
        customerProjectReference,
        issue,
        privacyConsent: true,
        marketingConsent,
        website: '',
        attachments,
      }),
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const result = await response.json();

      return NextResponse.json(result, {
        status: response.status,
      });
    }

    const responseText = await response.text();

    return NextResponse.json(
      {
        success: response.ok,
        message: responseText || undefined,
      },
      {
        status: response.status,
      },
    );
  } catch (error) {
    console.error('[TRYVION Web → CMS Customer Support]', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to connect to TRYVION. Please try again shortly.',
      },
      { status: 502 },
    );
  }
}
