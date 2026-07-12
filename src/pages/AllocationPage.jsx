import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const statusOptions = ['Requested', 'Approved', 'In transit', 'Delivered']

const defaultTransfers = [
  { asset: 'Laptop AF-0021', currentHolder: 'Morgan Shaw', requestedBy: 'Avery Cole', status: 'Requested' },
]

export default function AllocationPage() {
  const [transfers, setTransfers] = useState(defaultTransfers)
  const [showTransferForm, setShowTransferForm] = useState(false)
  const [asset, setAsset] = useState('')
  const [currentHolder, setCurrentHolder] = useState('')
  const [requestedBy, setRequestedBy] = useState('')
  const [status, setStatus] = useState(statusOptions[0])
  const [assetOptions, setAssetOptions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return

    let mounted = true

    async function loadData() {
      const [transfersResult, assetsResult] = await Promise.all([
        supabase.from('allocations').select('*').order('created_at', { ascending: false }),
        supabase.from('assets').select('name').order('created_at', { ascending: false }),
      ])

      if (!mounted) return

      if (!assetsResult.error && assetsResult.data?.length) {
        setAssetOptions(assetsResult.data.map((item) => item.name ?? ''))
      }

      if (!transfersResult.error && transfersResult.data?.length) {
        setTransfers(
          transfersResult.data.map((item) => ({
            asset: item.asset_name ?? item.asset ?? 'Asset',
            currentHolder: item.current_holder ?? item.current_user ?? 'Unknown',
            requestedBy: item.requested_by ?? item.requester ?? 'Requested by',
            status: item.status ?? item.state ?? 'Requested',
          })),
        )
      }

      if (transfersResult.error && !['PGRST116', '42P01'].includes(transfersResult.error.code)) {
        console.warn('Unable to load allocations:', transfersResult.error.message)
      }

      if (assetsResult.error && !['PGRST116', '42P01'].includes(assetsResult.error.code)) {
        console.warn('Unable to load assets for allocation:', assetsResult.error.message)
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [])

  async function handleCreateTransfer(event) {
    event.preventDefault()
    setError('')

    const newTransfer = {
      asset_name: asset,
      current_holder: currentHolder,
      requested_by: requestedBy,
      status,
    }

    if (supabase) {
      const { data, error: insertError } = await supabase
        .from('allocations')
        .insert(newTransfer)
        .select('*')
        .single()

      if (insertError) {
        console.error('Unable to save transfer:', insertError.message)
        setError('Unable to save transfer right now. Please try again.')
        return
      }

      setTransfers((current) => [
        {
          asset: data.asset_name ?? data.asset ?? asset,
          currentHolder: data.current_holder ?? data.current_user ?? currentHolder,
          requestedBy: data.requested_by ?? data.requester ?? requestedBy,
          status: data.status ?? status,
        },
        ...current,
      ])
    } else {
      setTransfers((current) => [
        {
          asset,
          currentHolder,
          requestedBy,
          status,
        },
        ...current,
      ])
    }

    setAsset('')
    setCurrentHolder('')
    setRequestedBy('')
    setStatus(statusOptions[0])
    setShowTransferForm(false)
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Allocation management</p>
          <h1 className="text-2xl font-semibold text-on-surface">Asset transfers</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowTransferForm((value) => !value)}
          className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition"
        >
          {showTransferForm ? 'Hide form' : 'New transfer'}
        </button>
      </div>

      {showTransferForm && (
        <form className="space-y-4 rounded-3xl bg-surface-container-lowest p-6 border border-border-gray mb-6" onSubmit={handleCreateTransfer}>
          <div className="grid gap-4 lg:grid-cols-2">
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
            <div>
              <label className="block text-label-md text-on-surface mb-2">Current holder</label>
              <input
                value={currentHolder}
                onChange={(e) => setCurrentHolder(e.target.value)}
                required
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Requested by</label>
              <input
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                required
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
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
            <button
              type="button"
              onClick={() => setShowTransferForm(false)}
              className="rounded-xl border border-border-gray px-5 py-3 text-body-md text-on-surface hover:bg-surface transition"
            >
              Cancel
            </button>
            <button className="rounded-xl bg-secondary px-5 py-3 text-white font-semibold hover:bg-secondary/90 transition" type="submit">
              Create transfer
            </button>
          </div>
          {error && <div className="text-sm text-status-error">{error}</div>}
        </form>
      )}

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
            {transfers.map((transfer, index) => (
              <tr key={`${transfer.asset}-${index}`} className="hover:bg-surface transition">
                <td className="py-4">{transfer.asset}</td>
                <td className="py-4">{transfer.currentHolder}</td>
                <td className="py-4">{transfer.requestedBy}</td>
                <td className="py-4">
                  <span className="inline-flex rounded-full bg-status-warning/15 px-3 py-1 text-status-warning text-sm font-medium">{transfer.status}</span>
                </td>
                <td className="py-4">
                  <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
