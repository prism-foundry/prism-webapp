import { useEffect, useState } from 'react'
import { useAdminT } from '../../i18n/admin'
import { useAdminSession } from '../AdminProvider'
import {
  adminMessages, adminSetMessageStatus, adminDeleteMessage,
  type ContactMessage,
} from '../../lib/api'
import { Badge, Button, Modal, Spinner, toast } from '../../ui'

type MsgStatus = 'unread' | 'read' | 'resolved' | 'archived'
const FILTERS: (MsgStatus | 'all')[] = ['all', 'unread', 'read', 'resolved', 'archived']
const TONE: Record<MsgStatus, 'accent' | 'default' | 'success' | 'draft'> = {
  unread: 'accent', read: 'default', resolved: 'success', archived: 'draft',
}

export function Messages() {
  const at = useAdminT()
  const { csrf } = useAdminSession()
  const [messages, setMessages] = useState<ContactMessage[] | null>(null)
  const [error, setError] = useState(false)
  const [filter, setFilter] = useState<MsgStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useState('')
  const [open, setOpen] = useState<number | null>(null)
  const [toDelete, setToDelete] = useState<ContactMessage | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search.trim()), 300)
    return () => clearTimeout(id)
  }, [search])

  const load = () => {
    adminMessages({ status: filter === 'all' ? undefined : filter, search: debounced || undefined })
      .then((r) => setMessages(r.messages))
      .catch(() => setError(true))
  }
  useEffect(() => { load() }, [filter, debounced])

  const setStatus = async (m: ContactMessage, status: MsgStatus) => {
    try {
      await adminSetMessageStatus(m.id, status, csrf)
      toast(at('admin.messages.updated'), 'success')
      setMessages((list) => (list ? list.map((x) => (x.id === m.id ? { ...x, status } : x)) : list))
    } catch {
      toast(at('admin.common.error'), 'error')
    }
  }

  const doDelete = async () => {
    if (!toDelete) return
    setBusy(true)
    try {
      await adminDeleteMessage(toDelete.id, csrf)
      toast(at('admin.messages.updated'), 'success')
      setToDelete(null)
      setMessages((list) => (list ? list.filter((x) => x.id !== toDelete.id) : list))
    } catch {
      toast(at('admin.common.error'), 'error')
    } finally {
      setBusy(false)
    }
  }

  const fmt = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  const unreadCount = messages?.filter((m) => m.status === 'unread').length ?? 0

  return (
    <div>
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-5)' }}>{at('admin.messages.title')}</h1>

      <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              style={{
                padding: '0.4rem 0.8rem', fontSize: 'var(--text-xs)', fontWeight: 600,
                borderRadius: 'var(--r-full)', cursor: 'pointer',
                border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--line)'}`,
                background: filter === f ? 'var(--accent-soft)' : 'transparent',
                color: filter === f ? 'var(--accent)' : 'var(--ink-3)',
              }}
            >
              {f === 'all' ? at('admin.messages.all') : at(`admin.messages.status.${f}`)}
              {f === 'unread' && unreadCount > 0 && <span className="mono"> {unreadCount}</span>}
            </button>
          ))}
        </div>
        <input
          className="input"
          style={{ flex: '1 1 14rem', minWidth: '12rem' }}
          placeholder={at('admin.messages.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error ? (
        <p role="alert" style={{ color: 'var(--danger)' }}>{at('admin.common.error')}</p>
      ) : messages === null ? (
        <Spinner label={at('admin.common.loading')} />
      ) : messages.length === 0 ? (
        <p className="muted">{at('admin.messages.empty')}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {messages.map((m) => {
            const expanded = open === m.id
            const archived = m.status === 'archived'
            return (
              <div key={m.id} className="card" style={{ padding: 'var(--sp-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-4)', flexWrap: 'wrap', cursor: 'pointer' }}
                     onClick={() => setOpen(expanded ? null : m.id)}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600 }}>{m.name}</span>
                      <span className="muted" style={{ fontSize: 'var(--text-xs)' }}>{m.email}</span>
                      <Badge tone={TONE[m.status]}>{at(`admin.messages.status.${m.status as MsgStatus}`)}</Badge>
                    </div>
                    <div className="muted" style={{ fontSize: 'var(--text-xs)', marginTop: '0.25rem' }}>
                      {m.company && `${at('admin.messages.company')}: ${m.company} · `}
                      {m.project_type && `${at('admin.messages.type')}: ${m.project_type} · `}
                      {fmt(m.created_at)}
                    </div>
                  </div>
                  <span className="muted" style={{ fontSize: 'var(--text-xs)', alignSelf: 'center' }}>{expanded ? '▲' : '▼'}</span>
                </div>

                {expanded && (
                  <div style={{ marginTop: 'var(--sp-4)' }}>
                    <p style={{ whiteSpace: 'pre-wrap', fontSize: 'var(--text-sm)', color: 'var(--ink-2)', margin: '0 0 var(--sp-3)' }}>{m.message}</p>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {m.status !== 'read' && <Button variant="outline" size="sm" onClick={() => setStatus(m, 'read')}>{at('admin.messages.markRead')}</Button>}
                      {m.status === 'read' && <Button variant="outline" size="sm" onClick={() => setStatus(m, 'unread')}>{at('admin.messages.markUnread')}</Button>}
                      {m.status !== 'resolved' && <Button variant="outline" size="sm" onClick={() => setStatus(m, 'resolved')}>{at('admin.messages.resolve')}</Button>}
                      {!archived
                        ? <Button variant="ghost" size="sm" onClick={() => setStatus(m, 'archived')}>{at('admin.messages.archive')}</Button>
                        : <Button variant="ghost" size="sm" onClick={() => setStatus(m, 'read')}>{at('admin.messages.restore')}</Button>}
                      <Button variant="danger" size="sm" onClick={() => setToDelete(m)}>{at('admin.messages.delete')}</Button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title={at('admin.messages.delete')}>
        <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-5)' }}>{at('admin.messages.deleteConfirm')}</p>
        <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setToDelete(null)}>{at('admin.common.cancel')}</Button>
          <Button variant="danger" loading={busy} onClick={doDelete}>{at('admin.common.confirm')}</Button>
        </div>
      </Modal>
    </div>
  )
}
