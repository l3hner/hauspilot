import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  Check,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useProject } from '@/contexts/ProjectContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { DEFAULT_PHASES } from '@/types'
import type { Task } from '@/types'

export function Phases() {
  const { currentProject, tasks, createTask, updateTask, deleteTask, updateProject } = useProject()
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('')

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Kein Projekt ausgewählt</p>
      </div>
    )
  }

  const activePhaseIndex = DEFAULT_PHASES.findIndex(
    (p) => p.phaseId === currentProject.activePhaseId
  )

  const getPhaseProgress = (phaseId: string) => {
    const phaseTasks = tasks.filter((t) => t.phaseId === phaseId)
    if (phaseTasks.length === 0) return 0
    const doneTasks = phaseTasks.filter((t) => t.done).length
    return Math.round((doneTasks / phaseTasks.length) * 100)
  }

  const handleAddTask = (phaseId: string) => {
    setSelectedPhaseId(phaseId)
    setEditingTask(null)
    setTaskTitle('')
    setTaskDueDate('')
    setDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setTaskTitle(task.title)
    setTaskDueDate(task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : '')
    setSelectedPhaseId(task.phaseId)
    setDialogOpen(true)
  }

  const handleSaveTask = async () => {
    if (!taskTitle.trim() || !currentProject) return

    if (editingTask) {
      await updateTask(editingTask.id, {
        title: taskTitle.trim(),
        dueDate: taskDueDate ? new Date(taskDueDate) : undefined,
      })
    } else {
      await createTask({
        projectId: currentProject.id,
        phaseId: selectedPhaseId,
        title: taskTitle.trim(),
        done: false,
        dueDate: taskDueDate ? new Date(taskDueDate) : undefined,
      })
    }

    setDialogOpen(false)
    setTaskTitle('')
    setTaskDueDate('')
    setEditingTask(null)
  }

  const handleToggleTask = async (task: Task) => {
    await updateTask(task.id, { done: !task.done })
  }

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId)
  }

  const handleSetActivePhase = async (phaseId: string) => {
    await updateProject(currentProject.id, { activePhaseId: phaseId })
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">Bauphasen</h1>
        <p className="text-muted-foreground">
          {activePhaseIndex + 1} von {DEFAULT_PHASES.length} Phasen aktiv
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        {/* Progress line */}
        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
        <div
          className="hidden lg:block absolute left-8 top-0 w-0.5 bg-accent transition-all duration-500"
          style={{ height: `${((activePhaseIndex + 1) / DEFAULT_PHASES.length) * 100}%` }}
        />

        <div className="space-y-4">
          {DEFAULT_PHASES.map((phase, index) => {
            const isActive = phase.phaseId === currentProject.activePhaseId
            const isCompleted = index < activePhaseIndex
            const phaseTasks = tasks.filter((t) => t.phaseId === phase.phaseId)
            const progress = getPhaseProgress(phase.phaseId)
            const isExpanded = expandedPhase === phase.phaseId

            return (
              <motion.div
                key={phase.phaseId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`${isActive ? 'ring-2 ring-accent' : ''}`}>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.phaseId)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Step indicator */}
                      <div className="hidden lg:flex items-center justify-center relative z-10">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCompleted
                              ? 'bg-accent text-white'
                              : isActive
                              ? 'bg-accent text-white'
                              : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="lg:hidden text-sm font-medium text-muted-foreground">
                            Phase {index + 1}
                          </span>
                          {isActive && <Badge variant="accent">Aktiv</Badge>}
                          {isCompleted && <Badge variant="success">Abgeschlossen</Badge>}
                        </div>
                        <CardTitle className="text-lg">{phase.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Progress value={progress} className="h-1.5 flex-1 max-w-xs" />
                          <span className="text-sm text-muted-foreground">
                            {phaseTasks.filter((t) => t.done).length}/{phaseTasks.length} Aufgaben
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isActive && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSetActivePhase(phase.phaseId)
                            }}
                          >
                            Aktivieren
                          </Button>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardContent className="pt-0">
                          <div className="border-t pt-4">
                            {phaseTasks.length > 0 ? (
                              <ul className="space-y-2">
                                {phaseTasks.map((task) => (
                                  <li
                                    key={task.id}
                                    className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                                  >
                                    <Checkbox
                                      checked={task.done}
                                      onCheckedChange={() => handleToggleTask(task)}
                                    />
                                    <span
                                      className={`flex-1 ${
                                        task.done ? 'line-through text-muted-foreground' : ''
                                      }`}
                                    >
                                      {task.title}
                                    </span>
                                    {task.dueDate && (
                                      <span className="text-xs text-muted-foreground">
                                        {format(task.dueDate, 'dd.MM.yyyy', { locale: de })}
                                      </span>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleEditTask(task)}
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-destructive"
                                      onClick={() => handleDeleteTask(task.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                Noch keine Aufgaben in dieser Phase
                              </p>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4 w-full"
                              onClick={() => handleAddTask(phase.phaseId)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Aufgabe hinzufügen
                            </Button>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Task Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTask ? 'Aufgabe bearbeiten' : 'Neue Aufgabe'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Aufgabe</Label>
              <Input
                id="task-title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="z.B. Angebote einholen"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-due">Fälligkeitsdatum (optional)</Label>
              <Input
                id="task-due"
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="accent" onClick={handleSaveTask}>
              {editingTask ? 'Speichern' : 'Hinzufügen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
