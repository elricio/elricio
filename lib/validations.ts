import { z } from 'zod'

/**
 * 个人基本信息验证 Schema
 */
export const personalInfoSchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(50, '姓名不能超过50个字符'),
  title: z.string().min(1, '职位不能为空').max(100, '职位不能超过100个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().min(1, '电话不能为空').max(20, '电话不能超过20个字符'),
  location: z.string().max(100, '地点不能超过100个字符').optional(),
  website: z.string().url('请输入有效的URL').optional().or(z.literal('')),
  summary: z.string().max(500, '简介不能超过500个字符').optional(),
})

/**
 * 工作经历验证 Schema
 */
export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, '公司名称不能为空'),
  position: z.string().min(1, '职位名称不能为空'),
  startDate: z.string().min(1, '开始日期不能为空'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().max(1000, '描述不能超过1000个字符').optional(),
  achievements: z.array(z.string()).optional(),
})

/**
 * 教育经历验证 Schema
 */
export const educationSchema = z.object({
  id: z.string().optional(),
  school: z.string().min(1, '学校名称不能为空'),
  degree: z.string().min(1, '学位不能为空'),
  field: z.string().min(1, '专业不能为空'),
  startDate: z.string().min(1, '开始日期不能为空'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  gpa: z.string().optional(),
})

/**
 * 技能验证 Schema
 */
export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, '技能名称不能为空'),
  category: z.string().min(1, '技能分类不能为空'),
  level: z.number().min(1).max(100, '技能等级必须在1-100之间'),
})

/**
 * 项目验证 Schema
 */
export const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, '项目名称不能为空'),
  description: z.string().min(1, '项目描述不能为空'),
  technologies: z.array(z.string()).min(1, '至少需要一个技术栈'),
  url: z.string().url('请输入有效的URL').optional().or(z.literal('')),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

/**
 * 完整简历数据验证 Schema
 */
export const resumeSchema = z.object({
  personal: personalInfoSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
  certifications: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, '证书名称不能为空'),
      issuer: z.string().min(1, '颁发机构不能为空'),
      date: z.string().min(1, '颁发日期不能为空'),
      url: z.string().url('请输入有效的URL').optional().or(z.literal('')),
    }),
  ),
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Education = z.infer<typeof educationSchema>
export type Skill = z.infer<typeof skillSchema>
export type Project = z.infer<typeof projectSchema>
export type ResumeData = z.infer<typeof resumeSchema>
