import React from 'react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAiChat: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenAiChat }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#070d1e]/90 backdrop-blur-md border-b border-blue-900/40">
      {/* Top micro ribbon */}
      <div className="h-1 chile-flag-strip w-full"></div>
      
      {/* Informative alert bar */}
      <div className="bg-gradient-to-r from-blue-950 via-[#0a1b44] to-blue-950 px-4 py-1.5 border-b border-blue-900/30 text-xs text-blue-200/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white">Ley 21.719 en vigencia:</span>
          <span>Obligatorio para toda Pyme en Chile. Fiscalizado por la APDP.</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-blue-300">
          <span>Multas hasta 20.000 UTM</span>
          <span className="text-blue-600">|</span>
          <span className="text-emerald-400 font-semibold">Beneficio Pyme: Ley 20.416</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => onSelectTab('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 p-0.5 shadow-lg shadow-blue-900/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#091228] rounded-[10px] flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-400 text-2xl group-hover:scale-110 transition-transform">
                  shield_with_heart
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  leydedatospersonaleschile<span className="text-blue-400">.cl</span>
                </span>
                <span className="text-[10px] bg-blue-900/80 text-blue-200 border border-blue-700/50 px-1.5 py-0.5 rounded font-mono font-bold">
                  CL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide">
                Portal de Cumplimiento & Agente RAT (Art. 14 ter)
              </p>
            </div>
          </div>

          {/* Nav Tabs Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0b1530] p-1.5 rounded-2xl border border-blue-900/50">
            <button
              onClick={() => onSelectTab('inicio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'inicio'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Inicio & Diagnóstico
            </button>
            <button
              onClick={() => onSelectTab('agente-rat')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'agente-rat'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-sm text-emerald-400">psychology</span>
              Agente RAT (Tramo 1)
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono border border-emerald-500/30">
                3 min
              </span>
            </button>
            <button
              onClick={() => onSelectTab('calculadora-utm')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'calculadora-utm'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Simulador Multas UTM
            </button>
            <button
              onClick={() => onSelectTab('gestion-arco')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'gestion-arco'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Gestor ARCO+ (SLAs)
            </button>
            <button
              onClick={() => onSelectTab('guia-ley')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'guia-ley'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Guía Ley 21.719
            </button>
          </nav>

          {/* Right Action: Asistente IA CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAiChat}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-base animate-pulse text-amber-300">
                smart_toy
              </span>
              <span>Asistente Legal IA</span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center justify-between gap-1 overflow-x-auto py-2 border-t border-blue-900/30 text-xs scrollbar-none">
          <button
            onClick={() => onSelectTab('inicio')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentTab === 'inicio' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-blue-900/40'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onSelectTab('agente-rat')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1 ${
              currentTab === 'agente-rat' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-blue-900/40'
            }`}
          >
            <span className="text-emerald-400 font-bold">●</span>
            Agente RAT
          </button>
          <button
            onClick={() => onSelectTab('calculadora-utm')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentTab === 'calculadora-utm' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-blue-900/40'
            }`}
          >
            Multas UTM
          </button>
          <button
            onClick={() => onSelectTab('gestion-arco')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentTab === 'gestion-arco' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-blue-900/40'
            }`}
          >
            ARCO+
          </button>
          <button
            onClick={() => onSelectTab('guia-ley')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentTab === 'guia-ley' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-blue-900/40'
            }`}
          >
            Ley 21.719
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
