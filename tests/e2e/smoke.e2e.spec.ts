import { expect, test } from '@playwright/test'

test.describe('Smoke test', () => {
  test('loads /', async ({ page }) => {
    const homeResponse = await page.goto('/')
    expect(homeResponse?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  // Re-enable when the database is set up (before phase 03)
  test.skip('loads /admin', async ({ page }) => {
    const adminResponse = await page.goto('/admin')
    expect(adminResponse?.status()).toBe(200)
    await expect(page.locator('body')).toBeVisible()
  })
})
