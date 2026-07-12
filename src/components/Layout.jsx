import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Bell, Home, Box, ClipboardList, Wrench, CalendarDays, BarChart3, Users, Shield, ChevronDown } from 'lucide-react'
import { signOut } from '../lib/auth'
import { useAuth } from './AuthProvider'
import { useEffect, useState } from 'react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  {
    to: '/assets',
    label: 'Assets',
    icon: Box,
    children: [
      { to: '/assets', label: 'Asset Directory', icon: Box },
      { to: '/assets/allocation', label: 'Allocations', icon: ClipboardList },
    ],
  },
  { to: '/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/audits', label: 'Audits', icon: Shield },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/organization-setup', label: 'Organization', icon: Users },
]

function BrandLogo() {
  return (
    <img
      src="/favicon.svg"
      alt="AssetFlow"
      className="h-10 w-10 rounded-xl bg-surface p-2 shadow-sm"
    />
  )
}

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, profile } = useAuth()
  const [assetMenuOpen, setAssetMenuOpen] = useState(false)

  useEffect(() => {
    if (location.pathname.startsWith('/assets')) {
      setAssetMenuOpen(true)
    }
  }, [location.pathname])

  async function handleLogout() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen">
<aside className="hidden lg:flex flex-col w-[280px] bg-[rgba(255,255,255,0.16)] border border-white/20 backdrop-blur-3xl shadow-[0_40px_90px_rgba(15,23,42,0.12)] p-6 transition duration-300 hover:-translate-y-0.5">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <BrandLogo />
                <div>
                  <p className="font-headline-sm font-bold text-on-surface">AssetFlow</p>
                  <p className="font-caption text-on-surface-variant">Enterprise Asset ERP</p>
                </div>
              </div>
              <div className="rounded-2xl bg-surface p-4 border border-border-gray">
                <p className="font-label-sm text-on-surface-variant">Role</p>
                <p className="font-body-md text-on-surface">{profile?.role ?? 'Employee'}</p>
              </div>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isAssetGroup = Array.isArray(item.children)
                const isActiveGroup = location.pathname.startsWith(item.to)

                if (isAssetGroup) {
                  return (
                    <div key={item.to} className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAssetMenuOpen((current) => !current)
                          navigate(item.to)
                        }}
                        className={`group flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition duration-200 ${
                          isActiveGroup
                            ? 'bg-white/20 text-primary shadow-[0_20px_50px_rgba(59,130,246,0.12)] backdrop-blur-xl'
                            : 'text-on-surface hover:bg-white/20 hover:text-primary hover:-translate-y-0.5'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={18} className="transition duration-200 group-hover:scale-110" />
                          <span className="font-medium transition duration-200 group-hover:translate-x-1">{item.label}</span>
                        </span>
                        <ChevronDown
                          size={18}
                          className={`transition duration-200 ${assetMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                        />
                      </button>
                      {assetMenuOpen && (
                        <div className="space-y-1 pl-10">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon
                            return (
                              <NavLink
                                key={child.to}
                                to={child.to}
                                className={({ isActive }) =>
                                  `group flex items-center gap-3 rounded-2xl px-4 py-3 transition duration-200 ${
                                    isActive
                                      ? 'bg-white/15 text-primary shadow-sm backdrop-blur-xl'
                                      : 'text-on-surface hover:bg-white/15 hover:text-primary'
                                  }`
                                }
                              >
                                <ChildIcon size={16} className="transition duration-200 group-hover:scale-110" />
                                <span className="font-medium transition duration-200 group-hover:translate-x-1">{child.label}</span>
                              </NavLink>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

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
          <header className="sticky top-0 z-20 h-[64px] bg-[rgba(255,255,255,0.18)] border-b border-white/15 backdrop-blur-3xl flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-[0_15px_40px_rgba(15,23,42,0.12)]">
            <div className="text-primary font-bold text-lg">Dashboard</div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl bg-surface hover:bg-surface-container transition">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">3</span>
              </button>
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="font-medium text-on-surface">{profile?.full_name ?? user?.email ?? 'User'}</span>
                <span className="text-xs text-on-surface-variant">{profile?.role ?? 'Employee'}</span>
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
