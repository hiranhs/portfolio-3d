import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Film,
  Gamepad2,
  Github,
  Layers,
  Play,
  Smartphone,
  X,
} from 'lucide-react';
import { GAMEPLAY_VIDEOS, PROJECTS, ProjectItem } from '../data/portfolioData';
import { TiltCard3D } from './TiltCard3D';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'game' | 'app'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeVideoIds, setActiveVideoIds] = useState<Record<string, boolean>>({});

  const visibleProjects = PROJECTS.filter((p) => (filter === 'all' ? true : p.category === filter));

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-[#D4FF24] mb-3">
              02 // PLAYABLE ARCHIVE
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-none">
              <span className="font-serif italic text-[#D4FF24] font-semibold mr-3">Featured</span>
              <span className="font-display text-white">Projects</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#080D1B]/90 border border-[#1558C9]/35 w-fit">
            {[
              { id: 'all' as const, label: 'All Missions (6)', icon: Layers },
              { id: 'game' as const, label: 'Unity Games (3)', icon: Gamepad2 },
              { id: 'app' as const, label: 'Mobile & Web (3)', icon: Smartphone },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-[#D4FF24] text-[#030407] font-bold shadow-[0_0_20px_rgba(212,255,36,0.35)]'
                      : 'text-[#A6B8DA] hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Tilt Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleProjects.map((project) => (
            <TiltCard3D
              key={project.id}
              className="rounded-3xl h-full"
              maxTilt={7}
              glowColor={project.category === 'game' ? 'acid' : 'cobalt'}
            >
              <article className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full group">
                {/* Media Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#060B17]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050812] via-[#050812]/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md ${
                        project.category === 'game'
                          ? 'bg-[#D4FF24] text-[#030407]'
                          : 'bg-[#1558C9]/90 text-white border border-[#5E9BFF]/50'
                      }`}
                    >
                      {project.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#030407]/75 border border-white/15 font-mono text-[10px] text-[#C4D3EE]">
                      {project.year}
                    </span>
                  </div>

                  {/* Quick Inspect Overlay Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#030407]/85 border border-[#D4FF24]/60 text-[#D4FF24] font-mono text-[10px] uppercase tracking-widest opacity-90 hover:bg-[#D4FF24] hover:text-[#030407] transition-all"
                  >
                    {project.youtubeId ? <Play className="w-3 h-3 fill-current" /> : <ArrowUpRight className="w-3 h-3" />}
                    {project.youtubeId ? 'Watch / Details' : 'Inspect'}
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6FA5FF] mb-1">
                    {project.subtitle}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2.5 group-hover:text-[#D4FF24] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#A5B6D6] leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#0A1329] border border-[#1558C9]/35 font-mono text-[10px] text-[#BDD0F2]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-white hover:border-[#D4FF24] hover:text-[#D4FF24] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4FF24] text-[#030407] text-xs font-mono font-bold hover:bg-[#E2FF66] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {project.liveLabel || 'Live Demo'}
                      </a>
                    )}
                    {project.youtubeId && !project.liveUrl && (
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1558C9] text-white text-xs font-mono font-semibold hover:bg-[#2A75FF] transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Gameplay Preview
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard3D>
          ))}
        </div>

        {/* GAMEPLAY CINEMA DECK (Embedded YouTube Reels from Old Portfolio) */}
        <div id="gameplay-reels" className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1558C9]/20 border border-[#1558C9]/60 flex items-center justify-center">
                <Film className="w-5 h-5 text-[#D4FF24]" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#D4FF24]">
                  GAMEPLAY SHOWREEL DECK
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Live Unity Footage &amp; Walkthroughs
                </h3>
              </div>
            </div>
            <span className="font-mono text-xs text-[#7D93BD]">
              DIRECT ENGINE CAPTURES • HD 16:9
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {GAMEPLAY_VIDEOS.map((vid) => {
              const isPlaying = Boolean(activeVideoIds[vid.id]);
              return (
                <div key={vid.id} className="glass-panel rounded-3xl overflow-hidden hud-bracket">
                  <div className="relative aspect-video bg-[#020306] overflow-hidden">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?autoplay=1`}
                        title={vid.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveVideoIds((prev) => ({ ...prev, [vid.id]: true }))
                        }
                        aria-label={`Play ${vid.title}`}
                        className="group relative w-full h-full block text-left"
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                          alt={vid.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030407]/85 via-[#030407]/25 to-transparent" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                          <span className="w-16 h-16 rounded-full bg-[#D4FF24] text-[#030407] flex items-center justify-center shadow-[0_0_32px_rgba(212,255,36,0.55)] transition-transform duration-300 group-hover:scale-110">
                            <Play className="w-7 h-7 fill-current ml-1" />
                          </span>
                          <span className="px-3.5 py-1 rounded-full bg-[#030407]/80 border border-[#1558C9]/60 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                            Click to Play HD Footage
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="font-display text-xl font-bold text-white">{vid.title}</h4>
                      <span className="px-2.5 py-1 rounded-full bg-[#D4FF24]/15 border border-[#D4FF24]/40 font-mono text-[10px] uppercase tracking-widest text-[#D4FF24] whitespace-nowrap">
                        {vid.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#A5B6D6] leading-relaxed mb-4">{vid.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {vid.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-[#091227] border border-[#1558C9]/40 font-mono text-[10px] text-[#8AB8FF]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PROJECT INSPECTOR MODAL */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[100] bg-[#030407]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl glass-panel rounded-3xl overflow-hidden border border-[#1558C9]/60 my-auto"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#030407]/85 border border-white/20 flex items-center justify-center text-white hover:border-[#D4FF24] hover:text-[#D4FF24]"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedProject.youtubeId ? (
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeId}`}
                  title={selectedProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] w-full bg-[#050812] overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#D4FF24]">
                  {selectedProject.badge} • {selectedProject.year}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-[#7FAFFF] font-mono mt-0.5">{selectedProject.subtitle}</p>
              </div>

              <p className="text-[#C7D4EE] leading-relaxed">{selectedProject.description}</p>

              <div className="space-y-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8FA5CC]">
                  Key Highlights
                </div>
                {selectedProject.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 text-sm text-[#D6E1F7]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4FF24] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4FF24] text-[#030407] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#E2FF66]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {selectedProject.liveLabel || 'Launch Live'}
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1558C9]/25 border border-[#1558C9] text-white font-mono text-xs uppercase tracking-wider hover:border-[#D4FF24]"
                  >
                    <Github className="w-4 h-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
