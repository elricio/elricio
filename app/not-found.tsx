import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full mx-4 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-2">页面未找到</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">您访问的页面不存在或已被移除</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
