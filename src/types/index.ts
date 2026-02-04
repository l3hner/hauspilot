export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
}

export interface Project {
  id: string
  ownerId: string
  name: string
  location?: string
  startDate: Date
  budget: number
  activePhaseId: string
  createdAt: Date
}

export interface Phase {
  id: string
  projectId: string
  phaseId: string
  title: string
  order: number
}

export interface Task {
  id: string
  projectId: string
  phaseId: string
  title: string
  done: boolean
  dueDate?: Date
  createdAt: Date
}

export interface CalendarEvent {
  id: string
  projectId: string
  title: string
  dateTime: Date
  category: string
  reminderEnabled: boolean
  createdAt: Date
}

export interface Expense {
  id: string
  projectId: string
  type: 'invoice' | 'offer' | 'expense'
  amount: number
  date: Date
  category: string
  note?: string
  createdAt: Date
}

export interface DiaryEntry {
  id: string
  projectId: string
  date: Date
  text: string
  photoUrl?: string
  createdAt: Date
}

export interface Article {
  id: string
  category: 'planung' | 'finanzierung' | 'vertraege' | 'baurecht'
  title: string
  summary: string
  content: string
  readTime: number
}

export const DEFAULT_PHASES = [
  { phaseId: 'erstberatung', title: 'Erstberatung / Grundstück', order: 1 },
  { phaseId: 'entwurf', title: 'Entwurfs- & Planungsphase', order: 2 },
  { phaseId: 'finanzierung', title: 'Finanzierung & Verträge', order: 3 },
  { phaseId: 'genehmigungen', title: 'Genehmigungen / Statik', order: 4 },
  { phaseId: 'erdarbeiten', title: 'Erdarbeiten & Bodenplatte', order: 5 },
  { phaseId: 'rohbau', title: 'Rohbau', order: 6 },
  { phaseId: 'dach', title: 'Dach & Fenster', order: 7 },
  { phaseId: 'haustechnik', title: 'Haustechnik (Sanitär, Elektro, Heizung)', order: 8 },
  { phaseId: 'innenausbau', title: 'Innenausbau', order: 9 },
  { phaseId: 'endabnahme', title: 'Endabnahme & Übergabe', order: 10 },
] as const

export const EXPENSE_CATEGORIES = [
  'Grundstück',
  'Planung & Architektur',
  'Genehmigungen',
  'Rohbau',
  'Dach',
  'Fenster & Türen',
  'Elektro',
  'Sanitär',
  'Heizung',
  'Innenausbau',
  'Außenanlagen',
  'Sonstiges',
] as const

export const EVENT_CATEGORIES = [
  'Baustellentermin',
  'Beratung',
  'Behörde',
  'Handwerker',
  'Abnahme',
  'Sonstiges',
] as const
