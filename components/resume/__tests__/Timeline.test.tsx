import { render, screen } from '@testing-library/react'
import type React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Timeline } from '../Timeline'
import type { TimelineItem } from '../Timeline'

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
  useInView: () => true,
}))

describe('Timeline', () => {
  const mockItems: TimelineItem[] = [
    {
      id: '1',
      type: 'experience',
      title: '高级前端工程师',
      company: 'Tech Corp',
      location: '北京',
      startDate: '2023-01',
      endDate: '至今',
      description: 'Leading frontend development team',
      skills: ['React', 'TypeScript', 'Next.js'],
    },
    {
      id: '2',
      type: 'experience',
      title: '前端工程师',
      company: 'Startup Inc',
      location: '上海',
      startDate: '2021-06',
      endDate: '2022-12',
      description: 'Built responsive web applications',
      skills: ['Vue.js', 'JavaScript', 'CSS'],
    },
  ]

  it('renders timeline items correctly', () => {
    render(<Timeline items={mockItems} />)

    expect(screen.getByText('高级前端工程师')).toBeInTheDocument()
    expect(screen.getByText('Tech Corp')).toBeInTheDocument()
    expect(screen.getByText('前端工程师')).toBeInTheDocument()
    expect(screen.getByText('Startup Inc')).toBeInTheDocument()
  })

  it('renders description for each item', () => {
    render(<Timeline items={mockItems} />)

    expect(screen.getByText('Leading frontend development team')).toBeInTheDocument()
    expect(screen.getByText('Built responsive web applications')).toBeInTheDocument()
  })

  it('renders technologies for each item', () => {
    render(<Timeline items={mockItems} />)

    // Check if technologies are rendered
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('CSS')).toBeInTheDocument()
  })

  it('renders empty timeline gracefully', () => {
    const { container } = render(<Timeline items={[]} />)

    // Should not throw error, container should be rendered
    expect(container).toBeInTheDocument()
  })

  it('renders empty timeline when empty items array is provided', () => {
    const { container } = render(<Timeline items={[]} />)

    // Should render container but no timeline items
    expect(container).toBeInTheDocument()
    // Only the progress line should be rendered
    const progressLine = document.querySelector('.absolute.left-4')
    expect(progressLine).toBeInTheDocument()
  })

  it('renders vertical progress line', () => {
    render(<Timeline items={mockItems} />)

    // Check if the progress line is rendered
    const progressLine = document.querySelector('.absolute.left-4')
    expect(progressLine).toBeInTheDocument()
  })

  it('renders timeline items with correct structure', () => {
    render(<Timeline items={mockItems} />)

    // Check if each item has the expected structure (h3 elements)
    const items = screen.getAllByRole('heading', { level: 3 })
    expect(items.length).toBeGreaterThanOrEqual(2)
  })

  it('renders technology tags for each item', () => {
    render(<Timeline items={mockItems} />)

    // Check if technology tags are rendered
    const techTags = screen.getAllByText(/React|TypeScript|Next\.js|Vue\.js|JavaScript|CSS/)
    expect(techTags.length).toBeGreaterThan(0)
  })

  it('applies custom className correctly', () => {
    const customClassName = 'custom-timeline'
    const { container } = render(<Timeline items={mockItems} className={customClassName} />)

    // Check if the container has the custom class
    const containerElement = container.querySelector(`.${customClassName}`)
    expect(containerElement).toBeInTheDocument()
  })
})
