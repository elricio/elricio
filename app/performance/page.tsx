'use client'

import { React19Benchmark } from '@/components/performance/React19Benchmark'
import { Badge } from '@/components/ui/Badge'
import { TerminalBackground } from '@/components/ui/TerminalBackground'
import { motion } from 'framer-motion'

export default function PerformancePage() {
  // React 19 并发渲染特性分析
  const concurrentFeatures: Array<{
    name: string
    description: string
    status: 'stable' | 'experimental' | 'deprecated'
  }> = [
    {
      name: 'useOptimistic',
      description: '立即显示乐观更新，无需等待服务器响应',
      status: 'stable',
    },
    {
      name: 'useFormStatus',
      description: '在表单操作中访问提交状态，无需额外状态管理',
      status: 'stable',
    },
    {
      name: 'useTransition',
      description: '将更新标记为非紧急，允许并发渲染',
      status: 'stable',
    },
    {
      name: 'useDeferredValue',
      description: '延迟渲染非关键 UI，优先处理用户交互',
      status: 'stable',
    },
    {
      name: 'Server Components',
      description: '在服务器上渲染组件，减少客户端 JavaScript',
      status: 'stable',
    },
    {
      name: 'Partial Prerendering',
      description: '静态部分预渲染，动态部分流式传输',
      status: 'experimental',
    },
  ]

  return (
    <>
      <TerminalBackground intensity="high" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-magenta-400">
            React 19 并发渲染性能分析
          </h1>
          <p className="text-white/60">深度剖析并发渲染对大型组件树挂载性能的影响</p>
        </motion.div>

        {/* React 19 Benchmark Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <React19Benchmark />
        </motion.div>

        {/* React 19 Features Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-2xl font-display font-bold text-white mb-6">React 19 并发渲染特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {concurrentFeatures.map((feature, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-cyan-400">{feature.name}</span>
                  <Badge
                    variant={
                      feature.status === 'stable'
                        ? 'default'
                        : feature.status === 'experimental'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-display font-bold text-white mb-4">性能洞察与优化建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">并发渲染优势</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>非紧急更新不会阻塞用户交互（useTransition）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>乐观更新提供即时反馈（useOptimistic）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>延迟渲染减少主线程压力（useDeferredValue）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>服务器组件减少客户端 JavaScript 负载</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-magenta-400 mb-3">最佳实践</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-magenta-400 mt-1">•</span>
                  <span>将计算密集型任务移到服务器组件</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-magenta-400 mt-1">•</span>
                  <span>使用 useTransition 包装非紧急更新</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-magenta-400 mt-1">•</span>
                  <span>对搜索/过滤使用 useDeferredValue</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-magenta-400 mt-1">•</span>
                  <span>避免在渲染期间进行同步数据获取</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
