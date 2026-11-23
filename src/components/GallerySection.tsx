import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/portfolioData';
import { TiltCard3D } from './TiltCard3D';

interface GallerySectionProps {
  onOpenGalleryItem: (item: GalleryItem) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Visuals (13)' },
  { id: 'gamefest', label: 'Game Fest 2026' },
  { id: 'game-art', label: 'Game Key Art' },
  { id: 'press', label: 'Press & Awards' },
] as const;

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenGalleryItem }) => {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]['id']>('all');

  const items = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header + Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-[#D4FF24] mb-3">
              04 // VISUAL VAULT
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-none">
              <span className="font-serif italic text-[#D4FF24] font-semibold mr-3">
                Game &amp; Events
              </span>
              <span className="font-display text-white">Gallery</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-[#D4FF24] text-[#030407] font-bold shadow-[0_0_18px_rgba(212,255,36,0.35)]'
                      : 'bg-[#080E1E] border border-[#1558C9]/35 text-[#A7B9DC] hover:border-[#D4FF24]/60 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 3-Column 3D Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <TiltCard3D
              key={item.id}
              className="rounded-2xl"
              maxTilt={6}
              glowColor={item.category === 'press' ? 'cobalt' : 'acid'}
            >
              <div
                onClick={() => onOpenGalleryItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenGalleryItem(item);
                  }
                }}
                className="group relative rounded-2xl overflow-hidden glass-panel cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#050914]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full h-full object-cover ${
                      item.id === 'g-gf-solo' ||
                      item.id === 'g-gf-team' ||
                      item.id === 'g-blessed-rat-stage' ||
                      item.id === 'g-blessed-rat' ||
                      item.id === 'g-blessed-rat-ruhuna-poster'
                        ? 'object-top'
                        : 'object-center'
                    } transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-[#030407]/20 to-transparent opacity-80 group-hover:opacity-65 transition-opacity" />

                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest backdrop-blur-md ${
                        item.category === 'gamefest'
                          ? 'bg-[#D4FF24] text-[#030407] font-bold'
                          : 'bg-[#030407]/80 border border-[#1558C9]/55 text-[#94BEFF]'
                      }`}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#D4FF24] text-[#030407] flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#D4FF24] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#9BB0D4] mt-1 leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};
