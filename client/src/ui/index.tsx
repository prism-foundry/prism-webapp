import { type ButtonHTMLAttributes, type CSSProperties, type ReactNode, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

/* ------------------------------------------------------------------ */
/* Button                                                             */
/* ------------------------------------------------------------------ */

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md'
  loading?: boolean
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', loading = false, disabled, children, className = '', ...rest }: BtnProps) {
  const cls = ['btn', `btn-${variant}`, size === 'sm' ? 'btn-sm' : '', className].filter(Boolean).join(' ')
  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading && (
        <span
          aria-hidden
          style={{
            width: '1em',
            height: '1em',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'prism-spin 0.7s linear infinite',
            display: 'inline-block',
          }}
        />
      )}
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Badge                                                              */
/* ------------------------------------------------------------------ */

export function Badge({
  children,
  tone = 'default',
  className = '',
  style,
  title,
}: {
  children: ReactNode
  tone?: 'default' | 'accent' | 'success' | 'warn' | 'draft'
  className?: string
  style?: CSSProperties
  title?: string
}) {
  const cls = ['badge', tone !== 'default' ? `badge-${tone}` : '', className].filter(Boolean).join(' ')
  return <span className={cls} style={style} title={title}>{children}</span>
}

/* ------------------------------------------------------------------ */
/* Spinner                                                            */
/* ------------------------------------------------------------------ */

export function Spinner({ label }: { label?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-3)',
        padding: 'var(--sp-6)',
        color: 'var(--ink-3)',
        fontSize: 'var(--text-sm)',
      }}
      role="status"
    >
      <span
        aria-hidden
        style={{
          width: '1.25rem',
          height: '1.25rem',
          border: '2px solid var(--line-strong)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'prism-spin 0.7s linear infinite',
          display: 'inline-block',
        }}
      />
      {label || '…'}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Modal                                                              */
/* ------------------------------------------------------------------ */

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  ariaLabel?: string
}

export function Modal({ open, onClose, title, children, ariaLabel }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    ref.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(3, 5, 12, 0.75)',
        backdropFilter: 'blur(6px)',
        animation: 'prism-fade 200ms ease',
      }}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabel ? undefined : titleId}
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '52rem',
          maxHeight: '88vh',
          overflowY: 'auto',
          background: 'var(--surface-solid)',
          border: '1px solid var(--line-strong)',
          borderRadius: 'var(--r-xl)',
          boxShadow: 'var(--shadow-3)',
          animation: 'prism-fade 250ms var(--ease-out)',
          outline: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--sp-4)',
            padding: 'var(--sp-5) var(--sp-5) 0',
            position: 'sticky',
            top: 0,
            background: 'var(--surface-solid)',
            zIndex: 1,
          }}
        >
          <h2 id={titleId} style={{ fontSize: 'var(--text-2xl)', marginBottom: 0 }}>
            {title}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
        <div style={{ padding: 'var(--sp-5)' }}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}

/* ------------------------------------------------------------------ */
/* Field wrapper                                                      */
/* ------------------------------------------------------------------ */

export function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
}: {
  label: string
  hint?: string
  error?: string
  children: ReactNode
  htmlFor?: string
}) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && !error && <span className="hint">{hint}</span>}
      {error && <span className="error" role="alert">{error}</span>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Toast                                                              */
/* ------------------------------------------------------------------ */

let toastRoot: HTMLDivElement | null = null
function ensureToastRoot() {
  if (toastRoot) return toastRoot
  const div = document.createElement('div')
  div.style.cssText =
    'position:fixed;inset-block-end:1rem;inset-inline-end:1rem;z-index:var(--z-modal);display:flex;flex-direction:column;gap:.5rem'
  document.body.appendChild(div)
  toastRoot = div
  return div
}

export function toast(message: string, tone: 'info' | 'success' | 'error' = 'info', duration = 4000) {
  const root = ensureToastRoot()
  const el = document.createElement('div')
  const color = tone === 'success' ? 'var(--success)' : tone === 'error' ? 'var(--danger)' : 'var(--accent)'
  el.style.cssText = `padding:.75rem 1rem;background:var(--surface-solid);border:1px solid var(--line-strong);border-inline-start:3px solid ${color};border-radius:var(--r-md);box-shadow:var(--shadow-2);max-width:22rem;font-size:var(--text-sm);color:var(--ink-1);animation:prism-fade 200ms ease`
  el.setAttribute('role', 'status')
  el.textContent = message
  root.appendChild(el)
  setTimeout(() => {
    el.style.transition = 'opacity 200ms'
    el.style.opacity = '0'
    setTimeout(() => el.remove(), 200)
  }, duration)
}
