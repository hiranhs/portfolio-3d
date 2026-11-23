import React, { useState } from 'react';
import { ArrowRight, Download, Gamepad2, Play, Sparkles, Zap } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { HeroCanvas3D } from './HeroCanvas3D';

interface HeroSectionProps {
  onOpenShowreel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenShowreel }) => {
  const [pulseCount, setPulseCount] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleStageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: nx * 14, y: -ny * 12 });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-14 overflow-hidden"
    >
      {/* Dramatic Cobalt Volumetric Radial Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] w-[700px] h-[700px] rounded-full opacity-45 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(21,88,201,0.9) 0%, rgba(21,88,201,0.35) 45%, rgba(3,4,7,0) 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(212,255,36,0.65) 0%, rgba(3,4,7,0) 72%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-6 space-y-5">
            {/* Full Name Display Headline (Electric Cobalt Font Design) */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4FF24] mb-2">
                HELLO, I&apos;M
              </p>
              <h1 className="font-sans font-light leading-[1.0] tracking-tight text-[#5E9BFF] text-cobalt-glow text-[2.45rem] sm:text-[3.35rem] lg:text-[3.55rem] xl:text-[4.05rem]">
                <span className="block">Tharindu</span>
                <span className="block">Hiran</span>
                <span className="block">Samaranayake</span>
              </h1>
            </div>

            <p className="max-w-lg text-sm sm:text-base text-[#B5C4E0] leading-relaxed">
              Game Developer &amp; 3D World Builder with{' '}
              <span className="text-white font-semibold">
                BSc (Hons) Computer Science — Second Class Upper
              </span>{' '}
              from SLIIT City UNI. I craft atmospheric{' '}
              <span className="text-[#D4FF24]">Unity 2D/3D games</span>, responsive Kotlin &amp; web
              apps, and bold interactive experiences.
            </p>

            {/* Primary CTA Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-0.5">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#D4FF24] text-[#030407] font-mono text-xs font-bold uppercase tracking-[0.16em] whitespace-nowrap transition-all duration-300 hover:bg-[#E4FF6E] hover:scale-[1.03] acid-glow"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={onOpenShowreel}
                className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[#1558C9]/50 bg-[#081022]/70 hover:border-[#D4FF24]/70 transition-all"
              >
                <span className="w-8 h-8 rounded-full bg-[#1558C9]/30 border border-[#4B8BFF]/60 flex items-center justify-center group-hover:bg-[#D4FF24] group-hover:text-[#030407] group-hover:border-[#D4FF24] transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span className="pr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#D7E3FC] group-hover:text-white text-left leading-tight">
                  Watch
                  <br />
                  Gameplay
                </span>
              </button>

              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] text-[#9EB4DC] hover:text-[#D4FF24] whitespace-nowrap transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Resume PDF
              </a>
            </div>

            {/* Bottom Stats Strip — Always 100% Visible Above The Fold */}
            <div className="pt-4 border-t border-[#1558C9]/25 grid grid-cols-3 gap-4 max-w-xl">
              {PROFILE.heroStats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="font-display font-bold text-base sm:text-xl text-white whitespace-nowrap">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A8FB5] leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 3D INTERACTIVE STAGE */}
          <div className="lg:col-span-6 relative">
            <div
              onMouseMove={handleStageMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              onClick={() => setPulseCount((c) => c + 1)}
              className="relative mx-auto w-full max-w-[460px] xl:max-w-[490px] aspect-square cursor-pointer select-none flex items-center justify-center"
              title="Click to pulse the 3D Energy Core"
            >
              {/* Layer 1: Live Three.js WebGL 3D Core */}
              <div className="absolute inset-0 z-0">
                <HeroCanvas3D pulseTrigger={pulseCount} />
              </div>

              {/* Layer 2: Volumetric Cobalt + Acid Backlight Aura */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-10 rounded-full opacity-60 blur-[65px] z-[1]"
                style={{
                  background:
                    'radial-gradient(circle at 50% 42%, rgba(21,88,201,0.9) 0%, rgba(212,255,36,0.22) 55%, transparent 78%)',
                }}
              />

              {/* Layer 3: Interactive 3D-Tilting Studio Portrait */}
              <div
                style={{
                  transform: `perspective(1100px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(24px)`,
                  transition: 'transform 160ms ease-out',
                }}
                className="relative z-10 w-[68%] sm:w-[64%] flex flex-col items-center justify-end pointer-events-none"
              >
                <div className="absolute top-5 w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-[#1558C9]/45 animate-orbit-slow" />
                <div className="absolute top-9 w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-dashed border-[#D4FF24]/30 animate-orbit-reverse" />

                <img
                  src={PROFILE.portraitCutout}
                  alt="Tharindu Hiran Samaranayake"
                  className="relative z-10 w-full h-auto object-contain portrait-stage-mask drop-shadow-[0_18px_40px_rgba(21,88,201,0.58)]"
                />
              </div>

              {/* Top-Left Floating Gaming Badge */}
              <div className="hidden sm:flex absolute top-4 left-0 z-20 items-center gap-2 px-3 py-2 rounded-xl glass-panel hud-bracket">
                <Gamepad2 className="w-4 h-4 text-[#D4FF24]" />
                <div className="leading-tight">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4FF24]">
                    PLAYER 01
                  </div>
                  <div className="text-xs font-semibold text-white">Unity &amp; C# Dev</div>
                </div>
              </div>

              {/* Bottom-Right Floating Interactive Hint */}
              <div className="hidden sm:flex absolute bottom-10 right-0 z-20 items-center gap-2 px-3 py-2 rounded-xl glass-panel">
                <Zap className="w-4 h-4 text-[#D4FF24]" />
                <div className="leading-tight">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7CAEFF]">
                    INTERACTIVE 3D
                  </div>
                  <div className="text-xs text-white/90">Click core to pulse</div>
                </div>
              </div>

              {/* Right Edge Micro-Telemetry */}
              <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 flex-col gap-1 text-right pointer-events-none">
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#8AB8FF]">
                  REAL-TIME
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#D4FF24]">
                  WEBGL CORE
                </span>
              </div>

              {/* Bottom Glass Nameplate */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#030407]/85 border border-[#1558C9]/50 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#D4FF24]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/90 whitespace-nowrap">
                  Tharindu Hiran • Ready to Build
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Social Row */}
        <div className="mt-8 flex lg:hidden items-center justify-center gap-4">
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 rounded-full bg-[#181717] border border-white/25 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full bg-[#0A66C2] border border-[#4EA0F5]/60 flex items-center justify-center text-white shadow-[0_0_20px_rgba(10,102,194,0.5)] hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={PROFILE.socials.itch}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="itch.io"
            className="w-11 h-11 rounded-full bg-[#FA5C5C] border border-[#FF9B9B]/60 flex items-center justify-center text-white shadow-[0_0_20px_rgba(250,92,92,0.5)] hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 245.37 220.74" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right-Edge Vertical Brand Circle Dock (GitHub, LinkedIn, itch.io) */}
      <aside
        aria-label="Social Profiles"
        className="hidden lg:flex flex-col items-center gap-4 absolute right-5 xl:right-8 top-1/2 -translate-y-1/2 z-30"
      >
        <span className="w-px h-12 bg-gradient-to-b from-transparent via-[#1558C9]/70 to-[#D4FF24]/70" />

        {/* GitHub */}
        <a
          href={PROFILE.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="group relative w-12 h-12 rounded-full bg-[#181717] border-2 border-white/30 flex items-center justify-center text-white shadow-[0_0_24px_rgba(255,255,255,0.18)] transition-all duration-300 hover:scale-110 hover:border-white hover:shadow-[0_0_28px_rgba(255,255,255,0.45)]"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span className="pointer-events-none absolute right-14 px-2.5 py-1 rounded-md bg-[#091124] border border-white/20 font-mono text-[10px] uppercase tracking-widest text-white opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap">
            GitHub
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href={PROFILE.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="group relative w-12 h-12 rounded-full bg-[#0A66C2] border-2 border-[#59A9FF]/70 flex items-center justify-center text-white shadow-[0_0_24px_rgba(10,102,194,0.55)] transition-all duration-300 hover:scale-110 hover:border-white hover:shadow-[0_0_30px_rgba(10,102,194,0.85)]"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span className="pointer-events-none absolute right-14 px-2.5 py-1 rounded-md bg-[#091124] border border-[#0A66C2]/70 font-mono text-[10px] uppercase tracking-widest text-white opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap">
            LinkedIn
          </span>
        </a>

        {/* itch.io */}
        <a
          href={PROFILE.socials.itch}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="itch.io"
          className="group relative w-12 h-12 rounded-full bg-[#FA5C5C] border-2 border-[#FFA0A0]/75 flex items-center justify-center text-white shadow-[0_0_24px_rgba(250,92,92,0.55)] transition-all duration-300 hover:scale-110 hover:border-white hover:shadow-[0_0_30px_rgba(250,92,92,0.85)]"
        >
          <svg viewBox="0 0 245.37 220.74" className="w-6 h-6 fill-current" aria-hidden="true">
            <path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z" />
          </svg>
          <span className="pointer-events-none absolute right-14 px-2.5 py-1 rounded-md bg-[#091124] border border-[#FA5C5C]/70 font-mono text-[10px] uppercase tracking-widest text-white opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap">
            itch.io
          </span>
        </a>

        <span className="w-px h-12 bg-gradient-to-t from-transparent via-[#1558C9]/70 to-[#D4FF24]/70" />
      </aside>
    </section>
  );
};
