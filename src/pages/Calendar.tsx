import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  Plus,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Bell,
  BellOff,
} from 'lucide-react'
import { useProject } from '@/contexts/ProjectContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EVENT_CATEGORIES } from '@/types'
import type { CalendarEvent } from '@/types'

export function Calendar() {
  const { currentProject, events, createEvent, updateEvent, deleteEvent } = useProject()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventCategory, setEventCategory] = useState<string>(EVENT_CATEGORIES[0])
  const [eventReminder, setEventReminder] = useState(true)

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Kein Projekt ausgewählt</p>
      </div>
    )
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Add padding days
  const startPadding = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1
  const paddedDays = Array(startPadding).fill(null).concat(monthDays)

  const getEventsForDay = (day: Date) => {
    return events.filter((e) => isSameDay(e.dateTime, day))
  }

  const handleAddEvent = () => {
    setEditingEvent(null)
    setEventTitle('')
    setEventDate(format(new Date(), 'yyyy-MM-dd'))
    setEventTime('09:00')
    setEventCategory(EVENT_CATEGORIES[0])
    setEventReminder(true)
    setDialogOpen(true)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event)
    setEventTitle(event.title)
    setEventDate(format(event.dateTime, 'yyyy-MM-dd'))
    setEventTime(format(event.dateTime, 'HH:mm'))
    setEventCategory(event.category)
    setEventReminder(event.reminderEnabled)
    setDialogOpen(true)
  }

  const handleSaveEvent = async () => {
    if (!eventTitle.trim() || !eventDate || !currentProject) return

    const dateTime = new Date(`${eventDate}T${eventTime || '09:00'}`)

    if (editingEvent) {
      await updateEvent(editingEvent.id, {
        title: eventTitle.trim(),
        dateTime,
        category: eventCategory,
        reminderEnabled: eventReminder,
      })
    } else {
      await createEvent({
        projectId: currentProject.id,
        title: eventTitle.trim(),
        dateTime,
        category: eventCategory,
        reminderEnabled: eventReminder,
      })
    }

    setDialogOpen(false)
  }

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId)
  }

  const upcomingEvents = events
    .filter((e) => e.dateTime >= new Date())
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Termine</h1>
          <p className="text-muted-foreground">
            {upcomingEvents.length} kommende Termine
          </p>
        </div>
        <Button variant="accent" onClick={handleAddEvent}>
          <Plus className="w-4 h-4 mr-2" />
          Neuer Termin
        </Button>
      </motion.div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-0">
                {upcomingEvents.length > 0 ? (
                  <ul className="divide-y">
                    {upcomingEvents.map((event) => (
                      <li
                        key={event.id}
                        className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="text-center bg-secondary rounded-lg px-3 py-2 min-w-[60px]">
                          <div className="text-xs font-medium text-muted-foreground uppercase">
                            {format(event.dateTime, 'MMM', { locale: de })}
                          </div>
                          <div className="text-2xl font-bold">
                            {format(event.dateTime, 'd')}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{event.title}</span>
                            {event.reminderEnabled && (
                              <Bell className="w-3 h-3 text-accent" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {format(event.dateTime, 'HH:mm', { locale: de })} Uhr
                            </span>
                            <Badge variant="secondary">{event.category}</Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Keine Termine</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Erstellen Sie Ihren ersten Termin
                    </p>
                    <Button variant="accent" onClick={handleAddEvent}>
                      <Plus className="w-4 h-4 mr-2" />
                      Neuer Termin
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="calendar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {format(currentMonth, 'MMMM yyyy', { locale: de })}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(new Date())}
                  >
                    Heute
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-muted-foreground py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {paddedDays.map((day, index) => {
                    if (!day) {
                      return <div key={`empty-${index}`} className="h-24" />
                    }

                    const dayEvents = getEventsForDay(day)
                    const isToday = isSameDay(day, new Date())

                    return (
                      <div
                        key={day.toISOString()}
                        className={`h-24 border rounded-lg p-1 ${
                          isToday ? 'border-accent bg-accent/5' : 'border-border'
                        }`}
                      >
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isToday ? 'text-accent' : 'text-foreground'
                          }`}
                        >
                          {format(day, 'd')}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs bg-accent/10 text-accent rounded px-1 py-0.5 truncate cursor-pointer"
                              onClick={() => handleEditEvent(event)}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayEvents.length - 2} weitere
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Termin bearbeiten' : 'Neuer Termin'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Titel</Label>
              <Input
                id="event-title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="z.B. Baustellentermin"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-date">Datum</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-time">Uhrzeit</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-category">Kategorie</Label>
              <Select value={eventCategory} onValueChange={setEventCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {eventReminder ? (
                  <Bell className="w-4 h-4 text-accent" />
                ) : (
                  <BellOff className="w-4 h-4 text-muted-foreground" />
                )}
                <Label htmlFor="event-reminder">Erinnerung</Label>
              </div>
              <Switch
                id="event-reminder"
                checked={eventReminder}
                onCheckedChange={setEventReminder}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="accent" onClick={handleSaveEvent}>
              {editingEvent ? 'Speichern' : 'Erstellen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
