import type { NextConfig } from 'next'

const config: NextConfig = {
  // Turbopack for faster development builds
  experimental: {
    ppr: false,
    reactCompiler: false,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot', 'framer-motion'],
  },

  // TypeScript options
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint options
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024, 1200],
  },

  // Generate source maps for debugging
  productionBrowserSourceMaps: false,

  // Enable trailing slashes for SEO
  trailingSlash: false,

  // Base path (for deployment)
  basePath: '',

  // Custom webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Enable source maps in development
    if (dev) {
      config.devtool = 'eval-source-map'
    }

    // Optimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      // Optional: If you want to exclude unused ICU data
      // In production, you can use `next/bundle-analyzer` for analysis
    }

    return config
  },

  // Generate build ID
  generateBuildId: async () => {
    const id = process.env.GITHUB_SHA || 'dev-build'
    return `${id.substring(0, 8)}-${Date.now()}`
  },

  // HTTP headers for security
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), payment=()',
        },
      ],
    },
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=60, stale-while-revalidate=120',
        },
      ],
    },
  ],

  // Redirects
  redirects: async () => [
    {
      source: '/resume',
      destination: '/resume/edit',
      permanent: true,
    },
  ],

  // Rewrites (for API proxying if needed)
  rewrites: async () => [],

  // Export options (for static export if needed)
  // output: 'standalone', // Disabled on Windows due to symlink permissions

  // Generate ETags for HTTP caching
  generateEtags: true,

  // Enable compression
  compress: true,

  // Disable powered-by header
  poweredByHeader: false,

  // React Strict Mode (keep enabled for development)
  reactStrictMode: true,

  // Transpile packages if needed
  transpilePackages: ['lucide-react', '@radix-ui/react-slot'],

  // Env variables
  env: {
    CUSTOM_ENV: process.env.CUSTOM_ENV || 'development',
  },

  // Cache configuration for production
  cacheMaxMemorySize: 512 * 1024 * 1024, // 512MB
}

export default config
