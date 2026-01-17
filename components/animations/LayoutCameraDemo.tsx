'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, RefreshCw } from 'lucide-react'
import { useState } from 'react'

interface Item {
  id: string
  name: string
  color: string
  size: number
}

const initialItems: Item[] = [
  { id: '1', name: 'React 19', color: 'from-blue-500 to-cyan-500', size: 100 },
  { id: '2', name: 'Next.js 15', color: 'from-purple-500 to-pink-500', size: 120 },
  { id: '3', name: 'Tailwind 4', color: 'from-orange-500 to-red-500', size: 90 },
  { id: '4', name: 'Framer Motion', color: 'from-green-500 to-emerald-500', size: 110 },
]

export function LayoutCameraDemo() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isGrid, setIsGrid] = useState(true)

  const selectedItem = items.find((item) => item.id === selectedId)

  const addItem = () => {
    const newId = String(items.length + 1)
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-green-500 to-emerald-500',
      'from-yellow-500 to-amber-500',
    ]
    const newItems = [
      ...items,
      {
        id: newId,
        name: `Item ${newId}`,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 80 + Math.floor(Math.random() * 50),
      },
    ]
    setItems(newItems)
  }

  const removeItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1))
      if (selectedId === items[items.length - 1].id) {
        setSelectedId(null)
      }
    }
  }

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    setItems(shuffled)
  }

  const toggleLayout = () => {
    setIsGrid(!isGrid)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addItem}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            'bg-blue-600 text-white hover:bg-blue-700',
            'transition-colors duration-200',
          )}
        >
          <Plus className="h-4 w-4" />
          添加项目
        </button>

        <button
          type="button"
          onClick={removeItem}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            'bg-red-600 text-white hover:bg-red-700',
            'transition-colors duration-200',
          )}
        >
          <Minus className="h-4 w-4" />
          移除项目
        </button>

        <button
          type="button"
          onClick={shuffleItems}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            'bg-purple-600 text-white hover:bg-purple-700',
            'transition-colors duration-200',
          )}
        >
          <RefreshCw className="h-4 w-4" />
          随机排序
        </button>

        <button
          type="button"
          onClick={toggleLayout}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            'bg-slate-700 text-white hover:bg-slate-800',
            'transition-colors duration-200',
          )}
        >
          {isGrid ? '切换到列表' : '切换到网格'}
        </button>
      </div>

      {/* Layout Container with Layout Transition */}
      <motion.div
        layout
        className={cn(
          'relative min-h-[400px] rounded-2xl p-6',
          'bg-white dark:bg-slate-800',
          'border border-slate-200 dark:border-slate-700',
          isGrid ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'flex flex-col gap-3',
        )}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              layoutId={`item-${item.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                'cursor-pointer rounded-xl p-4',
                'bg-gradient-to-br',
                item.color,
                'text-white',
                'flex flex-col items-center justify-center gap-2',
                'shadow-lg hover:shadow-xl',
                'transition-shadow duration-200',
              )}
              style={{
                minHeight: isGrid ? '120px' : '60px',
              }}
            >
              <motion.span layout className="font-bold text-lg">
                {item.name}
              </motion.span>
              <motion.span layout className="text-xs opacity-80">
                Size: {item.size}px
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Selected Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layout
              layoutId={`item-${selectedItem.id}`}
              className={cn(
                'w-full max-w-md rounded-2xl p-8',
                'bg-gradient-to-br',
                selectedItem.color,
                'text-white',
                'shadow-2xl',
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h3 layout className="text-2xl font-bold mb-2">
                {selectedItem.name}
              </motion.h3>

              <motion.p layout className="text-white/80 mb-4">
                这是一个使用 Framer Motion LayoutCamera 实现的无缝布局转换示例。
              </motion.p>

              <motion.div layout className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>尺寸</span>
                  <span className="font-medium">{selectedItem.size}px</span>
                </div>
                <div className="flex justify-between">
                  <span>颜色主题</span>
                  <span className="font-medium">{selectedItem.color}</span>
                </div>
                <div className="flex justify-between">
                  <span>元素ID</span>
                  <span className="font-medium">{selectedItem.id}</span>
                </div>
              </motion.div>

              <motion.button
                layout
                type="button"
                onClick={() => setSelectedId(null)}
                className={cn(
                  'mt-6 w-full py-3 px-4 rounded-xl',
                  'bg-white/20 hover:bg-white/30',
                  'backdrop-blur-sm',
                  'transition-colors duration-200',
                )}
              >
                关闭详情
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
        <p className="font-medium">操作说明：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>点击任意项目查看详细信息（LayoutCamera 无缝转换）</li>
          <li>使用按钮添加/移除项目，观察布局自动调整</li>
          <li>切换网格/列表布局，体验平滑过渡动画</li>
          <li>随机排序展示元素重排动画</li>
        </ul>
      </div>
    </div>
  )
}
