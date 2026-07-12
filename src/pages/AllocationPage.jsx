export default function AllocationPage() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Allocation management</p>
          <h1 className="text-2xl font-semibold text-on-surface">Asset transfers</h1>
        </div>
        <button className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition">
          New transfer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
              <th className="py-4">Asset</th>
              <th className="py-4">Current holder</th>
              <th className="py-4">Requested by</th>
              <th className="py-4">Status</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            <tr className="hover:bg-surface transition">
              <td className="py-4">Laptop AF-0021</td>
              <td className="py-4">Morgan Shaw</td>
              <td className="py-4">Avery Cole</td>
              <td className="py-4">
                <span className="inline-flex rounded-full bg-status-warning/15 px-3 py-1 text-status-warning text-sm font-medium">Requested</span>
              </td>
              <td className="py-4">
                <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">Review</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
