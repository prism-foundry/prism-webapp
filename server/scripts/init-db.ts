import { closeDb, dataDir, getDb, migrate } from '../db.js'

const applied = migrate()
const db = getDb()
const tables = db
  .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name`)
  .all()
  .map((r) => (r as { name: string }).name)

console.log(`Database ready at: ${process.env.PRISM_DB_FILE || (process.env.PRISM_DATA_DIR || dataDir())}`)
if (applied.length) console.log(`Applied migrations: ${applied.join(', ')}`)
else console.log('All migrations already applied.')
console.log(`Tables: ${tables.join(', ')}`)

closeDb()
