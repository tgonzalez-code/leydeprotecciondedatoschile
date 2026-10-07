import React from 'react';
import { ActividadRAT } from '../../types';

export interface RatReviewStepProps {
  actividadesSeleccionadas: ActividadRAT[];
  onBack: () => void;
  onNext: () => void;
}

export const RatReviewStep: React.FC<RatReviewStepProps> = ({
  actividadesSeleccionadas,
  onBack,
  onNext,
}) => {
  return (
    <div className="bg-zinc-50 p-6 sm:p-10 rounded-3xl border-2 border-zinc-900 shadow-xl space-y-6">
      <div className="border-b border-zinc-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-orange-600 uppercase">Paso 3 de 4</span>
          <h3 className="text-xl font-display font-black text-zinc-950 mt-0.5">
            Clasificación de Datos Sensibles & Asignación de Bases de Licitud
          </h3>
          <p className="text-xs text-zinc-600 mt-1">
            El motor legal procesó tus actividades, segregó datos sensibles (Art. 2 y 16) y fundamentó cada tratamiento según Art. 12 y 13.
          </p>
        </div>
        <span className="bg-orange-500 text-white font-mono font-bold text-xs px-3 py-1 rounded-lg shadow-sm">
          VALIDADO APDP
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl border-2 border-zinc-200 shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-950 text-white font-mono text-[11px]">
              <th className="py-3 px-4 font-bold">Actividad Declarada</th>
              <th className="py-3 px-4 font-bold">Datos Tratados</th>
              <th className="py-3 px-4 font-bold">Base Legal (Art. 12/13)</th>
              <th className="py-3 px-4 font-bold">Conservación</th>
              <th className="py-3 px-4 font-bold">Medidas de Seguridad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {actividadesSeleccionadas.map((act) => (
              <tr key={act.id} className="hover:bg-orange-50/20 transition-colors">
                <td className="py-3.5 px-4 align-top max-w-[200px]">
                  <strong className="text-zinc-950 font-display font-bold text-xs block">{act.nombre}</strong>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{act.finalidad}</p>
                  {act.contieneSensibles && (
                    <span className="inline-block mt-1.5 bg-orange-100 text-orange-900 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-orange-300">
                      SENSIBLES: {act.categoriasSensibles.join(', ')}
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-4 align-top max-w-[190px] text-[11px] text-zinc-700 font-mono">
                  {act.datosTratados.join(', ')}
                </td>

                <td className="py-3.5 px-4 align-top max-w-[220px]">
                  <span className="font-bold text-orange-600 block text-xs font-mono">{act.baseLicitud}</span>
                  <p className="text-[10px] text-zinc-500 mt-0.5 italic">{act.justificacionLegal}</p>
                </td>

                <td className="py-3.5 px-4 align-top text-[11px] text-zinc-700 max-w-[150px] font-mono">
                  {act.plazoConservacion}
                </td>

                <td className="py-3.5 px-4 align-top text-[11px] text-zinc-600 max-w-[170px]">
                  <ul className="list-disc pl-3 space-y-0.5">
                    {act.medidasSeguridad.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-mono font-bold text-zinc-600 hover:text-zinc-950"
        >
          ← Modificar Selección
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all"
        >
          <span>Generar Ficha Oficial RAT (Paso 4)</span>
          <span className="material-symbols-outlined text-sm">verified</span>
        </button>
      </div>
    </div>
  );
};
