import { closeDb, getDb, migrate } from '../db.js'
import { SEED_PROJECTS, LANGUAGES } from '../seed/index.js'

/**
 * Idempotent seed of the 35 original projects.
 *
 * Default behavior: INSERT-ONLY. A project whose slug already exists (active
 * or soft-deleted) is left untouched, so admin edits and deletes are respected
 * and reruns never duplicate. Use `--reset` to wipe project data and re-import
 * (intended for local development / tests only).
 */
const args = new Set(process.argv.slice(2))
const reset = args.has('--reset')

migrate()
const db = getDb()

if (reset) {
  db.exec('DELETE FROM project_locales')
  db.exec("DELETE FROM projects")
  console.log('Reset: removed existing projects.')
}

const insProject = db.prepare(`
  INSERT INTO projects (slug, category, source_description, status, status_note, technologies, capabilities)
  VALUES (?,?,?,?,?,?,?)
`)
const insLocale = db.prepare('INSERT INTO project_locales (project_id, lang, name, short, full) VALUES (?,?,?,?,?)')

let inserted = 0
let skipped = 0

const txn = () => {
  db.exec('BEGIN')
  for (const p of SEED_PROJECTS) {
    const existing = db.prepare('SELECT id FROM projects WHERE slug = ?').get(p.slug) as { id: number } | undefined
    if (existing) {
      skipped++
      continue
    }
    const r = insProject.run(
      p.slug, p.category, p.sourceDescription, p.status, p.statusNote ?? null,
      JSON.stringify(p.technologies), JSON.stringify(p.capabilities),
    )
    const id = Number(r.lastInsertRowid)
    for (const lang of LANGUAGES) {
      const loc = p.locales[lang]
      insLocale.run(id, lang, loc.name, loc.short, loc.full)
    }
    inserted++
  }
  db.exec('COMMIT')
}
txn()

const total = (db.prepare('SELECT COUNT(*) c FROM projects').get() as { c: number }).c
console.log(`Seed complete. Inserted: ${inserted}, skipped (already present): ${skipped}. Total in DB: ${total}.`)
if (total !== 35) console.warn(`WARNING: expected 35 projects, found ${total}.`)

closeDb()
