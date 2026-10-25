import { Router } from 'express'
import { z } from 'zod'
import multer from 'multer'
import { randomBytes } from 'node:crypto'
import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, extname } from 'node:path'
import { getDb } from '../db.js'
import { config } from '../config.js'
import {
  clearSessionCookie,
  createSession,
  destroySession,
  setSessionCookie,
} from '../lib/sessions.js'
import { hashPassword, verifyPassword } from '../lib/passwords.js'
import { recordAudit } from '../lib/audit.js'
import { badRequest, conflict, HttpError, notFound, unauthorized } from '../lib/errors.js'
import { requireAdmin, requireCsrf } from '../middleware/auth.js'
import { CATEGORIES, LANGUAGES, type Language } from '../seed/index.js'
import { CONTENT_DEFAULTS } from '../lib/content-defaults.js'

export const adminRouter = Router()

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) }).strict()

let loginFailures: { ip: string; count: number; resetAt: number }[] = []

adminRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const ip = req.ip || 'unknown'
    const now = Date.now()
    loginFailures = loginFailures.filter((f) => f.resetAt > now)
    const cur = loginFailures.find((f) => f.ip === ip)
    if (cur && cur.count >= 8) {
      next(new HttpError(429, 'Too many login attempts. Try again later.'))
      return
    }
    const db = getDb()
    const admin = db.prepare('SELECT * FROM administrators WHERE email = ?').get(email.toLowerCase().trim()) as
      | { id: number; email: string; password_hash: string; role: string }
      | undefined
    if (!admin) {
      registerFailure(ip)
      next(unauthorized('Invalid credentials'))
      return
    }
    const ok = await verifyPassword(admin.password_hash, password)
    if (!ok) {
      registerFailure(ip)
      next(unauthorized('Invalid credentials'))
      return
    }
    const { token, csrf } = createSession(admin.id)
    setSessionCookie(res, token)
    db.prepare('UPDATE administrators SET last_login_at = ? WHERE id = ?').run(new Date().toISOString(), admin.id)
    recordAudit({ id: admin.id, email: admin.email }, 'login', 'admin', String(admin.id), undefined, req)
    res.json({ ok: true, admin: { email: admin.email, role: admin.role }, csrf })
  } catch (e) {
    next(e)
  }
})

function registerFailure(ip: string) {
  const now = Date.now()
  const existing = loginFailures.find((f) => f.ip === ip)
  if (existing) {
    existing.count++
    existing.resetAt = now + 15 * 60 * 1000
  } else {
    loginFailures.push({ ip, count: 1, resetAt: now + 15 * 60 * 1000 })
  }
}

adminRouter.post('/logout', requireAdmin, (req, res) => {
  const token = (req as { sessionToken?: string }).sessionToken
  destroySession(token)
  clearSessionCookie(res)
  recordAudit(req.admin!, 'logout', 'admin', String(req.admin!.id), undefined, req)
  res.json({ ok: true })
})

adminRouter.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: { email: req.admin!.email, role: req.admin!.role } })
})

// Let a still-authenticated client re-fetch its CSRF token after a full page
// reload (the login-time value is only in memory). Only the session holder,
// identified by the httpOnly cookie, can obtain it.
adminRouter.get('/csrf', requireAdmin, (req, res) => {
  if (!req.admin!.csrfRaw) { res.status(401).json({ error: { message: 'No CSRF for this session' } }); return }
  res.json({ csrf: req.admin!.csrfRaw })
})

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

adminRouter.get('/overview', requireAdmin, (_req, res) => {
  const db = getDb()
  const total = (db.prepare(`SELECT COUNT(*) c FROM projects WHERE deleted_at IS NULL`).get() as { c: number }).c
  const byCat = db
    .prepare(`SELECT category, COUNT(*) c FROM projects WHERE deleted_at IS NULL GROUP BY category`)
    .all() as { category: string; c: number }[]
  const published = (db.prepare(`SELECT COUNT(*) c FROM projects WHERE deleted_at IS NULL AND status='published'`).get() as { c: number }).c
  const drafts = (db.prepare(`SELECT COUNT(*) c FROM projects WHERE deleted_at IS NULL AND status='draft'`).get() as { c: number }).c
  const recent = db
    .prepare(`SELECT id, slug, status, updated_at FROM projects WHERE deleted_at IS NULL ORDER BY updated_at DESC LIMIT 8`)
    .all() as { id: number; slug: string; status: string; updated_at: string }[]
  const unreadMessages = (db.prepare(`SELECT COUNT(*) c FROM contact_messages WHERE status='unread'`).get() as { c: number }).c
  res.json({ total, byCat, published, drafts, recent, unreadMessages })
})

