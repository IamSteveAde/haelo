import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppMessage from '@/components/ui/WhatsAppMessage'
import Link from 'next/link'
import {
  Mail, CheckCircle, Zap, Shield, Clock, Users,
  ArrowRight, Star, ChevronRight, MessageSquare,
  BookOpen, LayoutDashboard, Activity, Settings2
} from 'lucide-react'

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-offwhite overflow-hidden relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#0D1B2A 1px, transparent 1px), linear-gradient(90deg, #0D1B2A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-lime/10 text-lime text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-lime rounded-full animate-pulse" />
              AI Chief of Staff — Now Available
            </div>

            <h1 className="font-bold text-navy leading-[1.1] mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Be everywhere.<br />
              Miss nothing.
            </h1>

            <p className="text-midgray text-lg leading-relaxed mb-8 max-w-lg">
              Haelo reads every internal email, summarises it in three lines, drafts the right response, and sends it to your WhatsApp. You approve in one tap. Your team never waits.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/auth/signup" className="btn-primary text-base px-8 py-4">
                Start free — 30 days
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/2349000000000?text=I'm%20interested%20in%20Haelo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base px-8 py-4"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Talk to us on WhatsApp
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['A', 'K', 'T', 'O'].map((l, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-offwhite flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: ['#0D1B2A', '#25D366', '#162338', '#1fb857'][i] }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-lime text-lime" />
                  ))}
                </div>
                <p className="text-xs text-midgray font-bold">Trusted by executives across Nigeria</p>
              </div>
            </div>
          </div>

          {/* Right: WhatsApp mockup */}
          <div className="flex justify-center lg:justify-end">
            <WhatsAppMessage className="animate-fade-in-up" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── STATS BAR ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: '<60s', label: 'Email to WhatsApp' },
    { value: '90%+', label: 'Responses approved first try' },
    { value: '<10 min', label: 'Daily inbox management' },
    { value: '99.5%', label: 'Platform uptime' },
  ]

  return (
    <section className="bg-navy py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.value} className="text-center">
            <p className="text-3xl font-bold text-lime mb-1" style={{ letterSpacing: '-0.02em' }}>{s.value}</p>
            <p className="text-xs font-bold text-white/50 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Email arrives',
      description: 'A staff member sends an email to your company address. Haelo detects it in real time via your connected email provider.',
    },
    {
      step: '02',
      title: 'AI reads and understands',
      description: 'Haelo reads the email, cross-references your Business Bible, and generates a contextual, accurate response grounded in how your business actually operates.',
    },
    {
      step: '03',
      title: 'WhatsApp notification',
      description: 'You receive a structured WhatsApp message: sender name, role, a two-line summary, and a suggested response. Everything you need. Nothing you don\'t.',
    },
    {
      step: '04',
      title: 'You approve in one tap',
      description: 'Reply YES to send immediately. Reply NO to provide a short instruction. Or do nothing — Haelo sends after your configured timer. Your team never waits.',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-6 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">How it works</p>
          <h2 className="text-4xl font-bold text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
            From email to WhatsApp in under 60 seconds
          </h2>
          <p className="text-midgray text-lg max-w-xl mx-auto">
            No inbox. No stress. Just a WhatsApp message and one tap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="card h-full">
                <div className="text-4xl font-bold text-lime/30 mb-4" style={{ letterSpacing: '-0.02em' }}>{step.step}</div>
                <h3 className="text-base font-bold text-navy mb-3">{step.title}</h3>
                <p className="text-sm text-midgray leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight
                  size={20}
                  className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-silver z-10"
                />
              )}
            </div>
          ))}
        </div>

        {/* CTA to WhatsApp */}
        <div className="mt-16 bg-navy rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-lime mb-2">Ready to see it in action?</p>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
              Talk to Haelo directly on WhatsApp
            </h3>
            <p className="text-white/60 text-sm">We&apos;ll walk you through the product in real time.</p>
          </div>
          <a
            href="https://wa.me/2349000000000?text=I'd%20like%20to%20learn%20more%20about%20Haelo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 text-base px-8 py-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Open WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// ── FEATURES ──────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      icon: <Mail size={20} />,
      title: 'Real-time email monitoring',
      description: 'Haelo watches your inbox 24/7. Company domain emails only — all external emails ignored. Nothing slips through.',
    },
    {
      icon: <Zap size={20} />,
      title: 'AI response generation',
      description: 'Every response grounded in your Business Bible. Contextual, appropriately toned, and accurate to how your business operates.',
    },
    {
      icon: <MessageSquare size={20} />,
      title: 'WhatsApp as the interface',
      description: 'No new app. No new inbox. Everything happens on WhatsApp — the platform you already use every day without thinking.',
    },
    {
      icon: <Clock size={20} />,
      title: 'Configurable auto-send timer',
      description: 'Three modes: Auto-Send, Remind & Wait, or Hybrid. Set globally or per staff member. You stay in control.',
    },
    {
      icon: <BookOpen size={20} />,
      title: 'Business Bible',
      description: 'Upload your company context once. Haelo references it on every email — SOPs, team structure, decision rules, all of it.',
    },
    {
      icon: <Users size={20} />,
      title: 'Staff directory',
      description: 'Every staff member recognised by name, role, and department. Bulk CSV import. Unrecognised sender queue.',
    },
    {
      icon: <Activity size={20} />,
      title: 'Full activity log',
      description: 'Every email processed. Every response sent. Filter by date, sender, department. Full visibility at all times.',
    },
    {
      icon: <Shield size={20} />,
      title: 'Security by design',
      description: 'OAuth only — no email passwords stored. Data encrypted at rest and in transit. Each client isolated. 30-day retention.',
    },
  ]

  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Features</p>
          <h2 className="text-4xl font-bold text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
            Everything your team needs.<br />Nothing you don&apos;t.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className="group card hover:border-lime/30 hover:shadow-elevated transition-all duration-200">
              <div className="w-10 h-10 bg-lime/10 text-lime rounded-lg flex items-center justify-center mb-4 group-hover:bg-lime group-hover:text-navy transition-all duration-200">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-navy mb-2">{f.title}</h3>
              <p className="text-xs text-midgray leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── INTEGRATIONS ──────────────────────────────────────────────────────────────
