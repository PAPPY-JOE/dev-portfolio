import type { Project, ProjectNotes, SiteContent } from '../types';
import { initialContent } from './initialContent';

export const researchUrl = 'https://pappy-joe.github.io/engineering/';
export const projectKey = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, '');

export const projectNotes: Record<string, ProjectNotes> = {
  valet: {
    role: 'Solo founder and developer', status: 'Working pilot',
    problem: 'Help people plan a working week from the clothes they already own, including what is actually ready to wear.',
    decisions: ['Made photos and editable reference pieces two ways to build a usable wardrobe.', 'Kept outfit plans separate from actual wear, with availability and laundry represented explicitly.', 'Used dressing preferences and a deterministic planner, then simplified swapping and mobile day editing.'],
    outcome: 'A working web pilot for wardrobe entry, planning, editing and wear recording. The current focus is making setup easier and testing repeat use.',
  },
  citicompassdevelopmentsplatform: {
    role: 'Software engineer, contract', status: 'Client platform',
    problem: 'Connect a public property website with the tools needed to manage listings, enquiries and content.',
    decisions: ['Built the responsive website alongside the administrative experience.', 'Connected authentication, database and media workflows through Supabase.', 'Brought lead capture, notes, pipeline tracking and content management into the administrative workspace.'],
    outcome: 'Delivered the property website and its administrative workflows, covering public presentation and internal operations.',
  },
  missionsaidinternational: {
    role: 'Website and dashboard developer', status: 'Organisation website',
    problem: 'Give an organisation a clear public website and a practical way to keep its content up to date.',
    decisions: ['Built a multi-page React website and a Firebase-backed content dashboard.', 'Designed publishing controls so non-technical staff can manage content.'],
    outcome: 'A public website with an administrative workflow for content updates.',
  },
  nursenaija: {
    role: 'Prototype developer', status: 'Prototype',
    problem: 'Explore more accessible multilingual communication interfaces for healthcare settings.',
    decisions: ['Built the interface and state-driven communication flows in React.', 'Kept the project framed as a prototype whose capabilities need further evaluation.'],
    outcome: 'A software prototype for demonstration and further evaluation.',
  },
  bxpense: {
    role: 'Frontend lead, student team', status: 'University side project',
    problem: 'Explore expense tracking with university roommates.',
    decisions: ['Built transaction views, dashboards and multi-currency interface flows.'],
    outcome: 'A student side project, rather than a previous startup I founded.',
  },
};

const legacyHero = [
  'Frontend Engineer with 5+ years of experience building and maintaining production React applications, including SaaS-style platforms and internal admin dashboards.',
  'I am a Software Engineer focused on building full-stack web platforms and intelligent systems. My experience spans React, TypeScript, Supabase, state management, and scalable admin architectures, with additional interests in robotics, computer vision, and AI-driven products. I enjoy designing reliable user experiences and turning complex workflows into usable digital systems.',
];

// Present the refresh with existing published CMS data. No database migration or
// write is performed; later custom copy and unpublished projects stay intact.
export function refreshPortfolioContent(saved: SiteContent): SiteContent {
  const projects = saved.projects.map(project => {
    const key = projectKey(project.title);
    if (key === 'citicompassdevelopmentsplatform') {
      const current = initialContent.projects.find(p => projectKey(p.title) === key);
      const oldSummary = project.description === 'Full-stack luxury real estate website with integrated CRM, lead pipeline, analytics dashboard, content management, and media administration.';
      return { ...project, description: oldSummary && current ? current.description : project.description, links: { ...project.links, demo: project.links.demo.replace(/^http:\/\/citicompass\.netlify\.app/, 'https://citicompass.netlify.app') } };
    }
    if (key === 'missionsaidinternational' && project.description === 'CMS-Driven NGO Platform with admin dashboard.') {
      const current = initialContent.projects.find(p => projectKey(p.title) === key);
      return current ? { ...project, description: current.description } : project;
    }
    if (key === 'bxpense' && project.description === 'SaaS-style expense tracking application.') {
      const current = initialContent.projects.find(p => projectKey(p.title) === key);
      return current ? { ...project, description: current.description, fullDescription: current.fullDescription } : project;
    }
    if (key === 'nursenaija' && project.description === 'Offline Multilingual Healthcare Triage App.') {
      const current = initialContent.projects.find(p => projectKey(p.title) === key);
      return current ? { ...project, description: current.description, fullDescription: current.fullDescription } : project;
    }
    return project;
  });
  const hasValet = projects.some(project => projectKey(project.title) === 'valet');
  const valet = initialContent.projects.find(project => project.id === 'valet');
  const founderRole = initialContent.experience.find(job => job.id === 'valet-founder');
  return {
    ...saved,
    hero: {
      ...saved.hero,
      title: saved.hero.title === 'Frontend Engineer' ? 'Software Engineer' : saved.hero.title,
      location: ['Remote', 'NG (Remote)'].includes(saved.hero.location) ? 'Lagos, Nigeria' : saved.hero.location,
      subtitle: ['Building accessible, pixel-perfect web experiences', 'Turning complex workflows into usable digital systems.'].includes(saved.hero.subtitle) ? initialContent.hero.subtitle : saved.hero.subtitle,
      bio: legacyHero.includes(saved.hero.bio) ? initialContent.hero.bio : saved.hero.bio,
    },
    about: {
      ...saved.about,
      bio: saved.about.bio.startsWith('I am a Frontend Engineer with 5+ years') ? initialContent.about.bio : saved.about.bio,
    },
    projects: hasValet || !valet ? projects : [valet, ...projects],
    experience: !founderRole || saved.experience.some(job => projectKey(job.company) === 'valet') ? saved.experience : [founderRole, ...saved.experience],
  };
}

export function orderedProjects(projects: Project[]) {
  const order = ['valet', 'citicompassdevelopmentsplatform', 'missionsaidinternational', 'nursenaija'];
  const priority = (project: Project) => {
    const key = projectKey(project.title), index = order.indexOf(key);
    return index >= 0 ? index : key === 'bxpense' ? 5 : 4;
  };
  return projects.filter(project => project.published).slice().sort((a, b) => priority(a) - priority(b));
}
