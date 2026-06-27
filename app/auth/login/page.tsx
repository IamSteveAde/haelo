'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'

const INK        = '#11270B'
const NAVY       = '#0A1628'
const CREAM      = '#F7F4EE'
const WHITE      = '#FFFFFF'
const GOLD       = '#B8962E'
const GREEN      = '#2E7D52'
const INK_10     = 'rgba(17,39,11,0.1)'
const INK_20     = 'rgba(17,39,11,0.2)'
const INK_40     = 'rgba(17,39,11,0.4)'
const INK_60     = 'rgba(17,39,11,0.6)'

const TRUST_POINTS = [
  'Emails monitored in real time',
  'WhatsApp approvals in one tap',
  'Your team never waits',
]

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;height:100%}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.fade-up{animation:fadeUp .32s cubic-bezier(.4,0,.2,1) both}

.login-grid {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 420px 1fr;
  background: ${CREAM};
}
.login-form-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 48px;
  background: ${WHITE};
  min-height: 100vh;
  border-right: 1px solid ${INK_10};
}
.login-right-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 64px 56px;
  background: ${NAVY};
}
.login-trust-mobile {
  display: none;
}

/* Tablet */
@media (max-width: 768px) {
  .login-grid {
    grid-template-columns: 1fr;
  }
  .login-form-col {
    padding: 48px 40px;
    border-right: none;
    min-height: auto;
  }
  .login-right-col {
    display: none;
  }
  .login-trust-mobile {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 36px;
    padding-top: 28px;
    border-top: 1px solid ${INK_10};
  }
}

