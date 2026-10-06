import React from 'react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAiChat: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenAiChat }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Chile Flag Ribbon */}
      <div className="h-1 chile-flag-strip w-full"></div>
      
      {/* Micro-bar with regulatory facts */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-1 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Ley 21.719 en Vigencia:
          </span>
          <span className="hidden sm:inline">Exigible a 100% de empresas en Chile. Fiscaliza la APDP.</span>
          <span className="bg-emerald-50 text-emerald-700 font-mono px-1.5 py-0.2 rounded border border-emerald-200 text-[10px] font-medium">
            Beneficio Pyme Ley 20.416
          </span>
        </div>
        
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
          <span>Multas: 5.000 a 20.000 UTM</span>
          <span className="text-slate-300">|</span>
          <span className="text-blue-700 font-semibold">Art. 14 ter: RAT Obligatorio</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo Brand */}
          <div 
            onClick={() => onSelectTab('inicio')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-lg">shield</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                  leydedatospersonaleschile<span className="text-blue-700">.cl</span>
                </span>
                <span className="text-[9px] bg-slate-100 text-slate-700 border border-slate-300 px-1 py-0.2 rounded font-mono font-bold">
                  CL
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono tracking-tight leading-none">
                Agente IA • Registro RAT (Art. 14 ter)
              </p>
            </div>
          </div>

          {/* Nav Tabs Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectTab('inicio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'inicio'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Panel General
            </button>
            <button
              onClick={() => onSelectTab('agente-rat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'agente-rat'
                  ? 'bg-white text-blue-900 shadow-sm border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Agente RAT (Tramo 1)
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1 py-0.2 rounded font-mono font-bold">
                3 min
              </span>
            </button>
            <button
              onClick={() => onSelectTab('calculadora-utm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'calculadora-utm'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Simulador Multas UTM
            </button>
            <button
              onClick={() => onSelectTab('gestion-arco')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'gestion-arco'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Gestor ARCO+ (SLAs)
            </button>
            <button
              onClick={() => onSelectTab('guia-ley')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'guia-ley'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Compendio Artículos
            </button>
          </nav>

          {/* Right Action: Asistente IA CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiChat}
              className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all hover:shadow"
            >
              <span className="material-symbols-outlined text-sm text-amber-300">
                smart_toy
              </span>
              <span>Asistente IA</span>
              <span className="bg-blue-800 text-[10px] font-mono px-1 py-0.2 rounded">
                Ley 21.719
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center justify-between gap-1 overflow-x-auto py-2 border-t border-slate-200 text-xs scrollbar-none">
          <button
            onClick={() => onSelectTab('inicio')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              currentTab === 'inicio' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            General
          </button>
          <button
            onClick={() => onSelectTab('agente-rat')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium flex items-center gap-1 ${
              currentTab === 'agente-rat' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-emerald-500 font-bold">●</span>
            Agente RAT
          </button>
          <button
            onClick={() => onSelectTab('calculadora-utm')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              currentTab === 'calculadora-utm' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Multas UTM
          </button>
          <button
            onClick={() => onSelectTab('gestion-arco')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              currentTab === 'gestion-arco' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ARCO+
          </button>
          <button
            onClick={() => onSelectTab('guia-ley')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              currentTab === 'guia-ley' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Artículos
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
