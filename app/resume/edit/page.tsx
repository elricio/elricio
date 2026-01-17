'use client'

import { OptimizedResumeForm } from '@/components/resume/OptimizedResumeForm'
import { TerminalBackground } from '@/components/ui/TerminalBackground'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { ArrowLeft, Cpu, Network, Zap } from 'lucide-react'
import Link from 'next/link'

export default function ResumeEditPage() {
  return (
    <>
      <TerminalBackground intensity="high" />
      <div className="relative min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-40 glass-panel backdrop-blur-lg border-b border-cyan-500/20"
        >
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 border border-cyan-500/30"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <h1 className="text-xl font-display font-bold text-cyan-400 glow-cyan">
                [ 简历编辑器 ]
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="flex items-center gap-2 text-cyan-300 text-sm font-mono"
              >
                <Zap className="h-4 w-4" />
                <span>实时编辑</span>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Performance Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <div className="glass-panel noise-texture rounded-lg p-4 border border-cyan-500/20 text-center">
              <Cpu className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-display font-bold text-cyan-300">React 19</div>
              <div className="text-xs text-white/60">并发渲染</div>
            </div>
            <div className="glass-panel noise-texture rounded-lg p-4 border border-cyan-500/20 text-center">
              <Network className="h-6 w-6 mx-auto mb-2 text-magenta-400" />
              <div className="text-2xl font-display font-bold text-magenta-300">useOptimistic</div>
              <div className="text-xs text-white/60">即时更新</div>
            </div>
            <div className="glass-panel noise-texture rounded-lg p-4 border border-cyan-500/20 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-display font-bold text-cyan-300">150ms</div>
              <div className="text-xs text-white/60">响应延迟</div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <OptimizedResumeForm />
          </motion.div>

          {/* Technical Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-panel noise-texture rounded-xl p-6 mt-8 border border-cyan-500/20"
          >
            <h3 className="text-lg font-display font-bold text-cyan-400 mb-3">[ 技术实现说明 ]</h3>
            <ul className="space-y-2 text-sm text-white/70 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>
                  <strong className="text-cyan-300">useOptimistic:</strong>{' '}
                  在服务器响应前立即更新UI，提供即时反馈
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>
                  <strong className="text-cyan-300">useFormStatus:</strong>{' '}
                  表单状态管理，无需额外状态变量
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>
                  <strong className="text-cyan-300">React 19:</strong>{' '}
                  并发渲染优化大型组件树挂载性能
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>
                  <strong className="text-cyan-300">Zod + React Hook Form:</strong>{' '}
                  类型安全的表单验证
                </span>
              </li>
            </ul>
          </motion.div>
        </main>
      </div>
    </>
  )
}
