import React from 'react';

interface FloatingNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onAiClick: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ currentTab, onSelectTab, onAiClick }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-fit pointer-events-auto">
      <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#08132e]/90 backdrop-blur-2xl border border-blue-600/40 shadow-2xl ring-1 ring-blue-500/20">
        
        <button
          onClick={() => onSelectTab('inicio')}
          title="Inicio"
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            currentTab === 'inicio'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/50'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-lg">home</span>
        </button>

        <button
          onClick={() => onSelectTab('agente-rat')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            currentTab === 'agente-rat'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/50'
              : 'text-slate-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-sm text-emerald-400">psychology</span>
          <span>Agente RAT</span>
          <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1 rounded-full border border-emerald-500/30">
            3 min
          </span>
        </button>

        <button
          onClick={() => onSelectTab('calculadora-utm')}
          className={`hidden sm:flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
            currentTab === 'calculadora-utm'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/50'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-sm text-amber-400">calculate</span>
          <span>Multas UTM</span>
        </button>

        <button
          onClick={() => onSelectTab('gestion-arco')}
          className={`hidden md:flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
            currentTab === 'gestion-arco'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/50'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-sm text-blue-400">timer</span>
          <span>ARCO+</span>
        </button>

        <div className="h-6 w-[1px] bg-blue-900/60 mx-1"></div>

        <button
          onClick={onAiClick}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md shadow-blue-600/40"
        >
          <span className="material-symbols-outlined text-sm text-amber-300 animate-pulse">smart_toy</span>
          <span>Asistente IA</span>
        </button>

      </nav>
    </div>
  );
};

export default FloatingNav;
