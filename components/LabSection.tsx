import React, { useState } from 'react';
import { CASOS_PRACTICOS_PYMES } from '../content/cases';

interface LabSectionProps {
  onGoToRat: () => void;
  onOpenAiChat: () => void;
}

const LabSection: React.FC<LabSectionProps> = ({ onGoToRat, onOpenAiChat }) => {
  const [casoActivo, setCasoActivo] = useState(0);
  const casos = CASOS_PRACTICOS_PYMES;

  return (
    <section id="casos" className="py-14 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span>CASOS PRÁCTICOS EN PYMES CHILENAS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Riesgos Reales del Día a Día
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Aprende cómo opera la fiscalización de la APDP en operaciones cotidianas y cómo el RAT te protege.
            </p>
          </div>

          <button
            onClick={onOpenAiChat}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 border-2 border-zinc-300 text-zinc-900 font-mono font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-orange-500 text-base">smart_toy</span>
            <span>Consultar mi caso particular</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {casos.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCasoActivo(i)}
                className={`w-full p-5 rounded-2xl text-left border-2 transition-all ${
                  casoActivo === i
                    ? 'bg-white border-orange-500 shadow-lg shadow-orange-500/10'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                  <span className={`font-bold ${casoActivo === i ? 'text-orange-600' : 'text-zinc-400'}`}>CASO #{i + 1}</span>
                  <span className="text-zinc-500">{c.rubro}</span>
                </div>
                <strong className={`block text-sm font-display font-bold ${casoActivo === i ? 'text-zinc-950' : 'text-zinc-700'}`}>
                  {c.titulo}
                </strong>
              </button>
            ))}
          </div>

          {/* Right Active Case Box */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-zinc-900 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-display font-black text-lg text-zinc-950">
                {casos[casoActivo].titulo}
              </h3>
              <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                {casos[casoActivo].rubro}
              </span>
            </div>

            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs">
              <span className="font-bold text-zinc-900 block mb-1 font-mono uppercase text-[10px]">1. Situación Operativa:</span>
              <p className="text-zinc-700 leading-relaxed font-normal">{casos[casoActivo].situacion}</p>
            </div>

            <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-xs">
              <span className="font-bold text-red-900 block mb-1 font-mono uppercase text-[10px] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">warning</span>
                2. Riesgo ante la APDP (Ley 21.719):
              </span>
              <p className="text-red-800 leading-relaxed font-medium">{casos[casoActivo].riesgo}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-xs">
              <span className="font-bold text-orange-900 block mb-1 font-mono uppercase text-[10px] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-orange-600">verified</span>
                3. Solución con el Agente RAT:
              </span>
              <p className="text-zinc-900 leading-relaxed font-medium">{casos[casoActivo].solucionRAT}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onGoToRat}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all"
              >
                <span>Generar mi RAT para este caso</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LabSection;
