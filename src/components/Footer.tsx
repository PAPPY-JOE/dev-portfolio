import { useContent } from '../context/ContentContext';
import { researchUrl } from '../data/portfolio';

export function Footer() {
  const { content } = useContent();
  return <footer className="portfolio-footer section-wrap"><div><strong>{content.hero.name}</strong><p>Software engineer. Building useful things.</p></div><nav aria-label="Footer"><a href={researchUrl} target="_blank" rel="noopener noreferrer">Research &amp; robotics</a><a href={content.social.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={`mailto:${content.social.email}`}>Email</a><a href="#home">Back to top</a></nav></footer>;
}
