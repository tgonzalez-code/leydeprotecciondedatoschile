import React from 'react';
import { useComplianceAssessment } from '../hooks/useComplianceAssessment';

interface ComplianceChecklistProps {
  onGoToRat: () => void;
}

const ComplianceChecklist: React.FC<ComplianceChecklistProps> = ({ onGoToRat }) => {
  const {
    respuestas,
    toggleRespuesta,
    puntajeTotal,
    diagnostico: diag,
    preguntas,
  } = useComplianceAssessment();

  return (
    <section id="test-cumplimiento" aria-labelledby="heading-checklist" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">fact_check</span>
              <span>TEST INTERACTIVO DE DIAGNÓSTICO</span>
            </div>
            <h2 id="heading-checklist" className="text-2xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
              ¿Está tu empresa lista para la Ley 21.719?
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Evalúa en 60 segundos el nivel de preparación de tu negocio frente a las exigencias que fiscalizará la APDP.
            </p>
          </div>

          {/* Real-time score indicator */}
          <div className="bg-zinc-50 p-4 rounded-2xl border-2 border-zinc-900 flex items-center gap-4 self-start md:self-auto shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">Puntaje Obtenido</span>
              <span className="text-2xl font-display font-black text-zinc-950">{puntajeTotal} / 100</span>
            </div>
            <div className={`px-3 py-1 rounded-lg border font-mono text-xs font-bold ${diag.color}`}>
              {diag.nivel}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-200 h-3 rounded-full overflow-hidden mb-8" role="progressbar" aria-valuenow={puntajeTotal} aria-valuemin={0} aria-valuemax={100}>
          <div 
            className="bg-orange-500 h-full transition-all duration-300"
            style={{ width: `${puntajeTotal}%` }}
          ></div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Questions list */}
          <div className="lg:col-span-8 space-y-3">
            {preguntas.map((item) => {
              const checked = !!respuestas[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleRespuesta(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-start gap-4 ${
                    checked
                      ? 'bg-orange-50/50 border-orange-500 shadow-sm'
                      : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                  }`}
                  role="checkbox"
                  aria-checked={checked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleRespuesta(item.id);
                    }
                  }}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    checked ? 'bg-orange-500 text-white' : 'border-2 border-zinc-400 bg-white'
                  }`}>
                    {checked ? '✓' : ''}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <strong className="text-sm font-display font-bold text-zinc-950">
                        {item.pregunta}
                      </strong>
                      <span className="text-[10px] font-mono font-bold bg-white text-zinc-700 px-2 py-0.5 rounded border border-zinc-300 shrink-0">
                        {item.articulos}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {item.consejo}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action / Diagnosis Box */}
          <div className="lg:col-span-4 bg-zinc-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-orange-400 uppercase">
                DIAGNÓSTICO REGULATORIO
              </span>
              <h3 className="text-xl font-display font-black text-white mt-1">
                {diag.nivel}
              </h3>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                {diag.mensaje}
              </p>
            </div>

            {diag.recomendaciones && (
              <div className="space-y-1.5 pt-3 border-t border-zinc-800">
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">Acciones prioritarias:</span>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {diag.recomendaciones.map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-zinc-800 space-y-3 text-xs">
              <strong className="text-zinc-200 font-mono text-[11px] uppercase block font-bold">
                Paso 1 Obligatorio Recomendado:
              </strong>
              <div className="bg-zinc-900 p-3.5 rounded-xl border border-zinc-800 text-zinc-300">
                <p>
                  Si aún no marcas el <strong>Registro RAT (Art. 14 ter)</strong>, tu empresa no puede acreditar el beneficio de la Ley 20.416 ante la APDP.
                </p>
              </div>

              <button
                type="button"
                onClick={onGoToRat}
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition-all"
              >
                <span>Generar el RAT con IA en 3 min</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ComplianceChecklist;
