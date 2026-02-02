import { useContent } from '../context/ContentContext';
import { ExperienceTimeline } from './ExperienceTimeline';
import { GraduationCap, Award } from 'lucide-react';
export function AboutSection() {
  const { content } = useContent();
  return (
    <section id="about" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="mb-12 font-mono">
        <span className="text-accent-purple text-2xl mr-2">class</span>
        <h2 className="text-3xl font-bold text-terminal-text inline">
          AboutMe
        </h2>
        <span className="text-terminal-text text-2xl ml-2">{'{'}</span>
      </div>

      <div className="grid gap-12">
        {/* Bio with optional image */}
        <div className="flex flex-col md:flex-row gap-8">
          {content.about.profileImage &&
          <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-lg overflow-hidden border-2 border-accent-yellow shadow-lg">
                <img
                src={content.about.profileImage}
                alt={content.hero.name}
                className="w-full h-full object-cover" />

              </div>
            </div>
          }
          <div className="flex-1">
            <div className="flex items-center mb-6 text-accent-yellow font-mono text-sm">
              <span className="mr-2"> /**</span>
              <span>Professional Summary</span>
              <span className="ml-2">**/</span> 
            </div>
            <p className="text-terminal-text leading-relaxed text-lg border-l-2 border-accent-yellow pl-6">
              {content.about.bio}
            </p>
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="flex items-center mb-8 font-mono">
            <span className="text-accent-blue mr-2">public</span>
            <h3 className="text-xl font-bold text-terminal-text">
              experience()
            </h3>
            <span className="text-terminal-muted ml-2">{'{'}</span>
          </div>
          <ExperienceTimeline />
          <div className="text-terminal-muted font-mono ml-4 mt-4">{'}'}</div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center mb-8 font-mono">
            <span className="text-accent-green mr-2">public</span>
            <h3 className="text-xl font-bold text-terminal-text">
              education()
            </h3>
            <span className="text-terminal-muted ml-2">{'{'}</span>
          </div>

          <div className="bg-terminal-card border border-terminal-border rounded-lg p-6 ml-4">
            <div className="flex items-start">
              <div className="bg-accent-purple/10 p-3 rounded-lg mr-4">
                <GraduationCap className="text-accent-purple" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-terminal-text font-mono">
                  {content.about.education.school}
                </h4>
                <p className="text-accent-purple font-mono text-sm mb-2">
                  {content.about.education.degree}
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-sm text-terminal-muted bg-terminal-black px-3 py-1 rounded border border-terminal-border">
                    <span className="text-accent-green font-bold mr-2">
                      GPA:
                    </span>
                    {content.about.education.gpa}
                  </div>
                  <div className="flex items-center text-sm text-terminal-muted bg-terminal-black px-3 py-1 rounded border border-terminal-border">
                    <Award size={14} className="text-accent-yellow mr-2" />
                    {content.about.education.rank}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-terminal-muted font-mono ml-4 mt-4">{'}'}</div>
        </div>
      </div>

      <div className="mt-12 text-2xl text-terminal-text font-mono">{'}'}</div>
    </section>);

}