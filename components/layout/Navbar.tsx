'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-offwhite/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo variant="lime-on-white" size="md" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#integrations" className="nav-link">Integrations</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="btn-ghost text-sm">
            Sign in
          </Link>
          <Link href="/auth/signup" className="btn-primary text-sm">
            Get started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-navy/5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-offwhite border-t border-border px-6 py-4 space-y-1">
          <a href="#how-it-works" className="block nav-link" onClick={() => setOpen(false)}>How it works</a>
          <a href="#features" className="block nav-link" onClick={() => setOpen(false)}>Features</a>
          <a href="#pricing" className="block nav-link" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#integrations" className="block nav-link" onClick={() => setOpen(false)}>Integrations</a>
          <div className="pt-3 flex flex-col gap-2">
            <Link href="/auth/login" className="btn-ghost justify-center" onClick={() => setOpen(false)}>Sign in</Link>
            <Link href="/auth/signup" className="btn-primary justify-center" onClick={() => setOpen(false)}>Get started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
