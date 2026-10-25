import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import { BrandMark } from './BrandMark'
import { LanguageSelector } from './LanguageSelector'

const LINKS: { id: string; key: 'nav.home' | 'nav.about' | 'nav.capabilities' | 'nav.projects' | 'nav.technology' | 'nav.contact' }[] = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'capabilities', key: 'nav.capabilities' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'technology', key: 'nav.technology' },
  { id: 'contact', key: 'nav.contact' },
]

export function Nav() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  const go = (id: string) => {
    setOpen(false)
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const solid = scrolled || open

  return (
    <header
      style={{
        position: 'fixed',
        insetInlineStart: 0,
        insetInlineEnd: 0,
        insetBlockStart: 0,
        zIndex: 'var(--z-nav)',
        transition: 'background var(--dur-2), border-color var(--dur-2), backdrop-filter var(--dur-2)',
        background: solid ? 'rgba(5, 7, 15, 0.82)' : 'transparent',
        borderBottom: solid ? '1px solid var(--line)' : '1px solid transparent',
        backdropFilter: solid ? 'blur(14px)' : 'none',
      }}
    >
      <nav
        aria-label={t('a11y.nav')}
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'clamp(1.25rem, 4vw, 3rem)',
          height: 'var(--nav-h)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--sp-4)',
        }}
      >
        <a href="#home" onClick={(e) => { e.preventDefault(); go('home') }} style={{ display: 'inline-flex' }} aria-label="PRISM home">
          <BrandMark size={30} withWordmark />
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-1)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop"
        >
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                style={{
                  padding: '0.5rem 0.85rem',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--ink-2)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--r-full)',
                  transition: 'color var(--dur-1), background var(--dur-1)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink-1)'; e.currentTarget.style.background = 'var(--surface)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-2)'; e.currentTarget.style.background = 'none' }}
              >
                {t(l.key)}
              </button>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <LanguageSelector compact />
          <button
            type="button"
            className="nav-toggle"
            aria-label={t('a11y.toggleMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <span style={{ width: 22, height: 2, background: 'var(--ink-1)', transition: 'transform var(--dur-2)', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span style={{ width: 22, height: 2, background: 'var(--ink-1)', opacity: open ? 0 : 1 }} />
            <span style={{ width: 22, height: 2, background: 'var(--ink-1)', transition: 'transform var(--dur-2)', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="nav-mobile"
        style={{
          overflow: 'hidden',
          maxHeight: open ? '30rem' : '0',
          transition: 'max-height var(--dur-3) var(--ease-out)',
          borderTop: open ? '1px solid var(--line)' : 'none',
          background: 'rgba(5, 7, 15, 0.95)',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 'var(--sp-3)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'start',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-base)',
                  color: 'var(--ink-1)',
                  background: 'none',
                  border: 'none',
                  borderRadius: 'var(--r-md)',
                  cursor: 'pointer',
                }}
              >
                {t(l.key)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Responsive display: hide desktop links / show toggle on small screens. */}
      <style>{`
        @media (max-width: 860px) {
          .nav-desktop { display: none; }
        }
        @media (min-width: 861px) {
          .nav-toggle { display: none; }
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
