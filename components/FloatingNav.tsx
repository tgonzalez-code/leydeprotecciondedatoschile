import React from 'react';
import { PageId } from '../types';

interface FloatingNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onAiClick: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ currentPage, onNavigate, onAiClick }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-fit pointer-events-auto">
      <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-zinc-900 shadow-2xl">
        
        <button
          onClick={() => onNavigate('inicio')}
          title="Ir a Inicio"
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            currentPage === 'inicio' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
          }`}
        >
          <span className="material-symbols-outlined text-base">home</span>
        </button>

        <button
          onClick={() => onNavigate('agente-rat')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentPage === 'agente-rat'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-md shadow-orange-500/25'
          }`}
        >
          <span className="material-symbols-outlined text-sm">psychology</span>
          <span>Agente RAT</span>
          <span className="bg-white/20 text-white text-[9px] font-mono px-1 rounded-full">3 min</span>
        </button>

        <button
          onClick={() => onNavigate('test-cumplimiento')}
          className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-colors ${
            currentPage === 'test-cumplimiento' ? 'bg-orange-100 text-orange-950' : 'text-orange-600 hover:bg-orange-50'
          }`}
        >
          <span>Test</span>
        </button>

        <button
          onClick={() => onNavigate('ley-21719')}
          className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-colors ${
            currentPage === 'ley-21719' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-800 hover:bg-zinc-100'
          }`}
        >
          <span>Vigencia</span>
        </button>

        <button
          onClick={() => onNavigate('multas-utm')}
          className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-colors ${
            currentPage === 'multas-utm' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-800 hover:bg-zinc-100'
          }`}
        >
          <span>Multas UTM</span>
        </button>

        <button
          onClick={() => onNavigate('derechos-arcop')}
          className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-colors ${
            currentPage === 'derechos-arcop' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-800 hover:bg-zinc-100'
          }`}
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
