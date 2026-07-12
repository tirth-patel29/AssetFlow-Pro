import { supabase } from './supabaseClient'

function ensureClient() {
  if (!supabase) {
    return { error: { message: 'Supabase client is not configured.' } }
  }
  return { client: supabase }
}

export async function signUp(email, password) {
  const { client, error } = ensureClient()
  if (error) return { data: null, error }
  return await client.auth.signUp({ email, password })
}

export async function signIn(email, password) {
  const { client, error } = ensureClient()
  if (error) return { data: null, error }
  return await client.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  const { client, error } = ensureClient()
  if (error) return { error }
  return await client.auth.signOut()
}

export async function getCurrentUser() {
  const { client, error } = ensureClient()
  if (error) return { data: null, error }
  return await client.auth.getUser()
}
