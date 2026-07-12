export default function NotificationsPage() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Notifications</p>
          <h1 className="text-2xl font-semibold text-on-surface">Activity log</h1>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-3xl bg-surface p-4">
          <p className="text-sm text-on-surface">Maintenance request approved for Printer 7.</p>
          <p className="text-xs text-on-surface-variant mt-2">2 hours ago</p>
        </div>
        <div className="rounded-3xl bg-surface p-4">
          <p className="text-sm text-on-surface">Booking confirmed for Meeting Room 1.</p>
          <p className="text-xs text-on-surface-variant mt-2">Yesterday</p>
        </div>
      </div>
    </div>
  )
}
