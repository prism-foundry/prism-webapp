import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n'
import { useAdminT } from '../../i18n/admin'
import { useAdminSession } from '../AdminProvider'
import { BrandMark } from '../../components/BrandMark'
import { Button, Field, Spinner } from '../../ui'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Login() {
  const { t } = useI18n()
  const at = useAdminT()
  const { login } = useAdminSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: typeof errors = {}
    if (!email.trim()) errs.email = at('admin.email.required')
    else if (!EMAIL_RE.test(email.trim())) errs.email = at('admin.email.invalid')
    if (!password) errs.password = at('admin.password.required')
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    const r = await login(email.trim(), password)
    setBusy(false)
    if (!r.ok) setErrors({ form: at('admin.signin.failed') })
  }

  return (
    <div style={{ minHeight: '100svh', display: 'grid', placeItems: 'center', padding: '1rem', background: 'radial-gradient(900px 500px at 50% 0%, rgba(143,216,242,0.08), transparent 60%), var(--bg-0)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '26rem', padding: 'var(--sp-7)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--sp-5)' }}>
          <BrandMark size={34} withWordmark />
        </div>
        <h1 style={{ fontSize: 'var(--text-xl)', textAlign: 'center', marginBottom: 'var(--sp-2)' }}>{at('admin.login')}</h1>
        <p className="muted" style={{ textAlign: 'center', fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-6)' }}>{at('admin.login.desc')}</p>

        {busy ? (
          <Spinner label={at('admin.common.loading')} />
        ) : (
          <form onSubmit={submit} noValidate>
            <Field label={at('admin.email')} htmlFor="al-email" error={errors.email}>
              <input id="al-email" className={`input ${errors.email ? 'input-invalid' : ''}`} type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
            </Field>
            <Field label={at('admin.password')} htmlFor="al-password" error={errors.password}>
              <input id="al-password" className={`input ${errors.password ? 'input-invalid' : ''}`} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!errors.password} />
            </Field>
            {errors.form && (
              <p role="alert" style={{ marginBottom: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--danger)' }}>{errors.form}</p>
            )}
            <Button type="submit" variant="primary" className="btn-block">{at('admin.signin')}</Button>
          </form>
        )}

        <div style={{ marginTop: 'var(--sp-6)', textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>← {t('nav.home')}</Link>
        </div>
      </div>
    </div>
  )
}
