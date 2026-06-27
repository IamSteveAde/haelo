'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────
   TOKENS
───────────────────────────────────────────── */
const T = {
  navy:      '#0B1724',
  navy2:     '#111f30',
  lime:      '#25D366',
  lime2:     '#1dba57',
  offwhite:  '#F5F5F2',
  white:     '#ffffff',
  gray:      '#8A919E',
  border:    'rgba(255,255,255,0.07)',
  borderL:   '#E8E8E4',
}

/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────── */
function useBreakpoint() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return {
    isMobile: width < 600,
    isTablet: width >= 600 && width < 900,
    isDesktop: width >= 900,
    width,
  }
}

/* ─────────────────────────────────────────────
   WHATSAPP ICON
───────────────────────────────────────────── */
const WA = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 4)
          setCount(Math.floor(eased * to))
          if (p < 1) requestAnimationFrame(tick)
          else setCount(to)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* ─────────────────────────────────────────────
   LOGO TICKER
───────────────────────────────────────────── */
const logos = [
  {
    name: 'Gmail',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
  {
    name: 'Outlook',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path fill="#0078D4" d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6V2.55q0-.44.3-.75.3-.3.75-.3h12.93q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3zm4.01 6.83l-3.01-1.75v3.51z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    svg: <WA size={28} color="#25D366" />,
  },
  {
    name: 'Claude',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <circle cx="12" cy="12" r="10" fill="#CC785C" opacity="0.15"/>
        <circle cx="12" cy="12" r="10" stroke="#CC785C" strokeWidth="1.5" fill="none"/>
        <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#CC785C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Supabase',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M11.9 2.4L3 14.6h6.3L8 21.6l13-9.6h-6.5L11.9 2.4z" fill="#3ECF8E"/>
      </svg>
    ),
  },
  {
    name: 'Google Drive',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28">
        <polygon fill="#4285F4" points="18.88,15.54 12,3.27 18.44,15.54"/>
        <polygon fill="#34A853" points="5.12,15.54 12,3.27 5.56,15.54"/>
        <polygon fill="#FBBC05" points="4.56,15.54 7.8,21 16.2,21 12.96,15.54"/>
      </svg>
    ),
  },
  {
    name: 'Termii',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#0052CC" opacity="0.1"/>
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="#0052CC" strokeWidth="1.5" fill="none"/>
        <path d="M8 12h8M12 8v8" stroke="#0052CC" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Zoho',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#E4261C" opacity="0.1"/>
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="#E4261C" strokeWidth="1.5" fill="none"/>
        <path d="M6 9l6 3 6-3" stroke="#E4261C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 12l6 3 6-3" stroke="#E4261C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
]

