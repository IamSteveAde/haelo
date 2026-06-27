'use client'

import { useState } from 'react'
import { Save, CheckCircle, AlertCircle, Zap, Bell, Layers, Shield, Mail, Smartphone } from 'lucide-react'

// ── TOKENS ───────────────────────────────────────────────────────────────────
const INK    = '#11270B'
const NAVY   = '#0A1628'
const CREAM  = '#F7F4EE'
const WHITE  = '#FFFFFF'
const GOLD   = '#B8962E'
const GOLD_LIGHT = '#D4AE52'
const GOLD_BG    = 'rgba(184,150,46,0.08)'
const GREEN  = '#2E7D52'
const GREEN_BG   = 'rgba(46,125,82,0.08)'
const INK_10 = 'rgba(17,39,11,0.1)'
const INK_20 = 'rgba(17,39,11,0.2)'
const INK_40 = 'rgba(17,39,11,0.4)'
const INK_60 = 'rgba(17,39,11,0.6)'
const INK_06 = 'rgba(17,39,11,0.06)'
const RED    = '#C0392B'
const RED_BG = 'rgba(192,57,43,0.07)'

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body,html{font-family:'Plus Jakarta Sans',sans-serif;background:${CREAM};color:${INK};-webkit-font-smoothing:antialiased}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{transform:translateX(-2px)}to{transform:translateX(2px)}}
.fade-up{animation:fadeUp .38s cubic-bezier(.4,0,.2,1) both}
.fade-in{animation:fadeIn .3s ease both}

/* Responsive helpers */
@media(max-width:768px){
  .settings-grid{grid-template-columns:1fr!important}
  .two-col{grid-template-columns:1fr!important}
  .hide-mobile{display:none!important}
  .main-pad{padding:24px 20px 48px!important}
}
`

// ── SECTION CARD ─────────────────────────────────────────────────────────────
function SectionCard({ children, hov, onEnter, onLeave, style: extra }: {
  children: React.ReactNode; hov?: boolean; onEnter?: () => void; onLeave?: () => void; style?: React.CSSProperties
}) {
  return (
    <div
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{
        background: hov ? WHITE : 'transparent',
        border: `1.5px solid ${hov ? INK_20 : INK_10}`,
        borderRadius: 16, padding: '28px',
        transition: 'all .22s cubic-bezier(.4,0,.2,1)',
        boxShadow: hov ? '0 8px 32px rgba(17,39,11,0.09)' : 'none',
        ...extra,
      }}
    >
      {children}
    </div>
  )
}

// ── SECTION HEADER ────────────────────────────────────────────────────────────
function SectionHeader({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 22, paddingBottom: 18, borderBottom: `1px solid ${INK_06}` }}>
      <div style={{ width: 38, height: 38, background: INK_06, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: INK_40, display: 'flex' }}>{icon}</span>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: INK, letterSpacing: '-.015em', marginBottom: 2 }}>{title}</p>
        <p style={{ fontSize: 12, color: INK_60, lineHeight: 1.55 }}>{desc}</p>
      </div>
    </div>
  )
}

// ── FIELD LABEL ───────────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase' as const, color: INK_40, marginBottom: 6 }}>{children}</label>
}

// ── SELECT INPUT ─────────────────────────────────────────────────────────────
function SelectInput({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  const [foc, setFoc] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{ width: '100%', appearance: 'none', WebkitAppearance: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", background: foc ? WHITE : CREAM, border: `1.5px solid ${foc ? INK : INK_10}`, borderRadius: 10, padding: '11px 38px 11px 14px', fontSize: 13, fontWeight: 600, color: INK, outline: 'none', cursor: 'pointer', boxShadow: foc ? `0 0 0 3px rgba(17,39,11,0.06)` : 'none', transition: 'all .18s' }}>
        {children}
      </select>
      <svg style={{ position: 'absolute', right: 13, top: '50%', transform: `translateY(-50%) rotate(${foc ? '-180' : '0'}deg)`, pointerEvents: 'none', transition: 'transform .2s' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={INK_40} strokeWidth="2.2" strokeLinecap="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}

// ── TEXT INPUT ────────────────────────────────────────────────────────────────
function TextInput({ type = 'text', placeholder, value, onChange }: { type?: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  const [foc, setFoc] = useState(false)
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
      onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
      style={{ width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif", background: foc ? WHITE : CREAM, border: `1.5px solid ${foc ? INK : INK_10}`, borderRadius: 10, padding: '11px 14px', fontSize: 13, color: INK, outline: 'none', boxShadow: foc ? '0 0 0 3px rgba(17,39,11,0.06)' : 'none', transition: 'all .18s' }} />
  )
}

// ── TIMER MODE OPTION ────────────────────────────────────────────────────────
function TimerModeOpt({ id, label, tagline, desc, icon, active, onClick }: {
  id: string; label: string; tagline: string; desc: string; icon: React.ReactNode; active: boolean; onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 18px',
        background: active ? WHITE : hov ? CREAM : 'transparent',
        border: `1.5px solid ${active ? INK : hov ? INK_20 : INK_10}`,
        borderRadius: 12, cursor: 'pointer', textAlign: 'left', width: '100%',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transform: hov && !active ? 'translateX(2px)' : 'none',
        transition: 'all .2s cubic-bezier(.4,0,.2,1)',
        position: 'relative',
      }}>
      {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: INK, borderRadius: '2px 0 0 2px' }} />}
      <div style={{ width: 34, height: 34, borderRadius: 9, background: active ? INK_06 : INK_06, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        <span style={{ color: active ? INK : INK_40, display: 'flex', transition: 'color .18s' }}>{icon}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{label}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: active ? GOLD : INK_40, letterSpacing: '.04em' }}>{tagline}</span>
        </div>
        <p style={{ fontSize: 12, color: INK_60, lineHeight: 1.55 }}>{desc}</p>
      </div>
      <div style={{ width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${active ? INK : INK_20}`, flexShrink: 0, marginTop: 3, background: active ? INK : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .18s' }}>
        {active && <div style={{ width: 6, height: 6, background: '#fff', borderRadius: '50%' }} />}
      </div>
    </button>
  )
}

