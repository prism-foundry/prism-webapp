import { useState } from 'react'
import { useAdminT } from '../../i18n/admin'
import { LANGUAGES, LANGUAGE_NAMES, type Language } from '../../i18n'
import { useAdminSession } from '../AdminProvider'
import {
  adminCreateProject, adminUpdateProject,
  type Project, type ProjectPayload,
} from '../../lib/api'
import { Button, Field, Modal } from '../../ui'

type LocState = Record<Language, { name: string; short: string; full: string }>

const emptyLoc: LocState = {
  en: { name: '', short: '', full: '' },
  fa: { name: '', short: '', full: '' },
  de: { name: '', short: '', full: '' },
  tr: { name: '', short: '', full: '' },
}

function initLoc(p?: Project): LocState {
  if (!p) return emptyLoc
  const base: LocState = JSON.parse(JSON.stringify(emptyLoc))
  for (const l of p.locales) base[l.lang] = { name: l.name, short: l.short, full: l.full }
  return base
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const isUrl = (s: string) => { try { new URL(s); return true } catch { return false } }

interface Props {
  mode: 'new' | 'edit'
  project?: Project
  categories: string[]
  onClose: () => void
  onSaved: () => void
}

export function ProjectForm({ mode, project, categories, onClose, onSaved }: Props) {
  const at = useAdminT()
  const { csrf } = useAdminSession()

  const [slug, setSlug] = useState(project?.slug ?? '')
  const [category, setCategory] = useState(project?.category ?? categories[0])
  const [status, setStatus] = useState<'published' | 'draft'>(project?.status ?? 'draft')
  const [source, setSource] = useState(project?.sourceDescription ?? '')
  const [statusNote, setStatusNote] = useState(project?.statusNote ?? '')
  const [url, setUrl] = useState(project?.url ?? '')
  const [repo, setRepo] = useState(project?.repositoryUrl ?? '')
  const [cover, setCover] = useState(project?.coverImage ?? '')
  const [tech, setTech] = useState((project?.technologies ?? []).join('\n'))
  const [caps, setCaps] = useState((project?.capabilities ?? []).join(', '))
  const [loc, setLoc] = useState<LocState>(initLoc(project))
  const [errors, setErrors] = useState<{ slug?: string; source?: string; url?: string; repo?: string; locales?: string }>({})
  const [busy, setBusy] = useState(false)

  const setLocale = (lang: Language, field: 'name' | 'short' | 'full', value: string) =>
    setLoc((prev) => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: typeof errors = {}
    if (mode === 'new') {
      if (!slug.trim()) errs.slug = at('admin.projects.required')
      else if (!SLUG_RE.test(slug.trim())) errs.slug = at('admin.projects.slugFormat')
    }
    if (!source.trim()) errs.source = at('admin.projects.required')
    if (url.trim() && !isUrl(url.trim())) errs.url = at('admin.projects.required')
    if (repo.trim() && !isUrl(repo.trim())) errs.repo = at('admin.projects.required')
    if (LANGUAGES.some((l) => !loc[l].name.trim() || !loc[l].short.trim() || !loc[l].full.trim()))
      errs.locales = at('admin.projects.required')
    setErrors(errs)
    if (Object.keys(errs).length) return

    const payload: ProjectPayload = {
      slug: (mode === 'edit' ? project!.slug : slug).trim(),
      category,
      status,
      sourceDescription: source.trim(),
      statusNote: statusNote.trim() || null,
      url: url.trim() || null,
      repositoryUrl: repo.trim() || null,
      coverImage: cover.trim() || null,
      technologies: tech.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 20),
      capabilities: caps.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 12),
      locales: {
        en: { name: loc.en.name.trim(), short: loc.en.short.trim(), full: loc.en.full.trim() },
        fa: { name: loc.fa.name.trim(), short: loc.fa.short.trim(), full: loc.fa.full.trim() },
        de: { name: loc.de.name.trim(), short: loc.de.short.trim(), full: loc.de.full.trim() },
        tr: { name: loc.tr.name.trim(), short: loc.tr.short.trim(), full: loc.tr.full.trim() },
      },
    }

    setBusy(true)
    try {
      if (mode === 'new') await adminCreateProject(payload, csrf)
      else await adminUpdateProject(project!.slug, payload, csrf)
      onSaved()
    } catch {
      setErrors({ ...errs, locales: at('admin.projects.error') })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open onClose={onClose} title={mode === 'new' ? at('admin.projects.new') : at('admin.projects.edit')}>
      <form onSubmit={submit} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '0 1.25rem' }}>
          <Field label={at('admin.projects.slug')} htmlFor="pf-slug" error={errors.slug}>
            {mode === 'new' ? (
              <input id="pf-slug" className={`input ${errors.slug ? 'input-invalid' : ''}`} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-new-project" />
            ) : (
              <input id="pf-slug" className="input mono" value={slug} disabled title={at('admin.projects.slugImmutable')} />
            )}
          </Field>
          <Field label={at('admin.projects.category')} htmlFor="pf-cat">
            <select id="pf-cat" className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label={at('admin.projects.status')} htmlFor="pf-status">
            <select id="pf-status" className="select" value={status} onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}>
              <option value="published">{at('admin.overview.published')}</option>
              <option value="draft">{at('admin.overview.drafts')}</option>
            </select>
          </Field>
        </div>

        <Field label={at('admin.projects.field.source')} htmlFor="pf-source" error={errors.source}>
          <textarea id="pf-source" className={`textarea ${errors.source ? 'input-invalid' : ''}`} rows={2} maxLength={500} value={source} onChange={(e) => setSource(e.target.value)} />
        </Field>
        <Field label={at('admin.projects.field.statusNote')} htmlFor="pf-note">
          <input id="pf-note" className="input" maxLength={120} value={statusNote} onChange={(e) => setStatusNote(e.target.value)} />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '0 1.25rem' }}>
          <Field label={at('admin.projects.field.url')} htmlFor="pf-url" error={errors.url}>
            <input id="pf-url" className={`input ${errors.url ? 'input-invalid' : ''}`} type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
          </Field>
          <Field label={at('admin.projects.field.repo')} htmlFor="pf-repo" error={errors.repo}>
            <input id="pf-repo" className={`input ${errors.repo ? 'input-invalid' : ''}`} type="url" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="https://…" />
          </Field>
          <Field label={at('admin.projects.field.cover')} htmlFor="pf-cover">
            <input id="pf-cover" className="input" maxLength={255} value={cover} onChange={(e) => setCover(e.target.value)} placeholder="/media/image.png" />
          </Field>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '0 1.25rem' }}>
          <Field label={at('admin.projects.field.technologies')} hint={at('admin.projects.field.technologies.hint')} htmlFor="pf-tech">
            <textarea id="pf-tech" className="textarea" rows={4} value={tech} onChange={(e) => setTech(e.target.value)} />
          </Field>
          <Field label={at('admin.projects.field.capabilities')} hint={at('admin.projects.field.capabilities.hint')} htmlFor="pf-caps">
            <textarea id="pf-caps" className="textarea" rows={4} value={caps} onChange={(e) => setCaps(e.target.value)} />
          </Field>
        </div>

        <h3 style={{ fontSize: 'var(--text-base)', margin: 'var(--sp-5) 0 var(--sp-1)' }}>{at('admin.projects.field.locales')}</h3>
        {errors.locales && <p role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--danger)', marginBottom: 'var(--sp-3)' }}>{errors.locales}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: 'var(--sp-4)' }}>
          {LANGUAGES.map((lang) => (
            <fieldset key={lang} style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: 'var(--sp-3)', margin: 0 }}>
              <legend style={{ fontSize: 'var(--text-xs)', fontWeight: 700, padding: '0 var(--sp-1)', color: 'var(--ink-3)' }}>{LANGUAGE_NAMES[lang]}</legend>
              <Field label={at('admin.projects.field.locales.name')} htmlFor={`pf-${lang}-name`}>
                <input id={`pf-${lang}-name`} className="input" maxLength={200} value={loc[lang].name} onChange={(e) => setLocale(lang, 'name', e.target.value)} />
              </Field>
              <Field label={at('admin.projects.field.locales.short')} htmlFor={`pf-${lang}-short`}>
                <input id={`pf-${lang}-short`} className="input" maxLength={300} value={loc[lang].short} onChange={(e) => setLocale(lang, 'short', e.target.value)} />
              </Field>
              <Field label={at('admin.projects.field.locales.full')} htmlFor={`pf-${lang}-full`}>
                <textarea id={`pf-${lang}-full`} className="textarea" rows={3} maxLength={5000} value={loc[lang].full} onChange={(e) => setLocale(lang, 'full', e.target.value)} />
              </Field>
            </fieldset>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'flex-end', marginTop: 'var(--sp-6)' }}>
          <Button type="button" variant="ghost" onClick={onClose}>{at('admin.projects.cancel')}</Button>
          <Button type="submit" variant="primary" loading={busy}>{at('admin.projects.save')}</Button>
        </div>
      </form>
    </Modal>
  )
}
