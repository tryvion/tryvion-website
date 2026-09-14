'use client';

import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Handshake,
  HelpCircle,
  Loader2,
  MessageSquare,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   TRYVION — SALES ENQUIRIES

   Route:
   /contact/sales-enquiries

   IMPORTANT:
   This page intentionally does NOT render Header, Footer or the
   SiteThemeProvider. Those are supplied by the existing TRYVION
   root application shell, exactly like RequestAProposalPage.

   The page uses the existing global TRYVION CSS variables so the
   root light/dark theme automatically applies here.

   API:
   POST /api/sales-enquiries
───────────────────────────────────────────────────────────────── */

const HERO_IMAGE = '/images/sales-enquiries-hero.png';

const ENQUIRY_TYPES = [
  'Services & Solutions',
  'Commercial Enquiries',
  'Existing Opportunities',
  'Partnerships',
  'General Enquiries',
];

const HELP_ITEMS = [
  {
    title: 'Services & Solutions',
    body: 'Understand how TRYVION can support your transformation agenda.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Commercial Enquiries',
    body: 'Discuss commercial requirements, engagement models and next steps.',
    icon: FileText,
  },
  {
    title: 'Existing Opportunities',
    body: 'Connect with the team regarding an active opportunity or RFP.',
    icon: MessageSquare,
  },
  {
    title: 'Partnerships',
    body: 'Explore strategic partnerships and business development opportunities.',
    icon: Handshake,
  },
  {
    title: 'General Enquiries',
    body: 'Ask questions or request information about TRYVION.',
    icon: HelpCircle,
  },
] as const;

const HERO_POINTS = [
  {
    title: 'Right team',
    body: 'We’ll connect you with the right specialist.',
    icon: UsersRound,
  },
  {
    title: 'Clear information',
    body: 'Get relevant insights about our solutions and services.',
    icon: FileText,
  },
  {
    title: 'Commercial clarity',
    body: 'Transparent engagement models tailored to your business needs.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Timely response',
    body: 'Our team will get back to you promptly.',
    icon: Clock3,
  },
] as const;

const TRUST_ITEMS = [
  {
    title: 'Trusted Partner',
    body: 'Proven expertise across industries and technologies.',
    icon: ShieldCheck,
  },
  {
    title: 'Customer Focused',
    body: 'Solutions designed around your business outcomes.',
    icon: UsersRound,
  },
  {
    title: 'Global Reach',
    body: 'Local presence with global delivery capabilities.',
    icon: MessageSquare,
  },
  {
    title: 'Measurable Impact',
    body: 'Driving real business value and long-term success.',
    icon: BriefcaseBusiness,
  },
] as const;

type FormState = {
  fullName: string;
  jobTitle: string;
  company: string;
  countryRegion: string;
  workEmail: string;
  enquiryType: string;
  phone: string;
  message: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  website: string;
};

const INITIAL_FORM: FormState = {
  fullName: '',
  jobTitle: '',
  company: '',
  countryRegion: '',
  workEmail: '',
  enquiryType: '',
  phone: '',
  message: '',
  privacyConsent: false,
  marketingConsent: false,
  website: '',
};

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="se-label">
      {children}
      {required ? (
        <span aria-hidden="true" className="se-required">
          *
        </span>
      ) : null}
    </label>
  );
}

function IconCircle({ children }: { children: ReactNode }) {
  return <span className="se-icon-circle">{children}</span>;
}

function TextInput({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = 'text',
  name,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  name: string;
}) {
  return (
    <div className="se-field">
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={
          name === 'fullName' ? 'name' : name === 'company' ? 'organization' : undefined
        }
        className="se-input"
      />
    </div>
  );
}

function SelectInput({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  name,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  name: string;
}) {
  return (
    <div className="se-field">
      <FieldLabel required={required}>{label}</FieldLabel>

      <div className="se-select-wrap">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          className="se-input se-select"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown size={17} aria-hidden="true" className="se-select-icon" />
      </div>
    </div>
  );
}

