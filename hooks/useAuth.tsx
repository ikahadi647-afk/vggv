import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { auth } from '../services/supabase'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  supabaseUser: SupabaseUser | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  supabaseUser: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    auth.getCurrentUser().then(({ data: { user } }) => {
      setSupabaseUser(user)
      if (user) {
        // Convert Supabase user to app User format
        const appUser: User = {
          id: user.id,
          email: user.email || '',
          password: '', // We don't store passwords in the client
          fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          companyName: user.user_metadata?.company_name || '',
          role: user.user_metadata?.role === 'Admin' ? 'Admin' : 'Member',
          permissions: user.user_metadata?.permissions || []
        }
        setUser(appUser)
      }
      setIsLoading(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user)
        const appUser: User = {
          id: session.user.id,
          email: session.user.email || '',
          password: '',
          fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
          companyName: session.user.user_metadata?.company_name || '',
          role: session.user.user_metadata?.role === 'Admin' ? 'Admin' : 'Member',
          permissions: session.user.user_metadata?.permissions || []
        }
        setUser(appUser)
      } else {
        setUser(null)
        setSupabaseUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    const { error } = await auth.signIn(email, password)
    setIsLoading(false)
    return { error }
  }

  const signOut = async () => {
    setIsLoading(true)
    await auth.signOut()
    setUser(null)
    setSupabaseUser(null)
    setIsLoading(false)
  }

  const value = {
    user,
    supabaseUser,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}