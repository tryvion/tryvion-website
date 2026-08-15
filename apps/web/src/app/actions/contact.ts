'use server'

import { contactSchema } from '@/lib/schemas'

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string }

export async function submitContactForm(
  formData: unknown,
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid form data',
    }
  }

  const { name, company, email, phone, service, message } = parsed.data

  // TODO Phase 11+: Send via Resend / SendGrid
  // TODO Phase 11+: Create CRM record
  // For now, log to server console (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('[TRYVION] Contact form submission:', {
      name, company, email, phone, service, message,
      timestamp: new Date().toISOString(),
    })
  }

  return { success: true }
}
