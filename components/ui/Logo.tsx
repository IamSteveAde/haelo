'use client'

interface LogoProps {
  variant?: 'lime-on-white' | 'white-on-navy' | 'navy-on-white' | 'mono'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showWordmark?: boolean
  className?: string
}

const sizes = {
  sm: { symbol: 24, text: 16 },
  md: { symbol: 32, text: 20 },
  lg: { symbol: 40, text: 26 },
  xl: { symbol: 56, text: 36 },
}

export default function Logo({
  variant = 'lime-on-white',
  size = 'md',
  showWordmark = true,
  className = '',
}: LogoProps) {
  const { symbol, text } = sizes[size]

  const colors = {
    'lime-on-white': { symbol: '#25D366', text: '#0D1B2A', bg: 'transparent' },
    'white-on-navy': { symbol: '#FFFFFF', text: '#FFFFFF', bg: '#0D1B2A' },
    'navy-on-white': { symbol: '#0D1B2A', text: '#0D1B2A', bg: 'transparent' },
    mono: { symbol: '#1E1E1E', text: '#1E1E1E', bg: 'transparent' },
  }[variant]

  return (
    <div
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={{ background: colors.bg, padding: colors.bg !== 'transparent' ? '8px 12px' : 0, borderRadius: 8 }}
    >
      {/* H-within-arch symbol */}
      <svg
        width={symbol}
        height={symbol}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer arch — open at top */}
        <path
          d="M6 36 C6 36 6 18 20 10 C34 18 34 36 34 36"
          stroke={colors.symbol}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* H letterform */}
        <line x1="14" y1="19" x2="14" y2="34" stroke={colors.symbol} strokeWidth="3" strokeLinecap="round" />
        <line x1="26" y1="19" x2="26" y2="34" stroke={colors.symbol} strokeWidth="3" strokeLinecap="round" />
        <line x1="14" y1="26.5" x2="26" y2="26.5" stroke={colors.symbol} strokeWidth="3" strokeLinecap="round" />
      </svg>

      {showWordmark && (
        <span
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: text,
            fontWeight: 700,
            color: colors.text,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Haelo
        </span>
      )}
    </div>
  )
}
