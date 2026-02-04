import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  Image,
  Calendar,
} from 'lucide-react'
import { useProject } from '@/contexts/ProjectContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import type { DiaryEntry } from '@/types'

export function Diary() {
  const { currentProject, diaryEntries, createDiaryEntry, updateDiaryEntry, deleteDiaryEntry } = useProject()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null)
  const [entryDate, setEntryDate] = useState('')
  const [entryText, setEntryText] = useState('')
  const [entryPhotoUrl, setEntryPhotoUrl] = useState('')

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Kein Projekt ausgewählt</p>
      </div>
    )
  }

  const handleAddEntry = () => {
    setEditingEntry(null)
    setEntryDate(format(new Date(), 'yyyy-MM-dd'))
    setEntryText('')
    setEntryPhotoUrl('')
    setDialogOpen(true)
  }

  const handleEditEntry = (entry: DiaryEntry) => {
    setEditingEntry(entry)
    setEntryDate(format(entry.date, 'yyyy-MM-dd'))
    setEntryText(entry.text)
    setEntryPhotoUrl(entry.photoUrl || '')
    setDialogOpen(true)
  }

  const handleSaveEntry = async () => {
    if (!entryText.trim() || !entryDate || !currentProject) return

    if (editingEntry) {
      await updateDiaryEntry(editingEntry.id, {
        date: new Date(entryDate),
        text: entryText.trim(),
        photoUrl: entryPhotoUrl || undefined,
      })
    } else {
      await createDiaryEntry({
        projectId: currentProject.id,
        date: new Date(entryDate),
        text: entryText.trim(),
        photoUrl: entryPhotoUrl || undefined,
      })
    }

    setDialogOpen(false)
  }

  const handleDeleteEntry = async (entryId: string) => {
    await deleteDiaryEntry(entryId)
  }

  // Group entries by month
  const entriesByMonth = diaryEntries.reduce((acc, entry) => {
    const monthKey = format(entry.date, 'yyyy-MM')
    if (!acc[monthKey]) {
      acc[monthKey] = []
    }
    acc[monthKey].push(entry)
    return acc
  }, {} as Record<string, DiaryEntry[]>)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Bautagebuch</h1>
          <p className="text-muted-foreground">
            {diaryEntries.length} Einträge dokumentiert
          </p>
        </div>
        <Button variant="accent" onClick={handleAddEntry}>
          <Plus className="w-4 h-4 mr-2" />
          Neuer Eintrag
        </Button>
      </motion.div>

      {diaryEntries.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(entriesByMonth)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([monthKey, entries]) => (
              <motion.div
                key={monthKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  {format(new Date(monthKey + '-01'), 'MMMM yyyy', { locale: de })}
                </h2>

                <div className="space-y-4">
                  {entries.map((entry) => (
                    <Card key={entry.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-medium text-muted-foreground">
                            {format(entry.date, 'EEEE, dd. MMMM yyyy', { locale: de })}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditEntry(entry)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeleteEntry(entry.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-wrap">{entry.text}</p>

                        {entry.photoUrl && (
                          <div className="mt-4">
                            <img
                              src={entry.photoUrl}
                              alt="Bautagebuch Foto"
                              className="rounded-lg max-h-64 object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Noch keine Einträge</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dokumentieren Sie Ihren Baufortschritt mit dem ersten Eintrag
              </p>
              <Button variant="accent" onClick={handleAddEntry}>
                <Plus className="w-4 h-4 mr-2" />
                Ersten Eintrag erstellen
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Entry Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingEntry ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="entry-date">Datum</Label>
              <Input
                id="entry-date"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry-text">Beschreibung</Label>
              <Textarea
                id="entry-text"
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
                placeholder="Was wurde heute gemacht? Welche Fortschritte gab es?"
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry-photo" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Foto-URL (optional)
              </Label>
              <Input
                id="entry-photo"
                type="url"
                value={entryPhotoUrl}
                onChange={(e) => setEntryPhotoUrl(e.target.value)}
                placeholder="https://..."
              />
              <p className="text-xs text-muted-foreground">
                Fügen Sie eine URL zu einem Foto ein (z.B. von einem Cloud-Speicher)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="accent" onClick={handleSaveEntry}>
              {editingEntry ? 'Speichern' : 'Erstellen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
