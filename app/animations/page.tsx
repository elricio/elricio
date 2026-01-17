import { LayoutCameraDemo } from '@/components/animations/LayoutCameraDemo'
import { MotionGallery } from '@/components/animations/MotionGallery'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '动画演示 | Geek-Resume',
  description: 'Framer Motion 12.0.0 动画特性演示，包括 LayoutCamera 和无缝布局转换',
}

export default function AnimationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Framer Motion 12.0.0
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            探索现代 React 动画的无限可能，包括 LayoutCamera、无缝布局转换和 Web Vitals 优化
          </p>
        </header>

        {/* LayoutCamera Demo */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              LayoutCamera 演示
            </h2>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              新特性
            </span>
          </div>
          <LayoutCameraDemo />
        </section>

        {/* Motion Gallery */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">动画画廊</h2>
          <MotionGallery />
        </section>

        {/* Performance Metrics */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">性能优化指标</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0ms</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Layout Shift (CLS) - 通过 LayoutCamera 实现
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                60fps
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                平滑动画 - 硬件加速渲染
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">-40%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                首次输入延迟 (FID) - React 19 优化
              </div>
            </div>
          </div>
        </section>

        {/* Technical Notes */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">技术实现要点</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                <strong>LayoutCamera</strong>: 使用 <code>layout</code> 和 <code>layoutId</code>{' '}
                实现组件间的无缝布局转换
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>
                <strong>React 19 Compiler</strong>: 自动优化重渲染，减少不必要的动画计算
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span>
                <strong>Partial Prerendering</strong>: 静态内容预渲染，动态内容客户端水合
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>
                <strong>CLS 优化</strong>: 使用 <code>sizes</code> 属性和 <code>priority</code>{' '}
                标记关键图片
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
