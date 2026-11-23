import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Cpu, Gamepad2, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  hudVisible: boolean;
  onToggleHud: () => void;
  onPlayGame: () => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact Me' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  hudVisible,
  onToggleHud,
  onPlayGame,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030407]/88 backdrop-blur-xl border-b border-[#1558C9]/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Monogram */}
        <a href="#home" className="group flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          <div className="relative w-9 h-9 rounded-xl bg-[#091124] border border-[#1558C9]/60 flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 group-hover:border-[#D4FF24] group-hover:shadow-[0_0_20px_rgba(212,255,36,0.35)]">
            <span className="font-display font-extrabold text-sm tracking-tight text-white">
              TH
            </span>
          </div>
          <div className="hidden xl:flex flex-col leading-none whitespace-nowrap">
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#D4FF24] uppercase whitespace-nowrap">
              {PROFILE.handle}
            </span>
            <span className="text-[10px] text-[#94A3C2] tracking-wider mt-1 whitespace-nowrap">
              GAME DEVELOPER
            </span>
          </div>
        </a>

        {/* Center Single-Line Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2 py-1.5 rounded-full bg-[#080C17]/80 border border-[#1558C9]/25 backdrop-blur-md shrink-0">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-3 xl:px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'text-[#030407] bg-[#D4FF24] font-semibold shadow-[0_0_18px_rgba(212,255,36,0.4)]'
                    : 'text-[#B5C4E0] hover:text-white hover:bg-[#1558C9]/20'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: All Single-Line */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPlayGame}
            className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full bg-[#FF2E4D] hover:bg-[#FF4763] text-white font-mono text-[11px] font-bold uppercase tracking-[0.12em] whitespace-nowrap shrink-0 transition-all duration-300 hover:scale-[1.03] shadow-[0_0_22px_rgba(255,46,77,0.5)]"
          >
            <Gamepad2 className="w-3.5 h-3.5 shrink-0" />
            <span>Play Game</span>
          </button>

          <button
            type="button"
            onClick={onToggleHud}
            title="Toggle 3D Telemetry HUD"
            className={`hidden 2xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-mono text-[11px] tracking-widest uppercase whitespace-nowrap shrink-0 border transition-all ${
              hudVisible
                ? 'border-[#1558C9] bg-[#1558C9]/20 text-[#8AB8FF]'
                : 'border-white/15 bg-white/5 text-[#7F8EA8] hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#D4FF24] shrink-0" />
            <span>HUD</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4FF24] text-[#030407] font-mono text-[11px] font-bold uppercase tracking-[0.12em] whitespace-nowrap shrink-0 transition-all duration-300 hover:bg-[#E2FF66] hover:scale-[1.03] acid-glow"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-xl bg-[#0B1224] border border-[#1558C9]/40 text-white hover:border-[#D4FF24] shrink-0"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 mx-4 rounded-2xl glass-panel p-5 space-y-2">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#D4FF24] text-[#030407] font-bold'
                    : 'text-[#CBD6EC] hover:bg-[#1558C9]/20 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-full border border-[#1558C9] text-xs font-mono uppercase tracking-widest text-[#8AB8FF] whitespace-nowrap"
            >
              Download CV
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full bg-[#D4FF24] text-[#030407] text-xs font-mono font-bold uppercase tracking-widest whitespace-nowrap"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
