import { Component, Suspense, lazy, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { useSiteContent } from '../lib/useSiteContent'
import { Button } from '../ui'

const Scene3D = lazy(() => import('../hero/Scene3D'))

/** If the WebGL scene throws at runtime (driver limits, context loss, …),
    fall back to the static composition instead of crashing the page. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

/** A pure-CSS/SVG composition used when WebGL is missing or 3D errors out. */
function StaticScene() {
  return (
    <div aria-hidden className="hero-static" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7fd6f2" stopOpacity="0" />
            <stop offset="1" stopColor="#d8f4ff" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7fd6f2" />
            <stop offset="0.5" stopColor="#b79bf0" />
            <stop offset="1" stopColor="#f2a0a0" />
          </linearGradient>
        </defs>
        {/* incoming data stream */}
        <line x1="0" y1="150" x2="360" y2="200" stroke="url(#beam)" strokeWidth="2" />
        {/* prism */}
        <polygon points="400,120 480,260 320,260" fill="none" stroke="#8fd8f2" strokeWidth="1.5" opacity="0.8" />
        <polygon points="400,140 462,250 338,250" fill="rgba(143,216,242,0.08)" />
        {/* refracted spectrum */}
        <line x1="440" y1="200" x2="800" y2="90" stroke="#7fd6f2" strokeWidth="1.5" opacity="0.5" />
        <line x1="440" y1="200" x2="800" y2="150" stroke="#9fb0ff" strokeWidth="1.5" opacity="0.5" />
        <line x1="440" y1="200" x2="800" y2="210" stroke="#b79bf0" strokeWidth="1.5" opacity="0.5" />
        <line x1="440" y1="200" x2="800" y2="270" stroke="#d9a8e8" strokeWidth="1.5" opacity="0.5" />
        <line x1="440" y1="200" x2="800" y2="330" stroke="#f0c48f" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </div>
  )
}

const STREAMS = [
  { key: 'hero.stream.ai' as const, color: 'var(--spectrum-1)' },
  { key: 'hero.stream.data' as const, color: 'var(--spectrum-2)' },
  { key: 'hero.stream.automation' as const, color: 'var(--spectrum-3)' },
  { key: 'hero.stream.predictive' as const, color: 'var(--spectrum-5)' },
]

export function Hero() {
  const { t } = useI18n()
  const { c } = useSiteContent()
  const [reduced, setReduced] = useState(false)
  const glOk = useRef(false)
  if (typeof window !== 'undefined' && !glOk.current) {
    glOk.current = webglAvailable()
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const use3D = glOk.current && !reduced
  const scroll = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }, [reduced])

  return (
    <section
      id="home"
      style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
    >
      {/* Background glows */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1200px 600px at 78% 30%, rgba(143,216,242,0.10), transparent 60%), radial-gradient(900px 500px at 15% 70%, rgba(180,155,234,0.10), transparent 60%)' }} />

      {/* 3D scene layer */}
      <div style={{ position: 'absolute', inset: 0 }} aria-hidden>
        {use3D ? (
          <SceneBoundary fallback={<StaticScene />}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </SceneBoundary>
        ) : (
          <StaticScene />
        )}
      </div>
      {use3D && <style>{`canvas { pointer-events: none; }`}</style>}

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 'var(--nav-h)' }}>
        <div style={{ maxWidth: '46rem' }}>
          <span className="eyebrow" style={{ animation: 'prism-rise var(--dur-4) var(--ease-out) both' }}>
            {t('hero.tagline')}
          </span>

          <h1
            style={{
              fontSize: 'var(--text-hero)',
              fontWeight: 800,
              marginBlock: 'var(--sp-4) var(--sp-3)',
              letterSpacing: '-0.03em',
              animation: 'prism-rise var(--dur-4) var(--ease-out) 80ms both',
            }}
          >
            {c('hero.title', t('hero.title'))}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--ink-2)',
              maxWidth: '34rem',
              animation: 'prism-rise var(--dur-4) var(--ease-out) 160ms both',
            }}
          >
            {c('hero.subtitle', t('hero.subtitle'))}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', marginBlockStart: 'var(--sp-6)', animation: 'prism-rise var(--dur-4) var(--ease-out) 240ms both' }}>
            <Button variant="primary" onClick={() => scroll('projects')}>
              {t('hero.ctaPrimary')}
            </Button>
            <Button variant="ghost" onClick={() => scroll('about')}>
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          {/* Capability stream chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', marginBlockStart: 'var(--sp-7)', animation: 'prism-rise var(--dur-4) var(--ease-out) 320ms both' }}>
            {STREAMS.map((s) => (
              <span key={s.key} className="badge" style={{ borderInlineStart: `2px solid ${s.color}` }}>
                {t(s.key)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!use3D && (
        <p className="muted" style={{ position: 'absolute', insetBlockEnd: '3.5rem', left: 0, right: 0, textAlign: 'center', paddingInline: '1rem', fontSize: 'var(--text-xs)', color: 'var(--ink-4)' }}>
          {t('hero.fallback.note')}
        </p>
      )}

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => scroll('about')}
        aria-label={t('hero.scroll')}
        style={{
          position: 'absolute',
          insetBlockEnd: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--ink-3)',
          fontSize: 'var(--text-xs)',
          zIndex: 2,
          animation: 'prism-float 3s ease-in-out infinite',
        }}
      >
        <span style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t('hero.scroll')}</span>
        <span aria-hidden>↓</span>
      </button>
    </section>
  )
}
