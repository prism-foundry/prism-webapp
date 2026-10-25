import { type ReactNode, useEffect, useRef } from 'react'

/**
 * Reveals its children on scroll via an IntersectionObserver (progressive
 * enhancement). The CSS transition lives in `.reveal`/`.is-visible`; respects
 * prefers-reduced-motion because the CSS disables the transition there.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div' }: { children: ReactNode; delay?: number; as?: 'div' | 'li' | 'article' }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref as never} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}
