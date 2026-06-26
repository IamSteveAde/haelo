'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [show, setShow] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = '/dashboard/overview'
  }

  return (
    <div>
      <div className="mb-8">
        <p className="section-label mb-2">Welcome back</p>
        <h1 className="text-3xl font-bold text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>
          Sign in to Haelo
        </h1>
        <p className="text-midgray text-sm">
          Your AI Chief of Staff is ready.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            className="input"
            required
            autoFocus
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
            <a href="#" className="text-xs text-lime hover:underline font-bold">Forgot password?</a>
          </div>
          <div className="relative">
            <input
              id="password"
              type={show ? 'text' : 'password'}
              placeholder="Your password"
              className="input pr-12"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-silver hover:text-navy transition-colors"
              onClick={() => setShow(!show)}
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full justify-center py-3.5">
          Sign in
          <ArrowRight size={16} />
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-offwhite px-4 text-xs text-midgray">or</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <button className="w-full flex items-center justify-center gap-3 border border-border bg-white rounded-lg py-3 text-sm font-bold text-navy hover:bg-offwhite transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>

      <p className="text-sm text-midgray text-center mt-6">
        No account yet?{' '}
        <Link href="/auth/signup" className="text-navy font-bold hover:text-lime transition-colors">
          Start free trial
        </Link>
      </p>
    </div>
  )
}
