import { useEffect, useState } from 'react'
import { useAdminT } from '../../i18n/admin'
import { adminAudit, type AuditEntry } from '../../lib/api'
import { Spinner } from '../../ui'

export function Audit() {
  const at = useAdminT()
  const [rows, setRows] = useState<AuditEntry[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    adminAudit(100)
      .then((r) => alive && setRows(r.audit))
      .catch(() => alive && setError(true))
    return () => { alive = false }
  }, [])

  const fmt = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div>
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-1)' }}>{at('admin.audit.title')}</h1>
      <p className="muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-5)', maxWidth: '46rem' }}>{at('admin.audit.desc')}</p>

      {error ? (
        <p role="alert" style={{ color: 'var(--danger)' }}>{at('admin.common.error')}</p>
      ) : rows === null ? (
        <Spinner label={at('admin.common.loading')} />
      ) : rows.length === 0 ? (
        <p className="muted">{at('admin.audit.empty')}</p>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', minWidth: '52rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line-strong)', textAlign: 'start' }}>
                {(['when', 'actor', 'action', 'target', 'detail'] as const).map((col) => (
                  <th key={col} style={{ padding: '0.75rem 1rem', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', fontWeight: 600 }}>
                    {at(`admin.audit.${col}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '0.6rem 1rem', whiteSpace: 'nowrap', color: 'var(--ink-3)' }}>{fmt(e.created_at)}</td>
                  <td style={{ padding: '0.6rem 1rem', whiteSpace: 'nowrap' }}>{e.actor_email ?? '—'}</td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <span className="mono" style={{ color: 'var(--accent)', fontSize: 'var(--text-xs)' }}>{e.action}</span>
                  </td>
                  <td style={{ padding: '0.6rem 1rem', color: 'var(--ink-3)' }}>{e.target_type ? `${e.target_type}${e.target_id ? ` · ${e.target_id}` : ''}` : '—'}</td>
                  <td style={{ padding: '0.6rem 1rem', color: 'var(--ink-3)' }}>{e.detail ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
