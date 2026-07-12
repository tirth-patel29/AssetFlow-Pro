import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '../lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    const { data, error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      return
    }
    if (data?.session) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-[1000px] min-h-[700px] bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xl border border-border-gray flex flex-col md:flex-row">
        <section className="relative w-full md:w-1/2 bg-primary p-10 text-white flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,rgba(249,249,255,0.4),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.2),transparent_28%)]"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <span className="text-white text-xl">AF</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/80">AssetFlow</p>
                <p className="text-lg font-semibold">Enterprise ERP</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold max-w-xs">Precision management for enterprise resources.</h1>
            <p className="mt-4 text-body-lg text-white/80 max-w-sm">
              Track. allocate. maintain. The all-in-one ERP for modern asset lifecycles.
            </p>
          </div>
          <p className="relative z-10 text-sm text-white/70">© 2026 AssetFlow Technologies Inc. All rights reserved.</p>
        </section>

        <section className="w-full md:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-on-surface mb-2">Welcome Back</h2>
            <p className="text-body-md text-on-surface-variant mb-8">
              Please enter your credentials to access your dashboard.
            </p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-label-md text-on-surface mb-2" htmlFor="email">
                  Work Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-label-md text-on-surface" htmlFor="password">
                    Password
                  </label>
                  <Link className="text-sm text-primary hover:underline" to="#">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
              </div>
              {error && <div className="text-sm text-status-error">{error}</div>}
              <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-white font-semibold transition hover:bg-primary-container">
                Sign in
              </button>
            </form>
            <p className="mt-6 text-sm text-on-surface-variant">
              New here? <Link className="text-primary font-medium hover:underline" to="/signup">Create an account</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
