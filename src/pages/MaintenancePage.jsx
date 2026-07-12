import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const priorityOptions = ['Low', 'Medium', 'High', 'Critical']
const statusOptions = ['Pending', 'In progress', 'Resolved', 'Closed']

const defaultRequests = [
  { request: 'Replace battery', asset: 'Laptop AF-0042', priority: 'High', status: 'Pending' },
]

export default function MaintenancePage() {
  const [requests, setRequests] = useState(defaultRequests)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [request, setRequest] = useState('')
  const [asset, setAsset] = useState('')
  const [priority, setPriority] = useState(priorityOptions[1])
  const [status, setStatus] = useState(statusOptions[0])
  const [assetOptions, setAssetOptions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return

    let mounted = true

    async function loadData() {
      const [requestsResult, assetsResult] = await Promise.all([
        supabase
          .from('maintenance_requests')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('assets')
          .select('*')
          .order('created_at', { ascending: false }),
      ])

      if (!mounted) return

      if (!assetsResult.error && assetsResult.data?.length) {
        setAssetOptions(
          assetsResult.data
            .map((item) => item.name ?? item.asset_name ?? item.resource ?? item.tag ?? item.asset_tag ?? 'Unknown asset')
            .filter(Boolean),
        )
      }

      if (!requestsResult.error && requestsResult.data?.length) {
        setRequests(
          requestsResult.data.map((item) => ({
            request: item.request ?? item.title ?? 'Maintenance request',
            asset: item.asset_name ?? item.asset ?? 'Unknown asset',
            priority: item.priority ?? item.severity ?? 'Medium',
            status: item.status ?? item.state ?? 'Pending',
          })),
        )
      }

      if (requestsResult.error && !['PGRST116', '42P01'].includes(requestsResult.error.code)) {
        console.warn('Unable to load maintenance requests:', requestsResult.error.message)
      }

      if (assetsResult.error && !['PGRST116', '42P01'].includes(assetsResult.error.code)) {
        console.warn('Unable to load assets for maintenance:', assetsResult.error.message)
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [])

  async function handleCreateRequest(event) {
    event.preventDefault()
    setError('')

    const newRequest = {
      request,
      asset_name: asset,
      priority,
      status,
    }

    if (supabase) {
      const { data, error: insertError } = await supabase
        .from('maintenance_requests')
        .insert(newRequest)
        .select('*')
        .single()

      if (insertError) {
        console.error('Unable to save maintenance request:', insertError.message)
        setError('Unable to save request right now. Please try again.')
        return
      }

      setRequests((current) => [
        {
          request: data.request ?? request,
          asset: data.asset_name ?? data.asset ?? asset,
          priority: data.priority ?? data.severity ?? priority,
          status: data.status ?? status,
        },
        ...current,
      ])
    } else {
      setRequests((current) => [
        { request, asset, priority, status },
        ...current,
      ])
    }

    setRequest('')
    setAsset('')
    setPriority(priorityOptions[1])
    setStatus(statusOptions[0])
    setShowRequestForm(false)
  }

  const pendingCount = useMemo(
    () => requests.filter((item) => item.status.toLowerCase().includes('pending')).length,
    [requests],
  )
  const inProgressCount = useMemo(
    () => requests.filter((item) => item.status.toLowerCase().includes('progress')).length,
    [requests],
  )
  const resolvedCount = useMemo(
    () => requests.filter((item) => ['resolved', 'complete', 'closed'].some((status) => item.status.toLowerCase().includes(status))).length,
    [requests],
  )

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Maintenance</p>
          <h1 className="text-2xl font-semibold text-on-surface">Work orders</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowRequestForm((value) => !value)}
          className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition"
        >
          {showRequestForm ? 'Hide form' : 'New request'}
        </button>
      </div>

      {showRequestForm && (
        <form className="space-y-4 rounded-3xl bg-surface-container-lowest p-6 border border-border-gray mb-6" onSubmit={handleCreateRequest}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Request</label>
              <input
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                required
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-2">Asset</label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                required
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select an asset</option>
                {assetOptions.length > 0 ? (
                  assetOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))
                ) : (
                  <option value="">No assets available</option>
                )}
              </select>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
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
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowRequestForm(false)} className="rounded-xl border border-border-gray px-5 py-3 text-body-md text-on-surface hover:bg-surface transition">
              Cancel
            </button>
            <button className="rounded-xl bg-secondary px-5 py-3 text-white font-semibold hover:bg-secondary/90 transition" type="submit">
              Create request
            </button>
          </div>
          {error && <div className="text-sm text-status-error">{error}</div>}
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Pending</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">{pendingCount}</p>
        </div>
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">In progress</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">{inProgressCount}</p>
        </div>
        <div className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
          <p className="text-label-sm text-on-surface-variant">Resolved</p>
          <p className="mt-3 text-3xl font-semibold text-on-surface">{resolvedCount}</p>
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
            {requests.map((item) => (
              <tr key={`${item.request}-${item.asset}`} className="hover:bg-surface transition">
                <td className="py-4">{item.request}</td>
                <td className="py-4">{item.asset}</td>
                <td className="py-4">{item.priority}</td>
                <td className="py-4">
                  <span className="inline-flex rounded-full bg-status-warning/15 px-3 py-1 text-status-warning text-sm font-medium">{item.status}</span>
                </td>
                <td className="py-4">
                  <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
