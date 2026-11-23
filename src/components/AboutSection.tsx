import React, { useState } from 'react';
import { Award, Code2, Compass, Download, GraduationCap, MapPin, ShieldCheck } from 'lucide-react';
import { PROFILE, SKILL_GROUPS } from '../data/portfolioData';
import { TiltCard3D } from './TiltCard3D';

export const AboutSection: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState(SKILL_GROUPS[0].id);
  const activeGroup = SKILL_GROUPS.find((g) => g.id === activeGroupId) || SKILL_GROUPS[0];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-[#D4FF24] mb-3">
              01 // PLAYER DOSSIER
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-none">
              <span className="font-serif italic text-[#D4FF24] font-semibold mr-3">About</span>
              <span className="font-display text-white">Me</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3C2] font-mono">
            Merging Unity game engineering, Android/web architecture, and striking visual design
            into unforgettable interactive products.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 3D Holographic Character Sheet Card */}
          <div className="lg:col-span-5">
            <TiltCard3D className="rounded-3xl" maxTilt={7} glowColor="cobalt">
              <div className="glass-panel rounded-3xl p-6 sm:p-7 hud-bracket overflow-hidden">
                {/* Top Status Bar */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FF24]/15 border border-[#D4FF24]/40 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4FF24]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24] animate-pulse" />
                    AVAILABLE FOR COLLAB
                  </span>
                  <span className="font-mono text-[11px] text-[#7B92BE]">2ND CLASS UPPER</span>
                </div>

                {/* Portrait + Cobalt Halo Frame */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0D1C3E] via-[#070E21] to-[#030407] border border-[#1558C9]/40 pt-5 px-4 flex justify-center mb-6">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-50"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 30%, rgba(21,88,201,0.7) 0%, transparent 70%)',
                    }}
                  />
                  <img
                    src={PROFILE.portraitCutout}
                    alt={PROFILE.fullName}
                    className="relative z-10 h-64 w-auto object-contain portrait-stage-mask drop-shadow-[0_12px_28px_rgba(21,88,201,0.5)]"
                  />
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {PROFILE.fullName}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#5E9BFF] mb-5">
                  {PROFILE.role}
                </p>

                {/* Dossier Metadata Rows */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <GraduationCap className="w-4 h-4 text-[#D4FF24] shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#7E91B8]">
                        Education &amp; Honours
                      </div>
                      <div className="text-white/95 font-medium">
                        BSc (Hons) Computer Science — SLIIT City UNI
                      </div>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#D4FF24]/15 border border-[#D4FF24]/40 font-mono text-[10px] uppercase tracking-wider text-[#D4FF24]">
                        Second Class Upper Division
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <MapPin className="w-4 h-4 text-[#D4FF24] shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#7E91B8]">
                        Base
                      </div>
                      <div className="text-white/95 font-medium">{PROFILE.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-[#D4FF24] shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#7E91B8]">
                        Specialization
                      </div>
                      <div className="text-white/95 font-medium">
                        Unity • Unreal Engine • C# • C++ • Kotlin • Figma
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href={PROFILE.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-[#D4FF24] text-[#030407] font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all hover:bg-[#E2FF66] acid-glow"
                >
                  <Download className="w-4 h-4" />
                  Download Full Resume
                </a>
              </div>
            </TiltCard3D>
          </div>

          {/* RIGHT: Bio Story + Interactive Skill Loadout */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#5E9BFF]">
                <Compass className="w-4 h-4 text-[#D4FF24]" />
                ORIGIN STORY &amp; MISSION
              </div>
              {PROFILE.bioParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-[#C7D4EE] leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}

              {/* Mini Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="p-4 rounded-2xl bg-[#070D1D] border border-[#1558C9]/35">
                  <Code2 className="w-5 h-5 text-[#D4FF24] mb-2" />
                  <div className="font-semibold text-white text-sm">Gameplay &amp; Systems</div>
                  <p className="text-xs text-[#8DA2C8] mt-1">
                    Unity 2D/3D, C#, physics, animations &amp; REST/Firebase backends.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#070D1D] border border-[#1558C9]/35">
                  <Award className="w-5 h-5 text-[#5E9BFF] mb-2" />
                  <div className="font-semibold text-white text-sm">Real-World Impact</div>
                  <p className="text-xs text-[#8DA2C8] mt-1">
                    Shipped school DBMS praised in Sri Lanka&apos;s top national newspapers.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#070D1D] border border-[#1558C9]/35">
                  <Compass className="w-5 h-5 text-[#D4FF24] mb-2" />
                  <div className="font-semibold text-white text-sm">Academic Honours</div>
                  <p className="text-xs text-[#8DA2C8] mt-1">
                    Second Class Upper Division in BSc (Hons) Computer Science at SLIIT City UNI.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Skill Loadout Console */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4FF24]">
                    TECH LOADOUT
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                    Skills &amp; Arsenal
                  </h3>
                </div>

                {/* Category Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  {SKILL_GROUPS.map((group) => {
                    const active = group.id === activeGroup.id;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setActiveGroupId(group.id)}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all ${
                          active
                            ? 'bg-[#D4FF24] text-[#030407] font-bold shadow-[0_0_16px_rgba(212,255,36,0.35)]'
                            : 'bg-[#0A1328] text-[#9EB4DC] border border-[#1558C9]/35 hover:border-[#D4FF24]/60 hover:text-white'
                        }`}
                      >
                        {group.tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#8AB8FF]">{activeGroup.title}</span>
                <span className="font-mono text-[11px] text-[#6F82A8]">
                  {activeGroup.skills.length} EQUIPPED MODULES
                </span>
              </div>

              <div className="space-y-4">
                {activeGroup.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/95 font-medium">{skill.name}</span>
                      <span className="font-mono text-xs text-[#D4FF24]">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#091226] overflow-hidden border border-[#1558C9]/30">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${skill.level}%`,
                          background: 'linear-gradient(90deg, #1558C9 0%, #3E8BFF 65%, #D4FF24 100%)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick All-Tech Chips */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                {[
                  'Unity 3D/2D',
                  'Unreal Engine',
                  'C#',
                  'C++',
                  'Enemy AI',
                  'Raycasting',
                  'Kotlin',
                  'Android Studio',
                  'Firebase',
                  'REST API',
                  'Figma',
                  'HTML/CSS/JS',
                  'PHP & MySQL',
                ].map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[#081022] border border-[#1558C9]/35 text-[#B9CBE8] hover:border-[#D4FF24] hover:text-[#D4FF24] transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
