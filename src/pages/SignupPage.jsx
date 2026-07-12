import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail, ShieldCheck, Shield } from 'lucide-react'
import { signUp } from '../lib/auth'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    const { data, error } = await signUp(email, password)
    if (error) {
      setError(error.message)
      return
    }

    if (data?.session) {
      navigate('/')
      return
    }

    if (data?.user) {
      setMessage('Signup successful. Please log in to continue.')
      return
    }

    setError('Unable to complete signup. Please try again.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-0 md:p-6 bg-background">
      <div className="w-full max-w-[1100px] min-h-[700px] flex flex-col md:flex-row bg-surface-container-lowest rounded-[1.25rem] overflow-hidden shadow-xl border border-border-gray">
        <section className="relative w-full md:w-1/2 bg-primary p-12 text-white flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 abstract-grid pointer-events-none opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-container/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-on-primary rounded-lg flex items-center justify-center">
                <span className="text-primary text-[28px] font-bold">AF</span>
              </div>
              <span className="font-headline-md text-headline-md text-on-primary font-bold tracking-tight">AssetFlow</span>
            </div>

            <div className="space-y-4 max-w-sm">
              <h1 className="font-headline-lg text-headline-lg text-on-primary leading-tight">
                Get started with your team.
              </h1>
              <p className="font-body-lg text-body-lg text-on-primary/80">
                Create your account to manage assets, bookings, maintenance, and audits.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <p className="font-caption text-caption text-on-primary/60">© 2026 AssetFlow Technologies Inc. All rights reserved.</p>
          </div>
        </section>

        <section className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-surface-container-lowest">
          <div className="max-w-md w-full mx-auto">
            <header className="mb-10">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Create account</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sign up with your work email and get started.
              </p>
            </header>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="email">
                  Work Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    <Mail size={20} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-border-gray rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none font-body-md text-body-md text-on-surface"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    <Lock size={20} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-surface-container-lowest border border-border-gray rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none font-body-md text-body-md text-on-surface"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && <div className="text-sm text-status-error">{error}</div>}
              {message && <div className="text-sm text-status-success">{message}</div>}

              <button className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                <span>Sign up</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-border-gray text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Already have an account?
                <Link className="font-label-md text-label-md text-primary font-bold hover:underline ml-1" to="/login">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 grayscale opacity-50">
                <ShieldCheck size={18} />
                <span className="font-label-sm text-label-sm">SSO Ready</span>
              </div>
              <div className="flex items-center gap-1.5 grayscale opacity-50">
                <Shield size={18} />
                <span className="font-label-sm text-label-sm">Enterprise Grade</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
