import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { fetchProjects, type Project } from '../lib/api'
import { Reveal } from '../components/Reveal'
import { Badge } from '../ui'

interface TechRow {
  name: string
  count: number
}

export function Technology() {
  const { t, lang } = useI18n()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    fetchProjects({ lang })
      .then((r) => alive && setProjects(r.projects))
      .catch(() => undefined)
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [lang])

  // Aggregate technologies that are explicitly named on at least one project.
  // No decorative logos, no technologies we have no source backing for.
  const techs = useMemo<TechRow[]>(() => {
    const map = new Map<string, number>()
    for (const p of projects) {
      for (const tech of p.technologies) {
        const key = tech.trim()
        if (!key) continue
        map.set(key, (map.get(key) ?? 0) + 1)
      }
    }
    return [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
  }, [projects])

  return (
    <section id="technology" className="section" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">{t('tech.eyebrow')}</span>
            <h2 style={{ fontSize: 'var(--text-3xl)' }}>{t('tech.title')}</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-lg)' }}>{t('tech.lede')}</p>
          </div>
        </Reveal>

        {loading ? (
          <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{t('common.loading')}</p>
        ) : (
          <Reveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {techs.map((tech) => (
                <Badge key={tech.name} className="mono" style={{ padding: '0.4rem 0.8rem' }} title={`${tech.count} ${tech.count === 1 ? 'project' : 'projects'}`}>
                  {tech.name}
                  <span style={{ opacity: 0.5 }}>·{tech.count}</span>
                </Badge>
              ))}
            </div>
            <p className="muted" style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--text-xs)' }}>{t('tech.note')}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
