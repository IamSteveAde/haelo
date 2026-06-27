'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Download, CreditCard, ArrowRight, AlertCircle, Zap, ExternalLink } from 'lucide-react'

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
const RED_BG = 'rgba(192,57,43,0.06)'
const RED_BORDER = 'rgba(192,57,43,0.18)'

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body,html{font-family:'Plus Jakarta Sans',sans-serif;background:${CREAM};color:${INK};-webkit-font-smoothing:antialiased}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes breathe{0%,100%{opacity:1}50%{opacity:.4}}
.fade-up{animation:fadeUp .38s cubic-bezier(.4,0,.2,1) both}
.stagger-1{animation-delay:.04s}
.stagger-2{animation-delay:.08s}
.stagger-3{animation-delay:.12s}
.stagger-4{animation-delay:.16s}
.stagger-5{animation-delay:.20s}

@media(max-width:768px){
  .billing-grid{grid-template-columns:1fr!important}
  .plan-header{flex-direction:column!important;gap:16px!important}
  .plan-meta-grid{grid-template-columns:1fr 1fr!important}
  .features-grid{grid-template-columns:1fr!important}
  .main-pad{padding:24px 20px 48px!important}
}
`

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"

// ── SHARED CARD ───────────────────────────────────────────────────────────────
function Card({ children, hov, onEnter, onLeave, style: extra }: {
  children: React.ReactNode; hov?: boolean
  onEnter?: () => void; onLeave?: () => void; style?: React.CSSProperties
}) {
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{
        background: hov ? WHITE : 'transparent',
        border: `1.5px solid ${hov ? INK_20 : INK_10}`,
        borderRadius: 16, padding: 28,
        transition: 'all .22s cubic-bezier(.4,0,.2,1)',
        boxShadow: hov ? '0 8px 32px rgba(17,39,11,0.09)' : 'none',
        ...extra,
      }}>
      {children}
    </div>
  )
}

// ── SECTION TITLE ─────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 14, fontWeight: 700, color: INK, letterSpacing: '-.015em', marginBottom: 18 }}>{children}</p>
}

// ── INVOICE ROW ───────────────────────────────────────────────────────────────
function InvoiceRow({ inv, last }: { inv: { id: string; date: string; amount: string; status: string }; last: boolean }) {
  const [hov, setHov] = useState(false)
  const [dlHov, setDlHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px',
        background: hov ? CREAM : 'transparent',
        borderBottom: last ? 'none' : `1px solid ${INK_06}`,
        transition: 'background .16s',
      }}>
      <div style={{ width: 36, height: 36, background: hov ? INK : INK_06, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .18s' }}>
        <CreditCard size={15} color={hov ? '#fff' : INK_40} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 1 }}>{inv.id}</p>
        <p style={{ fontSize: 11, color: INK_40 }}>{inv.date}</p>
      </div>
      <p style={{ fontSize: 13, fontWeight: 700, color: INK }}>{inv.amount}</p>
      <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: GREEN_BG, color: GREEN, flexShrink: 0 }}>
        {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
      </span>
      <button
        onMouseEnter={() => setDlHov(true)}
        onMouseLeave={() => setDlHov(false)}
        style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${dlHov ? INK_20 : 'transparent'}`, background: dlHov ? WHITE : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s', flexShrink: 0 }}>
        <Download size={13} color={dlHov ? INK : INK_40} />
      </button>
    </div>
  )
}

