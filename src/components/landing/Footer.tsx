import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">hauspilot</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/impressum" className="hover:underline opacity-80 hover:opacity-100">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:underline opacity-80 hover:opacity-100">
              Datenschutz
            </Link>
            <Link to="/agb" className="hover:underline opacity-80 hover:opacity-100">
              AGB
            </Link>
          </nav>

          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} hauspilot. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
