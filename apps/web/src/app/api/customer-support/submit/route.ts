import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 32_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const MAX_FILES = 5;
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const CONTACT_INTENTS = new Set(['expert', 'consultation', 'support']);

const SERVICE_INTERESTS = new Set([
  'SAP S/4HANA',
  'SAP SuccessFactors',
  'SAP Business Technology Platform (BTP)',
  'SAP Ariba',
  'SAP Customer Experience',
  'Enterprise AI Strategy',
  'Enterprise AI Platforms',
  'Intelligent Automation',
  'Data & Analytics',
  'Cloud Transformation',
  'Enterprise Integration',
  'Digital Engineering',
  'SAP Talent Solutions',
  'Permanent Hiring',
  'Executive Search',
  'TRYVION Academy / Learning',
  'Managed Services / SAP Run in the New',
  'Business Transformation',
  'Multiple / Cross-Capability',
  'Other',
]);

const SUPPORT_AREAS = new Set([
  'SAP S/4HANA',
  'SAP SuccessFactors',
  'SAP Business Technology Platform (BTP)',
  'SAP Ariba',
  'SAP Customer Experience',
  'Enterprise AI & Automation',
  'Data & Analytics',
  'Cloud & Infrastructure',
  'Enterprise Integration',
  'Digital Engineering',
  'Managed Services / SAP Run in the New',
  'Talent & Learning Platforms',
  'Security & Access',
  'Performance & Availability',
  'Incident / Service Disruption',
  'Other Support Enquiry',
]);

const SUPPORT_PRIORITIES = new Set(['Low', 'Medium', 'High', 'Critical / Urgent']);

const PREFERRED_CONTACT_METHODS = new Set(['Email', 'Phone', 'Video Call']);

const ALLOWED_ATTACHMENT_CONTENT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'image/png',
  'image/jpeg',
  'application/zip',
]);

type RateEntry = {
  count: number;
  resetAt: number;
};

const globalStore = globalThis as typeof globalThis & {
  __tryvionCustomerSupportRateLimit?: Map<string, RateEntry>;
};

const rateLimit = globalStore.__tryvionCustomerSupportRateLimit ?? new Map<string, RateEntry>();

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

function isValidDate(value: string): boolean {
  if (!value) return false;

  const date = new Date(`${value}T00:00:00`);

  return !Number.isNaN(date.getTime());
}

