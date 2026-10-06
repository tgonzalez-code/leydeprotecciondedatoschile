import React, { useState } from 'react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenAiChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId, anchorId?: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== page) {
      onNavigate(page);
    }
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleScrollTo = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'inicio') {
      onNavigate('inicio');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(anchorId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      
      {/* Top Banner */}
      <div className="bg-zinc-950 text-white px-4 py-1 text-[11px] font-mono flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></span>
          <span className="font-bold text-orange-400">DATA PRIVACY LEGALTECH:</span>
          <span className="hidden sm:inline text-zinc-300">Cumplimiento simple y ágil de la Ley 21.719 en Chile.</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400 text-[10px]">
          <button 
            onClick={() => handleScrollTo('diagnostico')} 
            className="text-orange-400 font-bold hover:underline"
          >
            Diagnóstico en 3 minutos →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo brand */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('inicio')}
            aria-label="Ir al inicio de leydedatospersonaleschile.cl"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl font-bold" aria-hidden="true">shield</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg sm:text-xl tracking-tight text-zinc-950">
                  leydedatospersonaleschile<span className="text-orange-500">.cl</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200">
                  LEGALTECH
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono tracking-tight">
                Data Privacy Compliance & IA
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1 font-mono text-xs font-semibold text-zinc-600">
            <button
              type="button"
              onClick={() => handleScrollTo('como-funciona')}
              className="px-3 py-2 rounded-xl hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              ¿Cómo funciona?
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo('servicios')}
              className="px-3 py-2 rounded-xl hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              Servicios
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo('rat-metodologia')}
              className="px-3 py-2 rounded-xl hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              El RAT
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('ley-21719')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentPage === 'ley-21719' ? 'text-orange-600 font-bold bg-orange-50' : 'hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              Ley 21.719
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('guias-recursos')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentPage === 'guias-recursos' ? 'text-orange-600 font-bold bg-orange-50' : 'hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              Recursos
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo('faq')}
              className="px-3 py-2 rounded-xl hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              Preguntas frecuentes
            </button>
          </nav>

          {/* CTA & AI Assistant */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenAiChat}
              className="w-9 h-9 rounded-xl border border-zinc-200 hover:border-zinc-300 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-colors"
              title="Abrir Asistente Legal con IA"
              aria-label="Abrir Asistente Legal con IA"
            >
              <span className="material-symbols-outlined text-base text-orange-500">smart_toy</span>
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo('diagnostico')}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs font-mono px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all"
            >
              <span>Evaluar mi empresa</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => handleScrollTo('diagnostico')}
              className="bg-orange-500 text-white font-bold text-xs font-mono px-3 py-2 rounded-lg"
            >
              Evaluar
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <button
            type="button"
            onClick={() => handleScrollTo('como-funciona')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold text-zinc-800 hover:bg-zinc-100 flex items-center justify-between"
          >
            <span>¿Cómo funciona?</span>
            <span className="material-symbols-outlined text-sm text-zinc-400">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollTo('servicios')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold text-zinc-800 hover:bg-zinc-100 flex items-center justify-between"
          >
            <span>Servicios</span>
            <span className="material-symbols-outlined text-sm text-zinc-400">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollTo('rat-metodologia')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold text-zinc-800 hover:bg-zinc-100 flex items-center justify-between"
          >
            <span>El RAT (Registro de Datos)</span>
            <span className="material-symbols-outlined text-sm text-zinc-400">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('ley-21719')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold text-zinc-800 hover:bg-zinc-100 flex items-center justify-between"
          >
            <span>Ley 21.719</span>
            <span className="material-symbols-outlined text-sm text-zinc-400">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('guias-recursos')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold text-zinc-800 hover:bg-zinc-100 flex items-center justify-between"
          >
            <span>Recursos & Guías</span>
            <span className="material-symbols-outlined text-sm text-zinc-400">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollTo('faq')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold text-zinc-800 hover:bg-zinc-100 flex items-center justify-between"
          >
            <span>Preguntas frecuentes</span>
            <span className="material-symbols-outlined text-sm text-zinc-400">arrow_forward</span>
          </button>

          <div className="pt-3 border-t border-zinc-100 space-y-2">
            <button
              type="button"
              onClick={() => handleScrollTo('diagnostico')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Evaluar mi empresa (3 min)</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiChat();
              }}
              className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm text-orange-500">smart_toy</span>
              <span>Consultar Asistente Legal</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
