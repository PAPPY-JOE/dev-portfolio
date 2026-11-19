import { useContent } from '../context/ContentContext';
import { Plus } from 'lucide-react';

export function ExperienceTimeline() {
  const { content } = useContent();
  return <div className="experience-list">{content.experience.map(job => <article className="experience-item" key={job.id}>
    <div className="experience-meta"><span>{job.period}</span><span>{job.location}</span></div>
    <div className="experience-copy"><h4>{job.role}</h4><p className="experience-company">{job.company}</p><p>{job.description}</p>
      {job.achievements.length > 0 && <details className="experience-details"><summary>What I worked on<Plus size={16} aria-hidden="true" /></summary><ul>{job.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul></details>}
    </div>
  </article>)}</div>;
}
