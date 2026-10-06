import React from 'react';

interface StatsProps {
  onGoToRat: () => void;
  onGoToCalculator: () => void;
}

const Stats: React.FC<StatsProps> = ({ onGoToRat, onGoToCalculator }) => {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1 */}
          <div 
            onClick={onGoToCalculator}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Sanción Máxima</span>
              <span className="material-symbols-outlined text-slate-400 text-sm group-hover:text-red-700">gavel</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              20.000 <span className="text-sm font-sans text-slate-500">UTM</span>
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Hasta ~$1.320.000.000 CLP o 4% de ventas en reincidencia.
            </p>
            <span className="text-[10px] text-red-700 font-semibold font-mono mt-2 inline-block">
              Simular cálculo →
            </span>
          </div>

          {/* Stat 2 */}
          <div 
            onClick={onGoToRat}
            className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-blue-900 font-bold uppercase">Agente IA RAT</span>
              <span className="material-symbols-outlined text-blue-900 text-sm">bolt</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-950 font-mono tracking-tight">
              3 <span className="text-sm font-sans text-blue-800">Minutos</span>
            </p>
            <p className="text-[11px] text-blue-900 mt-0.5">
              Para generar y exportar la Ficha Oficial RAT (Art. 14 ter).
            </p>
            <span className="text-[10px] text-blue-900 font-bold font-mono mt-2 inline-block">
              Iniciar prueba gratuita →
            </span>
          </div>

          {/* Stat 3 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">SLA Bloqueo</span>
              <span className="material-symbols-outlined text-slate-400 text-sm">alarm</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              2 <span className="text-sm font-sans text-slate-500">Días Hábiles</span>
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Plazo más estricto de la ley para congelar datos ante reclamos.
            </p>
            <span className="text-[10px] text-slate-500 font-mono mt-2 inline-block">
              30 días corridos para ARCO+
            </span>
          </div>

          {/* Stat 4 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Alcance General</span>
              <span className="material-symbols-outlined text-slate-400 text-sm">domain</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              100%
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Empresas en Chile que traten datos de personas naturales.
            </p>
            <span className="text-[10px] text-emerald-800 font-semibold font-mono mt-2 inline-block">
              Beneficio Pyme Ley 20.416
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Stats;
