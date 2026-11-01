import type { Project, SiteContent } from '../types';

// Public-safe placeholders only. Publication requires a separate reviewed change.
export const portfolioDrafts: Project[] = [
  { id: 'valet-draft', title: 'Valet', filename: 'valet.tsx',
    description: 'Personal software project — draft for review.',
    fullDescription: 'Portfolio copy and release status await owner approval.',
    tech: [], features: [], image: '', links: { demo: '', repo: '' }, published: false },
  { id: 'suppose-draft', title: 'Suppose', filename: 'suppose.tsx',
    description: 'Personal software project — draft for review.',
    fullDescription: 'Portfolio copy and release status await owner approval.',
    tech: [], features: [], image: '', links: { demo: '', repo: '' }, published: false },
  { id: 'i2-draft', title: 'I²', filename: 'i2.tsx',
    description: 'Personal software project — draft for review.',
    fullDescription: 'Portfolio copy and release status await owner approval.',
    tech: [], features: [], image: '', links: { demo: '', repo: '' }, published: false },
];

export function withPortfolioDrafts(content: SiteContent): SiteContent {
  const ids = new Set(portfolioDrafts.map(project => project.id));
  const projects = content.projects.map(project =>
    ids.has(project.id) ? { ...project, published: false } : project);
  for (const draft of portfolioDrafts) {
    if (!projects.some(project => project.id === draft.id)) projects.push({ ...draft });
  }
  return { ...content, projects };
}
