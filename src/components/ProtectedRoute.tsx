import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useProject } from '@/contexts/ProjectContext'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { firebaseUser, loading: authLoading } = useAuth()
  const { projects, loading: projectLoading } = useProject()
  const location = useLocation()

  if (authLoading || projectLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!firebaseUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Redirect to create project if no projects exist
  if (
    projects.length === 0 &&
    !location.pathname.includes('projekt-erstellen') &&
    !location.pathname.includes('onboarding')
  ) {
    return <Navigate to="/app/projekt-erstellen" replace />
  }

  return <>{children}</>
}
