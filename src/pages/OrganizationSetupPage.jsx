import { useMemo, useState } from 'react'
import { Plus, ShieldCheck, Layers, Users } from 'lucide-react'

const departments = [
  { name: 'Facilities', head: 'Alex Kim', parent: 'Corporate', status: 'Active' },
  { name: 'IT Services', head: 'Priya Mehta', parent: 'Corporate', status: 'Active' },
  { name: 'Logistics', head: 'Marcus Lee', parent: 'Operations', status: 'Inactive' },
]

const categories = [
  { name: 'Electronics', fields: 'Warranty period', status: 'Active' },
  { name: 'Furniture', fields: '-', status: 'Active' },
  { name: 'Vehicles', fields: 'Insurance expiry', status: 'Active' },
]

const employees = [
  { name: 'Nina Ford', email: 'nina.ford@assetflow.com', department: 'Facilities', role: 'Employee', status: 'Active' },
  { name: 'Avery Cole', email: 'avery.cole@assetflow.com', department: 'IT Services', role: 'Department Head', status: 'Active' },
  { name: 'Jordan Price', email: 'jordan.price@assetflow.com', department: 'Logistics', role: 'Asset Manager', status: 'Inactive' },
]

const tabs = [
  { id: 'departments', label: 'Departments', icon: Layers },
  { id: 'categories', label: 'Categories', icon: ShieldCheck },
  { id: 'employees', label: 'Employees', icon: Users },
]

export default function OrganizationSetupPage() {
  const [activeTab, setActiveTab] = useState('departments')

  const content = useMemo(() => {
    if (activeTab === 'departments') {
      return (
        <div className="space-y-6">
          <div className="rounded-3xl bg-surface-container-lowest p-6 border border-border-gray">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Department management</p>
                <h2 className="text-xl font-semibold text-on-surface">Create and manage departments</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition">
                <Plus size={16} /> New department
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
                    <th className="py-4">Department</th>
                    <th className="py-4">Head</th>
                    <th className="py-4">Parent</th>
                    <th className="py-4">Status</th>
                    <th className="py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-gray">
                  {departments.map((item) => (
                    <tr key={item.name} className="hover:bg-surface transition">
                      <td className="py-4">{item.name}</td>
                      <td className="py-4">{item.head}</td>
                      <td className="py-4">{item.parent}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${item.status === 'Active' ? 'bg-status-success/15 text-status-success' : 'bg-status-neutral/15 text-status-neutral'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === 'categories') {
      return (
        <div className="space-y-6">
          <div className="rounded-3xl bg-surface-container-lowest p-6 border border-border-gray">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Asset category management</p>
                <h2 className="text-xl font-semibold text-on-surface">Category configuration</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition">
                <Plus size={16} /> New category
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
                    <th className="py-4">Category</th>
                    <th className="py-4">Fields</th>
                    <th className="py-4">Status</th>
                    <th className="py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-gray">
                  {categories.map((item) => (
                    <tr key={item.name} className="hover:bg-surface transition">
                      <td className="py-4">{item.name}</td>
                      <td className="py-4">{item.fields}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${item.status === 'Active' ? 'bg-status-success/15 text-status-success' : 'bg-status-neutral/15 text-status-neutral'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="rounded-3xl bg-surface-container-lowest p-6 border border-border-gray">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Employee directory</p>
              <h2 className="text-xl font-semibold text-on-surface">Role assignments</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition">
              <Plus size={16} /> Add employee
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
                  <th className="py-4">Name</th>
                  <th className="py-4">Email</th>
                  <th className="py-4">Department</th>
                  <th className="py-4">Role</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-gray">
                {employees.map((item) => (
                  <tr key={item.email} className="hover:bg-surface transition">
                    <td className="py-4">{item.name}</td>
                    <td className="py-4">{item.email}</td>
                    <td className="py-4">{item.department}</td>
                    <td className="py-4">{item.role}</td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${item.status === 'Active' ? 'bg-status-success/15 text-status-success' : 'bg-status-neutral/15 text-status-neutral'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition">Promote</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }, [activeTab])

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Organization setup</p>
            <h1 className="text-3xl font-semibold text-on-surface">Master data</h1>
          </div>
          <p className="max-w-xl text-sm text-on-surface-variant">
            Manage departments, asset categories, and employee role assignments from one place.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const selected = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition ${selected ? 'bg-primary text-white border-primary' : 'bg-surface border-border-gray text-on-surface'}`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {content}
    </div>
  )
}
