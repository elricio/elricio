'use client'

import { cn } from '@/lib/utils'
import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

interface StableImageProps extends Omit<ImageProps, 'placeholder'> {
  aspectRatio?: string
  skeletonColor?: string
}

/**
 * 稳定图片组件 - 专门用于优化 CLS (Cumulative Layout Shift)
 *
 * 特性:
 * 1. 强制指定宽高比，防止布局偏移
 * 2. 使用 blur 占位符减少闪烁
 * 3. 优先加载关键图片 (priority)
 * 4. 提供加载状态反馈
 */
export function StableImage({
  src,
  alt,
  className,
  aspectRatio = '16/9',
  skeletonColor = 'bg-slate-200 dark:bg-slate-700',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: StableImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg',
        `aspect-[${aspectRatio}]`,
        skeletonColor,
        className,
      )}
      style={{
        aspectRatio: aspectRatio,
      }}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
          <span className="text-sm">图片加载失败</span>
        </div>
      ) : (
        <>
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 animate-pulse">
              <div className={cn('absolute inset-0', skeletonColor)} />
            </div>
          )}

          {/* Image */}
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn(
              'object-cover transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100',
            )}
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            {...props}
          />
        </>
      )}
    </div>
  )
}
