'use client'

import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import {
  Users, CreditCard, Activity, Settings, TrendingUp,
  AlertCircle, CheckCircle, Clock, BarChart2, ArrowRight,
  Mail, Shield, LogOut, LayoutDashboard
} from 'lucide-react'
import { useState } from 'react'

const clients = [
  { id: 1, name: 'Adaeze Okonkwo', company: 'Acme Corporation', plan: 'Team', seats: 5, status: 'active', joined: 'Apr 2026', emails: 1203, mrr: '₦500k' },
  { id: 2, name: 'Kunle Adeyemi', company: 'BuildRight Nigeria', plan: 'Solo', seats: 1, status: 'active', joined: 'May 2026', emails: 487, mrr: '₦150k' },
  { id: 3, name: 'Temi Babatunde', company: 'FinServe Ltd', plan: 'Team', seats: 3, status: 'active', joined: 'May 2026', emails: 922, mrr: '₦500k' },
  { id: 4, name: 'Ngozi Eze', company: 'Radiant Health', plan: 'Solo', seats: 1, status: 'trial', joined: 'Jun 2026', emails: 134, mrr: '₦0' },
  { id: 5, name: 'Femi Okafor', company: 'Okafor & Sons', plan: 'Solo', seats: 1, status: 'trial', joined: 'Jun 2026', emails: 61, mrr: '₦0' },
]