function LogoTicker() {
  const items = [...logos, ...logos, ...logos]
  return (
    <div style={{ overflow: 'hidden', position: 'relative', padding: '0' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
        background: `linear-gradient(90deg, ${T.navy} 0%, transparent 100%)`,
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
        background: `linear-gradient(270deg, ${T.navy} 0%, transparent 100%)`,
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        display: 'flex', gap: 0,
        animation: 'ticker 30s linear infinite',
        width: 'max-content',
      }}>
        {items.map((logo, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            padding: '0 28px', flexShrink: 0,
          }}>
            <div style={{ opacity: 0.7 }}>{logo.svg}</div>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.gray, letterSpacing: '0.04em' }}>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FADE IN HOOK
───────────────────────────────────────────── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile, isTablet } = useBreakpoint()
  const isSmall = isMobile || isTablet

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 4%' : '0 6%', height: 64,
        background: scrolled || menuOpen ? 'rgba(11,23,36,0.98)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? `1px solid ${T.border}` : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: T.lime, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 20 20" fill="none" width={16} height={16}>
              <path d="M10 1C5.03 1 1 5.03 1 10c0 1.54.41 2.97 1.14 4.22L1 19l4.87-1.12A9.02 9.02 0 0010 19c4.97 0 9-4.03 9-9s-4.03-9-9-9z" fill="#0B1724"/>
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Haelo</span>
        </div>

        {/* Desktop links */}
        {!isSmall && (
          <div style={{ display: 'flex', gap: 36 }}>
            {['How it works', 'Features', 'Pricing'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >{l}</a>
            ))}
          </div>
        )}

        {/* Desktop CTA / Mobile hamburger */}
        {!isSmall ? (
          <Link href="/auth/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: T.lime, color: T.navy,
            fontSize: 13, fontWeight: 800,
            padding: '9px 20px', borderRadius: 100,
            textDecoration: 'none', letterSpacing: '-0.01em',
            transition: 'transform 0.2s',
          }}>
            Start free
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={T.navy} strokeWidth={2.5} strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        ) : (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        )}
      </nav>

      {/* Mobile menu dropdown */}
      {isSmall && menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 199,
          background: 'rgba(11,23,36,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${T.border}`,
          padding: '20px 6% 28px',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {['How it works', 'Features', 'Pricing'].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', padding: '14px 0', borderBottom: `1px solid ${T.border}` }}
            >{l}</a>
          ))}
          <Link href="/auth/signup" onClick={() => setMenuOpen(false)} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: T.lime, color: T.navy,
            fontSize: 15, fontWeight: 800,
            padding: '13px 20px', borderRadius: 100,
            textDecoration: 'none', marginTop: 20,
          }}>
            Start free — 30 days
          </Link>
        </div>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()

  return (
    <section style={{
      minHeight: '100vh', background: T.navy,
      display: 'flex', alignItems: 'center',
      padding: isMobile ? '100px 5% 60px' : isTablet ? '100px 6% 72px' : '100px 6% 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: isMobile ? 300 : 700, height: isMobile ? 300 : 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: isMobile ? 250 : 500, height: isMobile ? 250 : 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
        gap: isDesktop ? 80 : 56,
        alignItems: 'center', position: 'relative',
      }}>
        {/* Left */}
        <div style={{ animation: 'fadeUp 0.8s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: `1px solid rgba(37,211,102,0.25)`,
            background: 'rgba(37,211,102,0.08)',
            color: T.lime, fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '7px 14px', borderRadius: 100, marginBottom: 28,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.lime, display: 'inline-block', animation: 'blink 2s ease infinite' }} />
            AI Chief of Staff
          </div>

          <h1 style={{
            fontSize: isMobile ? '2.6rem' : isTablet ? '3.2rem' : 'clamp(3rem,5.5vw,5rem)',
            fontWeight: 800, lineHeight: 1.04,
            letterSpacing: '-0.04em', color: '#fff',
            marginBottom: 20,
          }}>
            Be{' '}
            <span style={{
              background: `linear-gradient(120deg, ${T.lime} 0%, #7fffb0 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>everywhere.</span>
            <br />Miss nothing.
          </h1>

          <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.72, color: 'rgba(255,255,255,0.5)', marginBottom: 36, maxWidth: 440, fontWeight: 400 }}>
            Haelo reads every internal email, summarises it, drafts the reply using your company&apos;s own knowledge, and sends it to your WhatsApp. One tap. Done.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
            <Link href="/auth/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: T.lime, color: T.navy,
              fontSize: isMobile ? 14 : 15, fontWeight: 800,
              padding: isMobile ? '12px 22px' : '14px 28px', borderRadius: 100,
              textDecoration: 'none', letterSpacing: '-0.01em',
              transition: 'all 0.2s',
            }}>
              Start free — 30 days
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={T.navy} strokeWidth={2.5} strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="https://wa.me/2349000000000" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', fontSize: isMobile ? 14 : 15, fontWeight: 600,
              padding: isMobile ? '12px 18px' : '14px 24px', borderRadius: 100,
              textDecoration: 'none', transition: 'all 0.2s',
            }}>
              <WA size={17} color={T.lime} />
              Talk to us
            </a>
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex' }}>
              {[{ i: 'A', c: '#1a3a5c' }, { i: 'K', c: '#1d4a35' }, { i: 'T', c: '#2a1a4a' }, { i: 'O', c: '#1a2a4a' }].map((a, idx) => (
                <div key={idx} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: `2px solid ${T.navy}`, background: a.c,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.8)',
                  marginLeft: idx === 0 ? 0 : -8,
                }}>{a.i}</div>
              ))}
            </div>
            <div>
              <div style={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: T.lime, fontSize: 12 }}>★</span>)}
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Trusted by execs across Nigeria</p>
            </div>
          </div>
        </div>

        {/* Right: WA Mockup */}
        {!isMobile && (
          <div style={{ display: 'flex', justifyContent: isDesktop ? 'flex-end' : 'center', animation: 'fadeUp 0.8s 0.2s ease both' }}>
            <WAMockup />
          </div>
        )}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   WA MOCKUP
───────────────────────────────────────────── */
function WAMockup() {
  return (
    <div style={{
      width: 300, borderRadius: 32,
      boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      overflow: 'hidden', position: 'relative',
      background: '#1a1a1a',
    }}>
      {/* Status bar */}
      <div style={{ background: '#075e54', padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <svg width={14} height={10} viewBox="0 0 14 10" fill="white"><rect x="0" y="4" width="2" height="6" rx="1"/><rect x="3" y="2" width="2" height="8" rx="1"/><rect x="6" y="0" width="2" height="10" rx="1"/><rect x="9" y="1" width="2" height="9" rx="1"/></svg>
            <div style={{ display: 'flex', gap: 1 }}>
              <div style={{ width: 6, height: 10, borderRadius: 2, background: '#fff', border: '1px solid rgba(255,255,255,0.5)' }}>
                <div style={{ width: '100%', height: '70%', borderRadius: 1, background: '#fff' }} />
              </div>
            </div>
          </div>
        </div>
        {/* Chat header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: T.lime, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 20 20" fill="none" width={20} height={20}>
              <path d="M10 1C5.03 1 1 5.03 1 10c0 1.54.41 2.97 1.14 4.22L1 19l4.87-1.12A9.02 9.02 0 0010 19c4.97 0 9-4.03 9-9s-4.03-9-9-9z" fill="#0B1724"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Haelo</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>AI Chief of Staff · online</div>
          </div>
        </div>
      </div>

      {/* Chat body */}
      <div style={{ background: '#ece5dd', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 11, background: 'rgba(0,0,0,0.15)', color: '#fff', padding: '3px 10px', borderRadius: 100, fontWeight: 600 }}>TODAY</span>
        </div>
        <div style={{ background: '#fff', borderRadius: '4px 16px 16px 16px', padding: '12px 14px', maxWidth: '94%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'inline-block', background: 'rgba(37,211,102,0.12)', color: '#1a7a42', fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 100, marginBottom: 10, border: '1px solid rgba(37,211,102,0.2)' }}>
            📧 New internal email
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999', marginBottom: 2 }}>FROM</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 10 }}>Tosin Adeyemi <span style={{ fontWeight: 400, color: '#777' }}>· Ops Manager</span></div>
          <div style={{ height: 1, background: '#f0f0f0', marginBottom: 10 }} />
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999', marginBottom: 3 }}>SUMMARY</div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: '#333', marginBottom: 10 }}>
            Requesting approval to reorder 50kg of rice before Friday&apos;s service. Vendor confirmed availability.
          </div>
          <div style={{ height: 1, background: '#f0f0f0', marginBottom: 10 }} />
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999', marginBottom: 3 }}>SUGGESTED REPLY</div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: '#333', marginBottom: 12 }}>
            Hi Tosin, approved — please proceed and send invoice for records.
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', background: T.lime, color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>✓ YES — Send</button>
            <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: '1px solid #e0e0e0', background: '#fafafa', color: '#555', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>✗ NO — Edit</button>
          </div>
          <div style={{ fontSize: 10, color: '#aaa', textAlign: 'right', marginTop: 8, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3 }}>
            2m ago
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#34B7F1" strokeWidth={2.5} strokeLinecap="round"><path d="M1 12l5 5L12 5M8 12l5 5 7-12"/></svg>
          </div>
        </div>
        <div style={{ background: '#dcf8c6', borderRadius: '16px 4px 16px 16px', padding: '10px 14px', maxWidth: '85%', alignSelf: 'flex-end', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#111' }}>Hi Tosin, approved — please proceed and send invoice for records.</div>
          <div style={{ fontSize: 10, color: '#aaa', textAlign: 'right', marginTop: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3 }}>
            sent via Haelo
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#34B7F1" strokeWidth={2.5} strokeLinecap="round"><path d="M1 12l5 5L12 5M8 12l5 5 7-12"/></svg>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', borderRadius: '4px 16px 16px 16px', padding: '11px 14px', width: 68, boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
          {[0, 0.18, 0.36].map((d, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#bbb', animation: `typingdot 1.2s ${d}s infinite` }} />
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div style={{ background: '#f0f0f0', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: '8px 14px', fontSize: 13, color: '#999' }}>Message</div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: T.lime, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
function Stats() {
  const { isMobile } = useBreakpoint()
  const stats = [
    { to: 60, suffix: 's', label: 'Email to WhatsApp', prefix: '<' },
    { to: 90, suffix: '%+', label: 'Approved first try' },
    { to: 10, suffix: ' min', label: 'Daily inbox time', prefix: '<' },
    { to: 99, suffix: '.5%', label: 'Platform uptime' },
  ]
  const { ref, visible } = useFadeIn()

  return (
    <div ref={ref} style={{ background: T.navy2, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: isMobile ? '48px 5%' : '64px 6%' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
        gap: isMobile ? '32px 0' : 0,
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            textAlign: 'center', padding: isMobile ? '0 16px' : '0 32px',
            borderRight: isMobile
              ? (i % 2 === 0 ? `1px solid ${T.border}` : 'none')
              : (i < 3 ? `1px solid ${T.border}` : 'none'),
            borderBottom: isMobile && i < 2 ? `1px solid ${T.border}` : 'none',
            paddingBottom: isMobile && i < 2 ? 32 : 0,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`,
          }}>
            <div style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2.2rem,3vw,3rem)', fontWeight: 800, color: T.lime, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8 }}>
              {visible ? <Counter to={s.to} suffix={s.suffix} prefix={s.prefix ?? ''} /> : `${s.prefix ?? ''}0${s.suffix}`}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: T.gray, letterSpacing: '0.02em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
  const { isMobile, isTablet } = useBreakpoint()
  const steps = [
    { n: '01', title: 'Email arrives', body: 'A staff member sends an email to your company address. Haelo intercepts it in real time.' },
    { n: '02', title: 'AI understands', body: 'Your Business Bible tells Haelo who the sender is, what the context means, and how your company responds.' },
    { n: '03', title: 'WhatsApp delivery', body: 'You receive a clean card: sender, summary, and a suggested reply — all in one WhatsApp message.' },
    { n: '04', title: 'One tap', body: 'YES sends immediately. NO lets you redirect. Do nothing — Haelo auto-sends after your configured timer.' },
  ]
  const { ref, visible } = useFadeIn()

  return (
    <section id="how-it-works" style={{ padding: isMobile ? '80px 5%' : '120px 6%', background: T.navy }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: isMobile ? 48 : 80, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.lime, marginBottom: 16 }}>How it works</p>
          <h2 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>
            From inbox to decision<br />in under 60 seconds.
          </h2>
          <p style={{ fontSize: 16, color: T.gray, maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            No app to check. No inbox to manage. Just your WhatsApp and one tap.
          </p>
        </div>

        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4,1fr)',
          gap: 1, background: T.border,
        }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              background: T.navy, padding: isMobile ? '32px 24px' : '44px 32px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.6s ${i * 0.12}s ease, transform 0.6s ${i * 0.12}s ease`,
            }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.06em', marginBottom: 28, lineHeight: 1 }}>{s.n}</div>
              <div style={{ width: 36, height: 2, background: T.lime, marginBottom: 24, borderRadius: 1 }} />
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>{s.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: T.gray }}>{s.body}</div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{
          marginTop: 1, background: T.navy2,
          padding: isMobile ? '24px 24px' : '32px 48px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
          gap: 20, border: `1px solid ${T.border}`,
        }}>
          <p style={{ fontSize: 15, color: T.gray }}>Want to see it live? We&apos;ll walk you through in real time.</p>
          <a href="https://wa.me/2349000000000" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            background: T.lime, color: T.navy,
            fontSize: 14, fontWeight: 800, padding: '12px 22px', borderRadius: 100,
            textDecoration: 'none', flexShrink: 0,
          }}>
            <WA size={16} color={T.navy} /> Open WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
