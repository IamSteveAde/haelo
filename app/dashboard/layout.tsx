import type { Metadata } from 'next'
import DashboardSidebar from '@/components/dashboard/Sidebar'

export const metadata: Metadata = {
  title: 'Haelo Dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-offwhite">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