// ---------------------------------------------------------------------------
// Projects CRUD
// ---------------------------------------------------------------------------

const localeSchema = z.object({
  name: z.string().min(1).max(200),
  short: z.string().min(1).max(300),
  full: z.string().min(1).max(5000),
})

const projectPayloadSchema = z
  .object({
    slug: z
      .string()
      .min(2)
      .max(120)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/i, 'Slug must be kebab-case'),
    category: z.enum(CATEGORIES as unknown as [string, ...string[]]),
    status: z.enum(['published', 'draft']),
    sourceDescription: z.string().min(1).max(500),
    statusNote: z.string().max(120).optional().nullable(),
    coverImage: z.string().max(255).optional().nullable(),
    url: z.string().url().max(500).optional().nullable(),
    repositoryUrl: z.string().url().max(500).optional().nullable(),
    technologies: z.array(z.string().min(1).max(60)).max(20),
    capabilities: z.array(z.string().min(1).max(40)).max(12),
    locales: z.object({
      en: localeSchema,
      fa: localeSchema,
      de: localeSchema,
      tr: localeSchema,
    }),
  })
  .strict()

function insertLocales(projectId: number, locales: Record<Language, { name: string; short: string; full: string }>) {
  const db = getDb()
  const ins = db.prepare('INSERT INTO project_locales (project_id, lang, name, short, full) VALUES (?,?,?,?,?)')
  for (const lang of LANGUAGES) {
    ins.run(projectId, lang, locales[lang].name, locales[lang].short, locales[lang].full)
  }
}

function findProjectBySlug(slug: string, ignoreId?: number): number | null {
  const db = getDb()
  const row = db
    .prepare('SELECT id FROM projects WHERE slug = ? AND (deleted_at IS NULL OR id = ?)')
    .get(slug, ignoreId ?? -1) as { id: number } | undefined
  return row?.id ?? null
}

adminRouter.get('/projects', requireAdmin, (req, res) => {
  const db = getDb()
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50))
  const category = typeof req.query.category === 'string' && CATEGORIES.includes(req.query.category as never) ? req.query.category : undefined
  const search = typeof req.query.search === 'string' && req.query.search ? req.query.search : undefined
  const status = typeof req.query.status === 'string' && ['published', 'draft'].includes(req.query.status) ? req.query.status : undefined
  const sort = typeof req.query.sort === 'string' && ['updated_desc', 'updated_asc', 'slug_asc'].includes(req.query.sort) ? req.query.sort : 'updated_desc'

  const where: string[] = ['deleted_at IS NULL']
  const params: (string | number | null)[] = []
  if (category) { where.push('category = ?'); params.push(category) }
  if (status) { where.push('status = ?'); params.push(status) }
  if (search) {
    where.push(`(slug LIKE ? OR EXISTS (SELECT 1 FROM project_locales l WHERE l.project_id = projects.id AND (l.name LIKE ? OR l.short LIKE ? OR l.full LIKE ?)))`)
    const like = `%${search.replace(/[%_]/g, (c) => `\\${c}`)}%`
    params.push(like, like, like, like)
  }
  const total = (db.prepare(`SELECT COUNT(*) c FROM projects WHERE ${where.join(' AND ')}`).get(...params) as { c: number }).c
  const sortSql = { updated_desc: 'updated_at DESC', updated_asc: 'updated_at ASC', slug_asc: 'slug ASC' }[sort]!
  const rows = db
    .prepare(`
      SELECT p.id, p.slug, p.category, p.status, p.source_description, p.status_note,
             p.cover_image, p.url, p.repository_url, p.technologies, p.capabilities,
             p.created_at, p.updated_at,
             COALESCE(json_group_array(json_object('lang', l.lang, 'name', l.name, 'short', l.short, 'full', l.full)), '[]') AS locales
      FROM projects p LEFT JOIN project_locales l ON l.project_id = p.id
      WHERE ${where.join(' AND ')}
      GROUP BY p.id ORDER BY ${sortSql} LIMIT ? OFFSET ?
    `)
    .all(...params, limit, (page - 1) * limit) as unknown[]
  const projects = rows.map((r) => {
    const row = r as {
      id: number; slug: string; category: string; status: string; source_description: string; status_note: string | null
      cover_image: string | null; url: string | null; repository_url: string | null
      technologies: string; capabilities: string; created_at: string; updated_at: string; locales: string
    }
    return {
      id: row.id, slug: row.slug, category: row.category, status: row.status,
      sourceDescription: row.source_description, statusNote: row.status_note,
      coverImage: row.cover_image, url: row.url, repositoryUrl: row.repository_url,
      technologies: JSON.parse(row.technologies), capabilities: JSON.parse(row.capabilities),
      createdAt: row.created_at, updatedAt: row.updated_at,
      locales: JSON.parse(row.locales) as { lang: Language; name: string; short: string; full: string }[],
    }
  })
  res.json({ projects, total, page, limit })
})

