import React, { useState } from 'react';
import { CATALOGO_DERECHOS_ARCOP } from '../content/arcop';
import { DerechoARCOPDetalle } from '../types';

interface ArcoManagerProps {
  onGoToRat: () => void;
}

const ArcoManager: React.FC<ArcoManagerProps> = ({ onGoToRat }) => {
  const [derechoSeleccionado, setDerechoSeleccionado] = useState<DerechoARCOPDetalle>(CATALOGO_DERECHOS_ARCOP[0]);

  return (
    <div id="derechos-arco" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">timer</span>
              <span>DERECHOS ARCOP • ARTÍCULOS 5 AL 11 LEY 21.719</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Catálogo de Derechos ARCOP & Plazos de Cumplimiento
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              La Ley 21.719 consagra facultades irrenunciables para los titulares de datos con plazos perentorios: 
              <strong className="text-orange-600 font-bold"> 2 días hábiles</strong> para Bloqueo Temporal y 
              <strong className="text-zinc-950 font-bold"> 30 días corridos</strong> para el resto de derechos.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={onGoToRat}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">inventory_2</span>
              <span>Ir al Inventario RAT (Art. 14 ter)</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* High-Alert SLA Warning Banner */}
        <div className="mb-10 p-6 rounded-3xl bg-orange-50 border-2 border-orange-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">warning</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <strong className="text-base font-display font-black text-orange-950">
                  ¡Atención Pymes! El Bloqueo Temporal tiene un SLA de 48 Horas Hábiles
                </strong>
                <span className="text-[10px] font-mono font-bold bg-orange-600 text-white px-2 py-0.5 rounded">
                  Art. 10 bis
                </span>
              </div>
              <p className="text-xs text-orange-900 mt-1 max-w-3xl leading-relaxed">
                Si un cliente, colaborador o proveedor reclama por el uso de sus datos, tu empresa debe suspender su tratamiento en un plazo 
                máximo de <strong>2 días hábiles</strong>. No contestar a tiempo tipifica como infracción grave ante la APDP, arriesgando multas de hasta <strong>10.000 UTM</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={onGoToRat}
            className="shrink-0 bg-white hover:bg-orange-100 text-orange-950 border border-orange-300 font-mono font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Preparar RAT para responder en plazo →
          </button>
        </div>

        {/* 6 Rights Selector Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {CATALOGO_DERECHOS_ARCOP.map((d) => {
            const isSelected = derechoSeleccionado.tipo === d.tipo;
            return (
              <div
                key={d.tipo}
                onClick={() => setDerechoSeleccionado(d)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-600 shadow-lg scale-102'
                    : 'bg-zinc-50 border-zinc-200 hover:border-zinc-400 text-zinc-950'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setDerechoSeleccionado(d)}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white text-orange-950 font-black'
                        : d.esCritico
                        ? 'bg-orange-100 text-orange-950 border border-orange-300 font-black'
                        : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {d.sla}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-orange-200' : 'text-zinc-400'}`}>
                      {d.articulo}
                    </span>
                  </div>
                  <strong className="text-sm font-display font-black block">
                    {d.tipo}
                  </strong>
                  <p className={`text-[11px] mt-1 leading-snug line-clamp-2 ${isSelected ? 'text-orange-100' : 'text-zinc-600'}`}>
                    {d.resumen}
                  </p>
                </div>

                <div className={`mt-3 pt-2 border-t text-[10px] font-mono flex items-center justify-between ${
                  isSelected ? 'border-orange-400/60 text-white font-bold' : 'border-zinc-200 text-zinc-500'
                }`}>
                  <span>{isSelected ? 'Seleccionado' : 'Ver detalle'}</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Inspector for Selected Right */}
        <div className="bg-white rounded-3xl border-2 border-zinc-950 p-6 sm:p-10 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                  derechoSeleccionado.esCritico
                    ? 'bg-orange-100 text-orange-950 border border-orange-300 font-black'
                    : 'bg-zinc-100 text-zinc-800 border border-zinc-300'
                }`}>
                  SLA Legal: {derechoSeleccionado.sla}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Normativa: {derechoSeleccionado.articulo}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-950">
                Derecho de {derechoSeleccionado.tipo}
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-orange-500">verified</span>
                <span>Fiscalización APDP</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="space-y-2 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
              <strong className="block text-zinc-900 font-bold uppercase font-mono text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-orange-600">article</span>
                <span>1. Definición & Alcance Legal:</span>
              </strong>
              <p className="text-zinc-600 leading-relaxed font-normal">
                {derechoSeleccionado.descripcionCompleta}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
              <strong className="block text-zinc-900 font-bold uppercase font-mono text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-orange-600">badge</span>
                <span>2. Requisitos del Titular:</span>
              </strong>
              <p className="text-zinc-600 leading-relaxed font-normal">
                {derechoSeleccionado.requisitosTitular}
              </p>
            </div>

            <div className="space-y-2 bg-orange-50/70 p-4 rounded-2xl border-2 border-orange-200">
              <strong className="block text-orange-950 font-bold uppercase font-mono text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-orange-600">rule</span>
                <span>3. Obligación de la Empresa:</span>
              </strong>
              <p className="text-zinc-800 leading-relaxed font-medium">
                {derechoSeleccionado.obligacionEmpresa}
              </p>
            </div>

            <div className="space-y-2 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
              <strong className="block text-zinc-900 font-bold uppercase font-mono text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-orange-600">gavel</span>
                <span>4. Excepciones & APDP:</span>
              </strong>
              <p className="text-zinc-600 leading-relaxed font-normal">
                {derechoSeleccionado.excepcionesLegales}
              </p>
              <div className="pt-2 border-t border-zinc-200 text-[11px] text-orange-900 font-mono">
                <strong>Vía APDP:</strong> {derechoSeleccionado.reclamacionAPDP}
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Protocol for Chilean Companies when receiving ARCOP */}
        <div className="bg-zinc-50 rounded-3xl border-2 border-zinc-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                ESTÁNDAR DE COMPLIANCE
              </span>
              <h3 className="text-lg sm:text-xl font-display font-black text-zinc-950 mt-0.5">
                Protocolo Obligatorio para Recepción de Solicitudes ARCOP
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500 bg-white px-3 py-1 rounded-lg border border-zinc-300 self-start sm:self-auto">
              Evita Multas ante la APDP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">Paso 01</span>
                <span className="text-zinc-400">Canal Único</span>
              </div>
              <strong className="text-sm font-display font-black text-zinc-950 block mb-1">
                Acuse y Cómputo de Plazos
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Establece un buzón exclusivo (ej. privacidad@empresa.cl) que emita confirmación con fecha y hora exacta de recepción.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">Paso 02</span>
                <span className="text-zinc-400">Seguridad</span>
              </div>
              <strong className="text-sm font-display font-black text-zinc-950 block mb-1">
                Verificación de Identidad
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Asegúrate de corroborar que quien solicita es el titular real o su representante formal antes de entregar datos sensibles.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">Paso 03</span>
                <span className="text-zinc-400">Inventario</span>
              </div>
              <strong className="text-sm font-display font-black text-zinc-950 block mb-1">
                Búsqueda en el RAT
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Consulta el Registro de Actividades de Tratamiento (Art. 14 ter) para ubicar en qué servidores, planillas o CRMs residen los datos.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">Paso 04</span>
                <span className="text-zinc-400">Resolución</span>
              </div>
              <strong className="text-sm font-display font-black text-zinc-950 block mb-1">
                Notificación Formal
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Emite respuesta fundada y conserva el respaldo digital para acreditar diligencia en caso de una auditoría de la APDP.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArcoManager;
