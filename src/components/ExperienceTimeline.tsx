import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';
export function ExperienceTimeline() {
  const { content } = useContent();
  return (
    <div className="space-y-8 relative pl-8 border-l border-terminal-border ml-4">
      {content.experience.map((job, index) =>
      <div key={job.id} className="relative">
          {/* Timeline Dot */}
          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-terminal-black border-2 border-accent-blue flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
          </div>

          <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 hover:border-accent-blue/50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-terminal-text font-mono">
                  {job.role}
                </h3>
                <div className="text-accent-blue font-mono text-sm mt-1">
                  {job.company}
                </div>
              </div>
              <div className="flex flex-col md:items-end mt-2 md:mt-0 text-sm text-terminal-muted font-mono">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  {job.period}
                </div>
                <div className="flex items-center mt-1">
                  <MapPin size={14} className="mr-2" />
                  {job.location}
                </div>
              </div>
            </div>

            <p className="text-terminal-text mb-4 text-sm">{job.description}</p>

            <ul className="space-y-2">
              {job.achievements.map((achievement, i) =>
            <li
              key={i}
              className="flex items-start text-sm text-terminal-muted">

                  <span className="text-accent-green mr-2 mt-1">➜</span>
                  <span>{achievement}</span>
                </li>
            )}
            </ul>
          </div>
        </div>
      )}
    </div>);

}