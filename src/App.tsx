import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProjectProvider } from '@/contexts/ProjectContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { CookieConsent } from '@/components/CookieConsent'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { AppShell } from '@/components/layout/AppShell'

// Pages
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { CreateProject } from '@/pages/CreateProject'
import { Onboarding } from '@/pages/Onboarding'
import { Dashboard } from '@/pages/Dashboard'
import { Phases } from '@/pages/Phases'
import { Calendar } from '@/pages/Calendar'
import { Budget } from '@/pages/Budget'
import { Diary } from '@/pages/Diary'
import { Guide } from '@/pages/Guide'
import { Settings } from '@/pages/Settings'
import { Impressum } from '@/pages/Impressum'
import { Datenschutz } from '@/pages/Datenschutz'
import { AGB } from '@/pages/AGB'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <TooltipProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registrieren" element={<Register />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/agb" element={<AGB />} />

              {/* Protected routes */}
              <Route
                path="/app/projekt-erstellen"
                element={
                  <ProtectedRoute>
                    <CreateProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppShell />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="bauphasen" element={<Phases />} />
                <Route path="termine" element={<Calendar />} />
                <Route path="budget" element={<Budget />} />
                <Route path="bautagebuch" element={<Diary />} />
                <Route path="ratgeber" element={<Guide />} />
                <Route path="einstellungen" element={<Settings />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <CookieConsent />
          </TooltipProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
