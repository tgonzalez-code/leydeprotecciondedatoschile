import React from 'react';

const TrustBar: React.FC = () => {
  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50/70 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
              ESTÁNDAR DE PRIVACIDAD & LEGALTECH CHILE
            </span>
            <p className="text-xs text-zinc-600 font-medium mt-0.5">
              Metodología adaptada a la realidad operativa de PYMEs y empresas en crecimiento
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full md:w-auto">
            <div className="flex items-center gap-2 text-zinc-800">
              <span className="material-symbols-outlined text-orange-500 text-lg">verified</span>
              <span className="text-xs font-semibold">Ley Nº 21.719</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-800">
              <span className="material-symbols-outlined text-orange-500 text-lg">speed</span>
              <span className="text-xs font-semibold">Diagnóstico en 3 min</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-800">
              <span className="material-symbols-outlined text-orange-500 text-lg">lock</span>
              <span className="text-xs font-semibold">100% Confidencial</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-800">
              <span className="material-symbols-outlined text-orange-500 text-lg">business_center</span>
              <span className="text-xs font-semibold">Enfoque de Negocio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
