'use client'

import { useState } from 'react'
import { Plus, Upload, Search, Edit2, Trash2, AlertCircle, CheckCircle, X } from 'lucide-react'

const staff = [
  { id: 1, name: 'Tosin Adeyemi', role: 'Operations Manager', dept: 'Operations', email: 'tosin@company.com', status: 'active', timer: '10 min' },
  { id: 2, name: 'Funke Balogun', role: 'HR Manager', dept: 'Human Resources', email: 'funke@company.com', status: 'active', timer: '10 min' },
  { id: 3, name: 'Emeka Obi', role: 'Finance Analyst', dept: 'Finance', email: 'emeka@company.com', status: 'active', timer: '5 min' },
  { id: 4, name: 'Aisha Mohammed', role: 'Sales Lead', dept: 'Sales', email: 'aisha@company.com', status: 'active', timer: '10 min' },
  { id: 5, name: 'Chidi Nwosu', role: 'Product Manager', dept: 'Product', email: 'chidi@company.com', status: 'active', timer: '10 min' },
  { id: 6, name: 'Yetunde Adeyemi', role: 'Customer Success', dept: 'Customer Success', email: 'yetunde@company.com', status: 'active', timer: '15 min' },
  { id: 7, name: 'Babatunde Okon', role: 'Developer', dept: 'Engineering', email: 'babatunde@company.com', status: 'inactive', timer: '10 min' },
]

const unrecognised = [
  { email: 'david@company.com', received: '2h ago' },
  { email: 'sarah.k@company.com', received: '5h ago' },
]

export default function StaffPage() {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newStaff, setNewStaff] = useState({ name: '', role: '', email: '', dept: '' })

  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      <div className="mb-8 lg:ml-0 ml-12">
        <p className="section-label mb-1">Staff Directory</p>
        <h1 className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>
          Your team
        </h1>
        <p className="text-midgray text-sm mt-1">
          Everyone Haelo recognises. Add, edit, or remove staff at any time.
        </p>
      </div>

      {/* Unrecognised queue */}
      {unrecognised.length > 0 && (
        <div className="card border-amber-200 bg-amber-50 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle size={16} className="text-amber-600" />
            <p className="text-sm font-bold text-navy">{unrecognised.length} unrecognised senders</p>
          </div>
          <p className="text-xs text-midgray mb-4">
            Haelo received emails from these addresses but doesn&apos;t recognise them. Add them to the directory or dismiss.
          </p>
          <div className="space-y-2">
            {unrecognised.map((u) => (
              <div key={u.email} className="flex items-center gap-3 bg-white rounded-lg p-3">
                <div className="w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs font-bold">
                  ?
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-navy">{u.email}</p>
                  <p className="text-xs text-midgray">Received {u.received}</p>
                </div>
                <button className="btn-primary text-xs py-1.5 px-3">Add</button>
                <button className="btn-ghost text-xs py-1.5 px-3">Dismiss</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver" />
          <input
            type="text"
            placeholder="Search staff..."
            className="input pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-ghost text-sm">
          <Upload size={14} />
          Import CSV
        </button>
        <button className="btn-primary text-sm" onClick={() => setShowAdd(true)}>
          <Plus size={14} />
          Add staff
        </button>
      </div>

      {/* Add form modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-navy/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-elevated w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-navy">Add staff member</h2>
              <button onClick={() => setShowAdd(false)} className="p-1.5 hover:bg-offwhite rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label">Full name</label>
                <input className="input" placeholder="Amara Okafor" value={newStaff.name} onChange={e => setNewStaff(s => ({ ...s, name: e.target.value }))} />
              </div>
              <div>
                <label className="label">Role</label>
                <input className="input" placeholder="Marketing Manager" value={newStaff.role} onChange={e => setNewStaff(s => ({ ...s, role: e.target.value }))} />
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" placeholder="amara@company.com" value={newStaff.email} onChange={e => setNewStaff(s => ({ ...s, email: e.target.value }))} />
              </div>
              <div>
                <label className="label">Department</label>
                <input className="input" placeholder="Marketing" value={newStaff.dept} onChange={e => setNewStaff(s => ({ ...s, dept: e.target.value }))} />
              </div>
              <div className="flex gap-3 pt-2">
                <button className="btn-ghost flex-1 justify-center" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn-primary flex-1 justify-center" onClick={() => setShowAdd(false)}>Add member</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-offwhite">
                <th className="text-left text-xs font-bold uppercase tracking-wide text-midgray px-5 py-3.5">Name</th>
                <th className="text-left text-xs font-bold uppercase tracking-wide text-midgray px-5 py-3.5 hidden md:table-cell">Role</th>
                <th className="text-left text-xs font-bold uppercase tracking-wide text-midgray px-5 py-3.5 hidden lg:table-cell">Department</th>
                <th className="text-left text-xs font-bold uppercase tracking-wide text-midgray px-5 py-3.5 hidden lg:table-cell">Timer</th>
                <th className="text-left text-xs font-bold uppercase tracking-wide text-midgray px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className={`border-b border-border last:border-0 hover:bg-offwhite/60 transition-colors ${i % 2 === 0 ? '' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">{s.name}</p>
                        <p className="text-xs text-midgray">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-midgray hidden md:table-cell">{s.role}</td>
                  <td className="px-5 py-4 text-sm text-midgray hidden lg:table-cell">{s.dept}</td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="badge-silver">{s.timer}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={s.status === 'active' ? 'badge-lime' : 'badge-silver'}>
                      {s.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button className="p-1.5 hover:bg-offwhite rounded-lg text-silver hover:text-navy transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg text-silver hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border bg-offwhite flex items-center justify-between">
          <p className="text-xs text-midgray">{filtered.length} of {staff.length} staff members</p>
          <button className="text-xs font-bold text-lime hover:underline flex items-center gap-1">
            <Upload size={11} /> Download CSV
          </button>
        </div>
      </div>
    </main>
  )
}
