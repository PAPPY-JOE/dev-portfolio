import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDocs,
  Unsubscribe,
} from 'firebase/firestore'
import { SiteContent, ContactMessage } from '../types'
import { initialContent } from '../data/initialContent'

// Firebase configuration - Replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'API_KEY',
  authDomain:
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'PROJECT.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'PROJECT_ID',
  storageBucket:
  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'PROJECT.appspot.com',
  messagingSenderId:
  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'APP_ID',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Auth functions
export const loginWithEmail = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

export const onAuthChange = (
  callback: (user: User | null) => void,
): Unsubscribe => {
  return onAuthStateChanged(auth, callback)
}

// Firestore content functions
const CONTENT_DOC = 'portfolio/content'

export const getContent = async (): Promise<SiteContent> => {
  try {
    const docRef = doc(db, CONTENT_DOC)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as SiteContent
    } else {
      // Initialize with default content if document doesn't exist
      await setDoc(docRef, initialContent)
      return initialContent
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    // Fallback to initial content if Firebase fails
    return initialContent
  }
}

export const updateFirestoreContent = async (
  content: SiteContent,
): Promise<void> => {
  try {
    const docRef = doc(db, CONTENT_DOC)
    await setDoc(docRef, content)
  } catch (error) {
    console.error('Error updating content:', error)
    throw error
  }
}

export const subscribeToContent = (
  callback: (content: SiteContent) => void,
): Unsubscribe => {
  const docRef = doc(db, CONTENT_DOC)
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as SiteContent)
      }
    },
    (error) => {
      console.error('Error subscribing to content:', error)
    },
  )
}

// Helper to check if Firebase is properly configured
export const isFirebaseConfigured = (): boolean => {
  return (
    firebaseConfig.apiKey !== 'API_KEY' &&
    firebaseConfig.projectId !== 'PROJECT_ID'
  )
}

// ============================================
// CONTACT MESSAGES FUNCTIONS
// ============================================

const MESSAGES_COLLECTION = 'messages'

export const submitContactMessage = async (
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'status' | 'notes'>,
): Promise<string> => {
  try {
    if (!isFirebaseConfigured()) {
      // Demo mode - save to localStorage
      const messages = JSON.parse(
        localStorage.getItem('portfolio_messages') || '[]',
      )
      const newMessage: ContactMessage = {
        ...data,
        id: Date.now().toString(),
        createdAt: Date.now(),
        status: 'new',
        notes: '',
      }
      messages.unshift(newMessage)
      localStorage.setItem('portfolio_messages', JSON.stringify(messages))
      return newMessage.id
    }

    const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
      ...data,
      createdAt: Date.now(),
      status: 'new',
      notes: '',
    })
    return docRef.id
  } catch (error) {
    console.error('Error submitting message:', error)
    throw error
  }
}

export const getMessages = async (): Promise<ContactMessage[]> => {
  try {
    if (!isFirebaseConfigured()) {
      // Demo mode - get from localStorage
      return JSON.parse(localStorage.getItem('portfolio_messages') || '[]')
    }

    const q = query(
      collection(db, MESSAGES_COLLECTION),
      orderBy('createdAt', 'desc'),
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactMessage[]
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

export const updateMessage = async (
  id: string,
  updates: Partial<Omit<ContactMessage, 'id'>>,
): Promise<void> => {
  try {
    if (!isFirebaseConfigured()) {
      // Demo mode - update in localStorage
      const messages = JSON.parse(
        localStorage.getItem('portfolio_messages') || '[]',
      )
      const index = messages.findIndex((m: ContactMessage) => m.id === id)
      if (index !== -1) {
        messages[index] = { ...messages[index], ...updates }
        localStorage.setItem('portfolio_messages', JSON.stringify(messages))
      }
      return
    }

    const docRef = doc(db, MESSAGES_COLLECTION, id)
    await updateDoc(docRef, updates)
  } catch (error) {
    console.error('Error updating message:', error)
    throw error
  }
}

export const deleteMessage = async (id: string): Promise<void> => {
  try {
    if (!isFirebaseConfigured()) {
      // Demo mode - delete from localStorage
      const messages = JSON.parse(
        localStorage.getItem('portfolio_messages') || '[]',
      )
      const filtered = messages.filter((m: ContactMessage) => m.id !== id)
      localStorage.setItem('portfolio_messages', JSON.stringify(filtered))
      return
    }

    const docRef = doc(db, MESSAGES_COLLECTION, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting message:', error)
    throw error
  }
}

export const subscribeToMessages = (
  callback: (messages: ContactMessage[]) => void,
): Unsubscribe => {
  if (!isFirebaseConfigured()) {
    // Demo mode - just call callback with localStorage data
    callback(JSON.parse(localStorage.getItem('portfolio_messages') || '[]'))
    // Return a no-op unsubscribe function
    return () => {}
  }

  const q = query(
    collection(db, MESSAGES_COLLECTION),
    orderBy('createdAt', 'desc'),
  )
  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactMessage[]
      callback(messages)
    },
    (error) => {
      console.error('Error subscribing to messages:', error)
    },
  )
}  