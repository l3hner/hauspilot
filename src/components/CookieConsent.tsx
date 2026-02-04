import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const COOKIE_CONSENT_KEY = 'hauspilot_cookie_consent'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Small delay to not show immediately on page load
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:p-6"
        >
          <Card className="max-w-4xl mx-auto card-shadow-lg border-border/50">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Cookie-Einstellungen</h3>
                    <p className="text-sm text-muted-foreground">
                      Wir verwenden nur technisch notwendige Cookies für die
                      Authentifizierung. Keine Tracking-Cookies.{' '}
                      <Link
                        to="/datenschutz"
                        className="text-accent hover:underline"
                      >
                        Mehr erfahren
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleDecline}
                    className="flex-1 lg:flex-none"
                  >
                    Ablehnen
                  </Button>
                  <Button
                    variant="accent"
                    onClick={handleAccept}
                    className="flex-1 lg:flex-none"
                  >
                    Akzeptieren
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
