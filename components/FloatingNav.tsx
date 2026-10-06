
import React from 'react';

interface FloatingNavProps {
  onAiClick: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ onAiClick }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-fit pointer-events-auto">
      <nav className="flex items-center gap-2 p-2 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl ring-1 ring-primary/20 scale-90 sm:scale-100">
        <a 
          href="#" 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors shadow-[0_0_15px_rgba(188,6,249,0.5)]"
        >
          <span className="material-symbols-outlined">home</span>
        </a>
        
        <div className="flex items-center px-6 gap-8">
          <a href="#servicios" className="text-sm font-bold uppercase tracking-widest text-zinc-300 hover:text-primary transition-colors">Servicios</a>
          <a href="#lab" className="text-sm font-bold uppercase tracking-widest text-zinc-300 hover:text-primary transition-colors">Lab</a>
          <a href="#ventas" className="text-sm font-bold uppercase tracking-widest text-zinc-300 hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); onAiClick(); }}>AI Agent</a>
        </div>
        
        <button className="bg-acid-green text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(191,255,0,0.3)]">
          Connect
        </button>
      </nav>
    </div>
  );
};

export default FloatingNav;
