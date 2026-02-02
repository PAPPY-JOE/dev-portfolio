import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';
import { Navigation } from './components/Navigation';
import { TerminalHero } from './components/TerminalHero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AboutSection } from './components/AboutSection';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { ContentProvider, useContent } from './context/ContentContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-terminal-black flex items-center justify-center">
      <div className="text-center">
        <Loader2
          size={48}
          className="text-accent-green animate-spin mx-auto mb-4" />

        <p className="text-terminal-muted font-mono text-sm">
          Initializing system...
        </p>
      </div>
    </div>);

}
function HomePage() {
  const { isLoading } = useContent();
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-h-screen bg-terminal-black text-terminal-text selection:bg-accent-green/30 selection:text-accent-green">
      <Navigation />
      <main>
        <TerminalHero />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-terminal-border -z-10 hidden md:block"></div>
          <ProjectsSection />
          <AboutSection />
          <SkillsSection />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>);

}
function ProtectedRoute({ children }: {children: React.ReactNode;}) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <LoadingScreen />;
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
        <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

    </Routes>);

}
export function App() {
  return (
    <Router>
      <AuthProvider>
        <ContentProvider>
          <AppRoutes />
        </ContentProvider>
      </AuthProvider>
    </Router>);

}