function Integrations() {
  const integrations = [
    { name: 'Gmail', desc: 'Google OAuth 2.0' },
    { name: 'Outlook', desc: 'Microsoft 365' },
    { name: 'Zoho Mail', desc: 'Zoho OAuth' },
    { name: 'WhatsApp', desc: 'Business API' },
    { name: 'Claude AI', desc: 'Anthropic' },
    { name: 'Supabase', desc: 'Vector DB' },
    { name: 'Termii', desc: 'WhatsApp gateway' },
    { name: 'Google Drive', desc: 'Bible upload' },
  ]

  // Platform logo SVG marks (simplified icon-style)
  const logos: Record<string, React.ReactNode> = {
    Gmail: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <path d="M2 6C2 4.9 2.9 4 4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6z" stroke="#E2E2E0" strokeWidth="1.5"/>
        <path d="M2 6l10 7 10-7" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    Outlook: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <rect x="2" y="4" width="12" height="16" rx="2" fill="#0078D4" opacity="0.15" stroke="#0078D4" strokeWidth="1.5"/>
        <rect x="10" y="7" width="12" height="12" rx="2" fill="#0078D4" opacity="0.3" stroke="#0078D4" strokeWidth="1.5"/>
        <circle cx="6.5" cy="12" r="2.5" fill="#0078D4"/>
      </svg>
    ),
    'Zoho Mail': (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="#E4261C" opacity="0.15" stroke="#E4261C" strokeWidth="1.5"/>
        <path d="M7 9l5 3 5-3" stroke="#E4261C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    WhatsApp: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    'Claude AI': (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#CC785C" strokeWidth="1.5"/>
        <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#CC785C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    Supabase: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <path d="M12 3L3 8v8l9 5 9-5V8L12 3z" stroke="#3ECF8E" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 8l9 5 9-5" stroke="#3ECF8E" strokeWidth="1.5"/>
        <path d="M12 13v8" stroke="#3ECF8E" strokeWidth="1.5"/>
      </svg>
    ),
    Termii: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#0052CC" strokeWidth="1.5"/>
        <path d="M7 12h10M12 7v10" stroke="#0052CC" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Google Drive': (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <path d="M12 3L3 18h6l3-5 3 5h6L12 3z" stroke="#4285F4" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 18h18" stroke="#FBBC05" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 3l6 10" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  }

  return (
    <section id="integrations" className="py-24 px-6 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Integrations</p>
          <h2 className="text-4xl font-bold text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
            Works with the tools you already use
          </h2>
          <p className="text-midgray text-lg max-w-xl mx-auto">
            Haelo connects to your existing email provider in minutes. No migration. No disruption.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {integrations.map((intg) => (
            <div key={intg.name} className="card flex flex-col items-center text-center gap-3 py-8 hover:border-lime/30 hover:shadow-elevated transition-all duration-200">
              {logos[intg.name]}
              <div>
                <p className="text-sm font-bold text-navy">{intg.name}</p>
                <p className="text-xs text-midgray mt-0.5">{intg.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-midgray">
          More integrations — including Slack and Zoho CRM — arriving in Version 2.0.
        </p>
      </div>
    </section>
  )
}

// ── PRICING ───────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: 'Solo',
      price: '₦150,000',
      period: 'per month',
      sub: '1 executive',
      highlight: false,
      cta: 'Start free trial',
      ctaHref: '/auth/signup',
      features: [
        '1 executive WhatsApp account',
        'Gmail, Outlook, or Zoho Mail',
        'Business Bible up to 20 pages',
        'Full dashboard access',
        'Email activity log',
        'Standard 10-minute timer',
        'WhatsApp notification flow',
      ],
    },
    {
      name: 'Team',
      price: '₦500,000',
      period: 'per month',
      sub: 'Up to 5 people',
      highlight: true,
      cta: 'Start free trial',
      ctaHref: '/auth/signup',
      features: [
        'Up to 5 seats (CEO, HR, Ops, etc.)',
        'All email providers',
        'Unlimited Business Bible size',
        'Custom timer per staff level',
        'Shared team dashboard',
        'Priority support',
        'Monthly performance report',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Contact Sales',
      period: 'custom',
      sub: '6+ people',
      highlight: false,
      cta: 'Talk to us on WhatsApp',
      ctaHref: 'https://wa.me/2349000000000?text=I%27m%20interested%20in%20Enterprise',
      external: true,
      features: [
        'Unlimited seats',
        'Dedicated onboarding',
        'Custom integrations & SLA',
        'Bespoke Business Bible setup',
        'Dedicated account manager',
        'Annual contract options',
        'White-glove support',
      ],
    },
  ]

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Pricing</p>
          <h2 className="text-4xl font-bold text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
            Flat rate. No surprises.
          </h2>
          <p className="text-midgray text-lg max-w-xl mx-auto">
            First 30 days free. Cancel any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border flex flex-col relative ${
                plan.highlight
                  ? 'bg-navy border-navy text-white shadow-elevated'
                  : 'bg-white border-border'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-lime text-navy text-xs font-bold px-4 py-1 rounded-full">Most popular</span>
                </div>
              )}

              <div className="p-8 border-b border-white/10">
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlight ? 'text-lime' : 'text-lime'}`}>
                  {plan.name}
                </p>
                <p className={`text-3xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-navy'}`} style={{ letterSpacing: '-0.02em' }}>
                  {plan.price}
                </p>
                <p className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-midgray'}`}>
                  {plan.period} · {plan.sub}
                </p>
              </div>

              <div className="p-8 flex-1">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle
                        size={15}
                        className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-lime' : 'text-lime'}`}
                      />
                      <span className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-midgray'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.external ? (
                  <a
                    href={plan.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg text-sm transition-all duration-200 ${
                      plan.highlight
                        ? 'bg-lime text-navy hover:bg-lime-hover'
                        : 'bg-offwhite text-navy hover:bg-navy hover:text-white border border-border'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {plan.cta}
                  </a>
                ) : (
                  <Link
                    href={plan.ctaHref}
                    className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg text-sm transition-all duration-200 ${
                      plan.highlight
                        ? 'bg-lime text-navy hover:bg-lime-hover'
                        : 'bg-offwhite text-navy hover:bg-navy hover:text-white border border-border'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-midgray mt-8">
          All prices in Nigerian Naira. Global USD pricing available on request.
        </p>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote: 'I used to spend two hours on internal emails every morning. Haelo handles all of it before I even sit down. My team gets faster responses than they ever did when I was doing it myself.',
      name: 'Adaeze O.',
      role: 'CEO, Retail Group — Lagos',
    },
    {
      quote: 'The first time Haelo sent a response on my behalf and my Operations Manager said it was the fastest reply I\'d ever given, I knew this was different. Exactly right. Every time.',
      name: 'Kunle A.',
      role: 'MD, Construction Firm — Abuja',
    },
    {
      quote: 'We deployed Haelo across five senior managers. Our internal response time dropped from two days to under fifteen minutes. The ROI was clear within the first week.',
      name: 'Temi B.',
      role: 'COO, Financial Services — Lagos',
    },
  ]

  return (
    <section className="py-24 px-6 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">What executives say</p>
          <h2 className="text-4xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>
            Your team never waits.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card flex flex-col gap-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-lime text-lime" />
                ))}
              </div>
              <p className="text-sm text-nearblack leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-bold text-navy">{t.name}</p>
                <p className="text-xs text-midgray">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FINAL CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-3xl mx-auto text-center">
        <p className="section-label mb-6">Get started</p>
        <h2 className="text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          Your team deserves a response today.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          First 30 days free. No credit card required. Set up in under 15 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="btn-primary text-base px-10 py-4">
            Create your account
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://wa.me/2349000000000?text=I%27m%20ready%20to%20start%20with%20Haelo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white text-base px-10 py-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-lime">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Start on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Features />
      <Integrations />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
