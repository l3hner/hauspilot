import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  type User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '@/lib/firebase/config'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  isNewUser: boolean
  isConfigured: boolean
  setIsNewUser: (value: boolean) => void
  register: (email: string, password: string, name?: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setFirebaseUser(firebaseUser)

        if (firebaseUser) {
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
            if (userDoc.exists()) {
              const data = userDoc.data()
              setUser({
                id: firebaseUser.uid,
                email: data.email,
                name: data.name,
                createdAt: data.createdAt?.toDate() || new Date(),
              })
            }
          } catch (err) {
            console.error('Error fetching user data:', err)
          }
        } else {
          setUser(null)
        }

        setLoading(false)
      })

      return unsubscribe
    } catch (err) {
      console.error('Auth error:', err)
      setLoading(false)
    }
  }, [])

  const register = async (email: string, password: string, name?: string) => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase nicht konfiguriert')
    }
    const result = await createUserWithEmailAndPassword(auth, email, password)

    await setDoc(doc(db, 'users', result.user.uid), {
      email,
      name: name || null,
      createdAt: serverTimestamp(),
    })

    setIsNewUser(true)
  }

  const login = async (email: string, password: string) => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase nicht konfiguriert')
    }
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    if (!isFirebaseConfigured) return
    await signOut(auth)
    setUser(null)
    setIsNewUser(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      loading,
      isNewUser,
      isConfigured: isFirebaseConfigured,
      setIsNewUser,
      register,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
