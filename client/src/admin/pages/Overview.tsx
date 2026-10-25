import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminT } from '../../i18n/admin'
import { adminOverview, fetchCategories, type AdminOverview } from '../../lib/api'
import { Badge, Spinner } from '../../ui'

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="card" style={{ padding: 'var(--sp-5)' }}>
      <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: accent ? 'var(--accent)' : 'var(--ink-1)' }}>
        {value}
      </div>
      <div className="muted" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--sp-1)' }}>{label}</div>
    </div>
  )
}

export function Overview() {
  const at = useAdminT()
  const [data, setData] = useState<AdminOverview | null>(null)
  const [cats, setCats] = useState<Record<string, string>>({})
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    fetchCategories()
      .then((r) => {
        if (!alive) return
        const map: Record<string, string> = {}
        for (const c of r.categories) map[c.key] = c.labels.en
        setCats(map)
      })
      .catch(() => {})
    adminOverview()
      .then((d) => alive && setData(d))
      .catch(() => alive && setError(true))
    return () => { alive = false }
  }, [])

  if (error) return <p role="alert" style={{ color: 'var(--danger)' }}>{at('admin.common.error')}</p>
  if (!data) return <Spinner label={at('admin.common.loading')} />

  const maxCat = Math.max(1, ...data.byCat.map((c) => c.c))
  const fmt = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div style={{ maxWidth: '64rem' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)' }}>{at('admin.overview.title')}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-7)' }}>
        <StatCard label={at('admin.overview.projects')} value={data.total} />
        <StatCard label={at('admin.overview.published')} value={data.published} accent />
        <StatCard label={at('admin.overview.drafts')} value={data.drafts} />
        <StatCard label={at('admin.overview.messages')} value={data.unreadMessages} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(22rem, 1fr))', gap: 'var(--sp-6)' }}>
        <section className="card" style={{ padding: 'var(--sp-5)' }}>
          <h2 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--sp-4)' }}>{at('admin.overview.byCategory')}</h2>
          {data.byCat.length === 0 ? (
            <p className="muted">{at('admin.overview.empty')}</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {data.byCat.map((c) => (
                <li key={c.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: '0.35rem' }}>
                    <span>{cats[c.category] ?? c.category}</span>
                    <span className="mono muted">{c.c}</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--surface)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(c.c / maxCat) * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: '3px' }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card" style={{ padding: 'var(--sp-5)' }}>
          <h2 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--sp-4)' }}>{at('admin.overview.recent')}</h2>
          {data.recent.length === 0 ? (
            <p className="muted">{at('admin.overview.empty')}</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
              <tbody>
                {data.recent.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '0.5rem 0' }}>
                      <Link to="/admin/projects" style={{ color: 'var(--accent)' }}>{r.slug}</Link>
                    </td>
                    <td style={{ padding: '0.5rem 0', textAlign: 'end', whiteSpace: 'nowrap' }}>
                      <Badge tone={r.status === 'published' ? 'success' : 'draft'}>
                        {r.status === 'published' ? at('admin.overview.published') : at('admin.overview.drafts')}
                      </Badge>
                      <span className="muted" style={{ display: 'block', fontSize: 'var(--text-xs)', marginTop: '0.2rem' }}>{fmt(r.updated_at)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  )
}
