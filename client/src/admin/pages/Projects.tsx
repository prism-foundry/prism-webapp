import { useEffect, useState } from 'react'
import { useAdminT } from '../../i18n/admin'
import { useAdminSession } from '../AdminProvider'
import {
  adminProjects, adminSetProjectStatus, adminDeleteProject,
  type Project,
} from '../../lib/api'
import { Badge, Button, Modal, Spinner, toast } from '../../ui'
import { ProjectForm } from './ProjectForm'

const CATEGORIES = [
  '04-DATA-Insight-Systems',
  '04-DATA-Intelligent-Systems',
  '06-EDGE-Data-Gathering-Systems',
]
const CAT_SHORT: Record<string, string> = {
  '04-DATA-Insight-Systems': 'Insight',
  '04-DATA-Intelligent-Systems': 'Intelligent',
  '06-EDGE-Data-Gathering-Systems': 'Edge',
}

export function Projects() {
  const at = useAdminT()
  const { csrf } = useAdminSession()
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useState('')
  const [status, setStatus] = useState('')
  const [form, setForm] = useState<{ mode: 'new' } | { mode: 'edit'; project: Project } | null>(null)
  const [toDelete, setToDelete] = useState<Project | null>(null)
  const [busy, setBusy] = useState(false)

  // Debounce the search box so we don't fire a request per keystroke.
  useEffect(() => {
    const id = setTimeout(() => setDebounced(search.trim()), 300)
    return () => clearTimeout(id)
  }, [search])

  const load = () => {
    adminProjects({ limit: 200, search: debounced || undefined, status: status || undefined })
      .then((r) => setProjects(r.projects))
      .catch(() => setError(true))
  }
  useEffect(() => { load() }, [debounced, status])

  const toggleStatus = async (p: Project) => {
    const next = p.status === 'published' ? 'draft' : 'published'
    try {
      await adminSetProjectStatus(p.slug, next, csrf)
      toast(at('admin.projects.statusChanged'), 'success')
      setProjects((list) => (list ? list.map((x) => (x.id === p.id ? { ...x, status: next as Project['status'] } : x)) : list))
    } catch {
      toast(at('admin.projects.error'), 'error')
    }
  }

  const doDelete = async () => {
    if (!toDelete) return
    setBusy(true)
    try {
      await adminDeleteProject(toDelete.slug, csrf)
      toast(at('admin.projects.deleted'), 'success')
      setToDelete(null)
      setProjects((list) => (list ? list.filter((x) => x.id !== toDelete.id) : list))
    } catch {
      toast(at('admin.projects.error'), 'error')
    } finally {
      setBusy(false)
    }
  }

  const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' })
  const name = (p: Project) => p.locales.find((l) => l.lang === 'en')?.name ?? p.slug

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap', marginBottom: 'var(--sp-5)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>{at('admin.projects.title')}</h1>
        <Button variant="primary" onClick={() => setForm({ mode: 'new' })}>+ {at('admin.projects.add')}</Button>
      </div>

      <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)', flexWrap: 'wrap' }}>
        <input
          className="input"
          style={{ flex: '1 1 16rem', minWidth: '14rem' }}
          placeholder={at('admin.projects.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select"
          style={{ flex: '0 1 auto', minWidth: '11rem' }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label={at('admin.projects.status')}
        >
          <option value="">{at('admin.projects.allStatus')}</option>
          <option value="published">{at('admin.overview.published')}</option>
          <option value="draft">{at('admin.overview.drafts')}</option>
        </select>
      </div>

      {error ? (
        <p role="alert" style={{ color: 'var(--danger)' }}>{at('admin.common.error')}</p>
      ) : projects === null ? (
        <Spinner label={at('admin.common.loading')} />
      ) : projects.length === 0 ? (
        <p className="muted">{at('admin.overview.empty')}</p>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', minWidth: '56rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line-strong)', textAlign: 'start' }}>
                {[at('admin.projects.slug'), at('admin.projects.category'), at('admin.projects.status'), at('admin.projects.updated'), at('admin.projects.actions')].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', fontWeight: 600, textAlign: 'start' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div style={{ fontWeight: 600 }}>{name(p)}</div>
                    <div className="mono muted" style={{ fontSize: 'var(--text-xs)' }}>{p.slug}</div>
                  </td>
                  <td style={{ padding: '0.6rem 1rem', color: 'var(--ink-2)' }}>{CAT_SHORT[p.category] ?? p.category}</td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <Badge tone={p.status === 'published' ? 'success' : 'draft'}>{p.status === 'published' ? at('admin.overview.published') : at('admin.overview.drafts')}</Badge>
                  </td>
                  <td style={{ padding: '0.6rem 1rem', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{fmt(p.updatedAt)}</td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <Button variant="ghost" size="sm" onClick={() => setForm({ mode: 'edit', project: p })}>{at('admin.projects.edit')}</Button>
                      <Button variant="outline" size="sm" onClick={() => toggleStatus(p)}>{p.status === 'published' ? at('admin.projects.unpublish') : at('admin.projects.publish')}</Button>
                      <Button variant="danger" size="sm" onClick={() => setToDelete(p)}>{at('admin.projects.delete')}</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {form && (
        <ProjectForm
          mode={form.mode}
          project={form.mode === 'edit' ? form.project : undefined}
          categories={CATEGORIES}
          onClose={() => setForm(null)}
          onSaved={() => { setForm(null); load() }}
        />
      )}

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title={at('admin.projects.delete')}>
        <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-5)' }}>{at('admin.projects.deleteConfirm')}</p>
        <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setToDelete(null)}>{at('admin.common.cancel')}</Button>
          <Button variant="danger" loading={busy} onClick={doDelete}>{at('admin.common.confirm')}</Button>
        </div>
      </Modal>
    </div>
  )
}
