import React from 'react';
import { PageId } from '../types';

interface FinalCtaSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onNavigate, onOpenAiChat }) => {
  return (
    <section className="py-20 bg-zinc-950 text-white relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <span className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold px-3.5 py-1 rounded-full uppercase tracking-widest">
          CUMPLIMIENTO SIN BUROCRACIA
        </span>

        <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white leading-tight">
          Empieza a preparar tu empresa hoy.
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Conoce tu nivel de preparación en solo 3 minutos y descubre cuáles deberían ser tus próximos pasos para proteger tus datos y tu patrimonio.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('diagnostico');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                onNavigate('test-cumplimiento');
              }
            }}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Evaluar mi empresa →</span>
          </button>

          <button
            type="button"
            onClick={onOpenAiChat}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono font-bold text-xs sm:text-sm px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm text-orange-400">smart_toy</span>
            <span>Hacer una consulta rápida</span>
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
            <span>Sin instalación de software</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
            <span>Diseñado para empresas chilenas</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
            <span>100% Confidencial</span>
          </span>
        </div>

      </div>
    </section>
  );
};

export default FinalCtaSection;
