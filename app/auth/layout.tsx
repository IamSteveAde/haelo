import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export const metadata: Metadata = {
  title: 'Haelo — Sign in',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-offwhite flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy flex-col justify-between p-12">
        <Link href="/">
          <Logo variant="white-on-navy" size="md" />
        </Link>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-lime mb-6">What Haelo does</p>
          <h2 className="text-4xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Be everywhere.<br />Miss nothing.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-md">
            Haelo reads every internal email, drafts the right response, and sends it to your WhatsApp. You approve in one tap. Your team never waits.
          </p>

          {/* Mini WhatsApp preview */}
          <div className="bg-[#162338] rounded-2xl p-5 max-w-sm border border-white/10">
            <p className="text-lime text-xs font-bold uppercase tracking-wide mb-3">New Internal Email</p>
            <p className="text-white/60 text-xs mb-1"><span className="text-white font-bold">From:</span> Tosin Adeyemi · Ops Manager</p>
            <p className="text-white/80 text-xs leading-relaxed mb-4">Requesting approval to reorder 50kg of rice before Friday&apos;s service.</p>
            <div className="flex gap-2">
              <span className="bg-lime/20 text-lime text-xs font-bold px-3 py-1.5 rounded-full">Reply YES to send</span>
              <span className="bg-white/10 text-white/60 text-xs font-bold px-3 py-1.5 rounded-full">Reply NO to edit</span>
            </div>
          </div>
        </div>

        <p className="text-white/30 text-xs">
          usehaelo.com &nbsp;·&nbsp; Built for executives everywhere.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden inline-block mb-8">
            <Logo variant="lime-on-white" size="md" />
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
