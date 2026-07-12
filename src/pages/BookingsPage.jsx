export default function BookingsPage() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Bookings</p>
          <h1 className="text-2xl font-semibold text-on-surface">Resource reservations</h1>
        </div>
        <button className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition">
          New booking
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
              <th className="py-4">Resource</th>
              <th className="py-4">Booked by</th>
              <th className="py-4">Start</th>
              <th className="py-4">End</th>
              <th className="py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            <tr className="hover:bg-surface transition">
              <td className="py-4">Meeting Room 2</td>
              <td className="py-4">Emma Reed</td>
              <td className="py-4">Today 11:00</td>
              <td className="py-4">Today 12:00</td>
              <td className="py-4">
                <span className="inline-flex rounded-full bg-secondary-container/15 px-3 py-1 text-secondary text-sm font-medium">Confirmed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