function TextArea({
  label,
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="se-field se-message-field">
      <FieldLabel required={required}>{label}</FieldLabel>

      <div className="se-textarea-wrap">
        <textarea
          id="message"
          name="message"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={5000}
          rows={5}
          wrap="soft"
          className="se-textarea"
          style={{
            display: 'block',
            width: '100%',
            height: '112px',
            minHeight: '112px',
            maxHeight: '320px',
            overflowY: 'auto',
            resize: 'vertical',
            boxSizing: 'border-box',
            fieldSizing: 'fixed',
            overflowWrap: 'break-word',
          }}
        />
        <span className="se-character-count">{value.length}/5000</span>
      </div>
    </div>
  );
}

export default function SalesEnquiriesPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.fullName.trim() &&
        form.company.trim() &&
        form.countryRegion.trim() &&
        form.workEmail.trim() &&
        form.enquiryType &&
        form.message.trim() &&
        form.privacyConsent,
      ),
    [form],
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    if (status === 'error') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const validate = () => {
    const fullName = form.fullName.trim();
    const company = form.company.trim();
    const email = form.workEmail.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (fullName.length < 2 || fullName.length > 100) {
      return 'Please enter your full name.';
    }

    if (company.length < 2 || company.length > 150) {
      return 'Please enter your company name.';
    }

    if (form.countryRegion.trim().length < 2 || form.countryRegion.trim().length > 100) {
      return 'Please enter your country or region.';
    }

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid business email address.';
    }

    if (!ENQUIRY_TYPES.includes(form.enquiryType)) {
      return 'Please select an enquiry type.';
    }

    if (phone && (phone.length < 7 || phone.length > 40 || !/^[+0-9().\-\s]+$/.test(phone))) {
      return 'Please enter a valid phone number.';
    }

    if (message.length < 10) {
      return 'Please tell us a little more about your enquiry.';
    }

    if (message.length > 5000) {
      return 'Your enquiry must be 5000 characters or fewer.';
    }

    if (!form.privacyConsent) {
      return 'Please agree to the Privacy Policy before submitting.';
    }

    return null;
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (status === 'submitting') {
      return;
    }

    // Honeypot. The CMS/API performs its own server-side protection too.
    if (form.website.trim()) {
      setStatus('success');
      setStatusMessage('Thank you. Your enquiry has been received.');
      return;
    }

    const validationError = validate();

    if (validationError) {
      setStatus('error');
      setStatusMessage(validationError);
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch('/api/sales-enquiries/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          jobTitle: form.jobTitle.trim(),
          company: form.company.trim(),
          countryRegion: form.countryRegion.trim(),
          workEmail: form.workEmail.trim().toLowerCase(),
          enquiryType: form.enquiryType,
          phone: form.phone.trim(),
          message: form.message.trim(),
          privacyConsent: form.privacyConsent,
          marketingConsent: form.marketingConsent,
          website: '',
        }),
        cache: 'no-store',
        signal: controller.signal,
      });

      const contentType = response.headers.get('content-type') || '';

      const result: {
        success?: boolean;
        message?: string;
        error?: string;
      } = contentType.includes('application/json')
        ? await response.json().catch(() => ({}))
        : {
            success: false,
            message: await response.text().catch(() => ''),
          };

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message ||
            result.error ||
            `Unable to submit your enquiry. Server returned ${response.status}.`,
        );
      }

      setStatus('success');
      setStatusMessage(
        result.message ||
          'Thank you. Your enquiry has been received. Our team will contact you shortly.',
      );
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus('error');

      setStatusMessage(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'The request timed out. Please try again.'
          : error instanceof Error
            ? error.message
            : 'Unable to connect to TRYVION. Please try again shortly.',
      );
    } finally {
      window.clearTimeout(timeout);
      setStatus((current) => (current === 'submitting' ? 'idle' : current));
    }
  };

  return (
    <>
      <style>{responsiveStyles}</style>

      <main className="se-page">
        {/* ─────────────────────────────────────────────────────────
            HERO
        ────────────────────────────────────────────────────────── */}
        <section className="se-hero" aria-labelledby="sales-enquiries-title">
          <div className="se-hero-image" aria-hidden="true" />
          <div className="se-hero-overlay" aria-hidden="true" />

          <div className="se-container se-hero-inner">
            <nav className="se-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/contact">Contact</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Sales Enquiries</span>
            </nav>

            <motion.div
              className="se-hero-copy"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <div className="se-eyebrow">
                <span />
                SALES ENQUIRIES
              </div>

              <h1 id="sales-enquiries-title">
                Let’s talk about
                <br />
                what we can do
                <br />
                for your business.
              </h1>
              <br />

              <p style={{ fontSize: '1rem' }}>
                Connect with our team to discuss TRYVION services, capabilities, commercial
                opportunities or an active business requirement.
              </p>
            </motion.div>
            <br />

            <div className="se-hero-points mb-10" style={{ maxWidth: '1200px' }}>
              {HERO_POINTS.map(({ title, body, icon: Icon }, index) => (
                <motion.div
                  className="se-hero-point"
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.07 }}
                >
                  <IconCircle>
                    <Icon size={26} strokeWidth={1.6} />
                  </IconCircle>

                  <div>
                    <strong
                      style={{
                        fontSize: '1rem',
                        lineHeight: 1.45,
                        color: 'rgba(255,255,255,0.82)',
                      }}
                    >
                      {title}
                    </strong>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        lineHeight: 1.45,
                        color: 'rgba(255,255,255,0.82)',
                      }}
                    >
                      {body}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            HOW WE CAN HELP
        ────────────────────────────────────────────────────────── */}
        <section className="se-help" aria-labelledby="help-title">
          <div className="se-container">
            <motion.div
              className="se-section-heading"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
            >
              <h2 id="help-title">How we can help</h2>
            </motion.div>
            <br />

            <div className="se-help-grid mb-10">
              {HELP_ITEMS.map(({ title, body, icon: Icon }, index) => (
                <motion.article
                  className="se-help-card"
                  key={title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  <IconCircle>
                    <Icon size={26} strokeWidth={1.5} />
                  </IconCircle>

                  <span className="se-gold-rule" />

                  <h3>{title}</h3>
                  <p>{body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            ENQUIRY FORM
        ────────────────────────────────────────────────────────── */}
        <section className="se-form-section" aria-labelledby="enquiry-title">
          <div className="se-container se-form-container">
            <div className="se-section-heading se-form-heading">
              <h2 id="enquiry-title">Send us your enquiry</h2>
              <p style={{ fontSize: '1rem' }}>
                Please share your details below and our team will be in touch.
              </p>
            </div>

            {status === 'success' ? (
              <motion.div
                className="se-success"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="se-success-icon">
                  <Check size={30} strokeWidth={2} />
                </div>

                <h3>Thank you. Your enquiry has been received.</h3>
                <p>Our team will review your enquiry and contact you shortly.</p>

                <button
                  type="button"
                  className="se-secondary-button"
                  onClick={() => {
                    setStatus('idle');
                    setStatusMessage('');
                  }}
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <div className="se-form" role="form">
                <div className="se-form-grid">
                  <div className="se-form-column">
                    <TextInput
                      name="fullName"
                      label="Full Name"
                      required
                      value={form.fullName}
                      onChange={(value) => update('fullName', value)}
                      placeholder="Enter your full name"
                    />

                    <TextInput
                      name="company"
                      label="Company"
                      required
                      value={form.company}
                      onChange={(value) => update('company', value)}
                      placeholder="Enter your company name"
                    />

                    <TextInput
                      name="workEmail"
                      label="Work Email"
                      required
                      type="email"
                      value={form.workEmail}
                      onChange={(value) => update('workEmail', value)}
                      placeholder="name@company.com"
                    />

                    <TextInput
                      name="phone"
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={(value) => update('phone', value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="se-form-column">
                    <TextInput
                      name="jobTitle"
                      label="Job Title"
                      value={form.jobTitle}
                      onChange={(value) => update('jobTitle', value)}
                      placeholder="Enter your job title"
                    />

                    <TextInput
                      name="countryRegion"
                      label="Country / Region"
                      required
                      value={form.countryRegion}
                      onChange={(value) => update('countryRegion', value)}
                      placeholder="Enter your country or region"
                    />

                    <SelectInput
                      name="enquiryType"
                      label="Enquiry Type"
                      required
                      value={form.enquiryType}
                      onChange={(value) => update('enquiryType', value)}
                      options={ENQUIRY_TYPES}
                    />

                    <TextArea
                      label="How can we help?"
                      required
                      value={form.message}
                      onChange={(value) => update('message', value)}
                      placeholder="Tell us about your requirements or questions"
                    />
                  </div>
                </div>

                {/* Honeypot — hidden from normal users and bots should not fill it. */}
                <div className="se-honeypot" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => update('website', event.target.value)}
                  />
                </div>

                <div className="se-consents">
                  <label className="se-checkbox-row">
                    <input
                      type="checkbox"
                      checked={form.privacyConsent}
                      onChange={(event) => update('privacyConsent', event.target.checked)}
                    />

                    <span>
                      I agree to the processing of my personal data in accordance with the{' '}
                      <Link href="/privacy">Privacy Policy</Link>.
                      <span className="se-required" aria-hidden="true">
                        *
                      </span>
                    </span>
                  </label>

                  <label className="se-checkbox-row">
                    <input
                      type="checkbox"
                      checked={form.marketingConsent}
                      onChange={(event) => update('marketingConsent', event.target.checked)}
                    />

                    <span>
                      I would like to receive insights, updates, and promotional communications from
                      TRYVION.
                    </span>
                  </label>
                </div>

                {status === 'error' && statusMessage ? (
                  <div className="se-alert" role="alert">
                    {statusMessage}
                  </div>
                ) : null}

                <div className="se-submit-row">
                  <button
                    type="button"
                    className="se-primary-button"
                    disabled={status === 'submitting' || !canSubmit}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      void handleSubmit();
                    }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="se-spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            TRUST STRIP
        ────────────────────────────────────────────────────────── */}
        <section className="se-trust" aria-label="TRYVION advantages">
          <div className="se-container se-trust-grid">
            {TRUST_ITEMS.map(({ title, body, icon: Icon }) => (
              <div className="se-trust-item" key={title}>
                <Icon size={32} strokeWidth={1.45} className="se-trust-icon" />

                <div>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            FINAL CTA
        ────────────────────────────────────────────────────────── */}
        <section className="se-final-cta" aria-labelledby="final-cta-title">
          <div className="se-final-pattern" aria-hidden="true" />

          <div className="se-container se-final-inner">
            <div className="se-final-icon">
              <MessageSquare size={32} strokeWidth={1.5} />
            </div>

            <div className="se-final-copy">
              <h2 id="final-cta-title">Not sure which solution is right for you?</h2>
              <p>Talk to an expert first. We’ll help you explore the right path forward.</p>
            </div>

            <Link href="/contact/talk-to-an-expert" className="se-outline-button">
              Talk to an Expert
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

const responsiveStyles = `
  .se-page {
    width: 100%;
    overflow: hidden;
    background: var(--surface-default);
    color: var(--content-primary);
    font-family: var(--family-text);
  }

  .se-container {
    width: min(100%, var(--layout-content-wide, 1200px));
    margin: 0 auto;
    padding-left: clamp(1.25rem, 4vw, 2.75rem);
    padding-right: clamp(1.25rem, 4vw, 2.75rem);
    box-sizing: border-box;
  }

  .se-hero {
    position: relative;
    min-height: 455px;
    overflow: hidden;
    background: #031a33;
    color: #fff;
  }

  .se-hero-image,
  .se-hero-overlay {
    position: absolute;
    inset: 0;
  }

  .se-hero-image {
    background-image: url('/images/sales-enquiries-hero.png');
    background-size: cover;
    background-position: center right;
    transform: scale(1.005);
  }

  .se-hero-overlay {
    background:
      linear-gradient(
        90deg,
        rgba(3, 25, 49, 0.99) 0%,
        rgba(3, 25, 49, 0.96) 30%,
        rgba(3, 25, 49, 0.80) 49%,
        rgba(3, 25, 49, 0.42) 70%,
        rgba(3, 25, 49, 0.10) 100%
      );
  }

  .se-hero-inner {
    position: relative;
    z-index: 1;
    min-height: 455px;
    padding-top: clamp(7.25rem, 11vw, 8.5rem);
    padding-bottom: 2rem;
    box-sizing: border-box;
  }

  .se-breadcrumbs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 1.35rem;
    color: rgba(255,255,255,0.72);
    font-size: 0.72rem;
    line-height: 1.4;
  }

  .se-breadcrumbs a {
    color: #fff;
    text-decoration: none;
  }

  .se-breadcrumbs a:hover {
    text-decoration: underline;
  }

  .se-hero-copy {
    max-width: 570px;
  }

  .se-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1.15rem;
    color: #f0b52d;
    font-size: 0.7rem;
    line-height: 1;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .se-eyebrow > span {
    width: 21px;
    height: 2px;
    display: inline-block;
    background: #f0b52d;
  }

  .se-hero h1 {
    margin: 0;
    color: #fff;
    font-family: var(--family-display);
    font-size: clamp(2.35rem, 4.2vw, 3.65rem);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.045em;
  }

  .se-hero-copy p {
    max-width: 560px;
    margin: 1rem 0 0;
    color: rgba(255,255,255,0.82);
    font-size: 0.88rem;
    line-height: 1.65;
  }

  .se-hero-points {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    max-width: 760px;
    margin-top: 1.55rem;
  }

  .se-hero-point {
    display: flex;
    gap: 0.65rem;
    min-width: 0;
    padding: 0 0.95rem;
    border-left: 1px solid rgba(255,255,255,0.20);
  }

  .se-hero-point:first-child {
    padding-left: 0;
    border-left: 0;
  }

  .se-icon-circle {
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--surface-sunken);
    color: var(--content-accent);
    box-sizing: border-box;
  }

  .se-hero-point .se-icon-circle {
    width: 39px;
    height: 39px;
    flex-basis: 39px;
    border: 1px solid rgba(201,162,75,0.72);
    background: rgba(3,25,49,0.25);
    color: #c9a24b;
  }

  .se-hero-point strong {
    display: block;
    margin-bottom: 0.18rem;
    color: #fff;
    font-size: 0.74rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .se-hero-point span:not(.se-icon-circle) {
    display: block;
    color: rgba(255,255,255,0.66);
    font-size: 0.66rem;
    line-height: 1.5;
  }

  .se-help {
    padding: clamp(2.75rem, 5vw, 4rem) 0 3rem;
    background: var(--surface-default);
  }

  .se-section-heading {
    text-align: center;
  }

  .se-section-heading h2 {
    margin: 0;
    color: var(--content-primary);
    font-family: var(--family-display);
    font-size: clamp(1.45rem, 2.6vw, 2rem);
    line-height: 1.2;
    letter-spacing: -0.025em;
  }

  .se-help-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.85rem;
    margin-top: 1.25rem;
  }

  .se-help-card {
    min-height: 174px;
    padding: 1.05rem;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xs);
    background: var(--surface-default);
    box-shadow: var(--elevation-01);
    box-sizing: border-box;
    transition:
      box-shadow var(--motion-duration-fast) var(--motion-easing-standard),
      border-color var(--motion-duration-fast) var(--motion-easing-standard);
  }

  .se-help-card:hover {
    border-color: var(--border-default);
    box-shadow: var(--elevation-02);
  }

  .se-help-card .se-icon-circle {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
  }

  .se-gold-rule {
    display: block;
    width: 20px;
    height: 2px;
    margin: 0.62rem 0 0.55rem;
    background: var(--brand-accent);
  }

  .se-help-card h3 {
    margin: 0;
    color: var(--content-primary);
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .se-help-card p {
    margin: 0.55rem 0 0;
    color: var(--content-secondary);
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .se-form-section {
    padding: clamp(2.8rem, 5vw, 4.1rem) 0;
    background: var(--surface-sunken);
  }

  .se-form-container {
    max-width: 1040px;
  }

  .se-form-heading {
    margin-bottom: 1.8rem;
  }

  .se-form-heading p {
    margin: 0.45rem 0 0;
    color: var(--content-secondary);
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .se-form-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 1.05rem 2rem;
  }

  .se-form-column {
    display: grid;
    gap: 0.95rem;
    min-width: 0;
  }

  .se-field {
    min-width: 0;
  }

  .se-label {
    display: block;
    margin-bottom: 0.42rem;
    color: var(--content-primary);
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .se-required {
    color: var(--content-accent);
    margin-left: 2px;
  }

  .se-input,
  .se-textarea {
    width: 100%;
    border: 1px solid var(--border-default);
    border-radius: var(--radius-xs);
    background: var(--surface-default);
    color: var(--content-primary);
    font-family: var(--family-text);
    font-size: 0.85rem;
    outline: none;
    box-sizing: border-box;
    transition:
      border-color var(--motion-duration-fast) var(--motion-easing-standard),
      box-shadow var(--motion-duration-fast) var(--motion-easing-standard);
  }

  .se-input {
    height: 45px;
    padding: 0 0.72rem;
  }

  .se-input::placeholder,
  .se-textarea::placeholder {
    color: var(--content-tertiary);
    opacity: 0.86;
  }

  .se-input:focus,
  .se-textarea:focus {
    border-color: var(--content-accent);
    box-shadow: 0 0 0 3px rgba(201,162,75,0.10);
  }

  .se-select-wrap {
    position: relative;
  }

  .se-select {
    appearance: none;
    padding-right: 2.3rem;
  }

  .se-select-icon {
    position: absolute;
    top: 50%;
    right: 0.72rem;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--content-tertiary);
  }

  .se-message-field {
    position: relative;
  }

  .se-textarea-wrap {
    position: relative;
  }

  .se-textarea {
    display: block !important;
    width: 100% !important;
    height: 112px !important;
    min-height: 112px !important;
    max-height: 320px !important;
    field-sizing: fixed !important;
    padding: 0.7rem 0.72rem 1.35rem;
    resize: vertical !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    box-sizing: border-box !important;
    line-height: 1.5;
  }

  .se-character-count {
    position: absolute;
    right: 0.6rem;
    bottom: 0.42rem;
    color: var(--content-tertiary);
    font-size: 0.58rem;
    line-height: 1;
  }

  .se-consents {
    margin-top: 1.05rem;
  }

  .se-checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    margin-top: 0.6rem;
    color: var(--content-secondary);
    font-size: 0.85rem;
    line-height: 1.55;
    cursor: pointer;
  }

  .se-checkbox-row:first-child {
    margin-top: 0;
  }

  .se-checkbox-row input {
    width: 20px;
    height: 20px;
    flex: 0 0 14px;
    margin: 1px 0 0;
    accent-color: var(--brand-accent);
  }

  .se-checkbox-row a {
    color: var(--content-accent);
    font-weight: 700;
  }

  .se-submit-row {
    margin-top: 1rem;
  }

  .se-primary-button,
  .se-secondary-button,
  .se-outline-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-height: 40px;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: var(--radius-xs);
    font-family: var(--family-text);
    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    cursor: pointer;
    box-sizing: border-box;
    transition:
      transform var(--motion-duration-fast) var(--motion-easing-standard),
      opacity var(--motion-duration-fast) var(--motion-easing-standard),
      background var(--motion-duration-fast) var(--motion-easing-standard);
  }

  .se-primary-button {
    border: 0;
    background: var(--action-primary-default);
    color: var(--action-primary-on-action);
  }

  .se-primary-button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .se-primary-button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .se-secondary-button {
    margin-top: 1.2rem;
    border: 1px solid var(--border-default);
    background: var(--surface-default);
    color: var(--content-primary);
  }

  .se-outline-button {
    min-width: 185px;
    border: 1px solid #c9a24b;
    background: transparent;
    color: #c9a24b;
  }

  .se-outline-button:hover {
    transform: translateY(-1px);
  }

  .se-alert {
    margin-top: 0.85rem;
    padding: 0.72rem 0.85rem;
    border: 1px solid var(--border-default);
    border-radius: var(--radius-xs);
    background: var(--surface-default);
    color: var(--content-primary);
    font-size: 0.7rem;
    line-height: 1.5;
  }

  .se-success {
    max-width: 680px;
    margin: 0 auto;
    padding: 2.3rem 1.5rem;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    background: var(--surface-default);
    text-align: center;
    box-shadow: var(--elevation-01);
  }

  .se-success-icon {
    width: 58px;
    height: 58px;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--surface-sunken);
    color: var(--content-accent);
  }

  .se-success h3 {
    margin: 0;
    color: var(--content-primary);
    font-family: var(--family-display);
    font-size: 1.2rem;
  }

  .se-success p {
    margin: 0.55rem 0 0;
    color: var(--content-secondary);
    font-size: 0.78rem;
    line-height: 1.6;
  }

  .se-spinner {
    animation: se-spin 0.9s linear infinite;
  }

  @keyframes se-spin {
    to { transform: rotate(360deg); }
  }

  .se-honeypot {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0,0,0,0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  .se-trust {
    padding: 2rem 0;
    background: var(--surface-default);
    border-top: 1px solid var(--border-subtle);
  }

  .se-trust-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
  }

  .se-trust-item {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    min-width: 0;
    padding: 0 1.1rem;
    margin-bottom: 0.85rem;
    margin-top: 0.85rem;
    border-right: 1px solid var(--border-subtle);
  }

  .se-trust-item:first-child {
    padding-left: 0;
  }

  .se-trust-item:last-child {
    padding-right: 0;
    border-right: 0;
  }

  .se-trust-icon {
    flex: 0 0 auto;
    color: var(--content-primary);
  }

  .se-trust-item strong {
    display: block;
    color: var(--content-primary);
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .se-trust-item span {
    display: block;
    margin-top: 0.2rem;
    color: var(--content-tertiary);
    font-size: 0.85rem;
    line-height: 1.45;
  }

  .se-final-cta {
    position: relative;
    overflow: hidden;
    background: #031a33;
    color: #fff;
    margin-top: 0.85rem;
  }

  .se-final-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.38;
    background-image:
      radial-gradient(circle at 20% 80%, transparent 0 44px, rgba(201,162,75,0.10) 45px 46px, transparent 47px),
      repeating-radial-gradient(
        ellipse at 88% 130%,
        transparent 0 38px,
        rgba(255,255,255,0.055) 39px 40px,
        transparent 41px 72px
      );
  }

  .se-final-inner {
    position: relative;
    z-index: 1;
    min-height: 124px;
    display: grid;
    grid-template-columns: 68px minmax(0, 1fr) auto;
    align-items: center;
    gap: 1rem;
    box-sizing: border-box;
  }

  .se-final-icon {
    width: 62px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(201,162,75,0.9);
    border-radius: 50%;
    color: #fff;
  }

  .se-final-copy h2 {
    margin: 0;
    color: #fff;
    font-family: var(--family-display);
    font-size: 1.45rem;
    line-height: 1.25;
  }

  .se-final-copy p {
    margin: 0.32rem 0 0;
    color: rgba(255,255,255,0.74);
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: 1000px) {
    .se-hero-points {
      max-width: 700px;
    }

    .se-help-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .se-help-card:last-child {
      grid-column: 2;
    }
  }

  @media (max-width: 820px) {
    .se-hero {
      min-height: 600px;
    }

    .se-hero-inner {
      min-height: 600px;
      padding-top: 7.5rem;
    }

    .se-hero-image {
      background-position: 68% center;
    }

    .se-hero-overlay {
      background:
        linear-gradient(
          90deg,
          rgba(3,25,49,0.98) 0%,
          rgba(3,25,49,0.92) 58%,
          rgba(3,25,49,0.60) 100%
        );
    }

    .se-hero-points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.8rem 0;
      max-width: 650px;
    }

    .se-hero-point,
    .se-hero-point:first-child {
      padding: 0 0.8rem;
      border-left: 1px solid rgba(255,255,255,0.20);
    }

    .se-hero-point:nth-child(odd) {
      padding-left: 0;
      border-left: 0;
    }

    .se-form-grid {
      gap: 1rem;
    }

    .se-trust-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.4rem 0;
    }

    .se-trust-item,
    .se-trust-item:first-child,
    .se-trust-item:last-child {
      padding: 0 1rem;
      border-right: 0;
    }

    .se-trust-item:nth-child(odd) {
      padding-left: 0;
      border-right: 1px solid var(--border-subtle);
    }

    .se-trust-item:nth-child(even) {
      padding-right: 0;
    }
  }

  @media (max-width: 640px) {
    .se-hero {
      min-height: 690px;
    }

    .se-hero-inner {
      min-height: 690px;
      padding-top: 7.25rem;
    }

    .se-hero-image {
      background-position: 70% center;
    }

    .se-hero-overlay {
      background:
        linear-gradient(
          180deg,
          rgba(3,25,49,0.98) 0%,
          rgba(3,25,49,0.96) 44%,
          rgba(3,25,49,0.74) 74%,
          rgba(3,25,49,0.48) 100%
        );
    }

    .se-hero-copy {
      max-width: 100%;
    }

    .se-hero h1 {
      font-size: clamp(2.25rem, 11vw, 3rem);
    }

    .se-hero-copy p {
      font-size: 0.8rem;
    }

    .se-hero-points {
      grid-template-columns: 1fr;
      gap: 0.7rem;
      margin-top: 1.35rem;
    }

    .se-hero-point,
    .se-hero-point:first-child,
    .se-hero-point:nth-child(odd) {
      padding: 0;
      border-left: 0;
    }

    .se-hero-point {
      border-top: 1px solid rgba(255,255,255,0.18);
      padding-top: 0.65rem !important;
    }

    .se-help {
      padding-bottom: 2.2rem;
    }

    .se-help-grid {
      grid-template-columns: 1fr;
    }

    .se-help-card:last-child {
      grid-column: auto;
    }

    .se-form-grid {
      grid-template-columns: 1fr;
    }

    .se-form-column {
      gap: 0.95rem;
    }

    .se-form-column + .se-form-column {
      margin-top: 0.95rem;
    }

    .se-trust-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }

    .se-trust-item,
    .se-trust-item:first-child,
    .se-trust-item:last-child,
    .se-trust-item:nth-child(odd),
    .se-trust-item:nth-child(even) {
      padding: 0;
      border: 0;
    }

    .se-final-inner {
      min-height: 230px;
      grid-template-columns: 1fr;
      padding-top: 2rem;
      padding-bottom: 2rem;
      text-align: center;
      justify-items: center;
    }

    .se-final-copy p {
      max-width: 420px;
    }

    .se-outline-button {
      width: min(100%, 240px);
    }
  }
`;
