'use client'

import { cn } from '@/lib/utils'
import { type ResumeData, resumeSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { useOptimistic, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import { SkillTree } from './SkillTree'
import { Timeline } from './Timeline'

// Form Status Button Component (uses useFormStatus)
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg transition-all duration-300',
        'hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]',
        pending ? 'opacity-50 cursor-not-allowed' : '',
      )}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          保存中...
        </>
      ) : (
        <>
          <Save className="mr-2 h-5 w-5" />
          保存简历
        </>
      )}
    </button>
  )
}

// Optimistic Form Component
export function OptimizedResumeForm() {
  const [activeTab, setActiveTab] = useState<
    'personal' | 'experience' | 'education' | 'skills' | 'projects'
  >('personal')

  // useOptimistic for instant UI updates
  const [optimisticData, addOptimistic] = useOptimistic<ResumeData, ResumeData>(
    {
      personal: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        summary: '',
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
    },
    (state, newData) => ({
      ...state,
      ...newData,
    }),
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: optimisticData,
  })

  const onSubmit = async (data: ResumeData) => {
    // Optimistically update UI before API call
    addOptimistic(data)

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Form submitted:', data)
    // TODO: Implement actual save functionality with API route
  }

  const tabs = [
    { id: 'personal', label: '基本信息' },
    { id: 'experience', label: '工作经历' },
    { id: 'education', label: '教育背景' },
    { id: 'skills', label: '技能' },
    { id: 'projects', label: '项目' },
  ] as const

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-all duration-300',
              'border border-cyan-500/30',
              activeTab === tab.id
                ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                : 'bg-black/40 text-cyan-300 hover:bg-black/60 hover:border-cyan-400',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form with Optimistic Updates */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {activeTab === 'personal' && (
          <div className="glass-panel noise-texture rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-display font-bold mb-4 text-cyan-400 glow-cyan">
              [ 基本信息 ]
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="personal.name"
                  className="block text-sm font-medium mb-1 text-cyan-300"
                >
                  姓名 *
                </label>
                <input
                  {...register('personal.name')}
                  className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="张三"
                />
                {errors.personal?.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.personal.name.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="personal.title"
                  className="block text-sm font-medium mb-1 text-cyan-300"
                >
                  职位 *
                </label>
                <input
                  {...register('personal.title')}
                  className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="高级前端工程师"
                />
                {errors.personal?.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.personal.title.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="personal.email"
                  className="block text-sm font-medium mb-1 text-cyan-300"
                >
                  邮箱 *
                </label>
                <input
                  {...register('personal.email')}
                  type="email"
                  className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="example@email.com"
                />
                {errors.personal?.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.personal.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="personal.phone"
                  className="block text-sm font-medium mb-1 text-cyan-300"
                >
                  电话 *
                </label>
                <input
                  {...register('personal.phone')}
                  className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="13800138000"
                />
                {errors.personal?.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.personal.phone.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="personal.location"
                  className="block text-sm font-medium mb-1 text-cyan-300"
                >
                  地点
                </label>
                <input
                  {...register('personal.location')}
                  className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="北京"
                />
              </div>
              <div>
                <label
                  htmlFor="personal.website"
                  className="block text-sm font-medium mb-1 text-cyan-300"
                >
                  个人网站
                </label>
                <input
                  {...register('personal.website')}
                  className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="https://example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="personal.summary"
                  className="block text-sm font-medium mb-1 text-cyan-300"
                >
                  个人简介
                </label>
                <textarea
                  {...register('personal.summary')}
                  rows={4}
                  className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  placeholder="简要介绍您的职业背景和技能..."
                />
                {errors.personal?.summary && (
                  <p className="text-red-400 text-sm mt-1">{errors.personal.summary.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="glass-panel noise-texture rounded-xl p-6 border border-cyan-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-display font-bold text-cyan-400 glow-cyan">
                [ 工作经历 ]
              </h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-500 transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加
              </button>
            </div>
            <Timeline items={[]} />
          </div>
        )}

        {activeTab === 'education' && (
          <div className="glass-panel noise-texture rounded-xl p-6 border border-cyan-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-display font-bold text-cyan-400 glow-cyan">
                [ 教育背景 ]
              </h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-500 transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加
              </button>
            </div>
            <p className="text-white/60 text-sm">点击"添加"按钮添加教育经历（功能开发中）</p>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="glass-panel noise-texture rounded-xl p-6 border border-cyan-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-display font-bold text-cyan-400 glow-cyan">[ 技能树 ]</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-500 transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加
              </button>
            </div>
            <SkillTree />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="glass-panel noise-texture rounded-xl p-6 border border-cyan-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-display font-bold text-cyan-400 glow-cyan">[ 项目 ]</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-500 transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加
              </button>
            </div>
            <p className="text-white/60 text-sm">点击"添加"按钮添加项目（功能开发中）</p>
          </div>
        )}

        {/* Submit Button - Uses useFormStatus */}
        <div className="flex justify-end gap-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
