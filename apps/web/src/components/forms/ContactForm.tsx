'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/schemas'
import { submitContactForm } from '@/app/actions/contact'
import {
  FormField,
  Input, Textarea, Select, Checkbox,
} from '@tryvion/ui'
import { Button } from '@tryvion/ui'

const SERVICE_OPTIONS = [
  { value: 'sap',                 label: 'SAP Services' },
  { value: 'ai-data',             label: 'AI & Data Analytics' },
  { value: 'cloud',               label: 'Cloud Transformation' },
  { value: 'digital-engineering', label: 'Digital Engineering' },
  { value: 'talent',              label: 'Talent & Workforce' },
  { value: 'managed-services',    label: 'Managed Services' },
  { value: 'other',               label: 'Other / Not Sure' },
]

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('submitting')
    setServerError(null)

    const result = await submitContactForm(data)

    if (result.success) {
      setSubmitState('success')
      reset()
    } else {
      setSubmitState('error')
      setServerError(result.error)
    }
  }

  if (submitState === 'success') {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="rounded-xl border border-success-300 bg-success-50 p-8 text-center"
      >
        <p className="text-body-lg font-semibold text-success-700">
          Thank you — your message has been received.
        </p>
        <p className="mt-2 text-body-md text-content-secondary">
          A member of our team will be in touch within one business day.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4"
          onClick={() => setSubmitState('idle')}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact TRYVION"
      className="space-y-6"
    >
      {serverError && (
        <div role="alert" aria-live="assertive" className="rounded-lg bg-error-50 border border-error-200 p-4 text-error-700 text-body-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          id="contact-name"
          label="Full name"
          required
          error={errors.name?.message}
        >
          <Input
            {...register('name')}
            placeholder="Jane Smith"
            autoComplete="name"
          />
        </FormField>

        <FormField
          id="contact-company"
          label="Company"
          required
          error={errors.company?.message}
        >
          <Input
            {...register('company')}
            placeholder="Acme Corporation"
            autoComplete="organization"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          id="contact-email"
          label="Work email"
          required
          error={errors.email?.message}
        >
          <Input
            {...register('email')}
            type="email"
            placeholder="jane@acme.com"
            autoComplete="email"
          />
        </FormField>

        <FormField
          id="contact-phone"
          label="Phone"
          hint="Optional"
          error={errors.phone?.message}
        >
          <Input
            {...register('phone')}
            type="tel"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
        </FormField>
      </div>

      <FormField
        id="contact-service"
        label="Service area"
        required
        error={errors.service?.message}
      >
        <Select {...register('service')} placeholder="Select a service">
          {SERVICE_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      </FormField>

      <FormField
        id="contact-message"
        label="How can we help?"
        required
        error={errors.message?.message}
      >
        <Textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your project, challenge, or question…"
        />
      </FormField>

      <FormField
        id="contact-privacy"
        label=""
        error={errors.privacy?.message}
      >
        <Checkbox
          {...register('privacy')}
          label={
            <>
              I agree to the{' '}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>{' '}
              and consent to TRYVION processing my data to respond to this inquiry.
            </>
          }
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={submitState === 'submitting'}
        disabled={submitState === 'submitting'}
      >
        Send message
      </Button>
    </form>
  )
}
