export default function MaintenancePage() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Maintenance</p>
          <h1 className="text-2xl font-semibold text-on-surface">Work orders</h1>
        </div>
        <button className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition">
          New request
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Pending</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">4</p>
        </div>
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">In progress</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">2</p>
        </div>
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Resolved</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">12</p>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
              <th className="py-4">Request</th>
              <th className="py-4">Asset</th>
              <th className="py-4">Priority</th>
              <th className="py-4">Status</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            <tr className="hover:bg-surface transition">
              <td className="py-4">Replace battery</td>
              <td className="py-4">Laptop AF-0042</td>
              <td className="py-4">High</td>
              <td className="py-4">
                <span className="inline-flex rounded-full bg-status-warning/15 px-3 py-1 text-status-warning text-sm font-medium">Pending</span>
              </td>
              <td className="py-4">
                <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">Approve</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
