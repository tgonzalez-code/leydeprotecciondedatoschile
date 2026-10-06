import React, { useState } from 'react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenAiChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const navLinks: { id: PageId; label: string; badge?: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'ley-21719', label: 'La Ley 21.719' },
    { id: 'agente-rat', label: 'Agente RAT', badge: '3 min' },
    { id: 'derechos-arcop', label: 'Derechos ARCOP', badge: '2d SLA' },
    { id: 'multas-utm', label: 'Multas UTM' },
    { id: 'test-cumplimiento', label: 'Test Diagnóstico' },
    { id: 'casos-pymes', label: 'Casos Pymes' },
    { id: 'guias-recursos', label: 'Guías & Recursos' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      
      {/* Top Regulatory Notification Bar */}
      <div className="bg-zinc-950 text-white px-4 py-1.5 text-[11px] font-mono flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></span>
          <span className="font-bold text-orange-400">LEY 21.719 EN CHILE:</span>
          <span className="hidden sm:inline text-zinc-300">Normativa de protección de datos personales. Fiscaliza la APDP.</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400 text-[10px]">
          <span>Multas hasta 20.000 UTM</span>
          <span className="text-zinc-700" aria-hidden="true">|</span>
          <button 
            onClick={() => handleNavClick('agente-rat')} 
            className="text-orange-400 font-bold hover:underline"
          >
            Art. 14 ter: RAT (3 min)
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
                  CHILE
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono tracking-tight">
                Portal Oficial Ley 21.719 & Agente RAT
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navegación principal" className="hidden xl:flex items-center gap-1 font-mono text-xs font-semibold text-zinc-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-orange-500 text-white font-bold shadow-sm shadow-orange-500/20'
                      : 'hover:text-zinc-950 hover:bg-zinc-100 text-zinc-700'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && !isActive && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 border border-orange-200">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAiChat}
              className="hidden sm:inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 font-mono text-xs font-bold px-3 py-2.5 rounded-xl transition-all min-h-[44px]"
              aria-label="Abrir asistente de inteligencia artificial sobre Ley 21.719"
            >
              <span className="material-symbols-outlined text-base text-orange-500" aria-hidden="true">smart_toy</span>
              <span>Consultas IA</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('agente-rat')}
              className={`inline-flex items-center gap-2 font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg transition-all min-h-[44px] ${
                currentPage === 'agente-rat'
                  ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-zinc-950/20'
                  : 'bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-orange-500/25'
              }`}
            >
              <span>{currentPage === 'agente-rat' ? 'En Agente RAT' : 'Generar RAT'}</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </button>

            {/* Mobile Hamburger Button with minimum 48x48px target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-12 h-12 flex items-center justify-center text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-nav" aria-label="Navegación móvil" className="xl:hidden py-4 border-t border-zinc-200 space-y-1.5 bg-white font-mono text-xs">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left p-3 rounded-xl font-bold min-h-[48px] flex items-center justify-between ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'hover:bg-zinc-100 text-zinc-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-900'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiChat();
              }}
              className="w-full text-left p-3.5 rounded-xl bg-zinc-950 text-white font-bold min-h-[48px] flex items-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-orange-400 text-base" aria-hidden="true">smart_toy</span>
              <span>Abrir Asistente Legal IA</span>
            </button>
          </nav>
        )}

      </div>
    </header>
  );
};

export default Navbar;
