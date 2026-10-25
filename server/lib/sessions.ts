import { randomBytes, createHash, timingSafeEqual } from 'node:crypto'
import { parse, serialize } from 'cookie'
import type { Request, Response } from 'express'
import { getDb } from '../db.js'
import { config, isProduction } from '../config.js'

const COOKIE_NAME = 'prism_admin'
const COOKIE_OPTS: Record<string, string | number | boolean> = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: isProduction,
  maxAge: Math.floor(config.sessionMaxAgeMs / 1000),
}

function sha256(s: string): string {
  return createHash('sha256').update(s).digest('hex')
}

function safeEq(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export interface SessionAdmin {
  id: number
  email: string
  role: string
  /** Stored as sha256(rawCsrf); used to verify the client's CSRF token. */
  csrfHash: string
  /** Raw CSRF token, retrievable by the session holder via GET /admin/csrf. */
  csrfRaw: string | null
}

/** Create a new session. Returns { token, csrf } — the raw values sent to the client. */
export function createSession(adminId: number): { token: string; csrf: string } {
  const db = getDb()
  const token = randomBytes(32).toString('hex')
  const csrf = randomBytes(16).toString('hex')
  const expiresAt = new Date(Date.now() + config.sessionMaxAgeMs).toISOString()
  db.prepare('INSERT INTO sessions (token_hash, admin_id, csrf_hash, csrf_raw, expires_at) VALUES (?,?,?,?,?)')
    .run(sha256(token), adminId, sha256(csrf), csrf, expiresAt)
  return { token, csrf }
}

export function destroySession(token: string | undefined): void {
  if (!token) return
  getDb().prepare('DELETE FROM sessions WHERE token_hash = ?').run(sha256(token))
}

export function setSessionCookie(res: Response, token: string): void {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, token, COOKIE_OPTS))
}

export function clearSessionCookie(res: Response): void {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, '', { ...COOKIE_OPTS, maxAge: 0 }))
}

/** Look up the session for a raw cookie token. Returns null if absent/expired. */
export function getSession(token: string | undefined): SessionAdmin | null {
  if (!token) return null
  const db = getDb()
  const row = db.prepare(`
    SELECT s.csrf_hash, s.csrf_raw, s.expires_at, a.id AS admin_id, a.email, a.role
    FROM sessions s JOIN administrators a ON a.id = s.admin_id
    WHERE s.token_hash = ?
  `).get(sha256(token)) as
    | { admin_id: number; email: string; role: string; csrf_hash: string; csrf_raw: string | null; expires_at: string }
    | undefined
  if (!row) return null
  if (new Date(row.expires_at).getTime() < Date.now()) {
    db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(sha256(token))
    return null
  }
  return { id: row.admin_id, email: row.email, role: row.role, csrfHash: row.csrf_hash, csrfRaw: row.csrf_raw }
}

/** Compare a client-provided raw CSRF token to the session's stored hash. */
export function verifyCsrf(session: SessionAdmin, provided: string | undefined): boolean {
  if (!provided) return false
  return safeEq(session.csrfHash, sha256(provided))
}

/** Read the raw admin session cookie from an Express request. */
export function readSessionToken(req: Request): string | undefined {
  const header = req.headers.cookie
  if (!header) return undefined
  const cookies = parse(header)
  return cookies[COOKIE_NAME]
}

export { COOKIE_NAME }
