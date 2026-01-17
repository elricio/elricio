import { test, expect } from '@playwright/test'

test.describe('Basic Smoke Tests - Phase 3', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check main title
    await expect(page.getByRole('heading', { name: 'GEEK-RESUME' })).toBeVisible()
    await expect(page.getByText('高性能动态简历系统')).toBeVisible()
  })

  test('should load resume editor page', async ({ page }) => {
    await page.goto('/resume/edit')
    await page.waitForLoadState('networkidle')

    // Check for performance indicators
    await expect(page.getByText('React 19')).toBeVisible()
    await expect(page.getByText('useOptimistic')).toBeVisible()
    await expect(page.getByText('150ms')).toBeVisible()
  })

  test('should load performance benchmark page', async ({ page }) => {
    await page.goto('/performance')
    await page.waitForLoadState('networkidle')

    // Check for benchmark controls
    await expect(page.getByText('React 19 性能基准测试')).toBeVisible()
    await expect(page.getByRole('button', { name: '运行完整基准测试' })).toBeVisible()
  })

  test('should load demo page', async ({ page }) => {
    await page.goto('/resume/demo')
    await page.waitForLoadState('networkidle')

    // Check for demo content
    await expect(page.getByText('简历预览')).toBeVisible()
  })

  test('should have security headers configured', async ({ page }) => {
    const response = await page.request.get('/')
    const headers = response.headers()

    // Check security headers
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['x-frame-options']).toBe('DENY')
  })

  test('should demonstrate useOptimistic behavior', async ({ page }) => {
    await page.goto('/resume/edit')
    await page.waitForLoadState('networkidle')

    // Fill form data
    await page.getByLabel('姓名').fill('Test User')
    await page.getByLabel('职位').fill('Software Engineer')

    // Submit and check optimistic update
    const submitBtn = page.getByRole('button', { name: '保存简历' })
    await submitBtn.click()

    // Should immediately show loading state (optimistic update)
    await expect(page.getByText('保存中...')).toBeVisible({ timeout: 2000 })

    // Should return to normal state after completion
    await expect(page.getByText('保存简历')).toBeVisible({ timeout: 5000 })
  })

  test('should have retro-futuristic terminal design', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for terminal aesthetic elements
    await expect(page.getByRole('heading', { name: 'GEEK-RESUME' })).toBeVisible()

    // Check for glass panel styling
    const glassPanel = page.locator('.glass-panel')
    await expect(glassPanel.first()).toBeVisible()
  })
})
