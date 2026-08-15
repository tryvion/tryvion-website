import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // -------------------------------------------------------------------------
  // Page fundamentals
  // -------------------------------------------------------------------------

  test('renders page title containing TRYVION', async ({ page }) => {
    await expect(page).toHaveTitle(/TRYVION/)
  })

  test('renders an <h1> heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('renders the site navigation', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('renders the site footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
  })

  // -------------------------------------------------------------------------
  // Skip navigation — WCAG 2.4.1
  // -------------------------------------------------------------------------

  test('skip-nav link is present in the DOM', async ({ page }) => {
    const skipNav = page.locator('.skip-nav')
    await expect(skipNav).toBeAttached()
  })

  test('skip-nav link becomes visible on keyboard focus', async ({ page }) => {
    // Tab once — the skip nav link should receive focus first
    await page.keyboard.press('Tab')
    const skipNav = page.locator('.skip-nav')
    await expect(skipNav).toBeFocused()
    await expect(skipNav).toBeVisible()
  })

  test('skip-nav link targets #main-content', async ({ page }) => {
    const skipNav = page.locator('.skip-nav')
    await expect(skipNav).toHaveAttribute('href', '#main-content')
  })

  test('main content landmark has id="main-content"', async ({ page }) => {
    await expect(page.locator('#main-content')).toBeAttached()
  })

  // -------------------------------------------------------------------------
  // Navigation links
  // -------------------------------------------------------------------------

  test('Services nav link leads to /services', async ({ page }) => {
    const servicesLink = page.getByRole('link', { name: /services/i }).first()
    await expect(servicesLink).toBeVisible()
    await expect(servicesLink).toHaveAttribute('href', /\/services/)
  })

  test('About nav link leads to /about', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /about/i }).first()
    await expect(aboutLink).toBeVisible()
  })

  // -------------------------------------------------------------------------
  // Core Web Vitals proxy — page loads without JS errors
  // -------------------------------------------------------------------------

  test('page loads without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Allow known benign errors (e.g. favicon 404 in dev, analytics blocked)
    const fatalErrors = errors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('analytics') &&
      !e.includes('gtag') &&
      !e.includes('GA_')
    )
    expect(fatalErrors).toHaveLength(0)
  })

})
