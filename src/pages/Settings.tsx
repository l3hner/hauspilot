import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Home,
  LogOut,
  Trash2,
  Plus,
  Check,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useProject } from '@/contexts/ProjectContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

export function Settings() {
  const { user, logout } = useAuth()
  const { projects, currentProject, setCurrentProject, createProject, deleteProject } = useProject()
  const navigate = useNavigate()

  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

  const [projectName, setProjectName] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [projectStartDate, setProjectStartDate] = useState('')
  const [projectBudget, setProjectBudget] = useState('')

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleCreateProject = async () => {
    if (!projectName.trim()) return

    await createProject({
      name: projectName.trim(),
      location: projectLocation.trim() || undefined,
      startDate: projectStartDate ? new Date(projectStartDate) : new Date(),
      budget: projectBudget ? parseFloat(projectBudget) : 0,
    })

    setNewProjectDialogOpen(false)
    setProjectName('')
    setProjectLocation('')
    setProjectStartDate('')
    setProjectBudget('')
  }

  const handleDeleteProject = async () => {
    if (!projectToDelete) return

    await deleteProject(projectToDelete)

    if (currentProject?.id === projectToDelete) {
      const remaining = projects.filter((p) => p.id !== projectToDelete)
      setCurrentProject(remaining[0] || null)
    }

    setDeleteDialogOpen(false)
    setProjectToDelete(null)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">Einstellungen</h1>
        <p className="text-muted-foreground">
          Verwalten Sie Ihr Profil und Ihre Projekte
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-lg">Profil</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">E-Mail</Label>
              <p className="font-medium">{user?.email}</p>
            </div>
            {user?.name && (
              <div className="space-y-2">
                <Label className="text-muted-foreground">Name</Label>
                <p className="font-medium">{user.name}</p>
              </div>
            )}

            <Separator />

            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Projects Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-muted-foreground" />
                <CardTitle className="text-lg">Projekte</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewProjectDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Neues Projekt
              </Button>
            </div>
            <CardDescription>
              Wählen Sie ein Projekt aus oder erstellen Sie ein neues
            </CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length > 0 ? (
              <ul className="space-y-2">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      currentProject?.id === project.id
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:bg-secondary/50'
                    }`}
                  >
                    <button
                      className="flex-1 text-left"
                      onClick={() => setCurrentProject(project)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{project.name}</span>
                        {currentProject?.id === project.id && (
                          <Check className="w-4 h-4 text-accent" />
                        )}
                      </div>
                      {project.location && (
                        <p className="text-sm text-muted-foreground">
                          {project.location}
                        </p>
                      )}
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        setProjectToDelete(project.id)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Noch keine Projekte vorhanden
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* New Project Dialog */}
      <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neues Projekt</DialogTitle>
            <DialogDescription>
              Legen Sie ein neues Bauprojekt an
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Projektname *</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="z.B. Einfamilienhaus Musterstadt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-location">Ort (optional)</Label>
              <Input
                id="project-location"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                placeholder="z.B. 12345 Musterstadt"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-start">Baubeginn</Label>
                <Input
                  id="project-start"
                  type="date"
                  value={projectStartDate}
                  onChange={(e) => setProjectStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-budget">Budget (€)</Label>
                <Input
                  id="project-budget"
                  type="number"
                  value={projectBudget}
                  onChange={(e) => setProjectBudget(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewProjectDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="accent" onClick={handleCreateProject}>
              Erstellen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Projekt löschen</DialogTitle>
            <DialogDescription>
              Sind Sie sicher, dass Sie dieses Projekt löschen möchten?
              Alle Daten werden unwiderruflich gelöscht.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
