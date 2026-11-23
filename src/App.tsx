import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import type { LightboxSlide } from './components/LightboxModal';
import { HudOverlay } from './components/HudOverlay';
import { GALLERY_ITEMS, GalleryItem, PROFILE } from './data/portfolioData';

const AmbientSpace3D = lazy(() =>
  import('./components/AmbientSpace3D').then((m) => ({ default: m.AmbientSpace3D }))
);
const MiniGameSection = lazy(() =>
  import('./components/MiniGameSection').then((m) => ({ default: m.MiniGameSection }))
);
const LightboxModal = lazy(() =>
  import('./components/LightboxModal').then((m) => ({ default: m.LightboxModal }))
);
const ShowreelModal = lazy(() =>
  import('./components/ShowreelModal').then((m) => ({ default: m.ShowreelModal }))
);

const SECTION_IDS = ['home', 'about', 'projects', 'achievements', 'gallery', 'contact', 'mini-game'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [hudVisible, setHudVisible] = useState(true);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [playGameSignal, setPlayGameSignal] = useState(0);
  const [lightboxState, setLightboxState] = useState<{
    slides: LightboxSlide[];
    index: number;
  } | null>(null);

  const handlePlayGame = () => {
    const el = document.getElementById('mini-game');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setPlayGameSignal((n) => n + 1);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.32;
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openSlides = (slides: LightboxSlide[], startIndex: number) => {
    setLightboxState({
      slides,
      index: startIndex,
    });
  };

  const openGalleryItem = (item: GalleryItem) => {
    const slides: LightboxSlide[] = GALLERY_ITEMS.map((g) => ({
      src: g.image,
      title: g.title,
      caption: g.caption,
      categoryLabel: g.categoryLabel,
      externalUrl: g.externalUrl,
    }));
    const idx = Math.max(
      0,
      GALLERY_ITEMS.findIndex((g) => g.id === item.id)
    );
    setLightboxState({ slides, index: idx });
  };

  return (
    <div className="relative min-h-screen bg-[#030407] text-[#F4F7FF]">
      {/* Fixed 3D WebGL Ambient Starfield & Cobalt Grid (code-split chunk) */}
      <Suspense fallback={null}>
        <AmbientSpace3D />
      </Suspense>

      {/* Subtle Editorial Grid Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] noise-overlay opacity-70"
      />

      {/* Sticky Glass Navigation */}
      <Navbar
        activeSection={activeSection}
        hudVisible={hudVisible}
        onToggleHud={() => setHudVisible((v) => !v)}
        onPlayGame={handlePlayGame}
      />

      {/* Main Content Flow — All 6 Requested Sections */}
      <main className="relative z-10">
        <HeroSection onOpenShowreel={() => setShowreelOpen(true)} />
        <div className="section-divider max-w-6xl mx-auto" />
        <AboutSection />
        <div className="section-divider max-w-6xl mx-auto" />
        <ProjectsSection />
        <div className="section-divider max-w-6xl mx-auto" />
        <AchievementsSection onOpenSlides={openSlides} />
        <div className="section-divider max-w-6xl mx-auto" />
        <GallerySection onOpenGalleryItem={openGalleryItem} />
        <div className="section-divider max-w-6xl mx-auto" />
        <ContactSection />
        <div className="section-divider max-w-6xl mx-auto" />
        <Suspense fallback={<div id="mini-game" className="h-64" />}>
          <MiniGameSection autoStartSignal={playGameSignal} />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1558C9]/25 bg-[#030407]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#091228] border border-[#1558C9]/60 flex items-center justify-center font-display font-bold text-xs text-[#D4FF24]">
              TH
            </span>
            <span className="text-sm text-[#95A8CC]">
              &copy; {new Date().getFullYear()} {PROFILE.fullName}. All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E94BE]">
            {SECTION_IDS.map((id) => (
              <a key={id} href={`#${id}`} className="hover:text-[#D4FF24] transition-colors">
                {id === 'mini-game' ? 'play game' : id}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Interactive Game Engine Telemetry HUD */}
      <HudOverlay visible={hudVisible} activeSection={activeSection} />

      {/* Fullscreen Lightbox */}
      {lightboxState && (
        <Suspense fallback={null}>
          <LightboxModal
            slides={lightboxState.slides}
            index={lightboxState.index}
            onClose={() => setLightboxState(null)}
            onNavigate={(nextIndex) =>
              setLightboxState((prev) => (prev ? { ...prev, index: nextIndex } : null))
            }
          />
        </Suspense>
      )}

      {/* Unity Gameplay Showreel Theater */}
      {showreelOpen && (
        <Suspense fallback={null}>
          <ShowreelModal open={showreelOpen} onClose={() => setShowreelOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
