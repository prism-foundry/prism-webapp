import { type ReactNode } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAdminSession } from './AdminProvider'
import { AdminShell } from './AdminShell'
import { Spinner } from '../ui'
import { Login } from './pages/Login'
import { Overview } from './pages/Overview'
import { Projects } from './pages/Projects'
import { Messages } from './pages/Messages'
import { Content } from './pages/Content'
import { Media } from './pages/Media'
import { Audit } from './pages/Audit'
import { Settings } from './pages/Settings'

function Protected() {
  const { status } = useAdminSession()
  if (status === 'checking') {
    return (
      <div style={{ minHeight: '100svh', display: 'grid', placeItems: 'center' }}>
        <Spinner />
      </div>
    )
  }
  if (status !== 'authed') return <Navigate to="/admin/login" replace />
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  )
}

function Page({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

export function AdminApp() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route element={<Protected />}>
        <Route path="/admin" element={<Page><Overview /></Page>} />
        <Route path="/admin/projects" element={<Page><Projects /></Page>} />
        <Route path="/admin/messages" element={<Page><Messages /></Page>} />
        <Route path="/admin/content" element={<Page><Content /></Page>} />
        <Route path="/admin/media" element={<Page><Media /></Page>} />
        <Route path="/admin/audit" element={<Page><Audit /></Page>} />
        <Route path="/admin/settings" element={<Page><Settings /></Page>} />
      </Route>
      <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
