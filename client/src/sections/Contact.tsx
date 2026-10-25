import { useState } from 'react'
import { useI18n } from '../i18n'
import { useSiteContent } from '../lib/useSiteContent'
import { submitContact, ApiError } from '../lib/api'
import { Reveal } from '../components/Reveal'
import { Button, Field } from '../ui'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Form {
  name: string
  email: string
  company: string
  projectType: string
  message: string
  consent: boolean
}
const EMPTY: Form = { name: '', email: '', company: '', projectType: '', message: '', consent: false }

export function Contact() {
  const { t } = useI18n()
  const { c } = useSiteContent()
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setFormError(null)
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = (): boolean => {
    const e: Partial<Record<keyof Form, string>> = {}
    if (!form.name.trim()) e.name = t('contact.error.name')
    if (!form.email.trim()) e.email = t('contact.error.email')
    else if (!EMAIL_RE.test(form.email.trim())) e.email = t('contact.error.emailInvalid')
    if (form.message.trim().length < 10) e.message = t('contact.error.message')
    if (!form.consent) e.consent = t('contact.error.consent')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        projectType: form.projectType.trim() || undefined,
        message: form.message.trim(),
        consent: true,
      })
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      setStatus('idle')
      const msg = err instanceof ApiError ? err.message : t('contact.form.error')
      setFormError(msg)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: 'var(--sp-8)', alignItems: 'start' }}>
          <Reveal>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">{t('contact.eyebrow')}</span>
              <h2 style={{ fontSize: 'var(--text-3xl)' }}>{t('contact.title')}</h2>
              <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-lg)', marginBlockEnd: 'var(--sp-5)' }}>{t('contact.lede')}</p>
              <p className="muted" style={{ fontSize: 'var(--text-sm)', borderInlineStart: '2px solid var(--accent)', paddingInlineStart: 'var(--sp-4)' }}>
                {c('contact.info.note', t('contact.info.note'))}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {status === 'success' ? (
              <div className="card" role="status" style={{ padding: 'var(--sp-7)', textAlign: 'center' }}>
                <div aria-hidden style={{ fontSize: '2.5rem', marginBottom: 'var(--sp-3)' }}>✓</div>
                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-2)' }}>{t('contact.form.success.title')}</h3>
                <p className="muted">{t('contact.form.success.desc')}</p>
              </div>
            ) : (
              <form className="card" onSubmit={onSubmit} noValidate style={{ padding: 'var(--sp-6)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', gap: '0 1.5rem' }}>
                  <Field label={t('contact.form.name')} htmlFor="cf-name" error={errors.name}>
                    <input id="cf-name" className={`input ${errors.name ? 'input-invalid' : ''}`} type="text" autoComplete="name" placeholder={t('contact.form.namePh')} value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} />
                  </Field>
                  <Field label={t('contact.form.email')} htmlFor="cf-email" error={errors.email}>
                    <input id="cf-email" className={`input ${errors.email ? 'input-invalid' : ''}`} type="email" autoComplete="email" placeholder={t('contact.form.emailPh')} value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} />
                  </Field>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', gap: '0 1.5rem' }}>
                  <Field label={t('contact.form.company')} htmlFor="cf-company">
                    <input id="cf-company" className="input" type="text" autoComplete="organization" placeholder={t('contact.form.companyPh')} value={form.company} onChange={(e) => set('company', e.target.value)} />
                  </Field>
                  <Field label={t('contact.form.projectType')} htmlFor="cf-type">
                    <input id="cf-type" className="input" type="text" placeholder={t('contact.form.projectTypePh')} value={form.projectType} onChange={(e) => set('projectType', e.target.value)} />
                  </Field>
                </div>
                <Field label={t('contact.form.message')} htmlFor="cf-message" error={errors.message}>
                  <textarea id="cf-message" className={`textarea ${errors.message ? 'input-invalid' : ''}`} placeholder={t('contact.form.messagePh')} value={form.message} onChange={(e) => set('message', e.target.value)} aria-invalid={!!errors.message} />
                </Field>

                <div style={{ marginBottom: 'var(--sp-5)' }}>
                  <label className="checkbox">
                    <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} />
                    <span>{t('contact.form.consent')}</span>
                  </label>
                  {errors.consent && <span className="error" role="alert" style={{ display: 'block', marginTop: '0.3rem', fontSize: 'var(--text-xs)', color: 'var(--danger)' }}>{errors.consent}</span>}
                </div>

                {formError && (
                  <p role="alert" style={{ marginBottom: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--danger)' }}>{formError}</p>
                )}
                <Button type="submit" loading={status === 'sending'} variant="primary" className="btn-block">
                  {status === 'sending' ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
