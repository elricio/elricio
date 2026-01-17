import { motion } from 'framer-motion'

interface TerminalBackgroundProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function TerminalBackground({
  className = '',
  intensity = 'medium',
}: TerminalBackgroundProps) {
  const intensityMap = {
    low: 'opacity-20',
    medium: 'opacity-30',
    high: 'opacity-50',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.03)_0%,transparent_70%)]" />

      {/* Diagonal lines */}
      <div className={`absolute inset-0 ${intensityMap[intensity]} noise-texture`} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-magenta-500/10 to-transparent" />
    </motion.div>
  )
}
