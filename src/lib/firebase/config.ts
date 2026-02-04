import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD2BshXy2kr4WuVdaSho7EZfI4GLNuzMT4',
  authDomain: 'hauspilo.firebaseapp.com',
  projectId: 'hauspilo',
  storageBucket: 'hauspilo.firebasestorage.app',
  messagingSenderId: '438290006756',
  appId: '1:438290006756:web:a3cf76f2bbb65461f4a2f1',
}

export const isFirebaseConfigured = true

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