adminRouter.get('/projects/:slug', requireAdmin, (req, res, next) => {
  try {
    const db = getDb()
    const row = db
      .prepare(`
        SELECT p.id, p.slug, p.category, p.status, p.source_description, p.status_note,
               p.cover_image, p.url, p.repository_url, p.technologies, p.capabilities,
               p.created_at, p.updated_at,
               COALESCE(json_group_array(json_object('lang', l.lang, 'name', l.name, 'short', l.short, 'full', l.full)), '[]') AS locales
        FROM projects p LEFT JOIN project_locales l ON l.project_id = p.id
        WHERE p.slug = ? AND p.deleted_at IS NULL
        GROUP BY p.id
      `)
      .get(req.params.slug) as
      | {
          id: number; slug: string; category: string; status: string; source_description: string; status_note: string | null
          cover_image: string | null; url: string | null; repository_url: string | null
          technologies: string; capabilities: string; created_at: string; updated_at: string; locales: string
        }
      | undefined
    if (!row) next(notFound('Project not found'))
    else res.json({
      project: {
        id: row.id, slug: row.slug, category: row.category, status: row.status,
        sourceDescription: row.source_description, statusNote: row.status_note,
        coverImage: row.cover_image, url: row.url, repositoryUrl: row.repository_url,
        technologies: JSON.parse(row.technologies), capabilities: JSON.parse(row.capabilities),
        createdAt: row.created_at, updatedAt: row.updated_at,
        locales: JSON.parse(row.locales) as { lang: Language; name: string; short: string; full: string }[],
      },
    })
  } catch (e) {
    next(e)
  }
})

adminRouter.post('/projects', requireAdmin, requireCsrf, (req, res, next) => {
  try {
    const data = projectPayloadSchema.parse(req.body)
    if (findProjectBySlug(data.slug) !== null) {
      next(conflict('A project with this slug already exists.', { code: 'slug_exists' }))
      return
    }
    const db = getDb()
    const now = new Date().toISOString()
    const r = db
      .prepare(`
        INSERT INTO projects (slug, category, source_description, status, status_note, cover_image, url, repository_url, technologies, capabilities, created_at, updated_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
      `)
      .run(data.slug, data.category, data.sourceDescription, data.status, data.statusNote ?? null,
        data.coverImage ?? null, data.url ?? null, data.repositoryUrl ?? null,
        JSON.stringify(data.technologies), JSON.stringify(data.capabilities), now, now)
    const id = Number(r.lastInsertRowid)
    insertLocales(id, data.locales)
    recordAudit(req.admin!, 'project.create', 'project', data.slug, undefined, req)
    res.status(201).json({ ok: true, id, slug: data.slug })
  } catch (e) {
    next(e)
  }
})

