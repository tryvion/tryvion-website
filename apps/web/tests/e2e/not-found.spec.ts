import { test, expect } from '@playwright/test'

const NONEXISTENT = '/this-page-absolutely-does-not-exist-xyz-404'

test.describe('404 — not-found page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(NONEXISTENT)
  })

  test('returns a 404 status code', async ({ page }) => {
    const response = await page.goto(NONEXISTENT)
    expect(response?.status()).toBe(404)
  })

  test('page title signals not found', async ({ page }) => {
    await expect(page).toHaveTitle(/not.?found|page.?not.?found/i)
  })

  test('renders an h1 with not-found messaging', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    // Heading text should convey the 404 state — e.g. "Page not found" or "404"
    await expect(h1).toContainText(/not.?found|404/i)
  })

  test('has a link back to the homepage', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /go to homepage|return home|home/i })
    await expect(homeLink).toBeVisible()
    await expect(homeLink).toHaveAttribute('href', '/')
  })

  test('has a link to the contact page', async ({ page }) => {
    const contactLink = page.getByRole('link', { name: /contact/i }).first()
    await expect(contactLink).toBeVisible()
  })

  test('page does not redirect to a different URL', async ({ page }) => {
    expect(page.url()).toContain(NONEXISTENT)
  })

})
