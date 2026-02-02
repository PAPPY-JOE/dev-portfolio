import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Folder,
  Image } from
'lucide-react';
import { useContent } from '../context/ContentContext';
export function ProjectsSection() {
  const { content } = useContent();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Only show published projects
  const publishedProjects = content.projects.filter((p) => p.published);
  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="flex items-center mb-12">
        <span className="text-accent-purple text-2xl mr-2">const</span>
        <h2 className="text-3xl font-bold text-terminal-text font-mono">
          projects
        </h2>
        <span className="text-accent-blue text-2xl ml-2">= [</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publishedProjects.map((project) =>
        <div
          key={project.id}
          className={`
              bg-terminal-card border border-terminal-border rounded-lg overflow-hidden transition-all duration-300
              ${expandedId === project.id ? 'ring-1 ring-accent-green shadow-lg shadow-accent-green/10' : 'hover:border-terminal-muted'}
            `}>

            {/* Project Image */}
            {project.image &&
          <div className="relative h-48 overflow-hidden border-b border-terminal-border">
                <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />

                <div className="absolute inset-0 bg-gradient-to-t from-terminal-card to-transparent"></div>
              </div>
          }

            <div className="bg-terminal-black/50 px-4 py-2 border-b border-terminal-border flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-mono">
                <Folder size={14} className="text-accent-blue" />
                <span className="text-terminal-muted">src/projects/</span>
                <span className="text-accent-yellow">{project.filename}</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-terminal-border"></div>
                <div className="w-2 h-2 rounded-full bg-terminal-border"></div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-terminal-text font-mono">
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) =>
              <span
                key={t}
                className="text-xs px-2 py-1 rounded bg-terminal-border text-accent-blue font-mono">

                    {t}
                  </span>
              )}
              </div>

              <p className="text-terminal-muted mb-4 font-sans">
                {project.description}
              </p>

              <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedId === project.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>

                <div className="pt-4 border-t border-terminal-border space-y-4">
                  <p className="text-terminal-text text-sm leading-relaxed">
                    {project.fullDescription}
                  </p>

                  <div>
                    <h4 className="text-accent-purple text-sm font-bold mb-2 font-mono">
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, idx) =>
                    <li
                      key={idx}
                      className="flex items-center text-sm text-terminal-muted font-mono">

                          <span className="text-accent-green mr-2">✓</span>
                          {feature}
                        </li>
                    )}
                    </ul>
                  </div>

                  <div className="flex space-x-4 pt-2">
                    {project.links.demo && project.links.demo !== '#' &&
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-accent-blue hover:underline font-mono">

                        <ExternalLink size={14} className="mr-1" /> Live Demo
                      </a>
                  }
                    {project.links.repo && project.links.repo !== '#' &&
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-accent-blue hover:underline font-mono">

                        <Github size={14} className="mr-1" /> Source Code
                      </a>
                  }
                  </div>
                </div>
              </div>

              <button
              onClick={() =>
              setExpandedId(expandedId === project.id ? null : project.id)
              }
              className="w-full mt-4 flex items-center justify-center py-2 text-xs font-mono text-terminal-muted hover:text-accent-green transition-colors border-t border-terminal-border border-dashed">

                {expandedId === project.id ?
              <>
                    <span className="mr-2">Collapse</span>
                    <ChevronUp size={14} />
                  </> :

              <>
                    <span className="mr-2">View Details</span>
                    <ChevronDown size={14} />
                  </>
              }
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-2xl text-accent-blue font-mono">];</div>
    </section>);

}