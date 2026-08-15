import { describe, it, expect } from 'vitest'
import { contactSchema, getStartedSchema, newsletterSchema } from '../schemas'

// ---------------------------------------------------------------------------
// contactSchema
// ---------------------------------------------------------------------------

describe('contactSchema', () => {
  const valid = {
    name:    'Jane Smith',
    company: 'Acme Corporation',
    email:   'jane.smith@acme.com',
    service: 'sap' as const,
    message: 'We need help with a large SAP S/4HANA migration project.',
    privacy: true as const,
  }

  it('accepts a fully valid payload', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts an optional phone field', () => {
    expect(contactSchema.safeParse({ ...valid, phone: '+1 555 000 0000' }).success).toBe(true)
  })

  it('accepts when phone is omitted', () => {
    const withoutPhone = { ...valid }
    delete withoutPhone.phone
    expect(contactSchema.safeParse(withoutPhone).success).toBe(true)
  })

  it('rejects a name shorter than 2 characters', () => {
    const r = contactSchema.safeParse({ ...valid, name: 'J' })
    expect(r.success).toBe(false)
    if (!r.success) expect(r.error.issues[0].path).toContain('name')
  })

  it('rejects a company shorter than 2 characters', () => {
    const r = contactSchema.safeParse({ ...valid, company: 'X' })
    expect(r.success).toBe(false)
  })

  it('rejects a malformed email address', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(r.success).toBe(false)
    if (!r.success) expect(r.error.issues[0].path).toContain('email')
  })

  it('rejects email without domain', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'test@' }).success).toBe(false)
  })

  it('rejects an invalid service enum value', () => {
    const r = contactSchema.safeParse({ ...valid, service: 'unknown-service' })
    expect(r.success).toBe(false)
  })

  it('accepts all valid service enum values', () => {
    const services = ['sap', 'ai-data', 'cloud', 'digital-engineering', 'talent', 'managed-services', 'other'] as const
    for (const service of services) {
      expect(contactSchema.safeParse({ ...valid, service }).success).toBe(true)
    }
  })

  it('rejects a message shorter than 20 characters', () => {
    const r = contactSchema.safeParse({ ...valid, message: 'Too short.' })
    expect(r.success).toBe(false)
    if (!r.success) expect(r.error.issues[0].path).toContain('message')
  })

  it('accepts a message with exactly 20 characters', () => {
    expect(contactSchema.safeParse({ ...valid, message: '12345678901234567890' }).success).toBe(true)
  })

  it('rejects privacy: false (user has not accepted)', () => {
    const r = contactSchema.safeParse({ ...valid, privacy: false })
    expect(r.success).toBe(false)
    if (!r.success) expect(r.error.issues[0].message).toMatch(/privacy policy/i)
  })

  it('rejects a missing required field', () => {
    const withoutEmail = { ...valid }
    delete withoutEmail.email
    expect(contactSchema.safeParse(withoutEmail).success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// getStartedSchema
// ---------------------------------------------------------------------------

describe('getStartedSchema', () => {
  const valid = {
    firstName: 'John',
    lastName:  'Doe',
    company:   'Startup Inc.',
    email:     'john@startup.io',
    role:      'CTO',
    services:  ['sap', 'cloud'],
    privacy:   true as const,
  }

  it('accepts a fully valid payload', () => {
    expect(getStartedSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts optional timeline and message being absent', () => {
    const r = getStartedSchema.safeParse(valid)
    expect(r.success).toBe(true)
  })

  it('accepts all timeline values', () => {
    const timelines = ['immediately', '1-3months', '3-6months', '6plus', 'exploring'] as const
    for (const timeline of timelines) {
      expect(getStartedSchema.safeParse({ ...valid, timeline }).success).toBe(true)
    }
  })

  it('rejects an invalid timeline value', () => {
    expect(getStartedSchema.safeParse({ ...valid, timeline: 'never' }).success).toBe(false)
  })

  it('rejects an empty services array', () => {
    const r = getStartedSchema.safeParse({ ...valid, services: [] })
    expect(r.success).toBe(false)
    if (!r.success) expect(r.error.issues[0].path).toContain('services')
  })

  it('rejects empty firstName', () => {
    expect(getStartedSchema.safeParse({ ...valid, firstName: '' }).success).toBe(false)
  })

  it('rejects privacy: false', () => {
    expect(getStartedSchema.safeParse({ ...valid, privacy: false }).success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// newsletterSchema
// ---------------------------------------------------------------------------

describe('newsletterSchema', () => {
  it('accepts a valid email', () => {
    expect(newsletterSchema.safeParse({ email: 'reader@domain.com' }).success).toBe(true)
  })

  it('accepts a subdomain email', () => {
    expect(newsletterSchema.safeParse({ email: 'user@mail.company.co.uk' }).success).toBe(true)
  })

  it('rejects a plain string with no @ symbol', () => {
    expect(newsletterSchema.safeParse({ email: 'notanemail' }).success).toBe(false)
  })

  it('rejects an empty string', () => {
    expect(newsletterSchema.safeParse({ email: '' }).success).toBe(false)
  })

  it('rejects a missing email field', () => {
    expect(newsletterSchema.safeParse({}).success).toBe(false)
  })
})