function isValidTime(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status },
  );
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);

    if (contentLength > MAX_BODY_BYTES) {
      return jsonError('Request is too large.', 413);
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

    /*
     * ------------------------------------------------------------------
     * Honeypot
     * ------------------------------------------------------------------
     */

    const website = text(body.website);

    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Your request has been received.',
      });
    }

    /*
     * ------------------------------------------------------------------
     * Common fields
     * ------------------------------------------------------------------
     */

    const intent = text(body.intent);

    const fullName = text(body.fullName);
    const company = text(body.company);
    const workEmail = text(body.workEmail).toLowerCase();
    const phone = text(body.phone);

    const privacyConsent = body.privacyConsent === true;

    const marketingConsent = body.marketingConsent === true;

    /*
     * ------------------------------------------------------------------
     * Intent-specific fields
     * ------------------------------------------------------------------
     */

    const serviceInterest = text(body.serviceInterest);

    const businessChallenge = text(body.businessChallenge);

    const preferredConsultationDate = text(body.preferredConsultationDate);

    const preferredConsultationTime = text(body.preferredConsultationTime);

    const preferredContactMethod = text(body.preferredContactMethod);

    const supportArea = text(body.supportArea);

    const supportPriority = text(body.supportPriority);

    const customerProjectReference = text(body.customerProjectReference);

    const issue = text(body.issue);

    /*
     * ------------------------------------------------------------------
     * Common validation
     * ------------------------------------------------------------------
     */

    if (fullName.length < 2 || fullName.length > 100) {
      return jsonError('Please enter your full name.');
    }

    if (company.length < 2 || company.length > 150) {
      return jsonError('Please enter your company name.');
    }

    if (!isValidEmail(workEmail)) {
      return jsonError('Please enter a valid work email address.');
    }

    if (!isValidPhone(phone)) {
      return jsonError('Please enter a valid phone number.');
    }

    if (!privacyConsent) {
      return jsonError('Please agree to the Privacy Policy before submitting.');
    }

    /*
     * ------------------------------------------------------------------
     * Intent validation
     * ------------------------------------------------------------------
     */

    if (!CONTACT_INTENTS.has(intent)) {
      return jsonError('Please select a valid engagement type.');
    }

    /*
     * ------------------------------------------------------------------
     * Talk to an Expert
     * ------------------------------------------------------------------
     */

    if (intent === 'expert') {
      if (!SERVICE_INTERESTS.has(serviceInterest)) {
        return jsonError('Please select a valid area of interest.');
      }

      if (businessChallenge.length < 10 || businessChallenge.length > 5000) {
        return jsonError(
          'Please tell us what you are looking to achieve in between 10 and 5000 characters.',
        );
      }

      if (!PREFERRED_CONTACT_METHODS.has(preferredContactMethod)) {
        return jsonError('Please select a preferred contact method.');
      }
    }

    /*
     * ------------------------------------------------------------------
     * Book a Consultation
     * ------------------------------------------------------------------
     */

    if (intent === 'consultation') {
      if (!SERVICE_INTERESTS.has(serviceInterest)) {
        return jsonError('Please select a valid area of interest.');
      }

      if (businessChallenge.length < 10 || businessChallenge.length > 5000) {
        return jsonError(
          'Please describe your business challenge in between 10 and 5000 characters.',
        );
      }

      if (!isValidDate(preferredConsultationDate)) {
        return jsonError('Please select a valid consultation date.');
      }

      if (!isValidTime(preferredConsultationTime)) {
        return jsonError('Please select a valid consultation time.');
      }

      if (!PREFERRED_CONTACT_METHODS.has(preferredContactMethod)) {
        return jsonError('Please select a preferred contact method.');
      }
    }

    /*
     * ------------------------------------------------------------------
     * Customer Support
     * ------------------------------------------------------------------
     */

    if (intent === 'support') {
      if (!SUPPORT_AREAS.has(supportArea)) {
        return jsonError('Please select a valid support area.');
      }

      if (!SUPPORT_PRIORITIES.has(supportPriority)) {
        return jsonError('Please select a valid support priority.');
      }

      if (customerProjectReference.length > 200) {
        return jsonError('Customer / Project Reference must be 200 characters or fewer.');
      }

      if (issue.length < 10 || issue.length > 5000) {
        return jsonError('Please describe the issue in between 10 and 5000 characters.');
      }
    }

    /*
     * ------------------------------------------------------------------
     * Attachments
     * ------------------------------------------------------------------
     */

    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    if (intent !== 'support' && attachments.length > 0) {
      return jsonError('Attachments are only available for Customer Support requests.');
    }

    if (attachments.length > MAX_FILES) {
      return jsonError(`A maximum of ${MAX_FILES} files may be attached.`);
    }

    for (const item of attachments) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return jsonError('One or more attachment records are invalid.');
      }

      const attachment = item as Record<string, unknown>;

      const fileName = text(attachment.fileName);

      const blobPathname = text(attachment.blobPathname);

      const contentType = text(attachment.contentType);

      const fileSize = Number(attachment.fileSize);

      if (!fileName || fileName.length > 255) {
        return jsonError('One or more attachment file names are invalid.');
      }

      if (
        !blobPathname ||
        blobPathname.includes('..') ||
        !blobPathname.startsWith('support-pending/')
      ) {
        return jsonError('One or more attachment storage paths are invalid.');
      }

      if (!contentType || !ALLOWED_ATTACHMENT_CONTENT_TYPES.has(contentType)) {
        return jsonError(`The attachment "${fileName}" has an unsupported file type.`);
      }

      if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > MAX_FILE_SIZE) {
        return jsonError(`The attachment "${fileName}" is invalid.`);
      }
    }

    /*
     * ------------------------------------------------------------------
     * Normalize frontend contact-method values for CMS
     * ------------------------------------------------------------------
     *
     * Frontend:
     *   Email
     *   Phone
     *   Video Call
     *
     * CMS:
     *   email
     *   phone
     *   video_call
     */

    const preferredContactMethodForCms =
      preferredContactMethod === 'Email'
        ? 'email'
        : preferredContactMethod === 'Phone'
          ? 'phone'
          : preferredContactMethod === 'Video Call'
            ? 'video_call'
            : preferredContactMethod;

    /*
     * ------------------------------------------------------------------
     * CMS configuration
     * ------------------------------------------------------------------
     */

    const configuredCmsUrl =
      process.env.CMS_URL?.trim().replace(/\/+$/, '') ||
      process.env.NEXT_PUBLIC_CMS_URL?.trim().replace(/\/+$/, '') ||
      'http://localhost:3001';

    /*
     * ------------------------------------------------------------------
     * Forward complete three-intent payload to CMS
     * ------------------------------------------------------------------
     */

    const response = await fetch(`${configuredCmsUrl}/api/customer-support/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        intent,

        fullName,
        company,
        workEmail,
        phone,

        serviceInterest,
        businessChallenge,

        preferredConsultationDate,
        preferredConsultationTime,
        preferredContactMethod: preferredContactMethodForCms,

        supportArea,
        supportPriority,
        customerProjectReference,
        issue,

        privacyConsent: true,
        marketingConsent,

        website: '',

        attachments: intent === 'support' ? attachments : [],
      }),
      cache: 'no-store',
    });

    /*
     * ------------------------------------------------------------------
     * CMS response passthrough
     * ------------------------------------------------------------------
     */

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