/* Mobile */
@media (max-width: 480px) {
  .login-form-col {
    padding: 40px 24px;
    justify-content: flex-start;
    padding-top: 48px;
  }
}
`

function HaeloLogo({ light = false }: { light?: boolean }) {
  const c = light ? '#fff' : INK
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
        <path d="M5 35 C5 35 5 15 20 8 C35 15 35 35 35 35" stroke={c} strokeWidth="2.6" strokeLinecap="round" fill="none"/>
        <line x1="13" y1="18" x2="13" y2="33" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="27" y1="18" x2="27" y2="33" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="13" y1="25.5" x2="27" y2="25.5" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
      <span style={{ fontSize: 17, fontWeight: 800, color: c, letterSpacing: '-0.025em' }}>Haelo</span>
    </div>
  )
}

function FieldInput({
  label, id, type = 'text', placeholder, value, onChange,
  required, autoFocus, suffix, rightLabel,
}: {
  label: string; id: string; type?: string; placeholder: string
  value: string; onChange: (v: string) => void
  required?: boolean; autoFocus?: boolean
  suffix?: React.ReactNode; rightLabel?: React.ReactNode
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <label htmlFor={id} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase' as const, color: INK_40 }}>
          {label}
        </label>
        {rightLabel}
      </div>
      <div style={{ position: 'relative' }}>
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          required={required} autoFocus={autoFocus}
          onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{
            width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif",
            background: foc ? WHITE : CREAM,
            border: `1.5px solid ${foc ? INK : INK_10}`,
            borderRadius: 11, padding: suffix ? '12px 48px 12px 16px' : '12px 16px',
            fontSize: 14, color: INK, outline: 'none',
            boxShadow: foc ? '0 0 0 3px rgba(17,39,11,0.06)' : 'none',
            transition: 'all .18s',
          }}
        />
        {suffix && (
          <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>
            {suffix}
          </div>
        )}
      </div>
    </div>
  )
}

function GoogleBtn() {
  const [hov, setHov] = useState(false)
  return (
    <button
      type="button"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: hov ? CREAM : 'transparent',
        border: `1.5px solid ${hov ? INK_20 : INK_10}`,
        borderRadius: 11, padding: '12px', cursor: 'pointer',
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: INK_60,
        transition: 'all .18s',
        transform: hov ? 'translateY(-1px)' : 'none',
        boxShadow: hov ? '0 4px 12px rgba(17,39,11,0.08)' : 'none',
      }}>
      <svg width="17" height="17" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </button>
  )
}

function SignInBtn({ loading, disabled }: { loading: boolean; disabled: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      onMouseEnter={() => !disabled && !loading && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: disabled ? INK_20 : loading ? '#1a3a12' : hov ? '#1a3a12' : INK,
        color: disabled ? INK_40 : '#fff',
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700,
        padding: '14px', borderRadius: 11, border: 'none',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transform: hov && !disabled && !loading ? 'translateY(-1px)' : 'none',
        boxShadow: hov && !disabled && !loading ? '0 6px 20px rgba(17,39,11,0.22)' : 'none',
        transition: 'all .2s cubic-bezier(.4,0,.2,1)',
        letterSpacing: '-.01em',
      }}>
      {loading ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin .7s linear infinite' }}>
            <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" opacity=".25"/>
            <path d="M21 12a9 9 0 0 1-9 9"/>
          </svg>
          Signing in…
        </>
      ) : (
        <>Sign in <ArrowRight size={16} /></>
      )}
    </button>
  )
}

function TrustPoint({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <CheckCircle size={14} color={GREEN} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: 13, color: 'rgba(247,244,238,0.7)', lineHeight: 1.4 }}>{text}</span>
    </div>
  )
}

function TrustPointMobile({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <CheckCircle size={13} color={GREEN} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: INK_40, lineHeight: 1.4 }}>{text}</span>
    </div>
  )
}

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const canSubmit = email.includes('@') && password.length >= 1

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setError('')
    setLoading(true)
    setTimeout(() => { window.location.href = '/dashboard/overview' }, 1600)
  }

  return (
    <div className="login-grid">
      <style>{GLOBAL_CSS}</style>

      {/* LEFT: FORM */}
      <div className="login-form-col">
        <div style={{ maxWidth: 360, width: '100%', margin: '0 auto' }}>

          <div style={{ marginBottom: 44 }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <HaeloLogo />
            </Link>
          </div>

          <div className="fade-up" style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Welcome back</p>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: INK, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 6 }}>Sign in to Haelo</h1>
            <p style={{ fontSize: 13, color: INK_60 }}>Your AI Chief of Staff is ready.</p>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', background: 'rgba(192,57,43,0.07)', border: '1.5px solid rgba(192,57,43,0.2)', borderRadius: 10, marginBottom: 18 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#C0392B' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FieldInput
              label="Email address" id="email" type="email"
              placeholder="adaeze@company.com"
              value={email} onChange={setEmail}
              required autoFocus
            />
            <FieldInput
              label="Password" id="password"
              type={showPw ? 'text' : 'password'}
              placeholder="Your password"
              value={password} onChange={setPassword}
              required
              rightLabel={
                <a href="/auth/forgot-password"
                  style={{ fontSize: 11, fontWeight: 700, color: INK_40, textDecoration: 'none', transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = INK)}
                  onMouseLeave={e => (e.currentTarget.style.color = INK_40)}>
                  Forgot password?
                </a>
              }
              suffix={
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: INK_40, padding: 0, transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = INK)}
                  onMouseLeave={e => (e.currentTarget.style.color = INK_40)}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <SignInBtn loading={loading} disabled={!canSubmit} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: INK_10 }} />
              <span style={{ fontSize: 11, color: INK_40, fontWeight: 600 }}>or</span>
              <div style={{ flex: 1, height: 1, background: INK_10 }} />
            </div>
            <GoogleBtn />
          </form>

          <p style={{ fontSize: 13, color: INK_60, textAlign: 'center', marginTop: 28 }}>
            No account yet?{' '}
            <Link href="/auth/signup"
              style={{ color: INK, fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
              Start free trial
            </Link>
          </p>

          {/* Trust points — mobile only, below the form */}
          <div className="login-trust-mobile">
            {TRUST_POINTS.map(t => <TrustPointMobile key={t} text={t} />)}
          </div>
        </div>
      </div>

      {/* RIGHT: NAVY PANEL — desktop only */}
      <div className="login-right-col">
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(247,244,238,0.35)', marginBottom: 40 }}>
          Why Haelo
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
          {TRUST_POINTS.map(t => <TrustPoint key={t} text={t} />)}
        </div>
      </div>
    </div>
  )
}