// ── EMAIL PROVIDER OPTION ─────────────────────────────────────────────────────
function EmailProviderOpt({ id, label, sub, color, letter, active, onClick }: {
  id: string; label: string; sub: string; color: string; letter: string; active: boolean; onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: active ? WHITE : hov ? CREAM : 'transparent', border: `1.5px solid ${active ? INK : hov ? INK_20 : INK_10}`, borderRadius: 12, cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all .18s' }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
        {letter}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: INK }}>{label}</p>
        <p style={{ fontSize: 11, color: INK_40 }}>{sub}</p>
      </div>
      {active && (
        <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: GREEN_BG, color: GREEN, flexShrink: 0 }}>Connected</span>
      )}
      <div style={{ width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${active ? INK : INK_20}`, flexShrink: 0, background: active ? INK : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .18s' }}>
        {active && <div style={{ width: 6, height: 6, background: '#fff', borderRadius: '50%' }} />}
      </div>
    </button>
  )
}

// ── TOGGLE SWITCH ─────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, background: on ? INK : INK_20, border: 'none', cursor: 'pointer', transition: 'background .22s', flexShrink: 0 }}>
      <span style={{ position: 'absolute', top: 3, width: 18, height: 18, background: '#fff', borderRadius: '50%', boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left .22s cubic-bezier(.4,0,.2,1)', left: on ? 23 : 3 }} />
    </button>
  )
}

// ── SAVE BUTTON ───────────────────────────────────────────────────────────────
function SaveBtn({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: hov ? '#1a3a12' : INK, color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: '12px 24px', borderRadius: 11, border: 'none', cursor: 'pointer', transition: 'all .2s', transform: hov ? 'translateY(-1px)' : 'none', boxShadow: hov ? '0 6px 20px rgba(17,39,11,0.22)' : 'none' }}>
      <Save size={14} />
      {saved ? 'Saved' : 'Save settings'}
    </button>
  )
}

// ── DANGER BUTTON ──────────────────────────────────────────────────────────────
function DangerBtn({ label }: { label: string }) {
  const [hov, setHov] = useState(false)
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 600, color: hov ? RED : INK_40, background: hov ? RED_BG : 'transparent', border: `1px solid ${hov ? 'rgba(192,57,43,0.2)' : 'transparent'}`, padding: '7px 12px', borderRadius: 8, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all .18s' }}>
      {label}
    </button>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [timerMode, setTimerMode] = useState<'auto-send' | 'remind' | 'hybrid'>('hybrid')
  const [timer, setTimer]         = useState('10')
  const [remindFreq, setRemindFreq] = useState('5')
  const [emailProvider, setEmailProvider] = useState('gmail')
  const [waNum, setWaNum]         = useState('+234 801 234 5678')
  const [waVerified, setWaVerified] = useState(true)
  const [saved, setSaved]         = useState(false)
  const [saveFlash, setSaveFlash] = useState(false)

  const [notifs, setNotifs] = useState({
    unrecognised: true,
    dailySummary: true,
    weeklyReport: false,
    errors: true,
  })

  // Card hover states
  const [timerHov,   setTimerHov]   = useState(false)
  const [emailHov,   setEmailHov]   = useState(false)
  const [waHov,      setWaHov]      = useState(false)
  const [domainHov,  setDomainHov]  = useState(false)
  const [notifHov,   setNotifHov]   = useState(false)

  const handleSave = () => {
    setSaveFlash(true)
    setTimeout(() => setSaveFlash(false), 2800)
  }

  const timerModes = [
    { id: 'auto-send' as const, label: 'Auto-Send',      tagline: 'Zero backlog.',    desc: 'After the timer expires, Haelo sends the AI-drafted response automatically. Your team never waits.', icon: <Zap size={16} /> },
    { id: 'remind'   as const, label: 'Remind & Wait',   tagline: 'Full control.',    desc: 'Haelo sends a WhatsApp reminder every few minutes until you respond. Nothing sends without your approval.', icon: <Bell size={16} /> },
    { id: 'hybrid'   as const, label: 'Hybrid',          tagline: 'Recommended.',     desc: 'Auto-send for junior staff and routine emails. Remind and wait for senior staff, HR, Finance, or flagged senders.', icon: <Layers size={16} /> },
  ]

  const emailProviders = [
    { id: 'gmail',   label: 'Gmail',                  sub: 'Google OAuth 2.0 · Gmail API',     color: '#EA4335', letter: 'G' },
    { id: 'outlook', label: 'Outlook / Microsoft 365', sub: 'Microsoft Graph API · OAuth 2.0',  color: '#0078D4', letter: 'O' },
    { id: 'zoho',    label: 'Zoho Mail',               sub: 'Zoho OAuth · Zoho Mail API',       color: '#E4261C', letter: 'Z' },
  ]

  const notifLabels: Record<keyof typeof notifs, string> = {
    unrecognised: 'Unrecognised sender alerts',
    dailySummary: 'Daily activity summary',
    weeklyReport: 'Weekly performance report',
    errors:       'Error and connection alerts',
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <main className="main-pad" style={{ flex: 1, padding: '40px 40px 60px', overflowY: 'auto', maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        {/* HEADER */}
        <div className="fade-up" style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>Settings</p>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: INK, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 4 }}>Configure Haelo.</h1>
          <p style={{ fontSize: 13, color: INK_60, fontWeight: 500 }}>Timer behaviour, email connection, WhatsApp, and notification preferences.</p>
        </div>

        {/* SAVE FLASH */}
        {saveFlash && (
          <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 16px', background: GREEN_BG, border: '1.5px solid rgba(46,125,82,0.2)', borderRadius: 11, marginBottom: 20 }}>
            <CheckCircle size={14} color={GREEN} />
            <p style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>Settings saved successfully.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>

          {/* ── 1. TIMER ── */}
          <SectionCard hov={timerHov} onEnter={() => setTimerHov(true)} onLeave={() => setTimerHov(false)}>
            <SectionHeader icon={<Zap size={17} />} title="Timer behaviour" desc="Controls how Haelo handles emails when you don't respond on WhatsApp." />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {timerModes.map(m => (
                <TimerModeOpt key={m.id} {...m} active={timerMode === m.id} onClick={() => setTimerMode(m.id)} />
              ))}
            </div>

            <div className="two-col" style={{ display: 'grid', gridTemplateColumns: timerMode !== 'auto-send' ? '1fr 1fr' : '1fr', gap: 14 }}>
              <div>
                <FieldLabel>Auto-send after</FieldLabel>
                <SelectInput value={timer} onChange={setTimer}>
                  {['5', '10', '15', '20', '30', '60'].map(v => <option key={v} value={v}>{v} minutes</option>)}
                </SelectInput>
              </div>
              {timerMode !== 'auto-send' && (
                <div>
                  <FieldLabel>Reminder every</FieldLabel>
                  <SelectInput value={remindFreq} onChange={setRemindFreq}>
                    {['3', '5', '10', '15'].map(v => <option key={v} value={v}>{v} minutes</option>)}
                  </SelectInput>
                </div>
              )}
            </div>
          </SectionCard>

          {/* ── 2. EMAIL ── */}
          <SectionCard hov={emailHov} onEnter={() => setEmailHov(true)} onLeave={() => setEmailHov(false)}>
            <SectionHeader icon={<Mail size={17} />} title="Email connection" desc="The inbox Haelo monitors. OAuth only — your password is never stored or seen." />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
              {emailProviders.map(p => (
                <EmailProviderOpt key={p.id} {...p} active={emailProvider === p.id} onClick={() => setEmailProvider(p.id)} />
              ))}
            </div>

            <DangerBtn label="Revoke email access" />
          </SectionCard>

          {/* ── 3. WHATSAPP ── */}
          <SectionCard hov={waHov} onEnter={() => setWaHov(true)} onLeave={() => setWaHov(false)}>
            <SectionHeader icon={<Smartphone size={17} />} title="WhatsApp" desc="The number where Haelo sends all your email notifications." />

            {/* Current number status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: waVerified ? GREEN_BG : 'rgba(180,83,9,0.07)', border: `1.5px solid ${waVerified ? 'rgba(46,125,82,0.2)' : 'rgba(180,83,9,0.18)'}`, borderRadius: 12, marginBottom: 18 }}>
              {waVerified
                ? <CheckCircle size={16} color={GREEN} style={{ flexShrink: 0 }} />
                : <AlertCircle size={16} color="#B45309" style={{ flexShrink: 0 }} />
              }
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 1 }}>{waNum}</p>
                <p style={{ fontSize: 11, color: INK_40 }}>{waVerified ? 'Verified and active' : 'Verification pending'}</p>
              </div>
              {waVerified && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill={GREEN}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              )}
            </div>

            {/* Update number */}
            <div>
              <FieldLabel>Update WhatsApp number</FieldLabel>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <TextInput type="tel" placeholder="+234 800 000 0000" value={waNum} onChange={setWaNum} />
                </div>
                <VerifyBtn />
              </div>
            </div>
          </SectionCard>

          {/* ── 4. DOMAIN ── */}
          <SectionCard hov={domainHov} onEnter={() => setDomainHov(true)} onLeave={() => setDomainHov(false)}>
            <SectionHeader icon={<Shield size={17} />} title="Domain filter" desc="Haelo only processes emails from your company domain. This is a hard rule and cannot be changed." />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: CREAM, border: `1px solid ${INK_10}`, borderRadius: 12 }}>
              <div style={{ width: 34, height: 34, background: INK, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield size={15} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 2 }}>@company.com</p>
                <p style={{ fontSize: 11, color: INK_40, lineHeight: 1.5 }}>All external emails are permanently ignored. This cannot be changed.</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: INK_06, color: INK_40, flexShrink: 0 }}>Locked</span>
            </div>
          </SectionCard>

          {/* ── 5. NOTIFICATIONS ── */}
          <SectionCard hov={notifHov} onEnter={() => setNotifHov(true)} onLeave={() => setNotifHov(false)}>
            <SectionHeader icon={<Bell size={17} />} title="Notifications" desc="Control what Haelo sends to your WhatsApp beyond email responses." />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {(Object.keys(notifs) as Array<keyof typeof notifs>).map((key, i, arr) => (
                <NotifRow
                  key={key}
                  label={notifLabels[key]}
                  on={notifs[key]}
                  onChange={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                  last={i === arr.length - 1}
                />
              ))}
            </div>
          </SectionCard>

          {/* ── SAVE ROW ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 4 }}>
            <SaveBtn onClick={handleSave} saved={saveFlash} />
            {saveFlash && (
              <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={14} color={GREEN} />
                <span style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>All changes saved</span>
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  )
}

// ── NOTIF ROW (extracted — no hooks in map) ───────────────────────────────────
function NotifRow({ label, on, onChange, last }: { label: string; on: boolean; onChange: () => void; last: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 14px', borderRadius: 10,
        background: hov ? CREAM : 'transparent',
        borderBottom: last ? 'none' : `1px solid rgba(17,39,11,0.05)`,
        transition: 'background .16s',
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 500, color: INK }}>{label}</p>
      <Toggle on={on} onChange={onChange} />
    </div>
  )
}

// ── VERIFY BUTTON (extracted) ─────────────────────────────────────────────────
function VerifyBtn() {
  const [hov, setHov] = useState(false)
  const [sent, setSent] = useState(false)
  return (
    <button
      onClick={() => setSent(true)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: sent ? GREEN_BG : hov ? '#1a3a12' : INK,
        color: sent ? GREEN : '#fff',
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700,
        padding: '11px 18px', borderRadius: 10, border: sent ? `1.5px solid rgba(46,125,82,0.3)` : 'none',
        cursor: 'pointer', flexShrink: 0, transition: 'all .2s',
        transform: hov && !sent ? 'translateY(-1px)' : 'none',
        boxShadow: hov && !sent ? '0 4px 14px rgba(17,39,11,0.2)' : 'none',
      }}
    >
      {sent ? <><CheckCircle size={13} /> Sent</> : 'Verify'}
    </button>
  )
}