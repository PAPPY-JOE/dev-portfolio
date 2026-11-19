import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { researchUrl } from '../data/portfolio';

const navItems = [{ id: 'projects', label: 'Work' }, { id: 'about', label: 'About' }, { id: 'contact', label: 'Contact' }];
export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const { isAuthenticated } = useAuth(), { content } = useContent();
  const isHome = useLocation().pathname === '/';
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: '-15% 0px -55% 0px' });
    for (const id of ['home', ...navItems.map(item => item.id)]) { const section = document.getElementById(id); if (section) observer.observe(section); }
    return () => observer.disconnect();
  }, [isHome]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="portfolio-header"><div className="header-inner"><Link to="/" className="wordmark" aria-label={`${content.hero.name}, home`}><span className="monogram">JF</span><span className="wordmark-name">{content.hero.name}</span></Link>
      <nav aria-label="Main navigation">{isHome ? navItems.map(item => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined}>{item.label}</a>) : <Link to="/">Portfolio</Link>}<a className="research-nav" href={researchUrl} target="_blank" rel="noopener noreferrer">Research &amp; robotics</a>{isAuthenticated && <Link to="/admin">Admin</Link>}</nav>
    </div></header>
  </>;
}
