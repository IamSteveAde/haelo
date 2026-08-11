'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { register, verifyOtp, checkEmail } from '@/lib/api/auth'

export default function SignupPage() {
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', company: '', password: '', otp: ''
  })

  const router = useRouter()

  useEffect(() => {
    const validateEmail = async () => {
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setEmailValid(false)
        return
      }
      setCheckingEmail(true)
      setError('')
      try {
        await checkEmail(form.email)
        setEmailValid(true)
      } catch (err: any) {
        setEmailValid(false)
        setError(err.message || 'Email is already in use or invalid')
      } finally {
        setCheckingEmail(false)
      }
    }

    const timer = setTimeout(() => {
      if (step === 1) validateEmail()
    }, 500)

    return () => clearTimeout(timer)
  }, [form.email, step])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (e.target.name === 'email' && step === 1) {
      setEmailValid(false)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 3) {
      setError('')
      setLoading(true)
      try {
        const res = await register({
          name: form.name,
          email: form.email,
          companyName: form.company,
          password: form.password
        })
        
        if (res.data?.token) {
          localStorage.setItem('registrationToken', res.data.token)
        }
        
        setStep(4) // Move to OTP step
      } catch (err: any) {
        setError(err.message || 'Registration failed')
      } finally {
        setLoading(false)
      }
    } else if (step === 4) {
      setError('')
      setLoading(true)
      try {
        const regToken = localStorage.getItem('registrationToken')
        if (!regToken) throw new Error('Missing registration token. Please try signing up again.')
        
        const res = await verifyOtp(regToken, form.otp)
        
        if (res.data?.token) {
          localStorage.setItem('token', res.data.token)
          // Cleanup registration token
          localStorage.removeItem('registrationToken')
        }
        
        setSuccess(res.message || 'Account verified successfully!')
        setTimeout(() => {
          router.push('/onboarding')
        }, 1500)
      } catch (err: any) {
        setError(err.message || 'OTP verification failed')
      } finally {
        setLoading(false)
      }
    }
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

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', background: 'rgba(192,57,43,0.07)', border: '1.5px solid rgba(192,57,43,0.2)', borderRadius: 10, marginBottom: 18 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#C0392B' }}>{error}</p>
        </div>
      )}
      {success && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', background: 'rgba(46,125,82,0.07)', border: '1.5px solid rgba(46,125,82,0.2)', borderRadius: 10, marginBottom: 18 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#2E7D52' }}>{success}</p>
        </div>
      )}

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
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => form.name && emailValid && setStep(2)}
              disabled={!form.name || !emailValid || checkingEmail}
            >
              {checkingEmail ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Checking email...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={16} />
                </>
              )}
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
              <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Creating...' : 'Create account'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <label className="label" htmlFor="otp">Verification Code</label>
              <input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter OTP sent to your email"
                className="input"
                value={form.otp}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Verifying...' : 'Verify OTP'}
                {!loading && <ArrowRight size={16} />}
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
