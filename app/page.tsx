'use client'

import { TerminalBackground } from '@/components/ui/TerminalBackground'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Cpu, Download, FileText, Layout, Network, Terminal, Zap } from 'lucide-react'
import Link from 'next/link'

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
  glow,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay: number
  glow?: 'cyan' | 'magenta'
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.6,
      delay: delay * 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }}
    whileHover={{
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 },
    }}
    className={cn(
      'glass-panel noise-texture relative overflow-hidden rounded-lg p-6',
      'border border-cyan-500/20 hover:border-cyan-500/50',
      'transition-all duration-300',
      glow === 'cyan' && 'hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]',
      glow === 'magenta' && 'hover:shadow-[0_0_30px_rgba(255,0,255,0.3)]',
    )}
  >
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-transparent" />
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-magenta-500/20 to-transparent" />

    <Icon
      className={cn(
        'h-10 w-10 mb-4',
        glow === 'cyan' && 'text-cyan-400 glow-cyan',
        glow === 'magenta' && 'text-magenta-400 glow-magenta',
        !glow && 'text-white/80',
      )}
    />
    <h3
      className={cn(
        'text-lg font-display font-bold mb-2',
        glow === 'cyan' && 'text-cyan-400',
        glow === 'magenta' && 'text-magenta-400',
        !glow && 'text-white',
      )}
    >
      {title}
    </h3>
    <p className="text-sm text-white/60 leading-relaxed">{description}</p>
  </motion.div>
)

const TechBadge = ({ tech, index }: { tech: string; index: number }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4,
      delay: index * 0.05,
      type: 'spring',
      stiffness: 200,
    }}
    whileHover={{
      scale: 1.1,
      backgroundColor: 'rgba(0, 255, 255, 0.2)',
      transition: { duration: 0.2 },
    }}
    className={cn(
      'px-4 py-2 rounded-full text-sm font-mono font-medium',
      'border border-cyan-500/30 text-cyan-300',
      'bg-black/40 backdrop-blur-sm',
      'hover:border-cyan-400 hover:text-cyan-200',
      'transition-all duration-200 cursor-default',
    )}
  >
    {tech}
  </motion.span>
)

const HeroButton = ({
  href,
  children,
  variant,
  icon: Icon,
}: {
  href: string
  children: React.ReactNode
  variant: 'primary' | 'secondary'
  icon: React.ElementType
}) => (
  <Link href={href} className="relative group">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative z-10 flex items-center justify-center gap-2 px-8 py-4 font-display font-bold text-lg',
        'rounded-lg border transition-all duration-300 overflow-hidden',
        variant === 'primary' && [
          'bg-cyan-500/10 border-cyan-500/50 text-cyan-400',
          'hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300',
          'hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]',
        ],
        variant === 'secondary' && [
          'bg-magenta-500/10 border-magenta-500/50 text-magenta-400',
          'hover:bg-magenta-500/20 hover:border-magenta-400 hover:text-magenta-300',
          'hover:shadow-[0_0_30px_rgba(255,0,255,0.4)]',
        ],
      )}
    >
      <Icon className="h-5 w-5" />
      {children}
      {/* Scanline effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-500" />
    </motion.div>
    {/* Glow border */}
    <div
      className={cn(
        'absolute inset-0 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
        variant === 'primary' && 'bg-cyan-500/30',
        variant === 'secondary' && 'bg-magenta-500/30',
      )}
    />
  </Link>
)

export default function HomePage() {
  return (
    <>
      <TerminalBackground intensity="medium" />
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-24 overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-10 diagonal-float"
        >
          <Terminal className="h-32 w-32 text-cyan-500/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 right-10 diagonal-float"
          style={{ animationDelay: '2s' }}
        >
          <Cpu className="h-32 w-32 text-magenta-500/20" />
        </motion.div>

        {/* Hero Section */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex items-center justify-center gap-2 font-mono text-cyan-400 text-sm md:text-base"
          >
            <span className="text-magenta-400">$</span>
            <span>./geek-resume --init</span>
            <span className="cursor-blink" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 80 }}
            className={cn(
              'text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6',
              'bg-gradient-to-r from-cyan-400 via-white to-magenta-400',
              'bg-clip-text text-transparent chromatic',
            )}
          >
            GEEK-RESUME
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={cn(
              'text-lg md:text-xl lg:text-2xl mb-12 font-mono',
              'text-white/70 tracking-wide',
            )}
          >
            <span className="text-cyan-400">&gt;</span> 高性能动态简历系统
            <span className="text-white/40"> | </span>
            Next.js 15 + React 19
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <HeroButton href="/resume/edit" variant="primary" icon={FileText}>
              创建简历
            </HeroButton>
            <HeroButton href="/resume/demo" variant="secondary" icon={Layout}>
              查看示例
            </HeroButton>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            <FeatureCard
              icon={Zap}
              title="极致性能"
              description="基于 React 19 并发渲染，毫秒级响应"
              delay={0}
              glow="cyan"
            />
            <FeatureCard
              icon={Layout}
              title="灵活布局"
              description="支持多种模板，自定义主题"
              delay={1}
              glow="magenta"
            />
            <FeatureCard
              icon={Download}
              title="多格式导出"
              description="支持 PDF、PNG、HTML 导出"
              delay={2}
              glow="cyan"
            />
            <FeatureCard
              icon={Network}
              title="动态更新"
              description="实时编辑，即时预览"
              delay={3}
              glow="magenta"
            />
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className={cn(
              'glass-panel noise-texture rounded-xl p-6 md:p-8',
              'border border-cyan-500/20',
            )}
          >
            <h2
              className={cn(
                'text-xl md:text-2xl font-display font-bold mb-6',
                'text-cyan-400 glow-cyan',
              )}
            >
              [ TECH_STACK ]
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Next.js 15',
                'React 19',
                'TypeScript',
                'Tailwind 4.0',
                'Framer Motion',
                'Shadcn/UI',
                'Biome',
                'Vitest',
                'Playwright',
              ].map((tech, index) => (
                <TechBadge key={tech} tech={tech} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Terminal Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center font-mono text-xs text-white/30"
        >
          <span className="text-cyan-400">$</span>&nbsp;System ready. Press any key to continue...
        </motion.div>
      </main>
    </>
  )
}