// ── FEATURE ITEM ──────────────────────────────────────────────────────────────
function FeatureItem({ f }: { f: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
      <CheckCircle size={14} color={GREEN} style={{ flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: 12, color: INK_60, lineHeight: 1.5 }}>{f}</span>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function BillingPage() {
  const [featHov,    setFeatHov]    = useState(false)
  const [payHov,     setPayHov]     = useState(false)
  const [invoiceHov, setInvoiceHov] = useState(false)
  const [upgradeHov, setUpgradeHov] = useState(false)
  const [downHov,    setDownHov]    = useState(false)
  const [cancelHov,  setCancelHov]  = useState(false)
  const [updateHov,  setUpdateHov]  = useState(false)

  const invoices = [
    { id: 'INV-0024', date: 'Jun 1, 2026',  amount: '₦500,000', status: 'paid' },
    { id: 'INV-0023', date: 'May 1, 2026',  amount: '₦500,000', status: 'paid' },
    { id: 'INV-0022', date: 'Apr 1, 2026',  amount: '₦500,000', status: 'paid' },
    { id: 'INV-0021', date: 'Mar 1, 2026',  amount: '₦500,000', status: 'paid' },
  ]

  const features = [
    'Up to 5 seats (CEO, HR, Ops, etc.)',
    'All email providers',
    'Unlimited Business Bible size',
    'Custom timer per staff level',
    'Shared team dashboard',
    'Priority support',
    'Monthly performance report',
  ]

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <main className="main-pad" style={{ flex: 1, padding: '40px 40px 60px', overflowY: 'auto', maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        {/* HEADER */}
        <div className="fade-up" style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>Billing</p>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: INK, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 4 }}>Plan & payments.</h1>
          <p style={{ fontSize: 13, color: INK_60, fontWeight: 500 }}>Manage your subscription, payment method, and invoice history.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>

          {/* ── CURRENT PLAN CARD (navy) ── */}
          <div className="fade-up stagger-1"
            style={{
              background: NAVY, borderRadius: 18, padding: 28,
              boxShadow: '0 4px 24px rgba(10,22,40,0.18)',
              transition: 'all .22s',
            }}>

            {/* Plan header */}
            <div className="plan-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, marginBottom: 22, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: GOLD_LIGHT }}>Current plan</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: GREEN_BG, color: '#4ABA7A', border: '1px solid rgba(74,186,122,0.2)' }}>Active</span>
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 5 }}>Team</h2>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Up to 5 seats · All features included</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 32, fontWeight: 800, color: GOLD_LIGHT, letterSpacing: '-0.03em', lineHeight: 1 }}>₦500,000</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>per month</p>
              </div>
            </div>

            {/* Plan meta */}
            <div className="plan-meta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 22 }}>
              {[
                { label: 'Next billing', value: 'Jul 1, 2026' },
                { label: 'Seats used',   value: '5 of 5' },
                { label: 'Cycle',        value: 'Monthly' },
              ].map(m => (
                <div key={m.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 11, padding: '12px 14px' }}>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 5 }}>{m.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Plan actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a
                href="https://wa.me/2349000000000?text=I'd%20like%20to%20upgrade%20to%20Enterprise"
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setUpgradeHov(true)}
                onMouseLeave={() => setUpgradeHov(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  background: upgradeHov ? GOLD : GOLD_LIGHT,
                  color: INK, fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12, fontWeight: 700, padding: '12px',
                  borderRadius: 11, textDecoration: 'none',
                  transition: 'all .2s',
                  transform: upgradeHov ? 'translateY(-1px)' : 'none',
                  boxShadow: upgradeHov ? '0 6px 18px rgba(184,150,46,0.3)' : 'none',
                }}>
                <Zap size={13} /> Upgrade to Enterprise
              </a>
              <button
                onMouseEnter={() => setDownHov(true)}
                onMouseLeave={() => setDownHov(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  background: downHov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 600,
                  padding: '12px', borderRadius: 11, border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', transition: 'all .18s',
                }}>
                Downgrade plan
              </button>
            </div>
          </div>

          {/* ── FEATURES INCLUDED ── */}
          <Card hov={featHov} onEnter={() => setFeatHov(true)} onLeave={() => setFeatHov(false)}>
            <SectionTitle>What's included</SectionTitle>
            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {features.map(f => <FeatureItem key={f} f={f} />)}
            </div>
          </Card>

          {/* ── PAYMENT METHOD ── */}
          <Card hov={payHov} onEnter={() => setPayHov(true)} onLeave={() => setPayHov(false)}>
            <SectionTitle>Payment method</SectionTitle>

            {/* Card display */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: CREAM, border: `1px solid ${INK_10}`, borderRadius: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: NAVY, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CreditCard size={17} color={GOLD_LIGHT} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 1 }}>Mastercard ending 4321</p>
                <p style={{ fontSize: 11, color: INK_40 }}>Expires 08/27</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: GREEN_BG, color: GREEN }}>Default</span>
            </div>

            {/* Update button */}
            <button
              onMouseEnter={() => setUpdateHov(true)}
              onMouseLeave={() => setUpdateHov(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontSize: 12, fontWeight: 600,
                color: updateHov ? INK : INK_60,
                background: updateHov ? CREAM : 'transparent',
                border: `1.5px solid ${updateHov ? INK_20 : INK_10}`,
                borderRadius: 9, padding: '8px 14px',
                cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all .18s',
              }}>
              <CreditCard size={13} /> Update payment method
            </button>
          </Card>

          {/* ── INVOICE HISTORY ── */}
          <div className="fade-up stagger-4"
            onMouseEnter={() => setInvoiceHov(true)}
            onMouseLeave={() => setInvoiceHov(false)}
            style={{
              background: invoiceHov ? WHITE : 'transparent',
              border: `1.5px solid ${invoiceHov ? INK_20 : INK_10}`,
              borderRadius: 16, overflow: 'hidden',
              transition: 'all .22s cubic-bezier(.4,0,.2,1)',
              boxShadow: invoiceHov ? '0 8px 32px rgba(17,39,11,0.09)' : 'none',
            }}>

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: `1px solid ${INK_06}` }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: INK, letterSpacing: '-.015em' }}>Invoice history</p>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: GREEN, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Download size={12} /> Download all
              </button>
            </div>

            {/* Table head */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 0, padding: '8px 20px', background: CREAM, borderBottom: `1px solid ${INK_06}` }}>
              {['Invoice', 'Amount', 'Status', ''].map((h, i) => (
                <p key={i} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: INK_40, paddingRight: i < 3 ? 16 : 0, textAlign: i === 3 ? 'right' : 'left' }}>{h}</p>
              ))}
            </div>

            {invoices.map((inv, i) => <InvoiceRow key={inv.id} inv={inv} last={i === invoices.length - 1} />)}
          </div>

          {/* ── CANCEL ── */}
          <div className="fade-up stagger-5"
            onMouseEnter={() => setCancelHov(true)}
            onMouseLeave={() => setCancelHov(false)}
            style={{
              background: cancelHov ? '#FFF8F7' : 'transparent',
              border: `1.5px solid ${cancelHov ? RED_BORDER : 'rgba(192,57,43,0.12)'}`,
              borderRadius: 16, padding: 24,
              transition: 'all .22s',
              boxShadow: cancelHov ? '0 6px 20px rgba(192,57,43,0.07)' : 'none',
            }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 34, height: 34, background: RED_BG, border: `1px solid ${RED_BORDER}`, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertCircle size={15} color={RED} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 5 }}>Cancel subscription</p>
                <p style={{ fontSize: 12, color: INK_60, lineHeight: 1.65, marginBottom: 14, maxWidth: 480 }}>
                  Cancelling stops Haelo from processing emails at the end of your current billing period. Your data is retained for 30 days after cancellation.
                </p>
                <CancelBtn />
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}

// ── CANCEL BTN (extracted so useState is at top level) ────────────────────────
function CancelBtn() {
  const [hov, setHov] = useState(false)
  const [confirm, setConfirm] = useState(false)

  if (confirm) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <p style={{ fontSize: 12, color: INK_60 }}>Are you sure? This cannot be undone.</p>
        <button
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(192,57,43,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = RED_BG)}
          style={{ fontSize: 11, fontWeight: 700, color: RED, background: RED_BG, border: `1px solid ${RED_BORDER}`, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all .15s' }}>
          Yes, cancel
        </button>
        <button onClick={() => setConfirm(false)}
          style={{ fontSize: 11, fontWeight: 600, color: INK_40, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Keep plan
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 12, fontWeight: 700, color: hov ? RED : INK_40,
        background: hov ? RED_BG : 'transparent',
        border: `1px solid ${hov ? RED_BORDER : 'transparent'}`,
        borderRadius: 8, padding: '6px 12px',
        cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: 'all .18s',
      }}>
      Cancel subscription
    </button>
  )
}