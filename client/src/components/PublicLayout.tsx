import { type ReactNode } from 'react'
import { Nav } from './Nav'
import { Footer } from './Footer'

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  )
}
