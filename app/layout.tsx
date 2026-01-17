import type { Metadata } from 'next'
import '@/styles/globals.css'

// 使用系统字体栈，避免 Turbopack Google Fonts 加载问题
const inter = {
  variable: '--font-sans',
  style: { fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }
}

export const metadata: Metadata = {
  title: {
    default: 'Geek-Resume | 高性能动态简历系统',
    template: '%s | Geek-Resume',
  },
  description: '基于 Next.js 15 + React 19 的高性能动态简历系统',
  authors: [{ name: 'Geek-Resume Team' }],
  keywords: ['简历', '动态简历', 'Next.js', 'React', 'TypeScript'],
  creator: 'Geek-Resume Team',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Geek-Resume | 高性能动态简历系统',
    description: '基于 Next.js 15 + React 19 的高性能动态简历系统',
    siteName: 'Geek-Resume',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geek-Resume | 高性能动态简历系统',
    description: '基于 Next.js 15 + React 19 的高性能动态简历系统',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.variable} style={inter.style}>{children}</body>
    </html>
  )
}
