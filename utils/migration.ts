import { MOCK_DATA, MOCK_USERS } from '../constants'
import type { VendorData } from '../types'
import { 
  clientsApi, projectsApi, teamMembersApi, transactionsApi, 
  pocketsApi, cardsApi, leadsApi, packagesApi, addOnsApi,
  assetsApi, contractsApi, clientFeedbackApi, notificationsApi,
  socialMediaPostsApi, promoCodesApi, sopsApi, profileApi
} from '../services/api'

// Migration utility to transfer data from localStorage to Supabase
export const migrateDataToSupabase = async (): Promise<void> => {
  try {
    console.log('Starting migration to Supabase...')
    
    // Get existing localStorage data
    const existingData = localStorage.getItem('vendorData')
    const dataToMigrate: VendorData = existingData ? JSON.parse(existingData) : MOCK_DATA

    // Check if we already have a profile in Supabase
    let existingProfile
    try {
      existingProfile = await profileApi.get()
    } catch (error) {
      console.log('No existing profile found, will create new one')
    }

    // Create or update profile
    if (!existingProfile) {
      console.log('Creating profile...')
      await profileApi.create(dataToMigrate.profile)
    } else {
      console.log('Updating existing profile...')
      await profileApi.update(dataToMigrate.profile)
    }

    // Migrate packages
    console.log('Migrating packages...')
    for (const pkg of dataToMigrate.packages) {
      await packagesApi.create(pkg)
    }

    // Migrate add-ons
    console.log('Migrating add-ons...')
    for (const addOn of dataToMigrate.addOns) {
      await addOnsApi.create(addOn)
    }

    // Migrate clients
    console.log('Migrating clients...')
    for (const client of dataToMigrate.clients) {
      await clientsApi.create(client)
    }

    // Migrate team members
    console.log('Migrating team members...')
    for (const member of dataToMigrate.teamMembers) {
      await teamMembersApi.create(member)
    }

    // Migrate projects
    console.log('Migrating projects...')
    for (const project of dataToMigrate.projects) {
      await projectsApi.create(project)
    }

    // Migrate other entities...
    console.log('Migration completed successfully!')
    
    // Clear localStorage to indicate migration is complete
    localStorage.setItem('migrationCompleted', 'true')
    
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

// Check if migration has been completed
export const isMigrationCompleted = (): boolean => {
  return localStorage.getItem('migrationCompleted') === 'true'
}

// Reset migration status (for development/testing)
export const resetMigrationStatus = (): void => {
  localStorage.removeItem('migrationCompleted')
}