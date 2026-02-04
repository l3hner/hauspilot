import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  Layers,
  Calendar,
  Wallet,
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { useProject } from '@/contexts/ProjectContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DEFAULT_PHASES } from '@/types'

export function Dashboard() {
  const { currentProject, tasks, events, expenses, diaryEntries } = useProject()

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Kein Projekt ausgewählt</p>
      </div>
    )
  }

  // Calculate progress
  const activePhaseIndex = DEFAULT_PHASES.findIndex(
    (p) => p.phaseId === currentProject.activePhaseId
  )
  const progress = Math.round(((activePhaseIndex + 1) / DEFAULT_PHASES.length) * 100)
  const activePhase = DEFAULT_PHASES[activePhaseIndex]

  // Get pending tasks for active phase
  const phaseTasks = tasks
    .filter((t) => t.phaseId === currentProject.activePhaseId && !t.done)
    .slice(0, 3)

  // Get upcoming events
  const upcomingEvents = events
    .filter((e) => e.dateTime >= new Date())
    .slice(0, 3)

  // Calculate budget
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remainingBudget = currentProject.budget - totalExpenses
  const budgetUsedPercent = currentProject.budget > 0
    ? Math.min(100, Math.round((totalExpenses / currentProject.budget) * 100))
    : 0

  // Get latest diary entry
  const latestDiary = diaryEntries[0]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-muted-foreground">{currentProject.name}</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Baufortschritt
              </CardTitle>
              <Layers className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{progress}%</div>
              <Progress value={progress} className="h-2 mb-3" />
              <div className="flex items-center gap-2">
                <Badge variant="accent">{activePhase?.title}</Badge>
              </div>
              <Button asChild variant="ghost" size="sm" className="mt-4 -ml-2">
                <Link to="/app/bauphasen">
                  Zu den Bauphasen
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Budget Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Budget
              </CardTitle>
              <Wallet className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {remainingBudget.toLocaleString('de-DE')} €
              </div>
              <Progress
                value={budgetUsedPercent}
                className={`h-2 mb-3 ${budgetUsedPercent > 90 ? '[&>div]:bg-destructive' : ''}`}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Ausgaben: {totalExpenses.toLocaleString('de-DE')} €</span>
                <span>{budgetUsedPercent}%</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="mt-4 -ml-2">
                <Link to="/app/budget">
                  Zum Budget
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Tasks Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Nächste Aufgaben
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {phaseTasks.length > 0 ? (
                <ul className="space-y-3">
                  {phaseTasks.map((task) => (
                    <li key={task.id} className="flex items-start gap-2">
                      <Circle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{task.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Keine offenen Aufgaben in der aktuellen Phase
                </p>
              )}
              <Button asChild variant="ghost" size="sm" className="mt-4 -ml-2">
                <Link to="/app/bauphasen">
                  Alle Aufgaben
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Nächste Termine
              </CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <li key={event.id} className="flex items-start gap-3">
                      <div className="text-center bg-secondary rounded-lg px-2 py-1 flex-shrink-0">
                        <div className="text-xs font-medium text-muted-foreground">
                          {format(event.dateTime, 'MMM', { locale: de })}
                        </div>
                        <div className="text-lg font-bold">
                          {format(event.dateTime, 'd')}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(event.dateTime, 'HH:mm', { locale: de })} Uhr
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Keine kommenden Termine
                </p>
              )}
              <Button asChild variant="ghost" size="sm" className="mt-4 -ml-2">
                <Link to="/app/termine">
                  Alle Termine
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Latest Diary Entry Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Letzter Tagebucheintrag
              </CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {latestDiary ? (
                <>
                  <p className="text-sm text-muted-foreground mb-1">
                    {format(latestDiary.date, 'dd. MMMM yyyy', { locale: de })}
                  </p>
                  <p className="text-sm line-clamp-3">{latestDiary.text}</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Noch keine Einträge vorhanden
                </p>
              )}
              <Button asChild variant="ghost" size="sm" className="mt-4 -ml-2">
                <Link to="/app/bautagebuch">
                  Zum Bautagebuch
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ratgeber Teaser Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="h-full bg-gradient-to-br from-accent/10 to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ratgeber
              </CardTitle>
              <Lightbulb className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Wissen für Bauherren</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hilfreiche Artikel zu Planung, Finanzierung, Verträgen und Baurecht.
              </p>
              <Button asChild variant="accent" size="sm">
                <Link to="/app/ratgeber">
                  Zum Ratgeber
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
