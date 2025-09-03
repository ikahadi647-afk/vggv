import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Authentication helpers
export const auth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Storage helpers
export const storage = {
  uploadFile: async (bucket: string, fileName: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)
    return { data, error }
  },

  getPublicUrl: (bucket: string, fileName: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    return data.publicUrl
  },

  deleteFile: async (bucket: string, fileName: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([fileName])
    return { data, error }
  }
}

// Real-time subscriptions
export const subscriptions = {
  subscribeToTable: (table: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe()
  }
}