import { Link, Outlet } from 'react-router-dom'
import { Bell, Home, Box, ClipboardList, ClipboardCheck, Layers, BarChart3, Users, Shield, Sparkles } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/assets', label: 'Assets', icon: Box },
  { to: '/assets/allocation', label: 'Allocations', icon: ClipboardList },
  { to: '/maintenance', label: 'Maintenance', icon: ClipboardCheck },
  { to: '/bookings', label: 'Bookings', icon: Layers },
  { to: '/audits', label: 'Audits', icon: Shield },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/organization-setup', label: 'Organization', icon: Users },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex flex-col w-[260px] bg-surface-container-lowest border-r border-border-gray p-6">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="font-headline-sm font-bold text-on-surface">AssetFlow</p>
                <p className="font-caption text-on-surface-variant">Enterprise Asset ERP</p>
              </div>
            </div>
            <div className="rounded-2xl bg-surface p-4 border border-border-gray">
              <p className="font-label-sm text-on-surface-variant">Role</p>
              <p className="font-body-md text-on-surface">Employee</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-on-surface hover:bg-surface hover:text-primary transition"
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-20 h-[64px] bg-white border-b border-border-gray flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="text-primary font-bold text-lg">Dashboard</div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl bg-surface hover:bg-surface-container transition">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">3</span>
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
