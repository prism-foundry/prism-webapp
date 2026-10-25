import { useState } from 'react'
import { useAdminT } from '../../i18n/admin'
import { useAdminSession } from '../AdminProvider'
import { adminChangePassword, ApiError } from '../../lib/api'
import { Button, Field } from '../../ui'

export function Settings() {
  const at = useAdminT()
  const { admin, csrf } = useAdminSession()

  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<{ current?: string; next?: string; confirm?: string; form?: string }>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: typeof errors = {}
    if (!current) errs.current = at('admin.settings.wrong')
    if (next.length < 10) errs.next = at('admin.settings.tooShort')
    if (next !== confirm) errs.confirm = at('admin.settings.match')
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    setDone(false)
    try {
      await adminChangePassword(current, next, csrf)
      setDone(true)
      setErrors({})
      setCurrent('')
      setNext('')
      setConfirm('')
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) setErrors({ current: at('admin.settings.wrong') })
      else setErrors({ form: at('admin.settings.error') })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ maxWidth: '40rem' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-6)' }}>{at('admin.settings.title')}</h1>

      <section className="card" style={{ padding: 'var(--sp-5)', marginBottom: 'var(--sp-5)' }}>
        <h2 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--sp-3)' }}>{at('admin.settings.account')}</h2>
        <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', fontSize: 'var(--text-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-4)' }}>
            <dt className="muted">{at('admin.email')}</dt>
            <dd style={{ margin: 0 }}>{admin?.email}</dd>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-4)' }}>
            <dt className="muted">{at('admin.settings.role')}</dt>
            <dd style={{ margin: 0 }}><span className="badge badge-accent">{admin?.role}</span></dd>
          </div>
        </dl>
      </section>

      <section className="card" style={{ padding: 'var(--sp-5)' }}>
        <h2 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--sp-1)' }}>{at('admin.settings.password')}</h2>
        <p className="muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-5)' }}>{at('admin.settings.password.desc')}</p>

        <form onSubmit={submit} noValidate>
          <Field label={at('admin.settings.current')} htmlFor="pw-cur" error={errors.current}>
            <input id="pw-cur" className={`input ${errors.current ? 'input-invalid' : ''}`} type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
          </Field>
          <Field label={at('admin.settings.new')} htmlFor="pw-new" error={errors.next}>
            <input id="pw-new" className={`input ${errors.next ? 'input-invalid' : ''}`} type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} />
          </Field>
          <Field label={at('admin.settings.confirm')} htmlFor="pw-conf" error={errors.confirm}>
            <input id="pw-conf" className={`input ${errors.confirm ? 'input-invalid' : ''}`} type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </Field>
          {errors.form && <p role="alert" style={{ marginBottom: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--danger)' }}>{errors.form}</p>}
          {done && <p role="status" style={{ marginBottom: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--success)' }}>{at('admin.settings.changed')}</p>}
          <Button type="submit" variant="primary" loading={busy}>{at('admin.settings.change')}</Button>
        </form>
      </section>
    </div>
  )
}
