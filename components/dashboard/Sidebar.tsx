'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, Users, Activity,
  Settings, CreditCard, LogOut, Menu, X, ChevronRight
} from 'lucide-react'

// ── TOKENS ───────────────────────────────────────────────────────────────────
const INK    = '#11270B'
const NAVY   = '#0A1628'
const CREAM  = '#F7F4EE'
const WHITE  = '#FFFFFF'
const GOLD   = '#B8962E'
const GOLD_LIGHT = '#D4AE52'
const GREEN  = '#2E7D52'
const GREEN_BG   = 'rgba(46,125,82,0.1)'
const INK_10 = 'rgba(17,39,11,0.1)'
const INK_20 = 'rgba(17,39,11,0.2)'
const INK_40 = 'rgba(17,39,11,0.4)'
const INK_60 = 'rgba(17,39,11,0.6)'
const INK_06 = 'rgba(17,39,11,0.06)'

const SIDEBAR_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
@keyframes breathe{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(0.8)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
.sidebar-slide{animation:slideIn .28s cubic-bezier(.4,0,.2,1) both}
`

// ── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Overview',       href: '/dashboard/overview',       icon: LayoutDashboard },
  { label: 'Business Bible', href: '/dashboard/business-bible', icon: BookOpen },
  { label: 'Staff Directory',href: '/dashboard/staff',          icon: Users },
  { label: 'Activity Log',   href: '/dashboard/activity',       icon: Activity },
  { label: 'Settings',       href: '/dashboard/settings',       icon: Settings },
  { label: 'Billing',        href: '/dashboard/billing',        icon: CreditCard },
]

// ── LOGO ─────────────────────────────────────────────────────────────────────
function HaeloLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
        <path d="M5 35 C5 35 5 15 20 8 C35 15 35 35 35 35" stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none"/>
        <line x1="13" y1="18" x2="13" y2="33" stroke={INK} strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="27" y1="18" x2="27" y2="33" stroke={INK} strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="13" y1="25.5" x2="27" y2="25.5" stroke={INK} strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
      <span style={{ fontSize: 16, fontWeight: 800, color: INK, letterSpacing: '-0.025em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Haelo</span>
    </div>
  )
}

// ── NAV LINK ─────────────────────────────────────────────────────────────────
function NavLink({ label, href, icon: Icon, active, onClick }: {
  label: string; href: string; icon: typeof LayoutDashboard; active: boolean; onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
        background: active ? INK : hov ? INK_06 : 'transparent',
        transition: 'all .18s cubic-bezier(.4,0,.2,1)',
        position: 'relative',
      }}
    >
      {/* Active accent bar */}
      {active && (
        <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 18, background: GOLD_LIGHT, borderRadius: 2 }} />
      )}
      <Icon
        size={16}
        color={active ? '#fff' : hov ? INK : INK_40}
        style={{ flexShrink: 0, transition: 'color .18s' }}
      />
      <span style={{
        fontSize: 13, fontWeight: active ? 700 : 500,
        color: active ? '#fff' : hov ? INK : INK_60,
        flex: 1, letterSpacing: '-0.005em',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: 'color .18s',
      }}>
        {label}
      </span>
      {active && (
        <ChevronRight size={12} color="rgba(255,255,255,0.5)" style={{ flexShrink: 0 }} />
      )}
    </Link>
  )
}

// ── BOTTOM ACTION ─────────────────────────────────────────────────────────────
function BottomAction({ href, external, icon, label, danger }: {
  href: string; external?: boolean; icon: React.ReactNode; label: string; danger?: boolean
}) {
  const [hov, setHov] = useState(false)
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a
      href={href}
      {...props}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
        borderRadius: 10, textDecoration: 'none',
        background: hov ? (danger ? 'rgba(192,57,43,0.06)' : INK_06) : 'transparent',
        transition: 'all .18s',
      }}
    >
      <span style={{ color: hov ? (danger ? '#C0392B' : INK) : INK_40, transition: 'color .18s', display: 'flex', alignItems: 'center' }}>
        {icon}
      </span>
      <span style={{ fontSize: 12, fontWeight: 600, color: hov ? (danger ? '#C0392B' : INK) : INK_60, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'color .18s' }}>
        {label}
      </span>
    </a>
  )
}

// ── SIDEBAR INNER ─────────────────────────────────────────────────────────────
function SidebarInner({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const path = usePathname()

  return (
    <aside style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      width: mobile ? 272 : 240,
      background: WHITE,
      borderRight: `1px solid ${INK_10}`,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{SIDEBAR_CSS}</style>

      {/* ── TOP: Logo ── */}
      <div style={{ padding: '20px 18px 18px', borderBottom: `1px solid ${INK_10}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none' }} onClick={onClose}>
          <HaeloLogo />
        </Link>
        {mobile && (
          <button onClick={onClose}
            style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${INK_10}`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = CREAM }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>
            <X size={14} color={INK_40} />
          </button>
        )}
      </div>

      {/* ── USER BLOCK ── */}
      <div style={{ padding: '16px 18px', borderBottom: `1px solid ${INK_06}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          {/* Avatar */}
          <div style={{ width: 36, height: 36, background: INK, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0, letterSpacing: '0.02em' }}>
            AO
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Adaeze Okonkwo</p>
            <p style={{ fontSize: 11, color: INK_40, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>adaeze@company.com</p>
          </div>
        </div>
        {/* Plan badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: INK_06, border: `1px solid ${INK_10}`, borderRadius: 20, padding: '3px 10px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: INK_60, letterSpacing: '.04em', textTransform: 'uppercase' as const }}>Team Plan</span>
          <span style={{ width: 3, height: 3, background: INK_20, borderRadius: '50%' }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: INK_40 }}>5 seats</span>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav style={{ flex: 1, padding: '10px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Section label */}
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: INK_20, padding: '6px 12px 4px', marginBottom: 2 }}>
          Navigation
        </p>

        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.href}
            {...item}
            active={path === item.href}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* ── STATUS PILL ── */}
      <div style={{ margin: '0 10px 10px', padding: '12px 14px', background: CREAM, border: `1px solid ${INK_10}`, borderRadius: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <div style={{ width: 6, height: 6, background: GREEN, borderRadius: '50%', animation: 'breathe 2.2s ease-in-out infinite', flexShrink: 0 }} />
          <p style={{ fontSize: 11, fontWeight: 700, color: INK, letterSpacing: '-.005em' }}>Haelo is active</p>
        </div>
        <p style={{ fontSize: 11, color: INK_40, lineHeight: 1.5 }}>
          Monitoring your inbox. Your team is covered.
        </p>
      </div>

      {/* ── BOTTOM ACTIONS ── */}
      <div style={{ padding: '8px 10px 14px', borderTop: `1px solid ${INK_06}`, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <BottomAction
          href="https://wa.me/2349000000000"
          external
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          }
          label="Open WhatsApp"
        />
        <BottomAction
          href="/auth/login"
          icon={<LogOut size={15} />}
          label="Sign out"
          danger
        />
      </div>
    </aside>
  )
}

// ── EXPORTED DEFAULT ──────────────────────────────────────────────────────────
export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop */}
      <div style={{ display: 'none' }} className="lg-sidebar">
        <div style={{ height: '100vh', position: 'sticky', top: 0, display: 'flex' }}>
          <SidebarInner />
        </div>
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        style={{
          position: 'fixed', top: 14, left: 14, zIndex: 100,
          width: 38, height: 38, borderRadius: 10,
          background: WHITE, border: `1.5px solid rgba(17,39,11,0.12)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(17,39,11,0.08)',
          transition: 'all .18s',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(17,39,11,0.12)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(17,39,11,0.08)' }}
        className="lg-hide"
      >
        <Menu size={16} color={INK} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}
          onClick={e => e.target === e.currentTarget && setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(10,22,40,0.4)', backdropFilter: 'blur(2px)' }}
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="sidebar-slide" style={{ position: 'relative', height: '100%', zIndex: 1 }}>
            <SidebarInner mobile onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <style>{`
        @media(min-width:1024px){
          .lg-sidebar{display:flex!important}
          .lg-hide{display:none!important}
        }
        @media(max-width:1023px){
          .lg-sidebar{display:none!important}
        }
      `}</style>
    </>
  )
}

// Named export for direct use
export { SidebarInner as Sidebar }