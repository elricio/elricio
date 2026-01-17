'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Briefcase, Calendar, GraduationCap, MapPin } from 'lucide-react'
import { useRef } from 'react'

export interface TimelineItem {
  id: string
  type: 'experience' | 'education'
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
  skills?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const sampleItems: TimelineItem[] = [
  {
    id: 'exp-1',
    type: 'experience',
    title: '高级前端工程师',
    company: 'TechCorp Inc.',
    location: '北京',
    startDate: '2023-01',
    endDate: '至今',
    description:
      '负责公司核心产品的前端架构设计和开发，使用 React 19 + Next.js 15 构建高性能应用。',
    skills: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: '前端工程师',
    company: 'StartupXYZ',
    location: '上海',
    startDate: '2021-06',
    endDate: '2022-12',
    description: '从零到一构建产品前端，实现复杂的交互效果和动画，优化 Web Vitals。',
    skills: ['React 18', 'Framer Motion', 'Vite', 'Playwright'],
  },
  {
    id: 'edu-1',
    type: 'education',
    title: '计算机科学与技术',
    company: '清华大学',
    location: '北京',
    startDate: '2017-09',
    endDate: '2021-06',
    description: '主修软件工程，GPA 3.8/4.0。参与多个开源项目，获得 ACM 竞赛奖项。',
    skills: ['算法', '数据结构', '操作系统', '计算机网络'],
  },
]

export function Timeline({ items = sampleItems, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-100px' })

  const getIcon = (type: string) => {
    switch (type) {
      case 'experience':
        return Briefcase
      case 'education':
        return GraduationCap
      default:
        return Calendar
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
  }

  return (
    <div ref={containerRef} className={cn('relative space-y-6', className)}>
      {/* Vertical Line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isInView ? '100%' : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
      />

      <AnimatePresence>
        {items.map((item, index) => {
          const Icon = getIcon(item.type)
          const delay = index * 0.1

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 28,
                delay,
              }}
              className={cn(
                'relative pl-12 pr-4 py-4 rounded-xl',
                'bg-white dark:bg-slate-800',
                'border border-slate-200 dark:border-slate-700',
                'hover:shadow-lg hover:shadow-blue-500/10',
                'transition-all duration-300',
              )}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: delay + 0.2,
                }}
                className={cn(
                  'absolute left-3.5 top-6 w-3 h-3 rounded-full',
                  'bg-gradient-to-br',
                  item.type === 'experience'
                    ? 'from-blue-500 to-cyan-500'
                    : 'from-purple-500 to-pink-500',
                  'ring-4 ring-white dark:ring-slate-800',
                )}
              />

              {/* Header */}
              <motion.div layout className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <motion.h3
                    layout
                    className={cn(
                      'text-lg font-bold',
                      'bg-gradient-to-r bg-clip-text text-transparent',
                      item.type === 'experience'
                        ? 'from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400'
                        : 'from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400',
                    )}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p layout className="text-slate-600 dark:text-slate-400 font-medium">
                    {item.company}
                  </motion.p>
                </div>

                <motion.div
                  layout
                  className={cn(
                    'flex items-center gap-1 px-2 py-1 rounded-lg text-xs',
                    'bg-slate-100 dark:bg-slate-700',
                    'text-slate-600 dark:text-slate-300',
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(item.startDate)}</span>
                  <span>→</span>
                  <span>{item.endDate === '至今' ? 'Present' : formatDate(item.endDate)}</span>
                </motion.div>
              </motion.div>

              {/* Location */}
              <motion.div
                layout
                className="flex items-center gap-1 mb-2 text-sm text-slate-500 dark:text-slate-400"
              >
                <MapPin className="h-3 w-3" />
                <span>{item.location}</span>
              </motion.div>

              {/* Description */}
              <motion.p
                layout
                className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed"
              >
                {item.description}
              </motion.p>

              {/* Skills Tags */}
              {item.skills && item.skills.length > 0 && (
                <motion.div layout className="flex flex-wrap gap-1">
                  {item.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        delay: delay + 0.3 + skillIndex * 0.05,
                      }}
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs',
                        'bg-gradient-to-r',
                        item.type === 'experience'
                          ? 'from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400'
                          : 'from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400',
                        'border border-current/20',
                      )}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
