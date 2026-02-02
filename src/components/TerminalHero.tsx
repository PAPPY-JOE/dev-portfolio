import React, { useEffect, useState } from 'react';
import { useContent } from '../context/ContentContext';
export function TerminalHero() {
  const { content } = useContent();
  const [lines, setLines] = useState<
    Array<{
      cmd: string;
      output: React.ReactNode;
    }>>(
    []);
  const [currentCommand, setCurrentCommand] = useState('');
  const [step, setStep] = useState(0);
  const commands = [
  {
    cmd: 'whoami',
    output:
    <div className="text-terminal-text mb-4">
          <span className="text-accent-green font-bold text-2xl">
            {content.hero.name}
          </span>
          <br />
          <span className="text-accent-purple font-bold">
            {content.hero.title}
          </span>
          <br />
          <span className="text-terminal-muted">
            Based in {content.hero.location}
          </span>
        </div>

  },
  {
    cmd: 'cat about.txt',
    output:
    <div className="text-terminal-text max-w-2xl mb-4 leading-relaxed">
          {content.hero.bio}
        </div>

  },
  {
    cmd: 'ls skills/',
    output:
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-4">
          {content.skills[0]?.items.slice(0, 4).map((skill) =>
      <span key={skill.name} className="text-accent-blue">
              {skill.name}
            </span>
      )}
        </div>

  }];

  useEffect(() => {
    // Reset animation when content changes
    setLines([]);
    setStep(0);
    setCurrentCommand('');
  }, [content.hero.name, content.hero.title]);
  useEffect(() => {
    if (step >= commands.length) return;
    const targetCommand = commands[step].cmd;
    let charIndex = 0;
    const typeInterval = setInterval(
      () => {
        if (charIndex <= targetCommand.length) {
          setCurrentCommand(targetCommand.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setLines((prev) => [
            ...prev,
            {
              cmd: targetCommand,
              output: commands[step].output
            }]
            );
            setCurrentCommand('');
            setStep((prev) => prev + 1);
          }, 500);
        }
      },
      50 + Math.random() * 50
    );
    return () => clearInterval(typeInterval);
  }, [step]);
  return (
    <section
      id="home"
      className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0 bg-[linear-gradient(rgba(42,42,62,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(42,42,62,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>

      <div className="w-full max-w-4xl z-10">
        {/* Profile Image + Name Header */}
        <div className="flex items-center justify-center mb-8 space-x-6">
          {content.hero.profileImage &&
          <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-accent-green shadow-lg shadow-accent-green/20">
                <img
                src={content.hero.profileImage}
                alt={content.hero.name}
                className="w-full h-full object-cover" />

              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-green rounded-full border-2 border-terminal-black flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            </div>
          }
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-terminal-text font-mono">
              {content.hero.name}
            </h1>
            <p className="text-accent-purple text-lg font-mono">
              {content.hero.title}
            </p>
            <p className="text-terminal-muted text-sm">
              {content.hero.location}
            </p>
          </div>
        </div>

        <div className="bg-terminal-card border border-terminal-border rounded-lg shadow-2xl overflow-hidden font-mono relative">
          <div className="bg-terminal-black/50 px-4 py-2 flex items-center space-x-2 border-b border-terminal-border">
            <div className="w-3 h-3 rounded-full bg-accent-red"></div>
            <div className="w-3 h-3 rounded-full bg-accent-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-accent-green"></div>
            <div className="flex-1 text-center text-xs text-terminal-muted">
              {content.hero.name.toLowerCase().replace(' ', '@')}:~
            </div>
          </div>

          <div className="p-6 min-h-[350px] relative">
            <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none animate-scanline"></div>

            {lines.map((line, index) =>
            <div key={index} className="mb-4">
                <div className="flex items-center text-accent-green mb-1">
                  <span className="mr-2">➜</span>
                  <span className="text-accent-blue mr-2">~</span>
                  <span className="text-terminal-text">{line.cmd}</span>
                </div>
                <div className="pl-6">{line.output}</div>
              </div>
            )}

            {step < commands.length &&
            <div className="flex items-center text-accent-green">
                <span className="mr-2">➜</span>
                <span className="text-accent-blue mr-2">~</span>
                <span className="text-terminal-text">{currentCommand}</span>
                <span className="w-2 h-5 bg-accent-green ml-1 animate-blink"></span>
              </div>
            }

            {step >= commands.length &&
            <div className="flex items-center text-accent-green mt-4">
                <span className="mr-2">➜</span>
                <span className="text-accent-blue mr-2">~</span>
                <span className="w-2 h-5 bg-accent-green ml-1 animate-blink"></span>
              </div>
            }
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-terminal-muted text-sm font-mono animate-pulse">
            Scroll down to initialize system...
          </p>
        </div>
      </div>
    </section>);

}