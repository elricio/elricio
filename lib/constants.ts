/**
 * 应用常量配置
 */

export const SITE_CONFIG = {
  name: 'Geek-Resume',
  description: '高性能动态简历系统',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'Geek-Resume Team',
} as const

export const RESUME_TEMPLATES = [
  {
    id: 'modern',
    name: '现代简约',
    description: '适合科技行业，强调技能与项目',
  },
  {
    id: 'classic',
    name: '经典专业',
    description: '适合传统行业，强调经验与成就',
  },
  {
    id: 'creative',
    name: '创意设计',
    description: '适合设计岗位，强调视觉与交互',
  },
] as const

export const SKILL_CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Design', 'Soft Skills'] as const

export const DEFAULT_RESUME_DATA = {
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
} as const
