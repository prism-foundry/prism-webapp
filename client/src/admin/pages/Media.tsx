import { useRef, useState } from 'react'
import { useAdminT } from '../../i18n/admin'
import { useAdminSession } from '../AdminProvider'
import { adminUploadMedia } from '../../lib/api'
import { Button, toast } from '../../ui'

const MAX_BYTES = 2 * 1024 * 1024
const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif)$/i

export function Media() {
  const at = useAdminT()
  const { csrf } = useAdminSession()
  const fileRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const onFile = async (file: File | null) => {
    if (!file) return
    setError(null)
    if (file.size > MAX_BYTES) { setError(at('admin.media.tooLarge')); return }
    if (!IMAGE_RE.test(file.name)) { setError(at('admin.media.badType')); return }
    setBusy(true)
    try {
      const r = await adminUploadMedia(file, csrf)
      setUrl(r.url)
      toast(at('admin.media.uploaded'), 'success')
    } catch {
      setError(at('admin.media.uploadError'))
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const copyUrl = async () => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <div style={{ maxWidth: '46rem' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-1)' }}>{at('admin.media.title')}</h1>
      <p className="muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-6)' }}>{at('admin.media.desc')}</p>

      <div className="card" style={{ padding: 'var(--sp-5)' }}>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
          style={{ display: 'none' }}
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={busy}>
            {at('admin.media.select')}
          </Button>
          {url && (
            <Button variant="ghost" size="sm" onClick={copyUrl}>{copied ? '✓' : at('admin.media.upload')}</Button>
          )}
        </div>

        {error && <p role="alert" style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--danger)' }}>{error}</p>}

        {url ? (
          <div style={{ marginTop: 'var(--sp-5)', display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <img src={url} alt="" style={{ width: '14rem', maxWidth: '100%', borderRadius: 'var(--r-md)', border: '1px solid var(--line)' }} />
            <div style={{ flex: 1, minWidth: '14rem' }}>
              <p className="muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--sp-2)' }}>{at('admin.media.uploaded')}</p>
              <code className="mono" style={{ fontSize: 'var(--text-sm)', wordBreak: 'break-all', color: 'var(--accent)' }}>{url}</code>
            </div>
          </div>
        ) : (
          <p className="muted" style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--text-sm)' }}>{at('admin.media.empty')}</p>
        )}
      </div>
    </div>
  )
}
