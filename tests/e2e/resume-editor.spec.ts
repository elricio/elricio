import { test, expect } from '@playwright/test'

test.describe('Resume Editor - Phase 3 Performance Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/resume/edit')
    await page.waitForLoadState('networkidle')
  })

  test('should load resume editor page with performance indicators', async ({ page }) => {
    // Check React 19 indicator
    await expect(page.getByText('React 19')).toBeVisible()

    // Check useOptimistic indicator
    await expect(page.getByText('useOptimistic')).toBeVisible()

    // Check response time indicator
    await expect(page.getByText('150ms')).toBeVisible()
  })

  test('should have OptimizedResumeForm with instant feedback', async ({ page }) => {
    // Check form title
    await expect(page.getByText('优化简历表单')).toBeVisible()

    // Check personal info section
    await expect(page.getByLabel('姓名')).toBeVisible()
    await expect(page.getByLabel('职位')).toBeVisible()
    await expect(page.getByLabel('邮箱')).toBeVisible()

    // Check save button
    await expect(page.getByRole('button', { name: '保存简历' })).toBeVisible()
  })

  test('should have tab navigation working', async ({ page }) => {
    // Check personal tab is active by default
    await expect(page.getByRole('button', { name: '个人信息' })).toHaveClass(/bg-cyan-600/)

    // Click experience tab
    await page.getByRole('button', { name: '工作经历' }).click()
    await expect(page.getByRole('button', { name: '工作经历' })).toHaveClass(/bg-cyan-600/)

    // Click education tab
    await page.getByRole('button', { name: '教育背景' }).click()
    await expect(page.getByRole('button', { name: '教育背景' })).toHaveClass(/bg-cyan-600/)
  })

  test('should add and remove experience items', async ({ page }) => {
    // Switch to experience tab
    await page.getByRole('button', { name: '工作经历' }).click()

    // Add new experience
    const addBtn = page.getByRole('button', { name: '添加经历' })
    await expect(addBtn).toBeVisible()
    await addBtn.click()

    // Check if new item was added
    await expect(page.getByLabel('公司名称')).toBeVisible()

    // Remove the item
    const removeBtn = page.getByRole('button', { name: '删除' }).first()
    await removeBtn.click()
  })

  test('should show optimistic update behavior on form submission', async ({ page }) => {
    // Fill in some data
    await page.getByLabel('姓名').fill('Test User')
    await page.getByLabel('职位').fill('Software Engineer')

    // Submit form
    const submitBtn = page.getByRole('button', { name: '保存简历' })
    await submitBtn.click()

    // Check for loading state (optimistic update should show immediately)
    await expect(page.getByText('保存中...')).toBeVisible()

    // Wait for completion
    await expect(page.getByText('保存简历')).toBeVisible()
  })
})

test.describe('Performance Benchmark Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/performance')
    await page.waitForLoadState('networkidle')
  })

  test('should load performance benchmark page', async ({ page }) => {
    await expect(page.getByText('React 19 性能基准测试')).toBeVisible()
    await expect(page.getByText('组件数量')).toBeVisible()
    await expect(page.getByText('更新次数')).toBeVisible()
  })

  test('should have benchmark control panel', async ({ page }) => {
    // Check input fields
    await expect(page.getByLabel('组件数量')).toBeVisible()
    await expect(page.getByLabel('更新次数')).toBeVisible()
    await expect(page.getByLabel('批量大小')).toBeVisible()

    // Check action buttons
    await expect(page.getByRole('button', { name: '运行完整基准测试' })).toBeVisible()
    await expect(page.getByRole('button', { name: '挂载大型组件树' })).toBeVisible()
    await expect(page.getByRole('button', { name: '并发状态更新' })).toBeVisible()
  })

  test('should run quick benchmark test', async ({ page }) => {
    // Run a quick test
    await page.getByRole('button', { name: '挂载大型组件树' }).click()

    // Wait for mount time to appear
    await expect(page.getByText('挂载性能')).toBeVisible()
    await expect(page.getByText('ms')).toBeVisible()
  })
})

test.describe('Demo Page', () => {
  test('should load demo page', async ({ page }) => {
    await page.goto('http://localhost:3002/resume/demo')
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('简历预览')).toBeVisible()
  })
})

test.describe('Homepage', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Geek-Resume')).toBeVisible()
    await expect(page.getByText('高性能动态简历系统')).toBeVisible()
  })
})
