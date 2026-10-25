import express from 'express'
import { rateLimit } from 'express-rate-limit'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdirSync } from 'node:fs'
import { config } from './config.js'
import { getDb, dataDir, migrate } from './db.js'
import { publicRouter } from './routes/public.js'
import { adminRouter } from './routes/admin.js'
import { handleError } from './lib/errors.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function main(): Promise<void> {
  migrate()
  const db = getDb()

  // One-time bootstrap admin (only if none exists and env vars are provided).
  if (config.bootstrapAdminEmail && config.bootstrapAdminPassword) {
    const count = (db.prepare('SELECT COUNT(*) c FROM administrators').get() as { c: number }).c
    if (count === 0) {
      const { hashPassword } = await import('./lib/passwords.js')
      const hash = await hashPassword(config.bootstrapAdminPassword)
      db.prepare('INSERT INTO administrators (email, password_hash, role) VALUES (?,?,?)').run(
        config.bootstrapAdminEmail.toLowerCase().trim(), hash, 'admin',
      )
      console.log(`[prism] Created bootstrap admin: ${config.bootstrapAdminEmail}`)
    }
  }

  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1)

  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true, limit: '1mb' }))

  // Global API rate limit (loose) to blunt brute force.
  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }))

  // Public API.
  app.use('/api', publicRouter)
  // Admin API.
  app.use('/api/admin', adminRouter)

  // Uploaded media (validated uploads only).
  const mediaDir = config.mediaDir || join(dataDir(), 'media')
  mkdirSync(mediaDir, { recursive: true })
  app.use('/media', express.static(mediaDir, { fallthrough: false, maxAge: '7d' }))

  // Static public site (production build) + SPA fallback, when present.
  const publicDir = config.publicDir || resolve(join(__dirname, '..', 'dist', 'public'))
  if (existsSync(publicDir)) {
    app.use(express.static(publicDir))
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/') || req.path.startsWith('/media/')) return next()
      res.sendFile(join(publicDir, 'index.html'))
    })
  }

  app.use((_req, res) => res.status(404).json({ error: { status: 404, message: 'Not found' } }))
  app.use(handleError)

  const server = app.listen(config.port, config.host, () => {
    console.log(`[prism] API listening on http://${config.host}:${config.port}`)
    if (!existsSync(publicDir)) console.log('[prism] No public build found — run `npm run build` for static serving.')
  })

  const shutdown = () => {
    server.close()
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

main().catch((err) => {
  console.error('[prism] Fatal startup error:', err)
  process.exit(1)
})
