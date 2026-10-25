import { closeDb, getDb, migrate } from '../db.js'
import { hashPassword } from '../lib/passwords.js'

/**
 * Create an administrator.
 *
 *   # From environment (preferred — nothing secret on the command line):
 *   PRISM_ADMIN_EMAIL=admin@example.com PRISM_ADMIN_PASSWORD='S3cret!' npm run create-admin
 *
 *   # Optional second admin with the editor role:
 *   PRISM_ADMIN_EMAIL=... PRISM_ADMIN_PASSWORD=... PRISM_ADMIN_ROLE=editor npm run create-admin
 *
 * Refuses to overwrite an existing account and never prints the password.
 */
migrate()

const email = (process.env.PRISM_ADMIN_EMAIL || '').trim().toLowerCase()
const password = process.env.PRISM_ADMIN_PASSWORD || ''
const role = (process.env.PRISM_ADMIN_ROLE || 'admin').toLowerCase()

if (!email || !password) {
  console.error('Set PRISM_ADMIN_EMAIL and PRISM_ADMIN_PASSWORD environment variables first.')
  console.error('Example: PRISM_ADMIN_EMAIL=admin@example.com PRISM_ADMIN_PASSWORD="S3cret" npm run create-admin')
  process.exit(1)
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('PRISM_ADMIN_EMAIL is not a valid email address.')
  process.exit(1)
}
if (password.length < 10) {
  console.error('PRISM_ADMIN_PASSWORD must be at least 10 characters.')
  process.exit(1)
}
if (role !== 'admin' && role !== 'editor') {
  console.error('PRISM_ADMIN_ROLE must be "admin" or "editor".')
  process.exit(1)
}

const db = getDb()
const existing = db.prepare('SELECT id FROM administrators WHERE email = ?').get(email) as { id: number } | undefined
if (existing) {
  console.error(`An administrator with email ${email} already exists (id ${existing.id}).`)
  process.exit(1)
}

const hash = await hashPassword(password)
const r = db.prepare('INSERT INTO administrators (email, password_hash, role) VALUES (?,?,?)').run(email, hash, role)
console.log(`Administrator created: ${email} (role: ${role}, id ${Number(r.lastInsertRowid)}).`)
console.log('Store the password securely — it will not be shown again.')

closeDb()
