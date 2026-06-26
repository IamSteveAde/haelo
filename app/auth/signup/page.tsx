'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', company: '', password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: POST to /api/auth/signup
    window.location.href = '/dashboard/overview'
  }

  return (
    <div>
      <div className="mb-8">
        <p className="section-label mb-2">Get started</p>
        <h1 className="text-3xl font-bold text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>
          Create your account
        </h1>
        <p className="text-midgray text-sm">
          30 days free. No credit card needed.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
              s < step ? 'bg-lime text-navy' :
              s === step ? 'bg-navy text-white' :
              'bg-border text-midgray'
            }`}>
              {s < step ? '✓' : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 w-8 ${s < step ? 'bg-lime' : 'bg-border'}`} />}
          </div>
        ))}
        <p className="ml-2 text-xs text-midgray font-bold">
          {step === 1 ? 'Your details' : step === 2 ? 'Company info' : 'Set password'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 && (
          <>
            <div>
              <label className="label" htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Adaeze Okonkwo"
                className="input"
                value={form.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="label" htmlFor="email">Work email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="adaeze@company.com"
                className="input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="button"
              className="btn-primary w-full justify-center py-3.5"
              onClick={() => form.name && form.email && setStep(2)}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="label" htmlFor="company">Company name</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Acme Corporation Ltd"
                className="input"
                value={form.company}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="bg-lime/5 border border-lime/20 rounded-lg p-4">
              <p className="text-xs font-bold text-navy mb-1">Why we need this</p>
              <p className="text-xs text-midgray leading-relaxed">
                Your company name helps Haelo identify which emails belong to your team. You&apos;ll connect your email and upload your Business Bible in the next step.
              </p>
            </div>
            <div className="flex gap-3">
              <button type="button" className="btn-ghost" onClick={() => setStep(1)}>Back</button>
              <button
                type="button"
                className="btn-primary flex-1 justify-center py-3.5"
                onClick={() => form.company && setStep(3)}
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={show ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  className="input pr-12"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  autoFocus
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

            <div className="bg-offwhite border border-border rounded-lg p-4 space-y-2">
              <p className="text-xs font-bold text-navy">By creating an account you agree to:</p>
              <p className="text-xs text-midgray">
                <a href="#" className="text-lime hover:underline">Terms of Service</a> &nbsp;and&nbsp; <a href="#" className="text-lime hover:underline">Privacy Policy</a>
              </p>
            </div>

            <div className="flex gap-3">
              <button type="button" className="btn-ghost" onClick={() => setStep(2)}>Back</button>
              <button type="submit" className="btn-primary flex-1 justify-center py-3.5">
                Create account
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </form>

      <p className="text-sm text-midgray text-center mt-6">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-navy font-bold hover:text-lime transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
