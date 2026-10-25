import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { adminLogin, adminLogout, adminMe, adminCsrf, type ApiError } from '../lib/api'

interface AdminInfo {
  email: string
  role: string
}

interface AdminSessionValue {
  admin: AdminInfo | null
  csrf: string
  /** 'checking' during the initial session probe, 'anon' if no valid session, 'authed' if one exists. */
  status: 'checking' | 'anon' | 'authed'
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
}

const AdminCtx = createContext<AdminSessionValue | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminInfo | null>(null)
  const [csrf, setCsrf] = useState('')
  const [status, setStatus] = useState<'checking' | 'anon' | 'authed'>('checking')

  // Probe for an existing session on mount (full reload case).
  useEffect(() => {
    let alive = true
    adminMe()
      .then(({ admin }) => {
        if (!alive) return
        setAdmin(admin)
        return adminCsrf().then(({ csrf }) => alive && setCsrf(csrf))
      })
      .then(() => alive && setStatus('authed'))
      .catch(() => {
        if (!alive) return
        setAdmin(null)
        setStatus('anon')
      })
    return () => {
      alive = false
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const r = await adminLogin(email, password)
      setAdmin(r.admin)
      setCsrf(r.csrf)
      setStatus('authed')
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : 'Sign-in failed' }
    }
  }, [])

  const logout = useCallback(async () => {
    if (csrf) {
      try {
        await adminLogout(csrf)
      } catch {
        // ignore network errors on logout; clear local state regardless
      }
    }
    setAdmin(null)
    setCsrf('')
    setStatus('anon')
  }, [csrf])

  const value = useMemo<AdminSessionValue>(
    () => ({ admin, csrf, status, login, logout }),
    [admin, csrf, status, login, logout],
  )

  return <AdminCtx.Provider value={value}>{children}</AdminCtx.Provider>
}

export function useAdminSession(): AdminSessionValue {
  const ctx = useContext(AdminCtx)
  if (!ctx) throw new Error('useAdminSession must be used within AdminProvider')
  return ctx
}

export type { ApiError }
