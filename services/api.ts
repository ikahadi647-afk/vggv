import { supabase } from './supabase'
import type {
  Client, Project, TeamMember, Transaction, FinancialPocket,
  Card, Lead, Package, AddOn, Asset, Contract, ClientFeedback,
  Notification, SocialMediaPost, PromoCode, SOP, Profile,
  TeamProjectPayment, TeamPaymentRecord, RewardLedgerEntry
} from '../types'
import type { Database } from '../types/database'

// Helper function to transform snake_case to camelCase
const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase)
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      result[camelKey] = toCamelCase(obj[key])
      return result
    }, {} as any)
  }
  return obj
}

// Helper function to transform camelCase to snake_case
const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase)
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      result[snakeKey] = toSnakeCase(obj[key])
      return result
    }, {} as any)
  }
  return obj
}

// Clients API
export const clientsApi = {
  getAll: async (): Promise<Client[]> => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (client: Omit<Client, 'id'>): Promise<Client> => {
    const insertData = toSnakeCase({
      ...client,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    
    const { data, error } = await supabase
      .from('clients')
      .insert([insertData as Database['public']['Tables']['clients']['Insert']])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, client: Partial<Client>): Promise<Client> => {
    const updateData = toSnakeCase({
      ...client,
      updated_at: new Date().toISOString()
    })
    
    const { data, error } = await supabase
      .from('clients')
      .update(updateData as Database['public']['Tables']['clients']['Update'])
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Projects API
export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (project: Omit<Project, 'id'>): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .insert([toSnakeCase(project)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .update(toSnakeCase(project))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Team Members API
export const teamMembersApi = {
  getAll: async (): Promise<TeamMember[]> => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (teamMember: Omit<TeamMember, 'id'>): Promise<TeamMember> => {
    const { data, error } = await supabase
      .from('team_members')
      .insert([toSnakeCase(teamMember)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, teamMember: Partial<TeamMember>): Promise<TeamMember> => {
    const { data, error } = await supabase
      .from('team_members')
      .update(toSnakeCase(teamMember))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Transactions API
export const transactionsApi = {
  getAll: async (): Promise<Transaction[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([toSnakeCase(transaction)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    const { data, error } = await supabase
      .from('transactions')
      .update(toSnakeCase(transaction))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Financial Pockets API
export const pocketsApi = {
  getAll: async (): Promise<FinancialPocket[]> => {
    const { data, error } = await supabase
      .from('financial_pockets')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (pocket: Omit<FinancialPocket, 'id'>): Promise<FinancialPocket> => {
    const { data, error } = await supabase
      .from('financial_pockets')
      .insert([toSnakeCase(pocket)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, pocket: Partial<FinancialPocket>): Promise<FinancialPocket> => {
    const { data, error } = await supabase
      .from('financial_pockets')
      .update(toSnakeCase(pocket))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('financial_pockets')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Cards API
export const cardsApi = {
  getAll: async (): Promise<Card[]> => {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (card: Omit<Card, 'id'>): Promise<Card> => {
    const { data, error } = await supabase
      .from('cards')
      .insert([toSnakeCase(card)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, card: Partial<Card>): Promise<Card> => {
    const { data, error } = await supabase
      .from('cards')
      .update(toSnakeCase(card))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Leads API
export const leadsApi = {
  getAll: async (): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (lead: Omit<Lead, 'id'>): Promise<Lead> => {
    const { data, error } = await supabase
      .from('leads')
      .insert([toSnakeCase(lead)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, lead: Partial<Lead>): Promise<Lead> => {
    const { data, error } = await supabase
      .from('leads')
      .update(toSnakeCase(lead))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Packages API
export const packagesApi = {
  getAll: async (): Promise<Package[]> => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (packageData: Omit<Package, 'id'>): Promise<Package> => {
    const { data, error } = await supabase
      .from('packages')
      .insert([toSnakeCase(packageData)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, packageData: Partial<Package>): Promise<Package> => {
    const { data, error } = await supabase
      .from('packages')
      .update(toSnakeCase(packageData))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Add-ons API
export const addOnsApi = {
  getAll: async (): Promise<AddOn[]> => {
    const { data, error } = await supabase
      .from('add_ons')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (addOn: Omit<AddOn, 'id'>): Promise<AddOn> => {
    const { data, error } = await supabase
      .from('add_ons')
      .insert([toSnakeCase(addOn)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, addOn: Partial<AddOn>): Promise<AddOn> => {
    const { data, error } = await supabase
      .from('add_ons')
      .update(toSnakeCase(addOn))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('add_ons')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Assets API
export const assetsApi = {
  getAll: async (): Promise<Asset[]> => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (asset: Omit<Asset, 'id'>): Promise<Asset> => {
    const { data, error } = await supabase
      .from('assets')
      .insert([toSnakeCase(asset)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, asset: Partial<Asset>): Promise<Asset> => {
    const { data, error } = await supabase
      .from('assets')
      .update(toSnakeCase(asset))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Contracts API
export const contractsApi = {
  getAll: async (): Promise<Contract[]> => {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (contract: Omit<Contract, 'id'>): Promise<Contract> => {
    const { data, error } = await supabase
      .from('contracts')
      .insert([toSnakeCase(contract)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, contract: Partial<Contract>): Promise<Contract> => {
    const { data, error } = await supabase
      .from('contracts')
      .update(toSnakeCase(contract))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('contracts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Client Feedback API
export const clientFeedbackApi = {
  getAll: async (): Promise<ClientFeedback[]> => {
    const { data, error } = await supabase
      .from('client_feedback')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (feedback: Omit<ClientFeedback, 'id'>): Promise<ClientFeedback> => {
    const { data, error } = await supabase
      .from('client_feedback')
      .insert([toSnakeCase(feedback)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, feedback: Partial<ClientFeedback>): Promise<ClientFeedback> => {
    const { data, error } = await supabase
      .from('client_feedback')
      .update(toSnakeCase(feedback))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('client_feedback')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Notifications API
export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (notification: Omit<Notification, 'id'>): Promise<Notification> => {
    const { data, error } = await supabase
      .from('notifications')
      .insert([toSnakeCase(notification)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  markAsRead: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
    
    if (error) throw error
  },

  markAllAsRead: async (): Promise<void> => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('is_read', false)
    
    if (error) throw error
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Social Media Posts API
export const socialMediaPostsApi = {
  getAll: async (): Promise<SocialMediaPost[]> => {
    const { data, error } = await supabase
      .from('social_media_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (post: Omit<SocialMediaPost, 'id'>): Promise<SocialMediaPost> => {
    const { data, error } = await supabase
      .from('social_media_posts')
      .insert([toSnakeCase(post)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, post: Partial<SocialMediaPost>): Promise<SocialMediaPost> => {
    const { data, error } = await supabase
      .from('social_media_posts')
      .update(toSnakeCase(post))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('social_media_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Promo Codes API
export const promoCodesApi = {
  getAll: async (): Promise<PromoCode[]> => {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (promoCode: Omit<PromoCode, 'id'>): Promise<PromoCode> => {
    const { data, error } = await supabase
      .from('promo_codes')
      .insert([toSnakeCase(promoCode)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, promoCode: Partial<PromoCode>): Promise<PromoCode> => {
    const { data, error } = await supabase
      .from('promo_codes')
      .update(toSnakeCase(promoCode))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('promo_codes')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// SOPs API
export const sopsApi = {
  getAll: async (): Promise<SOP[]> => {
    const { data, error } = await supabase
      .from('sops')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (sop: Omit<SOP, 'id'>): Promise<SOP> => {
    const { data, error } = await supabase
      .from('sops')
      .insert([toSnakeCase(sop)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, sop: Partial<SOP>): Promise<SOP> => {
    const { data, error } = await supabase
      .from('sops')
      .update(toSnakeCase(sop))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('sops')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Team Project Payments API
export const teamProjectPaymentsApi = {
  getAll: async (): Promise<TeamProjectPayment[]> => {
    const { data, error } = await supabase
      .from('team_project_payments')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (payment: Omit<TeamProjectPayment, 'id'>): Promise<TeamProjectPayment> => {
    const { data, error } = await supabase
      .from('team_project_payments')
      .insert([toSnakeCase(payment)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, payment: Partial<TeamProjectPayment>): Promise<TeamProjectPayment> => {
    const { data, error } = await supabase
      .from('team_project_payments')
      .update(toSnakeCase(payment))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('team_project_payments')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Team Payment Records API
export const teamPaymentRecordsApi = {
  getAll: async (): Promise<TeamPaymentRecord[]> => {
    const { data, error } = await supabase
      .from('team_payment_records')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (record: Omit<TeamPaymentRecord, 'id'>): Promise<TeamPaymentRecord> => {
    const { data, error } = await supabase
      .from('team_payment_records')
      .insert([toSnakeCase(record)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, record: Partial<TeamPaymentRecord>): Promise<TeamPaymentRecord> => {
    const { data, error } = await supabase
      .from('team_payment_records')
      .update(toSnakeCase(record))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('team_payment_records')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Reward Ledger Entries API
export const rewardLedgerEntriesApi = {
  getAll: async (): Promise<RewardLedgerEntry[]> => {
    const { data, error } = await supabase
      .from('reward_ledger_entries')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return toCamelCase(data || [])
  },

  create: async (entry: Omit<RewardLedgerEntry, 'id'>): Promise<RewardLedgerEntry> => {
    const { data, error } = await supabase
      .from('reward_ledger_entries')
      .insert([toSnakeCase(entry)])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (id: string, entry: Partial<RewardLedgerEntry>): Promise<RewardLedgerEntry> => {
    const { data, error } = await supabase
      .from('reward_ledger_entries')
      .update(toSnakeCase(entry))
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('reward_ledger_entries')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Profile API
export const profileApi = {
  get: async (): Promise<Profile | null> => {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('admin_user_id', user.user.id)
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  update: async (profile: Partial<Profile>): Promise<Profile> => {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('profiles')
      .update(toSnakeCase(profile))
      .eq('admin_user_id', user.user.id)
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  },

  create: async (profile: Omit<Profile, 'id'>): Promise<Profile> => {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) throw new Error('No authenticated user')

    const profileData = {
      ...toSnakeCase(profile),
      admin_user_id: user.user.id
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single()
    
    if (error) throw error
    return toCamelCase(data)
  }
}

// File upload helper
export const uploadFile = async (file: File, bucket: string = 'uploads'): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)

  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return publicUrl
}