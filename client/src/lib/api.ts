import type { Language } from '../i18n'

export interface ProjectLocale {
  lang: Language
  name: string
  short: string
  full: string
}

export interface Project {
  id: number
  slug: string
  category: string
  sourceDescription: string
  status: 'published' | 'draft'
  statusNote: string | null
  coverImage: string | null
  url: string | null
  repositoryUrl: string | null
  technologies: string[]
  capabilities: string[]
  createdAt: string
  updatedAt: string
  locales: ProjectLocale[]
}

export interface CategoryInfo {
  key: string
  labels: Record<Language, string>
}

export interface ContentMap {
  [key: string]: Record<Language, string>
}

const BASE = '/api'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body?.error?.message || `Request failed (${res.status})`
    throw new ApiError(res.status, message, body?.error?.details)
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/* ---------------- Public ---------------- */

export function fetchProjects(params: {
  lang?: Language
  category?: string
  search?: string
  sort?: string
}): Promise<{ projects: Project[]; total: number; categories: string[] }> {
  const q = new URLSearchParams()
  if (params.lang) q.set('lang', params.lang)
  if (params.category) q.set('category', params.category)
  if (params.search) q.set('search', params.search)
  if (params.sort) q.set('sort', params.sort)
  const qs = q.toString()
  return request(`/projects${qs ? `?${qs}` : ''}`)
}

export function fetchProject(slug: string, lang: Language): Promise<{ project: Project }> {
  return request(`/projects/${encodeURIComponent(slug)}?lang=${lang}`)
}

export function fetchCategories(): Promise<{ categories: CategoryInfo[] }> {
  return request('/categories')
}

export function fetchContent(): Promise<{ content: ContentMap }> {
  return request('/content')
}

export interface ContactPayload {
  name: string
  email: string
  company?: string
  projectType?: string
  message: string
  consent: boolean
}
export function submitContact(data: ContactPayload): Promise<{ ok: boolean; id: number }> {
  return request('/contact', { method: 'POST', body: JSON.stringify(data) })
}

/* ---------------- Admin ---------------- */

interface CsrfCarrier {
  csrf?: string
}
export function adminRequest<T>(path: string, options: RequestInit & CsrfCarrier = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(options.headers as Record<string, string>) }
  if (options.csrf) headers['X-CSRF-Token'] = options.csrf
  return request(`/admin${path}`, { ...options, headers })
}

export function adminLogin(email: string, password: string): Promise<{ ok: boolean; admin: { email: string; role: string }; csrf: string }> {
  return request('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}
export function adminMe(): Promise<{ admin: { email: string; role: string } }> {
  return request('/admin/me')
}
/** Re-fetch the CSRF token for the current session after a full page reload. */
export function adminCsrf(): Promise<{ csrf: string }> {
  return request('/admin/csrf')
}
export function adminLogout(csrf?: string): Promise<{ ok: boolean }> {
  return adminRequest('/logout', { method: 'POST', csrf })
}
export interface AdminOverview {
  total: number
  byCat: { category: string; c: number }[]
  published: number
  drafts: number
  recent: { id: number; slug: string; status: string; updated_at: string }[]
  unreadMessages: number
}
export function adminOverview(): Promise<AdminOverview> {
  return adminRequest('/overview')
}
export function adminProjects(params: {
  page?: number
  limit?: number
  category?: string
  search?: string
  status?: string
  sort?: string
}): Promise<{ projects: Project[]; total: number; page: number; limit: number }> {
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) if (v !== undefined) q.set(k, String(v))
  return adminRequest(`/projects?${q.toString()}`)
}
export function adminProject(slug: string): Promise<{ project: Project }> {
  return adminRequest(`/projects/${encodeURIComponent(slug)}`)
}
export interface ProjectPayload {
  slug: string
  category: string
  status: 'published' | 'draft'
  sourceDescription: string
  statusNote?: string | null
  coverImage?: string | null
  url?: string | null
  repositoryUrl?: string | null
  technologies: string[]
  capabilities: string[]
  locales: Record<Language, { name: string; short: string; full: string }>
}
export function adminCreateProject(p: ProjectPayload, csrf: string): Promise<{ ok: boolean; id: number; slug: string }> {
  return adminRequest('/projects', { method: 'POST', csrf, body: JSON.stringify(p) })
}
export function adminUpdateProject(slug: string, p: ProjectPayload, csrf: string): Promise<{ ok: boolean }> {
  return adminRequest(`/projects/${encodeURIComponent(slug)}`, { method: 'PUT', csrf, body: JSON.stringify(p) })
}
export function adminSetProjectStatus(slug: string, status: 'published' | 'draft', csrf: string): Promise<{ ok: boolean; status: string }> {
  return adminRequest(`/projects/${encodeURIComponent(slug)}/status`, { method: 'PATCH', csrf, body: JSON.stringify({ status }) })
}
export function adminDeleteProject(slug: string, csrf: string): Promise<{ ok: boolean }> {
  return adminRequest(`/projects/${encodeURIComponent(slug)}`, { method: 'DELETE', csrf })
}
export interface SiteContent {
  defaults: ContentMap
  overrides: Record<string, Partial<Record<Language, string>>>
}
export function adminSettings(): Promise<SiteContent> {
  return adminRequest('/settings')
}
export function adminSaveSettings(content: Record<string, Partial<Record<Language, string>>>, csrf: string): Promise<{ ok: boolean }> {
  return adminRequest('/settings', { method: 'PUT', csrf, body: JSON.stringify({ content }) })
}
export interface ContactMessage {
  id: number
  name: string
  email: string
  company: string | null
  project_type: string | null
  message: string
  status: 'unread' | 'read' | 'resolved' | 'archived'
  created_at: string
  updated_at: string
}
export function adminMessages(params?: { status?: string; search?: string }): Promise<{ messages: ContactMessage[] }> {
  const q = new URLSearchParams()
  if (params?.status) q.set('status', params.status)
  if (params?.search) q.set('search', params.search)
  const qs = q.toString()
  return adminRequest(`/messages${qs ? `?${qs}` : ''}`)
}
export function adminSetMessageStatus(id: number, status: string, csrf: string): Promise<{ ok: boolean }> {
  return adminRequest(`/messages/${id}/status`, { method: 'PATCH', csrf, body: JSON.stringify({ status }) })
}
export function adminDeleteMessage(id: number, csrf: string): Promise<{ ok: boolean }> {
  return adminRequest(`/messages/${id}`, { method: 'DELETE', csrf })
}
export interface AuditEntry {
  id: number
  actor_id: number | null
  actor_email: string | null
  action: string
  target_type: string | null
  target_id: string | null
  detail: string | null
  ip: string | null
  created_at: string
}
export function adminAudit(limit = 100): Promise<{ audit: AuditEntry[] }> {
  return adminRequest(`/audit?limit=${limit}`)
}
export function adminUploadMedia(file: File, csrf: string): Promise<{ ok: boolean; url: string }> {
  const form = new FormData()
  form.append('file', file)
  const res = fetch(`${BASE}/admin/media`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'X-CSRF-Token': csrf },
    body: form,
  })
    .then(async (r) => {
      const body = await r.json().catch(() => ({}))
      if (!r.ok) throw new ApiError(r.status, body?.error?.message || 'Upload failed', body?.error?.details)
      return body
    })
  return res
}
export function adminChangePassword(current: string, next: string, csrf: string): Promise<{ ok: boolean }> {
  return adminRequest('/me/password', { method: 'POST', csrf, body: JSON.stringify({ current, next }) })
}
