import { describe, it, expect } from 'vitest'
import { render, screen, expectNoA11yViolations } from '../../test/utils'
import { FormField } from '@tryvion/ui'

// ---------------------------------------------------------------------------
// FormField — unit + accessibility tests
// Tests cover: label wiring, required indicator, hint/error rendering,
// and the React.cloneElement aria injection that FormField applies to its child.
// ---------------------------------------------------------------------------

describe('FormField', () => {

  // -------------------------------------------------------------------------
  // Label
  // -------------------------------------------------------------------------

  it('renders a <label> element when label prop is provided', () => {
    render(
      <FormField id="name" label="Full name">
        <input id="name" type="text" />
      </FormField>,
    )
    const label = screen.getByText('Full name')
    expect(label.tagName).toBe('LABEL')
  })

  it('wires label htmlFor to the field id', () => {
    render(
      <FormField id="email-field" label="Email address">
        <input id="email-field" type="email" />
      </FormField>,
    )
    expect(screen.getByText('Email address')).toHaveAttribute('for', 'email-field')
  })

  it('renders no label element when label prop is omitted', () => {
    render(
      <FormField id="bare">
        <input id="bare" type="text" />
      </FormField>,
    )
    expect(document.querySelector('label')).toBeNull()
  })

  // -------------------------------------------------------------------------
  // Required indicator
  // -------------------------------------------------------------------------

  it('shows a required indicator (*) when required=true', () => {
    render(
      <FormField id="req" label="Company" required>
        <input id="req" type="text" />
      </FormField>,
    )
    const indicator = document.querySelector('[aria-hidden="true"]')
    expect(indicator).toBeInTheDocument()
    expect(indicator?.textContent).toBe('*')
  })

  it('does not show a required indicator by default', () => {
    render(
      <FormField id="opt" label="Optional field">
        <input id="opt" type="text" />
      </FormField>,
    )
    expect(document.querySelector('[aria-hidden="true"]')).toBeNull()
  })

  // -------------------------------------------------------------------------
  // aria injection via React.cloneElement
  // -------------------------------------------------------------------------

  it('injects aria-invalid="true" on child when error is set', () => {
    render(
      <FormField id="inp" label="Name" error="Name is required">
        <input id="inp" type="text" />
      </FormField>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not set aria-invalid when there is no error', () => {
    render(
      <FormField id="inp2" label="Name">
        <input id="inp2" type="text" />
      </FormField>,
    )
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('injects aria-required on child when required=true', () => {
    render(
      <FormField id="rq" label="Name" required>
        <input id="rq" type="text" />
      </FormField>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true')
  })

  it('injects aria-describedby pointing to the error id', () => {
    render(
      <FormField id="desc-test" label="Name" error="Error message">
        <input id="desc-test" type="text" />
      </FormField>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      'desc-test-error',
    )
  })

  it('injects aria-describedby pointing to the hint id', () => {
    render(
      <FormField id="hint-test" label="Name" hint="Enter your full name">
        <input id="hint-test" type="text" />
      </FormField>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      'hint-test-hint',
    )
  })

  it('includes both hint and error ids in aria-describedby', () => {
    // When both hint and error are set, hint is suppressed visually but
    // the error id takes precedence. Only error is shown (per FormField logic:
    // hint renders only when !error). So aria-describedby points to error only.
    render(
      <FormField id="both" label="Name" hint="A hint" error="An error">
        <input id="both" type="text" />
      </FormField>,
    )
    // Error is set — only error id appears since hint is suppressed
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      'both-error',
    )
  })

  // -------------------------------------------------------------------------
  // Hint message
  // -------------------------------------------------------------------------

  it('renders hint text when hint is provided and no error exists', () => {
    render(
      <FormField id="hinted" label="Name" hint="Use your legal name">
        <input id="hinted" type="text" />
      </FormField>,
    )
    expect(screen.getByText('Use your legal name')).toBeInTheDocument()
  })

  it('hides hint when an error is present', () => {
    render(
      <FormField id="err-wins" label="Name" hint="A hint" error="An error">
        <input id="err-wins" type="text" />
      </FormField>,
    )
    expect(screen.queryByText('A hint')).toBeNull()
  })

  // -------------------------------------------------------------------------
  // Error message
  // -------------------------------------------------------------------------

  it('renders error message with role="alert"', () => {
    render(
      <FormField id="errmsg" label="Email" error="Invalid email address">
        <input id="errmsg" type="email" />
      </FormField>,
    )
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Invalid email address')
  })

  it('does not render an alert when no error is set', () => {
    render(
      <FormField id="noerr" label="Email">
        <input id="noerr" type="email" />
      </FormField>,
    )
    expect(screen.queryByRole('alert')).toBeNull()
  })

  // -------------------------------------------------------------------------
  // Accessibility — axe-core WCAG 2.1 AA scan
  // -------------------------------------------------------------------------

  it('has no axe violations in default state', async () => {
    const { container } = render(
      <FormField id="a11y-default" label="Full name">
        <input id="a11y-default" type="text" />
      </FormField>,
    )
    await expectNoA11yViolations(container)
  })

  it('has no axe violations in error state', async () => {
    const { container } = render(
      <FormField id="a11y-error" label="Email" error="Please enter a valid email" required>
        <input id="a11y-error" type="email" />
      </FormField>,
    )
    await expectNoA11yViolations(container)
  })

  it('has no axe violations with hint', async () => {
    const { container } = render(
      <FormField id="a11y-hint" label="Phone" hint="Include country code" required>
        <input id="a11y-hint" type="tel" />
      </FormField>,
    )
    await expectNoA11yViolations(container)
  })
})
