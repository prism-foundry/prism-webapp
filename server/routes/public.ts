import { Router } from 'express'
import { z } from 'zod'
import { rateLimit } from 'express-rate-limit'
import { getDb } from '../db.js'
import { CATEGORIES, CATEGORY_LABELS, type Language } from '../seed/index.js'
import { CONTENT_DEFAULTS, defaultContent } from '../lib/content-defaults.js'
import { badRequest } from '../lib/errors.js'

export const publicRouter = Router()

const projectRow = `
  p.id, p.slug, p.category, p.source_description, p.status, p.status_note,
  p.cover_image, p.url, p.repository_url, p.technologies, p.capabilities,
  p.created_at, p.updated_at,
  COALESCE(json_group_array(json_object(
    'lang', l.lang, 'name', l.name, 'short', l.short, 'full', l.full
  )), '[]') AS locales
`

interface ProjectRow {
  id: number
  slug: string
  category: string
  source_description: string
  status: string
  status_note: string | null
  cover_image: string | null
  url: string | null
  repository_url: string | null
  technologies: string
  capabilities: string
  created_at: string
  updated_at: string
  locales: string
}

function parseProject(p: ProjectRow) {
  return {
    id: p.id,
    slug: p.slug,
    category: p.category,
    sourceDescription: p.source_description,
    status: p.status,
    statusNote: p.status_note,
    coverImage: p.cover_image,
    url: p.url,
    repositoryUrl: p.repository_url,
    technologies: JSON.parse(p.technologies),
    capabilities: JSON.parse(p.capabilities),
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    locales: JSON.parse(p.locales) as {
      lang: Language
      name: string
      short: string
      full: string
    }[],
  }
}

const listSchema = z
  .object({
    lang: z.enum(['en', 'fa', 'de', 'tr']).optional(),
    category: z.string().optional(),
    search: z.string().optional(),
    sort: z.enum(['updated_desc', 'updated_asc', 'name_asc', 'name_desc', 'created_desc']).optional(),
  })
  .strict()

/**
 * Public, published-only projects. `lang` filters the `locales` array down to
 * that language's entry (plus a fallback entry) so the client can render
 * without extra work.
 */
publicRouter.get('/projects', (req, res) => {
  const q = listSchema.parse(req.query)
  const db = getDb()
  const where: string[] = ["p.status = 'published'", 'p.deleted_at IS NULL']
  const params: (string | number | null)[] = []
  if (q.category && CATEGORIES.includes(q.category as never)) {
    where.push('p.category = ?')
    params.push(q.category)
  }
  if (q.search) {
    // Search matches name/short/full across all locales.
    where.push(`(p.slug LIKE ? OR EXISTS (SELECT 1 FROM project_locales l2 WHERE l2.project_id = p.id AND (
      l2.name LIKE ? OR l2.short LIKE ? OR l2.full LIKE ?)))`)
    const like = `%${q.search.replace(/[%_]/g, (c) => `\\${c}`)}%`
    params.push(like, like, like, like)
  }
  const sortMap: Record<string, string> = {
    updated_desc: 'p.updated_at DESC',
    updated_asc: 'p.updated_at ASC',
    name_asc: "COALESCE((SELECT l3.name FROM project_locales l3 WHERE l3.project_id = p.id AND l3.lang = COALESCE(?, 'en')), p.slug) ASC",
    name_desc: "COALESCE((SELECT l3.name FROM project_locales l3 WHERE l3.project_id = p.id AND l3.lang = COALESCE(?, 'en')), p.slug) DESC",
    created_desc: 'p.created_at DESC',
  }
  const orderBy = sortMap[q.sort || 'updated_desc']
  if (q.sort === 'name_asc' || q.sort === 'name_desc') {
    // The sort subquery uses the lang param.
    params.push(q.lang || 'en')
  }
  const rows = db
    .prepare(
      `SELECT ${projectRow}
       FROM projects p
       LEFT JOIN project_locales l ON l.project_id = p.id
       WHERE ${where.join(' AND ')}
       GROUP BY p.id
       ORDER BY ${orderBy}`,
    )
    .all(...params) as ProjectRow[]
  const projects = rows.map((r) => {
    const p = parseProject(r)
    if (q.lang) {
      const primary = p.locales.find((l) => l.lang === q.lang)
      const fallback = p.locales.find((l) => l.lang === 'en')
      p.locales = [primary, fallback].filter(Boolean) as typeof p.locales
    }
    return p
  })
  res.json({ projects, total: projects.length, categories: CATEGORIES })
})

publicRouter.get('/projects/:slug', (req, res, next) => {
  try {
    const db = getDb()
    const row = db
      .prepare(
        `SELECT ${projectRow} FROM projects p
         LEFT JOIN project_locales l ON l.project_id = p.id
         WHERE p.slug = ? AND p.status = 'published' AND p.deleted_at IS NULL
         GROUP BY p.id`,
      )
      .get(req.params.slug) as ProjectRow | undefined
    if (!row) return next(badRequest('Project not found', { code: 'not_found' }))
    res.json({ project: parseProject(row) })
  } catch (e) {
    next(e)
  }
})

publicRouter.get('/categories', (_req, res) => {
  res.json({ categories: CATEGORIES.map((c) => ({ key: c, labels: CATEGORY_LABELS[c] })) })
})

/** Full public site content: defaults merged with admin overrides. */
publicRouter.get('/content', (_req, res) => {
  const db = getDb()
  const row = db.prepare(`SELECT value FROM settings WHERE key = 'content'`).get() as
    | { value: string }
    | undefined
  const overrides = row ? (JSON.parse(row.value) as Record<string, Partial<Record<Language, string>>>) : {}
  const out: Record<string, Record<Language, string>> = {}
  for (const [key, defaults] of Object.entries(CONTENT_DEFAULTS)) {
    out[key] = { ...defaults, ...(overrides[key] || {}) } as Record<Language, string>
  }
  res.json({ content: out })
})

const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(200),
    company: z.string().trim().max(160).optional().or(z.literal('')),
    projectType: z.string().trim().max(120).optional().or(z.literal('')),
    message: z.string().trim().min(10).max(4000),
    consent: z.boolean(),
  })
  .strict()

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({ error: { status: 429, message: 'Too many submissions. Try again later.' } })
  },
})

publicRouter.post('/contact', contactLimiter, (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body)
    if (!data.consent) {
      return next(badRequest('Please accept the privacy notice.', { code: 'consent_required' }))
    }
    const db = getDb()
    const r = db
      .prepare(
        `INSERT INTO contact_messages (name, email, company, project_type, message, consent)
         VALUES (?,?,?,?,?,1)`,
      )
      .run(data.name, data.email, data.company || null, data.projectType || null, data.message)
    res.status(202).json({
      ok: true,
      id: Number(r.lastInsertRowid),
      note: defaultContent('contact.info_note', 'en'),
    })
  } catch (e) {
    next(e)
  }
})

publicRouter.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'prism-api' })
})
