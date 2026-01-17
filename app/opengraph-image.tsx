import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'GEEK-RESUME - 高性能动态简历系统'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// 预加载字体
const fontMono = fetch(
  new URL('https://fonts.gstatic.com/s/spacemono/v10/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2'),
).then((res) => res.arrayBuffer())

const fontDisplay = fetch(
  new URL('https://fonts.gstatic.com/s/spacegrotesk/v16/gyBhwie-09M3-Cw0U32QvGQ.woff2'),
).then((res) => res.arrayBuffer())

export default async function Image() {
  const [fontMonoData, fontDisplayData] = await Promise.all([fontMono, fontDisplay])

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
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
          fontSize: '24px',
          marginBottom: '40px',
          fontFamily: 'Space Mono',
          color: '#ff00ff',
        }}
      >
        <span>$</span>
        <span style={{ color: '#00ffff' }}>./geek-resume --init</span>
        <span
          style={{
            width: '10px',
            height: '24px',
            background: '#00ffff',
            animation: 'blink 1s step-end infinite',
          }}
        />
      </div>

      {/* Main Title */}
      <div
        style={{
          fontSize: '80px',
          fontWeight: 'bold',
          fontFamily: 'Space Grotesk',
          background: 'linear-gradient(90deg, #00ffff 0%, #ffffff 50%, #ff00ff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px',
          letterSpacing: '-3px',
        }}
      >
        GEEK-RESUME
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: '32px',
          color: '#ffffff',
          opacity: 0.8,
          marginBottom: '32px',
          fontFamily: 'Space Mono',
        }}
      >
        高性能动态简历系统
      </div>

      {/* Tech Stack */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '800px',
        }}
      >
        {['Next.js 15', 'React 19', 'Tailwind 4.0', 'Framer Motion'].map((t, i) => (
          <div
            key={t}
            style={{
              padding: '6px 16px',
              border: '1px solid rgba(0,255,255,0.3)',
              borderRadius: '6px',
              background: 'rgba(0,255,255,0.05)',
              color: '#00ffff',
              fontSize: '16px',
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
          fontSize: '16px',
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
}