function Features() {
  const { isMobile, isTablet } = useBreakpoint()
  const features = [
    { title: 'Real-time email monitoring', body: '24/7 watch on your company domain. Nothing external. Nothing missed.' },
    { title: 'Business Bible', body: 'One upload. Every response after that is grounded in how your company actually operates.' },
    { title: 'WhatsApp first', body: 'No new app. No new login. The interface is WhatsApp — the tool you already open 40 times a day.' },
    { title: 'Configurable timer', body: 'Auto-Send, Remind & Wait, or Hybrid — set globally or per-sender. You are always in control.' },
    { title: 'Staff directory', body: 'Every person recognised by name, role, and department. Bulk CSV import. Unknown-sender queue.' },
    { title: 'Activity log', body: 'Every email. Every draft. Every outcome. Filter, export, and audit any time.' },
    { title: 'AI response engine', body: 'Responses calibrated to context, tone, and your company knowledge — not generic LLM output.' },
    { title: 'Security by design', body: 'OAuth only. No stored passwords. Encrypted at rest and in transit. 30-day retention. Per-client isolation.' },
  ]
  const { ref, visible } = useFadeIn()
  const isSmall = isMobile || isTablet

  return (
    <section id="features" style={{ padding: isMobile ? '80px 5%' : '120px 6%', background: T.offwhite }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isSmall ? '1fr' : '1fr 2fr',
          gap: isSmall ? 48 : 80, alignItems: 'start',
        }}>
          <div style={{ position: isSmall ? 'static' : 'sticky', top: 100 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.lime2, marginBottom: 16 }}>Features</p>
            <h2 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2rem,3vw,2.8rem)', fontWeight: 800, letterSpacing: '-0.035em', color: T.navy, lineHeight: 1.1, marginBottom: 20 }}>
              Everything it takes.<br />Nothing it doesn&apos;t.
            </h2>
            <p style={{ fontSize: 16, color: T.gray, lineHeight: 1.7 }}>Eight components working as one. Built for executives who have no time to spare.</p>
          </div>
          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 1, background: T.borderL }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                background: T.offwhite, padding: isMobile ? '28px 24px' : '32px 28px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ${i * 0.06}s ease, transform 0.5s ${i * 0.06}s ease`,
                cursor: 'default',
              }}>
                <div style={{ width: 28, height: 2, background: T.lime2, marginBottom: 20, borderRadius: 1 }} />
                <div style={{ fontSize: 15, fontWeight: 800, color: T.navy, marginBottom: 8, letterSpacing: '-0.02em' }}>{f.title}</div>
                <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.7 }}>{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   INTEGRATIONS
───────────────────────────────────────────── */
function Integrations() {
  const { isMobile } = useBreakpoint()
  const { ref, visible } = useFadeIn()
  return (
    <section id="integrations" style={{ padding: isMobile ? '72px 0' : '100px 0', background: T.navy, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: `0 auto ${isMobile ? 40 : 56}px`, padding: '0 6%', textAlign: 'center' }}>
        <div ref={ref} style={{
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.lime, marginBottom: 16 }}>Integrations</p>
          <h2 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>
            Works with what you already use.
          </h2>
          <p style={{ fontSize: 16, color: T.gray, maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Connect your email in minutes. No migration. No IT ticket.
          </p>
        </div>
      </div>
      <LogoTicker />
      <p style={{ textAlign: 'center', fontSize: 13, color: T.gray, marginTop: 40, padding: '0 6%' }}>
        Slack and Zoho CRM arriving in Version 2.0
      </p>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PRICING
───────────────────────────────────────────── */
function Pricing() {
  const { isMobile, isTablet } = useBreakpoint()
  const plans = [
    {
      name: 'Solo', price: '₦150,000', sub: '1 executive · per month', featured: false,
      cta: 'Start free', href: '/auth/signup', external: false,
      features: ['1 WhatsApp seat', 'Gmail, Outlook, or Zoho Mail', 'Business Bible — up to 20 pages', 'Full dashboard access', 'Activity log', 'Standard 10-min timer'],
    },
    {
      name: 'Team', price: '₦500,000', sub: 'Up to 5 people · per month', featured: true,
      cta: 'Start free', href: '/auth/signup', external: false,
      features: ['Up to 5 seats', 'All email providers', 'Unlimited Business Bible', 'Per-sender timer config', 'Shared dashboard', 'Priority support', 'Monthly report'],
    },
    {
      name: 'Enterprise', price: 'Custom', sub: '6+ people · annual options', featured: false,
      cta: 'Talk to us', href: 'https://wa.me/2349000000000', external: true,
      features: ['Unlimited seats', 'Dedicated onboarding', 'Custom integrations & SLA', 'Bespoke Business Bible', 'Account manager', 'White-glove support'],
    },
  ]
  const { ref, visible } = useFadeIn()

  return (
    <section id="pricing" style={{ padding: isMobile ? '80px 5%' : '120px 6%', background: T.offwhite }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.lime2, marginBottom: 16 }}>Pricing</p>
          <h2 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, letterSpacing: '-0.035em', color: T.navy, marginBottom: 16, lineHeight: 1.1 }}>
            Flat rate. No surprises.
          </h2>
          <p style={{ fontSize: 16, color: T.gray, maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
            First 30 days free on every plan. Cancel any time.
          </p>
        </div>

        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3,1fr)',
          gap: isMobile ? 1 : 1, background: T.borderL,
        }}>
          {plans.map((plan, i) => (
            <div key={plan.name} style={{
              background: plan.featured ? T.navy : '#fff',
              padding: isMobile ? '36px 28px' : '40px 32px',
              position: 'relative',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ${i * 0.12}s ease, transform 0.5s ${i * 0.12}s ease`,
            }}>
              {plan.featured && (
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  background: T.lime, color: T.navy,
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '4px 12px', borderRadius: 100,
                }}>Popular</div>
              )}
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.lime, marginBottom: 20 }}>{plan.name}</div>
              <div style={{ fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem,2.5vw,2.4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: plan.featured ? '#fff' : T.navy, marginBottom: 4, lineHeight: 1 }}>{plan.price}</div>
              <div style={{ fontSize: 13, color: plan.featured ? 'rgba(255,255,255,0.4)' : T.gray, marginBottom: 32 }}>{plan.sub}</div>
              <div style={{ height: 1, background: plan.featured ? T.border : T.borderL, marginBottom: 28 }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: plan.featured ? 'rgba(255,255,255,0.65)' : T.gray, lineHeight: 1.4, alignItems: 'flex-start' }}>
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                      <circle cx="8" cy="8" r="8" fill="rgba(37,211,102,0.15)"/>
                      <path d="M5 8l2 2 4-4" stroke={T.lime} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              {plan.external ? (
                <a href={plan.href} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '13px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.08)', color: '#fff',
                  border: `1px solid rgba(255,255,255,0.12)`,
                  fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em',
                  boxSizing: 'border-box',
                }}>
                  <WA size={15} color="#fff" /> {plan.cta}
                </a>
              ) : (
                <Link href={plan.href} style={{
                  display: 'block', width: '100%', padding: 13, borderRadius: 100, textAlign: 'center',
                  background: plan.featured ? T.lime : T.navy,
                  color: plan.featured ? T.navy : '#fff',
                  fontSize: 14, fontWeight: 800, textDecoration: 'none', letterSpacing: '-0.01em',
                  boxSizing: 'border-box',
                }}>
                  {plan.cta} →
                </Link>
              )}
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: T.gray, marginTop: 20 }}>All prices in Nigerian Naira. USD pricing on request.</p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint()
  const testimonials = [
    { quote: 'I used to spend two hours on internal emails every morning. Haelo handles all of it before I even sit down.', name: 'Adaeze O.', role: 'CEO, Retail Group — Lagos', init: 'AO', bg: '#1a3040' },
    { quote: "The first time Haelo replied for me, my Ops Manager said it was the fastest reply I'd ever given. Exactly right.", name: 'Kunle A.', role: 'MD, Construction — Abuja', init: 'KA', bg: '#1a3a28' },
    { quote: 'Five senior managers. Response time dropped from two days to fifteen minutes. ROI was clear in week one.', name: 'Temi B.', role: 'COO, Financial Services — Lagos', init: 'TB', bg: '#2a1a40' },
  ]
  const { ref, visible } = useFadeIn()

  return (
    <section style={{ padding: isMobile ? '80px 5%' : '120px 6%', background: T.navy }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.lime, marginBottom: 16 }}>What executives say</p>
          <h2 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.1 }}>
            Your team never waits.
          </h2>
        </div>
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3,1fr)',
          gap: 1, background: T.border,
        }}>
          {testimonials.map((t, i) => (
            <div key={t.name} style={{
              background: T.navy2, padding: isMobile ? '36px 28px' : '44px 36px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.6s ${i * 0.12}s ease, transform 0.6s ${i * 0.12}s ease`,
            }}>
              <div style={{ display: 'flex', gap: 1, marginBottom: 24 }}>
                {[...Array(5)].map((_, j) => <span key={j} style={{ color: T.lime, fontSize: 14 }}>★</span>)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', marginBottom: 28, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.8)', flexShrink: 0 }}>{t.init}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: T.gray }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────── */
function FinalCTA() {
  const { isMobile } = useBreakpoint()
  const { ref, visible } = useFadeIn()
  return (
    <section style={{ padding: isMobile ? '96px 5%' : '140px 6%', background: T.offwhite, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(37,211,102,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div ref={ref} style={{
        maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: T.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <svg viewBox="0 0 20 20" fill="none" width={24} height={24}>
            <path d="M10 1C5.03 1 1 5.03 1 10c0 1.54.41 2.97 1.14 4.22L1 19l4.87-1.12A9.02 9.02 0 0010 19c4.97 0 9-4.03 9-9s-4.03-9-9-9z" fill={T.lime}/>
          </svg>
        </div>
        <h2 style={{ fontSize: isMobile ? '2rem' : 'clamp(2.4rem,4.5vw,3.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: T.navy, lineHeight: 1.06, marginBottom: 20 }}>
          Your team deserves<br />a response today.
        </h2>
        <p style={{ fontSize: isMobile ? 16 : 18, color: T.gray, marginBottom: 44, lineHeight: 1.7 }}>
          First 30 days free. No credit card required.<br />Set up in under 15 minutes.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: T.navy, color: '#fff',
            fontSize: isMobile ? 14 : 15, fontWeight: 800,
            padding: isMobile ? '13px 24px' : '15px 30px', borderRadius: 100,
            textDecoration: 'none', letterSpacing: '-0.01em',
          }}>
            Create your account
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="https://wa.me/2349000000000" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            background: 'transparent', color: T.lime2,
            border: `1.5px solid rgba(29,186,87,0.3)`,
            fontSize: isMobile ? 14 : 15, fontWeight: 800,
            padding: isMobile ? '13px 22px' : '15px 28px', borderRadius: 100,
            textDecoration: 'none',
          }}>
            <WA size={17} color={T.lime2} /> Start on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const { isMobile, isTablet } = useBreakpoint()
  return (
    <footer style={{ background: T.navy2, borderTop: `1px solid ${T.border}`, padding: isMobile ? '48px 5% 32px' : '56px 6% 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '1.6fr 1fr 1fr 1fr',
          gap: isMobile ? '40px 24px' : 48,
          marginBottom: isMobile ? 40 : 52,
        }}>
          {/* Brand — full width on mobile */}
          <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.lime, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 20 20" fill="none" width={14} height={14}><path d="M10 1C5.03 1 1 5.03 1 10c0 1.54.41 2.97 1.14 4.22L1 19l4.87-1.12A9.02 9.02 0 0010 19c4.97 0 9-4.03 9-9s-4.03-9-9-9z" fill={T.navy}/></svg>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Haelo</span>
            </div>
            <p style={{ fontSize: 14, color: T.gray, lineHeight: 1.65, maxWidth: 240 }}>
              Be everywhere. Miss nothing. AI Chief of Staff for Nigerian executives.
            </p>
          </div>
          {[
            { h: 'Product', l: ['How it works', 'Features', 'Pricing', 'Integrations'] },
            { h: 'Company', l: ['About', 'Blog', 'Careers', 'Contact'] },
            { h: 'Legal', l: ['Privacy', 'Terms', 'Security'] },
          ].map((col) => (
            <div key={col.h}>
              <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 18 }}>{col.h}</h4>
              {col.l.map((l) => (
                <a key={l} href="#" style={{ display: 'block', fontSize: 14, color: T.gray, textDecoration: 'none', marginBottom: 10 }}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: `1px solid ${T.border}`, paddingTop: 28,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
          gap: 8,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>© 2025 Haelo. All rights reserved.</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>Built in Lagos 🇳🇬</p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes typingdot {
          0%, 80%, 100% { transform: translateY(0); }
          40%           { transform: translateY(-5px); }
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <Integrations />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}