'use client'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { Activity, BarChart, Clock, Cpu, Database, Layers, TrendingUp, Zap } from 'lucide-react'
import { useDeferredValue, useEffect, useRef, useState, useTransition } from 'react'

interface BenchmarkResult {
  name: string
  duration: number
  iterations: number
  avgTime: number
  memoryUsage?: number
  timestamp: number
}

interface ConcurrentTestConfig {
  componentCount: number
  updateCount: number
  batchSize: number
  useTransition: boolean
  useDeferred: boolean
}

// 模拟复杂组件树 - 用于测试 React 19 并发渲染性能
const ComplexComponent = ({ id, depth }: { id: number; depth: number }) => {
  const [count, setCount] = useState(0)
  const [isPending, startTransition] = useTransition()

  if (depth === 0) {
    return (
      <div className="p-1 border border-white/10 rounded bg-white/5 text-xs">
        <span className="text-white/40">Leaf {id}</span>
      </div>
    )
  }

  return (
    <div className="p-2 border border-white/10 rounded bg-white/5">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-cyan-400">Node {id}</span>
        <Badge size="sm">{count}</Badge>
      </div>
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: 3 }, (_, i) => (
          <ComplexComponent key={i} id={id * 10 + i} depth={depth - 1} />
        ))}
      </div>
      <Button
        size="sm"
        onClick={() => {
          if (isPending) return
          startTransition(() => {
            setCount((c) => c + 1)
          })
        }}
        disabled={isPending}
        className="mt-1 w-full"
      >
        {isPending ? 'Updating...' : 'Update'}
      </Button>
    </div>
  )
}

// 批量更新测试组件
const BatchUpdateComponent = ({ id, useTransition: useTransitionProp }: { id: number; useTransition: boolean }) => {
  const [value, setValue] = useState(0)
  const [isPending, startTransition] = useTransition()

  const update = () => {
    if (useTransitionProp) {
      startTransition(() => {
        setValue((v) => v + 1)
      })
    } else {
      setValue((v) => v + 1)
    }
  }

  return (
    <div className="p-2 border border-white/10 rounded bg-white/5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/60">Comp {id}</span>
        <Badge size="sm" variant={isPending ? 'secondary' : 'default'}>
          {value}
        </Badge>
      </div>
      <Button size="sm" onClick={update} disabled={isPending} className="mt-1 w-full">
        +
      </Button>
    </div>
  )
}

// 延迟渲染测试组件
const DeferredRenderComponent = ({ query }: { query: string }) => {
  const deferredQuery = useDeferredValue(query)
  const [renderCount, setRenderCount] = useState(0)

  useEffect(() => {
    setRenderCount((c) => c + 1)
  }, [deferredQuery])

  // 模拟昂贵的计算
  const expensiveCalculation = (input: string) => {
    let result = 0
    for (let i = 0; i < 1000; i++) {
      result += input.charCodeAt(i % input.length)
    }
    return result
  }

  return (
    <div className="p-3 border border-white/10 rounded bg-white/5">
      <div className="text-xs text-white/60 mb-2">渲染次数: {renderCount}</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-black/30 rounded">
          <div className="text-cyan-400 font-semibold mb-1">即时</div>
          <div className="text-white/60 truncate">{query}</div>
          <div className="text-white/40 mt-1">计算: {expensiveCalculation(query)}</div>
        </div>
        <div className="p-2 bg-black/30 rounded">
          <div className="text-magenta-400 font-semibold mb-1">延迟</div>
          <div className="text-white/60 truncate">{deferredQuery}</div>
          <div className="text-white/40 mt-1">计算: {expensiveCalculation(deferredQuery)}</div>
        </div>
      </div>
    </div>
  )
}

