import { useContent } from '../context/ContentContext';

export function SkillsSection() {
  const { content } = useContent();
  return <section id="skills" className="section-wrap skills-section">
    <div className="section-heading"><div><p className="eyebrow">Tools and practice</p><h2>A practical toolkit.</h2></div><p>The projects above show how I put these to work.</p></div>
    <div className="skills-grid">{content.skills.map(category => <div className="skill-group" key={category.id}><h3>{category.name.replace(/\/$/, '')}</h3><ul>{category.items.map(skill => <li key={skill.id}>{skill.name}</li>)}</ul></div>)}</div>
  </section>;
}
