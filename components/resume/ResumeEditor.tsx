'use client'

import { cn } from '@/lib/utils'
import { type ResumeData, resumeSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Save, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SkillTree } from './SkillTree'
import { Timeline } from './Timeline'

export function ResumeEditor() {
  const [activeTab, setActiveTab] = useState<
    'personal' | 'experience' | 'education' | 'skills' | 'projects'
  >('personal')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
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
  })

  const onSubmit = async (data: ResumeData) => {
    console.log('Form submitted:', data)
    // TODO: Implement save functionality
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
              'px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {activeTab === 'personal' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-4">基本信息</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="personal.name" className="block text-sm font-medium mb-1">
                  姓名 *
                </label>
                <input
                  {...register('personal.name')}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  placeholder="张三"
                />
                {errors.personal?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.personal.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="personal.title" className="block text-sm font-medium mb-1">
                  职位 *
                </label>
                <input
                  {...register('personal.title')}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  placeholder="高级前端工程师"
                />
                {errors.personal?.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.personal.title.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="personal.email" className="block text-sm font-medium mb-1">
                  邮箱 *
                </label>
                <input
                  {...register('personal.email')}
                  type="email"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  placeholder="example@email.com"
                />
                {errors.personal?.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.personal.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="personal.phone" className="block text-sm font-medium mb-1">
                  电话 *
                </label>
                <input
                  {...register('personal.phone')}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  placeholder="13800138000"
                />
                {errors.personal?.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.personal.phone.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="personal.location" className="block text-sm font-medium mb-1">
                  地点
                </label>
                <input
                  {...register('personal.location')}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  placeholder="北京"
                />
              </div>
              <div>
                <label htmlFor="personal.website" className="block text-sm font-medium mb-1">
                  个人网站
                </label>
                <input
                  {...register('personal.website')}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  placeholder="https://example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="personal.summary" className="block text-sm font-medium mb-1">
                  个人简介
                </label>
                <textarea
                  {...register('personal.summary')}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 resize-none"
                  placeholder="简要介绍您的职业背景和技能..."
                />
                {errors.personal?.summary && (
                  <p className="text-red-500 text-sm mt-1">{errors.personal.summary.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">工作经历</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加
              </button>
            </div>
            <Timeline items={[]} />
          </div>
        )}

        {activeTab === 'education' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">教育背景</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加
              </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              点击"添加"按钮添加教育经历（功能开发中）
            </p>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">技能树</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加
              </button>
            </div>
            <SkillTree />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">项目</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加
              </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              点击"添加"按钮添加项目（功能开发中）
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors',
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700',
            )}
          >
            <Save className="mr-2 h-5 w-5" />
            {isSubmitting ? '保存中...' : '保存简历'}
          </button>
        </div>
      </form>
    </div>
  )
}
