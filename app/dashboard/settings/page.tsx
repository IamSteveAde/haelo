'use client'

import { useState } from 'react'
import { Save, CheckCircle, AlertCircle } from 'lucide-react'

export default function SettingsPage() {
  const [timer, setTimer] = useState('10')
  const [mode, setMode] = useState<'auto-send' | 'remind' | 'hybrid'>('hybrid')
  const [reminderFreq, setReminderFreq] = useState('5')
  const [saved, setSaved] = useState(false)

  const [emailProvider, setEmailProvider] = useState('gmail')
  const [whatsappVerified, setWhatsappVerified] = useState(true)
  const [whatsappNum, setWhatsappNum] = useState('+234 801 234 5678')

  const [notifications, setNotifications] = useState({
    unrecognised: true,
    dailySummary: true,
    weeklyReport: false,
    errors: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const timerModes = [
    {
      id: 'auto-send',
      label: 'Auto-Send',
      desc: 'After the timer expires, Haelo sends the AI-drafted response automatically. Zero inbox backlog.',
    },
    {
      id: 'remind',
      label: 'Remind & Wait',
      desc: 'Haelo sends a WhatsApp reminder every X minutes until you respond. Never sends without explicit approval.',
    },
    {
      id: 'hybrid',
      label: 'Hybrid',
      desc: 'Auto-send for junior staff emails. Remind and wait for senior staff, HR, Finance, or flagged individuals.',
    },
  ] as const

  return (
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      <div className="mb-8 lg:ml-0 ml-12">
        <p className="section-label mb-1">Settings</p>
        <h1 className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>
          Configure Haelo
        </h1>
        <p className="text-midgray text-sm mt-1">
          Timer behaviour, email connection, WhatsApp, and notification preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Timer configuration */}
        <div className="card">
          <h2 className="text-base font-bold text-navy mb-1">Timer behaviour</h2>
          <p className="text-xs text-midgray mb-5">Controls how Haelo handles emails when you don&apos;t respond on WhatsApp.</p>

          <div className="space-y-3 mb-5">
            {timerModes.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
                  mode === m.id
                    ? 'border-lime bg-lime/5'
                    : 'border-border hover:border-lime/30'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 transition-all ${
                  mode === m.id ? 'border-lime bg-lime' : 'border-silver'
                }`}>
                  {mode === m.id && (
                    <div className="w-full h-full rounded-full bg-navy scale-50" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">{m.label}</p>
                  <p className="text-xs text-midgray mt-0.5 leading-relaxed">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Auto-send timer (minutes)</label>
              <select
                className="input"
                value={timer}
                onChange={e => setTimer(e.target.value)}
              >
                {['5', '10', '15', '20', '30', '60'].map(v => (
                  <option key={v} value={v}>{v} minutes</option>
                ))}
              </select>
            </div>
            {mode !== 'auto-send' && (
              <div>
                <label className="label">Reminder frequency (minutes)</label>
                <select
                  className="input"
                  value={reminderFreq}
                  onChange={e => setReminderFreq(e.target.value)}
                >
                  {['3', '5', '10', '15'].map(v => (
                    <option key={v} value={v}>Every {v} min</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Email provider */}
        <div className="card">
          <h2 className="text-base font-bold text-navy mb-1">Email connection</h2>
          <p className="text-xs text-midgray mb-5">The inbox Haelo monitors. OAuth only — no passwords stored.</p>

          <div className="flex flex-col gap-3 mb-5">
            {[
              { id: 'gmail', label: 'Gmail', sub: 'Google OAuth 2.0' },
              { id: 'outlook', label: 'Outlook / Microsoft 365', sub: 'Microsoft Graph API' },
              { id: 'zoho', label: 'Zoho Mail', sub: 'Zoho OAuth' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setEmailProvider(p.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                  emailProvider === p.id ? 'border-lime bg-lime/5' : 'border-border hover:border-lime/30'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                  emailProvider === p.id ? 'border-lime bg-lime' : 'border-silver'
                }`} />
                <div>
                  <p className="text-sm font-bold text-navy">{p.label}</p>
                  <p className="text-xs text-midgray">{p.sub}</p>
                </div>
                {emailProvider === p.id && (
                  <span className="badge-lime ml-auto">Connected</span>
                )}
              </button>
            ))}
          </div>

          <button className="btn-ghost text-sm text-red-500 hover:text-red-600 hover:bg-red-50">
            Revoke email access
          </button>
        </div>

        {/* WhatsApp */}
        <div className="card">
          <h2 className="text-base font-bold text-navy mb-1">WhatsApp</h2>
          <p className="text-xs text-midgray mb-5">The number where Haelo sends your email notifications.</p>

          <div className={`flex items-center gap-3 p-4 rounded-xl border mb-4 ${
            whatsappVerified ? 'border-lime/30 bg-lime/5' : 'border-border'
          }`}>
            {whatsappVerified ? (
              <CheckCircle size={16} className="text-lime shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-amber-500 shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-sm font-bold text-navy">{whatsappNum}</p>
              <p className="text-xs text-midgray">{whatsappVerified ? 'Verified and active' : 'Verification pending'}</p>
            </div>
          </div>

          <div>
            <label className="label">Update WhatsApp number</label>
            <div className="flex gap-3">
              <input
                type="tel"
                className="input flex-1"
                placeholder="+234 800 000 0000"
                value={whatsappNum}
                onChange={e => setWhatsappNum(e.target.value)}
              />
              <button className="btn-primary text-sm shrink-0">Verify</button>
            </div>
          </div>
        </div>

        {/* Domain filter */}
        <div className="card">
          <h2 className="text-base font-bold text-navy mb-1">Domain filter</h2>
          <p className="text-xs text-midgray mb-5">
            Haelo only processes emails from your company domain. This is a hard rule and cannot be changed.
          </p>
          <div className="bg-offwhite border border-border rounded-lg p-4 flex items-center gap-3">
            <CheckCircle size={15} className="text-lime shrink-0" />
            <div>
              <p className="text-sm font-bold text-navy">@company.com</p>
              <p className="text-xs text-midgray">All external emails are ignored. Always.</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <h2 className="text-base font-bold text-navy mb-1">Notifications</h2>
          <p className="text-xs text-midgray mb-5">Control what Haelo sends to your WhatsApp beyond email responses.</p>

          <div className="space-y-3">
            {(Object.keys(notifications) as Array<keyof typeof notifications>).map(key => {
              const labels: Record<string, string> = {
                unrecognised: 'Unrecognised sender alerts',
                dailySummary: 'Daily activity summary',
                weeklyReport: 'Weekly performance report',
                errors: 'Error and connection alerts',
              }
              return (
                <div key={key} className="flex items-center justify-between py-2">
                  <p className="text-sm text-navy">{labels[key]}</p>
                  <button
                    onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
                      notifications[key] ? 'bg-lime' : 'bg-border'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                      notifications[key] ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="btn-primary">
            <Save size={14} />
            Save settings
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-lime font-bold">
              <CheckCircle size={14} />
              Settings saved
            </span>
          )}
        </div>
      </div>
    </main>
  )
}
