export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Reports</p>
            <h1 className="text-2xl font-semibold text-on-surface">Analytics</h1>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
            <p className="text-label-sm text-on-surface-variant">Utilization</p>
            <p className="mt-3 text-3xl font-semibold text-on-surface">78%</p>
          </div>
          <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
            <p className="text-label-sm text-on-surface-variant">Maintenance</p>
            <p className="mt-3 text-3xl font-semibold text-on-surface">12%</p>
          </div>
          <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
            <p className="text-label-sm text-on-surface-variant">Asset health</p>
            <p className="mt-3 text-3xl font-semibold text-on-surface">High</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Trends</p>
          <span className="text-sm text-on-surface-variant">Last 30 days</span>
        </div>
        <div className="h-[300px] rounded-3xl bg-surface-container-low p-4 flex items-center justify-center text-on-surface-variant">
          Chart placeholder
        </div>
      </div>
    </div>
  )
}
