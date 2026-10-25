import { useEffect, useMemo, useState } from 'react'
import { useI18n, type Language } from '../i18n'
import { fetchProjects, fetchCategories, type Project, type CategoryInfo } from '../lib/api'
import { Modal, Badge, Spinner, Button } from '../ui'
import { Reveal } from '../components/Reveal'

function localeOf(p: Project, lang: Language) {
  return p.locales.find((l) => l.lang === lang) ?? p.locales.find((l) => l.lang === 'en') ?? p.locales[0]
}

const CAT_ACCENT: Record<string, string> = {
  '04-DATA-Insight-Systems': 'var(--spectrum-1)',
  '04-DATA-Intelligent-Systems': 'var(--spectrum-2)',
  '06-EDGE-Data-Gathering-Systems': 'var(--spectrum-5)',
}

export function Projects() {
  const { t, lang } = useI18n()
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<CategoryInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<string>('all')
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    Promise.all([fetchProjects({ lang }), fetchCategories()])
      .then(([p, c]) => {
        if (!alive) return
        setProjects(p.projects)
        setCategories(c.categories)
        setError(false)
      })
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [lang])

  const catLabel = (key: string) => categories.find((c) => c.key === key)?.labels[lang] ?? key

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return projects.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false
      if (!q) return true
      const loc = localeOf(p, lang)
      return (
        p.slug.toLowerCase().includes(q) ||
        (loc?.name ?? '').toLowerCase().includes(q) ||
        (loc?.short ?? '').toLowerCase().includes(q) ||
        p.technologies.some((x) => x.toLowerCase().includes(q))
      )
    })
  }, [projects, cat, search, lang])

  const open = openSlug ? projects.find((p) => p.slug === openSlug) ?? null : null

  const clearFilters = () => {
    setSearch('')
    setCat('all')
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">{t('proj.eyebrow')}</span>
            <h2 style={{ fontSize: 'var(--text-3xl)' }}>{t('proj.title')}</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-lg)' }}>{t('proj.lede')}</p>
          </div>
        </Reveal>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <label htmlFor="proj-search" className="sr-only">{t('proj.search.placeholder')}</label>
            <input
              id="proj-search"
              type="search"
              className="input"
              placeholder={t('proj.search.placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: '22rem' }}
              aria-label={t('proj.search.placeholder')}
            />
          </div>
          <div role="tablist" aria-label={t('proj.filter.byCategory')} style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
            <CatTab active={cat === 'all'} onClick={() => setCat('all')} label={t('proj.filter.all')} />
            {categories.map((c) => (
              <CatTab key={c.key} active={cat === c.key} onClick={() => setCat(c.key)} label={catLabel(c.key)} />
            ))}
          </div>
        </div>

        <p className="muted" style={{ marginBottom: 'var(--sp-4)', fontSize: 'var(--text-sm)' }} role="status">
          {t('proj.showing', { n: filtered.length, total: projects.length })}
        </p>

        {loading ? (
          <Spinner label={t('common.loading')} />
        ) : error ? (
          <div className="card" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>
            <p className="muted">{t('common.error')}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card" style={{ padding: 'var(--sp-9)', textAlign: 'center' }} role="status">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-2)' }}>{t('proj.empty.title')}</h3>
            <p className="muted" style={{ marginBottom: 'var(--sp-4)' }}>{t('proj.empty.desc')}</p>
            <Button variant="ghost" size="sm" onClick={clearFilters}>{t('proj.empty.clear')}</Button>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(19rem, 1fr))', gap: 'var(--sp-4)' }}>
            {filtered.map((p, i) => {
              const loc = localeOf(p, lang)
              const accent = CAT_ACCENT[p.category] ?? 'var(--accent)'
              return (
                <li key={p.slug} style={{ animation: `prism-rise var(--dur-3) var(--ease-out) both ${Math.min(i * 40, 400)}ms` }}>
                  <button
                    type="button"
                    onClick={() => setOpenSlug(p.slug)}
                    className="card card-hover"
                    style={{ padding: 'var(--sp-5)', height: '100%', textAlign: 'start', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}
                    aria-haspopup="dialog"
                  >
                    <span aria-hidden style={{ position: 'absolute', insetBlockStart: 0, insetInlineStart: 0, width: '100%', height: '3px', background: accent }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-2)' }}>
                      <span className="mono" style={{ fontSize: 'var(--text-xs)', color: accent }}>{catLabel(p.category)}</span>
                      <span style={{ color: 'var(--ink-4)' }} aria-hidden>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                      </span>
                    </div>
                    <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>{loc?.name ?? p.slug}</h3>
                    <p className="muted" style={{ fontSize: 'var(--text-sm)', margin: 0, flex: 1 }}>{loc?.short ?? ''}</p>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-4)' }}>{t('proj.card.details')} →</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Detail modal */}
      <Modal open={!!open} onClose={() => setOpenSlug(null)} title={open ? localeOf(open, lang)?.name ?? open.slug : ''}>
        {open && <ProjectDetail project={open} lang={lang} t={t} catLabel={catLabel} />}
      </Modal>
    </section>
  )
}

function CatTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: 'var(--r-full)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        cursor: 'pointer',
        background: active ? 'var(--accent-soft)' : 'var(--surface)',
        color: active ? 'var(--accent)' : 'var(--ink-2)',
        border: `1px solid ${active ? 'var(--accent-soft)' : 'var(--line)'}`,
        transition: 'all var(--dur-1)',
      }}
    >
      {label}
    </button>
  )
}

function ProjectDetail({ project, lang, t, catLabel }: { project: Project; lang: Language; t: (k: any, v?: Record<string, string | number>) => string; catLabel: (k: string) => string }) {
  const loc = localeOf(project, lang)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', alignItems: 'center' }}>
        <Badge tone="accent">{catLabel(project.category)}</Badge>
        <Badge tone={project.status === 'published' ? 'success' : 'draft'}>
          {project.status === 'published' ? t('proj.status.published') : t('proj.status.draft')}
        </Badge>
        {project.statusNote === 'scaffold' && <Badge>{t('proj.note.scaffold')}</Badge>}
      </div>

      <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-1)' }}>{loc?.short}</p>
      <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{loc?.full}</p>

      <div>
        <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 'var(--sp-2)' }}>{t('proj.detail.source')}</h4>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: 'var(--sp-3)' }}>
          {project.sourceDescription || t('proj.unavailable')}
        </p>
      </div>

      {project.technologies.length > 0 && (
        <div>
          <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 'var(--sp-2)' }}>{t('proj.detail.technologies')}</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
            {project.technologies.map((tech) => (
              <Badge key={tech} className="mono">{tech}</Badge>
            ))}
          </div>
        </div>
      )}

      {project.capabilities.length > 0 && (
        <div>
          <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 'var(--sp-2)' }}>{t('proj.detail.capabilities')}</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
            {project.capabilities.map((cap) => (
              <Badge key={cap} tone="accent">{cap}</Badge>
            ))}
          </div>
        </div>
      )}

      {(project.url || project.repositoryUrl) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)', fontSize: 'var(--text-sm)' }}>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              {project.url} ↗
            </a>
          )}
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              {project.repositoryUrl} ↗
            </a>
          )}
        </div>
      )}
    </div>
  )
}
