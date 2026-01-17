import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import type React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { SkillTree } from '../SkillTree'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, prop) => {
        // Return a component factory for any motion.* element
        return ({
          children,
          layout,
          animate,
          initial,
          exit,
          transition,
          layoutId,
          whileHover,
          whileTap,
          ...props
        }: any) => {
          // Remove all motion-specific props
          const {
            layout: _,
            layoutId: __,
            animate: ___,
            initial: ____,
            exit: _____,
            transition: ______,
            whileHover: _______,
            whileTap: ________,
            ...domProps
          } = props
          const tagNames = ['div', 'span', 'button', 'h3', 'p']
          const tagName = tagNames.includes(prop as string) ? prop : 'div'
          const Tag = tagName as keyof React.JSX.IntrinsicElements
          return <Tag {...domProps}>{children}</Tag>
        }
      },
    },
  ),
  AnimatePresence: ({ children }: any) => <>{children}</>,
  LayoutGroup: ({ children }: any) => <>{children}</>,
  useInView: () => true,
}))

describe('SkillTree', () => {
  it('renders skill categories correctly', () => {
    render(<SkillTree />)

    // Check if categories are rendered
    expect(screen.getByText('前端开发')).toBeInTheDocument()
    expect(screen.getByText('后端开发')).toBeInTheDocument()
    expect(screen.getByText('工具链')).toBeInTheDocument()
  })

  it('expands category on click', async () => {
    render(<SkillTree />)

    const frontendCategory = screen.getByText('前端开发')
    fireEvent.click(frontendCategory)

    await waitFor(() => {
      expect(screen.getByText('React 19')).toBeInTheDocument()
    })
  })

  it('renders progress bars', async () => {
    render(<SkillTree />)

    const frontendCategory = screen.getByText('前端开发')
    fireEvent.click(frontendCategory)

    await waitFor(() => {
      // Check if skills are visible after expansion
      expect(screen.getByText('React 19')).toBeInTheDocument()
    })

    // Check for progress bar elements (motion.div with width animation)
    // Since progress bars don't have role="progressbar", we check for the visual elements
    const progressContainer = screen.getAllByText('React 19')[0]?.closest('div')
    expect(progressContainer).toBeInTheDocument()

    // Verify that the skill level percentage is displayed
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('90%')).toBeInTheDocument()
    expect(screen.getByText('92%')).toBeInTheDocument()
    expect(screen.getByText('88%')).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = render(<SkillTree />)
    expect(container).toBeInTheDocument()
  })
})
