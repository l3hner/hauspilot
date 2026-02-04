import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProject } from '@/contexts/ProjectContext'

export function Header() {
  const { currentProject } = useProject()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border"
    >
      <div className="flex items-center justify-between px-4 h-16">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-foreground">hauspilot</span>
        </NavLink>

        <div className="flex-1 mx-4 text-center">
          {currentProject && (
            <p className="text-sm font-medium truncate">{currentProject.name}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/app/einstellungen">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </NavLink>
        </div>
      </div>
    </motion.header>
  )
}
