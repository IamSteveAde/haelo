'use client'

import { useState } from 'react'
import { Upload, FileText, RefreshCw, Download, Clock, CheckCircle, Users, Trash2 } from 'lucide-react'

const versionHistory = [
  { version: 'v3', date: 'Jun 18, 2026', pages: 24, staff: 47, active: true },
  { version: 'v2', date: 'May 2, 2026', pages: 19, staff: 41, active: false },
  { version: 'v1', date: 'Apr 10, 2026', pages: 12, staff: 35, active: false },
]

const identifiedStaff = [
  { name: 'Tosin Adeyemi', role: 'Operations Manager', dept: 'Operations', email: 'tosin@company.com' },
  { name: 'Funke Balogun', role: 'HR Manager', dept: 'Human Resources', email: 'funke@company.com' },
  { name: 'Emeka Obi', role: 'Finance Analyst', dept: 'Finance', email: 'emeka@company.com' },
  { name: 'Aisha Mohammed', role: 'Sales Lead', dept: 'Sales', email: 'aisha@company.com' },
  { name: 'Chidi Nwosu', role: 'Product Manager', dept: 'Product', email: 'chidi@company.com' },
]

export default function BusinessBiblePage() {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = () => {
    setUploading(true)
    setTimeout(() => setUploading(false), 2000)
  }

  return (
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      <div className="mb-8 lg:ml-0 ml-12">
        <p className="section-label mb-1">Business Bible</p>
        <h1 className="text-2xl font-bold text-navy" style={{ letterSpacing: '-0.02em' }}>
          Company knowledge base
        </h1>
        <p className="text-midgray text-sm mt-1">
          Upload the document that teaches Haelo how your business operates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Bible */}
          <div className="card">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-lime mb-1">Current version</p>
                <h2 className="text-base font-bold text-navy">Company_Business_Bible_v3.pdf</h2>
              </div>
              <span className="badge-lime">Active</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-offwhite rounded-lg p-3">
                <p className="text-xl font-bold text-navy">24</p>
                <p className="text-xs text-midgray mt-0.5">Pages</p>
              </div>
              <div className="bg-offwhite rounded-lg p-3">
                <p className="text-xl font-bold text-navy">47</p>
                <p className="text-xs text-midgray mt-0.5">Staff identified</p>
              </div>
              <div className="bg-offwhite rounded-lg p-3">
                <p className="text-xl font-bold text-navy">38s</p>
                <p className="text-xs text-midgray mt-0.5">Processing time</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-midgray mb-5">
              <Clock size={13} />
              Uploaded Jun 18, 2026 · 9:14 AM
              <CheckCircle size={13} className="text-lime ml-2" />
              Processed successfully
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary text-sm">
                <RefreshCw size={14} />
                Replace Bible
              </button>
              <button className="btn-ghost text-sm">
                <FileText size={14} />
                Preview
              </button>
              <button className="btn-ghost text-sm">
                <Download size={14} />
                Download template
              </button>
            </div>
          </div>

          {/* Upload new */}
          <div className="card">
            <h2 className="text-base font-bold text-navy mb-4">Upload new version</h2>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload() }}
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer ${
                dragOver ? 'border-lime bg-lime/5' : 'border-border hover:border-lime/40 hover:bg-offwhite'
              }`}
              onClick={handleUpload}
            >
              <div className="w-12 h-12 bg-lime/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload size={22} className="text-lime" />
              </div>
              {uploading ? (
                <>
                  <p className="text-sm font-bold text-navy mb-1">Processing your Business Bible...</p>
                  <p className="text-xs text-midgray">This usually takes under 60 seconds.</p>
                  <div className="mt-4 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-lime rounded-full animate-pulse" style={{ width: '60%' }} />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-navy mb-1">Drop your file here, or click to browse</p>
                  <p className="text-xs text-midgray">PDF or Word document · Up to 50 pages</p>
                </>
              )}
            </div>
          </div>

          {/* Identified staff */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-navy">Staff identified from Bible</h2>
              <span className="badge-lime">{identifiedStaff.length} found</span>
            </div>
            <div className="space-y-3">
              {identifiedStaff.map((s) => (
                <div key={s.email} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy">{s.name}</p>
                    <p className="text-xs text-midgray">{s.role} · {s.dept}</p>
                  </div>
                  <p className="text-xs text-silver hidden sm:block">{s.email}</p>
                  <CheckCircle size={14} className="text-lime shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: version history + guidance */}
        <div className="space-y-5">
          {/* Version history */}
          <div className="card">
            <h2 className="text-sm font-bold text-navy mb-4">Version history</h2>
            <div className="space-y-3">
              {versionHistory.map((v) => (
                <div key={v.version} className={`flex items-start gap-3 p-3 rounded-lg ${v.active ? 'bg-lime/5 border border-lime/20' : 'bg-offwhite'}`}>
                  <FileText size={15} className={v.active ? 'text-lime' : 'text-silver'} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-navy">{v.version}</p>
                      {v.active && <span className="badge-lime text-xs">Active</span>}
                    </div>
                    <p className="text-xs text-midgray">{v.date} · {v.pages}pp · {v.staff} staff</p>
                  </div>
                  {!v.active && (
                    <button className="text-xs text-lime hover:underline font-bold shrink-0">Restore</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* What to include */}
          <div className="card">
            <h2 className="text-sm font-bold text-navy mb-3">What to include</h2>
            <ul className="space-y-2">
              {[
                'Company overview and services',
                'Organisational structure',
                'Full staff directory with roles',
                'Standard operating procedures',
                'Decision-making rules',
                'Communication preferences',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-midgray">
                  <CheckCircle size={12} className="text-lime shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full justify-center mt-4 text-xs">
              <Download size={13} />
              Download template
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
