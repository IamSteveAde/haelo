'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const T = {
  ink: '#10220D',
  cream: '#F6F3EC',
  gold: '#B99535',
  green: '#2E7D52',
  white: '#FFFFFF',
  muted: '#687064',
  line: 'rgba(16,34,13,.10)',
}

const inkA = (a: number) => `rgba(16,34,13,${a})`
const creamA = (a: number) => `rgba(246,243,236,${a})`

const SELF_SERVE_MAX = 15
type Tier = { from: number; to: number; rate: number; label: string }
const TIERS: Tier[] = [
  { from: 1, to: 1, rate: 55000, label: 'Seat 1' },
  { from: 2, to: 5, rate: 45000, label: 'Seats 2–5' },
  { from: 6, to: 15, rate: 35000, label: 'Seats 6–15' },
]

type Breakdown = { label: string; qty: number; rate: number; subtotal: number }

function computeBilling(seats: number) {
  if (seats > SELF_SERVE_MAX) return { total: 0, breakdown: [] as Breakdown[], isCustom: true }
  let remaining = seats
  let total = 0
  const breakdown: Breakdown[] = []

  for (const tier of TIERS) {
    if (remaining <= 0) break
    const capacity = tier.to - tier.from + 1
    const qty = Math.min(remaining, capacity)
    if (qty > 0) {
      const subtotal = qty * tier.rate
      breakdown.push({ label: tier.label, qty, rate: tier.rate, subtotal })
      total += subtotal
      remaining -= qty
    }
  }
  return { total, breakdown, isCustom: false }
}