adminRouter.put('/projects/:slug', requireAdmin, requireCsrf, (req, res, next) => {
  try {
    const data = projectPayloadSchema.parse(req.body)
    const db = getDb()
    const existing = db.prepare('SELECT id, slug FROM projects WHERE slug = ? AND deleted_at IS NULL').get(req.params.slug) as
      | { id: number; slug: string }
      | undefined
    if (!existing) { next(notFound('Project not found')); return }
    if (existing.slug !== data.slug) {
      next(badRequest('Slug is immutable. To rename, delete and recreate.', { code: 'slug_immutable' }))
      return
    }
    const now = new Date().toISOString()
    db.prepare(`
      UPDATE projects SET category=?, source_description=?, status=?, status_note=?, cover_image=?, url=?, repository_url=?, technologies=?, capabilities=?, updated_at=?
      WHERE id = ?
    `).run(data.category, data.sourceDescription, data.status, data.statusNote ?? null,
      data.coverImage ?? null, data.url ?? null, data.repositoryUrl ?? null,
      JSON.stringify(data.technologies), JSON.stringify(data.capabilities), now, existing.id)
    db.prepare('DELETE FROM project_locales WHERE project_id = ?').run(existing.id)
    insertLocales(existing.id, data.locales)
    recordAudit(req.admin!, 'project.update', 'project', data.slug, undefined, req)
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

adminRouter.patch('/projects/:slug/status', requireAdmin, requireCsrf, (req, res, next) => {
  try {
    const { status } = z.object({ status: z.enum(['published', 'draft']) }).parse(req.body)
    const db = getDb()
    const r = db
      .prepare(`UPDATE projects SET status = ?, updated_at = ? WHERE slug = ? AND deleted_at IS NULL`)
      .run(status, new Date().toISOString(), req.params.slug)
    if (r.changes === 0) { next(notFound('Project not found')); return }
    recordAudit(req.admin!, `project.${status === 'published' ? 'publish' : 'unpublish'}`, 'project', req.params.slug, undefined, req)
    res.json({ ok: true, status })
  } catch (e) {
    next(e)
  }
})

adminRouter.delete('/projects/:slug', requireAdmin, requireCsrf, (req, res, next) => {
  try {
    const db = getDb()
    const r = db
      .prepare(`UPDATE projects SET deleted_at = ? WHERE slug = ? AND deleted_at IS NULL`)
      .run(new Date().toISOString(), req.params.slug)
    if (r.changes === 0) { next(notFound('Project not found')); return }
    recordAudit(req.admin!, 'project.delete', 'project', req.params.slug, undefined, req)
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

// ---------------------------------------------------------------------------
// Settings (site content)
// ---------------------------------------------------------------------------

const contentUpdateSchema = z
  .object({
    content: z.record(
      z.string(),
      z.object({ en: z.string().optional(), fa: z.string().optional(), de: z.string().optional(), tr: z.string().optional() }).optional(),
    ),
  })
  .strict()

adminRouter.get('/settings', requireAdmin, (_req, res) => {
  const db = getDb()
  const row = db.prepare(`SELECT value FROM settings WHERE key = 'content'`).get() as { value: string } | undefined
  const overrides = row ? (JSON.parse(row.value) as Record<string, Partial<Record<Language, string>>>) : {}
  res.json({ defaults: CONTENT_DEFAULTS, overrides })
})

adminRouter.put('/settings', requireAdmin, requireCsrf, (req, res, next) => {
  try {
    const { content } = contentUpdateSchema.parse(req.body)
    const db = getDb()
    db.prepare(`INSERT INTO settings (key, value) VALUES ('content', ?)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(JSON.stringify(content))
    recordAudit(req.admin!, 'settings.update', 'content', 'site-content', undefined, req)
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

// ---------------------------------------------------------------------------
// Admin password (self-service)
// ---------------------------------------------------------------------------

const changePasswordSchema = z.object({ current: z.string().min(6), next: z.string().min(10) }).strict()
adminRouter.post('/me/password', requireAdmin, requireCsrf, async (req, res, next) => {
  try {
    const { current: currentPw, next: newPw } = changePasswordSchema.parse(req.body)
    const db = getDb()
    const me = db.prepare('SELECT * FROM administrators WHERE id = ?').get(req.admin!.id) as
      | { id: number; password_hash: string }
      | undefined
    if (!me) { next(notFound('Account not found')); return }
    const curOk = await verifyPassword(me.password_hash, currentPw)
    if (!curOk) { next(unauthorized('Current password incorrect')); return }
    const h = await hashPassword(newPw)
    db.prepare('UPDATE administrators SET password_hash = ? WHERE id = ?').run(h, me.id)
    recordAudit(req.admin!, 'password.change', 'admin', String(me.id), undefined, req)
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

// ---------------------------------------------------------------------------
// Contact messages
// ---------------------------------------------------------------------------

adminRouter.get('/messages', requireAdmin, (req, res) => {
  const db = getDb()
  const status = typeof req.query.status === 'string' && ['unread', 'read', 'resolved', 'archived'].includes(req.query.status) ? req.query.status : undefined
  const search = typeof req.query.search === 'string' && req.query.search ? req.query.search : undefined
  const where: string[] = []
  const params: (string | number | null)[] = []
  if (status) { where.push('status = ?'); params.push(status) }
  if (search) {
    where.push('(name LIKE ? OR email LIKE ? OR company LIKE ? OR message LIKE ?)')
    const like = `%${search.replace(/[%_]/g, (c) => `\\${c}`)}%`
    params.push(like, like, like, like)
  }
  const rows = db
    .prepare(`SELECT * FROM contact_messages ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC LIMIT 200`)
    .all(...params) as { id: number; name: string; email: string; company: string | null; project_type: string | null; status: string; created_at: string; message: string }[]
  res.json({ messages: rows })
})

adminRouter.get('/messages/:id', requireAdmin, (req, res, next) => {
  try {
    const db = getDb()
    const m = db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(Number(req.params.id)) as
      | { id: number; name: string; email: string; company: string | null; project_type: string | null; status: string; created_at: string; updated_at: string; message: string }
      | undefined
    if (!m) next(notFound('Message not found'))
    else res.json({ message: m })
  } catch (e) {
    next(e)
  }
})

adminRouter.patch('/messages/:id/status', requireAdmin, requireCsrf, (req, res, next) => {
  try {
    const { status } = z.object({ status: z.enum(['unread', 'read', 'resolved', 'archived']) }).parse(req.body)
    const db = getDb()
    const r = db
      .prepare('UPDATE contact_messages SET status = ?, updated_at = ? WHERE id = ?')
      .run(status, new Date().toISOString(), Number(req.params.id))
    if (r.changes === 0) { next(notFound('Message not found')); return }
    recordAudit(req.admin!, 'message.status', 'message', String(req.params.id), `status=${status}`, req)
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

adminRouter.delete('/messages/:id', requireAdmin, requireCsrf, (req, res, next) => {
  try {
    const db = getDb()
    const r = db.prepare('DELETE FROM contact_messages WHERE id = ?').run(Number(req.params.id))
    if (r.changes === 0) { next(notFound('Message not found')); return }
    recordAudit(req.admin!, 'message.delete', 'message', String(req.params.id), undefined, req)
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

// ---------------------------------------------------------------------------
// Audit log
// ---------------------------------------------------------------------------

adminRouter.get('/audit', requireAdmin, (req, res) => {
  const db = getDb()
  const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 100))
  const rows = db
    .prepare('SELECT id, actor_id, actor_email, action, target_type, target_id, detail, ip, created_at FROM audit_log ORDER BY created_at DESC LIMIT ?')
    .all(limit) as { id: number; actor_id: number | null; actor_email: string | null; action: string; target_type: string | null; target_id: string | null; detail: string | null; ip: string | null; created_at: string }[]
  res.json({ audit: rows })
})

// ---------------------------------------------------------------------------
// Media upload
// ---------------------------------------------------------------------------

const MEDIA_ALLOWED = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif'])
const MEDIA_MAX_BYTES = 2 * 1024 * 1024

function mediaDir(): string {
  const dir = config.mediaDir || join(config.dataDir || join(process.cwd(), 'data'), 'media')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return dir
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MEDIA_MAX_BYTES, files: 1 },
})

adminRouter.post('/media', requireAdmin, requireCsrf, upload.single('file'), (req, res, next) => {
  try {
    if (!req.file) { next(badRequest('No file uploaded.')); return }
    const ext = extname(req.file.originalname).toLowerCase()
    if (!MEDIA_ALLOWED.has(ext)) {
      next(badRequest(`File type ${ext || 'unknown'} not allowed. Allowed: ${[...MEDIA_ALLOWED].join(', ')}`))
      return
    }
    const name = `${Date.now()}-${randomBytes(6).toString('hex')}${ext}`
    const dest = join(mediaDir(), name)
    writeFileSync(dest, req.file.buffer)
    recordAudit(req.admin!, 'media.upload', 'media', name, undefined, req)
    res.json({ ok: true, url: `/media/${name}` })
  } catch (e) {
    next(e)
  }
})
