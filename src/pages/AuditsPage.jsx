import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const statusOptions = ['Active', 'Completed', 'Scheduled']

const defaultAudits = [
  { status: 'Active', discrepancies: 2 },
  { status: 'Completed', discrepancies: 0 },
]

export default function AuditsPage() {
  const [auditCycles, setAuditCycles] = useState(defaultAudits)
  const [showAuditForm, setShowAuditForm] = useState(false)
  const [status, setStatus] = useState(statusOptions[0])
  const [discrepancies, setDiscrepancies] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return

    let mounted = true

    async function loadAudits() {
      const { data, error } = await supabase
        .from('audits')
        .select('*')
        .order('created_at', { ascending: false })

      if (!mounted) return

      if (!error && data?.length) {
        setAuditCycles(
          data.map((item) => ({
            status: item.status ?? item.state ?? 'Active',
            discrepancies: item.discrepancies ?? item.discrepancy_count ?? 0,
          })),
        )
      }

      if (error && !['PGRST116', '42P01'].includes(error.code)) {
        console.warn('Unable to load audits:', error.message)
      }
    }

    loadAudits()

    return () => {
      mounted = false
    }
  }, [])

  async function handleCreateAudit(event) {
    event.preventDefault()
    setError('')

    const newAudit = {
      status,
      discrepancies: Number(discrepancies),
    }

    if (supabase) {
      const { data, error: insertError } = await supabase
        .from('audits')
        .insert(newAudit)
        .select('*')
        .single()

      if (insertError) {
        console.error('Unable to save audit cycle:', insertError.message)
        setError('Unable to create audit cycle right now. Please try again.')
        return
      }

      setAuditCycles((current) => [
        {
          status: data.status ?? status,
          discrepancies: data.discrepancies ?? data.discrepancy_count ?? Number(discrepancies),
        },
        ...current,
      ])
    } else {
      setAuditCycles((current) => [
        { status, discrepancies: Number(discrepancies) },
        ...current,
      ])
    }

    setStatus(statusOptions[0])
    setDiscrepancies(0)
    setShowAuditForm(false)
  }

  const activeCount = useMemo(
    () => auditCycles.filter((cycle) => cycle.status.toLowerCase().includes('active')).length,
    [auditCycles],
  )
  const completedCount = useMemo(
    () => auditCycles.filter((cycle) => cycle.status.toLowerCase().includes('complete')).length,
    [auditCycles],
  )
  const discrepanciesCount = useMemo(
    () => auditCycles.reduce((sum, item) => sum + Number(item.discrepancies || 0), 0),
    [auditCycles],
  )

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Audits</p>
          <h1 className="text-2xl font-semibold text-on-surface">Audit cycles</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowAuditForm((value) => !value)}
          className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition"
        >
          {showAuditForm ? 'Hide form' : 'New audit cycle'}
        </button>
      </div>

      {showAuditForm && (
        <form className="space-y-4 rounded-3xl bg-surface-container-lowest p-6 border border-border-gray mb-6" onSubmit={handleCreateAudit}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-2">Discrepancies</label>
              <input
                type="number"
                min="0"
                value={discrepancies}
                onChange={(e) => setDiscrepancies(e.target.value)}
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAuditForm(false)}
              className="rounded-xl border border-border-gray px-5 py-3 text-body-md text-on-surface hover:bg-surface transition"
            >
              Cancel
            </button>
            <button className="rounded-xl bg-secondary px-5 py-3 text-white font-semibold hover:bg-secondary/90 transition" type="submit">
              Create audit cycle
            </button>
          </div>
          {error && <div className="text-sm text-status-error">{error}</div>}
        </form>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Active cycles</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">{activeCount}</p>
        </div>
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">{completedCount}</p>
        </div>
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Discrepancies</p>
          <p className="mt-3 text-3xl font-semibold text-status-error">{discrepanciesCount}</p>
        </div>
      </div>
    </div>
  )
}
