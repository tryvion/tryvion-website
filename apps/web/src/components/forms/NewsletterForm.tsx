'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, type NewsletterFormData } from '@/lib/schemas'
import { subscribeNewsletter } from '@/app/actions/newsletter'
import { FormField, FormMessage, Input } from '@tryvion/ui'
import { Button } from '@tryvion/ui'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

interface NewsletterFormProps {
  /** Visual layout — inline renders email + button side by side */
  layout?: 'inline' | 'stacked'
  /** Override label text */
  buttonLabel?: string
}

export function NewsletterForm({
  layout = 'inline',
  buttonLabel = 'Subscribe',
}: NewsletterFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setSubmitState('submitting')
    setServerError(null)

    const result = await subscribeNewsletter(data)

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
      <p role="alert" aria-live="polite" className="text-body-md font-medium text-success-400">
        You&apos;re subscribed. Welcome to TRYVION Insights.
      </p>
    )
  }

  if (layout === 'inline') {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Subscribe to TRYVION newsletter"
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            {...register('email')}
            id="newsletter-email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            status={errors.email ? 'error' : 'default'}
            aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <FormMessage id="newsletter-email-error" type="error">
              {errors.email.message}
            </FormMessage>
          )}
          {serverError && (
            <FormMessage type="error">{serverError}</FormMessage>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={submitState === 'submitting'}
          disabled={submitState === 'submitting'}
          className="shrink-0"
        >
          {buttonLabel}
        </Button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Subscribe to TRYVION newsletter"
      className="space-y-4"
    >
      <FormField
        id="newsletter-email"
        label="Email address"
        required
        error={errors.email?.message}
      >
        <Input
          {...register('email')}
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
        />
      </FormField>
      {serverError && (
        <FormMessage type="error">{serverError}</FormMessage>
      )}
      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        loading={submitState === 'submitting'}
        disabled={submitState === 'submitting'}
      >
        {buttonLabel}
      </Button>
    </form>
  )
}
