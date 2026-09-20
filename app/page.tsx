'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Inbox,
  Layers3,
  Menu,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument',
  weight: '400',
})

const formatNaira = (n: number) => `₦${n.toLocaleString('en-NG')}`

function Arrow({ className = '' }: { className?: string }) {
  return <ArrowRight className={`h-4 w-4 ${className}`} />
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`font-[var(--font-jakarta)] text-[23px] font-semibold tracking-[-0.075em] ${
        light ? 'text-white' : 'text-[#111111]'
      }`}
    >
      haelo<span className="text-[#6D28D9]">.</span>
    </Link>
  )
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-[12px] leading-5 text-[#55555E]">
      <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F0E8FF]">
        <Check className="h-2.5 w-2.5 text-[#6D28D9]" strokeWidth={2.5} />
      </span>
      <span>{children}</span>
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['How it works', '#how-it-works'],
    ['Features', '#features'],
    ['Pricing', '#pricing'],
  ]

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-black/[0.055] bg-white/80 shadow-[0_12px_40px_rgba(17,17,17,0.045)] backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <Logo />

        <div className="hidden items-center gap-10 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative py-2 text-[12px] font-medium tracking-[-0.01em] text-black/45 transition hover:text-black"
            >
              {label}
              <span className="absolute inset-x-0 bottom-0 mx-auto h-px w-0 bg-[#6D28D9] transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/signup"
            className="hidden items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-[11px] font-semibold text-white shadow-[0_8px_22px_rgba(17,17,17,0.11)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6D28D9] hover:shadow-[0_12px_28px_rgba(109,40,217,0.18)] md:flex"
          >
            Start free
            <Arrow />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/[0.055] bg-white px-6 py-5 md:hidden">
          <div className="mx-auto flex max-w-[1320px] flex-col">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-black/[0.06] py-4 text-sm font-medium"
              >
                {label}
              </a>
            ))}

            <Link
              href="/auth/signup"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white"
            >
              Start 7-day free trial
              <Arrow />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function HeroTextSequence() {
  const messages = [
    {
      from: 'Operations',
      text: 'Can we approve the order before Friday?',
      response: 'Approved. Please proceed with the order.',
    },
    {
      from: 'Finance',
      text: 'Can you confirm the revised payment schedule?',
      response: 'Yes. The revised schedule works. Please proceed.',
    },
    {
      from: 'Projects',
      text: 'The client has approved the next phase.',
      response: 'Great. Proceed with the next phase.',
    },
  ]

  const [index, setIndex] = useState(0)
  const [showResponse, setShowResponse] = useState(false)

  useEffect(() => {
    let responseTimer: number
    const cycle = window.setInterval(() => {
      setShowResponse(false)
      responseTimer = window.setTimeout(() => {
        setIndex((value) => (value + 1) % messages.length)
        setShowResponse(true)
      }, 500)
    }, 4300)

    responseTimer = window.setTimeout(() => setShowResponse(true), 900)

    return () => {
      window.clearInterval(cycle)
      window.clearTimeout(responseTimer)
    }
  }, [messages.length])

  const current = messages[index]

  return (
    <div className="relative mx-auto mt-14 w-full max-w-[720px] sm:mt-16">
      {/* Barely-visible atmospheric geometry */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6D28D9]/[0.045]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[760px] -translate-x-1/2 -translate-y-1/2 rotate-[-13deg] rounded-[50%] border border-black/[0.035]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[660px] -translate-x-1/2 -translate-y-1/2 rotate-[19deg] rounded-[50%] border border-[#6D28D9]/[0.035]" />

      <div className="relative mx-auto max-w-[590px]">
        {/* First thought / incoming message */}
        <div
          key={`incoming-${index}`}
          className="relative z-10 mx-auto max-w-[520px] animate-[heroMessage_700ms_cubic-bezier(.2,.8,.2,1)_both]"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
              New internal message
            </span>
          </div>

          <div className="rounded-[24px] border border-black/[0.075] bg-white px-6 py-5 text-left shadow-[0_20px_55px_rgba(17,17,17,0.075)] sm:px-8 sm:py-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-semibold text-[#111111]">
                {current.from}
              </span>
              <span className="text-[9px] text-black/25">just now</span>
            </div>

            <p className="mt-4 text-lg font-medium leading-[1.35] tracking-[-0.025em] text-[#202026] sm:text-[21px]">
              “{current.text}”
            </p>
          </div>
        </div>

        {/* Response */}
        {showResponse && (
          <div
            key={`response-${index}`}
            className="relative z-20 mx-auto -mt-1 max-w-[490px] animate-[heroResponse_850ms_cubic-bezier(.16,1,.3,1)_both] sm:-mt-2"
          >
            <div className="mx-auto mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3 text-[#6D28D9]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6D28D9]">
                Haelo understood
              </span>
            </div>

            <div className="rounded-[24px] border border-[#6D28D9]/15 bg-[#111111] px-6 py-5 text-left shadow-[0_25px_70px_rgba(17,17,17,0.18)] sm:px-8 sm:py-6">
              <p className="text-lg font-medium leading-[1.35] tracking-[-0.025em] text-white sm:text-[21px]">
                “{current.response}”
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-[9px] text-white/35">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#A78BFA]" />
                  Grounded in your company context
                </div>

                <span className="rounded-full bg-[#6D28D9]/20 px-2.5 py-1 text-[8px] font-semibold text-[#C4B5FD]">
                  Ready
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Minimal floating signals */}
        <div className="pointer-events-none absolute -left-8 top-[25%] hidden animate-[float_5s_ease-in-out_infinite] rounded-2xl border border-black/[0.06] bg-white/90 px-3.5 py-3 shadow-[0_15px_45px_rgba(17,17,17,0.07)] backdrop-blur-md lg:block">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#F4EEFF] text-[#6D28D9]">
              <Layers3 className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-semibold">Context applied</div>
              <div className="mt-0.5 text-[8px] text-black/30">Business Bible</div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-8 bottom-[12%] hidden animate-[float_6s_ease-in-out_infinite_reverse] rounded-2xl border border-black/[0.06] bg-white/90 px-3.5 py-3 shadow-[0_15px_45px_rgba(17,17,17,0.07)] backdrop-blur-md lg:block">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#111111] text-white">
              <Zap className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-semibold">Decision ready</div>
              <div className="mt-0.5 text-[8px] text-black/30">You stay in control</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FCFCFB] px-5 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      {/* ============================================================
          ATMOSPHERE
      ============================================================ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main violet light */}
        <div
          className="absolute left-1/2 top-[-280px] h-[760px] w-[760px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(109,40,217,0.105) 0%, rgba(139,92,246,0.055) 28%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Green WhatsApp atmosphere */}
        <div
          className="absolute right-[-300px] top-[38%] h-[700px] w-[700px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(37,211,102,0.055) 0%, rgba(37,211,102,0.015) 35%, transparent 70%)",
          }}
        />

        {/* Bottom violet atmosphere */}
        <div
          className="absolute bottom-[-300px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(109,40,217,0.055), transparent 68%)",
          }}
        />

        {/* Editorial grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17,17,17,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.035) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 45%, transparent 82%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 45%, transparent 82%)",
          }}
        />

        {/* Fine horizontal light */}
        <div className="absolute left-0 right-0 top-[92px] h-px bg-gradient-to-r from-transparent via-black/[0.055] to-transparent" />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[1000px] text-center">
          {/* Small brand signal */}
          <div className="hero-reveal inline-flex items-center gap-2.5 rounded-full border border-black/[0.07] bg-white/70 px-3.5 py-2 shadow-[0_8px_35px_rgba(17,17,17,0.035)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#6D28D9] opacity-30" />
              <span className="relative h-2 w-2 rounded-full bg-[#6D28D9]" />
            </span>

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
              Intelligence for the work behind your inbox
            </span>
          </div>

          {/* ========================================================
              HEADLINE
          ======================================================== */}
          <h1 className="hero-reveal hero-reveal-1 mt-7 font-[var(--font-jakarta)] text-[clamp(3.4rem,8.5vw,8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-[#0D0D0E]">
            Your inbox is full.
            <br />

            <span className="font-[var(--font-instrument)] font-normal italic tracking-[-0.055em] text-[#6D28D9]">
              Your mind doesn't have to be.
            </span>
          </h1>

          <p className="hero-reveal hero-reveal-2 mx-auto mt-8 max-w-[610px] text-[14px] leading-7 tracking-[-0.01em] text-[#707078] sm:text-[16px] sm:leading-8">
            Haelo understands the emails that matter, remembers your business
            context, and turns conversations into decisions you can approve.
          </p>

          {/* ========================================================
              CTA
          ======================================================== */}
          <div className="hero-reveal hero-reveal-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/signup"
              className="group relative flex h-[52px] items-center gap-2 overflow-hidden rounded-full bg-[#111111] px-7 text-[11px] font-semibold text-white shadow-[0_18px_45px_rgba(17,17,17,0.14)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#6D28D9] hover:shadow-[0_22px_55px_rgba(109,40,217,0.2)]"
            >
              <span className="relative z-10">Start 7-day free trial</span>

              <Arrow className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            <a
              href="#how-it-works"
              className="flex h-[52px] items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-7 text-[11px] font-semibold text-[#222] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.15] hover:bg-white"
            >
              See how Haelo works
              <ChevronDown className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="hero-reveal hero-reveal-4 mt-5 flex items-center justify-center gap-5 text-[9px] font-medium text-black/30">
            <span>7 days free</span>
            <span className="h-1 w-1 rounded-full bg-black/15" />
            <span>No credit card</span>
            <span className="h-1 w-1 rounded-full bg-black/15" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* ============================================================
            THE HERO ARTWORK
        ============================================================ */}
        <div className="relative mx-auto mt-20 h-[560px] max-w-[1180px] sm:mt-24 lg:h-[610px]">
          <HeroConversationArtwork />
        </div>
      </div>

      {/* ============================================================
          ANIMATION
      ============================================================ */}
      <style jsx global>{`
        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes artworkReveal {
          from {
            opacity: 0;
            transform: perspective(1600px) rotateX(7deg) translateY(35px)
              scale(0.96);
          }

          to {
            opacity: 1;
            transform: perspective(1600px) rotateX(0deg) translateY(0)
              scale(1);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(175px) rotate(0deg);
          }

          to {
            transform: rotate(360deg) translateX(175px) rotate(-360deg);
          }
        }

        @keyframes signal {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }

          35% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }

          40% {
            opacity: 0.5;
          }

          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        .hero-reveal {
          animation: heroReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-reveal-1 {
          animation-delay: 0.08s;
        }

        .hero-reveal-2 {
          animation-delay: 0.16s;
        }

        .hero-reveal-3 {
          animation-delay: 0.24s;
        }

        .hero-reveal-4 {
          animation-delay: 0.32s;
        }

        .artwork-reveal {
          animation: artworkReveal 1.2s 0.35s
            cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .orbit-dot {
          animation: orbit 12s linear infinite;
        }

        .signal-pulse {
          animation: signal 3.2s ease-out infinite;
        }

        .signal-pulse-2 {
          animation: signal 3.2s 1.1s ease-out infinite;
        }

        .signal-pulse-3 {
          animation: signal 3.2s 2.2s ease-out infinite;
        }

        .ring-pulse {
          animation: pulseRing 3s ease-out infinite;
        }

        .message-in {
          animation: messageIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .message-delay-1 {
          animation-delay: 0.8s;
        }

        .message-delay-2 {
          animation-delay: 1.5s;
        }

        .message-delay-3 {
          animation-delay: 2.2s;
        }

        .message-delay-4 {
          animation-delay: 3s;
        }

        .shimmer-line {
          animation: shimmer 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-reveal,
          .artwork-reveal,
          .orbit-dot,
          .signal-pulse,
          .signal-pulse-2,
          .signal-pulse-3,
          .ring-pulse,
          .message-in,
          .shimmer-line {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}


/* ================================================================
   HERO ARTWORK
   ================================================================ */

function HeroConversationArtwork() {
  const [conversationStage, setConversationStage] = useState(0)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setConversationStage(1), 900),
      window.setTimeout(() => setConversationStage(2), 1800),
      window.setTimeout(() => setConversationStage(3), 2900),
      window.setTimeout(() => setConversationStage(4), 4100),
    ]

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  return (
    <div className="artwork-reveal relative h-full w-full">
      {/* ==========================================================
          ORBITAL SYSTEM
      ========================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 sm:h-[620px] sm:w-[620px]">
        {/* Outer halo */}
        <div className="absolute inset-0 rounded-full border border-[#6D28D9]/[0.055]" />

        <div className="absolute inset-[8%] rounded-full border border-[#6D28D9]/[0.045]" />

        <div className="absolute inset-[18%] rounded-full border border-[#6D28D9]/[0.04]" />

        {/* Orbit */}
        <div className="absolute left-1/2 top-1/2 h-0 w-0">
          <div className="orbit-dot absolute left-0 top-0 h-2 w-2">
            <div className="h-2 w-2 rounded-full bg-[#6D28D9] shadow-[0_0_18px_rgba(109,40,217,0.55)]" />
          </div>
        </div>

        {/* Pulsing signal nodes */}
        <div className="signal-pulse absolute left-[17%] top-[30%] h-2 w-2 rounded-full bg-[#6D28D9]/50" />
        <div className="signal-pulse-2 absolute right-[15%] top-[55%] h-2 w-2 rounded-full bg-[#25D366]/60" />
        <div className="signal-pulse-3 absolute bottom-[19%] left-[38%] h-2 w-2 rounded-full bg-[#6D28D9]/40" />
      </div>

      {/* ==========================================================
          INCOMING EMAIL — LEFT
      ========================================================== */}

      <div className="absolute left-0 top-[12%] hidden w-[250px] lg:block">
        <div className="relative rotate-[-5deg] rounded-[22px] border border-black/[0.07] bg-white/80 p-4 shadow-[0_25px_70px_rgba(17,17,17,0.07)] backdrop-blur-xl">
          {/* accent line */}
          <div className="absolute left-0 top-6 h-9 w-[2px] rounded-r-full bg-[#6D28D9]" />

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1ECFF] text-[10px] font-bold text-[#6D28D9]">
              AC
            </div>

            <div className="min-w-0 text-left">
              <div className="text-[10px] font-semibold text-[#171719]">
                Amara Consulting
              </div>

              <div className="mt-0.5 text-[8px] text-black/35">
                Following up on invoice
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="h-1.5 w-[92%] rounded-full bg-black/[0.06]" />
            <div className="h-1.5 w-[78%] rounded-full bg-black/[0.05]" />
            <div className="h-1.5 w-[61%] rounded-full bg-black/[0.04]" />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[8px] font-medium text-black/30">
              Email received
            </span>

            <span className="text-[8px] text-black/25">9:42 AM</span>
          </div>

          {/* connection line */}
          <div className="absolute -right-[120px] top-1/2 h-px w-[120px] rotate-[8deg] bg-gradient-to-r from-black/[0.05] to-[#6D28D9]/20" />

          <div className="absolute -right-[126px] top-[52%] h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
        </div>
      </div>

      {/* ==========================================================
          HAELO CORE
      ========================================================== */}

      <div className="absolute left-1/2 top-[8%] z-20 -translate-x-1/2">
        <div className="relative flex flex-col items-center">
          {/* expanding ring */}
          <div className="ring-pulse absolute h-[80px] w-[80px] rounded-full border border-[#6D28D9]/20" />

          {/* core */}
          <div className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full border border-white bg-[#111111] shadow-[0_15px_45px_rgba(17,17,17,0.2),0_0_45px_rgba(109,40,217,0.12)]">
            <div className="absolute inset-[5px] rounded-full border border-white/[0.08]" />

            <span className="font-[var(--font-jakarta)] text-[14px] font-bold tracking-[-0.04em] text-white">
              H
            </span>

            <span className="absolute bottom-[10px] right-[11px] h-1.5 w-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_10px_rgba(167,139,250,0.9)]" />
          </div>

          <div className="mt-3 rounded-full border border-black/[0.06] bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-xl">
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-black/40">
              Haelo understands
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================================
          MAIN WHATSAPP CONVERSATION
      ========================================================== */}

      <div className="absolute left-1/2 top-[18%] z-10 w-[92%] max-w-[590px] -translate-x-1/2 sm:w-[560px]">
        {/* Shadow plane */}
        <div className="absolute -inset-5 rounded-[40px] bg-[#6D28D9]/[0.025] blur-2xl" />

        {/* Main shell */}
        <div
          className="relative overflow-hidden rounded-[30px] border border-black/[0.09] bg-white shadow-[0_45px_110px_rgba(17,17,17,0.12),0_12px_35px_rgba(17,17,17,0.06)]"
          style={{
            transform:
              "perspective(1600px) rotateX(1deg) rotateY(-1.5deg)",
          }}
        >
          {/* top browser-like hairline */}
          <div className="flex h-[36px] items-center justify-between border-b border-black/[0.05] bg-white px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-black/[0.08]" />
              <span className="h-2 w-2 rounded-full bg-black/[0.08]" />
              <span className="h-2 w-2 rounded-full bg-black/[0.08]" />
            </div>

            <div className="rounded-full bg-black/[0.025] px-3 py-1">
              <span className="text-[7px] font-medium tracking-[0.12em] text-black/25">
                HAELO / CONVERSATION
              </span>
            </div>

            <div className="w-10" />
          </div>

          {/* WhatsApp header */}
          <div className="relative flex h-[70px] items-center gap-3 bg-[#075E54] px-5">
            {/* subtle green light */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#075E54] via-[#087F70] to-[#075E54] opacity-60" />

            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#6D28D9] text-[10px] font-bold text-white shadow-lg">
              H
            </div>

            <div className="relative flex-1 text-left">
              <div className="text-[12px] font-semibold text-white">
                Haelo
              </div>

              <div className="mt-0.5 flex items-center gap-1.5 text-[8px] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                online
              </div>
            </div>

            <div className="relative flex items-center gap-4 text-white/60">
              <div className="h-3.5 w-3.5 rounded-full border border-current" />
              <div className="flex flex-col gap-[3px]">
                <span className="h-1 w-1 rounded-full bg-current" />
                <span className="h-1 w-1 rounded-full bg-current" />
                <span className="h-1 w-1 rounded-full bg-current" />
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="relative min-h-[365px] overflow-hidden bg-[#efeae2] px-4 py-5 sm:px-7">
            {/* wallpaper */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.2]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 15px 15px, rgba(80,70,60,.12) 1px, transparent 1px),
                  radial-gradient(circle at 60px 60px, rgba(80,70,60,.08) 1px, transparent 1px)
                `,
                backgroundSize: "75px 75px",
              }}
            />

            {/* light gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.1] via-transparent to-black/[0.015]" />

            <div className="relative z-10 flex flex-col gap-3">
              <div className="mx-auto rounded-lg bg-white/80 px-3 py-1 text-[7px] font-semibold uppercase tracking-[0.15em] text-[#667781] shadow-sm">
                Today
              </div>

              {/* Incoming message */}
              {conversationStage >= 1 && (
                <div className="message-in flex justify-start">
                  <div className="max-w-[78%] rounded-[4px_15px_15px_15px] bg-white px-4 py-3 text-left shadow-[0_1px_1px_rgba(0,0,0,.08)]">
                    <div className="mb-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6D28D9]">
                      New email
                    </div>

                    <div className="text-[11px] font-semibold leading-5 text-[#111B21]">
                      Amara Consulting just emailed you
                    </div>

                    <div className="mt-1.5 text-[10px] leading-[1.6] text-[#4D5559]">
                      They&apos;re following up on the invoice we discussed and
                      asking for confirmation before month-end.
                    </div>

                    <div className="mt-1.5 text-right text-[7px] text-[#8696A0]">
                      9:42 AM
                    </div>
                  </div>
                </div>
              )}

              {/* Haelo understanding */}
              {conversationStage >= 2 && (
                <div className="message-in message-delay-1 flex justify-start">
                  <div className="max-w-[82%] rounded-[4px_15px_15px_15px] border border-[#6D28D9]/10 bg-[#F7F3FF] px-4 py-3 text-left shadow-[0_4px_15px_rgba(109,40,217,.06)]">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6D28D9] text-[7px] font-bold text-white">
                        H
                      </div>

                      <span className="text-[7px] font-bold uppercase tracking-[0.13em] text-[#6D28D9]">
                        Context understood
                      </span>
                    </div>

                    <div className="text-[10px] leading-[1.65] text-[#34343A]">
                      This is a straightforward confirmation. I&apos;ve
                      prepared a response in your usual professional tone.
                    </div>
                  </div>
                </div>
              )}

              {/* Prepared response */}
              {conversationStage >= 3 && (
                <div className="message-in message-delay-2 flex justify-start">
                  <div className="max-w-[84%] rounded-[4px_15px_15px_15px] bg-white px-4 py-3 text-left shadow-[0_2px_8px_rgba(0,0,0,.07)]">
                    <div className="mb-1.5 flex items-center justify-between gap-5">
                      <span className="text-[7px] font-bold uppercase tracking-[0.13em] text-[#6D28D9]">
                        Prepared reply
                      </span>

                      <span className="text-[7px] text-[#8696A0]">
                        9:42 AM
                      </span>
                    </div>

                    <div className="text-[10px] leading-[1.7] text-[#303438]">
                      Hi team, confirming the invoice looks good on our end —
                      happy to proceed. Let me know if you need anything else
                      before month-end.
                    </div>
                  </div>
                </div>
              )}

              {/* Decision */}
              {conversationStage >= 4 && (
                <div className="message-in message-delay-3 flex justify-start">
                  <div className="w-full max-w-[430px] rounded-[17px] border border-black/[0.055] bg-white p-3 shadow-[0_5px_20px_rgba(0,0,0,.07)]">
                    <div className="mb-2 px-1 text-[8px] font-medium text-[#667781]">
                      Ready when you are.
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        className="rounded-xl bg-[#6D28D9] py-2.5 text-[8px] font-semibold text-white transition hover:bg-[#5B21B6]"
                      >
                        Send it
                      </button>

                      <button
                        type="button"
                        className="rounded-xl border border-black/[0.06] bg-[#F7F7F7] py-2.5 text-[8px] font-semibold text-[#303438]"
                      >
                        Let me edit
                      </button>

                      <button
                        type="button"
                        className="rounded-xl border border-black/[0.06] bg-[#F7F7F7] py-2.5 text-[8px] font-semibold text-[#303438]"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-black/[0.05] bg-[#F0F2F5] px-3 py-3">
            <div className="h-8 w-8 rounded-full bg-white" />

            <div className="flex h-8 flex-1 items-center rounded-full bg-white px-4 text-[8px] text-[#8696A0]">
              Message Haelo
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075E54] text-white">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================
            MOVING LIGHT ACROSS THE PRODUCT
        ======================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
          <div className="shimmer-line absolute left-0 top-0 h-full w-[20%] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent blur-xl" />
        </div>
      </div>

      {/* ==========================================================
          RIGHT-SIDE DECISION LABEL
      ========================================================== */}

      <div className="absolute right-0 top-[39%] hidden w-[210px] lg:block">
        <div className="relative rounded-[20px] border border-black/[0.06] bg-white/80 p-4 shadow-[0_20px_55px_rgba(17,17,17,.07)] backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-black/30">
              Next action
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
          </div>

          <div className="text-[11px] font-semibold tracking-[-0.02em] text-[#18181A]">
            Approve invoice
          </div>

          <div className="mt-1 text-[8px] leading-5 text-black/35">
            Prepared from the conversation and your existing context.
          </div>

          <div className="mt-3 h-px bg-black/[0.05]" />

          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F1ECFF] text-[7px] font-bold text-[#6D28D9]">
              H
            </span>

            <span className="text-[8px] font-medium text-black/45">
              Haelo prepared this
            </span>
          </div>

          {/* connector */}
          <div className="absolute -left-[100px] top-1/2 h-px w-[100px] bg-gradient-to-r from-transparent to-[#6D28D9]/20" />

          <div className="absolute -left-[105px] top-[49%] h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
        </div>
      </div>

      {/* ==========================================================
          BOTTOM MICRO STAT
      ========================================================== */}

      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-black/[0.08]" />

          <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-black/25">
            Read · Understand · Prepare · Decide
          </span>

          <span className="h-px w-8 bg-black/[0.08]" />
        </div>
      </div>
    </div>
  )
}
function Metrics() {
  const metrics = [
    {
      value: "<60s",
      label: "Email to prepared response",
      detail: "Haelo reads the context and prepares the next move.",
    },
    {
      value: "1 tap",
      label: "Approve, edit or skip",
      detail: "You stay in control without writing the response yourself.",
    },
    {
      value: "24/7",
      label: "Your inbox stays watched",
      detail: "Important conversations don't have to wait for you.",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#0B0B0D] text-white">
      {/* ============================================================
          ATMOSPHERE
      ============================================================ */}
      <div className="pointer-events-none absolute inset-0">
        {/* Central violet glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[520px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(109,40,217,0.12) 0%, rgba(109,40,217,0.035) 38%, transparent 70%)",
          }}
        />

        {/* Left atmospheric light */}
        <div
          className="absolute -left-[250px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.055), transparent 70%)",
          }}
        />

        {/* Right atmospheric light */}
        <div
          className="absolute -right-[250px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(37,211,102,0.025), transparent 70%)",
          }}
        />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          }}
        />
      </div>

      {/* ============================================================
          TOP HAIRLINE
      ============================================================ */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      {/* ============================================================
          CONTENT
      ============================================================ */}
      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <div
              key={metric.value}
              className={`
                group relative overflow-hidden
                px-7 py-12
                sm:px-10 sm:py-14
                lg:px-12 lg:py-16
                ${index < 2 ? "border-b border-white/[0.07] lg:border-b-0 lg:border-r" : ""}
              `}
            >
              {/* ====================================================
                  HOVER LIGHT
              ==================================================== */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div
                  className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(109,40,217,0.10), transparent 70%)",
                  }}
                />
              </div>

              {/* ====================================================
                  INDEX
              ==================================================== */}
              <div className="relative mb-10 flex items-center justify-between">
                <span className="font-[var(--font-jakarta)] text-[8px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  0{index + 1}
                </span>

                <span className="h-px w-10 bg-white/[0.08] transition-all duration-500 group-hover:w-16 group-hover:bg-[#8B5CF6]/40" />
              </div>

              {/* ====================================================
                  VALUE
              ==================================================== */}
              <div className="relative">
                <div className="font-[var(--font-instrument)] text-[clamp(4rem,7vw,6.5rem)] font-normal italic leading-[0.8] tracking-[-0.055em] text-[#D8CCFF] transition-transform duration-500 group-hover:-translate-y-1">
                  {metric.value}
                </div>

                {/* Fine accent */}
                <div className="mt-7 h-px w-8 bg-[#6D28D9]/70 transition-all duration-500 group-hover:w-14" />
              </div>

              {/* ====================================================
                  LABEL
              ==================================================== */}
              <div className="relative mt-5">
                <h3 className="font-[var(--font-jakarta)] text-[12px] font-semibold tracking-[-0.015em] text-white/90">
                  {metric.label}
                </h3>

                <p className="mt-2 max-w-[260px] text-[10px] leading-[1.7] text-white/38">
                  {metric.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          BOTTOM HAIRLINE
      ============================================================ */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </section>
  )
}
function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  center?: boolean
}) {
  return (
    <div className={`mb-14 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <div
        className={`mb-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6D28D9] ${
          center ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-6 bg-[#6D28D9]" />
        {eyebrow}
        {center && <span className="h-px w-6 bg-[#6D28D9]" />}
      </div>

      <h2 className="font-[var(--font-jakarta)] text-4xl font-semibold leading-[0.98] tracking-[-0.065em] text-[#111111] sm:text-5xl lg:text-[60px]">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-xl text-sm leading-7 text-[#73737D] sm:text-[15px] ${
            center ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

function HowItWorks() {
  const steps = [
    {
      n: '01',
      icon: Inbox,
      title: 'Email arrives',
      body: 'Haelo watches your company inbox and sees the message the moment it lands.',
    },
    {
      n: '02',
      icon: Layers3,
      title: 'Context appears',
      body: 'Your Business Bible supplies the people, policies and tone behind the request.',
    },
    {
      n: '03',
      icon: Sparkles,
      title: 'A response forms',
      body: 'Haelo turns that context into a clear, grounded response ready for review.',
    },
    {
      n: '04',
      icon: Check,
      title: 'You decide',
      body: 'Approve, edit or skip. Nothing is sent without your say-so.',
    },
  ]

  return (
    <section id="how-it-works" className="bg-[#FAF9FC] px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              The complexity
              <br />
              <span className="font-[var(--font-instrument)] font-normal italic text-[#6D28D9]">
                disappears.
              </span>
            </>
          }
          description="Haelo handles the work between an email arriving and a decision being made. You only see what needs you."
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-[#E7E4ED] bg-[#E7E4ED] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.n}
                className="group relative min-h-[330px] bg-white p-7 transition-all duration-500 hover:bg-[#FCFAFF] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold tracking-[0.15em] text-[#6D28D9]">
                    {step.n}
                  </span>

                  <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-[#F6F3FA] text-[#6D28D9] transition-all duration-500 group-hover:scale-105 group-hover:bg-[#EFE7FF]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-16">
                  <h3 className="text-[17px] font-semibold tracking-[-0.025em] text-[#111111]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-6 text-[#7A7A84]">
                    {step.body}
                  </p>
                </div>

                <div className="absolute bottom-8 left-8 h-px w-0 bg-[#6D28D9] transition-all duration-500 group-hover:w-20" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    ['01', 'Real-time email monitoring', 'A constant watch on your company inbox.'],
    ['02', 'The Business Bible', 'One source of truth for how your company responds.'],
    ['03', 'Context-aware drafting', 'Replies grounded in company knowledge and tone.'],
    ['04', 'Configurable timer', 'Auto-send, remind-and-wait, or a hybrid workflow.'],
    ['05', 'Staff directory', 'People recognised by name, role and department.'],
    ['06', 'Shared team dashboard', 'A clear view of decisions, drafts and activity.'],
    ['07', 'Activity log', 'Every email, draft and outcome in one place.'],
    ['08', 'Security by design', 'OAuth and encryption built into the workflow.'],
  ]

  return (
    <section id="features" className="bg-white px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The system"
              title={
                <>
                  Quietly
                  <br />
                  <span className="font-[var(--font-instrument)] font-normal italic text-[#6D28D9]">
                    intelligent.
                  </span>
                </>
              }
              description="Everything Haelo needs to understand the work, without adding another system your team has to babysit."
            />

            <div className="hidden rounded-[22px] border border-[#E9E7EF] bg-[#FAF9FC] p-5 lg:block">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111111] text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#111111]">
                    Built for decision makers
                  </div>
                  <div className="mt-1 text-[9px] text-black/30">
                    The detail stays behind the scenes.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#E9E7EF] border-y border-[#E9E7EF]">
            {features.map(([number, title, body]) => (
              <div
                key={number}
                className="group grid grid-cols-[35px_1fr_20px] gap-4 py-6 transition-all duration-300 hover:px-2 sm:grid-cols-[45px_1fr_20px]"
              >
                <span className="pt-1 text-[9px] font-semibold text-[#6D28D9]">
                  {number}
                </span>

                <div>
                  <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[17px]">
                    {title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-[11px] leading-6 text-[#7A7A84]">
                    {body}
                  </p>
                </div>

                <Arrow className="mt-1 text-black/15 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#6D28D9]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Integrations() {
  const providers = ['Gmail', 'Outlook', 'Zoho Mail', 'Google Drive', 'More coming']

  return (
    <section className="relative overflow-hidden bg-[#111111] px-5 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-[-250px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[#6D28D9]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <SectionHeading
          eyebrow="Fits your stack"
          center
          title={
            <>
              Your tools stay.
              <br />
              <span className="font-[var(--font-instrument)] font-normal italic text-[#C4B5FD]">
                Haelo connects them.
              </span>
            </>
          }
          description="Bring Haelo into the systems your team already uses. No unnecessary workflow change."
        />

        <div className="mx-auto grid max-w-4xl grid-cols-2 overflow-hidden rounded-[26px] border border-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {providers.map((provider, index) => (
            <div
              key={provider}
              className={`group flex min-h-[125px] flex-col items-center justify-center border-white/[0.08] p-6 text-center transition hover:bg-white/[0.035] ${
                index < 4 ? 'border-b lg:border-b-0' : ''
              } ${index % 2 === 0 ? 'border-r' : ''} ${
                index === 2 ? 'sm:border-r' : ''
              }`}
            >
              <span className="text-[8px] font-semibold tracking-[0.15em] text-white/15">
                0{index + 1}
              </span>
              <span className="mt-3 text-[12px] font-medium text-white/60 transition group-hover:text-white">
                {provider}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const included = [
    'Add as many inboxes as you need',
    'All email providers',
    'Unlimited Business Bible size',
    'Custom timer per person',
    'Shared team dashboard',
    'Priority support',
  ]

  const plans = [
    {
      name: 'Individual',
      description: 'For managing your inbox on your own.',
      people: '1 person',
      price: 15000,
      icon: Users,
    },
    {
      name: 'Team',
      description: 'For teams working together from one workspace.',
      people: '2–5 people',
      price: 60000,
      icon: Users,
      popular: true,
    },
    {
      name: 'Business',
      description: 'For growing teams that need more room to scale.',
      people: '6–15 people',
      price: 195000,
      icon: Building2,
    },
  ]

  return (
    <section id="pricing" className="bg-[#FAF9FC] px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          eyebrow="Pricing"
          center
          title={
            <>
              Choose the space
              <br />
              <span className="font-[var(--font-instrument)] font-normal italic text-[#6D28D9]">
                your team needs.
              </span>
            </>
          }
          description="Start with a 7-day free trial. Get full access and upgrade as your team grows."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon

            return (
              <div
                key={plan.name}
                className={`relative flex min-h-[585px] flex-col rounded-[28px] bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-8 ${
                  plan.popular
                    ? 'border-[1.5px] border-[#6D28D9] shadow-[0_25px_70px_rgba(109,40,217,0.1)]'
                    : 'border border-[#E7E5ED] shadow-[0_10px_35px_rgba(17,17,17,0.035)]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6D28D9] px-4 py-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_8px_20px_rgba(109,40,217,0.2)]">
                    Most popular
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-[13px] ${
                      plan.popular
                        ? 'bg-[#F1EAFF] text-[#6D28D9]'
                        : 'bg-[#F5F3F8] text-[#29272F]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.025em] text-[#111111]">
                      {plan.name}
                    </h3>
                    <p className="mt-1 max-w-[220px] text-[11px] leading-5 text-[#777781]">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mt-9 flex items-baseline gap-2">
                  <strong className="text-[35px] font-semibold leading-none tracking-[-0.06em] text-[#111111]">
                    {formatNaira(plan.price)}
                  </strong>
                  <span className="text-[10px] text-[#85858F]">/ month</span>
                </div>

                <div
                  className={`mt-4 flex w-fit items-center gap-2 rounded-full px-3 py-1.5 ${
                    plan.popular
                      ? 'bg-[#F5F0FF] text-[#6D28D9]'
                      : 'bg-[#F7F7F8] text-[#5F6069]'
                  }`}
                >
                  <Users className="h-3 w-3" />
                  <span className="text-[10px] font-semibold">
                    {plan.people}
                  </span>
                </div>

                <div className="my-7 h-px bg-[#EEEEF1]" />

                <div>
                  <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9999A2]">
                    Included
                  </p>

                  <div className="space-y-3">
                    {included.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    href="/auth/signup"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3.5 text-[11px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6D28D9] hover:shadow-[0_12px_28px_rgba(109,40,217,0.2)]"
                  >
                    Start 7-day free trial
                    <Arrow className="transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <p className="mt-3 text-center text-[9px] text-[#A0A0A8]">
                    No credit card required
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    ['AO', 'Adaeze O.', 'CEO · Retail Group', 'I used to spend two hours on internal emails every morning. Haelo handles most of it before I sit down.'],
    ['KA', 'Kunle A.', 'MD · Construction', 'The first reply Haelo prepared for me was the fastest I had ever answered — and it was the right call.'],
    ['TB', 'Temi B.', 'COO · Financial Services', 'Five senior managers on it now. Response time went from days to minutes.'],
  ]

  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((value) => (value + 1) % testimonials.length),
      5000,
    )

    return () => window.clearInterval(id)
  }, [testimonials.length])

  const current = testimonials[active]

  return (
    <section className="relative overflow-hidden bg-[#111111] px-5 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-[-280px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[#6D28D9]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1000px] text-center">
        <SectionHeading
          eyebrow="What executives say"
          center
          title={
            <>
              Less inbox.
              <br />
              <span className="font-[var(--font-instrument)] font-normal italic text-[#C4B5FD]">
                More headspace.
              </span>
            </>
          }
        />

        <div key={active} className="animate-[heroMessage_650ms_ease-out_both]">
          <div className="font-[var(--font-instrument)] text-6xl italic leading-none text-[#C4B5FD]/50">
            “
          </div>

          <blockquote className="mx-auto mt-3 max-w-4xl text-2xl font-medium leading-[1.2] tracking-[-0.04em] text-white sm:text-4xl lg:text-[48px]">
            {current[3]}
          </blockquote>

          <div className="mt-9 flex items-center justify-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#C4B5FD] text-[10px] font-semibold text-[#111111]">
              {current[0]}
            </div>
            <div className="text-left">
              <div className="text-[11px] font-semibold">{current[1]}</div>
              <div className="mt-0.5 text-[9px] text-white/30">{current[2]}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show testimonial ${index + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                active === index ? 'w-9 bg-[#C4B5FD]' : 'w-4 bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-28 text-center sm:px-6 lg:px-8 lg:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6D28D9]/[0.05] animate-[spin_45s_linear_infinite]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[700px] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-[50%] border border-black/[0.035] animate-[spin_38s_linear_infinite_reverse]" />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Ready when you are"
          center
          title={
            <>
              Let Haelo handle
              <br />
              <span className="font-[var(--font-instrument)] font-normal italic text-[#6D28D9]">
                what happens next.
              </span>
            </>
          }
          description="Start your 7-day free trial and give your team more room to focus on the work that matters."
        />

        <Link
          href="/auth/signup"
          className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#111111] px-7 text-[11px] font-semibold text-white shadow-[0_14px_30px_rgba(17,17,17,0.13)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D28D9] hover:shadow-[0_18px_38px_rgba(109,40,217,0.19)]"
        >
          Start 7-day free trial
          <Arrow className="transition-transform group-hover:translate-x-0.5" />
        </Link>

        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[9px] text-black/30">
          <span>7 days free</span>
          <span>•</span>
          <span>No credit card</span>
          <span>•</span>
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const columns = [
    ['Product', [['How it works', '#how-it-works'], ['Features', '#features'], ['Pricing', '#pricing']]],
    ['Company', [['About', '#'], ['Blog', '#'], ['Careers', '#'], ['Contact', '#']]],
    ['Legal', [['Privacy', '#'], ['Terms', '#'], ['Security', '#']]],
  ]

  return (
    <footer className="bg-[#111111] px-6 pb-8 pt-16 text-white lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 border-b border-white/[0.08] pb-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-[10px] leading-6 text-white/30">
              AI chief of staff for teams that want to spend less time managing
              inboxes and more time making decisions.
            </p>
          </div>

          {columns.map(([heading, items]) => (
            <div key={heading as string}>
              <div className="mb-4 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/20">
                {heading as string}
              </div>

              <div className="space-y-3">
                {(items as string[][]).map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="block w-fit text-[10px] text-white/40 transition hover:translate-x-1 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-3 pt-6 text-[8px] text-white/20 sm:flex-row">
          <span>© 2026 Haelo. All rights reserved.</span>
          <span>Built in Lagos.</span>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <main
      className={`${jakarta.variable} ${instrument.variable} min-h-screen bg-white font-[var(--font-jakarta)] text-[#111111] antialiased selection:bg-[#6D28D9] selection:text-white`}
    >
      <style jsx global>{`
        @keyframes heroMessage {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes heroResponse {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.96);
            filter: blur(8px);
          }
          55% {
            opacity: 1;
            transform: translateY(-3px) scale(1.01);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background: #ffffff;
        }

        ::selection {
          background: #6d28d9;
          color: #ffffff;
        }
      `}</style>

      <Navbar />
      <Hero />
      <Metrics />
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