export function React19Benchmark() {
  const [config, setConfig] = useState<ConcurrentTestConfig>({
    componentCount: 50,
    updateCount: 100,
    batchSize: 10,
    useTransition: true,
    useDeferred: true,
  })
  const [results, setResults] = useState<BenchmarkResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [deferredQuery, setDeferredQuery] = useState('')
  const [showTree, setShowTree] = useState(false)
  const [treeDepth, setTreeDepth] = useState(2)
  const [batchComponents, setBatchComponents] = useState<number[]>([])
  const [mountTime, setMountTime] = useState<number | null>(null)
  const startTimeRef = useRef<number>(0)

  // 测量性能
  const measure = async (
    name: string,
    fn: () => Promise<void> | void,
    iterations = 1,
  ): Promise<BenchmarkResult> => {
    const start = performance.now()
    const memoryStart = (performance as any).memory?.usedJSHeapSize

    for (let i = 0; i < iterations; i++) {
      await fn()
    }

    const end = performance.now()
    const duration = end - start
    const memoryEnd = (performance as any).memory?.usedJSHeapSize
    const memoryUsage = memoryEnd ? (memoryEnd - (memoryStart || 0)) / 1024 / 1024 : undefined

    const result: BenchmarkResult = {
      name,
      duration,
      iterations,
      avgTime: duration / iterations,
      memoryUsage,
      timestamp: Date.now(),
    }

    setResults((prev) => [...prev, result])
    return result
  }

  // 测试 1: 大型组件树挂载
  const testLargeTreeMount = async () => {
    setShowTree(true)
    startTimeRef.current = performance.now()

    // 等待渲染完成
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const end = performance.now()
          setMountTime(end - startTimeRef.current)
          resolve(undefined)
        })
      })
    })
  }

  // 测试 2: 并发状态更新
  const testConcurrentUpdates = async () => {
    const updates = Array.from(
      { length: config.updateCount },
      (_, i) =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            // 模拟状态更新
            Promise.resolve(i).then(() => resolve())
          }, Math.random() * 5)
        }),
    )
    await Promise.all(updates)
  }

  // 测试 3: 批量更新测试
  const testBatchUpdates = async () => {
    const newComponents = Array.from({ length: config.batchSize }, (_, i) => Date.now() + i)
    setBatchComponents((prev) => [...prev, ...newComponents])

    // 等待 DOM 更新
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  // 测试 4: 数据获取与渲染
  const testDataFetch = async () => {
    // 模拟异步数据获取
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 模拟数据处理
    const data = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random() * 100,
    }))

    // 模拟渲染
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  // 运行完整基准测试
  const runFullBenchmark = async () => {
    setIsRunning(true)
    setResults([])
    setShowTree(false)
    setBatchComponents([])

    // 1. 大型组件树挂载
    await measure('Large Tree Mount', testLargeTreeMount)

    // 2. 并发更新测试
    await measure('Concurrent Updates', testConcurrentUpdates, 5)

    // 3. 批量更新测试
    await measure('Batch Updates', testBatchUpdates, 3)

    // 4. 数据获取测试
    await measure('Data Fetch + Render', testDataFetch, 10)

    // 5. 延迟渲染测试（如果启用）
    if (config.useDeferred) {
      await measure('Deferred Render', () => {
        setDeferredQuery('test query for deferred rendering')
        return Promise.resolve()
      })
    }

    setIsRunning(false)
  }

  // React 19 并发渲染特性对比
  const concurrentFeatures = [
    {
      name: 'useOptimistic',
      description: '立即显示乐观更新，无需等待服务器响应',
      benefit: '减少感知延迟，提升用户体验',
      impact: '高',
    },
    {
      name: 'useTransition',
      description: '将更新标记为非紧急，允许并发渲染',
      benefit: '保持 UI 响应性，避免阻塞',
      impact: '高',
    },
    {
      name: 'useDeferredValue',
      description: '延迟渲染非关键 UI，优先处理用户交互',
      benefit: '优化搜索/过滤等场景的性能',
      impact: '中',
    },
    {
      name: 'Server Components',
      description: '在服务器上渲染组件，减少客户端 JavaScript',
      benefit: '减少 bundle 大小，加快首屏加载',
      impact: '高',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-panel border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-cyan-400">组件数量</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="number"
              value={config.componentCount}
              onChange={(e) => setConfig({ ...config, componentCount: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              min="10"
              max="500"
            />
          </CardContent>
        </Card>

        <Card className="glass-panel border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-magenta-400">更新次数</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="number"
              value={config.updateCount}
              onChange={(e) => setConfig({ ...config, updateCount: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              min="10"
              max="1000"
            />
          </CardContent>
        </Card>

        <Card className="glass-panel border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-yellow-400">批量大小</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="number"
              value={config.batchSize}
              onChange={(e) => setConfig({ ...config, batchSize: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              min="5"
              max="100"
            />
          </CardContent>
        </Card>

        <Card className="glass-panel border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-green-400">选项</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={config.useTransition}
                onChange={(e) => setConfig({ ...config, useTransition: e.target.checked })}
              />
              使用 useTransition
            </label>
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={config.useDeferred}
                onChange={(e) => setConfig({ ...config, useDeferred: e.target.checked })}
              />
              使用 useDeferredValue
            </label>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={runFullBenchmark} disabled={isRunning} size="lg">
          {isRunning ? '运行中...' : '运行完整基准测试'}
        </Button>
        <Button onClick={testLargeTreeMount} disabled={isRunning} variant="secondary">
          挂载大型组件树
        </Button>
        <Button onClick={testConcurrentUpdates} disabled={isRunning} variant="secondary">
          并发状态更新
        </Button>
        <Button onClick={testBatchUpdates} disabled={isRunning} variant="secondary">
          批量更新测试
        </Button>
        <Button onClick={testDataFetch} disabled={isRunning} variant="secondary">
          数据获取测试
        </Button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="glass-panel border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
            <BarChart className="h-5 w-5 text-cyan-400" />
            测试结果
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, i) => (
              <Card key={i} className="bg-white/5 border border-white/10">
                <CardHeader className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-cyan-400">{result.name}</span>
                    <Badge size="sm">{result.iterations}x</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-1">
                  <div className="text-2xl font-display font-bold text-white">
                    {result.avgTime.toFixed(2)}
                    <span className="text-sm text-white/60 ml-1">ms avg</span>
                  </div>
                  <div className="text-xs text-white/60">总计: {result.duration.toFixed(2)}ms</div>
                  {result.memoryUsage !== undefined && (
                    <div className="text-xs text-white/40">
                      内存: {result.memoryUsage.toFixed(2)} MB
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Mount Time Display */}
      {mountTime !== null && (
        <div className="glass-panel border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-magenta-400" />
            挂载性能
          </h3>
          <div className="text-center">
            <div className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400">
              {mountTime.toFixed(2)}ms
            </div>
            <div className="text-white/60 mt-2">大型组件树挂载时间 ({treeDepth} 层深度)</div>
          </div>
        </div>
      )}

      {/* Component Tree Visualization */}
      {showTree && (
        <div className="glass-panel border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-display font-bold text-white mb-4">
            组件树可视化 (深度: {treeDepth})
          </h3>
          <div className="flex gap-2 mb-4">
            <Button size="sm" onClick={() => setTreeDepth((d) => Math.max(1, d - 1))}>
              减少深度
            </Button>
            <Button size="sm" onClick={() => setTreeDepth((d) => Math.min(5, d + 1))}>
              增加深度
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setShowTree(false)}>
              隐藏
            </Button>
          </div>
          <div className="overflow-auto max-h-96 p-4 bg-black/30 rounded">
            <ComplexComponent id={1} depth={treeDepth} />
          </div>
        </div>
      )}

      {/* Batch Update Visualization */}
      {batchComponents.length > 0 && (
        <div className="glass-panel border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-display font-bold text-white mb-4">
            批量更新可视化 ({batchComponents.length} 个组件)
          </h3>
          <div className="grid grid-cols-10 gap-1">
            {batchComponents.slice(-100).map((id) => (
              <div
                key={id}
                className="h-8 rounded bg-cyan-500/20 flex items-center justify-center text-xs text-white/60"
              >
                {id % 1000}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deferred Render Test */}
      <div className="glass-panel border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-display font-bold text-white mb-4">
          延迟渲染测试 (useDeferredValue)
        </h3>
        <input
          type="text"
          value={deferredQuery}
          onChange={(e) => setDeferredQuery(e.target.value)}
          placeholder="输入文本测试延迟渲染性能..."
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 mb-4"
        />
        <DeferredRenderComponent query={deferredQuery} />
      </div>

      {/* React 19 Features Analysis */}
      <div className="glass-panel border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-400" />
          React 19 并发渲染特性分析
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concurrentFeatures.map((feature, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-cyan-400">{feature.name}</span>
                <Badge
                  variant={
                    feature.impact === '高'
                      ? 'default'
                      : feature.impact === '中'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  影响: {feature.impact}
                </Badge>
              </div>
              <p className="text-sm text-white/60 mb-2">{feature.description}</p>
              <p className="text-xs text-white/40">优势: {feature.benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="glass-panel border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          性能洞察
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-3">并发渲染优势</h4>
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
            <h4 className="text-lg font-semibold text-magenta-400 mb-3">最佳实践</h4>
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
      </div>
    </div>
  )
}
