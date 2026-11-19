import { useContent } from '../context/ContentContext';

export function TerminalHero() {
  const { content } = useContent();
  const valet = content.projects.find(project => project.title === 'Valet' && project.published);
  return <section id="home" className="portfolio-hero section-wrap">
    <div className="hero-copy">
      <p className="eyebrow">{content.hero.name} <span>/</span> {content.hero.title}</p>
      <h1>{content.hero.subtitle}</h1>
      <p className="hero-intro">{content.hero.bio}</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#projects">Explore my work</a>
        <a className="button button-secondary" href={`mailto:${content.social.email}`}>Get in touch</a>
      </div>
      {valet && <a className="current-project" href={valet.links.demo} target="_blank" rel="noopener noreferrer">
        <span className="eyebrow">Currently building</span>
        <strong>Valet</strong><span>A wardrobe planner for the week ahead.</span>
      </a>}
      <p className="hero-tools">React <span>/</span> TypeScript <span>/</span> Full-stack products</p>
    </div>
    <figure className="hero-portrait">
      <div className="portrait-frame"><img src={content.hero.profileImage || content.about.profileImage} alt={content.hero.name} width="460" height="460" /></div>
      <figcaption><span>Software, with people in mind.</span><span>{content.hero.location}</span></figcaption>
    </figure>
  </section>;
}
