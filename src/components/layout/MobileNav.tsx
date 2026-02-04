import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Layers,
  Calendar,
  Wallet,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Home', end: true },
  { to: '/app/bauphasen', icon: Layers, label: 'Phasen' },
  { to: '/app/termine', icon: Calendar, label: 'Termine' },
  { to: '/app/budget', icon: Wallet, label: 'Budget' },
  { to: '/app/bautagebuch', icon: BookOpen, label: 'Tagebuch' },
]

export function MobileNav() {
  return (
    <motion.nav
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-pb"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]',
                isActive
                  ? 'text-accent'
                  : 'text-muted-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  )
}
