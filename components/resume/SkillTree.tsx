'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Code, Database, Globe, Zap } from 'lucide-react'
import { useState } from 'react'

interface SkillCategory {
  id: string
  name: string
  icon: React.ElementType
  color: string
  skills: Skill[]
}

interface Skill {
  id: string
  name: string
  level: number // 0-100
  category: string
}

const initialCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: '前端开发',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { id: 'react', name: 'React 19', level: 95, category: 'frontend' },
      { id: 'nextjs', name: 'Next.js 15', level: 90, category: 'frontend' },
      { id: 'typescript', name: 'TypeScript', level: 92, category: 'frontend' },
      { id: 'tailwind', name: 'Tailwind CSS 4', level: 88, category: 'frontend' },
    ],
  },
  {
    id: 'backend',
    name: '后端开发',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { id: 'nodejs', name: 'Node.js 22', level: 85, category: 'backend' },
      { id: 'postgres', name: 'PostgreSQL', level: 80, category: 'backend' },
      { id: 'redis', name: 'Redis', level: 75, category: 'backend' },
      { id: 'prisma', name: 'Prisma ORM', level: 82, category: 'backend' },
    ],
  },
  {
    id: 'tools',
    name: '工具链',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    skills: [
      { id: 'git', name: 'Git/GitHub', level: 90, category: 'tools' },
      { id: 'docker', name: 'Docker', level: 78, category: 'tools' },
      { id: 'pnpm', name: 'pnpm 10', level: 88, category: 'tools' },
      { id: 'biome', name: 'Biome', level: 85, category: 'tools' },
    ],
  },
  {
    id: 'testing',
    name: '测试',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { id: 'vitest', name: 'Vitest', level: 82, category: 'testing' },
      { id: 'playwright', name: 'Playwright', level: 80, category: 'testing' },
      { id: 'react-testing', name: 'React Testing', level: 78, category: 'testing' },
      { id: 'e2e', name: 'E2E Testing', level: 75, category: 'testing' },
    ],
  },
]

export function SkillTree() {
  const [categories, setCategories] = useState<SkillCategory[]>(initialCategories)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId))
  }

  const selectSkill = (skill: Skill) => {
    setSelectedSkill(skill)
  }

  const closeSkillDetail = () => {
    setSelectedSkill(null)
  }

  return (
    <div className="space-y-4">
      {/* Layout 容器 - 用于无缝布局转换 */}
      <motion.div layout className="space-y-3">
        <AnimatePresence mode="popLayout">
          {categories.map((category) => {
            const isExpanded = expandedCategory === category.id
            const Icon = category.icon

            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={cn(
                  'rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden',
                  'bg-white dark:bg-slate-800',
                )}
              >
                {/* Category Header */}
                <motion.button
                  layout
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3',
                    'hover:bg-slate-50 dark:hover:bg-slate-700/50',
                    'transition-colors duration-200',
                  )}
                >
                  <motion.div
                    layout
                    className={cn('p-2 rounded-lg bg-gradient-to-br', category.color, 'text-white')}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>

                  <motion.span layout className="flex-1 text-left font-medium">
                    {category.name}
                  </motion.span>

                  <motion.span
                    layout
                    className={cn(
                      'text-sm text-slate-500 dark:text-slate-400',
                      'transition-transform duration-200',
                      isExpanded && 'rotate-90',
                    )}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.span>
                </motion.button>

                {/* Skills List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                      className="px-4 pb-4 space-y-3"
                    >
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className="group cursor-pointer"
                          onClick={() => selectSkill(skill)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {skill.name}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar with Animation */}
                          <motion.div
                            layout
                            className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden"
                          >
                            <motion.div
                              layout
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                type: 'spring',
                                stiffness: 120,
                                damping: 20,
                                delay: 0.1,
                              }}
                              className={cn(
                                'h-full rounded-full bg-gradient-to-r',
                                category.color,
                                'group-hover:opacity-80 transition-opacity',
                              )}
                            />
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Skill Detail Modal with Layout Transition */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeSkillDetail}
          >
            <motion.div
              layout
              layoutId={`skill-${selectedSkill.id}`}
              className={cn(
                'w-full max-w-md rounded-2xl bg-white dark:bg-slate-800',
                'p-6 shadow-2xl border border-slate-200 dark:border-slate-700',
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h3 layout className="text-xl font-bold mb-2">
                {selectedSkill.name}
              </motion.h3>

              <motion.p layout className="text-slate-600 dark:text-slate-400 mb-4">
                {selectedSkill.category} • Proficiency: {selectedSkill.level}%
              </motion.p>

              <motion.div layout className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Technical Mastery</span>
                  <span className="font-medium">{selectedSkill.level}%</span>
                </div>

                <motion.div
                  layout
                  className="h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden"
                >
                  <motion.div
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                </motion.div>
              </motion.div>

              <motion.button
                layout
                type="button"
                onClick={closeSkillDetail}
                className={cn(
                  'mt-6 w-full py-2 px-4 rounded-lg',
                  'bg-slate-900 text-white dark:bg-slate-700',
                  'hover:bg-slate-800 dark:hover:bg-slate-600',
                  'transition-colors duration-200',
                )}
              >
                关闭
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