const alerts = [
  { type: 'error', message: 'Gmail OAuth expired for Femi Okafor — re-auth needed', time: '2h ago' },
  { type: 'warning', message: 'Ngozi Eze trial ends in 5 days — no payment method added', time: '4h ago' },
  { type: 'info', message: 'WhatsApp API message limit at 68% for this month', time: '1d ago' },
]

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<'overview' | 'clients' | 'metrics'>('overview')

  const totalMRR = '₦1,650,000'
  const totalClients = clients.length
  const activeClients = clients.filter(c => c.status === 'active').length
  const trialClients = clients.filter(c => c.status === 'trial').length

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'metrics', label: 'Metrics', icon: BarChart2 },
  ] as const

  return (
    <div className="min-h-screen bg-offwhite flex">
      {/* Admin sidebar */}
      <aside className="hidden lg:flex w-64 flex-col h-screen sticky top-0 bg-navy border-r border-white/10">
        <div className="p-5 border-b border-white/10">
          <Logo variant="white-on-navy" size="sm" />
          <span className="mt-2 inline-flex items-center gap-1.5 bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
            <Shield size={10} />
            Admin
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                activeSection === id
                  ? 'bg-lime/10 text-lime'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <LogOut size={16} />
            Exit admin
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Admin header */}
        <div className="bg-white border-b border-border px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-navy">
              {activeSection === 'overview' ? 'Admin Overview' : activeSection === 'clients' ? 'Client Management' : 'Platform Metrics'}
            </h1>
            <p className="text-xs text-midgray">Haelo internal admin · Restricted access</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-lime">
              <span className="w-1.5 h-1.5 bg-lime rounded-full" />
              Platform healthy
            </span>
          </div>
        </div>

        <div className="p-8">
          {/* OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* KPI strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Monthly recurring revenue', value: totalMRR, icon: CreditCard, change: '+₦500k this month' },
                  { label: 'Active clients', value: String(activeClients), icon: Users, change: `${trialClients} on trial` },
                  { label: 'Emails processed today', value: '2,847', icon: Mail, change: 'Across all accounts' },
                  { label: 'Platform uptime', value: '99.8%', icon: Activity, change: 'Last 30 days' },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <div className="w-9 h-9 bg-lime/10 text-lime rounded-lg flex items-center justify-center mb-3">
                      <s.icon size={16} />
                    </div>
                    <p className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>{s.value}</p>
                    <p className="text-xs font-bold text-midgray mt-0.5">{s.label}</p>
                    <p className="text-xs text-silver mt-1">{s.change}</p>
                  </div>
                ))}
              </div>

              {/* Alerts */}
              <div className="card">
                <h2 className="text-base font-bold text-navy mb-4">System alerts</h2>
                <div className="space-y-3">
                  {alerts.map((a, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${
                      a.type === 'error' ? 'bg-red-50 border border-red-100' :
                      a.type === 'warning' ? 'bg-amber-50 border border-amber-100' :
                      'bg-offwhite border border-border'
                    }`}>
                      {a.type === 'error' ? <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" /> :
                       a.type === 'warning' ? <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" /> :
                       <CheckCircle size={15} className="text-lime shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-xs font-bold text-navy">{a.message}</p>
                        <p className="text-xs text-midgray mt-0.5">{a.time}</p>
                      </div>
                      <button className="text-xs text-lime hover:underline font-bold shrink-0">Resolve</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue milestones */}
              <div className="card">
                <h2 className="text-base font-bold text-navy mb-4">Revenue milestones</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Month 1 target (3 clients)', target: '₦450,000', current: '₦1,650,000', pct: 100 },
                    { label: 'Month 3 target (10 clients)', target: '₦3,000,000', current: '₦1,650,000', pct: 55 },
                    { label: 'Month 6 target (25 clients)', target: '₦7,500,000', current: '₦1,650,000', pct: 22 },
                  ].map(m => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs font-bold text-navy">{m.label}</p>
                        <p className="text-xs text-midgray">{m.current} / {m.target}</p>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-lime rounded-full transition-all"
                          style={{ width: `${Math.min(m.pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CLIENTS */}
          {activeSection === 'clients' && (
            <div className="space-y-5">
              <div className="card overflow-hidden p-0">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-base font-bold text-navy">All clients ({totalClients})</h2>
                  <button className="btn-primary text-sm">Add client</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-offwhite border-b border-border">
                        {['Client', 'Company', 'Plan', 'Emails', 'MRR', 'Status', ''].map(h => (
                          <th key={h} className="text-left text-xs font-bold uppercase tracking-wide text-midgray px-5 py-3.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((c, i) => (
                        <tr key={c.id} className="border-b border-border last:border-0 hover:bg-offwhite/60 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {c.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-navy">{c.name}</p>
                                <p className="text-xs text-midgray">Joined {c.joined}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-midgray">{c.company}</td>
                          <td className="px-5 py-4">
                            <span className={`badge ${c.plan === 'Team' ? 'badge-navy' : 'badge-silver'}`}>{c.plan}</span>
                          </td>
                          <td className="px-5 py-4 text-sm text-midgray">{c.emails.toLocaleString()}</td>
                          <td className="px-5 py-4 text-sm font-bold text-navy">{c.mrr}</td>
                          <td className="px-5 py-4">
                            <span className={c.status === 'active' ? 'badge-lime' : 'badge-silver'}>
                              {c.status === 'trial' ? 'Trial' : 'Active'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <button className="text-xs font-bold text-lime hover:underline">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* METRICS */}
          {activeSection === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Avg email-to-WhatsApp time', value: '42s', target: '<60s', ok: true },
                  { label: 'AI approval rate (no edits)', value: '91%', target: '>90%', ok: true },
                  { label: 'Auto-send rate', value: '24%', target: '<30%', ok: true },
                  { label: 'Edit rate (after 60 days)', value: '12%', target: '<15%', ok: true },
                  { label: 'Avg executive action time', value: '2.8 min', target: '<3 min', ok: true },
                  { label: 'Onboarding completion rate', value: '83%', target: '>80%', ok: true },
                ].map(m => (
                  <div key={m.label} className="stat-card">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-midgray">{m.label}</p>
                      {m.ok ? <CheckCircle size={13} className="text-lime" /> : <AlertCircle size={13} className="text-red-400" />}
                    </div>
                    <p className="text-2xl font-bold text-navy mb-1" style={{ letterSpacing: '-0.02em' }}>{m.value}</p>
                    <p className="text-xs text-silver">Target: {m.target}</p>
                  </div>
                ))}
              </div>

              {/* NPS */}
              <div className="card">
                <h2 className="text-base font-bold text-navy mb-4">NPS Score</h2>
                <div className="flex items-end gap-6">
                  <div>
                    <p className="text-5xl font-bold text-lime" style={{ letterSpacing: '-0.02em' }}>62</p>
                    <p className="text-xs text-midgray mt-1">Target: 50+ by Month 3 ✓</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      { label: 'Promoters (9-10)', pct: 73, color: 'bg-lime' },
                      { label: 'Passives (7-8)', pct: 16, color: 'bg-silver' },
                      { label: 'Detractors (0-6)', pct: 11, color: 'bg-red-200' },
                    ].map(n => (
                      <div key={n.label} className="flex items-center gap-3">
                        <p className="text-xs text-midgray w-28 shrink-0">{n.label}</p>
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div className={`h-full ${n.color} rounded-full`} style={{ width: `${n.pct}%` }} />
                        </div>
                        <p className="text-xs font-bold text-navy w-8 text-right">{n.pct}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
