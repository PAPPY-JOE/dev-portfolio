import React from 'react';
import { Github, Linkedin, Heart, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';
export function Footer() {
  const { content } = useContent();
  return (
    <footer className="border-t border-terminal-border bg-terminal-black py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-terminal-muted text-sm font-mono mb-4 md:mb-0">
          <span className="text-accent-green">git</span> commit -m "Connect with me"
        </div>

        <div className="flex items-center space-x-6">
          <a
            href={content.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-muted hover:text-accent-blue transition-colors">

            <Github size={20} />
          </a>
          <a
            href={content.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-muted hover:text-accent-blue transition-colors">

            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${content.social.email}`}
            className="text-terminal-muted hover:text-accent-blue transition-colors">

            <Mail size={20} />
          </a>
        </div>

        <div className="mt-4 md:mt-0 text-terminal-muted text-xs font-mono flex items-center">
          Built with <Heart size={12} className="mx-1 text-accent-red" /> and React
        </div>
      </div>
    </footer>);

}