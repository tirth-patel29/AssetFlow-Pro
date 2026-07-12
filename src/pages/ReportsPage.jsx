import { useEffect, useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'
import { supabase } from '../lib/supabaseClient'

const COLORS = ['#4f46e5', '#2563eb', '#f59e0b', '#10b981']

export default function ReportsPage() {
  const [assetStats, setAssetStats] = useState({ total: 0, available: 0, allocated: 0, maintenance: 0, reserved: 0 })
  const [allocationCount, setAllocationCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadReportData() {
      setLoading(true)
      const [assetResult, allocationResult] = await Promise.all([
        supabase.from('assets').select('status', { count: 'exact' }),
        supabase.from('allocations').select('id', { count: 'exact' }),
      ])

      if (!mounted) return

      const statusCounts = {
        available: 0,
        allocated: 0,
        'under maintenance': 0,
        reserved: 0,
      }
      let totalAssets = 0

      if (!assetResult.error && assetResult.data) {
        totalAssets = assetResult.count ?? assetResult.data.length
        assetResult.data.forEach((asset) => {
          const statusKey = (asset.status ?? '').toString().toLowerCase()
          if (statusKey.includes('maintenance')) {
            statusCounts['under maintenance'] += 1
          } else if (statusKey.includes('allocated') || statusKey.includes('in use') || statusKey.includes('assigned')) {
            statusCounts.allocated += 1
          } else if (statusKey.includes('reserved')) {
            statusCounts.reserved += 1
          } else {
            statusCounts.available += 1
          }
        })
      }

      if (!allocationResult.error && allocationResult.count !== null) {
        setAllocationCount(allocationResult.count)
      }

      setAssetStats({
        total: totalAssets,
        available: statusCounts.available,
        allocated: statusCounts.allocated,
        maintenance: statusCounts['under maintenance'],
        reserved: statusCounts.reserved,
      })
      setLoading(false)
    }

    loadReportData()

    return () => {
      mounted = false
    }
  }, [])

  const reportSummary = useMemo(() => {
    const utilization = assetStats.total > 0 ? Math.round((assetStats.allocated / assetStats.total) * 100) : 0
    const maintenance = assetStats.total > 0 ? Math.round((assetStats.maintenance / assetStats.total) * 100) : 0
    const health = assetStats.total > 0 ? Math.max(0, 100 - utilization - maintenance) : 100

    return [
      { label: 'Utilization', value: utilization, hint: 'Active asset usage' },
      { label: 'Maintenance', value: maintenance, hint: 'Pending work orders' },
      { label: 'Asset health', value: health, hint: 'Healthy asset ratio' },
    ]
  }, [assetStats])

  const pieData = useMemo(() => [
    { name: 'Available', value: assetStats.available },
    { name: 'Allocated', value: assetStats.allocated },
    { name: 'Under maintenance', value: assetStats.maintenance },
    { name: 'Reserved', value: assetStats.reserved },
  ], [assetStats])

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Reports</p>
            <h1 className="text-2xl font-semibold text-on-surface">Analytics</h1>
          </div>
          <div className="rounded-full bg-surface-container-low px-4 py-2 text-sm text-on-surface-variant">
            {loading ? 'Loading...' : `${assetStats.total} assets • ${allocationCount} allocations`}
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {reportSummary.map((item) => (
            <div key={item.label} className="rounded-3xl bg-surface-container-lowest p-5 border border-border-gray">
              <p className="text-label-sm text-on-surface-variant">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-on-surface">{item.value}{item.label !== 'Asset health' ? '%' : ''}</p>
              <p className="mt-2 text-sm text-on-surface-variant">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Asset distribution</p>
            <h2 className="text-xl font-semibold text-on-surface">Fleet status breakdown</h2>
          </div>
          <span className="rounded-full bg-surface-container-low px-3 py-1 text-sm text-on-surface-variant">Last 30 days</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_auto] items-center">
          <div className="h-[320px] w-full rounded-3xl bg-surface-container-lowest p-4 border border-border-gray shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={72}
                  outerRadius={106}
                  paddingAngle={4}
                  stroke="transparent"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(15,23,42,0.08)',
                    borderRadius: 16,
                    boxShadow: '0 16px 40px rgba(15,23,42,0.08)',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ paddingTop: 20 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 rounded-3xl bg-surface-container-lowest p-5 border border-border-gray shadow-sm">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="inline-flex h-3.5 w-3.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <div>
                  <p className="font-medium text-on-surface">{item.name}</p>
                  <p className="text-sm text-on-surface-variant">{item.value} assets</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
