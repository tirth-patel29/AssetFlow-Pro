import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail, ShieldCheck, Shield } from 'lucide-react'
import { signIn } from '../lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    const { data, error } = await signIn(email, password)
    if (error) {
      const message = error.message.includes('Email not confirmed')
        ? 'Your email must be confirmed before signing in. Disable confirmation in Supabase Auth settings if you want to skip this.'
        : error.message
      setError(message)
      return
    }
    if (data?.session) {
      navigate('/')
    } else {
      setError('Unable to sign in. Please check your credentials and try again.')
    }
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
                Precision management for enterprise resources.
              </h1>
              <p className="font-body-lg text-body-lg text-on-primary/80">
                Track. Allocate. Maintain. The all-in-one ERP for modern asset lifecycles.
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
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Welcome Back</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Please enter your credentials to access your dashboard.
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
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="password">
                    Password
                  </label>
                  <Link className="font-label-sm text-label-sm text-primary hover:underline transition-all" to="#">
                    Forgot password?
                  </Link>
                </div>
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

              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-border-gray text-primary focus:ring-primary/20"
                />
                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="remember">
                  Remember this device for 30 days
                </label>
              </div>

              {error && <div className="text-sm text-status-error">{error}</div>}

              <button className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                <span>Log In</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-border-gray text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                New here?
                <Link className="font-label-md text-label-md text-primary font-bold hover:underline ml-1" to="/signup">
                  Sign up for an account
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
