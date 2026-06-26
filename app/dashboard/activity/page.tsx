'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown, ChevronRight, Mail } from 'lucide-react'

const activities = [
  {
    id: 1, from: 'Tosin Adeyemi', role: 'Operations Manager', dept: 'Operations',
    summary: 'Requesting approval to reorder 50kg of rice for kitchen before Friday\'s service.',
    original: 'Hi, I wanted to check if we can place an order for 50kg of rice from our usual supplier before Friday. We\'re running low and will definitely need it for the weekend service.',
    suggested: 'Approved. Please ensure the order is logged in the system and a receipt submitted to accounts before close of work today.',
    sent: 'Approved. Please ensure the order is logged in the system and a receipt submitted to accounts before close of work today.',
    status: 'sent', method: 'YES', time: 'Today, 9:02 AM', date: 'Jun 24, 2026'
  },
  {
    id: 2, from: 'Funke Balogun', role: 'HR Manager', dept: 'Human Resources',
    summary: 'Asking about the new remote work policy effective next month.',
    original: 'Good morning. I wanted to confirm the details of the new remote work policy that takes effect in July. Can you confirm who it applies to and the reporting requirements?',
    suggested: 'The remote work policy applies to all non-client-facing staff from July 1. Two days per week maximum. Reporting remains daily via the team Slack channel.',
    sent: 'The remote work policy applies to all non-client-facing staff from July 1. Two days per week maximum. Reporting remains daily via the team Slack channel.',
    status: 'sent', method: 'YES', time: 'Today, 8:44 AM', date: 'Jun 24, 2026'
  },
  {
    id: 3, from: 'Emeka Obi', role: 'Finance Analyst', dept: 'Finance',
    summary: 'Submitted Q3 variance report for review and sign-off.',
    original: 'Please find attached the Q3 variance report. Key highlights on page 4. Awaiting your sign-off before I share with the board on Thursday.',
    suggested: 'Received. I\'ll review and provide sign-off before Thursday morning.',
    sent: 'Received and reviewed. Please proceed with sharing to the board. I\'ll follow up directly if I have questions after the presentation.',
    status: 'edited', method: 'Edited', time: 'Today, 8:17 AM', date: 'Jun 24, 2026'
  },
  {
    id: 4, from: 'Chidi Nwosu', role: 'Product Manager', dept: 'Product',
    summary: 'Requesting two days off next week for a family event.',
    original: 'Hi, requesting two days off on Monday and Tuesday next week for a family event. My work is covered — I\'ve briefed Amaka.',
    suggested: 'Approved. Enjoy the time with your family.',
    sent: 'Approved. Enjoy the time with your family.',
    status: 'auto-sent', method: 'Auto-sent', time: 'Yesterday, 4:12 PM', date: 'Jun 23, 2026'
  },
  {
    id: 5, from: 'Aisha Mohammed', role: 'Sales Lead', dept: 'Sales',
    summary: 'Client follow-up on the Kano proposal — needs direction on pricing.',
    original: 'The Kano client came back on the proposal. They\'re comfortable with the scope but want a 15% discount on the implementation fee. Do we want to give it to them?',
    suggested: 'We can offer a 10% discount on the implementation fee only. This applies if they sign before end of the month.',
    sent: 'We can offer a 10% discount on the implementation fee only. This applies if they sign before end of the month.',
    status: 'sent', method: 'YES', time: 'Yesterday, 2:30 PM', date: 'Jun 23, 2026'
  },
]

const statusColor: Record<string, string> = {
  sent: 'badge-lime',
  'auto-sent': 'badge-silver',
  edited: 'badge-navy',
  pending: 'badge-navy',
}

export default function ActivityPage() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [filterDept, setFilterDept] = useState('All')

  const depts = ['All', 'Operations', 'Human Resources', 'Finance', 'Sales', 'Product']

  const filtered = activities.filter(a =>
    (filterDept === 'All' || a.dept === filterDept) &&
    (a.from.toLowerCase().includes(search.toLowerCase()) ||
     a.summary.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      <div className="mb-8 lg:ml-0 ml-12">
        <p className="section-label mb-1">Activity Log</p>
        <h1 className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>
          Every email. Every response.
        </h1>
        <p className="text-midgray text-sm mt-1">
          Complete history of everything Haelo has handled on your behalf.
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Today', value: '23' },
          { label: 'This week', value: '141' },
          { label: 'This month', value: '574' },
          { label: 'All time', value: '1,203' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>{s.value}</p>
            <p className="text-xs text-midgray mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver" />
          <input
            type="text"
            placeholder="Search by name or content..."
            className="input pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {depts.map(d => (
            <button
              key={d}
              onClick={() => setFilterDept(d)}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                filterDept === d
                  ? 'bg-navy text-white'
                  : 'bg-white border border-border text-midgray hover:text-navy'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className="card overflow-hidden p-0">
            {/* Row header */}
            <button
              className="w-full flex items-start gap-4 p-5 text-left hover:bg-offwhite/60 transition-colors"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <div className="w-9 h-9 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                {item.from.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-sm font-bold text-navy">{item.from}</p>
                  <p className="text-xs text-midgray">· {item.role}</p>
                  <span className={`badge ${statusColor[item.status]} ml-auto`}>{item.status === 'auto-sent' ? 'Auto-sent' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                </div>
                <p className="text-xs text-midgray leading-relaxed">{item.summary}</p>
                <p className="text-xs text-silver mt-1">{item.time}</p>
              </div>
              <ChevronRight size={16} className={`text-silver shrink-0 mt-1 transition-transform ${expanded === item.id ? 'rotate-90' : ''}`} />
            </button>

            {/* Expanded detail */}
            {expanded === item.id && (
              <div className="border-t border-border bg-offwhite/50 p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-midgray mb-2">Original email</p>
                    <div className="bg-white border border-border rounded-lg p-3">
                      <p className="text-xs text-nearblack leading-relaxed">{item.original}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-midgray mb-2">AI suggested</p>
                    <div className="bg-white border border-border rounded-lg p-3">
                      <p className="text-xs text-nearblack leading-relaxed">{item.suggested}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-midgray mb-2">Response sent</p>
                    <div className="bg-lime/5 border border-lime/20 rounded-lg p-3">
                      <p className="text-xs text-nearblack leading-relaxed">{item.sent}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-midgray">
                  <span>Method: <strong className="text-navy">{item.method}</strong></span>
                  <span>Dept: <strong className="text-navy">{item.dept}</strong></span>
                  <span>Date: <strong className="text-navy">{item.date}</strong></span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card text-center py-12">
          <Mail size={32} className="text-silver mx-auto mb-3" />
          <p className="text-sm font-bold text-navy mb-1">No results found</p>
          <p className="text-xs text-midgray">Try adjusting your search or filter.</p>
        </div>
      )}
    </main>
  )
}
