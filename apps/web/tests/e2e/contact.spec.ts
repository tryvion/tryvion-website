import { test, expect } from '@playwright/test'

test.describe('Contact page — form interaction', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  // -------------------------------------------------------------------------
  // Page load
  // -------------------------------------------------------------------------

  test('renders 200 and page title', async ({ page }) => {
    const response = await page.goto('/contact')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/Contact|TRYVION/)
  })

  test('renders the contact form', async ({ page }) => {
    await expect(page.getByRole('form')).toBeVisible()
  })

  // -------------------------------------------------------------------------
  // Validation — submit empty form
  // -------------------------------------------------------------------------

  test('shows validation errors when form is submitted empty', async ({ page }) => {
    // Click submit without filling anything
    await page.getByRole('button', { name: /send|submit|contact/i }).click()
    // At least one error message should appear
    const alerts = page.getByRole('alert')
    await expect(alerts.first()).toBeVisible()
  })

  // -------------------------------------------------------------------------
  // Happy path — fill and submit
  // -------------------------------------------------------------------------

  test('submits successfully with valid data', async ({ page }) => {
    await page.getByLabel(/full name|name/i).fill('Jane Smith')
    await page.getByLabel(/company/i).fill('Acme Corporation')
    await page.getByLabel(/email/i).fill('jane.smith@acme.com')

    // Select a service area
    const serviceSelect = page.getByLabel(/service area|how can we help/i)
    await serviceSelect.selectOption('sap')

    // Fill the message (must be ≥ 20 chars per Zod schema)
    await page.getByLabel(/message|tell us/i).fill(
      'We need help migrating our ECC system to SAP S/4HANA.',
    )

    // Accept privacy policy
    await page.getByLabel(/privacy policy|I accept/i).check()

    // Submit
    await page.getByRole('button', { name: /send|submit|contact/i }).click()

    // Expect a success state — either a success message or toast
    await expect(
      page.getByText(/thank you|message sent|we.ll be in touch|success/i),
    ).toBeVisible({ timeout: 10_000 })
  })

  // -------------------------------------------------------------------------
  // Email validation
  // -------------------------------------------------------------------------

  test('shows email error for invalid email', async ({ page }) => {
    await page.getByLabel(/full name|name/i).fill('Jane Smith')
    await page.getByLabel(/company/i).fill('Acme Corp')
    await page.getByLabel(/email/i).fill('not-an-email')
    await page.getByRole('button', { name: /send|submit/i }).click()

    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  // -------------------------------------------------------------------------
  // Accessibility
  // -------------------------------------------------------------------------

  test('all form fields have visible labels', async ({ page }) => {
    const inputs = page.locator('input:not([type="hidden"]), textarea, select')
    const count = await inputs.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      if (!id) continue
      const label = page.locator(`label[for="${id}"]`)
      await expect(label).toBeAttached()
    }
  })

})
