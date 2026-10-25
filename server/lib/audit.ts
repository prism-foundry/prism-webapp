import type { Request } from 'express'
import { getDb } from '../db.js'

export interface AuditActor {
  id?: number | null
  email?: string | null
}

/**
 * Record an administrative action. Never pass passwords, session tokens or
 * other secrets in `detail` — this function redacts them defensively.
 */
export function recordAudit(
  actor: AuditActor,
  action: string,
  targetType?: string,
  targetId?: string,
  detail?: string,
  req?: Request,
): void {
  const db = getDb()
  const safeDetail = detail ? redact(detail) : undefined
  const ip = req?.ip || (req?.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || undefined
  db.prepare(
    `INSERT INTO audit_log (actor_id, actor_email, action, target_type, target_id, detail, ip)
     VALUES (?,?,?,?,?,?,?)`,
  ).run(actor.id ?? null, actor.email ?? null, action, targetType ?? null, targetId ?? null, safeDetail ?? null, ip ?? null)
}

/** Strip values that look like credentials from a free-text detail string. */
function redact(detail: string): string {
  return detail
    .replace(/(password|passwd|secret|token)\s*[:=]\s*\S+/gi, '$1: [REDACTED]')
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [REDACTED]')
}
