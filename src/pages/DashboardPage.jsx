import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Truck, Wrench } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const initialKpis = [
  { label: 'Assets Available', value: 84, tone: 'status-success', key: 'available' },
  { label: 'Assets Allocated', value: 32, tone: 'primary', key: 'allocated' },
  { label: 'Maintenance Today', value: 6, tone: 'status-warning', key: 'maintenance' },
  { label: 'Active Bookings', value: 14, tone: 'secondary', key: 'bookings' },
  { label: 'Pending Transfers', value: 5, tone: 'status-warning', key: 'transfers' },
  { label: 'Upcoming Returns', value: 11, tone: 'surface-tint', key: 'returns' },
]

const overdueReturns = [
  { asset: 'Laptop AF-0114', holder: 'Priya Mehta', due: 'Today, 11:00' },
  { asset: 'Phone AF-0088', holder: 'Kunal Rai', due: 'Yesterday' },
]

const upcomingReturns = [
  { asset: 'Tablet AF-0032', holder: 'Leah Park', due: 'Tomorrow, 09:00' },
  { asset: 'Projector AF-0015', holder: 'Nina Ford', due: 'Wed, 14:00' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [kpis, setKpis] = useState(initialKpis)

  useEffect(() => {
    if (!supabase) return

    let mounted = true

    async function loadDashboardData() {
      const [assetsResult, bookingsResult, maintenanceResult, allocationsResult] = await Promise.all([
        supabase.from('assets').select('status').order('created_at', { ascending: false }),
        supabase.from('bookings').select('id').order('start_time', { ascending: false }),
        supabase.from('maintenance_requests').select('status').order('created_at', { ascending: false }),
        supabase.from('allocations').select('status').order('created_at', { ascending: false }),
      ])

      if (!mounted) return

      const available = !assetsResult.error
        ? assetsResult.data.filter((item) => String(item.status).toLowerCase().includes('available')).length
        : kpis.find((item) => item.key === 'available')?.value ?? 0
      const allocated = !assetsResult.error
        ? assetsResult.data.filter((item) => String(item.status).toLowerCase().includes('allocated')).length
        : kpis.find((item) => item.key === 'allocated')?.value ?? 0
      const bookings = !bookingsResult.error ? bookingsResult.data.length : kpis.find((item) => item.key === 'bookings')?.value ?? 0
      const maintenance = !maintenanceResult.error ? maintenanceResult.data.filter((item) => String(item.status).toLowerCase().includes('pending')).length : kpis.find((item) => item.key === 'maintenance')?.value ?? 0
      const transfers = !allocationsResult.error ? allocationsResult.data.filter((item) => String(item.status).toLowerCase().includes('pending')).length : kpis.find((item) => item.key === 'transfers')?.value ?? 0

      setKpis((current) =>
        current.map((item) => {
          if (item.key === 'available') return { ...item, value: available }
          if (item.key === 'allocated') return { ...item, value: allocated }
          if (item.key === 'bookings') return { ...item, value: bookings }
          if (item.key === 'maintenance') return { ...item, value: maintenance }
          if (item.key === 'transfers') return { ...item, value: transfers }
          return item
        }),
      )
    }

    loadDashboardData()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Operational snapshot</p>
            <h1 className="text-3xl font-semibold text-on-surface">Dashboard</h1>
          </div>
          <div className="rounded-2xl bg-surface p-3 text-on-surface">Updated just now</div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {kpis.map((item) => (
            <div key={item.label} className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_30%)] opacity-80 blur-2xl animate-glow" />
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-secondary/15 blur-3xl animate-glow" />
              <div className="relative">
                <p className="text-label-sm text-on-surface-variant">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-on-surface">{item.value}</p>
                <div className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${item.tone === 'primary' ? 'bg-primary/10 text-primary' : item.tone === 'secondary' ? 'bg-secondary/10 text-secondary' : item.tone === 'status-success' ? 'bg-status-success/15 text-status-success' : item.tone === 'status-warning' ? 'bg-status-warning/15 text-status-warning' : 'bg-surface-tint/15 text-surface-tint'}`}>
                  Live
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl bg-surface p-6 border border-border-gray">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_28%)] opacity-90 blur-3xl animate-glow" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-primary/10 blur-3xl animate-glow" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Quick actions</p>
              <h2 className="text-xl font-semibold text-on-surface">Take action</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => navigate('/assets')}
                className="rounded-2xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles size={16} /> Register Asset
              </button>
              <button
                type="button"
                onClick={() => navigate('/bookings')}
                className="rounded-2xl bg-secondary px-4 py-3 text-white font-semibold hover:bg-secondary/90 transition transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-sm"
              >
                <Truck size={16} /> Book Resource
              </button>
              <button
                type="button"
                onClick={() => navigate('/maintenance')}
                className="rounded-2xl bg-status-warning px-4 py-3 text-white font-semibold hover:bg-status-warning/90 transition transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-sm"
              >
                <Wrench size={16} /> Raise Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Return management</p>
              <h2 className="text-xl font-semibold text-on-surface">Overdue & upcoming returns</h2>
            </div>
            <span className="rounded-full bg-status-error/10 px-3 py-1 text-sm font-medium text-status-error">2 overdue</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-on-surface mb-3">Overdue returns</p>
              <div className="space-y-3">
                {overdueReturns.map((item) => (
                  <div key={item.asset} className="rounded-3xl bg-status-error/10 border border-status-error/20 p-4">
                    <p className="font-medium text-on-surface">{item.asset}</p>
                    <p className="text-sm text-on-surface-variant">Held by {item.holder}</p>
                    <p className="mt-2 text-sm text-status-error">Due {item.due}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface mb-3">Upcoming returns</p>
              <div className="space-y-3">
                {upcomingReturns.map((item) => (
                  <div key={item.asset} className="rounded-3xl bg-surface p-4 border border-border-gray">
                    <p className="font-medium text-on-surface">{item.asset}</p>
                    <p className="text-sm text-on-surface-variant">Held by {item.holder}</p>
                    <p className="mt-2 text-sm text-on-surface-variant">Due {item.due}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Operational notes</p>
              <h2 className="text-xl font-semibold text-on-surface">Team focus</h2>
            </div>
            <div className="inline-flex rounded-full bg-surface-container-lowest px-3 py-1 text-sm font-medium text-on-surface-variant">
              4 alerts
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-surface p-4 border border-border-gray">
              <p className="font-medium text-on-surface">Asset transfer request pending approval for Branch 3.</p>
            </div>
            <div className="rounded-3xl bg-surface p-4 border border-border-gray">
              <p className="font-medium text-on-surface">3 bookings need confirmation for tomorrow.</p>
            </div>
            <div className="rounded-3xl bg-surface p-4 border border-border-gray">
              <p className="font-medium text-on-surface">Audit cycle closing in 2 days for Warehouse 1.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
