import React from 'react';

interface NavbarProps {
  onOpenAiChat: () => void;
  onScrollTo: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAiChat, onScrollTo }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      {/* Top micro status bar */}
      <div className="bg-zinc-950 text-white px-4 py-1.5 text-[11px] font-mono flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="font-bold text-orange-400">LEY 21.719 EN VIGENCIA:</span>
          <span className="hidden sm:inline text-zinc-300">Obligatoria para toda empresa en Chile. Fiscaliza la APDP.</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400 text-[10px]">
          <span>Multas: hasta 20.000 UTM</span>
          <span className="text-zinc-700">|</span>
          <span className="text-orange-400 font-bold">Tramo 1: RAT Art. 14 ter</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo brand */}
          <div 
            onClick={() => onScrollTo('top')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl font-bold">shield</span>
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
                Agente de IA para el Registro de Actividades de Tratamiento (RAT)
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs font-semibold text-zinc-600">
            <button
              onClick={() => onScrollTo('agente-rat')}
              className="px-3 py-1.5 rounded-lg hover:text-zinc-950 hover:bg-zinc-100 transition-colors flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Agente RAT (3 min)
            </button>
            <button
              onClick={() => onScrollTo('multas-utm')}
              className="px-3 py-1.5 rounded-lg hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              Simulador Multas UTM
            </button>
            <button
              onClick={() => onScrollTo('derechos-arco')}
              className="px-3 py-1.5 rounded-lg hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              SLAs ARCO+ (2 días)
            </button>
            <button
              onClick={() => onScrollTo('casos')}
              className="px-3 py-1.5 rounded-lg hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              Casos Pymes
            </button>
            <button
              onClick={() => onScrollTo('guia-legal')}
              className="px-3 py-1.5 rounded-lg hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              Artículos Ley
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAiChat}
              className="hidden sm:inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 font-mono text-xs font-bold px-3 py-2 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-base text-orange-500">smart_toy</span>
              <span>Asistente Legal</span>
            </button>

            <button
              onClick={() => onScrollTo('agente-rat')}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/50"
            >
              <span>Generar RAT Gratis</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
