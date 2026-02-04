import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  Calendar,
  Wallet,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

const steps = [
  {
    icon: Layers,
    title: 'Bauphasen verfolgen',
    description:
      'Ihr Bauprojekt ist in 10 Phasen unterteilt. Legen Sie Aufgaben an und verfolgen Sie Ihren Fortschritt.',
  },
  {
    icon: Calendar,
    title: 'Termine planen',
    description:
      'Alle wichtigen Termine an einem Ort – von Baustellenterminen bis zu Behördengängen.',
  },
  {
    icon: Wallet,
    title: 'Budget im Blick',
    description:
      'Erfassen Sie alle Ausgaben und behalten Sie Ihr Budget jederzeit unter Kontrolle.',
  },
  {
    icon: BookOpen,
    title: 'Baufortschritt dokumentieren',
    description:
      'Im Bautagebuch halten Sie alle wichtigen Ereignisse und Fotos fest.',
  },
  {
    icon: Lightbulb,
    title: 'Wissen aufbauen',
    description:
      'Der Ratgeber bietet Ihnen hilfreiche Artikel zu Planung, Finanzierung und mehr.',
  },
]

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()
  const { setIsNewUser } = useAuth()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsNewUser(false)
      navigate('/app')
    }
  }

  const handleSkip = () => {
    setIsNewUser(false)
    navigate('/app')
  }

  const step = steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-accent' : 'bg-border'
              }`}
              animate={{
                scale: index === currentStep ? 1.2 : 1,
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <step.icon className="w-10 h-10 text-accent" />
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">
              {step.title}
            </h2>

            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-3">
          <Button onClick={handleNext} variant="accent" size="lg" className="w-full">
            {currentStep < steps.length - 1 ? (
              <>
                Weiter
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Los geht's
                <Check className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {currentStep < steps.length - 1 && (
            <Button onClick={handleSkip} variant="ghost" size="lg" className="w-full">
              Überspringen
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
