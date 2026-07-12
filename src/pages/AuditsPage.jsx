export default function AuditsPage() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Audits</p>
          <h1 className="text-2xl font-semibold text-on-surface">Audit cycles</h1>
        </div>
        <button className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition">
          New audit cycle
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Active cycles</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">2</p>
        </div>
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">7</p>
        </div>
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Discrepancies</p>
          <p className="mt-3 text-3xl font-semibold text-status-error">5</p>
        </div>
      </div>
    </div>
  )
}
