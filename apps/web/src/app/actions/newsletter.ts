'use server'

import { newsletterSchema } from '@/lib/schemas'

export type NewsletterActionResult =
  | { success: true }
  | { success: false; error: string }

export async function subscribeNewsletter(
  formData: unknown,
): Promise<NewsletterActionResult> {
  const parsed = newsletterSchema.safeParse(formData)

  if (!parsed.success) {
    return { success: false, error: 'Please enter a valid email address' }
  }

  // TODO Phase 11+: Add to mailing list (Mailchimp, HubSpot, etc.)
  if (process.env.NODE_ENV === 'development') {
    console.log('[TRYVION] Newsletter subscription:', parsed.data.email)
  }

  return { success: true }
}
