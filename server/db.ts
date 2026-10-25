import { DatabaseSync } from 'node:sqlite'
import { readFileSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function dataDir(): string {
  const dir = process.env.PRISM_DATA_DIR
    ? resolve(process.env.PRISM_DATA_DIR)
    : join(__dirname, '..', 'data')
  mkdirSync(dir, { recursive: true })
  return dir
}

let db: DatabaseSync | null = null

export function getDb(): DatabaseSync {
  if (db) return db
  const file = process.env.PRISM_DB_FILE ? resolve(process.env.PRISM_DB_FILE) : join(dataDir(), 'prism.db')
  mkdirSync(dirname(file), { recursive: true })
  const d = new DatabaseSync(file)
  d.exec('PRAGMA journal_mode = WAL;')
  d.exec('PRAGMA foreign_keys = ON;')
  d.exec('PRAGMA busy_timeout = 5000;')
  db = d
  return d
}

export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}

/** Run all pending SQL migrations in the migrations/ directory, in name order. */
export function migrate(): string[] {
  const d = getDb()
  d.exec(`CREATE TABLE IF NOT EXISTS _migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  )`)
  const dir = join(__dirname, 'migrations')
  const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()
  const applied = new Set(d.prepare('SELECT name FROM _migrations').all().map((r) => (r as { name: string }).name))
  const done: string[] = []
  for (const f of files) {
    if (applied.has(f)) continue
    const sql = readFileSync(join(dir, f), 'utf8')
    const apply = d.prepare('INSERT INTO _migrations(name) VALUES (?)')
    d.exec('BEGIN')
    try {
      d.exec(sql)
      apply.run(f)
      d.exec('COMMIT')
      done.push(f)
    } catch (e) {
      d.exec('ROLLBACK')
      throw new Error(`Migration ${f} failed: ${(e as Error).message}`)
    }
  }
  return done
}
