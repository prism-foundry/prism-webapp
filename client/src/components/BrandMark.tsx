interface Props {
  size?: number
  withWordmark?: boolean
}

/**
 * PRISM brand mark: a geometric prism that refracts a beam of light into a
 * spectral fan. Built as editable inline SVG so it scales crisply and can be
 * recolored via CSS (currentColor for the outline).
 */
export function BrandMark({ size = 28, withWordmark = false }: Props) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }} aria-hidden={withWordmark ? false : undefined}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="PRISM logo"
      >
        <defs>
          <linearGradient id="prism-spectrum" x1="4" y1="8" x2="36" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7FD6F2" />
            <stop offset="0.5" stopColor="#C7CEEC" />
            <stop offset="1" stopColor="#B49BEA" />
          </linearGradient>
        </defs>
        <path d="M20 6 L35 31 H5 Z" stroke="url(#prism-spectrum)" strokeWidth="2" strokeLinejoin="round" fill="none" />
        {/* incoming beam */}
        <path d="M2 15 L20 6" stroke="#7FD6F2" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
        {/* refracted spectrum */}
        <path d="M20 12 L38 22" stroke="#7FD6F2" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
        <path d="M20 16 L38 27" stroke="#9FB0FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
        <path d="M20 20 L38 32" stroke="#B49BEA" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M20 24 L38 37" stroke="#F0C48F" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </svg>
      {withWordmark && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            letterSpacing: '0.28em',
            fontSize: '0.95rem',
            color: 'var(--ink-1)',
            textTransform: 'uppercase',
          }}
        >
          PRISM
        </span>
      )}
    </span>
  )
}

export default BrandMark
