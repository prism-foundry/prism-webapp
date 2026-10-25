import { resolve } from 'node:path'

export const isProduction = process.env.NODE_ENV === 'production'

export const config = {
  port: Number(process.env.PORT || 3001),
  host: process.env.HOST || '0.0.0.0',
  /** Where the SQLite database and uploaded media live. */
  dataDir: process.env.PRISM_DATA_DIR ? resolve(process.env.PRISM_DATA_DIR) : undefined,
  dbFile: process.env.PRISM_DB_FILE ? resolve(process.env.PRISM_DB_FILE) : undefined,
  /** Served under /media at runtime. */
  mediaDir: process.env.PRISM_MEDIA_DIR
    ? resolve(process.env.PRISM_MEDIA_DIR)
    : undefined,
  /** Session lifetime in milliseconds (default 8h). */
  sessionMaxAgeMs: Number(process.env.PRISM_SESSION_MAX_AGE_MS || 8 * 60 * 60 * 1000),
  publicUrl: process.env.PRISM_PUBLIC_URL || `http://localhost:${process.env.PORT || 3001}`,
  /** Static public site directory (dist/public). */
  publicDir: process.env.PRISM_PUBLIC_DIR,
  /**
   * One-time bootstrap admin email/password. If set, the server will create
   * the first admin on startup if none exists, then you should create further
   * admins with `npm run create-admin`.
   */
  bootstrapAdminEmail: process.env.PRISM_ADMIN_EMAIL,
  bootstrapAdminPassword: process.env.PRISM_ADMIN_PASSWORD,
} as const

export function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required environment variable: ${name}`)
  return v
}
