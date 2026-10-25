import { useState, type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useI18n, LANGUAGES, LANGUAGE_NAMES } from '../i18n'
import { useAdminT } from '../i18n/admin'
import { useAdminSession } from './AdminProvider'
import { BrandMark } from '../components/BrandMark'
import { Button } from '../ui'

const NAV = [
  { to: '/admin', key: 'admin.nav.overview' as const, end: true },
  { to: '/admin/projects', key: 'admin.nav.projects' as const },
  { to: '/admin/messages', key: 'admin.nav.messages' as const },
  { to: '/admin/content', key: 'admin.nav.content' as const },
  { to: '/admin/media', key: 'admin.nav.media' as const },
  { to: '/admin/audit', key: 'admin.nav.audit' as const },
  { to: '/admin/settings', key: 'admin.nav.settings' as const },
]

export function AdminShell({ children }: { children: ReactNode }) {
  const { t, lang, setLanguage } = useI18n()
  const at = useAdminT()
  const { admin, logout } = useAdminSession()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const doLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    ['adm-navlink', isActive ? 'is-active' : ''].filter(Boolean).join(' ')

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', background: 'var(--bg-0)' }}>
      <header className="adm-topbar" style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--bg-1)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-3)', padding: '0 clamp(1rem, 3vw, 2rem)', height: '3.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <button className="adm-menu-btn" type="button" aria-label={t('nav.menu')} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
              <span /><span /><span />
            </button>
            <BrandMark size={26} withWordmark />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <span className="muted mono" style={{ fontSize: 'var(--text-xs)' }}>
              {admin && `${at('admin.you')}: ${admin.email}`}
            </span>
            <div role="group" aria-label={t('nav.language')} style={{ display: 'flex', gap: '0.25rem' }}>
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  aria-pressed={l === lang}
                  style={{
                    padding: '0.3rem 0.5rem',
                    fontSize: 'var(--text-xs)',
                    fontWeight: l === lang ? 700 : 500,
                    color: l === lang ? 'var(--accent)' : 'var(--ink-3)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 'var(--r-sm)',
                  }}
                >
                  {LANGUAGE_NAMES[l]}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={doLogout}>{at('admin.logout')}</Button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start' }}>
        {menuOpen && (
          <div aria-hidden onClick={() => setMenuOpen(false)} className="adm-overlay" style={{ position: 'fixed', top: '3.75rem', bottom: 0, left: 0, right: 0, background: 'rgba(3,5,12,0.5)', zIndex: 24 }} />
        )}

        <nav className="adm-sidebar" aria-label={at('admin.title')} data-open={menuOpen ? 'true' : undefined}>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMenuOpen(false)} className={linkCls}>
              {at(item.key)}
            </NavLink>
          ))}
        </nav>

        <main style={{ flex: 1, width: '100%', padding: 'clamp(1.25rem, 3vw, 2.5rem)', minWidth: 0 }}>{children}</main>
      </div>

      <style>{`
        .adm-navlink {
          display: block;
          padding: 0.6rem 0.85rem;
          border-radius: var(--r-md);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--ink-2);
          transition: background var(--dur-1), color var(--dur-1);
        }
        .adm-navlink:hover { background: var(--surface); color: var(--ink-1); }
        .adm-navlink.is-active { background: var(--accent-soft); color: var(--accent); }

        .adm-menu-btn { display: none; flex-direction: column; gap: 4px; background: none; border: none; cursor: pointer; padding: 0.5rem; }
        .adm-menu-btn span { width: 20px; height: 2px; background: var(--ink-1); display: block; }

        .adm-sidebar {
          width: 16rem;
          flex-shrink: 0;
          border-inline-end: 1px solid var(--line);
          background: var(--bg-1);
          padding: var(--sp-4) var(--sp-3);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        @media (max-width: 900px) {
          .adm-menu-btn { display: flex; }
          .adm-sidebar {
            position: fixed;
            top: 3.75rem;
            bottom: 0;
            inset-inline-start: 0;
            z-index: 30;
            overflow-y: auto;
            transform: translateX(-105%);
            transition: transform var(--dur-2) var(--ease-out);
            box-shadow: var(--shadow-2);
          }
          [dir='rtl'] .adm-sidebar { transform: translateX(105%); }
          .adm-sidebar[data-open] { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
