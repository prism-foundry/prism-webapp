import { useEffect, useState } from 'react'
import { useAdminT } from '../../i18n/admin'
import { LANGUAGES, LANGUAGE_CODES, type Language } from '../../i18n'
import { useAdminSession } from '../AdminProvider'
import { adminSettings, adminSaveSettings } from '../../lib/api'
import { Button, Modal, Spinner, toast } from '../../ui'

type Overrides = Record<string, Partial<Record<Language, string>>>

export function Content() {
  const at = useAdminT()
  const { csrf } = useAdminSession()
  const [defaults, setDefaults] = useState<Record<string, Record<Language, string>> | null>(null)
  const [overrides, setOverrides] = useState<Overrides>({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    let alive = true
    adminSettings()
      .then((r) => { if (alive) { setDefaults(r.defaults); setOverrides(r.overrides) } })
      .catch(() => alive && setError(true))
    return () => { alive = false }
  }, [])

  const value = (key: string, lang: Language) => overrides[key]?.[lang] ?? ''
  const setVal = (key: string, lang: Language, v: string) =>
    setOverrides((prev) => ({ ...prev, [key]: { ...prev[key], [lang]: v } }))

  const save = async () => {
    const next: Overrides = {}
    for (const [key, langs] of Object.entries(overrides)) {
      const clean: Partial<Record<Language, string>> = {}
      for (const lang of LANGUAGES) {
        const v = (langs[lang] ?? '').trim()
        if (v) clean[lang] = v
      }
      if (Object.keys(clean).length) next[key] = clean
    }
    setBusy(true)
    try {
      await adminSaveSettings(next, csrf)
      toast(at('admin.content.saved'), 'success')
    } catch {
      toast(at('admin.common.error'), 'error')
    } finally {
      setBusy(false)
    }
  }

  const reset = async () => {
    setBusy(true)
    try {
      await adminSaveSettings({}, csrf)
      setOverrides({})
      toast(at('admin.content.resetDone'), 'success')
    } catch {
      toast(at('admin.common.error'), 'error')
    } finally {
      setBusy(false)
      setConfirmReset(false)
    }
  }

  if (error) return <p role="alert" style={{ color: 'var(--danger)' }}>{at('admin.common.error')}</p>
  if (!defaults) return <Spinner label={at('admin.common.loading')} />

  const keys = Object.keys(defaults)

  return (
    <div>
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-1)' }}>{at('admin.content.title')}</h1>
      <p className="muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-5)', maxWidth: '52rem' }}>{at('admin.content.desc')}</p>

      <div className="card" style={{ padding: 'var(--sp-4)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '52rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem 0.75rem', fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--ink-3)', textAlign: 'start', fontWeight: 600 }} />
              {LANGUAGES.map((l) => (
                <th key={l} style={{ padding: '0.5rem 0.75rem', fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--ink-3)', textAlign: 'start', fontWeight: 600, width: '22%' }}>
                  {LANGUAGE_CODES[l]} · {at('admin.content.language')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '0.5rem 0.75rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                  <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>{key}</span>
                </td>
                {LANGUAGES.map((l) => (
                  <td key={l} style={{ padding: '0.5rem 0.5rem' }}>
                    <input
                      className="input"
                      dir={l === 'fa' ? 'rtl' : 'ltr'}
                      value={value(key, l)}
                      placeholder={defaults[key][l]}
                      onChange={(e) => setVal(key, l, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-5)', flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={save} loading={busy}>{at('admin.content.save')}</Button>
        <Button variant="ghost" onClick={() => setConfirmReset(true)}>{at('admin.content.reset')}</Button>
      </div>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title={at('admin.content.reset')}>
        <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-5)' }}>{at('admin.content.resetConfirm')}</p>
        <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setConfirmReset(false)}>{at('admin.common.cancel')}</Button>
          <Button variant="danger" loading={busy} onClick={reset}>{at('admin.common.confirm')}</Button>
        </div>
      </Modal>
    </div>
  )
}
