import { useEffect, useMemo, useState } from 'react'
import { Plus, ShieldCheck, Layers, Users } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../components/AuthProvider'

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
  const [departmentsData, setDepartmentsData] = useState(departments)
  const [categoriesData, setCategoriesData] = useState(categories)
  const { profile } = useAuth()
  const isAdmin = profile?.email?.toLowerCase?.() === 'jeelpatel2543@gmail.com' || profile?.role === 'Admin'
  const [employeesData, setEmployeesData] = useState(employees)
  const [usersData, setUsersData] = useState(employees)
  const [showDepartmentForm, setShowDepartmentForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [newDepartment, setNewDepartment] = useState({ name: '', head: '', parent: '', status: 'Active' })
  const [newCategory, setNewCategory] = useState({ name: '', fields: '', status: 'Active' })
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', department: '', role: 'Employee', status: 'Active' })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!supabase) return

    let mounted = true

    async function loadOrganizationData() {
      const [departmentsResult, categoriesResult, employeesResult, profilesResult] = await Promise.all([
        supabase.from('departments').select('*').order('name', { ascending: true }),
        supabase.from('asset_categories').select('*').order('name', { ascending: true }),
        supabase.from('employees').select('*').order('name', { ascending: true }),
        supabase.from('profiles').select('*').order('email', { ascending: true }),
      ])

      if (!mounted) return

      if (!departmentsResult.error && departmentsResult.data?.length) {
        setDepartmentsData(
          departmentsResult.data.map((item) => ({
            name: item.name ?? item.department_name ?? 'Department',
            head: item.head ?? item.manager ?? 'Unassigned',
            parent: item.parent ?? item.parent_department ?? 'Corporate',
            status: item.status ?? item.state ?? 'Active',
          })),
        )
      }

      if (!categoriesResult.error && categoriesResult.data?.length) {
        setCategoriesData(
          categoriesResult.data.map((item) => ({
            name: item.name ?? item.category_name ?? 'Category',
            fields: item.fields ?? item.field_template ?? '-',
            status: item.status ?? item.state ?? 'Active',
          })),
        )
      }

      if (!employeesResult.error && employeesResult.data?.length) {
        setEmployeesData(
          employeesResult.data.map((item) => ({
            name: item.name ?? item.full_name ?? 'Employee',
            email: item.email ?? item.user_email ?? 'unknown@example.com',
            department: item.department ?? item.team ?? 'General',
            role: item.role ?? item.position ?? 'Employee',
            status: item.status ?? item.state ?? 'Active',
          })),
        )
      }

      if (!profilesResult.error && profilesResult.data?.length) {
        setUsersData(
          profilesResult.data.map((item) => ({
            name: item.full_name ?? item.name ?? 'User',
            email: item.email ?? 'unknown@example.com',
            department: item.department ?? item.team ?? 'General',
            role: item.role ?? 'Employee',
            status: item.status ?? 'Active',
          })),
        )
      } else if (!employeesResult.error && employeesResult.data?.length) {
        setUsersData(
          employeesResult.data.map((item) => ({
            name: item.name ?? item.full_name ?? 'Employee',
            email: item.email ?? item.user_email ?? 'unknown@example.com',
            department: item.department ?? item.team ?? 'General',
            role: item.role ?? item.position ?? 'Employee',
            status: item.status ?? item.state ?? 'Active',
          })),
        )
      }
    }

    loadOrganizationData()

    return () => {
      mounted = false
    }
  }, [])

  async function handleCreateDepartment(event) {
    event.preventDefault()
    setFormError('')

    if (!newDepartment.name.trim()) {
      setFormError('Department name is required.')
      return
    }

    const payload = {
      name: newDepartment.name,
      head: newDepartment.head,
      parent: newDepartment.parent,
      status: newDepartment.status,
    }

    if (supabase) {
      const { data, error } = await supabase.from('departments').insert(payload).select('*').single()
      if (error) {
        console.error('Unable to save department:', error.message)
        setFormError('Unable to save department right now. Please try again.')
        return
      }
      setDepartmentsData((current) => [
        {
          name: data.name,
          head: data.head,
          parent: data.parent,
          status: data.status,
        },
        ...current,
      ])
    } else {
      setDepartmentsData((current) => [payload, ...current])
    }

    setNewDepartment({ name: '', head: '', parent: '', status: 'Active' })
    setShowDepartmentForm(false)
  }

  async function handleCreateCategory(event) {
    event.preventDefault()
    setFormError('')

    if (!newCategory.name.trim()) {
      setFormError('Category name is required.')
      return
    }

    const payload = {
      name: newCategory.name,
      fields: newCategory.fields,
      status: newCategory.status,
    }

    if (supabase) {
      const { data, error } = await supabase.from('asset_categories').insert(payload).select('*').single()
      if (error) {
        console.error('Unable to save category:', error.message)
        setFormError('Unable to save category right now. Please try again.')
        return
      }
      setCategoriesData((current) => [
        {
          name: data.name,
          fields: data.fields,
          status: data.status,
        },
        ...current,
      ])
    } else {
      setCategoriesData((current) => [payload, ...current])
    }

    setNewCategory({ name: '', fields: '', status: 'Active' })
    setShowCategoryForm(false)
  }

  async function handleCreateEmployee(event) {
    event.preventDefault()
    setFormError('')

    if (!newEmployee.name.trim() || !newEmployee.email.trim()) {
      setFormError('Name and email are required.')
      return
    }

    const payload = {
      name: newEmployee.name,
      email: newEmployee.email,
      department: newEmployee.department,
      role: newEmployee.role,
      status: newEmployee.status,
    }

    if (supabase) {
      const { data, error } = await supabase.from('employees').insert(payload).select('*').single()
      if (error) {
        console.error('Unable to save employee:', error.message)
        setFormError('Unable to save employee right now. Please try again.')
        return
      }
      const nextUser = {
        name: data.name,
        email: data.email,
        department: data.department,
        role: data.role,
        status: data.status,
      }
      setEmployeesData((current) => [nextUser, ...current])
      setUsersData((current) => [nextUser, ...current])
    } else {
      setEmployeesData((current) => [payload, ...current])
      setUsersData((current) => [payload, ...current])
    }

    setNewEmployee({ name: '', email: '', department: '', role: 'Employee', status: 'Active' })
    setShowEmployeeForm(false)
  }

  async function promoteEmployee(employee) {
    const promotionMap = {
      Employee: 'Senior Employee',
      'Senior Employee': 'Lead Employee',
      'Asset Manager': 'Senior Asset Manager',
      'Department Head': 'Director',
      Director: 'Senior Director',
    }
    const normalizedRole = employee.role?.trim() ?? ''
    const nextRole =
      promotionMap[normalizedRole] ??
      (normalizedRole.startsWith('Senior ') ? normalizedRole : `Senior ${normalizedRole}`)

    if (supabase && employee.email) {
      const { data, error } = await supabase
        .from('employees')
        .update({ role: nextRole })
        .eq('email', employee.email)
        .select('*')
        .single()

      if (!error && data) {
        setEmployeesData((current) =>
          current.map((item) => (item.email === employee.email ? { ...item, role: data.role ?? nextRole } : item)),
        )
        setUsersData((current) =>
          current.map((item) => (item.email === employee.email ? { ...item, role: data.role ?? nextRole } : item)),
        )
        return
      }
    }

    setEmployeesData((current) =>
      current.map((item) => (item.email === employee.email ? { ...item, role: nextRole } : item)),
    )
    setUsersData((current) =>
      current.map((item) => (item.email === employee.email ? { ...item, role: nextRole } : item)),
    )
  }

  const content = useMemo(() => {
    if (activeTab === 'departments') {
      return (
        <div className="space-y-6">
          <div className="rounded-3xl bg-surface-container-lowest p-6 border border-border-gray">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Department management</p>
                <h2 className="text-xl font-semibold text-on-surface">Create and manage departments</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowDepartmentForm((value) => !value)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition"
              >
                <Plus size={16} /> {showDepartmentForm ? 'Hide form' : 'New department'}
              </button>
            </div>

            {showDepartmentForm && (
              <form className="space-y-4 rounded-3xl bg-white p-6 border border-border-gray mb-6" onSubmit={handleCreateDepartment}>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">Department name</label>
                    <input
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment((current) => ({ ...current, name: e.target.value }))}
                      required
                      className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">Head</label>
                    <input
                      value={newDepartment.head}
                      onChange={(e) => setNewDepartment((current) => ({ ...current, head: e.target.value }))}
                      className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">Parent department</label>
                    <input
                      value={newDepartment.parent}
                      onChange={(e) => setNewDepartment((current) => ({ ...current, parent: e.target.value }))}
                      className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">Status</label>
                    <select
                      value={newDepartment.status}
                      onChange={(e) => setNewDepartment((current) => ({ ...current, status: e.target.value }))}
                      className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowDepartmentForm(false)} className="rounded-xl border border-border-gray px-5 py-3 text-body-md text-on-surface hover:bg-surface transition">
                    Cancel
                  </button>
                  <button className="rounded-xl bg-secondary px-5 py-3 text-white font-semibold hover:bg-secondary/90 transition" type="submit">
                    Create department
                  </button>
                </div>
                {formError && <div className="text-sm text-status-error">{formError}</div>}
              </form>
            )}

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
                  {departmentsData.map((item) => (
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
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Asset category management</p>
                <h2 className="text-xl font-semibold text-on-surface">Category configuration</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryForm((value) => !value)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition"
              >
                <Plus size={16} /> {showCategoryForm ? 'Hide form' : 'New category'}
              </button>
            </div>

            {showCategoryForm && (
              <form className="space-y-4 rounded-3xl bg-white p-6 border border-border-gray mb-6" onSubmit={handleCreateCategory}>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">Category name</label>
                    <input
                      value={newCategory.name}
                      onChange={(e) => setNewCategory((current) => ({ ...current, name: e.target.value }))}
                      required
                      className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">Fields</label>
                    <input
                      value={newCategory.fields}
                      onChange={(e) => setNewCategory((current) => ({ ...current, fields: e.target.value }))}
                      className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">Status</label>
                    <select
                      value={newCategory.status}
                      onChange={(e) => setNewCategory((current) => ({ ...current, status: e.target.value }))}
                      className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowCategoryForm(false)} className="rounded-xl border border-border-gray px-5 py-3 text-body-md text-on-surface hover:bg-surface transition">
                    Cancel
                  </button>
                  <button className="rounded-xl bg-secondary px-5 py-3 text-white font-semibold hover:bg-secondary/90 transition" type="submit">
                    Create category
                  </button>
                </div>
                {formError && <div className="text-sm text-status-error">{formError}</div>}
              </form>
            )}

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
                  {categoriesData.map((item) => (
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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Employee directory</p>
              <h2 className="text-xl font-semibold text-on-surface">Role assignments</h2>
            </div>
            <button
              type="button"
              onClick={() => setShowEmployeeForm((value) => !value)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary/90 transition"
            >
              <Plus size={16} /> {showEmployeeForm ? 'Hide form' : 'Add employee'}
            </button>
          </div>

          {showEmployeeForm && (
            <form className="space-y-4 rounded-3xl bg-white p-6 border border-border-gray mb-6" onSubmit={handleCreateEmployee}>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="block text-label-md text-on-surface mb-2">Name</label>
                  <input
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee((current) => ({ ...current, name: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-label-md text-on-surface mb-2">Email</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee((current) => ({ ...current, email: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="block text-label-md text-on-surface mb-2">Department</label>
                  <input
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee((current) => ({ ...current, department: e.target.value }))}
                    className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-label-md text-on-surface mb-2">Role</label>
                  <input
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee((current) => ({ ...current, role: e.target.value }))}
                    className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="block text-label-md text-on-surface mb-2">Status</label>
                  <select
                    value={newEmployee.status}
                    onChange={(e) => setNewEmployee((current) => ({ ...current, status: e.target.value }))}
                    className="w-full rounded-xl border border-border-gray bg-surface px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowEmployeeForm(false)} className="rounded-xl border border-border-gray px-5 py-3 text-body-md text-on-surface hover:bg-surface transition">
                  Cancel
                </button>
                <button className="rounded-xl bg-secondary px-5 py-3 text-white font-semibold hover:bg-secondary/90 transition" type="submit">
                  Create employee
                </button>
              </div>
              {formError && <div className="text-sm text-status-error">{formError}</div>}
            </form>
          )}

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
                {usersData.map((item) => (
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
                      {isAdmin ? (
                        <button
                          type="button"
                          onClick={() => promoteEmployee(item)}
                          className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition"
                        >
                          Promote
                        </button>
                      ) : (
                        <span className="text-sm text-on-surface-variant">Admin only</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }, [activeTab, showDepartmentForm, showCategoryForm, showEmployeeForm, newDepartment, newCategory, newEmployee, formError, departmentsData, categoriesData, employeesData])

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
