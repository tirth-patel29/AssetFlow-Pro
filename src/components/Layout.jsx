import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, Home, Box, ClipboardList, ClipboardCheck, Layers, BarChart3, Users, Shield, Sparkles } from 'lucide-react'
import { signOut } from '../lib/auth'
import { useAuth } from './AuthProvider'

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
  const navigate = useNavigate()
  const { user, profile } = useAuth()

  async function handleLogout() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex flex-col w-[260px] bg-surface-container-lowest border-r border-border-gray p-6 transition duration-300 hover:-translate-y-0.5">
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
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl px-4 py-3 transition duration-200 ${
                      isActive
                        ? 'bg-primary text-white shadow-[0_20px_50px_rgba(59,130,246,0.12)]'
                        : 'text-on-surface hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5'
                    }`
                  }
                >
                  <Icon size={18} className="transition duration-200 group-hover:scale-110" />
                  <span className="font-medium transition duration-200 group-hover:translate-x-1">{item.label}</span>
                </NavLink>
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
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="font-medium text-on-surface">{profile?.full_name ?? user?.email ?? 'User'}</span>
                <button onClick={handleLogout} className="text-sm text-primary hover:underline">
                  Sign out
                </button>
              </div>
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
