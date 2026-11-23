import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface HudOverlayProps {
  visible: boolean;
  activeSection: string;
}

const SECTOR_LABELS: Record<string, string> = {
  home: '00 // HOME STAGE',
  about: '01 // ABOUT ME',
  projects: '02 // PROJECTS',
  achievements: '03 // ACHIEVEMENTS',
  gallery: '04 // GALLERY',
  contact: '05 // CONTACT ME',
  'mini-game': '06 // LINE DASH ARCADE',
};

export const HudOverlay: React.FC<HudOverlayProps> = ({ visible, activeSection }) => {
  const [fps, setFps] = useState(60);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      frameCount++;
      if (now - lastTime >= 800) {
        setFps(Math.min(144, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollPct(Math.round((window.scrollY / max) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Top Ultra-Thin Scroll Progress Beam */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg, #1558C9 0%, #3E8BFF 55%, #D4FF24 100%)',
          }}
        />
      </div>

      {/* Bottom-Left Game Engine Telemetry HUD (appears once scrolled so Hero stays unobstructed) */}
      {visible && scrollPct > 4 && (
        <div className="hidden md:flex fixed bottom-5 left-5 z-40 items-center gap-3.5 px-3.5 py-2 rounded-full bg-[#050914]/88 border border-[#1558C9]/45 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#9BB2DB]">
          <span className="inline-flex items-center gap-1.5 text-[#D4FF24]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24] animate-pulse" />
            {fps} FPS
          </span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-white/90">{SECTOR_LABELS[activeSection] || '00 // HOME STAGE'}</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-[#6FA5FF]">{scrollPct}%</span>
        </div>
      )}

      {/* Bottom-Right Back to Top Button */}
      {scrollPct > 12 && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#091228]/90 border border-[#1558C9]/60 flex items-center justify-center text-[#D4FF24] hover:bg-[#D4FF24] hover:text-[#030407] hover:border-[#D4FF24] transition-all shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
};
