'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, Download, CreditCard, ArrowRight, AlertCircle, Zap, ExternalLink, Info, Users, UserPlus, ChevronRight } from 'lucide-react'
import { getAccounts, type OrgAccount } from '@/lib/api/accounts'

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

// ── PRICING MODEL ──────────────────────────────────────────────────────────
// Per-inbox, tiered rate — no hard seat cap. Seats are driven by the real
// Team Accounts count (see BillingPage below), not an independent dial.
// Beyond SELF_SERVE_MAX, direct to a custom Enterprise conversation instead
// of self-serve checkout.
const SELF_SERVE_MAX = 15

type Tier = { from: number; to: number; rate: number; label: string }
const TIERS: Tier[] = [
  { from: 1, to: 1,  rate: 55000, label: 'Seat 1' },
  { from: 2, to: 5,  rate: 45000, label: 'Seats 2–5' },
  { from: 6, to: 15, rate: 35000, label: 'Seats 6–15' },
]

type Breakdown = { label: string; qty: number; rate: number; subtotal: number }

function computeBilling(seats: number): { total: number; breakdown: Breakdown[]; isCustom: boolean } {
  if (seats > SELF_SERVE_MAX) {
    return { total: 0, breakdown: [], isCustom: true }
  }
  let remaining = seats
  const breakdown: Breakdown[] = []
  let total = 0
  for (const tier of TIERS) {
    if (remaining <= 0) break
    const tierCapacity = tier.to - tier.from + 1
    const qty = Math.min(remaining, tierCapacity)
    if (qty > 0) {
      const subtotal = qty * tier.rate
      breakdown.push({ label: tier.label, qty, rate: tier.rate, subtotal })
      total += subtotal
      remaining -= qty
    }
  }
  return { total, breakdown, isCustom: false }
}

function getPlanLabel(seats: number): string {
  if (seats > SELF_SERVE_MAX) return 'Enterprise'
  if (seats <= 1) return 'Solo'
  return 'Team'
}

function formatNaira(n: number): string {
  return `₦${n.toLocaleString('en-NG')}`
}

// Effective per-seat rate for the NEXT seat, to show a "adding one more drops
// your rate to X" nudge near tier boundaries.
function nextSeatRate(seats: number): number | null {
  const next = seats + 1
  if (next > SELF_SERVE_MAX) return null
  const tier = TIERS.find(t => next >= t.from && next <= t.to)
  return tier ? tier.rate : null
}

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"

function initials(name: string) {
  return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
}

type BillingAccountPreview = { id: number; name: string | null; email: string; status: string }

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

