'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Activity, Heart, Star, Zap } from 'lucide-react'
import { useState } from 'react'

export function MotionGallery() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <HoverCard />
      <DragCard />
      <MagneticButton />
      <ProgressAnimation />
      <StaggeredList />
      <ParallaxCard />
    </div>
  )
}

function HoverCard() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

  const springConfig = { stiffness: 100, damping: 10 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  return (
    <motion.div
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="relative"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotateX,
          rotateY,
        }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          'h-48 rounded-2xl p-6',
          'bg-gradient-to-br from-blue-500 to-cyan-500',
          'text-white shadow-xl',
          'cursor-pointer',
        )}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const mouseX = e.clientX - rect.left - centerX
          const mouseY = e.clientY - rect.top - centerY
          x.set(mouseX / centerX)
          y.set(mouseY / centerY)
        }}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Heart className="h-6 w-6" />
          <span className="font-bold text-lg">3D Hover</span>
        </div>
        <p className="text-sm opacity-90">
          移动鼠标查看 3D 倾斜效果，使用 useTransform 和 useSpring 实现
        </p>
      </motion.div>
    </motion.div>
  )
}

function DragCard() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      dragMomentum={true}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ scale: 1.1, rotate: 5 }}
      className={cn(
        'h-48 rounded-2xl p-6',
        'bg-gradient-to-br from-purple-500 to-pink-500',
        'text-white shadow-xl',
        'cursor-grab active:cursor-grabbing',
        isDragging && 'cursor-grabbing',
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <Activity className="h-6 w-6" />
        <span className="font-bold text-lg">拖拽卡片</span>
      </div>
      <p className="text-sm opacity-90">拖拽我！使用 drag 属性和 dragConstraints 实现</p>
    </motion.div>
  )
}

function MagneticButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'h-48 rounded-2xl p-6',
        'bg-gradient-to-br from-orange-500 to-red-500',
        'text-white shadow-xl',
        'flex flex-col items-center justify-center gap-3',
      )}
    >
      <motion.div
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Zap className="h-8 w-8" />
      </motion.div>
      <span className="font-bold text-lg">磁性按钮</span>
      <span className="text-sm opacity-80">悬停时旋转动画</span>
    </motion.button>
  )
}

function ProgressAnimation() {
  const [progress, setProgress] = useState(0)

  return (
    <div className="h-48 rounded-2xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <Star className="h-6 w-6 text-yellow-500" />
        <span className="font-bold text-lg">进度动画</span>
      </div>

      <motion.div
        className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-4"
        onClick={() => setProgress((prev) => (prev >= 100 ? 0 : prev + 25))}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
        />
      </motion.div>

      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>点击进度条更新</span>
        <span className="font-bold">{progress}%</span>
      </div>
    </div>
  )
}

function StaggeredList() {
  const items = ['React 19', 'Next.js 15', 'Tailwind 4', 'Framer Motion']

  return (
    <div className="h-48 rounded-2xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="h-6 w-6 text-green-500" />
        <span className="font-bold text-lg">交错列表</span>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            whileHover={{ x: 5 }}
            className={cn(
              'px-3 py-2 rounded-lg',
              'bg-gradient-to-r from-green-500/10 to-emerald-500/10',
              'text-green-700 dark:text-green-400',
              'border border-green-200 dark:border-green-800',
            )}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ParallaxCard() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const backgroundX = useTransform(x, [-100, 100], ['-10%', '10%'])
  const backgroundY = useTransform(y, [-100, 100], ['-10%', '10%'])

  return (
    <motion.div
      className="h-48 rounded-2xl overflow-hidden relative cursor-pointer"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        style={{
          backgroundPosition: `${backgroundX} ${backgroundY}`,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Content Layer */}
      <motion.div
        className="relative z-10 h-full p-6 flex flex-col justify-end"
        style={{
          x: useTransform(x, (v) => v * 0.1),
          y: useTransform(y, (v) => v * 0.1),
        }}
      >
        <div className="text-white">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5" />
            <span className="font-bold">视差滚动</span>
          </div>
          <p className="text-sm opacity-90">鼠标移动时，背景和内容以不同速度移动</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
