import React from 'react';

interface FloatingNavProps {
  onScrollTo: (id: string) => void;
  onAiClick: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ onScrollTo, onAiClick }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-fit pointer-events-auto">
      <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-zinc-900 shadow-2xl">
        
        <button
          onClick={() => onScrollTo('top')}
          title="Subir"
          className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_upward</span>
        </button>

        <button
          onClick={() => onScrollTo('agente-rat')}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md shadow-orange-500/25"
        >
          <span className="material-symbols-outlined text-sm">psychology</span>
          <span>Agente RAT</span>
          <span className="bg-white/20 text-white text-[9px] font-mono px-1 rounded-full">3 min</span>
        </button>

        <button
          onClick={() => onScrollTo('multas-utm')}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-zinc-800 hover:bg-zinc-100 transition-colors"
        >
          <span>Multas UTM</span>
        </button>

        <button
          onClick={() => onScrollTo('derechos-arco')}
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-zinc-800 hover:bg-zinc-100 transition-colors"
        >
          <span>ARCO+</span>
        </button>

        <div className="h-4 w-[1px] bg-zinc-300 mx-0.5"></div>

        <button
          onClick={onAiClick}
          className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all"
        >
          <span className="material-symbols-outlined text-xs text-orange-400">smart_toy</span>
          <span>Asistente IA</span>
        </button>

      </nav>
    </div>
  );
};

export default FloatingNav;
