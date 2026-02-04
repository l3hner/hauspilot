import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { useAuth } from './AuthContext'
import type { Project, Task, CalendarEvent, Expense, DiaryEntry } from '@/types'
import { DEFAULT_PHASES } from '@/types'

interface ProjectContextType {
  projects: Project[]
  currentProject: Project | null
  tasks: Task[]
  events: CalendarEvent[]
  expenses: Expense[]
  diaryEntries: DiaryEntry[]
  loading: boolean
  setCurrentProject: (project: Project | null) => void
  createProject: (data: Omit<Project, 'id' | 'ownerId' | 'createdAt' | 'activePhaseId'>) => Promise<string>
  updateProject: (id: string, data: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  createTask: (data: Omit<Task, 'id' | 'createdAt'>) => Promise<string>
  updateTask: (id: string, data: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  createEvent: (data: Omit<CalendarEvent, 'id' | 'createdAt'>) => Promise<string>
  updateEvent: (id: string, data: Partial<CalendarEvent>) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  createExpense: (data: Omit<Expense, 'id' | 'createdAt'>) => Promise<string>
  updateExpense: (id: string, data: Partial<Expense>) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
  createDiaryEntry: (data: Omit<DiaryEntry, 'id' | 'createdAt'>) => Promise<string>
  updateDiaryEntry: (id: string, data: Partial<DiaryEntry>) => Promise<void>
  deleteDiaryEntry: (id: string) => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

function convertTimestamp(timestamp: Timestamp | Date | undefined): Date {
  if (!timestamp) return new Date()
  if (timestamp instanceof Timestamp) return timestamp.toDate()
  return timestamp
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { firebaseUser } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)

  // Load projects
  useEffect(() => {
    if (!firebaseUser) {
      setProjects([])
      setCurrentProject(null)
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', firebaseUser.uid)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        startDate: convertTimestamp(doc.data().startDate),
        createdAt: convertTimestamp(doc.data().createdAt),
      })) as Project[]

      setProjects(projectsData)

      if (projectsData.length > 0 && !currentProject) {
        setCurrentProject(projectsData[0])
      }

      setLoading(false)
    })

