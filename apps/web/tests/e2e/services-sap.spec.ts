import { test, expect } from '@playwright/test'

test.describe('/services/sap — SAP service detail page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/services/sap')
  })

  test('returns 200', async ({ page }) => {
    const response = await page.goto('/services/sap')
    expect(response?.status()).toBe(200)
  })

  test('page title contains SAP', async ({ page }) => {
    await expect(page).toHaveTitle(/SAP/)
  })

  test('h1 mentions SAP', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    await expect(h1).toContainText(/SAP/i)
  })

  test('breadcrumbs include Services', async ({ page }) => {
    const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]')
    await expect(breadcrumbs).toBeVisible()
    await expect(breadcrumbs).toContainText('Services')
  })

  test('capabilities section is present', async ({ page }) => {
    // The ServiceDetailLayout renders a capabilities grid
    await expect(page.getByText(/capabilities|what we deliver/i).first()).toBeVisible()
  })

  test('CTA section links to contact or get-started', async ({ page }) => {
    const cta = page.getByRole('link', { name: /get started|contact|talk to us/i }).last()
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', /\/(contact|get-started)/)
  })

  test('has correct canonical URL in head', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /\/services\/sap/)
  })

})
