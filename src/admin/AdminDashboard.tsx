import React, { useEffect, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { ImagePreview } from '../components/ImagePreview';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  LogOut,
  Layout,
  Briefcase,
  User,
  GraduationCap,
  Code,
  Link as LinkIcon,
  Loader2,
  RefreshCw,
  Home,
  MessageSquare,
  Clock,
  CheckCircle,
  Circle,
  Reply,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Project, Experience, SkillCategory, SkillItem, ContactMessage } from '../types';
import { Link } from 'react-router-dom';
import {
  getMessages,
  updateMessage,
  deleteMessage,
  subscribeToMessages,
  isFirebaseConfigured,
} from '../services/firebase'
type TabType =
  | 'hero'
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'social'
  | 'messages'
export function AdminDashboard() {
  const {
    content,
    isSaving,
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
    // resetContent
  } = useContent();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  // Messages state
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [messagesLoading, setMessagesLoading] = useState(true)
    const [expandedMessageId, setExpandedMessageId] = useState<string | null>(
      null,
    )
    const [editingNotes, setEditingNotes] = useState<string | null>(null)
    const [notesValue, setNotesValue] = useState('')
  // Editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [isNewExperience, setIsNewExperience] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillCategory | null>(null);
  const [isNewSkill, setIsNewSkill] = useState(false);
  // Local form states for immediate editing
  const [heroForm, setHeroForm] = useState(content.hero);
  const [aboutForm, setAboutForm] = useState(content.about);
  const [socialForm, setSocialForm] = useState(content.social);
  // Sync forms when content changes
  useEffect(() => {
    setHeroForm(content.hero);
    setAboutForm(content.about);
    setSocialForm(content.social);
  }, [content]);
// Load messages
  useEffect(() => {
    setMessagesLoading(true)
    if (isFirebaseConfigured()) {
      // Real-time subscription for Firebase
      const unsubscribe = subscribeToMessages((msgs) => {
        setMessages(msgs)
        setMessagesLoading(false)
      })
      return () => unsubscribe()
    } 
    else {
      // Demo mode - load from localStorage
      getMessages().then((msgs) => {
        setMessages(msgs)
        setMessagesLoading(false)
      })
    }
  }, [])
  // Refresh messages for demo mode
  const refreshMessages = async () => {
    if (!isFirebaseConfigured()) {
      const msgs = await getMessages()
      setMessages(msgs)
    }
  }
  const tabs = [
    {
      id: 'hero' as TabType,
      label: 'Hero',
      icon: Home,
    },
    {
      id: 'about' as TabType,
      label: 'About',
      icon: User,
    },
    {
      id: 'projects' as TabType,
      label: 'Projects',
      icon: Layout,
    },
    {
      id: 'experience' as TabType,
      label: 'Experience',
      icon: Briefcase,
    },
    {
      id: 'skills' as TabType,
      label: 'Skills',
      icon: Code,
    },
    {
      id: 'social' as TabType,
      label: 'Social Links',
      icon: LinkIcon,
    },
    {
      id: 'messages' as TabType,
      label: 'Messages',
      icon: MessageSquare,
      badge: messages.filter((m) => m.status === 'new').length,
    },
  ]

  // Project handlers
  const emptyProject: Project = {
    id: '',
    title: '',
    filename: '',
    description: '',
    fullDescription: '',
    tech: [],
    features: [],
    image: '',
    links: {
      demo: '',
      repo: ''
    },
    published: true
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    if (isNewProject) {
      await addProject(editingProject);
    } else {
      await updateProject(editingProject);
    }
    setEditingProject(null);
    setIsNewProject(false);
  };

  // Experience handlers
  const emptyExperience: Experience = {
    id: '',
    company: '',
    role: '',
    period: '',
    location: '',
    description: '',
    achievements: []
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    if (isNewExperience) {
      await addExperience(editingExperience);
    } else {
      await updateExperience(editingExperience);
    }
    setEditingExperience(null);
    setIsNewExperience(false);
  };

  // Skill handlers
  const emptySkillCategory: SkillCategory = {
    id: '',
    name: '',
    items: []
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    if (isNewSkill) {
      await addSkillCategory(editingSkill);
    } else {
      await updateSkillCategory(editingSkill);
    }
    setEditingSkill(null);
    setIsNewSkill(false);
  };

  const addSkillItem = () => {
    if (!editingSkill) return;
    setEditingSkill({
      ...editingSkill,
      items: [
      ...editingSkill.items,
      {
        id: Date.now().toString(),
        name: '',
        level: 3
      }]

    });
  };

  const removeSkillItem = (itemId: string) => {
    if (!editingSkill) return;
    setEditingSkill({
      ...editingSkill,
      items: editingSkill.items.filter((i) => i.id !== itemId)
    });
  };

  const updateSkillItem = (itemId: string, updates: Partial<SkillItem>) => {
    if (!editingSkill) return;
    setEditingSkill({
      ...editingSkill,
      items: editingSkill.items.map((i) =>
      i.id === itemId ?
      {
        ...i,
        ...updates
      } :
      i
      )
    });
  };
  // Message handlers
  const handleMarkAsRead = async (id: string) => {
    await updateMessage(id, {
      status: 'read',
    })
    refreshMessages()
  }
  const handleMarkAsResponded = async (id: string) => {
    await updateMessage(id, {
      status: 'responded',
    })
    refreshMessages()
  }
  const handleMarkAsNew = async (id: string) => {
    await updateMessage(id, {
      status: 'new',
    })
    refreshMessages()
  }
  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Delete this message permanently?')) {
      await deleteMessage(id)
      refreshMessages()
      if (expandedMessageId === id) {
        setExpandedMessageId(null)
      }
    }
  }
  const handleSaveNotes = async (id: string) => {
    await updateMessage(id, {
      notes: notesValue,
    })
    refreshMessages()
    setEditingNotes(null)
  }
  const handleReply = (email: string, name: string) => {
    const subject = encodeURIComponent(`Re: Your message on my portfolio`)
    const body = encodeURIComponent(
      `Hi ${name},\n\nThank you for reaching out!\n\n`,
    )
    window.open(`mailto:${email}?subject=${subject}&body=${body}`)
  }
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }
  const getStatusColor = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new':
        return 'text-accent-green bg-accent-green/10 border-accent-green/30'
      case 'read':
        return 'text-accent-yellow bg-accent-yellow/10 border-accent-yellow/30'
      case 'responded':
        return 'text-accent-blue bg-accent-blue/10 border-accent-blue/30'
    }
  }
  const getStatusIcon = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new':
        return <Circle size={12} className="fill-current" />
      case 'read':
        return <Eye size={12} />
      case 'responded':
        return <CheckCircle size={12} />
    }
  }
  return (
    <div className="min-h-screen bg-terminal-black text-terminal-text font-mono">
      {/* Admin Header */}
      <header className="bg-terminal-card border-b border-terminal-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent-red"></div>
            <span className="font-bold text-lg">Admin Console</span>
            <span className="text-terminal-muted text-sm px-2 py-0.5 bg-terminal-border rounded">
              v22.21
            </span>
          </div>
          {isSaving &&
          <div className="flex items-center text-accent-blue text-sm">
              <Loader2 size={14} className="animate-spin mr-2" />
              Saving...
            </div>
          }
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-accent-blue hover:text-blue-400 text-sm flex items-center">

            <Home size={14} className="mr-1" /> View Site
          </Link>
          <span className="text-sm text-terminal-muted">{user?.email}</span>
          <button
            onClick={logout}
            className="text-accent-red hover:text-red-400 flex items-center text-sm">

            <LogOut size={14} className="mr-1" /> Logout
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-terminal-card border-r border-terminal-border p-4 hidden md:block overflow-y-auto">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded transition-colors ${activeTab === tab.id ? 'bg-accent-blue/10 text-accent-blue' : 'text-terminal-muted hover:bg-terminal-border/50'}`}>

                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>);

            })}
          </nav>

          {/* <div className="mt-8 pt-4 border-t border-terminal-border">
            <button
              onClick={() => {
                if (
                window.confirm(
                  'Reset all content to defaults? This cannot be undone.'
                ))
                {
                  resetContent();
                }
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-terminal-muted hover:text-accent-red hover:bg-accent-red/10 rounded transition-colors">

              <RefreshCw size={14} />
              <span>Reset to Defaults</span>
            </button>
          </div> */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* HERO TAB */}
          {activeTab === 'hero' &&
          <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-8">Edit Hero Section</h2>
              <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                    type="text"
                    value={heroForm.name}
                    onChange={(e) =>
                    setHeroForm({
                      ...heroForm,
                      name: e.target.value
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                  </div>
                  <div>
                    <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                      Title
                    </label>
                    <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) =>
                    setHeroForm({
                      ...heroForm,
                      title: e.target.value
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                  </div>
                </div>

                <div>
                  <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                    Subtitle
                  </label>
                  <input
                  type="text"
                  value={heroForm.subtitle}
                  onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    subtitle: e.target.value
                  })
                  }
                  className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                </div>

                <div>
                  <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                    Location
                  </label>
                  <input
                  type="text"
                  value={heroForm.location}
                  onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    location: e.target.value
                  })
                  }
                  className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                </div>

                <div>
                  <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                    Short Bio
                  </label>
                  <textarea
                  rows={3}
                  value={heroForm.bio}
                  onChange={(e) =>
                  setHeroForm({
                    ...heroForm,
                    bio: e.target.value
                  })
                  }
                  className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                </div>

                <ImagePreview
                url={heroForm.profileImage}
                onUrlChange={(url) =>
                  setHeroForm({
                    ...heroForm,
                    profileImage: url
                  })}
                label="Profile Image x"
                />


                <button
                onClick={() => updateHero(heroForm)}
                disabled={isSaving}
                className="w-full bg-accent-blue hover:bg-blue-600 text-white py-3 rounded flex items-center justify-center">

                  <Save size={16} className="mr-2" /> Save Hero Section
                </button>
              </div>
            </div>
          }

          {/* ABOUT TAB */}
          {activeTab === 'about' &&
          <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-8">Edit About Section</h2>
              <div className="space-y-6">
                <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-bold text-accent-yellow flex items-center">
                    <User size={18} className="mr-2" /> Bio
                  </h3>
                  <textarea
                  rows={6}
                  value={aboutForm.bio}
                  onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    bio: e.target.value
                  })
                  }
                  className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />


                  <ImagePreview
                    url={aboutForm.profileImage}
                    onUrlChange={(url) =>
                      setAboutForm({
                        ...aboutForm,
                        profileImage: url
                      })
                    }
                    label="About Section Image" 
                  />

                </div>

                <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-bold text-accent-purple flex items-center">
                    <GraduationCap size={18} className="mr-2" /> Education
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        School
                      </label>
                      <input
                      type="text"
                      value={aboutForm.education.school}
                      onChange={(e) =>
                      setAboutForm({
                        ...aboutForm,
                        education: {
                          ...aboutForm.education,
                          school: e.target.value
                        }
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>
                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Degree
                      </label>
                      <input
                      type="text"
                      value={aboutForm.education.degree}
                      onChange={(e) =>
                      setAboutForm({
                        ...aboutForm,
                        education: {
                          ...aboutForm.education,
                          degree: e.target.value
                        }
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>
                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        GPA
                      </label>
                      <input
                      type="text"
                      value={aboutForm.education.gpa}
                      onChange={(e) =>
                      setAboutForm({
                        ...aboutForm,
                        education: {
                          ...aboutForm.education,
                          gpa: e.target.value
                        }
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>
                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Rank/Achievement
                      </label>
                      <input
                      type="text"
                      value={aboutForm.education.rank}
                      onChange={(e) =>
                      setAboutForm({
                        ...aboutForm,
                        education: {
                          ...aboutForm.education,
                          rank: e.target.value
                        }
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>
                  </div>
                </div>

                <button
                onClick={() => {
                  updateAbout(aboutForm)
                  console.log(aboutForm)
                }}
                disabled={isSaving}
                className="w-full bg-accent-blue hover:bg-blue-600 text-white py-3 rounded flex items-center justify-center">

                  <Save size={16} className="mr-2" /> Save About Section
                </button>
              </div>
            </div>
          }

          {/* PROJECTS TAB */}
          {activeTab === 'projects' &&
          <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Manage Projects</h2>
                <button
                onClick={() => {
                  setEditingProject(emptyProject);
                  setIsNewProject(true);
                }}
                className="bg-accent-green hover:bg-green-600 text-white px-4 py-2 rounded flex items-center text-sm">

                  <Plus size={16} className="mr-2" /> Add Project
                </button>
              </div>

              {editingProject ?
            <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 max-w-3xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">
                      {isNewProject ? 'New Project' : 'Edit Project'}
                    </h3>
                    <button
                  onClick={() => setEditingProject(null)}
                  className="text-terminal-muted hover:text-white">

                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-terminal-muted mb-1">
                          Title
                        </label>
                        <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                      </div>
                      <div>
                        <label className="block text-xs text-terminal-muted mb-1">
                          Filename (e.g. app.tsx)
                        </label>
                        <input
                      type="text"
                      value={editingProject.filename}
                      onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        filename: e.target.value
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Short Description
                      </label>
                      <input
                    type="text"
                    value={editingProject.description}
                    onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>

                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Full Description
                      </label>
                      <textarea
                    rows={3}
                    value={editingProject.fullDescription}
                    onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      fullDescription: e.target.value
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>

                    <ImagePreview
                  url={editingProject.image}
                  onUrlChange={(url) =>
                  setEditingProject({
                    ...editingProject,
                    image: url
                  })
                  }
                  label="Project Screenshot" />


                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Tech Stack (comma separated)
                      </label>
                      <input
                    type="text"
                    value={editingProject.tech.join(', ')}
                    onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tech: e.target.value.
                      split(',').
                      map((t) => t.trim()).
                      filter(Boolean)
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>

                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Features (one per line)
                      </label>
                      <textarea
                    rows={4}
                    value={editingProject.features.join('\n')}
                    onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      features: e.target.value.
                      split('\n').
                      filter((f) => f.trim())
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-terminal-muted mb-1">
                          Demo URL
                        </label>
                        <input
                      type="text"
                      value={editingProject.links.demo}
                      onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        links: {
                          ...editingProject.links,
                          demo: e.target.value
                        }
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                      </div>
                      <div>
                        <label className="block text-xs text-terminal-muted mb-1">
                          Repo URL
                        </label>
                        <input
                      type="text"
                      value={editingProject.links.repo}
                      onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        links: {
                          ...editingProject.links,
                          repo: e.target.value
                        }
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                    type="checkbox"
                    id="published"
                    checked={editingProject.published}
                    onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      published: e.target.checked
                    })
                    }
                    className="mr-2" />

                      <label
                    htmlFor="published"
                    className="text-sm text-terminal-muted">

                        Published (visible on site)
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 rounded border border-terminal-border hover:bg-terminal-border/50 text-sm">

                        Cancel
                      </button>
                      <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 rounded bg-accent-blue hover:bg-blue-600 text-white text-sm flex items-center">

                        <Save size={14} className="mr-2" /> Save Project
                      </button>
                    </div>
                  </form>
                </div> :

            <div className="grid gap-4">
                  {content.projects.map((project) =>
              <div
                key={project.id}
                className="bg-terminal-card border border-terminal-border p-4 rounded flex justify-between items-center group hover:border-accent-blue/50 transition-colors">

                      <div className="flex items-center space-x-4">
                        {project.image &&
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-16 h-12 object-cover rounded" />

                  }
                        <div>
                          <h3 className="font-bold text-lg">{project.title}</h3>
                          <p className="text-terminal-muted text-sm">
                            {project.description}
                          </p>
                          {!project.published &&
                    <span className="text-xs text-accent-yellow bg-accent-yellow/10 px-2 py-0.5 rounded mt-1 inline-block">
                              Draft
                            </span>
                    }
                        </div>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsNewProject(false);
                    }}
                    className="p-2 hover:bg-accent-blue/20 text-accent-blue rounded">

                          <Edit2 size={18} />
                        </button>
                        <button
                    onClick={() => {
                      if (window.confirm('Delete this project?'))
                      deleteProject(project.id);
                    }}
                    className="p-2 hover:bg-accent-red/20 text-accent-red rounded">

                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
              )}
                </div>
            }
            </div>
          }

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' &&
          <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Manage Experience</h2>
                <button
                onClick={() => {
                  setEditingExperience(emptyExperience);
                  setIsNewExperience(true);
                }}
                className="bg-accent-green hover:bg-green-600 text-white px-4 py-2 rounded flex items-center text-sm">

                  <Plus size={16} className="mr-2" /> Add Experience
                </button>
              </div>

              {editingExperience ?
            <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 max-w-3xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">
                      {isNewExperience ? 'New Experience' : 'Edit Experience'}
                    </h3>
                    <button
                  onClick={() => setEditingExperience(null)}
                  className="text-terminal-muted hover:text-white">

                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveExperience} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-terminal-muted mb-1">
                          Company
                        </label>
                        <input
                      type="text"
                      value={editingExperience.company}
                      onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        company: e.target.value
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                      </div>
                      <div>
                        <label className="block text-xs text-terminal-muted mb-1">
                          Role
                        </label>
                        <input
                      type="text"
                      value={editingExperience.role}
                      onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        role: e.target.value
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-terminal-muted mb-1">
                          Period (e.g. Jan 2024 – Apr 2024)
                        </label>
                        <input
                      type="text"
                      value={editingExperience.period}
                      onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        period: e.target.value
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                      </div>
                      <div>
                        <label className="block text-xs text-terminal-muted mb-1">
                          Location
                        </label>
                        <input
                      type="text"
                      value={editingExperience.location}
                      onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        location: e.target.value
                      })
                      }
                      className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Description
                      </label>
                      <textarea
                    rows={2}
                    value={editingExperience.description}
                    onChange={(e) =>
                    setEditingExperience({
                      ...editingExperience,
                      description: e.target.value
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>

                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Achievements (one per line)
                      </label>
                      <textarea
                    rows={4}
                    value={editingExperience.achievements.join('\n')}
                    onChange={(e) =>
                    setEditingExperience({
                      ...editingExperience,
                      achievements: e.target.value.
                      split('\n').
                      filter((a) => a.trim())
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                    type="button"
                    onClick={() => setEditingExperience(null)}
                    className="px-4 py-2 rounded border border-terminal-border hover:bg-terminal-border/50 text-sm">

                        Cancel
                      </button>
                      <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 rounded bg-accent-blue hover:bg-blue-600 text-white text-sm flex items-center">

                        <Save size={14} className="mr-2" /> Save Experience
                      </button>
                    </div>
                  </form>
                </div> :

            <div className="grid gap-4">
                  {content.experience.map((exp) =>
              <div
                key={exp.id}
                className="bg-terminal-card border border-terminal-border p-4 rounded flex justify-between items-center group hover:border-accent-blue/50 transition-colors">

                      <div>
                        <h3 className="font-bold text-lg">{exp.role}</h3>
                        <p className="text-accent-blue text-sm">
                          {exp.company}
                        </p>
                        <p className="text-terminal-muted text-xs">
                          {exp.period} • {exp.location}
                        </p>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                    onClick={() => {
                      setEditingExperience(exp);
                      setIsNewExperience(false);
                    }}
                    className="p-2 hover:bg-accent-blue/20 text-accent-blue rounded">

                          <Edit2 size={18} />
                        </button>
                        <button
                    onClick={() => {
                      if (window.confirm('Delete this experience?'))
                      deleteExperience(exp.id);
                    }}
                    className="p-2 hover:bg-accent-red/20 text-accent-red rounded">

                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
              )}
                </div>
            }
            </div>
          }

          {/* SKILLS TAB */}
          {activeTab === 'skills' &&
          <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Manage Skills</h2>
                <button
                onClick={() => {
                  setEditingSkill(emptySkillCategory);
                  setIsNewSkill(true);
                }}
                className="bg-accent-green hover:bg-green-600 text-white px-4 py-2 rounded flex items-center text-sm">

                  <Plus size={16} className="mr-2" /> Add Category
                </button>
              </div>

              {editingSkill ?
            <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 max-w-3xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">
                      {isNewSkill ?
                  'New Skill Category' :
                  'Edit Skill Category'}
                    </h3>
                    <button
                  onClick={() => setEditingSkill(null)}
                  className="text-terminal-muted hover:text-white">

                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveSkill} className="space-y-4">
                    <div>
                      <label className="block text-xs text-terminal-muted mb-1">
                        Category Name
                      </label>
                      <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      name: e.target.value
                    })
                    }
                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm"
                    placeholder="e.g. Frontend, Backend, Tools" />

                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-terminal-muted uppercase tracking-wider">
                          Skills
                        </label>
                        <button
                      type="button"
                      onClick={addSkillItem}
                      className="text-xs text-accent-green hover:text-green-400 flex items-center">

                          <Plus size={12} className="mr-1" /> Add Skill
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editingSkill.items.map((item) =>
                    <div
                      key={item.id}
                      className="flex items-center gap-2">

                            <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                        updateSkillItem(item.id, {
                          name: e.target.value
                        })
                        }
                        placeholder="Skill name"
                        className="flex-1 bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                            <select
                        value={item.level}
                        onChange={(e) =>
                        updateSkillItem(item.id, {
                          level: parseInt(e.target.value)
                        })
                        }
                        className="bg-terminal-black border border-terminal-border rounded p-2 text-sm">

                              {[1, 2, 3, 4, 5].map((n) =>
                        <option key={n} value={n}>
                                  {n} - {'█'.repeat(n)}
                                  {'░'.repeat(5 - n)}
                                </option>
                        )}
                            </select>
                            <button
                        type="button"
                        onClick={() => removeSkillItem(item.id)}
                        className="p-2 text-accent-red hover:bg-accent-red/20 rounded">

                              <Trash2 size={14} />
                            </button>
                          </div>
                    )}
                        {editingSkill.items.length === 0 &&
                    <p className="text-terminal-muted text-sm text-center py-4">
                            No skills added yet
                          </p>
                    }
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                    type="button"
                    onClick={() => setEditingSkill(null)}
                    className="px-4 py-2 rounded border border-terminal-border hover:bg-terminal-border/50 text-sm">

                        Cancel
                      </button>
                      <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 rounded bg-accent-blue hover:bg-blue-600 text-white text-sm flex items-center">

                        <Save size={14} className="mr-2" /> Save Category
                      </button>
                    </div>
                  </form>
                </div> :

            <div className="grid gap-4">
                  {content.skills.map((category) =>
              <div
                key={category.id}
                className="bg-terminal-card border border-terminal-border p-4 rounded group hover:border-accent-blue/50 transition-colors">

                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-accent-purple">
                            {category.name}/
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {category.items.map((item) =>
                      <span
                        key={item.id}
                        className="text-xs bg-terminal-border px-2 py-1 rounded">

                                {item.name}{' '}
                                <span className="text-accent-green">
                                  {'█'.repeat(item.level)}
                                </span>
                              </span>
                      )}
                          </div>
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                      onClick={() => {
                        setEditingSkill(category);
                        setIsNewSkill(false);
                      }}
                      className="p-2 hover:bg-accent-blue/20 text-accent-blue rounded">

                            <Edit2 size={18} />
                          </button>
                          <button
                      onClick={() => {
                        if (window.confirm('Delete this skill category?'))
                        deleteSkillCategory(category.id);
                      }}
                      className="p-2 hover:bg-accent-red/20 text-accent-red rounded">

                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
              )}
                </div>
            }
            </div>
          }

          {/* SOCIAL TAB */}
          {activeTab === 'social' &&
          <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-8">Edit Social Links</h2>
              <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 space-y-4">
                <div>
                  <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                  type="email"
                  value={socialForm.email}
                  onChange={(e) =>
                  setSocialForm({
                    ...socialForm,
                    email: e.target.value
                  })
                  }
                  className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                </div>
                <div>
                  <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                  type="text"
                  value={socialForm.phone}
                  onChange={(e) =>
                  setSocialForm({
                    ...socialForm,
                    phone: e.target.value
                  })
                  }
                  className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                </div>
                <div>
                  <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                    GitHub URL
                  </label>
                  <input
                  type="url"
                  value={socialForm.github}
                  onChange={(e) =>
                  setSocialForm({
                    ...socialForm,
                    github: e.target.value
                  })
                  }
                  className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                </div>
                <div>
                  <label className="block text-xs text-terminal-muted mb-1 uppercase tracking-wider">
                    LinkedIn URL
                  </label>
                  <input
                  type="url"
                  value={socialForm.linkedin}
                  onChange={(e) =>
                  setSocialForm({
                    ...socialForm,
                    linkedin: e.target.value
                  })
                  }
                  className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm" />

                </div>

                <button
                onClick={() => updateSocial(socialForm)}
                disabled={isSaving}
                className="w-full bg-accent-blue hover:bg-blue-600 text-white py-3 rounded flex items-center justify-center mt-4">

                  <Save size={16} className="mr-2" /> Save Social Links
                </button>
              </div>
            </div>
          }

           {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">Contact Messages</h2>
                    <p className="text-terminal-muted text-sm mt-1">
                      {messages.length} total •{' '}
                      {messages.filter((m) => m.status === 'new').length} new 
                    </p>
                  </div>
                  {!isFirebaseConfigured() && (
                    <button
                      onClick={refreshMessages}
                      className="text-accent-blue hover:text-blue-400 flex items-center text-sm"
                    >
                      <RefreshCw size={14} className="mr-1" /> Refresh
                    </button>
                  )}
                </div>

                {messagesLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2
                      size={32}
                      className="animate-spin text-accent-blue"
                    />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="bg-terminal-card border border-terminal-border rounded-lg p-12 text-center">
                    <MessageSquare
                      size={48}
                      className="mx-auto mb-4 text-terminal-muted opacity-50"
                    />
                    <h3 className="text-lg font-bold text-terminal-muted mb-2">
                      No messages yet
                    </h3>
                    <p className="text-terminal-muted text-sm">
                      Messages from your contact form will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`bg-terminal-card border rounded-lg overflow-hidden transition-all ${msg.status === 'new' ? 'border-accent-green/50' : 'border-terminal-border'}`}
                      >
                        {/* Message Header */}
                        <div
                          className="p-4 cursor-pointer hover:bg-terminal-border/20 transition-colors"
                          onClick={() => {
                            setExpandedMessageId(
                              expandedMessageId === msg.id ? null : msg.id,
                            )
                            if (msg.status === 'new') {
                              handleMarkAsRead(msg.id)
                            }
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple font-bold">
                                {msg.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-bold text-terminal-text">
                                    {msg.name}
                                  </h3>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded border flex items-center gap-1 ${getStatusColor(msg.status)}`}
                                  >
                                    {getStatusIcon(msg.status)}
                                    {msg.status}
                                  </span>
                                </div>
                                <p className="text-accent-blue text-sm">
                                  {msg.email}
                                </p>
                                <p className="text-terminal-muted text-sm mt-1 line-clamp-1">
                                  {msg.message}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-terminal-muted text-xs flex items-center">
                                <Clock size={12} className="mr-1" />
                                {formatDate(msg.createdAt)}
                              </span>
                              {expandedMessageId === msg.id ? (
                                <ChevronUp
                                  size={16}
                                  className="text-terminal-muted"
                                />
                              ) : (
                                <ChevronDown
                                  size={16}
                                  className="text-terminal-muted"
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedMessageId === msg.id && (
                          <div className="border-t border-terminal-border">
                            {/* Full Message */}
                            <div className="p-4 bg-terminal-black/50">
                              <label className="text-xs text-terminal-muted uppercase tracking-wider mb-2 block">
                                Message
                              </label>
                              <p className="text-terminal-text whitespace-pre-wrap">
                                {msg.message}
                              </p>
                            </div>

                            {/* Notes Section */}
                            <div className="p-4 border-t border-terminal-border">
                              <label className="text-xs text-terminal-muted uppercase tracking-wider mb-2 block">
                                Admin Notes
                              </label>
                              {editingNotes === msg.id ? (
                                <div className="space-y-2">
                                  <textarea
                                    value={notesValue}
                                    onChange={(e) =>
                                      setNotesValue(e.target.value)
                                    }
                                    rows={3}
                                    className="w-full bg-terminal-black border border-terminal-border rounded p-2 text-sm"
                                    placeholder="Add private notes about this message..."
                                  />
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleSaveNotes(msg.id)}
                                      className="px-3 py-1 bg-accent-blue text-white text-xs rounded"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingNotes(null)}
                                      className="px-3 py-1 border border-terminal-border text-xs rounded"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    setEditingNotes(msg.id)
                                    setNotesValue(msg.notes || '')
                                  }}
                                  className="text-sm text-terminal-muted cursor-pointer hover:text-terminal-text p-2 border border-dashed border-terminal-border rounded"
                                >
                                  {msg.notes || 'Click to add notes...'}
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="p-4 border-t border-terminal-border bg-terminal-card flex flex-wrap gap-2">
                              <button
                                onClick={() => handleReply(msg.email, msg.name)}
                                className="flex items-center space-x-1 px-3 py-2 bg-accent-blue/10 text-accent-blue border border-accent-blue/30 rounded text-sm hover:bg-accent-blue/20 transition-colors"
                              >
                                <Reply size={14} />
                                <span>Reply via Email</span>
                              </button>

                              {msg.status !== 'responded' && (
                                <button
                                  onClick={() => handleMarkAsResponded(msg.id)}
                                  className="flex items-center space-x-1 px-3 py-2 bg-accent-green/10 text-accent-green border border-accent-green/30 rounded text-sm hover:bg-accent-green/20 transition-colors"
                                >
                                  <CheckCircle size={14} />
                                  <span>Mark Responded</span>
                                </button>
                              )}

                              {msg.status === 'responded' && (
                                <button
                                  onClick={() => handleMarkAsNew(msg.id)}
                                  className="flex items-center space-x-1 px-3 py-2 bg-terminal-border text-terminal-muted rounded text-sm hover:bg-terminal-border/70 transition-colors"
                                >
                                  <Circle size={14} />
                                  <span>Mark as New</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="flex items-center space-x-1 px-3 py-2 bg-accent-red/10 text-accent-red border border-accent-red/30 rounded text-sm hover:bg-accent-red/20 transition-colors ml-auto"
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
        </main>
      </div>
    </div>);

}