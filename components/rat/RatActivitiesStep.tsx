import React from 'react';
import { ActividadRAT } from '../../types';

export interface RatActivitiesStepProps {
  actividadesFiltradas: ActividadRAT[];
  filtroCategoria: string;
  onFilterChange: (categoria: string) => void;
  onToggleActivity: (id: string) => void;
  onOpenCustomModal: () => void;
  onBack: () => void;
  onNext: () => void;
}

const CATEGORIAS_FILTRO = [
  { key: 'todas', label: 'Todas' },
  { key: 'rrhh', label: 'RRHH' },
  { key: 'clientes', label: 'CRM / Ventas' },
  { key: 'ecommerce', label: 'Ecommerce' },
  { key: 'seguridad', label: 'CCTV' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'proveedores', label: 'Proveedores' },
];

export const RatActivitiesStep: React.FC<RatActivitiesStepProps> = ({
  actividadesFiltradas,
  filtroCategoria,
  onFilterChange,
  onToggleActivity,
  onOpenCustomModal,
  onBack,
  onNext,
}) => {
  return (
    <div className="bg-zinc-50 p-6 sm:p-10 rounded-3xl border-2 border-zinc-900 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-orange-600 uppercase">Paso 2 de 4</span>
          <h3 className="text-xl font-display font-black text-zinc-950 mt-0.5">
            ¿Qué datos maneja tu empresa en el día a día?
          </h3>
          <p className="text-xs text-zinc-600 mt-1">
            Marca las operaciones activas. El Agente de IA ya tiene precargados los datos y finalidades de mayor riesgo legal.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCustomModal}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-100 border-2 border-zinc-300 text-zinc-900 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base text-orange-500">add_circle</span>
          <span>+ Agregar Actividad Personalizada</span>
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 font-mono">
        <span className="text-zinc-400 font-bold mr-2 uppercase text-[10px]">Filtrar:</span>
        {CATEGORIAS_FILTRO.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => onFilterChange(f.key)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold transition-all ${
              filtroCategoria === f.key
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-zinc-700 hover:bg-zinc-200 border border-zinc-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actividadesFiltradas.map((act) => (
          <div
            key={act.id}
            onClick={() => onToggleActivity(act.id)}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
              act.seleccionada
                ? 'bg-white border-orange-500 shadow-md shadow-orange-500/10'
                : 'bg-white/60 border-zinc-200 opacity-60 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                      act.seleccionada ? 'bg-orange-500 text-white' : 'border-2 border-zinc-300'
                    }`}
                  >
                    {act.seleccionada ? '✓' : ''}
                  </div>
                  <h4 className="font-display font-black text-sm sm:text-base text-zinc-950">
                    {act.nombre}
                  </h4>
                </div>
                {act.contieneSensibles && (
                  <span className="bg-orange-100 text-orange-900 border border-orange-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0">
                    DATOS SENSIBLES
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-600 mb-3 leading-relaxed pl-7">
                {act.finalidad}
              </p>

              <div className="pl-7 flex flex-wrap gap-1.5 mb-3">
                {act.datosTratados.map((d, i) => (
                  <span
                    key={i}
                    className="bg-zinc-100 text-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-200"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="pl-7 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>
                Base: <strong className="text-zinc-900">{act.baseLicitud.split(' - ')[0]}</strong>
              </span>
              <span className="text-orange-600 font-bold">
                {act.seleccionada ? 'Incluida en RAT' : 'Omitida'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-mono font-bold text-zinc-600 hover:text-zinc-950"
        >
          ← Volver a Datos de Empresa
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all"
        >
          <span>Ejecutar Clasificación de IA (Paso 3)</span>
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
        </button>
      </div>
    </div>
  );
};
