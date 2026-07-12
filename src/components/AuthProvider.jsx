import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({ user: null, profile: null, session: null, loading: true })

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let mounted = true
    const timeout = window.setTimeout(() => {
      if (!mounted) return
      setLoading(false)
    }, 5000)

    async function ensureProfile(user) {
      if (!user?.id) return null

      const adminEmail = 'jeelpatel2543@gmail.com'
      const normalizedEmail = user.email?.toLowerCase?.()
      const defaultRole = normalizedEmail === adminEmail ? 'Admin' : 'Employee'

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.warn('Unable to fetch profile:', error.message)
      }

      if (data) {
        if (normalizedEmail === adminEmail && data.role !== 'Admin') {
          return { ...data, role: 'Admin' }
        }
        return data
      }

      const { data: createdProfile, error: creationError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name ?? null,
          role: defaultRole,
        })
        .select('*')
        .single()

      if (creationError) {
        console.warn('Unable to create profile:', creationError.message)
        return null
      }

      return createdProfile
    }

    async function loadSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (!mounted) return

        setSession(session)
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          const currentProfile = await ensureProfile(currentUser)
          if (!mounted) return
          setProfile(currentProfile)
        }
      } catch (error) {
        console.error('Failed to load session', error)
      } finally {
        if (!mounted) return
        window.clearTimeout(timeout)
        setLoading(false)
      }
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null
      if (!mounted) return
      setSession(session)
      setUser(currentUser)

      if (currentUser) {
        const currentProfile = await ensureProfile(currentUser)
        if (!mounted) return
        setProfile(currentProfile)
      } else {
        setProfile(null)
      }
    })

    return () => {
      mounted = false
      window.clearTimeout(timeout)
      subscription?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, profile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
