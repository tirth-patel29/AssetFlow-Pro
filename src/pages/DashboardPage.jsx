export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Welcome back</p>
            <h1 className="text-3xl font-semibold text-on-surface">Dashboard</h1>
          </div>
          <div className="rounded-2xl bg-surface p-3 text-on-surface">Today</div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
            <p className="text-label-sm text-on-surface-variant">Total assets</p>
            <p className="mt-3 text-3xl font-semibold text-on-surface">128</p>
          </div>
          <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
            <p className="text-label-sm text-on-surface-variant">Active allocations</p>
            <p className="mt-3 text-3xl font-semibold text-on-surface">42</p>
          </div>
          <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
            <p className="text-label-sm text-on-surface-variant">Pending maintenance</p>
            <p className="mt-3 text-3xl font-semibold text-on-surface">7</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Allocation overview</p>
              <h2 className="text-xl font-semibold text-on-surface">Recent activity</h2>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-surface p-4">
              <p className="text-sm text-on-surface">Laptop AF-0042 returned by Jordan.</p>
            </div>
            <div className="rounded-2xl bg-surface p-4">
              <p className="text-sm text-on-surface">Maintenance approved for Printer 7.</p>
            </div>
            <div className="rounded-2xl bg-surface p-4">
              <p className="text-sm text-on-surface">Booking conflict resolved for meeting room.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Audit cycle</p>
              <h2 className="text-xl font-semibold text-on-surface">Open reviews</h2>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-surface-container-lowest p-4 border border-border-gray">
              <p className="font-medium text-on-surface">Quarterly hardware audit</p>
              <p className="text-sm text-on-surface-variant mt-1">12 assets pending verification.</p>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-4 border border-border-gray">
              <p className="font-medium text-on-surface">Scheduled maintenance review</p>
              <p className="text-sm text-on-surface-variant mt-1">3 requests awaiting approval.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
