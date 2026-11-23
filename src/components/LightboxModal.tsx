import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';

export interface LightboxSlide {
  src: string;
  title: string;
  caption: string;
  categoryLabel?: string;
  externalUrl?: string;
}

interface LightboxModalProps {
  slides: LightboxSlide[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  slides,
  index,
  onClose,
  onNavigate,
}) => {
  const current = slides[index];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && slides.length > 1) {
        onNavigate((index + 1) % slides.length);
      }
      if (e.key === 'ArrowLeft' && slides.length > 1) {
        onNavigate((index - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, slides.length, onClose, onNavigate]);

  if (!current) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#030407]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-[#0A1328] border border-[#1558C9]/60 flex items-center justify-center text-white hover:border-[#D4FF24] hover:text-[#D4FF24] transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + slides.length) % slides.length);
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#0A1328]/90 border border-[#1558C9]/50 flex items-center justify-center text-white hover:border-[#D4FF24] hover:text-[#D4FF24]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % slides.length);
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#0A1328]/90 border border-[#1558C9]/50 flex items-center justify-center text-white hover:border-[#D4FF24] hover:text-[#D4FF24]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full flex flex-col items-center gap-4"
      >
        <div className="relative rounded-2xl overflow-hidden border border-[#1558C9]/55 bg-[#060B17] shadow-[0_25px_70px_rgba(0,0,0,0.8)] max-h-[75vh] flex items-center justify-center">
          <img
            src={current.src}
            alt={current.title}
            className="max-h-[74vh] max-w-full w-auto object-contain"
          />
        </div>

        <div className="w-full max-w-3xl glass-panel rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              {current.categoryLabel && (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4FF24]">
                  {current.categoryLabel}
                </span>
              )}
              {slides.length > 1 && (
                <span className="font-mono text-[10px] text-[#7E95C0]">
                  {index + 1} / {slides.length}
                </span>
              )}
            </div>
            <h4 className="font-display font-bold text-lg text-white">{current.title}</h4>
            <p className="text-xs sm:text-sm text-[#A6B8DA]">{current.caption}</p>
          </div>
          {current.externalUrl && (
            <a
              href={current.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4FF24] text-[#030407] font-mono text-xs font-bold uppercase tracking-wider shrink-0 hover:bg-[#E2FF66]"
            >
              Open Link
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
