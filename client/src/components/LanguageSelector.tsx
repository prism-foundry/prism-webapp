import { useState, useEffect, useRef } from 'react'
import { useI18n, LANGUAGES, LANGUAGE_CODES, LANGUAGE_NAMES } from '../i18n'

/** Accessible dropdown to switch between the four languages. */
export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { lang, setLanguage, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('a11y.selectLanguage')}
        onClick={() => setOpen((v) => !v)}
        className="btn btn-ghost"
        style={{ padding: compact ? '0.4rem 0.7rem' : '0.5rem 0.85rem', fontSize: 'var(--text-xs)', gap: '0.4rem' }}
      >
        <span aria-hidden style={{ display: 'inline-flex', gap: '0.25rem', color: 'var(--accent)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
          </svg>
        </span>
        {LANGUAGE_CODES[lang]}
        <span aria-hidden style={{ opacity: 0.7 }}>{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t('a11y.selectLanguage')}
          style={{
            position: 'absolute',
            insetBlockEnd: '110%',
            insetInlineEnd: 0,
            minWidth: '8.5rem',
            marginBlockEnd: '0.35rem',
            background: 'var(--surface-solid)',
            border: '1px solid var(--line-strong)',
            borderRadius: 'var(--r-md)',
            boxShadow: 'var(--shadow-2)',
            padding: '0.3rem',
            listStyle: 'none',
            zIndex: 10,
          }}
        >
          {LANGUAGES.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <button
                type="button"
                onClick={() => {
                  setLanguage(l)
                  setOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.5rem 0.65rem',
                  background: l === lang ? 'var(--accent-soft)' : 'transparent',
                  color: l === lang ? 'var(--accent)' : 'var(--ink-1)',
                  border: 'none',
                  borderRadius: 'var(--r-sm)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                  fontWeight: l === lang ? 700 : 500,
                }}
              >
                <span>{LANGUAGE_NAMES[l]}</span>
                <span className="mono" style={{ opacity: 0.6 }}>{LANGUAGE_CODES[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
