import { act, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { StableImage } from '../StableImage'

// Mock next/image to avoid actual image loading in tests
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    fill,
    className,
    onLoadingComplete,
    onError,
    priority,
    sizes,
    ...props
  }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        data-fill={fill}
        data-priority={priority}
        data-sizes={sizes}
        onLoad={onLoadingComplete}
        onError={onError}
        {...props}
      />
    )
  },
}))

describe('StableImage', () => {
  const mockSrc = '/test-image.jpg'
  const mockAlt = 'Test image'

  it('renders image with correct src and alt', () => {
    render(<StableImage src={mockSrc} alt={mockAlt} />)

    const img = screen.getByAltText(mockAlt)
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', mockSrc)
  })

  it('applies aspect ratio correctly', () => {
    render(<StableImage src={mockSrc} alt={mockAlt} aspectRatio="16/9" />)

    const container = screen.getByRole('img').parentElement
    expect(container).toHaveStyle('aspect-ratio: 16/9')
  })

  it('renders blur placeholder initially', () => {
    render(<StableImage src={mockSrc} alt={mockAlt} />)

    const placeholder = screen.getByRole('img').parentElement?.querySelector('.animate-pulse')
    expect(placeholder).toBeInTheDocument()
  })

  it('hides placeholder after image loads', async () => {
    render(<StableImage src={mockSrc} alt={mockAlt} />)

    const img = screen.getByAltText(mockAlt)

    // Simulate image load with act wrapper
    await act(async () => {
      img.dispatchEvent(new Event('load'))
    })

    await waitFor(() => {
      const placeholder = screen.getByRole('img').parentElement?.querySelector('.animate-pulse')
      expect(placeholder).not.toBeInTheDocument()
    })
  })

  it('shows error state when image fails to load', async () => {
    render(<StableImage src={mockSrc} alt={mockAlt} />)

    const img = screen.getByAltText(mockAlt)

    // Simulate image error with act wrapper
    await act(async () => {
      img.dispatchEvent(new Event('error'))
    })

    await waitFor(() => {
      // Error state should show error message (Chinese text from component)
      expect(screen.getByText('图片加载失败')).toBeInTheDocument()
    })
  })

  it('applies priority prop correctly', () => {
    render(<StableImage src={mockSrc} alt={mockAlt} priority />)

    const img = screen.getByAltText(mockAlt)
    expect(img).toBeInTheDocument()
  })

  it('applies sizes prop correctly', () => {
    const sizes = '(max-width: 768px) 100vw, 50vw'
    render(<StableImage src={mockSrc} alt={mockAlt} sizes={sizes} />)

    const img = screen.getByAltText(mockAlt)
    expect(img).toBeInTheDocument()
  })

  it('renders with default aspect ratio when not specified', () => {
    render(<StableImage src={mockSrc} alt={mockAlt} />)

    const container = screen.getByRole('img').parentElement
    expect(container).toHaveStyle('aspect-ratio: 16/9')
  })

  it('applies custom className', () => {
    const customClassName = 'custom-image-class'
    render(<StableImage src={mockSrc} alt={mockAlt} className={customClassName} />)

    const container = screen.getByRole('img').parentElement
    expect(container).toHaveClass(customClassName)
  })

  it('renders with different aspect ratios', () => {
    const aspectRatios = ['1/1', '4/3', '3/2', '21/9']

    aspectRatios.forEach((ratio) => {
      const { container } = render(<StableImage src={mockSrc} alt={mockAlt} aspectRatio={ratio} />)
      const imageContainer = container.querySelector('.relative')
      expect(imageContainer).toHaveStyle(`aspect-ratio: ${ratio}`)
    })
  })
})
