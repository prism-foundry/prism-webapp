import { useI18n } from '../i18n'
import { Reveal } from '../components/Reveal'

const STEPS = [
  { n: 1, title: 'about.lifecycle.step1' as const, desc: 'about.lifecycle.step1Desc' as const, color: 'var(--spectrum-1)' },
  { n: 2, title: 'about.lifecycle.step2' as const, desc: 'about.lifecycle.step2Desc' as const, color: 'var(--spectrum-2)' },
  { n: 3, title: 'about.lifecycle.step3' as const, desc: 'about.lifecycle.step3Desc' as const, color: 'var(--spectrum-3)' },
  { n: 4, title: 'about.lifecycle.step4' as const, desc: 'about.lifecycle.step4Desc' as const, color: 'var(--spectrum-5)' },
]

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <Reveal>
          <div className="section-head" style={{ maxWidth: '58rem' }}>
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h2 style={{ fontSize: 'var(--text-3xl)' }}>{t('about.title')}</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-lg)' }}>{t('about.lede')}</p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))', gap: 'var(--sp-5)', marginBlockStart: 'var(--sp-5)' }}>
          <Reveal as="article" delay={0}>
            <div className="card card-hover" style={{ padding: 'var(--sp-6)', height: '100%' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-3)' }}>{t('about.story.title')}</h3>
              <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{t('about.story.p1')}</p>
            </div>
          </Reveal>
          <Reveal as="article" delay={120}>
            <div className="card card-hover" style={{ padding: 'var(--sp-6)', height: '100%' }}>
              <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{t('about.story.p2')}</p>
            </div>
          </Reveal>
        </div>

        {/* Data → knowledge lifecycle */}
        <div style={{ marginBlockStart: 'var(--sp-9)' }}>
          <Reveal>
            <span className="eyebrow">{t('about.lifecycle.eyebrow')}</span>
            <h3 style={{ fontSize: 'var(--text-2xl)', marginBlock: 'var(--sp-3) var(--sp-5)' }}>{t('about.lifecycle.title')}</h3>
          </Reveal>

          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))', gap: 'var(--sp-4)', position: 'relative' }}>
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 110}>
                <div className="card" style={{ padding: 'var(--sp-5)', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div aria-hidden style={{ position: 'absolute', insetInlineStart: 0, insetBlockStart: 0, width: '100%', height: '3px', background: s.color }} />
                  <div className="mono" style={{ fontSize: 'var(--text-2xl)', color: s.color, marginBottom: 'var(--sp-3)' }}>
                    0{s.n}
                  </div>
                  <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>{t(s.title)}</h4>
                  <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{t(s.desc)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
