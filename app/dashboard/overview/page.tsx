'use client'

import { CheckCircle, Clock, Mail, Users, TrendingUp, ArrowRight, Zap } from 'lucide-react'

const recentActivity = [
  { id: 1, from: 'Tosin Adeyemi', role: 'Operations Manager', summary: 'Requesting approval to reorder 50kg of rice before Friday\'s service.', status: 'sent', time: '2m ago', approved: true },
  { id: 2, from: 'Funke Balogun', role: 'HR Manager', summary: 'Asking about the new remote work policy effective next month.', status: 'pending', time: '8m ago', approved: false },
  { id: 3, from: 'Emeka Obi', role: 'Finance Analyst', summary: 'Submitted Q3 variance report for review and sign-off.', status: 'sent', time: '22m ago', approved: true },
  { id: 4, from: 'Aisha Mohammed', role: 'Sales Lead', summary: 'Client follow-up on the Kano proposal — needs direction on pricing.', status: 'edited', time: '1h ago', approved: false },
  { id: 5, from: 'Chidi Nwosu', role: 'Product Manager', summary: 'Requesting two days off next week for a family event.', status: 'auto-sent', time: '3h ago', approved: false },
]

const stats = [
  { label: 'Emails handled today', value: '23', sub: '+4 from yesterday', icon: Mail, trend: 'up' },
  { label: 'Avg response time', value: '4.2 min', sub: 'Target: under 10 min', icon: Clock, trend: 'up' },
  { label: 'Approval rate', value: '91%', sub: 'Without editing', icon: CheckCircle, trend: 'up' },
  { label: 'Staff recognised', value: '47', sub: '2 unrecognised pending', icon: Users, trend: 'neutral' },
]

const statusColor: Record<string, string> = {
  sent: 'badge-lime',
  'auto-sent': 'badge-silver',
  pending: 'badge-navy',
  edited: 'badge-silver',
}

const statusLabel: Record<string, string> = {
  sent: 'Sent',
  'auto-sent': 'Auto-sent',
  pending: 'Pending',
  edited: 'Edited & sent',
}

export default function OverviewPage() {
  return (
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8 lg:ml-0 ml-12">
        <p className="section-label mb-1">Dashboard</p>
        <h1 className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>
          Good morning, Adaeze.
        </h1>
        <p className="text-midgray text-sm mt-1">
          Haelo has handled 23 emails today. Your team is covered.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-lime/10 text-lime rounded-lg flex items-center justify-center">
                <s.icon size={17} />
              </div>
              {s.trend === 'up' && <TrendingUp size={14} className="text-lime" />}
            </div>
            <p className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>{s.value}</p>
            <p className="text-xs font-bold text-midgray mt-0.5">{s.label}</p>
            <p className="text-xs text-silver mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-navy">Recent activity</h2>
              <a href="/dashboard/activity" className="text-xs font-bold text-lime hover:underline flex items-center gap-1">
                View all <ArrowRight size={12} />
              </a>
            </div>

            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-xl hover:bg-offwhite transition-colors group">
                  <div className="w-9 h-9 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {item.from.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="text-sm font-bold text-navy">{item.from}</p>
                      <p className="text-xs text-midgray">· {item.role}</p>
                      <span className={`badge ${statusColor[item.status]} ml-auto`}>
                        {statusLabel[item.status]}
                      </span>
                    </div>
                    <p className="text-xs text-midgray leading-relaxed truncate">{item.summary}</p>
                    <p className="text-xs text-silver mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Haelo status */}
          <div className="card-navy">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
              <p className="text-xs font-bold text-lime uppercase tracking-wide">Active</p>
            </div>
            <p className="text-white font-bold text-base mb-1">Haelo is running</p>
            <p className="text-white/60 text-xs leading-relaxed mb-4">
              Connected to Gmail. WhatsApp verified. Timer set to 10 minutes.
            </p>
            <a
              href="https://wa.me/2349000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-lime/20 hover:bg-lime/30 text-lime font-bold text-xs px-4 py-2 rounded-lg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Open WhatsApp
            </a>
          </div>

          {/* Unrecognised sender */}
          <div className="card border-amber-200 bg-amber-50">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                <Zap size={15} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy mb-1">2 unrecognised senders</p>
                <p className="text-xs text-midgray leading-relaxed mb-3">
                  Haelo received emails from addresses not in your Staff Directory. Review and add them.
                </p>
                <a href="/dashboard/staff" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                  Review now <ArrowRight size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="card">
            <p className="text-xs font-bold text-navy uppercase tracking-wide mb-4">Quick actions</p>
            <div className="space-y-2">
              {[
                { label: 'Update Business Bible', href: '/dashboard/business-bible' },
                { label: 'Add staff member', href: '/dashboard/staff' },
                { label: 'Change timer settings', href: '/dashboard/settings' },
                { label: 'View billing', href: '/dashboard/billing' },
              ].map(a => (
                <a
                  key={a.label}
                  href={a.href}
                  className="flex items-center justify-between py-2 text-sm text-midgray hover:text-navy font-bold group transition-colors"
                >
                  {a.label}
                  <ArrowRight size={13} className="text-silver group-hover:text-lime transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
