import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ProtectedRoute({ children, requiredRole }) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        setAuthorized(false)
        setLoading(false)
        return
      }

      if (!requiredRole) {
        setAuthorized(true)
        setLoading(false)
        return
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError || profileData?.role !== requiredRole) {
        setAuthorized(false)
      } else {
        setAuthorized(true)
      }
      setLoading(false)
    }

    checkAuth()
  }, [requiredRole])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!authorized) {
    return <Navigate to="/login" replace />
  }

  return children
}
