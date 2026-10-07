import React from 'react';
import { DatosEmpresaRAT } from '../../types';

export interface RatCompanyStepProps {
  datosEmpresa: DatosEmpresaRAT;
  onChange: (cambios: Partial<DatosEmpresaRAT>) => void;
  onNext: () => void;
}

export const RatCompanyStep: React.FC<RatCompanyStepProps> = ({
  datosEmpresa,
  onChange,
  onNext,
}) => {
  return (
    <div className="bg-zinc-50 p-6 sm:p-10 rounded-3xl border-2 border-zinc-900 shadow-xl space-y-6">
      <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-orange-600 uppercase">Paso 1 de 4</span>
          <h3 className="text-xl font-display font-black text-zinc-950 mt-0.5">
            Identificación de la Empresa (Responsable del Tratamiento)
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-500 hidden sm:inline">Exigido por Art. 14 ter Nº 1</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
        <div>
          <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
            Razón Social o Nombre Legal *
          </label>
          <input
            type="text"
            value={datosEmpresa.razonSocial}
            onChange={(e) => onChange({ razonSocial: e.target.value })}
            className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-950 font-bold focus:border-orange-500 focus:outline-none"
            placeholder="Ej. Comercializadora SpA"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
            RUT de la Empresa *
          </label>
          <input
            type="text"
            value={datosEmpresa.rutEmpresa}
            onChange={(e) => onChange({ rutEmpresa: e.target.value })}
            className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm font-mono text-zinc-950 font-black focus:border-orange-500 focus:outline-none"
            placeholder="76.xxx.xxx-x"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
            Representante Legal *
          </label>
          <input
            type="text"
            value={datosEmpresa.representanteLegal}
            onChange={(e) => onChange({ representanteLegal: e.target.value })}
            className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-950 font-medium focus:border-orange-500 focus:outline-none"
            placeholder="Nombre y Apellidos"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
            Clasificación Pyme (Ley 20.416)
          </label>
          <select
            value={datosEmpresa.clasificacionTamano}
            onChange={(e) => onChange({ clasificacionTamano: e.target.value as any })}
            className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-950 font-bold focus:border-orange-500 focus:outline-none"
          >
            <option value="Microempresa">Microempresa (1 a 9 trabajadores / hasta 2.400 UF)</option>
            <option value="Pequeña Pyme">Pequeña Pyme (10 a 49 trabajadores / 2.400 a 25.000 UF)</option>
            <option value="Mediana Empresa">Mediana Empresa (50 a 199 trabajadores)</option>
            <option value="Gran Empresa">Gran Empresa (200+ trabajadores)</option>
          </select>
          <span className="text-[11px] text-orange-600 font-bold block mt-1.5 font-mono">
            ✓ Amparado por beneficio de amonestación (Estatuto Pyme)
          </span>
        </div>

        <div>
          <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
            Email de Contacto Canal ARCO+ *
          </label>
          <input
            type="email"
            value={datosEmpresa.emailContacto}
            onChange={(e) => onChange({ emailContacto: e.target.value })}
            className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm font-mono text-zinc-950 font-bold focus:border-orange-500 focus:outline-none"
            placeholder="privacidad@tuempresa.cl"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
            Comuna y Región
          </label>
          <input
            type="text"
            value={datosEmpresa.ciudadRegion}
            onChange={(e) => onChange({ ciudadRegion: e.target.value })}
            className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-950 font-medium focus:border-orange-500 focus:outline-none"
            placeholder="Santiago, Región Metropolitana"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-zinc-200">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all"
        >
          <span>Continuar a Selección de Tratamientos</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
