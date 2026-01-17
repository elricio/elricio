import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export const dynamic = 'force-dynamic'

// 预加载字体
const fontMono = fetch(
  new URL('https://fonts.gstatic.com/s/spacemono/v10/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2'),
).then((res) => res.arrayBuffer())

const fontDisplay = fetch(
  new URL('https://fonts.gstatic.com/s/spacegrotesk/v16/gyBhwie-09M3-Cw0U32QvGQ.woff2'),
).then((res) => res.arrayBuffer())

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'GEEK-RESUME'
    const subtitle = searchParams.get('subtitle') || '高性能动态简历系统'
    const tech = searchParams.get('tech') || 'Next.js 15 + React 19'

    const [fontMonoData, fontDisplayData] = await Promise.all([fontMono, fontDisplay])

    return new ImageResponse(
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Space Mono',
          color: '#00ffff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `repeating-linear-gradient(
                0deg,
                rgba(0, 255, 255, 0.03) 0px,
                rgba(0, 255, 255, 0.03) 1px,
                transparent 1px,
                transparent 20px
              )`,
          }}
        />

        {/* Corner Accents */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(0,255,255,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'linear-gradient(315deg, rgba(255,0,255,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Terminal Prompt */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '28px',
            marginBottom: '40px',
            fontFamily: 'Space Mono',
            color: '#ff00ff',
          }}
        >
          <span>$</span>
          <span style={{ color: '#00ffff' }}>./geek-resume --og</span>
          <span
            style={{
              width: '12px',
              height: '28px',
              background: '#00ffff',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: 'bold',
            fontFamily: 'Space Grotesk',
            background: 'linear-gradient(90deg, #00ffff 0%, #ffffff 50%, #ff00ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            letterSpacing: '-4px',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '36px',
            color: '#ffffff',
            opacity: 0.8,
            marginBottom: '32px',
            fontFamily: 'Space Mono',
          }}
        >
          {subtitle}
        </div>

        {/* Tech Stack */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '900px',
          }}
        >
          {tech.split(' + ').map((t, i) => (
            <div
              key={t}
              style={{
                padding: '8px 20px',
                border: '1px solid rgba(0,255,255,0.3)',
                borderRadius: '8px',
                background: 'rgba(0,255,255,0.05)',
                color: '#00ffff',
                fontSize: '20px',
                fontFamily: 'Space Mono',
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Bottom Line */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'Space Mono',
          }}
        >
          System ready. Press any key to continue...
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Space Mono',
            data: fontMonoData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Space Grotesk',
            data: fontDisplayData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    )
  } catch (error) {
    console.error('OG Image generation error:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
