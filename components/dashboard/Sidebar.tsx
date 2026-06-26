'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'
import {
  LayoutDashboard, BookOpen, Users, Activity,
  Settings, CreditCard, LogOut, ChevronRight,
  Bell, Menu, X
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
  { label: 'Business Bible', href: '/dashboard/business-bible', icon: BookOpen },
  { label: 'Staff Directory', href: '/dashboard/staff', icon: Users },
  { label: 'Activity Log', href: '/dashboard/activity', icon: Activity },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
]

interface SidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  const path = usePathname()

  return (
    <aside className={`flex flex-col h-full bg-white border-r border-border ${mobile ? 'w-72' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <Link href="/" onClick={onClose}>
          <Logo variant="lime-on-white" size="sm" />
        </Link>
        {mobile && (
          <button onClick={onClose} className="p-1.5 hover:bg-navy/5 rounded-lg">
            <X size={18} />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-navy rounded-full flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-navy truncate">Adaeze Okonkwo</p>
            <p className="text-xs text-midgray truncate">adaeze@company.com</p>
          </div>
        </div>
        <div className="mt-3">
          <span className="badge-lime">Team Plan · 5 seats</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = path === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={active ? 'sidebar-link-active' : 'sidebar-link'}
            >
              <Icon size={17} className={active ? 'text-lime' : ''} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-lime" />}
            </Link>
          )
        })}
      </nav>

      {/* Status indicator */}
      <div className="p-4 mx-3 mb-3 bg-lime/5 border border-lime/20 rounded-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
          <p className="text-xs font-bold text-navy">Haelo is active</p>
        </div>
        <p className="text-xs text-midgray">Monitoring your inbox. Your team is covered.</p>
      </div>

      {/* Bottom actions */}
      <div className="p-3 border-t border-border space-y-0.5">
        <a
          href="https://wa.me/2349000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-link text-lime hover:text-lime"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Open WhatsApp
        </a>
        <Link href="/auth/login" className="sidebar-link">
          <LogOut size={17} />
          Sign out
        </Link>
      </div>
    </aside>
  )
}

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-border rounded-lg p-2.5 shadow-card"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-navy/40" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full">
            <Sidebar mobile onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
