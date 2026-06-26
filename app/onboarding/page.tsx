'use client'

import { useState } from 'react'
import Logo from '@/components/ui/Logo'
import { CheckCircle, ArrowRight, Upload, Smartphone, Link as LinkIcon, Clock, Mail } from 'lucide-react'

const steps = [
  { id: 1, label: 'Create account', icon: CheckCircle },
  { id: 2, label: 'Connect email', icon: Mail },
  { id: 3, label: 'Verify WhatsApp', icon: Smartphone },
  { id: 4, label: 'Upload Business Bible', icon: Upload },
  { id: 5, label: 'Configure timer', icon: Clock },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(2)
  const [verificationCode, setVerificationCode] = useState('')
  const [whatsappNum, setWhatsappNum] = useState('')
  const [timerMode, setTimerMode] = useState('hybrid')
  const [timerDuration, setTimerDuration] = useState('10')
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)

  const handleUpload = () => {
    setUploading(true)
    setTimeout(() => { setUploading(false); setUploadDone(true) }, 2000)
  }

  const goNext = () => {
    if (currentStep < 5) setCurrentStep(s => s + 1)
    else window.location.href = '/dashboard/overview'
  }

  return (
    <div className="min-h-screen bg-offwhite flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <Logo variant="lime-on-white" size="md" />
        <p className="text-xs text-midgray">
          Step {currentStep} of 5 — Setup
        </p>
      </header>

      <div className="flex-1 flex items-start justify-center pt-12 px-4 pb-12">
        <div className="w-full max-w-2xl">
          {/* Step progress */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-5 left-10 right-10 h-0.5 bg-border" />
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  s.id < currentStep ? 'bg-lime text-navy' :
                  s.id === currentStep ? 'bg-navy text-white ring-4 ring-navy/20' :
                  'bg-white border-2 border-border text-midgray'
                }`}>
                  {s.id < currentStep ? <CheckCircle size={18} /> : s.id}
                </div>
                <p className={`text-xs font-bold text-center hidden sm:block ${
                  s.id === currentStep ? 'text-navy' : s.id < currentStep ? 'text-lime' : 'text-silver'
                }`}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="card p-8">
            {/* Step 1 complete */}
            {currentStep === 1 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-lime" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-3" style={{ letterSpacing: '-0.02em' }}>Account created.</h2>
                <p className="text-midgray mb-6">Now let&apos;s connect your email so Haelo can start monitoring.</p>
                <button className="btn-primary" onClick={goNext}>Continue <ArrowRight size={16} /></button>
              </div>
            )}

            {/* Step 2: Connect email */}
            {currentStep === 2 && (
              <div>
                <p className="section-label mb-2">Step 2 of 5</p>
                <h2 className="text-2xl font-bold text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>Connect your email</h2>
                <p className="text-midgray text-sm mb-6">Haelo uses OAuth — your password is never stored or seen.</p>

                <div className="space-y-3 mb-6">
                  {[
                    { id: 'gmail', label: 'Connect with Gmail', sub: 'Google OAuth 2.0', color: '#EA4335' },
                    { id: 'outlook', label: 'Connect with Outlook', sub: 'Microsoft 365 via Graph API', color: '#0078D4' },
                    { id: 'zoho', label: 'Connect with Zoho Mail', sub: 'Zoho OAuth', color: '#E4261C' },
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={goNext}
                      className="w-full flex items-center gap-4 p-4 border border-border rounded-xl hover:border-lime/40 hover:bg-offwhite/60 text-left transition-all group"
                    >
                      <div className="w-10 h-10 bg-offwhite rounded-lg flex items-center justify-center border border-border">
                        <LinkIcon size={16} style={{ color: p.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-navy">{p.label}</p>
                        <p className="text-xs text-midgray">{p.sub}</p>
                      </div>
                      <ArrowRight size={16} className="text-silver group-hover:text-lime transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: WhatsApp */}
            {currentStep === 3 && (
              <div>
                <p className="section-label mb-2">Step 3 of 5</p>
                <h2 className="text-2xl font-bold text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>Verify your WhatsApp</h2>
                <p className="text-midgray text-sm mb-6">This is where Haelo will send all your email notifications.</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="label">WhatsApp number</label>
                    <input
                      type="tel"
                      className="input"
                      placeholder="+234 801 234 5678"
                      value={whatsappNum}
                      onChange={e => setWhatsappNum(e.target.value)}
                    />
                  </div>
                  <button className="btn-primary text-sm">Send verification code</button>

                  {whatsappNum && (
                    <div>
                      <label className="label">Verification code</label>
                      <input
                        type="text"
                        className="input tracking-widest text-lg"
                        placeholder="000000"
                        maxLength={6}
                        value={verificationCode}
                        onChange={e => setVerificationCode(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button className="btn-ghost" onClick={() => setCurrentStep(s => s - 1)}>Back</button>
                  <button className="btn-primary flex-1 justify-center" onClick={goNext}>
                    Verify & continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Business Bible */}
            {currentStep === 4 && (
              <div>
                <p className="section-label mb-2">Step 4 of 5</p>
                <h2 className="text-2xl font-bold text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>Upload your Business Bible</h2>
                <p className="text-midgray text-sm mb-6">The document that teaches Haelo how your business operates. PDF or Word, up to 50 pages.</p>

                {!uploadDone ? (
                  <div
                    onClick={handleUpload}
                    className="border-2 border-dashed border-border hover:border-lime/40 rounded-xl p-10 text-center cursor-pointer hover:bg-offwhite transition-all mb-6"
                  >
                    {uploading ? (
                      <>
                        <div className="w-12 h-12 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload size={22} className="text-lime animate-bounce" />
                        </div>
                        <p className="text-sm font-bold text-navy mb-1">Processing your Business Bible...</p>
                        <div className="h-1.5 bg-border rounded-full overflow-hidden mt-3">
                          <div className="h-full bg-lime rounded-full animate-pulse" style={{ width: '60%' }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-offwhite border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload size={22} className="text-midgray" />
                        </div>
                        <p className="text-sm font-bold text-navy mb-1">Drop your file here or click to browse</p>
                        <p className="text-xs text-midgray">PDF or Word · Max 50 pages</p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-lime/5 border border-lime/20 rounded-xl mb-6">
                    <CheckCircle size={18} className="text-lime" />
                    <div>
                      <p className="text-sm font-bold text-navy">Business Bible uploaded and processed.</p>
                      <p className="text-xs text-midgray">47 staff members identified.</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="btn-ghost" onClick={() => setCurrentStep(s => s - 1)}>Back</button>
                  <button className="btn-primary flex-1 justify-center" onClick={goNext}>
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Timer */}
            {currentStep === 5 && (
              <div>
                <p className="section-label mb-2">Step 5 of 5</p>
                <h2 className="text-2xl font-bold text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>Configure your timer</h2>
                <p className="text-midgray text-sm mb-6">Controls how Haelo handles emails you don&apos;t respond to on WhatsApp.</p>

                <div className="space-y-3 mb-5">
                  {[
                    { id: 'auto-send', label: 'Auto-Send', desc: 'After the timer, Haelo sends automatically. Zero backlog.' },
                    { id: 'remind', label: 'Remind & Wait', desc: 'Haelo reminds you until you respond. Never sends without you.' },
                    { id: 'hybrid', label: 'Hybrid (Recommended)', desc: 'Auto-send for routine emails, wait for senior or sensitive ones.' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setTimerMode(m.id)}
                      className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                        timerMode === m.id ? 'border-lime bg-lime/5' : 'border-border hover:border-lime/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 ${timerMode === m.id ? 'border-lime bg-lime' : 'border-silver'}`} />
                      <div>
                        <p className="text-sm font-bold text-navy">{m.label}</p>
                        <p className="text-xs text-midgray mt-0.5">{m.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="label">Timer duration</label>
                  <select className="input" value={timerDuration} onChange={e => setTimerDuration(e.target.value)}>
                    {['5', '10', '15', '20', '30'].map(v => (
                      <option key={v} value={v}>{v} minutes</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button className="btn-ghost" onClick={() => setCurrentStep(s => s - 1)}>Back</button>
                  <button className="btn-primary flex-1 justify-center" onClick={goNext}>
                    Haelo is ready <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
