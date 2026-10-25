import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useI18n } from './i18n'
import { PublicLayout } from './components/PublicLayout'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Capabilities } from './sections/Capabilities'
import { Projects } from './sections/Projects'
import { Technology } from './sections/Technology'
import { Contact } from './sections/Contact'
import { AdminApp } from './admin/AdminApp'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

/** The public site is a single scrolling page with anchor sections. */
function PublicHome() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Capabilities />
      <Projects />
      <Technology />
      <Contact />
    </main>
  )
}

export default function App() {
  const { t } = useI18n()
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        {t('a11y.skip')}
      </a>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<PublicLayout><PublicHome /></PublicLayout>} />
      </Routes>
    </>
  )
}
