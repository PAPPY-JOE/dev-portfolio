import { Plus } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { orderedProjects, projectKey, projectNotes } from '../data/portfolio';
import type { Project } from '../types';

function ProjectLinks({ project }: { project: Project }) {
  const demo = project.links.demo && project.links.demo !== '#';
  const repo = project.links.repo && project.links.repo !== '#';
  return <div className="project-links">
    {demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer">{projectKey(project.title) === 'valet' ? 'View Valet' : 'View project'}</a>}
    {repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer">Source code</a>}
  </div>;
}

function CaseStudy({ project }: { project: Project }) {
  const notes = projectNotes[projectKey(project.title)];
  return <details className="case-study">
    <summary><span>{notes ? 'Read case study' : 'Project details'}</span><Plus size={18} aria-hidden="true" /></summary>
    <div className="case-study-body">
      {notes ? <>
        <div><h4>The problem</h4><p>{notes.problem}</p></div>
        <div><h4>My contribution</h4><p>{project.fullDescription}</p></div>
        <div><h4>Decisions behind the work</h4><ul>{notes.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul></div>
        <div><h4>Where it stands</h4><p>{notes.outcome}</p></div>
      </> : <><p>{project.fullDescription}</p><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></>}
      <div><h4>Built with</h4><p>{project.tech.join(', ')}</p></div>
    </div>
  </details>;
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const notes = projectNotes[projectKey(project.title)];
  return <article className={`project-card${featured ? ' project-featured' : ''}`}>
    {project.image && <figure className="project-image">
      <img src={project.image} alt={featured ? 'Valet Today screen showing a sample wardrobe and proposed outfit' : `${project.title} website preview`} loading="lazy" width={featured ? 390 : 1200} height={featured ? 844 : 675} />
      {featured && <figcaption>Sample wardrobe shown</figcaption>}
    </figure>}
    <div className="project-copy">
      <div className="project-meta"><span className="eyebrow">{notes?.role || 'Software project'}</span>{notes && <span className="project-status">{notes.status}</span>}</div>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ProjectLinks project={project} />
      <CaseStudy project={project} />
    </div>
  </article>;
}

export function ProjectsSection() {
  const { content } = useContent();
  const projects = orderedProjects(content.projects);
  const featured = projects.find(project => projectKey(project.title) === 'valet');
  const selected = projects.filter(project => project !== featured && projectKey(project.title) !== 'bxpense');
  const earlier = projects.filter(project => projectKey(project.title) === 'bxpense');
  return <section id="projects" className="section-wrap work-section">
    <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>From an idea to something useful.</h2></div><p>Independent products and work for organisations. My role, the decisions and what came out of each.</p></div>
    {featured && <ProjectCard project={featured} featured />}
    <div className="project-grid">{selected.map(project => <ProjectCard key={project.id} project={project} />)}</div>
    {earlier.length > 0 && <div className="earlier-work"><h3>Earlier work</h3>{earlier.map(project => <article key={project.id}>
      <div className="earlier-heading"><div><p className="eyebrow">University side project</p><h4>{project.title}</h4></div><ProjectLinks project={project} /></div>
      <p>{project.description}</p><CaseStudy project={project} />
    </article>)}</div>}
  </section>;
}