    return unsubscribe
  }, [firebaseUser])

  // Load tasks for current project
  useEffect(() => {
    if (!currentProject) {
      setTasks([])
      return
    }

    const q = query(
      collection(db, 'tasks'),
      where('projectId', '==', currentProject.id),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        dueDate: doc.data().dueDate ? convertTimestamp(doc.data().dueDate) : undefined,
        createdAt: convertTimestamp(doc.data().createdAt),
      })) as Task[]

      setTasks(tasksData)
    })

    return unsubscribe
  }, [currentProject])

  // Load events for current project
  useEffect(() => {
    if (!currentProject) {
      setEvents([])
      return
    }

    const q = query(
      collection(db, 'events'),
      where('projectId', '==', currentProject.id),
      orderBy('dateTime', 'asc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        dateTime: convertTimestamp(doc.data().dateTime),
        createdAt: convertTimestamp(doc.data().createdAt),
      })) as CalendarEvent[]

      setEvents(eventsData)
    })

    return unsubscribe
  }, [currentProject])

  // Load expenses for current project
  useEffect(() => {
    if (!currentProject) {
      setExpenses([])
      return
    }

    const q = query(
      collection(db, 'expenses'),
      where('projectId', '==', currentProject.id),
      orderBy('date', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: convertTimestamp(doc.data().date),
        createdAt: convertTimestamp(doc.data().createdAt),
      })) as Expense[]

      setExpenses(expensesData)
    })

    return unsubscribe
  }, [currentProject])

  // Load diary entries for current project
  useEffect(() => {
    if (!currentProject) {
      setDiaryEntries([])
      return
    }

    const q = query(
      collection(db, 'diaryEntries'),
      where('projectId', '==', currentProject.id),
      orderBy('date', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: convertTimestamp(doc.data().date),
        createdAt: convertTimestamp(doc.data().createdAt),
      })) as DiaryEntry[]

      setDiaryEntries(entriesData)
    })

    return unsubscribe
  }, [currentProject])

  const createProject = async (data: Omit<Project, 'id' | 'ownerId' | 'createdAt' | 'activePhaseId'>) => {
    if (!firebaseUser) throw new Error('Not authenticated')

    const docRef = await addDoc(collection(db, 'projects'), {
      ...data,
      ownerId: firebaseUser.uid,
      activePhaseId: DEFAULT_PHASES[0].phaseId,
      startDate: Timestamp.fromDate(data.startDate),
      createdAt: serverTimestamp(),
    })

    // Create default phases
    for (const phase of DEFAULT_PHASES) {
      await addDoc(collection(db, 'phases'), {
        projectId: docRef.id,
        phaseId: phase.phaseId,
        title: phase.title,
        order: phase.order,
      })
    }

    return docRef.id
  }

  const updateProject = async (id: string, data: Partial<Project>) => {
    const updateData: Record<string, unknown> = { ...data }
    if (data.startDate) {
      updateData.startDate = Timestamp.fromDate(data.startDate)
    }
    await updateDoc(doc(db, 'projects', id), updateData)
  }

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, 'projects', id))
  }

  const createTask = async (data: Omit<Task, 'id' | 'createdAt'>) => {
    const taskData: Record<string, unknown> = {
      ...data,
      createdAt: serverTimestamp(),
    }
    if (data.dueDate) {
      taskData.dueDate = Timestamp.fromDate(data.dueDate)
    }
    const docRef = await addDoc(collection(db, 'tasks'), taskData)
    return docRef.id
  }

  const updateTask = async (id: string, data: Partial<Task>) => {
    const updateData: Record<string, unknown> = { ...data }
    if (data.dueDate) {
      updateData.dueDate = Timestamp.fromDate(data.dueDate)
    }
    await updateDoc(doc(db, 'tasks', id), updateData)
  }

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, 'tasks', id))
  }

  const createEvent = async (data: Omit<CalendarEvent, 'id' | 'createdAt'>) => {
    const docRef = await addDoc(collection(db, 'events'), {
      ...data,
      dateTime: Timestamp.fromDate(data.dateTime),
      createdAt: serverTimestamp(),
    })
    return docRef.id
  }

  const updateEvent = async (id: string, data: Partial<CalendarEvent>) => {
    const updateData: Record<string, unknown> = { ...data }
    if (data.dateTime) {
      updateData.dateTime = Timestamp.fromDate(data.dateTime)
    }
    await updateDoc(doc(db, 'events', id), updateData)
  }

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, 'events', id))
  }

  const createExpense = async (data: Omit<Expense, 'id' | 'createdAt'>) => {
    const docRef = await addDoc(collection(db, 'expenses'), {
      ...data,
      date: Timestamp.fromDate(data.date),
      createdAt: serverTimestamp(),
    })
    return docRef.id
  }

  const updateExpense = async (id: string, data: Partial<Expense>) => {
    const updateData: Record<string, unknown> = { ...data }
    if (data.date) {
      updateData.date = Timestamp.fromDate(data.date)
    }
    await updateDoc(doc(db, 'expenses', id), updateData)
  }

  const deleteExpense = async (id: string) => {
    await deleteDoc(doc(db, 'expenses', id))
  }

  const createDiaryEntry = async (data: Omit<DiaryEntry, 'id' | 'createdAt'>) => {
    const docRef = await addDoc(collection(db, 'diaryEntries'), {
      ...data,
      date: Timestamp.fromDate(data.date),
      createdAt: serverTimestamp(),
    })
    return docRef.id
  }

  const updateDiaryEntry = async (id: string, data: Partial<DiaryEntry>) => {
    const updateData: Record<string, unknown> = { ...data }
    if (data.date) {
      updateData.date = Timestamp.fromDate(data.date)
    }
    await updateDoc(doc(db, 'diaryEntries', id), updateData)
  }

  const deleteDiaryEntry = async (id: string) => {
    await deleteDoc(doc(db, 'diaryEntries', id))
  }

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      tasks,
      events,
      expenses,
      diaryEntries,
      loading,
      setCurrentProject,
      createProject,
      updateProject,
      deleteProject,
      createTask,
      updateTask,
      deleteTask,
      createEvent,
      updateEvent,
      deleteEvent,
      createExpense,
      updateExpense,
      deleteExpense,
      createDiaryEntry,
      updateDiaryEntry,
      deleteDiaryEntry,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}
