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
import { usePortfolioMotion } from './hooks/usePortfolioMotion';
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
  const { content, isLoading } = useContent();
  const motionRoot = usePortfolioMotion(content);
  return (
    <div className="portfolio" ref={motionRoot}>
      <Navigation />
      <main id="main-content" aria-busy={isLoading}>
        <TerminalHero />
        <div>
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
