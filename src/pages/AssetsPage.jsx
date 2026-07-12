import { useMemo, useState } from 'react'
import { Plus, Search, Tag } from 'lucide-react'

const categoryOptions = ['Electronics', 'Furniture', 'Vehicles', 'AV', 'Software']
const statusOptions = ['Available', 'Allocated', 'Reserved', 'Under Maintenance', 'Lost', 'Retired']
const locationOptions = ['HQ - 3rd Floor', 'Conference Room 2', 'Warehouse A', 'Remote Office']

export default function AssetsPage() {
  const [assets, setAssets] = useState([
    { name: 'Laptop AF-0042', category: 'Electronics', tag: 'AF-0042', serial: 'LX-1290', status: 'Available', location: 'HQ - 3rd Floor' },
    { name: 'Projector AF-0015', category: 'AV', tag: 'AF-0015', serial: 'PJ-4021', status: 'Reserved', location: 'Conference Room 2' },
  ])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(categoryOptions[0])
  const [serial, setSerial] = useState('')
  const [location, setLocation] = useState(locationOptions[0])
  const [status, setStatus] = useState(statusOptions[0])

  const filteredAssets = useMemo(() => {
    if (!search.trim()) return assets
    return assets.filter((asset) =>
      [asset.name, asset.category, asset.tag, asset.serial, asset.status, asset.location]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
  }, [search, assets])

  function handleCreateAsset(event) {
    event.preventDefault()
    const nextTag = `AF-${String(assets.length + 1).padStart(4, '0')}`
    setAssets((current) => [
      ...current,
      { name, category, tag: nextTag, serial, status, location },
    ])
    setName('')
    setSerial('')
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Asset registration</p>
            <h1 className="text-2xl font-semibold text-on-surface">Asset directory</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowForm((value) => !value)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition"
            >
              <Plus size={16} /> {showForm ? 'Hide form' : 'Register asset'}
            </button>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border border-border-gray bg-surface pl-11 pr-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Search asset tag, serial, category..."
              />
            </div>
          </div>
        </div>

        {showForm && (
          <form className="space-y-6 rounded-3xl bg-surface-container-lowest p-6 border border-border-gray mb-6" onSubmit={handleCreateAsset}>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="block text-label-md text-on-surface mb-2">Asset name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">Serial number</label>
                <input
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
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
              <div className="flex items-end justify-end">
                <button className="rounded-xl bg-secondary px-5 py-3 text-white font-semibold hover:bg-secondary/90 transition" type="submit">
                  Create asset
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
                <th className="py-4">Asset</th>
                <th className="py-4">Category</th>
                <th className="py-4">Status</th>
                <th className="py-4">Location</th>
                <th className="py-4">Tag</th>
                <th className="py-4">Serial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray">
              {filteredAssets.map((asset) => (
                <tr key={asset.tag} className="hover:bg-surface transition">
                  <td className="py-4">{asset.name}</td>
                  <td className="py-4">{asset.category}</td>
                  <td className="py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${asset.status === 'Available' ? 'bg-status-success/15 text-status-success' : asset.status === 'Reserved' ? 'bg-status-warning/15 text-status-warning' : asset.status === 'Under Maintenance' ? 'bg-error-container/15 text-error' : 'bg-surface-tint/15 text-surface-tint'}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-4">{asset.location}</td>
                  <td className="py-4">{asset.tag}</td>
                  <td className="py-4">{asset.serial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
