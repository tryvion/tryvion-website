'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getStartedSchema, type GetStartedFormData } from '@/lib/schemas'
import { submitContactForm } from '@/app/actions/contact'
import {
  FormField, FormMessage,
  Input, Textarea, Select, Checkbox, RadioGroup, RadioItem,
} from '@tryvion/ui'
import { Button } from '@tryvion/ui'

const ROLE_OPTIONS = [
  { value: 'c-suite',      label: 'C-Suite / Executive' },
  { value: 'vp-director',  label: 'VP / Director' },
  { value: 'manager',      label: 'Manager / Team Lead' },
  { value: 'individual',   label: 'Individual Contributor' },
  { value: 'procurement',  label: 'Procurement / Vendor Management' },
  { value: 'other',        label: 'Other' },
]

const SERVICE_CHECKBOXES = [
  { value: 'sap',                 label: 'SAP Services' },
  { value: 'ai-data',             label: 'AI & Data Analytics' },
  { value: 'cloud',               label: 'Cloud Transformation' },
  { value: 'digital-engineering', label: 'Digital Engineering' },
  { value: 'talent',              label: 'Talent & Workforce' },
  { value: 'managed-services',    label: 'Managed Services' },
]

const TIMELINE_OPTIONS = [
  { value: 'immediately', label: 'Immediately' },
  { value: '1-3months',   label: '1–3 months' },
  { value: '3-6months',   label: '3–6 months' },
  { value: '6plus',       label: '6+ months' },
  { value: 'exploring',   label: 'Just exploring' },
]

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function GetStartedForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<GetStartedFormData>({
    resolver: zodResolver(getStartedSchema),
    defaultValues: { services: [] },
  })

  const toggleService = (
    current: string[],
    value: string,
    onChange: (val: string[]) => void,
  ) => {
    if (current.includes(value)) {
      onChange(current.filter((v) => v !== value))
    } else {
      onChange([...current, value])
    }
  }

  const onSubmit = async (data: GetStartedFormData) => {
    setSubmitState('submitting')
    setServerError(null)

    // Re-use the contact action — maps fields to contact schema shape
    const result = await submitContactForm({
      name:    `${data.firstName} ${data.lastName}`,
      company: data.company,
      email:   data.email,
      service: data.services[0] as ContactService ?? 'other',
      message: data.message ?? `Services: ${data.services.join(', ')}. Timeline: ${data.timeline ?? 'not specified'}`,
      privacy: data.privacy,
    })

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
        className="rounded-xl border border-success-300 bg-success-50 p-10 text-center"
      >
        <p className="text-display-sm font-bold text-success-700">
          You&apos;re all set.
        </p>
        <p className="mt-3 text-body-lg text-content-secondary max-w-prose mx-auto">
          Our team will review your request and reach out within one business day
          to schedule an initial conversation.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Get started with TRYVION"
      className="space-y-8"
    >
      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg bg-error-50 border border-error-200 p-4 text-error-700 text-body-sm"
        >
          {serverError}
        </div>
      )}

      {/* — Personal info ——————————————————————————————————————— */}
      <fieldset className="space-y-6">
        <legend className="text-ui-lg font-semibold text-content-primary mb-4">
          About you
        </legend>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            id="gs-first-name"
            label="First name"
            required
            error={errors.firstName?.message}
          >
            <Input
              {...register('firstName')}
              placeholder="Jane"
              autoComplete="given-name"
            />
          </FormField>

          <FormField
            id="gs-last-name"
            label="Last name"
            required
            error={errors.lastName?.message}
          >
            <Input
              {...register('lastName')}
              placeholder="Smith"
              autoComplete="family-name"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            id="gs-company"
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

          <FormField
            id="gs-email"
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
        </div>

        <FormField
          id="gs-role"
          label="Your role"
          required
          error={errors.role?.message}
        >
          <Select {...register('role')} placeholder="Select your role">
            {ROLE_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </FormField>
      </fieldset>

      {/* — Services ———————————————————————————————————————————— */}
      <fieldset className="space-y-3">
        <legend className="text-ui-lg font-semibold text-content-primary">
          Services you&apos;re interested in
          <span className="ml-1 text-error-500" aria-hidden>*</span>
        </legend>
        {errors.services && (
          <FormMessage type="error">{errors.services.message}</FormMessage>
        )}
        <Controller
          name="services"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SERVICE_CHECKBOXES.map(({ value, label }) => (
                <Checkbox
                  key={value}
                  id={`gs-service-${value}`}
                  label={label}
                  checked={field.value.includes(value)}
                  onChange={() =>
                    toggleService(field.value, value, field.onChange)
                  }
                />
              ))}
            </div>
          )}
        />
      </fieldset>

      {/* — Timeline ———————————————————————————————————————————— */}
      <fieldset>
        <RadioGroup
          legend="When are you looking to start?"
          error={errors.timeline?.message}
        >
          {TIMELINE_OPTIONS.map(({ value, label }) => (
            <RadioItem
              key={value}
              {...register('timeline')}
              id={`gs-timeline-${value}`}
              value={value}
              label={label}
            />
          ))}
        </RadioGroup>
      </fieldset>

      {/* — Message ————————————————————————————————————————————— */}
      <FormField
        id="gs-message"
        label="Anything else you'd like us to know?"
        hint="Optional"
        error={errors.message?.message}
      >
        <Textarea
          {...register('message')}
          rows={4}
          placeholder="Describe your project, budget range, or any specific requirements…"
        />
      </FormField>

      {/* — Privacy ————————————————————————————————————————————— */}
      <FormField
        id="gs-privacy"
        label=""
        error={errors.privacy?.message}
      >
        <Checkbox
          {...register('privacy')}
          label={
            <>
              I agree to the{' '}
              <a href="/privacy" className="underline">Privacy Policy</a>
              {' '}and consent to TRYVION contacting me regarding this enquiry.
            </>
          }
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        size="xl"
        fullWidth
        loading={submitState === 'submitting'}
        disabled={submitState === 'submitting'}
      >
        Submit request
      </Button>
    </form>
  )
}

// Local type alias for the service union used in the contact action shape
type ContactService =
  | 'sap' | 'ai-data' | 'cloud'
  | 'digital-engineering' | 'talent' | 'managed-services' | 'other'
