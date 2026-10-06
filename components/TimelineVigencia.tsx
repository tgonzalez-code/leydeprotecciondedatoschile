import React, { useState } from 'react';
import { HITOS_LEY_21719 } from '../content/law-21719';
import { PageId } from '../types';

interface TimelineVigenciaProps {
  onNavigate?: (page: PageId) => void;
}

const TimelineVigencia: React.FC<TimelineVigenciaProps> = ({ onNavigate }) => {
  const [selectedHito, setSelectedHito] = useState<number>(1);
  const hitos = HITOS_LEY_21719;

  return (
    <section id="timeline-ley" aria-labelledby="heading-timeline" className="py-14 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">event_repeat</span>
              <span>CALENDARIO DE APLICACIÓN GRADUAL</span>
            </div>
            <h2 id="heading-timeline" className="text-2xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
              Línea de Tiempo: Entrada en Vigencia Ley 21.719
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Conoce los plazos oficiales de vacancia legal, instalación de la APDP y fecha límite para que tu empresa esté regularizada.
            </p>
          </div>

          <span className="text-xs font-mono text-zinc-500 bg-white px-3 py-1.5 rounded-lg border border-zinc-300 self-start md:self-auto">
            Plazo de Adecuación: 24 meses
          </span>
        </div>

        {/* Timeline Horizontal / Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {hitos.map((hito, idx) => {
            const isSelected = selectedHito === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedHito(idx)}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'bg-white border-orange-500 shadow-lg shadow-orange-500/10'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    hito.estado === 'Completado' ? 'bg-zinc-100 text-zinc-800' :
                    hito.estado === 'En curso' ? 'bg-orange-100 text-orange-900 font-bold' :
                    hito.estado === 'Próximo hito' ? 'bg-blue-50 text-blue-900' :
                    'bg-emerald-50 text-emerald-900 font-bold'
                  }`}>
                    {hito.estado}
                  </span>
                  <span className="font-mono text-xs text-zinc-500 font-bold">{hito.fecha}</span>
                </div>
                <strong className="block text-sm font-display font-bold text-zinc-950 mb-1">
                  {hito.fase}: {hito.titulo}
                </strong>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {hito.descripcion}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Hito Detailed Dossier */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-zinc-900 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4 mb-4">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                {hitos[selectedHito].fase} • Fecha Clave: {hitos[selectedHito].fecha}
              </span>
              <h3 className="text-xl font-display font-black text-zinc-950 mt-0.5">
                {hitos[selectedHito].titulo}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {hitos[selectedHito].articulosClave.map((art, i) => (
                <span key={i} className="text-xs font-mono bg-zinc-100 text-zinc-800 px-2 py-1 rounded border border-zinc-300">
                  {art}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <strong className="block text-zinc-900 font-bold uppercase font-mono text-xs mb-1">
                Alcance Institucional y Legal:
              </strong>
              <p className="text-zinc-600 leading-relaxed font-normal">
                {hitos[selectedHito].descripcion}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <strong className="block text-orange-950 font-bold uppercase font-mono text-xs mb-1">
                Impacto Operativo para tu Empresa:
              </strong>
              <p className="text-zinc-800 leading-relaxed font-medium">
                {hitos[selectedHito].impactoEmpresa}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-mono text-zinc-500">
              Recomendación: Regularizar el Registro de Actividades de Tratamiento (RAT) con anterioridad.
            </span>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('agente-rat')}
                className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all self-end sm:self-auto"
              >
                <span>Generar RAT ahora</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineVigencia;
