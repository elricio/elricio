'use client'

import { SkillTree } from '@/components/resume/SkillTree'
import { Timeline } from '@/components/resume/Timeline'
import type { TimelineItem } from '@/components/resume/Timeline'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import Link from 'next/link'

// 示例工作经历数据
const sampleExperience: TimelineItem[] = [
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

export default function ResumeDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回首页
              </Button>
            </Link>
            <h1 className="text-xl font-bold">简历示例</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              分享
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出 PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Resume Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Skills Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-4">技能树</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              点击技能类别展开查看详细技能水平，点击技能查看详情。
            </p>
            <SkillTree />
          </section>

          {/* Timeline Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-4">工作经历 & 教育背景</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              滚动页面触发动画，查看时间线的渐变进度效果。
            </p>
            <Timeline items={sampleExperience} />
          </section>

          {/* Animation Demo Link */}
          <section className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">想查看更多动画效果？</h2>
            <p className="mb-4 opacity-90">
              访问动画演示页面，查看 Framer Motion 的各种高级动画技巧。
            </p>
            <Link href="/animations">
              <Button variant="secondary" size="sm">
                查看动画演示 →
              </Button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
