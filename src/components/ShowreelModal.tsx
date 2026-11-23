import React, { useState } from 'react';
import { Film, X } from 'lucide-react';
import { GAMEPLAY_VIDEOS } from '../data/portfolioData';

interface ShowreelModalProps {
  open: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ open, onClose }) => {
  const [activeId, setActiveId] = useState(GAMEPLAY_VIDEOS[0].id);
  if (!open) return null;

  const active = GAMEPLAY_VIDEOS.find((v) => v.id === activeId) || GAMEPLAY_VIDEOS[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#030407]/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-[#1558C9]/65"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Film className="w-4 h-4 text-[#D4FF24]" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-white">
              UNITY GAMEPLAY THEATER
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close showreel"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:border-[#D4FF24] hover:text-[#D4FF24]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="aspect-video bg-black">
          <iframe
            key={active.youtubeId}
            src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1`}
            title={active.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-lg text-white">{active.title}</h4>
            <p className="text-xs sm:text-sm text-[#9FB2D6] mt-0.5">{active.description}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            {GAMEPLAY_VIDEOS.map((vid) => (
              <button
                key={vid.id}
                type="button"
                onClick={() => setActiveId(vid.id)}
                className={`px-3.5 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all ${
                  vid.id === active.id
                    ? 'bg-[#D4FF24] text-[#030407] font-bold'
                    : 'bg-[#091329] border border-[#1558C9]/45 text-[#B4C6E6] hover:text-white'
                }`}
              >
                {vid.id.includes('escape') ? 'Escape Room' : 'Drakoz'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
