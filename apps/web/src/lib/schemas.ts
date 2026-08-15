import { z } from 'zod'

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------

export const contactSchema = z.object({
  name:     z.string().min(2,  'Please enter your full name'),
  company:  z.string().min(2,  'Please enter your company name'),
  email:    z.string().email(  'Please enter a valid email address'),
  phone:    z.string().optional(),
  service:  z.enum(
    ['sap', 'ai-data', 'cloud', 'digital-engineering', 'talent', 'managed-services', 'other'],
    { required_error: 'Please select a service area' },
  ),
  message:  z.string().min(20, 'Please provide at least 20 characters'),
  privacy:  z.literal(true,   { errorMap: () => ({ message: 'You must accept the privacy policy' }) }),
})

export type ContactFormData = z.infer<typeof contactSchema>

// ---------------------------------------------------------------------------
// Get Started form
// ---------------------------------------------------------------------------

export const getStartedSchema = z.object({
  firstName:  z.string().min(1,   'First name is required'),
  lastName:   z.string().min(1,   'Last name is required'),
  company:    z.string().min(2,   'Company name is required'),
  email:      z.string().email(   'Please enter a valid email address'),
  role:       z.string().min(1,   'Please select your role'),
  services:   z.array(z.string()).min(1, 'Please select at least one service'),
  timeline:   z.enum(['immediately', '1-3months', '3-6months', '6plus', 'exploring']).optional(),
  message:    z.string().optional(),
  privacy:    z.literal(true, { errorMap: () => ({ message: 'You must accept the privacy policy' }) }),
})

export type GetStartedFormData = z.infer<typeof getStartedSchema>

// ---------------------------------------------------------------------------
// Newsletter form
// ---------------------------------------------------------------------------

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>
