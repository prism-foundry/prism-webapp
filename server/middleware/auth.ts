import type { NextFunction, Request, Response } from 'express'
import { forbidden, unauthorized } from '../lib/errors.js'
import { getSession, readSessionToken, verifyCsrf, type SessionAdmin } from '../lib/sessions.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: SessionAdmin
    }
  }
}

/**
 * Express middleware: require a valid admin session. Attaches req.admin and
 * the raw session token (req.sessionToken) for downstream CSRF / logout use.
 */
export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  const token = readSessionToken(req)
  const session = getSession(token)
  if (!session) {
    next(unauthorized())
    return
  }
  req.admin = session
  ;(req as Request & { sessionToken?: string }).sessionToken = token
  next()
}

/** Require the CSRF header to match the session (for mutating admin routes). */
export function requireCsrf(req: Request, _res: Response, next: NextFunction): void {
  if (!req.admin) {
    next(unauthorized())
    return
  }
  const provided = req.header('x-csrf-token')
  if (!verifyCsrf(req.admin, provided)) {
    next(forbidden('Invalid or missing CSRF token'))
    return
  }
  next()
}

/** Require a specific role (e.g. 'admin') beyond being authenticated. */
export function requireRole(role: string) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (req.admin && req.admin.role !== role) {
      next(forbidden('Insufficient permissions'))
      return
    }
    next()
  }
}
