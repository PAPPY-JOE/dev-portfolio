import React, { useEffect, useState, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import {
  loginWithEmail,
  logoutUser,
  onAuthChange,
  isFirebaseConfigured } from
'../services/firebase';
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
  email: string,
  password: string)
  => Promise<{
    success: boolean;
    error?: string;
  }>;
  logout: () => Promise<void>;
  user: {
    email: string;
  } | null;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{
    email: string;
  } | null>(null);
  useEffect(() => {
    // Check if Firebase is configured
    if (!isFirebaseConfigured()) {
      // Fallback to localStorage for demo mode
      const savedAuth = localStorage.getItem('admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        setUser({
          email: 'fatoyejoseph@gmail.com'
        });
      }
      setIsLoading(false);
      return;
    }
    // Use Firebase Auth
    const unsubscribe = onAuthChange((firebaseUser: User | null) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        setUser({
          email: firebaseUser.email || ''
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const login = async (
  email: string,
  password: string)
  : Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      if (!isFirebaseConfigured()) {
        // Demo mode fallback
        if (email === 'fatoyejoseph@gmail.com' && password === 'admin123') {
          setIsAuthenticated(true);
          setUser({
            email
          });
          localStorage.setItem('admin_auth', 'true');
          return {
            success: true
          };
        }
        return {
          success: false,
          error: 'Invalid credentials. Demo: fatoyejoseph@gmail.com / admin123'
        };
      }
      await loginWithEmail(email, password);
      return {
        success: true
      };
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      return {
        success: false,
        error: errorMessage
      };
    }
  };
  const logout = async () => {
    try {
      if (isFirebaseConfigured()) {
        await logoutUser();
      } else {
        localStorage.removeItem('admin_auth');
      }
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        user
      }}>

      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}