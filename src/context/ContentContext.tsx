import React, { useEffect, useState, createContext, useContext } from 'react';
import { SiteContent, Project, Experience, SkillCategory } from '../types';
import { initialContent } from '../data/initialContent';
import {
  getContent,
  updateFirestoreContent,
  subscribeToContent,
  isFirebaseConfigured } from
'../services/firebase';
interface ContentContextType {
  content: SiteContent;
  isLoading: boolean;
  isSaving: boolean;
  updateContent: (newContent: Partial<SiteContent>) => Promise<void>;
  updateHero: (hero: SiteContent['hero']) => Promise<void>;
  updateAbout: (about: SiteContent['about']) => Promise<void>;
  updateSocial: (social: SiteContent['social']) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateExperience: (experience: Experience) => Promise<void>;
  addExperience: (experience: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  updateSkillCategory: (category: SkillCategory) => Promise<void>;
  addSkillCategory: (category: SkillCategory) => Promise<void>;
  deleteSkillCategory: (id: string) => Promise<void>;
  resetContent: () => Promise<void>;
}
const ContentContext = createContext<ContentContextType | undefined>(undefined);
export function ContentProvider({ children }: {children: React.ReactNode;}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const loadContent = async () => {
      if (!isFirebaseConfigured()) {
        // Fallback to localStorage
        const saved = localStorage.getItem('portfolio_content');
        if (saved) {
          setContent(JSON.parse(saved));
        }
        setIsLoading(false);
        return;
      }
      try {
        const firebaseContent = await getContent();
        setContent(firebaseContent);
      } catch (error) {
        console.error('Error loading content:', error);
      }
      setIsLoading(false);
    };
    loadContent();
    // Subscribe to real-time updates if Firebase is configured
    if (isFirebaseConfigured()) {
      const unsubscribe = subscribeToContent((newContent) => {
        setContent(newContent);
      });
      return () => unsubscribe();
    }
  }, []);
  const saveContent = async (newContent: SiteContent) => {
    setIsSaving(true);
    try {
      if (isFirebaseConfigured()) {
        await updateFirestoreContent(newContent);
      } else {
        localStorage.setItem('portfolio_content', JSON.stringify(newContent));
      }
      setContent(newContent);
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };
  const updateContent = async (newContent: Partial<SiteContent>) => {
    const updated = {
      ...content,
      ...newContent
    };
    await saveContent(updated);
  };
  const updateHero = async (hero: SiteContent['hero']) => {
    await saveContent({
      ...content,
      hero
    });
  };
  const updateAbout = async (about: SiteContent['about']) => {
    await saveContent({
      ...content,
      about
    });
  };
  const updateSocial = async (social: SiteContent['social']) => {
    await saveContent({
      ...content,
      social
    });
  };
  const updateProject = async (updatedProject: Project) => {
    const updated = {
      ...content,
      projects: content.projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
      )
    };
    await saveContent(updated);
  };
  const addProject = async (project: Project) => {
    const updated = {
      ...content,
      projects: [
      ...content.projects,
      {
        ...project,
        id: Date.now().toString()
      }]

    };
    await saveContent(updated);
  };
  const deleteProject = async (id: string) => {
    const updated = {
      ...content,
      projects: content.projects.filter((p) => p.id !== id)
    };
    await saveContent(updated);
  };
  const updateExperience = async (updatedExp: Experience) => {
    const updated = {
      ...content,
      experience: content.experience.map((e) =>
      e.id === updatedExp.id ? updatedExp : e
      )
    };
    await saveContent(updated);
  };
  const addExperience = async (experience: Experience) => {
    const updated = {
      ...content,
      experience: [
      ...content.experience,
      {
        ...experience,
        id: Date.now().toString()
      }]

    };
    await saveContent(updated);
  };
  const deleteExperience = async (id: string) => {
    const updated = {
      ...content,
      experience: content.experience.filter((e) => e.id !== id)
    };
    await saveContent(updated);
  };
  const updateSkillCategory = async (updatedCategory: SkillCategory) => {
    const updated = {
      ...content,
      skills: content.skills.map((s) =>
      s.id === updatedCategory.id ? updatedCategory : s
      )
    };
    await saveContent(updated);
  };
  const addSkillCategory = async (category: SkillCategory) => {
    const updated = {
      ...content,
      skills: [
      ...content.skills,
      {
        ...category,
        id: Date.now().toString()
      }]

    };
    await saveContent(updated);
  };
  const deleteSkillCategory = async (id: string) => {
    const updated = {
      ...content,
      skills: content.skills.filter((s) => s.id !== id)
    };
    await saveContent(updated);
  };
  const resetContent = async () => {
    await saveContent(initialContent);
  };
  return (
    <ContentContext.Provider
      value={{
        content,
        isLoading,
        isSaving,
        updateContent,
        updateHero,
        updateAbout,
        updateSocial,
        updateProject,
        addProject,
        deleteProject,
        updateExperience,
        addExperience,
        deleteExperience,
        updateSkillCategory,
        addSkillCategory,
        deleteSkillCategory,
        resetContent
      }}>

      {children}
    </ContentContext.Provider>);

}
export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}