const formatNaira = (n: number) => `₦${n.toLocaleString('en-NG')}`

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function Arrow({ dark = false }: { dark?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke={dark ? T.ink : T.cream} strokeWidth="2.4"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function Check() {
  return (
    <span className="check">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="m4 8 2.3 2.3L12 4.7" stroke={T.gold} strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function WA({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      <span />
      {children}
    </div>
  )
}

function MagneticButton({
  children, href, secondary = false,
}: {
  children: React.ReactNode
  href: string
  secondary?: boolean
}) {
  return (
    <Link href={href} className={`magnetic-btn ${secondary ? 'secondary-btn' : ''}`}>
      <span>{children}</span>
      <Arrow dark={secondary} />
    </Link>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['How it works', 'Features', 'Pricing']

  return (
    <>
      <nav className={`nav ${scrolled || open ? 'nav-scrolled' : ''}`}>
        <Link href="/" className="logo">haelo<span>.</span></Link>

        <div className="nav-links">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`}>{link}</a>
          ))}
        </div>

        <div className="nav-actions">
          <Link href="/auth/signup" className="nav-cta">
            Start free <Arrow />
          </Link>
          <button className={`menu-button ${open ? 'is-open' : ''}`} onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu" aria-expanded={open}>
            <i /><i /><i />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} onClick={() => setOpen(false)}>
            {link}<Arrow dark />
          </a>
        ))}
        <Link href="/auth/signup" onClick={() => setOpen(false)} className="mobile-cta">
          Start free — 30 days <Arrow />
        </Link>
      </div>
    </>
  )
}

function Hero() {
  const [active, setActive] = useState(0)

  const notifications = [
    { from: 'Tosin · Operations', subject: 'Rice order approval', time: 'Just now', text: 'Need approval on the rice order before Friday.' },
    { from: 'Ada · Finance', subject: 'Q3 vendor invoice', time: '2m ago', text: 'Can you confirm the revised payment schedule?' },
    { from: 'Kelechi · Projects', subject: 'Site update', time: '5m ago', text: 'The client has approved the next phase.' },
  ]

  useEffect(() => {
    const id = window.setInterval(() => setActive(v => (v + 1) % notifications.length), 3800)
    return () => window.clearInterval(id)
  }, [notifications.length])

  const current = notifications[active]

  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="live-dot" />
            AI CHIEF OF STAFF
          </div>

          <h1>
            Be everywhere.
            <br />
            <span>Miss nothing.</span>
          </h1>

          <p>
            Haelo reads internal email, understands your company,
            drafts the response and brings it to your WhatsApp.
            You make the call.
          </p>

          <div className="hero-actions">
            <MagneticButton href="/auth/signup">Start free — 30 days</MagneticButton>
            <a className="outline-btn" href="https://wa.me/2349000000000"
              target="_blank" rel="noopener noreferrer">
              <WA size={16} color={T.green} /> Talk to us
            </a>
          </div>

          <div className="trust-row">
            <span><Check /> No credit card</span>
            <span><Check /> Set up in 15 min</span>
            <span><Check /> Cancel anytime</span>
          </div>
        </div>

        <div className="hero-product">
          <div className="product-orbit orbit-one" />
          <div className="product-orbit orbit-two" />

          <div className="whatsapp-card">
            <div className="wa-top">
              <div className="wa-avatar">H</div>
              <div>
                <strong>Haelo</strong>
                <small>AI Chief of Staff · online</small>
              </div>
              <span className="wa-menu">•••</span>
            </div>

            <div className="wa-body">
              <div className="date-pill">TODAY</div>
              <div className="message-bubble">
                <small>NEW INTERNAL EMAIL</small>
                <strong>{current.subject}</strong>
                <p>{current.text}</p>
                <div className="message-from">
                  <span>{current.from}</span>
                  <span>{current.time}</span>
                </div>
              </div>

              <div className="draft-bubble">
                <div className="draft-label"><span /> DRAFT REPLY</div>
                <p>
                  Approved — please proceed and send the invoice once
                  the order is confirmed.
                </p>
                <div className="bubble-actions">
                  <button>Approve</button>
                  <button>Edit</button>
                  <button>Skip</button>
                </div>
              </div>
            </div>

            <div className="wa-bottom">
              <span>Haelo is waiting for your decision</span>
              <i />
            </div>
          </div>

          <div className="float-card float-card-one">
            <span className="float-icon">✦</span>
            <div><b>Context understood</b><small>Business Bible applied</small></div>
          </div>
          <div className="float-card float-card-two">
            <span className="pulse-check">✓</span>
            <div><b>One tap</b><small>Reply sent securely</small></div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </div>
    </section>
  )
}

function FlowStrip() {
  const { ref, visible } = useReveal()
  const steps = [
    ['01', 'Email arrives', 'Tosin · Operations', 'Need approval on the rice order.'],
    ['02', 'Haelo understands', 'Business Bible', 'Context, tone and policy applied.'],
    ['03', 'You decide', 'WhatsApp', 'Approve. Edit. Or skip.'],
  ]

  return (
    <div ref={ref} className={`flow-strip reveal ${visible ? 'visible' : ''}`}>
      {steps.map((step, i) => (
        <div className="flow-step" key={step[0]}>
          <span className="flow-number">{step[0]}</span>
          <div>
            <small>{step[1]}</small>
            <strong>{step[2]}</strong>
            <p>{step[3]}</p>
          </div>
          {i < 2 && <span className="flow-arrow"><Arrow dark /></span>}
        </div>
      ))}
    </div>
  )
}

function Ledger() {
  const { ref, visible } = useReveal()
  const items = [
    ['<60s', 'From an email landing to a drafted reply on your WhatsApp.'],
    ['1 tap', 'Approve, edit or skip without opening another app.'],
    ['24/7', 'Your internal inbox watched while you focus elsewhere.'],
  ]

  return (
    <section className="ledger">
      <div ref={ref} className={`ledger-inner reveal ${visible ? 'visible' : ''}`}>
        {items.map(([big, text], i) => (
          <div className="ledger-item" key={big}>
            <span className="ledger-index">0{i + 1}</span>
            <strong>{big}</strong>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const { ref, visible } = useReveal()
  const steps = [
    { n: '01', title: 'Email arrives', body: 'A staff member emails your company address. Haelo sees it the moment it lands.' },
    { n: '02', title: 'Context is applied', body: 'Your Business Bible tells Haelo who people are and how your company handles situations like this.' },
    { n: '03', title: 'A decision reaches you', body: 'A clean WhatsApp card shows who sent it, what they need and a reply ready to review.' },
    { n: '04', title: 'You stay in control', body: 'Approve as-is, ask for a change or skip it. Nothing is sent until you say so.' },
  ]

  return (
    <section id="how-it-works" className="section cream-section">
      <div className="section-shell">
        <Eyebrow>How it works</Eyebrow>
        <div className="section-heading split-heading">
          <h2>Four steps.<br /><em>Zero inbox anxiety.</em></h2>
          <p>Designed around the way busy executives already work — not another dashboard demanding your attention.</p>
        </div>

        <div ref={ref} className={`steps-grid reveal ${visible ? 'visible' : ''}`}>
          {steps.map((s, i) => (
            <div className="step-card" key={s.n}>
              <div className="step-top">
                <span>{s.n}</span>
                <i />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="step-line" />
              <span className="step-arrow"><Arrow dark /></span>
            </div>
          ))}
        </div>

        <FlowStrip />
      </div>
    </section>
  )
}

function Features() {
  const { ref, visible } = useReveal()
  const features = [
    ['01', 'Real-time email monitoring', 'A constant watch on your company domain.'],
    ['02', 'The Business Bible', 'One source of truth for how your company responds.'],
    ['03', 'WhatsApp-first', 'No new login, no new app. Decisions where you already are.'],
    ['04', 'Configurable timer', 'Auto-send, remind-and-wait, or a hybrid workflow.'],
    ['05', 'Staff directory', 'People recognised by name, role and department.'],
    ['06', 'Activity log', 'Every email, draft and outcome, filterable and exportable.'],
    ['07', 'Context-aware drafting', 'Replies grounded in company knowledge and tone.'],
    ['08', 'Security by design', 'OAuth only. Encrypted in transit and at rest.'],
  ]

  return (
    <section id="features" className="section feature-section">
      <div className="section-shell">
        <div className="feature-intro">
          <Eyebrow>Features</Eyebrow>
          <h2>Everything it takes.<br /><em>Nothing it doesn’t.</em></h2>
          <p>Eight pieces working as one system, built for people who have no time to waste on inbox administration.</p>
          <div className="feature-stamp">BUILT FOR<br /><b>DECISION MAKERS</b></div>
        </div>

        <div ref={ref} className={`feature-list reveal ${visible ? 'visible' : ''}`}>
          {features.map(([n, title, body], i) => (
            <div className="feature-row" key={n}>
              <span className="feature-number">{n}</span>
              <div className="feature-copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <span className="feature-plus">+</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Integrations() {
  const providers = ['Gmail', 'Outlook', 'Zoho Mail', 'WhatsApp Business', 'Google Drive']
  return (
    <section className="integrations">
      <div className="integration-glow" />
      <div className="integration-inner">
        <Eyebrow light>Fits your stack</Eyebrow>
        <h2>Your tools stay.<br /><span>Haelo connects them.</span></h2>
        <div className="integration-list">
          {providers.map((p, i) => (
            <div className="integration-item" key={p}>
              <span>0{i + 1}</span>
              <strong>{p}</strong>
            </div>
          ))}
        </div>
        <p className="integration-note">Slack and Zoho CRM arriving in Version 2.0</p>
      </div>
    </section>
  )
}

function PricingCalculator() {
  const [seats, setSeats] = useState(3)
  const { total, breakdown, isCustom } = computeBilling(seats)
  const nextRate = seats < SELF_SERVE_MAX
    ? TIERS.find(t => seats + 1 >= t.from && seats + 1 <= t.to)?.rate ?? null
    : null

  const included = [
    'Add as many inboxes as you need',
    'All email providers',
    'Unlimited Business Bible size',
    'Custom timer per person',
    'Shared team dashboard',
    'Priority support',
  ]

  return (
    <div className="pricing-card">
      <div className="calculator">
        <div className="calculator-head">
          <div>
            <small>ESTIMATE YOUR BILL</small>
            <h3>Built around your team.</h3>
          </div>
          <span className="live-price">LIVE</span>
        </div>

        <p className="calculator-copy">
          Pay per inbox. The rate drops automatically as your team grows.
        </p>

        <div className="seat-control">
          <div className="seat-label">
            <span>Team members</span>
            <strong>{seats}{seats >= SELF_SERVE_MAX ? '+' : ''}</strong>
          </div>
          <input type="range" min={1} max={16} value={seats}
            onChange={e => setSeats(Number(e.target.value))} />
          <div className="range-labels"><span>1</span><span>15+</span></div>
        </div>

        {isCustom ? (
          <div className="custom-box">
            <span>16+</span>
            <div><strong>Custom pricing</strong><p>Dedicated onboarding and a rate suited to your organisation.</p></div>
          </div>
        ) : (
          <div className="breakdown">
            {breakdown.map(b => (
              <div className="breakdown-row" key={b.label}>
                <span>{b.label}<small>{formatNaira(b.rate)} / seat</small></span>
                <strong>{formatNaira(b.subtotal)}</strong>
              </div>
            ))}
            {nextRate !== null && breakdown.length && nextRate < breakdown[breakdown.length - 1].rate && (
              <div className="rate-note">Add one more seat and the rate drops to {formatNaira(nextRate)}.</div>
            )}
          </div>
        )}
      </div>

      <div className="price-summary">
        <div>
          <small>ESTIMATED MONTHLY TOTAL</small>
          <div className="price-total">{isCustom ? 'Custom' : formatNaira(total)}</div>
          {!isCustom && <p>per month · {seats} {seats === 1 ? 'seat' : 'seats'}</p>}
        </div>

        <div className="included-list">
          {included.map(item => <div key={item}><Check />{item}</div>)}
        </div>

        {isCustom ? (
          <a className="price-cta" href="https://wa.me/2349000000000?text=I'd%20like%20to%20talk%20about%20Enterprise%20pricing"
            target="_blank" rel="noopener noreferrer">
            <WA size={15} color={T.ink} /> Talk to us
          </a>
        ) : (
          <Link href="/auth/signup" className="price-cta">Start free — 30 days <Arrow dark /></Link>
        )}
        <span className="price-footnote">No credit card required</span>
      </div>
    </div>
  )
}

function Pricing() {
  const { ref, visible } = useReveal(0.05)
  return (
    <section id="pricing" className="section cream-section pricing-section">
      <div className="section-shell">
        <Eyebrow>Pricing</Eyebrow>
        <div className="section-heading">
          <h2>Pay for people,<br /><em>not a plan size.</em></h2>
          <p>First 30 days free. Cancel any time. All prices in Nigerian Naira.</p>
        </div>
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <PricingCalculator />
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const testimonials = [
    ['“', 'I used to spend two hours on internal emails every morning. Haelo handles most of it before I sit down.', 'Adaeze O.', 'CEO · Retail Group'],
    ['“', 'The first reply Haelo sent for me was the fastest I had ever answered — and it was the right call.', 'Kunle A.', 'MD · Construction'],
    ['“', 'Five senior managers on it now. Response time went from days to minutes.', 'Temi B.', 'COO · Financial Services'],
  ]

  return (
    <section className="testimonials">
      <div className="testimonial-noise" />
      <div className="section-shell">
        <div className="testimonial-head">
          <Eyebrow light>What execs say</Eyebrow>
          <div className="testimonial-controls">
            {testimonials.map((_, i) => (
              <button key={i} className={active === i ? 'active' : ''} onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`} />
            ))}
          </div>
        </div>

        <div className="testimonial-stage">
          <span className="quote-mark">{testimonials[active][0]}</span>
          <blockquote key={active}>{testimonials[active][1]}</blockquote>
          <div className="quote-author">
            <span>{testimonials[active][2][0]}</span>
            <div><strong>{testimonials[active][2]}</strong><small>{testimonials[active][3]}</small></div>
          </div>
        </div>

        <p className="illustrative">Illustrative — swap in real client quotes as they come in.</p>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="cta-ring ring-a" />
      <div className="cta-ring ring-b" />
      <div className="cta-inner">
        <Eyebrow>Ready when you are</Eyebrow>
        <h2>Your team deserves<br /><em>a reply today.</em></h2>
        <p>First 30 days free. No credit card. Set up in under 15 minutes.</p>
        <div className="hero-actions centered">
          <MagneticButton href="/auth/signup">Create your account</MagneticButton>
          <a className="outline-btn" href="https://wa.me/2349000000000"
            target="_blank" rel="noopener noreferrer">
            <WA size={16} color={T.green} /> Start on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const columns = [
    ['Product', ['How it works', 'Features', 'Pricing']],
    ['Company', ['About', 'Blog', 'Careers', 'Contact']],
    ['Legal', ['Privacy', 'Terms', 'Security']],
  ]

  return (
    <footer>
      <div className="footer-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="logo light">haelo<span>.</span></Link>
            <p>Be everywhere. Miss nothing.<br />AI Chief of Staff for Nigerian executives.</p>
          </div>
          {columns.map(([heading, links]) => (
            <div className="footer-column" key={heading}>
              <small>{heading}</small>
              {links.map(link => <a href="#" key={link}>{link}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Haelo. All rights reserved.</span>
          <span>Built in Lagos 🇳🇬</span>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        :root {
          --ink: ${T.ink};
          --cream: ${T.cream};
          --gold: ${T.gold};
          --green: ${T.green};
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--cream);
          color: var(--ink);
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        a, button, input { font: inherit; }
        a { color: inherit; }
        button { cursor: pointer; }
        ::selection { background: var(--gold); color: var(--ink); }

        .nav {
          position: fixed; inset: 0 0 auto; height: 78px; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5.5%;
          transition: .45s cubic-bezier(.2,.8,.2,1);
        }
        .nav-scrolled {
          height: 68px; background: rgba(246,243,236,.82);
          backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
          border-bottom: 1px solid rgba(16,34,13,.08);
          box-shadow: 0 12px 40px rgba(16,34,13,.04);
        }
        .logo { text-decoration: none; font-size: 22px; font-weight: 800; letter-spacing: -.055em; }
        .logo span { color: var(--gold); }
        .logo.light { color: var(--cream); }
        .nav-links { display: flex; gap: 38px; margin-left: 10%; }
        .nav-links a {
          font-size: 13px; font-weight: 600; color: rgba(16,34,13,.55);
          text-decoration: none; position: relative; padding: 10px 0;
        }
        .nav-links a::after {
          content: ''; position: absolute; left: 0; right: 100%; bottom: 2px; height: 1px;
          background: var(--gold); transition: right .3s ease;
        }
        .nav-links a:hover { color: var(--ink); }
        .nav-links a:hover::after { right: 0; }
        .nav-actions { display: flex; align-items: center; gap: 16px; }
        .nav-cta {
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
          background: var(--ink); color: var(--cream); border-radius: 9px; padding: 11px 17px;
          font-size: 12.5px; font-weight: 700; transition: transform .25s, box-shadow .25s;
        }
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(16,34,13,.15); }
        .menu-button { display: none; border: 0; background: none; padding: 8px; }
        .menu-button i { display:block; width: 22px; height: 2px; background: var(--ink); margin: 5px 0; transition: .3s; }
        .menu-button.is-open i:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .menu-button.is-open i:nth-child(2) { opacity: 0; }
        .menu-button.is-open i:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          position: fixed; z-index: 999; top: 68px; left: 0; right: 0;
          padding: 8px 5% 28px; background: rgba(246,243,236,.97);
          backdrop-filter: blur(20px); border-bottom: 1px solid var(--line);
          transform: translateY(-120%); opacity: 0; transition: .45s cubic-bezier(.2,.8,.2,1);
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; }
        .mobile-menu a { display:flex; justify-content:space-between; align-items:center; padding: 17px 0; border-bottom:1px solid var(--line); text-decoration:none; font-weight:700; font-size:15px; }
        .mobile-menu .mobile-cta { margin-top: 16px; justify-content:center; background:var(--ink); color:var(--cream); border:0; border-radius:9px; }

        .hero {
          min-height: 880px; position: relative; overflow: hidden; background: var(--cream);
          display: flex; align-items: center; padding: 145px 5.5% 100px;
        }
        .hero-grid {
          position:absolute; inset:0; opacity:.34;
          background-image: linear-gradient(rgba(16,34,13,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16,34,13,.045) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, black 0%, transparent 78%);
        }
        .hero-glow { position:absolute; border-radius:50%; filter:blur(2px); pointer-events:none; }
        .hero-glow-one { width:500px; height:500px; right:2%; top:5%; background:radial-gradient(circle, rgba(185,149,53,.14), transparent 68%); animation: breathe 7s ease-in-out infinite; }
        .hero-glow-two { width:420px; height:420px; left:-15%; bottom:-20%; background:radial-gradient(circle, rgba(46,125,82,.08), transparent 68%); animation: breathe 9s ease-in-out infinite reverse; }
        .hero-inner { width:min(1220px,100%); margin:auto; display:grid; grid-template-columns: .92fr 1.08fr; gap:7%; align-items:center; position:relative; z-index:2; }
        .hero-copy { animation: heroIn .9s cubic-bezier(.2,.8,.2,1) both; }
        .hero-kicker { display:flex; align-items:center; gap:10px; font-size:10px; letter-spacing:.19em; font-weight:800; color:var(--gold); margin-bottom:23px; }
        .live-dot { width:7px; height:7px; border-radius:50%; background:var(--green); box-shadow:0 0 0 5px rgba(46,125,82,.1); animation: pulse 2s infinite; }
        .hero h1 { font-size:clamp(4rem,6.8vw,6.6rem); line-height:.94; letter-spacing:-.075em; margin:0 0 30px; font-weight:800; }
        .hero h1 span { color:transparent; -webkit-text-stroke:1.4px var(--ink); }
        .hero-copy > p { max-width:570px; font-size:17px; line-height:1.75; color:rgba(16,34,13,.59); margin:0 0 35px; }
        .hero-actions { display:flex; flex-wrap:wrap; gap:11px; align-items:center; }
        .magnetic-btn, .outline-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:9px; min-height:50px; padding:0 21px;
          border-radius:10px; text-decoration:none; font-size:13px; font-weight:700; transition:.3s cubic-bezier(.2,.8,.2,1);
        }
        .magnetic-btn { background:var(--ink); color:var(--cream); box-shadow:0 10px 28px rgba(16,34,13,.13); }
        .magnetic-btn:hover { transform:translateY(-3px); box-shadow:0 17px 34px rgba(16,34,13,.19); }
        .outline-btn { border:1px solid rgba(16,34,13,.16); color:var(--ink); }
        .outline-btn:hover { background:white; transform:translateY(-3px); box-shadow:0 10px 25px rgba(16,34,13,.07); }
        .trust-row { display:flex; flex-wrap:wrap; gap:18px; margin-top:25px; color:rgba(16,34,13,.42); font-size:10.5px; font-weight:600; }
        .trust-row span { display:flex; align-items:center; gap:6px; }
        .check { width:19px; height:19px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; background:rgba(185,149,53,.1); flex-shrink:0; }

        .hero-product { min-height:590px; position:relative; display:flex; align-items:center; justify-content:center; animation: productIn 1.05s .12s cubic-bezier(.2,.8,.2,1) both; }
        .product-orbit { position:absolute; border:1px solid rgba(185,149,53,.2); border-radius:50%; }
        .orbit-one { width:570px; height:570px; animation: spin 28s linear infinite; }
        .orbit-two { width:650px; height:330px; transform:rotate(-28deg); border-color:rgba(16,34,13,.08); animation: spinReverse 22s linear infinite; }
        .whatsapp-card {
          position:relative; width:min(405px,90%); min-height:505px; border-radius:27px; overflow:hidden;
          background:#f9f8f3; border:1px solid rgba(16,34,13,.12);
          box-shadow:0 45px 90px rgba(16,34,13,.19), 0 8px 20px rgba(16,34,13,.06);
          transform:rotate(2deg); transition:transform .5s ease;
        }
        .whatsapp-card:hover { transform:rotate(0) translateY(-8px); }
        .wa-top { height:75px; padding:0 20px; display:flex; align-items:center; gap:11px; background:var(--ink); color:var(--cream); }
        .wa-avatar { width:38px; height:38px; border-radius:50%; display:grid; place-items:center; background:var(--gold); color:var(--ink); font-weight:800; }
        .wa-top strong { display:block; font-size:13px; }
        .wa-top small { display:block; font-size:9px; opacity:.45; margin-top:3px; }
        .wa-menu { margin-left:auto; letter-spacing:2px; opacity:.5; }
        .wa-body { padding:22px 18px 16px; min-height:375px; background:linear-gradient(135deg,#f4f1e8,#fbfaf6); }
        .date-pill { width:max-content; margin:0 auto 18px; padding:5px 10px; border-radius:30px; background:rgba(16,34,13,.07); color:rgba(16,34,13,.4); font-size:8px; font-weight:800; letter-spacing:.13em; }
        .message-bubble, .draft-bubble { max-width:90%; border-radius:15px 15px 15px 5px; padding:15px; box-shadow:0 8px 22px rgba(16,34,13,.05); animation:bubbleIn .6s ease both; }
        .message-bubble { background:white; }
        .message-bubble small, .draft-label { display:block; font-size:8px; letter-spacing:.11em; font-weight:800; color:var(--gold); margin-bottom:8px; }
        .message-bubble strong { font-size:12px; display:block; margin-bottom:7px; }
        .message-bubble p, .draft-bubble p { font-size:10.5px; line-height:1.6; color:rgba(16,34,13,.59); margin:0; }
        .message-from { display:flex; justify-content:space-between; margin-top:12px; font-size:8px; color:rgba(16,34,13,.35); }
        .draft-bubble { margin:13px 0 0 auto; background:#e8f1e5; border-radius:15px 15px 5px 15px; animation-delay:.08s; }
        .draft-label { color:var(--green); display:flex; align-items:center; gap:5px; }
        .draft-label span { width:5px; height:5px; border-radius:50%; background:var(--green); animation:pulse 2s infinite; }
        .bubble-actions { display:grid; grid-template-columns:1.3fr 1fr 1fr; gap:6px; margin-top:14px; }
        .bubble-actions button { border:0; border-radius:7px; padding:8px 4px; font-size:8.5px; font-weight:800; background:var(--ink); color:var(--cream); }
        .bubble-actions button:nth-child(2), .bubble-actions button:nth-child(3) { background:rgba(16,34,13,.08); color:var(--ink); }
        .wa-bottom { height:54px; padding:0 17px; display:flex; align-items:center; gap:9px; font-size:8.5px; color:rgba(16,34,13,.36); border-top:1px solid rgba(16,34,13,.08); }
        .wa-bottom i { width:6px; height:6px; border-radius:50%; background:var(--gold); animation:pulse 2s infinite; }
        .float-card { position:absolute; display:flex; gap:9px; align-items:center; padding:11px 13px; border-radius:12px; background:rgba(255,255,255,.86); backdrop-filter:blur(15px); box-shadow:0 18px 45px rgba(16,34,13,.12); border:1px solid rgba(16,34,13,.08); animation:float 5s ease-in-out infinite; }
        .float-card b { display:block; font-size:9px; }
        .float-card small { display:block; font-size:7.5px; color:rgba(16,34,13,.4); margin-top:3px; }
        .float-card-one { left:0; top:17%; }
        .float-card-two { right:0; bottom:15%; animation-delay:-2s; }
        .float-icon, .pulse-check { width:25px; height:25px; display:grid; place-items:center; border-radius:8px; background:rgba(185,149,53,.12); color:var(--gold); font-size:11px; }
        .pulse-check { background:rgba(46,125,82,.1); color:var(--green); }
        .scroll-cue { position:absolute; bottom:30px; left:5.5%; display:flex; align-items:center; gap:12px; font-size:8px; font-weight:800; letter-spacing:.18em; color:rgba(16,34,13,.3); }
        .scroll-cue i { display:block; width:42px; height:1px; background:rgba(16,34,13,.18); position:relative; overflow:hidden; }
        .scroll-cue i::after { content:''; position:absolute; left:0; width:13px; height:100%; background:var(--gold); animation:scrollLine 2s infinite; }

        .ledger { background:var(--ink); color:var(--cream); position:relative; overflow:hidden; }
        .ledger::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 50% 0%, rgba(185,149,53,.12), transparent 48%); }
        .ledger-inner { width:min(1220px,89%); margin:auto; display:grid; grid-template-columns:repeat(3,1fr); }
        .ledger-item { position:relative; min-height:210px; padding:56px 45px; border-left:1px solid rgba(246,243,236,.1); }
        .ledger-item:first-child { border-left:0; }
        .ledger-index { position:absolute; top:30px; right:35px; font-size:8px; letter-spacing:.15em; color:rgba(246,243,236,.25); }
        .ledger-item strong { display:block; font-size:clamp(2.8rem,4vw,4rem); color:var(--gold); letter-spacing:-.06em; line-height:1; margin-bottom:12px; }
        .ledger-item p { max-width:260px; margin:0; font-size:12px; line-height:1.7; color:rgba(246,243,236,.48); }

        .section { padding:125px 5.5%; }
        .section-shell { width:min(1220px,100%); margin:auto; }
        .cream-section { background:var(--cream); }
        .eyebrow { display:flex; align-items:center; gap:10px; color:var(--gold); font-size:9.5px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; margin-bottom:23px; }
        .eyebrow > span { width:25px; height:1px; background:var(--gold); }
        .eyebrow-light { color:var(--gold); }
        .section-heading { margin-bottom:62px; }
        .section-heading h2, .feature-intro h2, .integration-inner h2, .cta-inner h2 {
          margin:0; font-size:clamp(2.7rem,4.5vw,4.6rem); line-height:1; letter-spacing:-.065em; font-weight:800;
        }
        em { font-style:normal; color:transparent; -webkit-text-stroke:1px currentColor; }
        .section-heading p { max-width:470px; margin:25px 0 0; color:rgba(16,34,13,.52); font-size:14px; line-height:1.75; }
        .split-heading { display:flex; justify-content:space-between; align-items:flex-end; gap:40px; }
        .split-heading p { margin:0; }

        .steps-grid { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
        .step-card { min-height:320px; padding:27px 27px 25px 0; margin-right:27px; position:relative; border-right:1px solid var(--line); }
        .step-card:last-child { border-right:0; }
        .step-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:55px; }
        .step-top > span { font-size:10px; color:var(--gold); font-weight:800; letter-spacing:.1em; }
        .step-top i { width:7px; height:7px; border-radius:50%; border:1px solid var(--gold); transition:.3s; }
        .step-card:hover .step-top i { background:var(--gold); box-shadow:0 0 0 5px rgba(185,149,53,.1); }
        .step-card h3 { font-size:16px; margin:0 0 12px; letter-spacing:-.025em; }
        .step-card p { max-width:220px; font-size:12px; line-height:1.75; color:rgba(16,34,13,.52); margin:0; }
        .step-line { position:absolute; bottom:25px; left:0; width:0; height:1px; background:var(--gold); transition:width .5s; }
        .step-card:hover .step-line { width:70%; }
        .step-arrow { position:absolute; bottom:16px; right:27px; opacity:.2; transition:.3s; }
        .step-card:hover .step-arrow { opacity:1; transform:translate(3px,-3px); }

        .flow-strip { margin-top:70px; display:grid; grid-template-columns:repeat(3,1fr); border:1px solid var(--line); border-radius:18px; overflow:hidden; box-shadow:0 22px 55px rgba(16,34,13,.05); }
        .flow-step { min-height:150px; padding:24px; display:flex; gap:18px; position:relative; background:rgba(255,255,255,.42); border-right:1px solid var(--line); }
        .flow-step:last-child { border-right:0; }
        .flow-number { color:var(--gold); font-size:10px; font-weight:800; }
        .flow-step small { display:block; font-size:10px; color:rgba(16,34,13,.38); text-transform:uppercase; letter-spacing:.1em; margin-bottom:5px; }
        .flow-step strong { display:block; font-size:13px; }
        .flow-step p { margin:8px 0 0; color:rgba(16,34,13,.55); font-size:11px; line-height:1.5; }
        .flow-arrow { position:absolute; right:-11px; top:50%; width:22px; height:22px; display:grid; place-items:center; border:1px solid var(--line); border-radius:50%; background:var(--cream); z-index:2; }

        .feature-section { background:#EEEAE1; }
        .feature-section .section-shell { display:grid; grid-template-columns:.8fr 1.2fr; gap:100px; }
        .feature-intro { position:relative; }
        .feature-intro p { max-width:320px; color:rgba(16,34,13,.53); font-size:13px; line-height:1.75; margin-top:25px; }
        .feature-stamp { display:inline-block; margin-top:85px; border:1px solid rgba(16,34,13,.13); padding:15px 17px; font-size:8px; letter-spacing:.15em; color:rgba(16,34,13,.32); line-height:1.6; transform:rotate(-3deg); }
        .feature-stamp b { color:var(--ink); }
        .feature-list { border-top:1px solid rgba(16,34,13,.13); }
        .feature-row { display:grid; grid-template-columns:45px 1fr 30px; gap:15px; align-items:start; padding:24px 0; border-bottom:1px solid rgba(16,34,13,.13); transition:.35s; }
        .feature-row:hover { padding-left:12px; background:rgba(255,255,255,.35); }
        .feature-number { font-size:9px; color:rgba(16,34,13,.3); padding-top:4px; }
        .feature-copy h3 { font-size:14px; margin:0 0 6px; }
        .feature-copy p { margin:0; font-size:11.5px; line-height:1.65; color:rgba(16,34,13,.48); }
        .feature-plus { font-size:18px; color:rgba(16,34,13,.22); font-weight:400; transition:.3s; }
        .feature-row:hover .feature-plus { color:var(--gold); transform:rotate(45deg); }

        .integrations { min-height:650px; padding:125px 5.5%; position:relative; overflow:hidden; background:var(--ink); color:var(--cream); }
        .integration-glow { position:absolute; width:700px; height:700px; border-radius:50%; top:-300px; right:-150px; background:radial-gradient(circle, rgba(185,149,53,.14), transparent 67%); animation:breathe 8s infinite; }
        .integration-inner { width:min(1220px,100%); margin:auto; position:relative; }
        .integration-inner h2 { max-width:650px; margin-bottom:70px; }
        .integration-inner h2 span { color:var(--gold); }
        .integration-list { border-top:1px solid rgba(246,243,236,.12); display:grid; grid-template-columns:repeat(5,1fr); }
        .integration-item { min-height:150px; padding:25px 18px; border-right:1px solid rgba(246,243,236,.12); position:relative; transition:.35s; }
        .integration-item:first-child { border-left:1px solid rgba(246,243,236,.12); }
        .integration-item:hover { background:rgba(246,243,236,.035); transform:translateY(-6px); }
        .integration-item span { display:block; font-size:8px; color:rgba(246,243,236,.25); margin-bottom:55px; }
        .integration-item strong { font-size:13px; }
        .integration-note { font-size:10px; color:rgba(246,243,236,.3); margin-top:25px; }

        .pricing-section { padding-bottom:145px; }
        .pricing-card { display:grid; grid-template-columns:1.1fr .9fr; background:white; border:1px solid var(--line); border-radius:22px; overflow:hidden; box-shadow:0 30px 75px rgba(16,34,13,.07); }
        .calculator { padding:45px; }
        .calculator-head { display:flex; align-items:flex-start; justify-content:space-between; gap:20px; }
        .calculator-head small, .price-summary > div > small { color:rgba(16,34,13,.35); font-size:8.5px; font-weight:800; letter-spacing:.15em; }
        .calculator-head h3 { margin:8px 0 0; font-size:21px; letter-spacing:-.035em; }
        .live-price { border:1px solid rgba(46,125,82,.2); color:var(--green); border-radius:30px; padding:6px 9px; font-size:7px; font-weight:800; letter-spacing:.12em; }
        .calculator-copy { max-width:420px; font-size:12px; line-height:1.7; color:rgba(16,34,13,.5); margin:17px 0 36px; }
        .seat-control { border-top:1px solid var(--line); padding-top:25px; }
        .seat-label { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:20px; }
        .seat-label span { font-size:12px; color:rgba(16,34,13,.5); }
        .seat-label strong { font-size:25px; letter-spacing:-.05em; }
        input[type=range] { appearance:none; width:100%; height:4px; border-radius:10px; outline:0; background:linear-gradient(to right,var(--gold) 0%,var(--gold) var(--range, 18%),rgba(16,34,13,.1) var(--range, 18%),rgba(16,34,13,.1) 100%); }
        input[type=range]::-webkit-slider-thumb { appearance:none; width:20px; height:20px; border-radius:50%; background:var(--gold); border:4px solid white; box-shadow:0 2px 8px rgba(16,34,13,.2); }
        input[type=range]::-moz-range-thumb { width:20px; height:20px; border-radius:50%; background:var(--gold); border:4px solid white; box-shadow:0 2px 8px rgba(16,34,13,.2); }
        .range-labels { display:flex; justify-content:space-between; margin-top:10px; font-size:8px; color:rgba(16,34,13,.3); }
        .breakdown { margin-top:28px; padding:15px 18px; background:var(--cream); border-radius:12px; }
        .breakdown-row { display:flex; justify-content:space-between; gap:15px; padding:6px 0; font-size:11px; }
        .breakdown-row span { color:rgba(16,34,13,.58); }
        .breakdown-row small { color:rgba(16,34,13,.3); margin-left:7px; }
        .breakdown-row strong { font-size:11px; }
        .rate-note { margin-top:9px; padding-top:10px; border-top:1px solid var(--line); font-size:9px; color:var(--gold); line-height:1.5; }
        .custom-box { margin-top:28px; display:flex; gap:13px; padding:18px; background:var(--cream); border-radius:12px; }
        .custom-box > span { color:var(--gold); font-weight:800; font-size:11px; }
        .custom-box strong { font-size:12px; }
        .custom-box p { font-size:10px; line-height:1.5; color:rgba(16,34,13,.5); margin:4px 0 0; }
        .price-summary { padding:45px 40px; background:var(--ink); color:var(--cream); display:flex; flex-direction:column; justify-content:space-between; min-height:480px; }
        .price-total { margin-top:10px; color:var(--gold); font-size:clamp(2.6rem,4vw,4rem); font-weight:800; letter-spacing:-.065em; }
        .price-summary > div > p { font-size:10px; color:rgba(246,243,236,.32); margin:4px 0 0; }
        .included-list { margin:35px 0; display:grid; gap:10px; }
        .included-list div { display:flex; align-items:center; gap:8px; font-size:10.5px; color:rgba(246,243,236,.62); }
        .price-summary .check { background:rgba(246,243,236,.08); }
        .price-cta { width:100%; min-height:50px; display:flex; align-items:center; justify-content:center; gap:8px; background:var(--gold); color:var(--ink); border-radius:9px; text-decoration:none; font-size:12px; font-weight:800; transition:.3s; }
        .price-cta:hover { transform:translateY(-3px); box-shadow:0 13px 28px rgba(0,0,0,.22); }
        .price-footnote { text-align:center; color:rgba(246,243,236,.22); font-size:8.5px; margin-top:11px; }

        .testimonials { background:var(--ink); color:var(--cream); padding:125px 5.5%; position:relative; overflow:hidden; }
        .testimonial-noise { position:absolute; inset:0; opacity:.18; background-image:radial-gradient(rgba(246,243,236,.5) .5px, transparent .5px); background-size:6px 6px; mask-image:linear-gradient(to bottom, transparent, black, transparent); }
        .testimonial-head { display:flex; justify-content:space-between; align-items:flex-end; }
        .testimonial-controls { display:flex; gap:7px; }
        .testimonial-controls button { width:32px; height:5px; border:0; border-radius:10px; background:rgba(246,243,236,.16); padding:0; transition:.3s; }
        .testimonial-controls button.active { background:var(--gold); width:50px; }
        .testimonial-stage { max-width:920px; margin:65px auto 0; text-align:center; }
        .quote-mark { color:var(--gold); font-family:Georgia,serif; font-size:75px; line-height:.5; display:block; }
        blockquote { font-size:clamp(1.8rem,3.5vw,3.4rem); line-height:1.2; letter-spacing:-.05em; margin:25px 0 45px; font-weight:600; animation:quoteIn .5s ease both; }
        .quote-author { display:flex; justify-content:center; align-items:center; gap:12px; }
        .quote-author > span { width:38px; height:38px; display:grid; place-items:center; background:var(--gold); color:var(--ink); border-radius:50%; font-weight:800; }
        .quote-author div { text-align:left; }
        .quote-author strong, .quote-author small { display:block; }
        .quote-author strong { font-size:11px; }
        .quote-author small { margin-top:3px; color:rgba(246,243,236,.35); font-size:9px; }
        .illustrative { text-align:center; color:rgba(246,243,236,.2); font-size:8.5px; margin-top:65px; }

        .final-cta { min-height:650px; display:grid; place-items:center; text-align:center; padding:110px 5.5%; position:relative; overflow:hidden; background:var(--cream); }
        .cta-inner { position:relative; z-index:2; }
        .cta-inner .eyebrow { justify-content:center; }
        .cta-inner h2 { font-size:clamp(3rem,6vw,5.8rem); margin-bottom:25px; }
        .cta-inner p { color:rgba(16,34,13,.5); font-size:14px; margin-bottom:32px; }
        .centered { justify-content:center; }
        .cta-ring { position:absolute; border:1px solid rgba(16,34,13,.08); border-radius:50%; pointer-events:none; }
        .ring-a { width:650px; height:650px; animation:spin 35s linear infinite; }
        .ring-b { width:430px; height:430px; border-color:rgba(185,149,53,.18); animation:spinReverse 27s linear infinite; }

        footer { background:var(--ink); color:var(--cream); padding:70px 5.5% 35px; }
        .footer-shell { width:min(1220px,100%); margin:auto; }
        .footer-main { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:60px; padding-bottom:65px; }
        .footer-brand p { color:rgba(246,243,236,.35); font-size:11px; line-height:1.7; margin-top:15px; }
        .footer-column small { display:block; text-transform:uppercase; letter-spacing:.15em; font-size:8px; color:rgba(246,243,236,.22); font-weight:800; margin-bottom:17px; }
        .footer-column a { display:block; width:max-content; color:rgba(246,243,236,.5); text-decoration:none; font-size:11px; margin-bottom:11px; transition:.2s; }
        .footer-column a:hover { color:var(--cream); transform:translateX(3px); }
        .footer-bottom { border-top:1px solid rgba(246,243,236,.1); padding-top:22px; display:flex; justify-content:space-between; gap:20px; color:rgba(246,243,236,.22); font-size:9px; }

        .reveal { opacity:0; transform:translateY(30px); transition:opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1); }
        .reveal.visible { opacity:1; transform:none; }
        .reveal.visible .step-card:nth-child(1), .reveal.visible .feature-row:nth-child(1) { transition-delay:.04s; }
        .reveal.visible .step-card:nth-child(2), .reveal.visible .feature-row:nth-child(2) { transition-delay:.10s; }
        .reveal.visible .step-card:nth-child(3), .reveal.visible .feature-row:nth-child(3) { transition-delay:.16s; }
        .reveal.visible .step-card:nth-child(4), .reveal.visible .feature-row:nth-child(4) { transition-delay:.22s; }

        @keyframes heroIn { from { opacity:0; transform:translateY(35px); } to { opacity:1; transform:none; } }
        @keyframes productIn { from { opacity:0; transform:translateX(40px) scale(.96); } to { opacity:1; transform:none; } }
        @keyframes breathe { 0%,100% { transform:scale(1); opacity:.8; } 50% { transform:scale(1.08); opacity:1; } }
        @keyframes pulse { 0%,100% { box-shadow:0 0 0 0 rgba(46,125,82,.15); } 50% { box-shadow:0 0 0 6px rgba(46,125,82,0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes spinReverse { to { transform:rotate(-360deg); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes bubbleIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        @keyframes scrollLine { 0% { transform:translateX(-15px); } 50%,100% { transform:translateX(45px); } }
        @keyframes quoteIn { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:none; } }

        @media (max-width: 1050px) {
          .hero-inner { grid-template-columns:1fr; max-width:760px; }
          .hero { padding-top:125px; }
          .hero-product { margin-top:20px; min-height:550px; }
          .hero-copy { text-align:center; }
          .hero-copy > p { margin-left:auto; margin-right:auto; }
          .hero-kicker, .hero-actions, .trust-row { justify-content:center; }
          .feature-section .section-shell { grid-template-columns:1fr; gap:55px; }
          .feature-stamp { margin-top:35px; }
          .steps-grid { grid-template-columns:1fr 1fr; }
          .step-card:nth-child(2) { border-right:0; }
          .step-card:nth-child(3), .step-card:nth-child(4) { border-top:1px solid var(--line); }
          .integration-list { grid-template-columns:repeat(3,1fr); }
          .integration-item:nth-child(4), .integration-item:nth-child(5) { border-top:1px solid rgba(246,243,236,.12); }
        }

        @media (max-width: 700px) {
          .nav { height:68px; padding:0 5%; }
          .nav-scrolled { height:62px; }
          .nav-links, .nav-cta { display:none; }
          .menu-button { display:block; }
          .mobile-menu { top:62px; }
          .hero { min-height:auto; padding:120px 5% 75px; }
          .hero h1 { font-size:clamp(3.25rem,14vw,5rem); }
          .hero-copy > p { font-size:14px; }
          .hero-product { min-height:490px; margin-top:15px; }
          .orbit-one { width:410px; height:410px; }
          .orbit-two { width:450px; height:260px; }
          .whatsapp-card { width:330px; min-height:440px; }
          .wa-body { min-height:310px; }
          .float-card { transform:scale(.8); }
          .float-card-one { left:-14px; }
          .float-card-two { right:-14px; }
          .scroll-cue { display:none; }
          .ledger-inner { width:90%; grid-template-columns:1fr; }
          .ledger-item { min-height:auto; padding:38px 0; border-left:0; border-bottom:1px solid rgba(246,243,236,.1); }
          .ledger-item:last-child { border-bottom:0; }
          .ledger-index { top:30px; right:0; }
          .section, .integrations, .testimonials { padding:82px 5%; }
          .split-heading { display:block; }
          .split-heading p { margin-top:20px; }
          .steps-grid { grid-template-columns:1fr; }
          .step-card, .step-card:nth-child(2) { border-right:0; border-bottom:1px solid var(--line); min-height:250px; }
          .step-card:last-child { border-bottom:0; }
          .flow-strip { grid-template-columns:1fr; }
          .flow-step { border-right:0; border-bottom:1px solid var(--line); min-height:130px; }
          .flow-step:last-child { border-bottom:0; }
          .flow-arrow { right:20px; top:auto; bottom:-11px; transform:rotate(90deg); }
          .feature-section .section-shell { gap:40px; }
          .feature-row { grid-template-columns:32px 1fr 20px; }
          .integration-list { grid-template-columns:1fr 1fr; }
          .integration-item:nth-child(3) { border-top:1px solid rgba(246,243,236,.12); }
          .integration-item:nth-child(4), .integration-item:nth-child(5) { border-top:1px solid rgba(246,243,236,.12); }
          .pricing-card { grid-template-columns:1fr; }
          .calculator, .price-summary { padding:32px 24px; }
          .price-summary { min-height:auto; }
          .testimonial-head { align-items:center; }
          .testimonial-stage { margin-top:48px; }
          .footer-main { grid-template-columns:1fr 1fr; gap:38px 25px; }
          .footer-brand { grid-column:1 / -1; }
          .footer-bottom { flex-direction:column; }
          .final-cta { min-height:580px; padding:80px 5%; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; scroll-behavior:auto !important; }
        }
      `}</style>

      <Navbar />
      <main>
        <Hero />
        <Ledger />
        <HowItWorks />
        <Features />
        <Integrations />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
