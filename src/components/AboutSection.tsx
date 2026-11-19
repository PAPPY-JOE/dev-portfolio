import { useContent } from '../context/ContentContext';
import { researchUrl } from '../data/portfolio';
import { ExperienceTimeline } from './ExperienceTimeline';

export function AboutSection() {
  const { content } = useContent();
  return <section id="about" className="section-wrap about-section">
    <div className="about-intro"><div><p className="eyebrow">About my work</p><h2>The interface and the system behind it.</h2><p className="section-intro">{content.about.bio}</p></div>
      <aside className="background-note"><p className="eyebrow">An engineering foundation</p><h3>{content.about.education.school}</h3><p>{content.about.education.degree}</p><div className="education-facts"><span>CGPA {content.about.education.gpa}</span><span>{content.about.education.rank}</span></div><p>My robotics and embedded perception work has a home of its own.</p><a href={researchUrl} target="_blank" rel="noopener noreferrer">Research &amp; robotics</a></aside>
    </div>
    <div className="experience-heading"><p className="eyebrow">Experience</p><h3>Building across products and teams.</h3></div>
    <ExperienceTimeline />
  </section>;
}
