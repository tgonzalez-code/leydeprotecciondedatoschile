import React from 'react';

interface HeroProps {
  onStartRat: () => void;
  onOpenCalculator: () => void;
  onOpenAiChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartRat, onOpenCalculator, onOpenAiChat }) => {
  return (
    <section className="bg-white border-b border-slate-200 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges / Context line */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-6 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              REPÚBLICA DE CHILE
            </span>
            <span className="text-slate-600 font-medium">Ley Nº 21.719 • Modifica Ley Nº 19.628</span>
            <span className="text-slate-300">|</span>
            <span className="text-blue-800 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">account_balance</span>
              Agencia de Protección de Datos Personales (APDP)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Estatuto Pyme (Ley 20.416) Activo
            </span>
            <span className="bg-amber-50 text-amber-800 font-mono font-medium px-2 py-0.5 rounded border border-amber-200">
              Multas: hasta 20.000 UTM
            </span>
          </div>
        </div>

        {/* Header Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          <div className="lg:col-span-8">
            <div className="inline-block bg-blue-50 text-blue-900 font-mono text-[11px] font-bold px-2.5 py-1 rounded border border-blue-200 mb-2">
              SISTEMA DE CUMPLIMIENTO REGULATORIO CHILENO
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Cumplir la Ley de Datos Personales <br className="hidden sm:inline" />
              <span className="text-blue-900 underline decoration-blue-300 underline-offset-4">sin frenar el negocio</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              Plataforma tecnológica diseñada para directores, gerentes y dueños de Pymes en Chile. 
              Sustituye consultorías tradicionales de meses por una <strong>entrevista inteligente de 3 minutos con IA</strong> para 
              estructurar de inmediato el <strong>Registro de Actividades de Tratamiento (RAT - Art. 14 ter)</strong>, 
              el Tramo 1 obligatorio exigido ante la APDP.
            </p>

            {/* Main Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartRat}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>Construir RAT con IA (3 min)</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold px-4 py-2.5 rounded-lg text-xs sm:text-sm transition-all"
              >
                <span className="material-symbols-outlined text-slate-600 text-base">calculate</span>
                <span>Simulador Multas UTM</span>
              </button>

              <button
                onClick={onOpenAiChat}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium px-4 py-2.5 rounded-lg text-xs sm:text-sm transition-all"
              >
                <span className="material-symbols-outlined text-amber-500 text-base">chat</span>
                <span>Hacer consulta al Asistente</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Status Scorecard */}
          <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-blue-900">verified_user</span>
                Checklist de Fiscalización APDP
              </span>
              <span className="text-[10px] font-mono text-slate-500">Ley 21.719</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                <div>
                  <strong className="text-slate-900 block text-[11px]">Tramo 1: RAT (Art. 14 ter)</strong>
                  <span className="text-[10px] text-slate-500">Inventario y base de licitud</span>
                </div>
                <span className="bg-red-50 text-red-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-red-200">
                  CRÍTICO
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                <div>
                  <strong className="text-slate-900 block text-[11px]">Tramo 2: Bloqueo ARCO+</strong>
                  <span className="text-[10px] text-slate-500">SLA: 2 días hábiles</span>
                </div>
                <span className="bg-amber-50 text-amber-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">
                  URGENTE
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                <div>
                  <strong className="text-slate-900 block text-[11px]">Tramo 3: Estatuto Pyme</strong>
                  <span className="text-[10px] text-slate-500">Amonestación con RAT al día</span>
                </div>
                <span className="bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                  BENEFICIO
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 italic pt-1">
              "Ninguna empresa puede defenderse si no sabe qué datos trata ni con qué base legal opera."
            </p>
          </div>

        </div>

        {/* High Information Density Grid: 4 Core Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
          
          {/* Box 1 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  TRAMO 1 OBLIGATORIO
                </span>
                <span className="material-symbols-outlined text-slate-400 text-lg">description</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                RAT: Art. 14 ter
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inventario maestro obligatorio ante la APDP: finalidades, datos sensibles (RUT, huella, salud) y bases de licitud (Art. 12 y 13).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Generación: <strong>3 min</strong></span>
              <button onClick={onStartRat} className="text-blue-900 font-bold hover:underline">
                Comenzar →
              </button>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  MULTAS APDP
                </span>
                <span className="material-symbols-outlined text-slate-400 text-lg">gavel</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Régimen Sancionatorio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leves hasta <strong>5.000 UTM</strong> (~$330M), Graves hasta <strong>10.000 UTM</strong> (~$660M) y Gravísimas hasta <strong>20.000 UTM</strong> o 4% de ventas.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">UTM: <strong>~$66.362 CLP</strong></span>
              <button onClick={onOpenCalculator} className="text-blue-900 font-bold hover:underline">
                Simular →
              </button>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  PLAZOS LEGALES
                </span>
                <span className="material-symbols-outlined text-slate-400 text-lg">timer</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Derechos ARCO+
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Acceso, Rectificación, Supresión, Oposición y Portabilidad (<strong>30 días corridos</strong>). Bloqueo Temporal (<strong>2 días hábiles</strong>).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Canal: <strong>SLA estricto</strong></span>
              <span className="text-slate-400 font-mono text-[10px]">Art. 5 al 11</span>
            </div>
          </div>

          {/* Box 4 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  LEY 20.416
                </span>
                <span className="material-symbols-outlined text-slate-400 text-lg">storefront</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Estatuto Pyme Chile
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Amonestación escrita en la 1ra infracción para micro y pequeñas empresas. <strong>Condición:</strong> acreditar regularización inmediata con el RAT.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Exige: <strong>RAT formal</strong></span>
              <span className="text-emerald-700 font-semibold font-mono text-[10px]">Atenuante</span>
            </div>
          </div>

        </div>

        {/* Data Comparison Matrix (Tradicional vs Agente IA) */}
        <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
            <div>
              <h2 className="font-extrabold text-sm text-slate-900">
                Cuadro Comparativo: Consultoría Tradicional vs. Agente IA RAT (leydedatospersonaleschile.cl)
              </h2>
              <p className="text-xs text-slate-500">
                Eficacia operativa para micro, pequeñas y medianas empresas frente al Art. 14 ter.
              </p>
            </div>
            <span className="text-[11px] font-mono text-blue-900 font-semibold self-start sm:self-auto bg-white px-2 py-0.5 rounded border border-slate-200">
              Método Ágil: "Cumplir sin frenar"
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                  <th className="py-2 px-3 font-semibold">Criterio de Evaluación</th>
                  <th className="py-2 px-3 font-semibold text-slate-700">Consultoría Legal Tradicional</th>
                  <th className="py-2 px-3 font-semibold text-blue-900 bg-blue-100/50 rounded-t">Agente IA de leydedatospersonaleschile.cl</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-800">Tiempo de Implementación</td>
                  <td className="py-2.5 px-3 text-slate-600">2 a 4 meses de reuniones y levantamiento</td>
                  <td className="py-2.5 px-3 font-bold text-blue-900 bg-blue-50/50">3 minutos (Entrevista interactiva de negocio)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-800">Costo Estimado para la Pyme</td>
                  <td className="py-2.5 px-3 text-slate-600">$3.000.000 a $12.000.000 CLP + IVA</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-800 bg-blue-50/50">Acceso digital accesible y generación inmediata</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-800">Clasificación de Datos Sensibles</td>
                  <td className="py-2.5 px-3 text-slate-600">Manual, sujeta a criterio disperso de pasantes</td>
                  <td className="py-2.5 px-3 font-bold text-blue-900 bg-blue-50/50">Algoritmo con reglas Art. 2, 12, 13 y 16 Ley 21.719</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-800">Formato del Entregable</td>
                  <td className="py-2.5 px-3 text-slate-600">Informes en Word de 150 páginas difíciles de auditar</td>
                  <td className="py-2.5 px-3 font-bold text-blue-900 bg-blue-50/50">Ficha Oficial RAT (JSON estructurado + PDF APDP)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