// ── MEMBER ROW (billing preview — compact, read-only) ─────────────────────────
function MemberRow({ m }: { m: BillingAccountPreview }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 0' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9, background: INK, color: CREAM,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700, flexShrink: 0,
      }}>
        {m.name ? initials(m.name) : m.email.slice(0, 2).toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12.5, fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name || m.email}</p>
        <p style={{ fontSize: 11, color: INK_40 }}>{m.name ? m.email : 'Invited · not yet joined'}</p>
      </div>
      <span style={{
        fontSize: 9.5, fontWeight: 700, padding: '3px 8px', borderRadius: 20, flexShrink: 0,
        background: m.status === 'active' ? GREEN_BG : 'rgba(180,83,9,0.08)',
        color: m.status === 'active' ? GREEN : '#B45309',
      }}>
        {m.status === 'active' ? 'Active' : 'Invited'}
      </span>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function BillingPage() {
  const [featHov,    setFeatHov]    = useState(false)
  const [payHov,     setPayHov]     = useState(false)
  const [invoiceHov, setInvoiceHov] = useState(false)
  const [enterpriseHov, setEnterpriseHov] = useState(false)
  const [cancelHov,  setCancelHov]  = useState(false)
  const [updateHov,  setUpdateHov]  = useState(false)
  const [membersHov, setMembersHov] = useState(false)
  const [addMemberHov, setAddMemberHov] = useState(false)

  // Seats are driven by real Team Accounts (Settings → Team accounts) — you
  // don't set a seat count independently, you invite or remove an actual
  // account and the count (and the bill) follows. Adding people happens on
  // the Settings page, which already has the full invite flow; this page
  // just reflects the resulting headcount and links there so there's one
  // source of truth instead of duplicating that logic here.
  const [accountsPreview, setAccountsPreview] = useState<BillingAccountPreview[]>([])
  const [totalStaffCount, setTotalStaffCount] = useState(0)
  const [staffLoading, setStaffLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      setStaffLoading(true)
      try {
        const res = await getAccounts()
        if (res?.data?.accounts) {
          const accts: OrgAccount[] = res.data.accounts
          setAccountsPreview(accts.map(a => ({
            id: a.id,
            name: a.name,
            email: a.email,
            status: a.status,
          })))
          setTotalStaffCount(accts.length)
        }
      } catch (err) {
        console.error('Failed to fetch team accounts for billing summary:', err)
      } finally {
        setStaffLoading(false)
      }
    }
    fetchAccounts()
  }, [])

  const seats = totalStaffCount || 1 // at least 1 (the account owner) while loading/empty
  const { total, breakdown, isCustom } = computeBilling(seats)
  const planLabel = getPlanLabel(seats)
  const nextRate = nextSeatRate(seats)
  const atSelfServeCeiling = seats >= SELF_SERVE_MAX

  const invoices = [
    { id: 'INV-0024', date: 'Jun 1, 2026',  amount: '₦500,000', status: 'paid' },
    { id: 'INV-0023', date: 'May 1, 2026',  amount: '₦500,000', status: 'paid' },
    { id: 'INV-0022', date: 'Apr 1, 2026',  amount: '₦500,000', status: 'paid' },
    { id: 'INV-0021', date: 'Mar 1, 2026',  amount: '₦500,000', status: 'paid' },
  ]

  const features = [
    'Add as many inboxes as you need',
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
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 5 }}>{planLabel}</h2>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                  {isCustom ? 'Custom seat count · Enterprise pricing' : `${seats} ${seats === 1 ? 'seat' : 'seats'} · pay only for what you use`}
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 32, fontWeight: 800, color: GOLD_LIGHT, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {isCustom ? 'Custom' : formatNaira(total)}
                </p>
                {!isCustom && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>per month</p>}
              </div>
            </div>

            {/* Seat summary — read-only here; seats change by adding/removing
                real people in Team Members below, not by dialing a number */}
            {!isCustom && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 11, padding: '14px 16px', marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 5 }}>Seats (team accounts)</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                    {staffLoading ? 'Loading…' : `${seats} of ${SELF_SERVE_MAX} self-serve max`}
                  </p>
                </div>
                <Users size={20} color="rgba(255,255,255,0.35)" />
              </div>
            )}

            {/* Pricing breakdown */}
            {!isCustom && (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 11, padding: '14px 16px', marginBottom: 14 }}>
                {breakdown.map((b, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>{b.label} <span style={{ color: 'rgba(255,255,255,0.3)' }}>· {formatNaira(b.rate)}/seat</span></span>
                    <span style={{ color: '#fff', fontWeight: 700 }}>{formatNaira(b.subtotal)}</span>
                  </div>
                ))}
                {nextRate !== null && nextRate < (breakdown[breakdown.length - 1]?.rate ?? 0) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <Info size={12} color={GOLD_LIGHT} />
                    <span style={{ fontSize: 11, color: GOLD_LIGHT }}>Add one more seat and your rate drops to {formatNaira(nextRate)}/seat</span>
                  </div>
                )}
              </div>
            )}

            {/* Plan actions */}
            <div style={{ display: 'grid', gridTemplateColumns: isCustom ? '1fr' : '1fr', gap: 10 }}>
              <a
                href="https://wa.me/2349000000000?text=I'd%20like%20to%20talk%20about%20Enterprise%20pricing"
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setEnterpriseHov(true)}
                onMouseLeave={() => setEnterpriseHov(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  background: enterpriseHov ? GOLD : GOLD_LIGHT,
                  color: INK, fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12, fontWeight: 700, padding: '12px',
                  borderRadius: 11, textDecoration: 'none',
                  transition: 'all .2s',
                  transform: enterpriseHov ? 'translateY(-1px)' : 'none',
                  boxShadow: enterpriseHov ? '0 6px 18px rgba(184,150,46,0.3)' : 'none',
                }}>
                <Zap size={13} /> {isCustom || atSelfServeCeiling ? 'Talk to us about Enterprise' : 'Need more than 15 seats? Talk to us'}
              </a>
            </div>
          </div>

          {/* ── TEAM ACCOUNTS ── */}
          <Card hov={membersHov} onEnter={() => setMembersHov(true)} onLeave={() => setMembersHov(false)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <SectionTitle>
                Team accounts{!staffLoading && <span style={{ color: INK_40, fontWeight: 500 }}> · {totalStaffCount} {totalStaffCount === 1 ? 'seat' : 'seats'}</span>}
              </SectionTitle>
              <Link
                href="/dashboard/settings"
                onMouseEnter={() => setAddMemberHov(true)}
                onMouseLeave={() => setAddMemberHov(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 700,
                  color: addMemberHov ? INK : GREEN,
                  background: addMemberHov ? CREAM : 'transparent',
                  border: `1.5px solid ${addMemberHov ? INK_20 : 'rgba(46,125,82,0.25)'}`,
                  borderRadius: 9, padding: '7px 13px',
                  textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'all .18s', whiteSpace: 'nowrap',
                }}>
                <UserPlus size={13} /> Invite member
              </Link>
            </div>

            {staffLoading ? (
              <p style={{ fontSize: 12, color: INK_40, padding: '8px 0' }}>Loading team accounts…</p>
            ) : accountsPreview.length === 0 ? (
              <p style={{ fontSize: 12, color: INK_40, padding: '8px 0' }}>Just you so far — invite your team from Settings to add seats.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {accountsPreview.slice(0, 5).map((m, i) => (
                  <div key={m.id} style={{ borderBottom: i < Math.min(accountsPreview.length, 5) - 1 ? `1px solid ${INK_06}` : 'none' }}>
                    <MemberRow m={m} />
                  </div>
                ))}
              </div>
            )}

            {totalStaffCount > 5 && (
              <Link href="/dashboard/settings" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 700, color: GREEN, textDecoration: 'none', marginTop: 12, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                View all {totalStaffCount} accounts <ChevronRight size={13} />
              </Link>
            )}

            <p style={{ fontSize: 11, color: INK_40, marginTop: 14, lineHeight: 1.6 }}>
              Inviting or removing an account updates your bill automatically — invites, roles, and pending status are managed in Settings.
            </p>
          </Card>

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