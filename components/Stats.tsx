import React from 'react';

interface StatsProps {
  onGoToRat: () => void;
  onGoToCalculator: () => void;
}

const Stats: React.FC<StatsProps> = ({ onGoToRat, onGoToCalculator }) => {
  return (
    <section className="bg-[#08122c] py-14 px-4 sm:px-6 lg:px-8 border-y border-blue-900/40">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">
            Cifras Clave de la Ley 21.719 en Chile
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Impacto Real en el Ecosistema Empresarial
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            La privacidad ya no es una recomendación opcional: es una exigencia legal vinculante fiscalizada por la APDP.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat 1 */}
          <div 
            onClick={onGoToCalculator}
            className="p-6 rounded-2xl bg-[#0b1633] border border-blue-900/60 hover:border-red-600/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">MULTA TOPE</span>
              <span className="material-symbols-outlined text-red-400 text-lg group-hover:scale-110 transition-transform">gavel</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-red-400 font-mono tracking-tight">
              20.000 <span className="text-lg">UTM</span>
            </p>
            <p className="text-xs text-slate-300 mt-1 font-medium">
              Hasta ~$1.320.000.000 CLP o 4% de ventas anuales en reincidencia.
            </p>
            <span className="text-[11px] text-red-300 mt-3 inline-block font-semibold group-hover:underline">
              Ver simulador UTM →
            </span>
          </div>

          {/* Stat 2 */}
          <div 
            onClick={onGoToRat}
            className="p-6 rounded-2xl bg-[#0e224e] border-2 border-emerald-500/60 hover:border-emerald-400 transition-all cursor-pointer group shadow-lg shadow-emerald-950/40"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-emerald-300 font-bold">AGENTE DE IA</span>
              <span className="material-symbols-outlined text-emerald-400 text-lg group-hover:scale-110 transition-transform">bolt</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              3 <span className="text-lg text-emerald-300">Minutos</span>
            </p>
            <p className="text-xs text-emerald-100 mt-1 font-medium">
              Para generar tu Ficha Oficial RAT (Art. 14 ter) con clasificación automática.
            </p>
            <span className="text-[11px] text-emerald-300 mt-3 inline-block font-bold group-hover:underline">
              Iniciar prueba gratuita →
            </span>
          </div>

          {/* Stat 3 */}
          <div className="p-6 rounded-2xl bg-[#0b1633] border border-blue-900/60 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">SLA CRÍTICO</span>
              <span className="material-symbols-outlined text-amber-400 text-lg">alarm</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
              2 <span className="text-lg">Días</span>
            </p>
            <p className="text-xs text-slate-300 mt-1 font-medium">
              Plazo legal máximo para ejecutar el Bloqueo Temporal de datos ante reclamos.
            </p>
            <span className="text-[11px] text-slate-400 mt-3 inline-block">
              30 días para resto de ARCO+
            </span>
          </div>

          {/* Stat 4 */}
          <div className="p-6 rounded-2xl bg-[#0b1633] border border-blue-900/60 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">ALCANCE LEGAL</span>
              <span className="material-symbols-outlined text-blue-400 text-lg">domain</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-blue-400 font-mono tracking-tight">
              100%
            </p>
            <p className="text-xs text-slate-300 mt-1 font-medium">
              De empresas en Chile obligadas si tratan datos de clientes, empleados o proveedores.
            </p>
            <span className="text-[11px] text-blue-300 mt-3 inline-block font-semibold">
              Estatuto Pyme ampara 1ra falta
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Stats;
