export interface Project {
  id: string;
  title: string;
  filename: string;
  description: string;
  fullDescription: string;
  tech: string[];
  features: string[];
  image: string; // Project screenshot/landing page URL
  links: {
    demo: string;
    repo: string;
  };
  published: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface Education {
  school: string;
  degree: string;
  gpa: string;
  rank: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: SkillItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
}


export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  createdAt: number // timestamp
  status: 'new' | 'read' | 'responded'
  notes: string // admin notes
}

export interface SiteContent {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    location: string;
    bio: string;
    profileImage: string; // Profile photo URL
  };
  about: {
    bio: string;
    profileImage: string; // About section photo URL
    education: Education;
  };
  projects: Project[];
  experience: Experience[];
  skills: SkillCategory[];
  social: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
}