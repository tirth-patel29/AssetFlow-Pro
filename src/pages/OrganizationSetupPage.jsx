export default function OrganizationSetupPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Organization setup</p>
            <h1 className="text-2xl font-semibold text-on-surface">Employee directory</h1>
          </div>
          <button className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition">
            Add member
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
                <th className="py-4">Name</th>
                <th className="py-4">Department</th>
                <th className="py-4">Role</th>
                <th className="py-4">Status</th>
                <th className="py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray">
              <tr className="hover:bg-surface transition">
                <td className="py-4">Alex Kim</td>
                <td className="py-4">Facilities</td>
                <td className="py-4">Employee</td>
                <td className="py-4">
                  <span className="inline-flex rounded-full bg-status-success/15 px-3 py-1 text-status-success text-sm font-medium">Active</span>
                </td>
                <td className="py-4">
                  <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">Promote</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
