import React from 'react';
import { Award, Clapperboard, ExternalLink, Gamepad2, Newspaper, Play, Search, Sparkles, Trophy } from 'lucide-react';
import { ACHIEVEMENTS, GAMEFEST_PHOTOS } from '../data/portfolioData';
import { LightboxSlide } from './LightboxModal';
import { TiltCard3D } from './TiltCard3D';

interface AchievementsSectionProps {
  onOpenSlides: (slides: LightboxSlide[], startIndex: number) => void;
}

const RARITY_STYLES: Record<string, string> = {
  HONOURS: 'bg-[#D4FF24] text-[#030407]',
  LEGENDARY: 'bg-[#D4FF24] text-[#030407]',
  'FILM AWARD': 'bg-[#FF2E4D] text-white',
  'NATIONAL PRESS': 'bg-[#1558C9] text-white border border-[#5E9BFF]/60',
  SHIPPED: 'bg-[#0C1D42] text-[#D4FF24] border border-[#D4FF24]/45',
  IMPACT: 'bg-[#0D214A] text-[#7CB2FF] border border-[#2E7BFF]/50',
};

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ onOpenSlides }) => {
  const pressAchievement = ACHIEVEMENTS.find((a) => a.id === 'national-press')!;
  const gameFestAchievement = ACHIEVEMENTS.find((a) => a.id === 'game-dev-comp')!;
  const filmAchievement = ACHIEVEMENTS.find((a) => a.id === 'blessed-rat-film')!;
  const otherAchievements = ACHIEVEMENTS.filter(
    (a) => a.id !== 'national-press' && a.id !== 'game-dev-comp' && a.id !== 'blessed-rat-film'
  );

  const filmSlides: LightboxSlide[] = [
    {
      src: './assets/press/blessed-rat-ruhuna-poster.jpg',
      title: 'Blessed Rat — 2nd Place Best Short Film (Frame by Frame 1.0)',
      caption:
        'Took home 2nd Place — Best Short Film at the Frame by Frame 1.0 Short Film Competition 2026, organized by the Rotaract Club of the University of Ruhuna.',
      categoryLabel: '2ND PLACE • FRAME BY FRAME 1.0 (RUHUNA)',
      externalUrl: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
    },
    {
      src: './assets/press/blessed-rat-ruhuna-cert.jpg',
      title: 'Certificate of Excellence — Frame by Frame 2026',
      caption:
        'Proudly presented to Tharindu Hiran Samaranayake for securing Second Place in the creative Short Movie category at Frame by Frame Short Movie Competition 2026 (Rotaract Club of University of Ruhuna).',
      categoryLabel: 'CERTIFICATE OF EXCELLENCE • 2ND PLACE',
      externalUrl: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
    },
    {
      src: './assets/press/blessed-rat-ceremony.jpg',
      title: 'Blessed Rat — Award Ceremony (Student Literature Festival 2026)',
      caption:
        'Receiving the 3rd Place (Open Category) award & certificates presented by distinguished Sri Lankan theatre practitioner and filmmaker Prof. K. W. K. M. M. W. Indika Ferdinando at E.O.E. Pereira Theatre, University of Peradeniya.',
      categoryLabel: '3RD PLACE • UNIVERSITY OF PERADENIYA',
      externalUrl: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
    },
    {
      src: './assets/press/blessed-rat-award.jpg',
      title: 'Blessed Rat — Official 3rd Place Festival Poster',
      caption:
        'Wanderlust Pictures — Won 3rd Place in the Short Film Category at Let My Country Awake 2026 Student Literary Festival, University of Peradeniya.',
      categoryLabel: '3RD PLACE • LET MY COUNTRY AWAKE 2026',
      externalUrl: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
    },
  ];

  const gameFestSlides: LightboxSlide[] = GAMEFEST_PHOTOS.map((p) => ({
    src: p.src,
    title: p.title,
    caption: p.caption,
    categoryLabel: 'GAME FEST 2026 • 2ND PLACE',
  }));

  const pressSlides: LightboxSlide[] = [
    {
      src: './assets/press/sunday-times.jpg',
      title: 'The Sunday Times — Education Times (Nov 16, 2025)',
      caption:
        'Delta Gemunupura College Receives New School Management System from SLIIT City UNI Students (Team Nurox).',
      categoryLabel: 'NATIONAL PRESS',
    },
    {
      src: './assets/press/sunday-observer.jpg',
      title: 'Sunday Observer — National Feature',
      caption:
        'Official handover ceremony coverage of the School Database Management System developed by Team Nurox.',
      categoryLabel: 'NATIONAL PRESS',
    },
  ];

  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-[#D4FF24] mb-3">
              03 // TROPHY VAULT
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-none">
              <span className="font-serif italic text-[#D4FF24] font-semibold mr-3">Unlocked</span>
              <span className="font-display text-white">Achievements</span>
            </h2>
          </div>

          {/* Gaming XP Bar Summary */}
          <div className="glass-panel rounded-2xl px-5 py-3.5 flex items-center gap-4">
            <Trophy className="w-6 h-6 text-[#D4FF24] shrink-0" />
            <div>
              <div className="flex items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-wider">
                <span className="text-white font-semibold">
                  {ACHIEVEMENTS.length} / {ACHIEVEMENTS.length} MILESTONES UNLOCKED
                </span>
                <span className="text-[#D4FF24]">15,900 XP</span>
              </div>
              <div className="mt-1.5 h-1.5 w-52 rounded-full bg-[#091226] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '96%',
                    background: 'linear-gradient(90deg, #1558C9, #D4FF24)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SPOTLIGHT 1: GAME FEST 2026 — 2ND PLACE (4 INTERACTIVE PHOTOS) */}
        <TiltCard3D className="rounded-3xl mb-10" maxTilt={3.5} glowColor="acid">
          <div className="glass-panel rounded-3xl p-6 sm:p-9 hud-bracket">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF24] text-[#030407] font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    2ND PLACE • GAME FEST 2026
                  </span>
                  <span className="font-mono text-xs text-[#7FAFFF]">
                    {gameFestAchievement.date} • {gameFestAchievement.xp}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {gameFestAchievement.title}
                </h3>
                <p className="text-[#C1CFE9] leading-relaxed">{gameFestAchievement.description}</p>
                <div className="p-4 rounded-2xl bg-[#070E1F] border border-[#1558C9]/40 space-y-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4FF24]">
                    COMPETITION DETAILS
                  </div>
                  <p className="text-xs sm:text-sm text-[#A9BCDE] leading-relaxed">
                    Organised by the <span className="text-white font-medium">Department of Computing, SLIIT Kandy UNI</span> • School &amp; Inter-University Game Development Competition. Click any photo to inspect in full screen.
                  </p>
                </div>
              </div>

              {/* 4-Photo Interactive Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-3.5 sm:gap-4">
                {GAMEFEST_PHOTOS.map((photo, idx) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => onOpenSlides(gameFestSlides, idx)}
                    className="group relative rounded-2xl overflow-hidden border border-[#1558C9]/45 bg-[#060B17] text-left hover:border-[#D4FF24] transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        className={`w-full h-full object-cover ${photo.objectPosition || 'object-center'} transition-transform duration-500 group-hover:scale-105`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030407]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4FF24] font-semibold">
                        {photo.tag}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-[#030407]/80 border border-[#1558C9]/60 flex items-center justify-center text-white group-hover:bg-[#D4FF24] group-hover:text-[#030407] group-hover:border-[#D4FF24] transition-colors">
                        <Search className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TiltCard3D>

        {/* SPOTLIGHT 2: NATIONAL PRESS COVERAGE (Sunday Times & Sunday Observer) */}
        <TiltCard3D className="rounded-3xl mb-10" maxTilt={3.5} glowColor="cobalt">
          <div className="glass-panel rounded-3xl p-6 sm:p-9 hud-bracket">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1558C9] text-white border border-[#5E9BFF]/60 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Newspaper className="w-3.5 h-3.5" />
                    {pressAchievement.rarity}
                  </span>
                  <span className="font-mono text-xs text-[#7FAFFF]">
                    {pressAchievement.date} • {pressAchievement.xp}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {pressAchievement.title}
                </h3>
                <p className="text-[#C1CFE9] leading-relaxed">{pressAchievement.description}</p>
                <p className="text-sm text-[#8CA3CC] leading-relaxed">
                  Built on Windows 11 WSA with <span className="text-white font-medium">Kotlin &amp; Firebase</span>{' '}
                  and formally handed over to the Zonal Director of Education &amp; Principal of
                  Delta Gemunupura College, Pussellawa. Click either newspaper clipping to read in
                  full resolution.
                </p>
              </div>

              {/* Dual Clickable Newspaper Clippings */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => onOpenSlides(pressSlides, 0)}
                  className="group relative rounded-2xl overflow-hidden border border-[#1558C9]/45 bg-[#060B17] text-left hover:border-[#D4FF24] transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="./assets/press/sunday-times.jpg"
                      alt="The Sunday Times Article"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-sm text-white">
                        The Sunday Times
                      </div>
                      <div className="font-mono text-[10px] text-[#8AB8FF]">EDUCATION TIMES</div>
                    </div>
                    <Search className="w-4 h-4 text-[#D4FF24]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenSlides(pressSlides, 1)}
                  className="group relative rounded-2xl overflow-hidden border border-[#1558C9]/45 bg-[#060B17] text-left hover:border-[#D4FF24] transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="./assets/press/sunday-observer.jpg"
                      alt="Sunday Observer Article"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-sm text-white">
                        Sunday Observer
                      </div>
                      <div className="font-mono text-[10px] text-[#8AB8FF]">PRINT FEATURE</div>
                    </div>
                    <Search className="w-4 h-4 text-[#D4FF24]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </TiltCard3D>

        {/* SPOTLIGHT 3: BLESSED RAT — 2× AWARD-WINNING SHORT FILM (4 INTERACTIVE VISUALS) */}
        <TiltCard3D className="rounded-3xl mb-10" maxTilt={3.5} glowColor="acid">
          <div className="glass-panel rounded-3xl p-6 sm:p-9 hud-bracket">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF2E4D] text-white font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                    <Clapperboard className="w-3.5 h-3.5" />
                    2ND PLACE • FRAME BY FRAME 1.0
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF24]/15 border border-[#D4FF24]/50 text-[#D4FF24] font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                    3RD PLACE • PERADENIYA 2026
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {filmAchievement.title}
                </h3>
                <p className="text-sm sm:text-base text-[#C1CFE9] leading-relaxed">
                  {filmAchievement.description}
                </p>

                {/* Both Award Breakdowns */}
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-2xl bg-[#070E1F] border border-[#FF2E4D]/35 space-y-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF6B81]">
                      AWARD 01 • 2ND PLACE — BEST SHORT FILM
                    </div>
                    <p className="text-xs text-[#C4D3EE] leading-relaxed">
                      <span className="text-white font-semibold">Frame by Frame 1.0 (2026)</span> —
                      Organized by the Rotaract Club of the University of Ruhuna. Awarded Certificate
                      of Excellence.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#070E1F] border border-[#1558C9]/45 space-y-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4FF24]">
                      AWARD 02 • 3RD PLACE — OPEN CATEGORY
                    </div>
                    <p className="text-xs text-[#C4D3EE] leading-relaxed">
                      <span className="text-white font-semibold">
                        Student Literature Festival 2026
                      </span>{' '}
                      (University of Peradeniya) — Presented by distinguished filmmaker{' '}
                      <span className="text-white font-semibold">
                        Prof. K. W. K. M. M. W. Indika Ferdinando
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={filmAchievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF2E4D] hover:bg-[#FF4763] text-white font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all hover:scale-[1.03] shadow-[0_0_24px_rgba(255,46,77,0.45)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Watch on YouTube
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenSlides(filmSlides, 0)}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#091228] border border-[#1558C9]/55 text-[#B9CEF2] hover:border-[#D4FF24] hover:text-[#D4FF24] font-mono text-xs uppercase tracking-widest transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" />
                    All 4 Photos
                  </button>
                </div>
              </div>

              {/* 2×2 Interactive Photo Grid (Ruhuna 2nd Place + Peradeniya 3rd Place) */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-3.5 sm:gap-4">
                {[
                  {
                    src: './assets/press/blessed-rat-ruhuna-poster.jpg',
                    tag: '2ND PLACE • RUHUNA',
                    pos: 'object-top',
                  },
                  {
                    src: './assets/press/blessed-rat-ruhuna-cert.jpg',
                    tag: 'RUHUNA CERTIFICATE',
                    pos: 'object-center',
                  },
                  {
                    src: './assets/press/blessed-rat-ceremony.jpg',
                    tag: 'PERADENIYA STAGE',
                    pos: 'object-top',
                  },
                  {
                    src: './assets/press/blessed-rat-award.jpg',
                    tag: '3RD PLACE • PERADENIYA',
                    pos: 'object-top',
                  },
                ].map((item, idx) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => onOpenSlides(filmSlides, idx)}
                    className="group relative rounded-2xl overflow-hidden border border-[#1558C9]/45 bg-[#060B17] text-left hover:border-[#D4FF24] transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.tag}
                        loading="lazy"
                        className={`w-full h-full object-cover ${item.pos} transition-transform duration-500 group-hover:scale-105`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030407]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#D4FF24] font-semibold">
                        {item.tag}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-[#030407]/80 border border-[#1558C9]/60 flex items-center justify-center text-white group-hover:bg-[#D4FF24] group-hover:text-[#030407] group-hover:border-[#D4FF24] transition-colors shrink-0">
                        <Search className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TiltCard3D>

        {/* TROPHY CARDS GRID (Honours, Shipped Games, School Impact) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherAchievements.map((item) => (
            <TiltCard3D key={item.id} className="rounded-3xl" maxTilt={6} glowColor="acid">
              <div className="glass-panel rounded-3xl p-6 h-full flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                        RARITY_STYLES[item.rarity] || 'bg-[#1558C9] text-white'
                      }`}
                    >
                      {item.rarity}
                    </span>
                    <span className="font-mono text-xs text-[#D4FF24] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.xp}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1558C9]/20 border border-[#1558C9]/55 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-5 h-5 text-[#D4FF24]" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                      <div className="font-mono text-[10px] text-[#7FAFFF] mt-1">
                        {item.issuer} • {item.date}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#B3C3E0] leading-relaxed">{item.description}</p>
                </div>

                {item.link && (
                  <div className="pt-3 border-t border-white/10">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D4FF24] hover:text-[#E8FF8C] transition-colors"
                    >
                      {item.linkLabel || 'Explore'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};
