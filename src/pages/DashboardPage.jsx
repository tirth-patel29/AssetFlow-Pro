import { Sparkles, Truck, Wrench } from 'lucide-react'

const kpis = [
  { label: 'Assets Available', value: 84, tone: 'status-success' },
  { label: 'Assets Allocated', value: 32, tone: 'primary' },
  { label: 'Maintenance Today', value: 6, tone: 'status-warning' },
  { label: 'Active Bookings', value: 14, tone: 'secondary' },
  { label: 'Pending Transfers', value: 5, tone: 'status-warning' },
  { label: 'Upcoming Returns', value: 11, tone: 'surface-tint' },
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
            <div key={item.label} className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
              <p className="text-label-sm text-on-surface-variant">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-on-surface">{item.value}</p>
              <div className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${item.tone === 'primary' ? 'bg-primary/10 text-primary' : item.tone === 'secondary' ? 'bg-secondary/10 text-secondary' : item.tone === 'status-success' ? 'bg-status-success/15 text-status-success' : item.tone === 'status-warning' ? 'bg-status-warning/15 text-status-warning' : 'bg-surface-tint/15 text-surface-tint'}`}>
                Live
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-surface p-6 border border-border-gray">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Quick actions</p>
              <h2 className="text-xl font-semibold text-on-surface">Take action</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <button className="rounded-2xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2">
                <Sparkles size={16} /> Register Asset
              </button>
              <button className="rounded-2xl bg-secondary px-4 py-3 text-white font-semibold hover:bg-secondary/90 transition flex items-center justify-center gap-2">
                <Truck size={16} /> Book Resource
              </button>
              <button className="rounded-2xl bg-status-warning px-4 py-3 text-white font-semibold hover:bg-status-warning/90 transition flex items-center justify-center gap-2">
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
