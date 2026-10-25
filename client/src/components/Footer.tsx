import { useI18n, LANGUAGES, LANGUAGE_NAMES, LANGUAGE_CODES } from '../i18n'
import { useSiteContent } from '../lib/useSiteContent'
import { BrandMark } from './BrandMark'
import { Link } from 'react-router-dom'

export function Footer() {
  const { t, lang, setLanguage } = useI18n()
  const { c } = useSiteContent()
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-1)', paddingBlock: 'var(--sp-8) var(--sp-6)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 'var(--sp-6)' }}>
        <div>
          <BrandMark size={30} withWordmark />
          <p className="muted" style={{ marginTop: 'var(--sp-3)', maxWidth: '28rem', fontSize: 'var(--text-sm)' }}>
            {c('footer.tagline', t('footer.tagline'))}
          </p>
          <p className="mono" style={{ marginTop: 'var(--sp-2)', fontSize: 'var(--text-xs)', color: 'var(--ink-4)' }}>
            {t('footer.rights', { year })}
          </p>
        </div>

        <nav aria-label={t('footer.nav')}>
          <h3 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 'var(--sp-3)' }}>
            {t('footer.nav')}
          </h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.5rem' }}>
            {(['about', 'capabilities', 'projects', 'technology', 'contact'] as const).map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(id)
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{ color: 'var(--ink-2)', fontSize: 'var(--text-sm)', transition: 'color var(--dur-1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-2)')}
                >
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 'var(--sp-3)' }}>
            {t('nav.language')}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {LANGUAGES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                aria-pressed={l === lang}
                style={{
                  padding: '0.35rem 0.7rem',
                  fontSize: 'var(--text-xs)',
                  fontWeight: l === lang ? 700 : 500,
                  color: l === lang ? 'var(--accent)' : 'var(--ink-2)',
                  background: l === lang ? 'var(--accent-soft)' : 'var(--surface)',
                  border: `1px solid ${l === lang ? 'var(--accent-soft)' : 'var(--line)'}`,
                  borderRadius: 'var(--r-full)',
                  cursor: 'pointer',
                }}
              >
                {LANGUAGE_NAMES[l]} <span className="mono">{LANGUAGE_CODES[l]}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 'var(--sp-5)' }}>
            <Link to="/admin" style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-4)', transition: 'color var(--dur-1)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-2)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-4)')}>
              {t('footer.admin')}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          footer .container { grid-template-columns: 1fr !important; gap: var(--sp-5) !important; }
        }
      `}</style>
    </footer>
  )
}
