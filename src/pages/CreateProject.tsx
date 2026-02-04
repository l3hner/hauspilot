import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Loader2 } from 'lucide-react'
import { useProject } from '@/contexts/ProjectContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CreateProject() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [budget, setBudget] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { createProject } = useProject()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Bitte geben Sie einen Projektnamen ein')
      return
    }

    setLoading(true)

    try {
      await createProject({
        name: name.trim(),
        location: location.trim() || undefined,
        startDate: startDate ? new Date(startDate) : new Date(),
        budget: budget ? parseFloat(budget) : 0,
      })
      navigate('/app/onboarding')
    } catch (err) {
      setError('Projekt konnte nicht erstellt werden')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">hauspilot</span>
          </div>
        </div>

        <Card className="card-shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Erstes Projekt anlegen</CardTitle>
            <CardDescription>
              Legen Sie Ihr Bauprojekt an, um loszulegen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Projektname *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="z.B. Einfamilienhaus Musterstadt"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ort (optional)</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="z.B. 12345 Musterstadt"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Geplanter Baubeginn</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (Euro)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="z.B. 400000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  min="0"
                  step="1000"
                />
              </div>

              <Button type="submit" className="w-full" variant="accent" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Projekt erstellen
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
