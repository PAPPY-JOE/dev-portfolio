import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Code, Cpu, Mail, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const navItems = [
  {
    id: 'home',
    label: '~/home',
    icon: Terminal
  },
  {
    id: 'projects',
    label: './projects',
    icon: Code
  },
  {
    id: 'about',
    label: './about',
    icon: User
  },
  {
    id: 'skills',
    label: './skills',
    icon: Cpu
  },
  {
    id: 'contact',
    label: './contact',
    icon: Mail
  }];

  const scrollToSection = (id: string) => {
    if (!isHome) return; // Only scroll if on home page
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        if (
        section &&
        section.offsetTop <= scrollPosition &&
        section.offsetTop + section.offsetHeight > scrollPosition)
        {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-terminal-black/90 backdrop-blur-md border-b border-terminal-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="hidden md:flex items-center space-x-2 text-accent-green font-mono font-bold">

            <span className="text-accent-purple">const</span>
            <span className="text-accent-blue">developer</span>
            <span>=</span>
            <span className="text-accent-yellow">true</span>;
          </Link>

          <div className="flex space-x-1 overflow-x-auto no-scrollbar w-full md:w-auto">
            {isHome ?
            navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                      flex items-center space-x-2 px-4 py-2 font-mono text-sm transition-all duration-200
                      ${isActive ? 'text-accent-green bg-terminal-card border-b-2 border-accent-green' : 'text-terminal-muted hover:text-terminal-text hover:bg-terminal-card/50'}
                    `}>

                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>);

            }) :

            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 font-mono text-sm text-terminal-muted hover:text-terminal-text">

                <Terminal size={16} />
                <span>~/return_home</span>
              </Link>
            }

            {isAuthenticated &&
            <Link
              to="/admin"
              className="flex items-center space-x-2 px-4 py-2 font-mono text-sm text-accent-red hover:bg-accent-red/10">

                <Lock size={16} />
                <span>./admin</span>
              </Link>
            }
          </div>
        </div>
      </div>
    </nav>);

}