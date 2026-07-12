export default function AssetsPage() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Asset directory</p>
          <h1 className="text-2xl font-semibold text-on-surface">Assets</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Search assets"
          />
          <button className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition">
            New asset
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
              <th className="py-4">Asset</th>
              <th className="py-4">Category</th>
              <th className="py-4">Status</th>
              <th className="py-4">Location</th>
              <th className="py-4">Tag</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            <tr className="hover:bg-surface transition">
              <td className="py-4">Laptop AF-0042</td>
              <td className="py-4">Electronics</td>
              <td className="py-4">
                <span className="inline-flex rounded-full bg-status-success/15 px-3 py-1 text-status-success text-sm font-medium">Available</span>
              </td>
              <td className="py-4">HQ - 3rd Floor</td>
              <td className="py-4">AF-0042</td>
              <td className="py-4">
                <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">View</button>
              </td>
            </tr>
            <tr className="hover:bg-surface transition">
              <td className="py-4">Projector AF-0015</td>
              <td className="py-4">AV</td>
              <td className="py-4">
                <span className="inline-flex rounded-full bg-status-warning/15 px-3 py-1 text-status-warning text-sm font-medium">Reserved</span>
              </td>
              <td className="py-4">Conference Room 2</td>
              <td className="py-4">AF-0015</td>
              <td className="py-4">
                <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
