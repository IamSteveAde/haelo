'use client'

import { CheckCircle, Download, CreditCard, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const invoices = [
  { id: 'INV-0024', date: 'Jun 1, 2026', amount: '₦500,000', status: 'paid' },
  { id: 'INV-0023', date: 'May 1, 2026', amount: '₦500,000', status: 'paid' },
  { id: 'INV-0022', date: 'Apr 1, 2026', amount: '₦500,000', status: 'paid' },
  { id: 'INV-0021', date: 'Mar 1, 2026', amount: '₦500,000', status: 'paid' },
]

export default function BillingPage() {
  return (
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      <div className="mb-8 lg:ml-0 ml-12">
        <p className="section-label mb-1">Billing</p>
        <h1 className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>
          Plan & payments
        </h1>
        <p className="text-midgray text-sm mt-1">
          Manage your subscription, payment method, and invoice history.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Current plan */}
        <div className="card-navy">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="section-label mb-2">Current plan</p>
              <h2 className="text-2xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>Team</h2>
              <p className="text-white/60 text-sm mt-1">Up to 5 seats · All features included</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-lime" style={{ letterSpacing: '-0.02em' }}>₦500,000</p>
              <p className="text-white/50 text-xs">per month</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-white/50 text-xs mb-1">Next billing date</p>
              <p className="text-white font-bold">Jul 1, 2026</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-white/50 text-xs mb-1">Seats used</p>
              <p className="text-white font-bold">5 of 5</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/2349000000000?text=I%27d%20like%20to%20upgrade%20to%20Enterprise"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-lime text-navy font-bold text-sm py-2.5 px-4 rounded-lg hover:bg-lime-hover transition-colors"
            >
              Upgrade to Enterprise
              <ArrowRight size={14} />
            </a>
            <button className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold text-sm py-2.5 px-4 rounded-lg hover:bg-white/20 transition-colors">
              Downgrade plan
            </button>
          </div>
        </div>

        {/* Features included */}
        <div className="card">
          <h2 className="text-base font-bold text-navy mb-4">What&apos;s included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Up to 5 seats (CEO, HR, Ops, etc.)',
              'All email providers',
              'Unlimited Business Bible size',
              'Custom timer per staff level',
              'Shared team dashboard',
              'Priority support',
              'Monthly performance report',
            ].map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-lime shrink-0" />
                <p className="text-xs text-midgray">{f}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div className="card">
          <h2 className="text-base font-bold text-navy mb-4">Payment method</h2>

          <div className="flex items-center gap-3 p-4 bg-offwhite border border-border rounded-xl mb-4">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
              <CreditCard size={18} className="text-lime" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-navy">Mastercard ending 4321</p>
              <p className="text-xs text-midgray">Expires 08/27</p>
            </div>
            <span className="badge-lime">Default</span>
          </div>

          <button className="btn-ghost text-sm">
            <CreditCard size={14} />
            Update payment method
          </button>
        </div>

        {/* Invoice history */}
        <div className="card overflow-hidden p-0">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-bold text-navy">Invoice history</h2>
          </div>
          <div>
            {invoices.map((inv, i) => (
              <div key={inv.id} className={`flex items-center gap-4 px-6 py-4 ${i < invoices.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="flex-1">
                  <p className="text-sm font-bold text-navy">{inv.id}</p>
                  <p className="text-xs text-midgray">{inv.date}</p>
                </div>
                <p className="text-sm font-bold text-navy">{inv.amount}</p>
                <span className="badge-lime">{inv.status}</span>
                <button className="p-1.5 hover:bg-offwhite rounded-lg text-silver hover:text-navy transition-colors">
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel */}
        <div className="card border-red-100 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-navy mb-1">Cancel subscription</p>
              <p className="text-xs text-midgray leading-relaxed mb-3">
                Cancelling stops Haelo from processing emails at the end of your billing period. Your data is retained for 30 days.
              </p>
              <button className="text-xs font-bold text-red-500 hover:underline">
                Cancel subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
