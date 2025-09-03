import React, { useState, useEffect } from 'react'
import { ViewType } from './types'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { LoginForm } from './components/auth/LoginForm'
import { profileApi } from './services/api'
import type { Profile } from './types'
import { DEFAULT_USER_PROFILE } from './constants'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Leads } from './components/Leads'
import Booking from './components/Booking'
import Clients from './components/Clients'
import { Projects } from './components/Projects'
import { Freelancers } from './components/Freelancers'
import Finance from './components/Finance'
import Packages from './components/Packages'
import { Assets } from './components/Assets'
import Settings from './components/Settings'
import { CalendarView } from './components/CalendarView'
import { SocialPlanner } from './components/SocialPlanner'
import PromoCodes from './components/PromoCodes'
import SOPManagement from './components/SOP'
import ClientReports from './components/ClientKPI'
import Contracts from './components/Contracts'

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-600">Loading Vena Pictures...</p>
    </div>
  </div>
)

// Main App Content (authenticated)
const AppContent = () => {
  const { user, isAuthenticated } = useAuth()
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [notification, setNotification] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load profile data on authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProfile()
    }
  }, [isAuthenticated, user])

  const loadProfile = async () => {
    try {
      setIsLoading(true)
      const userProfile = await profileApi.get()
      setProfile(userProfile || DEFAULT_USER_PROFILE)
    } catch (error) {
      console.error('Error loading profile:', error)
      // Create default profile if none exists
      try {
        const defaultProfile = {
          ...DEFAULT_USER_PROFILE,
          fullName: user?.fullName || '',
          email: user?.email || '',
          companyName: user?.companyName || 'My Photography Business'
        }
        const newProfile = await profileApi.create(defaultProfile)
        setProfile(newProfile)
      } catch (createError) {
        console.error('Error creating profile:', createError)
        setProfile(DEFAULT_USER_PROFILE)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleNavigation = (view: ViewType) => {
    setActiveView(view)
    setIsSidebarOpen(false)
  }

  const hasPermission = (view: ViewType): boolean => {
    if (user?.role === 'Admin') return true
    return user?.permissions?.includes(view) || false
  }

  const renderView = () => {
    if (!hasPermission(activeView)) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Access Denied</h2>
          <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
          <button 
            onClick={() => handleNavigation(ViewType.DASHBOARD)} 
            className="button-primary"
          >
            Back to Dashboard
          </button>
        </div>
      )
    }

    // For now, return basic components - this will be expanded as we integrate more APIs
    switch (activeView) {
      case ViewType.DASHBOARD:
        return <Dashboard 
          profile={profile} 
          showNotification={showNotification}
          // TODO: Pass actual data from Supabase APIs
          clients={[]}
          projects={[]}
          transactions={[]}
          teamMembers={[]}
          leads={[]}
          notifications={[]}
          handleNavigation={handleNavigation}
        />
      
      case ViewType.CLIENTS:
        return <Clients 
          // TODO: Integrate with clientsApi
          clients={[]}
          setClients={() => {}}
          showNotification={showNotification}
          profile={profile}
        />
      
      case ViewType.PROJECTS:
        return <Projects 
          // TODO: Integrate with projectsApi
          projects={[]}
          setProjects={() => {}}
          clients={[]}
          teamMembers={[]}
          packages={[]}
          addOns={[]}
          showNotification={showNotification}
          profile={profile}
          handleNavigation={handleNavigation}
        />

      case ViewType.SETTINGS:
        return <Settings 
          profile={profile}
          setProfile={setProfile}
          showNotification={showNotification}
        />

      // Add more cases as we integrate other components
      default:
        return <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-gray-600">This feature is being migrated to the new system.</p>
        </div>
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex h-screen bg-brand-bg text-brand-text-primary overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        setActiveView={handleNavigation} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        currentUser={user}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          pageTitle={activeView} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          setIsSearchOpen={setIsSearchOpen}
          notifications={[]} // TODO: Load from notificationsApi
          handleNavigation={handleNavigation}
          handleMarkAllAsRead={() => {}} // TODO: Implement
          currentUser={user}
          profile={profile}
          handleLogout={() => {}} // TODO: Implement logout
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 pb-20 xl:pb-8 overscroll-contain">
          <div className="animate-fade-in">
            {renderView()}
          </div>
        </main>
      </div>
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-brand-accent text-white py-4 px-6 rounded-xl shadow-2xl z-50 animate-fade-in-out backdrop-blur-sm border border-brand-accent-hover/20 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
            <span className="font-medium">{notification}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Root App Component
const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

// Router component to handle authentication state
const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <AppContent />
}

export default App