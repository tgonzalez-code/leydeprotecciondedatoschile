import React from 'react';

interface FloatingNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onAiClick: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ currentTab, onSelectTab, onAiClick }) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-fit pointer-events-auto">
      <nav className="flex items-center gap-1 p-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-300 shadow-lg ring-1 ring-slate-900/5">
        
        <button
          onClick={() => onSelectTab('inicio')}
          title="Panel General"
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
            currentTab === 'inicio'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span className="material-symbols-outlined text-base">home</span>
        </button>

        <button
          onClick={() => onSelectTab('agente-rat')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentTab === 'agente-rat'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Agente RAT</span>
          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-mono px-1 rounded-full font-bold">
            3 min
          </span>
        </button>

        <button
          onClick={() => onSelectTab('calculadora-utm')}
          className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentTab === 'calculadora-utm'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Multas UTM</span>
        </button>

        <button
          onClick={() => onSelectTab('gestion-arco')}
          className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentTab === 'gestion-arco'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>ARCO+</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-300 mx-0.5"></div>

        <button
          onClick={onAiClick}
          className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-xs text-amber-300">smart_toy</span>
          <span>Asistente IA</span>
        </button>

      </nav>
    </div>
  );
};

export default FloatingNav;
