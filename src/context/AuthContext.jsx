import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getProfile } from '../services/profileService'
import * as authService from '../services/authService'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (currentUser) => {
    if (!currentUser) {
      setProfile(null)
      return
    }
    try {
      const data = await getProfile(currentUser.id)
      setProfile(data)
    } catch {
      setProfile(null)
    }
  }, [])

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      const currentUser = data.session?.user ?? null
      setUser(currentUser)
      await loadProfile(currentUser)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      await loadProfile(currentUser)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [loadProfile])

  const signUp = async (params) => {
    const data = await authService.signUp(params)
    return data
  }

  const signIn = async (params) => {
    const data = await authService.signIn(params)
    setUser(data.user)
    await loadProfile(data.user)
    return data
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
    setProfile(null)
  }

  const refreshProfile = () => loadProfile(user)

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    signUp,
    signIn,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
