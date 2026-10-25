import { useI18n } from '../i18n'
import { Reveal } from '../components/Reveal'

interface Cap {
  key: 'cap.ai-ml' | 'cap.data-intelligence' | 'cap.nlp-speech' | 'cap.cv-ocr' | 'cap.fraud-risk' | 'cap.predictive' | 'cap.data-engineering' | 'cap.automation'
  icon: string
  color: string
}

// Eight capabilities, derived from the project portfolio groupings.
const CAPS: Cap[] = [
  { key: 'cap.ai-ml', icon: 'M12 2 3 7v10l9 5 9-5V7l-9-5Z', color: 'var(--spectrum-1)' },
  { key: 'cap.data-intelligence', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2', color: 'var(--spectrum-2)' },
  { key: 'cap.nlp-speech', icon: 'M4 5h16v10H8l-4 4V5Z', color: 'var(--spectrum-3)' },
  { key: 'cap.cv-ocr', icon: 'M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3', color: 'var(--spectrum-4)' },
  { key: 'cap.fraud-risk', icon: 'M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z', color: 'var(--spectrum-6)' },
  { key: 'cap.predictive', icon: 'M3 17l5-5 4 3 6-7M20 8h3v3', color: 'var(--spectrum-5)' },
  { key: 'cap.data-engineering', icon: 'M12 3v6M9 6l3-3 3 3M5 21h14M7 21V11h10v10', color: 'var(--spectrum-1)' },
  { key: 'cap.automation', icon: 'M12 8V4m0 16v-4M8 12H4m16 0h-4M9 9l-2-2m10 10 2 2M15 9l2-2M7 17l-2 2', color: 'var(--spectrum-3)' },
]

export function Capabilities() {
  const { t } = useI18n()

  return (
    <section id="capabilities" className="section" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">{t('cap.eyebrow')}</span>
            <h2 style={{ fontSize: 'var(--text-3xl)' }}>{t('cap.title')}</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-lg)' }}>{t('cap.lede')}</p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))', gap: 'var(--sp-4)' }}>
          {CAPS.map((cap, i) => (
            <Reveal as="article" key={cap.key} delay={(i % 4) * 90}>
              <div className="card card-hover" style={{ padding: 'var(--sp-5)', height: '100%', transitionDelay: `${(i % 4) * 60}ms` }}>
                <span
                  aria-hidden
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: 'var(--r-md)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--line)',
                    color: cap.color,
                    marginBottom: 'var(--sp-4)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={cap.icon} />
                  </svg>
                </span>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>{t(`${cap.key}.title` as const)}</h3>
                <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{t(`${cap.key}.desc` as const)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
