import React, { useState, useEffect } from 'react';
import { POSTS_ACTUALIDAD_LEY, PostLey } from '../data/postsData';
import { PageId } from '../types';

interface InformativeCarouselProps {
  onNavigate: (page: PageId) => void;
}

const InformativeCarousel: React.FC<InformativeCarouselProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activePostModal, setActivePostModal] = useState<PostLey | null>(null);

  const posts = POSTS_ACTUALIDAD_LEY;
  const currentPost = posts[currentIndex];

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [isPaused, posts.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  return (
    <div 
      className="bg-white rounded-3xl border-2 border-zinc-950 p-6 sm:p-8 shadow-xl relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Carrusel informativo de actualidad sobre la Ley 21.719"
    >
      {/* Top Header: Section Tag & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4 mb-6">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></span>
          <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
            ACTUALIDAD REGULATORIA & GUÍAS LEY 21.719
          </span>
          <span className="text-zinc-300 hidden sm:inline">•</span>
          <span className="text-xs font-mono text-zinc-500">
            Slide {String(currentIndex + 1).padStart(2, '0')} de {String(posts.length).padStart(2, '0')}
          </span>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="text-[11px] font-mono text-zinc-500 hover:text-zinc-950 px-2 py-1 rounded border border-zinc-200 hover:bg-zinc-100 transition-colors flex items-center gap-1"
            title={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          >
            <span className="material-symbols-outlined text-sm">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
            <span>{isPaused ? 'Pausado' : 'Auto'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-900 flex items-center justify-center transition-colors border border-zinc-300"
            aria-label="Artículo anterior"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white flex items-center justify-center transition-colors shadow-md shadow-orange-500/25"
            aria-label="Artículo siguiente"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Main Slide Card Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-opacity duration-300">
        
        {/* Left Column: Title, Bajada & Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono font-bold bg-orange-100 text-orange-950 px-2.5 py-0.5 rounded-full border border-orange-200">
              {currentPost.categoria}
            </span>
            <span className="text-[11px] font-mono font-bold bg-zinc-100 text-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200">
              {currentPost.tagBadge}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              {currentPost.fecha} • {currentPost.lecturaMin}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-zinc-950 tracking-tight leading-snug">
            {currentPost.titulo}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            {currentPost.bajada}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActivePostModal(currentPost)}
              className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-orange-400 text-base" aria-hidden="true">article</span>
              <span>Leer artículo completo</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate(currentPost.enlaceAccionDestino)}
              className="inline-flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-950 border border-orange-300 font-mono font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <span>{currentPost.enlaceAccionTexto}</span>
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </button>
          </div>
        </div>

        {/* Right Column: Key Takeaway Box */}
        <div className="lg:col-span-5 bg-zinc-50 p-5 sm:p-6 rounded-2xl border-2 border-zinc-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-700 border-b border-zinc-200 pb-2">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-orange-500 text-base">check_circle</span>
              <span>PUNTOS CLAVE PARA LA PYME</span>
            </span>
            <span className="text-orange-600">Normativa</span>
          </div>

          <ul className="space-y-2.5 text-xs text-zinc-700">
            {currentPost.resumenPuntos.map((punto, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-orange-600 font-bold shrink-0 font-mono mt-0.5">•</span>
                <span>{punto}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Artículos: {currentPost.articulosRelacionados.join(', ')}</span>
            <button
              onClick={() => onNavigate('guias-recursos')}
              className="text-orange-600 font-bold hover:underline"
            >
              Ver todos los posts →
            </button>
          </div>
        </div>

      </div>

      {/* Slide Indicator Dots */}
      <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          {posts.map((post, idx) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-8 bg-orange-500'
                  : 'w-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
              aria-label={`Ir al slide ${idx + 1}: ${post.titulo}`}
              title={post.titulo}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('guias-recursos')}
          className="text-xs font-mono font-bold text-zinc-600 hover:text-orange-600 transition-colors flex items-center gap-1"
        >
          <span>Biblioteca de Guías y Contenidos de la Ley</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Full Article Reader Modal */}
      {activePostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
          <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto text-xs sm:text-sm">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                  {activePostModal.categoria}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activePostModal.fecha} • {activePostModal.lecturaMin}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePostModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 flex items-center justify-center text-sm font-bold"
                aria-label="Cerrar artículo"
              >
                ✕
              </button>
            </div>

            {/* Modal Title */}
            <h3 className="text-xl sm:text-2xl font-display font-black text-zinc-950 mb-2 leading-snug">
              {activePostModal.titulo}
            </h3>
            <p className="text-xs text-zinc-500 font-mono mb-4">
              Por {activePostModal.autor} • Artículos vinculados: {activePostModal.articulosRelacionados.join(', ')}
            </p>

            {/* Modal Article Body */}
            <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4 whitespace-pre-line font-normal border-t border-zinc-100 pt-4">
              {activePostModal.contenidoCompleto}
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-8 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const target = activePostModal.enlaceAccionDestino;
                  setActivePostModal(null);
                  onNavigate(target);
                }}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all"
              >
                <span>{activePostModal.enlaceAccionTexto}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePostModal(null)}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-900 px-3 py-2 text-center"
              >
                Cerrar lectura
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default InformativeCarousel;
