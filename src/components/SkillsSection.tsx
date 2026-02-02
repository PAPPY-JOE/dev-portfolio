import React, { useEffect, useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
export function SkillsSection() {
  const { content } = useContent();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const renderProgressBar = (level: number) => {
    const filled = '█'.repeat(level);
    const empty = '░'.repeat(5 - level);
    return (
      <span className="ml-2 font-mono">
        <span className="text-accent-green">{filled}</span>
        <span className="text-terminal-border">{empty}</span>
      </span>);

  };
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 bg-terminal-black relative">

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 font-mono">
          <span className="text-accent-green">➜</span>{' '}
          <span className="text-accent-blue">~</span>{' '}
          <span className="text-terminal-text">tree ./skills -L 2</span>
        </div>

        <div
          className={`font-mono transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

          <div className="text-accent-blue mb-2">.</div>

          {content.skills.map((category, catIndex) =>
          <div key={category.name} className="mb-4">
              <div className="flex items-center text-terminal-text">
                <span className="text-terminal-muted mr-2">
                  {catIndex === content.skills.length - 1 ? '└──' : '├──'}
                </span>
                <span className="text-accent-purple font-bold">
                  {category.name}/
                </span>
              </div>

              <div
              className={`ml-8 border-l border-terminal-border pl-4 space-y-2 mt-2 transition-all duration-700 delay-${catIndex * 200}`}>

                {category.items.map((skill, itemIndex) =>
              <div key={skill.name} className="flex items-center group">
                    <span className="text-terminal-muted mr-2">
                      {itemIndex === category.items.length - 1 ? '└──' : '├──'}
                    </span>
                    <span className="text-terminal-text group-hover:text-accent-green transition-colors">
                      {skill.name}
                    </span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {renderProgressBar(skill.level)}
                    </span>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}