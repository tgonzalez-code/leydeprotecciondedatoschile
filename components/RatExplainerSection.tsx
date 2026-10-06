import React, { useState } from 'react';
import { PageId } from '../types';

interface RatExplainerSectionProps {
  onNavigate: (page: PageId) => void;
}

const RatExplainerSection: React.FC<RatExplainerSectionProps> = ({ onNavigate }) => {
  const [tabActiva, setTabActiva] = useState<'ficha' | 'matriz'>('ficha');

  return (
    <section id="rat-metodologia" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Simple & Human Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block">
              EL MAPA CENTRAL DE CUMPLIMIENTO
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight leading-tight">
              Un mapa claro de cómo tu empresa utiliza los datos personales.
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed font-normal">
              Imagina tener una vista panorámica simple que responda de inmediato: qué datos recolectas, para qué los usas, quién los cuida y cuánto tiempo los guardas.
            </p>

            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              Técnicamente, la ley chilena llama a este documento <strong className="text-zinc-950 font-bold">Registro de Actividades de Tratamiento (RAT)</strong>. Lejos de ser un trámite burocrático engorroso, es la herramienta que demuestra que tu empresa actúa con orden, transparencia y responsabilidad.
            </p>

            {/* 3 Practical Benefits */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="material-symbols-outlined text-orange-500 text-xl shrink-0 mt-0.5">verified_user</span>
                <div>
                  <strong className="text-sm font-display font-bold text-zinc-950 block">Protege a tu empresa en fiscalizaciones</strong>
                  <span className="text-xs text-zinc-600">Es el primer documento formal que la Agencia de Protección de Datos (APDP) solicitará revisar.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="material-symbols-outlined text-orange-500 text-xl shrink-0 mt-0.5">handshake</span>
                <div>
                  <strong className="text-sm font-display font-bold text-zinc-950 block">Activa el Beneficio Pyme (Ley 20.416)</strong>
                  <span className="text-xs text-zinc-600">Permite sustituir multas económicas por una amonestación escrita en tu primera infracción.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="material-symbols-outlined text-orange-500 text-xl shrink-0 mt-0.5">schedule</span>
                <div>
                  <strong className="text-sm font-display font-bold text-zinc-950 block">Te permite responder en plazo (SLA 48 horas)</strong>
                  <span className="text-xs text-zinc-600">Si un cliente exige congelar sus datos, sabes con exactitud en qué servidor o software actuar.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('agente-rat')}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 transition-all"
              >
                <span>Generar mi Ficha RAT con IA (3 min)</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Interactive Anatomy of the RAT Deliverable */}
          <div className="lg:col-span-6 bg-zinc-50 rounded-3xl border-2 border-zinc-950 p-6 sm:p-8 shadow-xl">
            
            {/* Top Bar with View Toggles */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <span className="text-xs font-mono font-bold text-zinc-900 uppercase">
                  VISTA PREVIA DEL ENTREGABLE OFICIAL
                </span>
              </div>

              <div className="flex items-center gap-1 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setTabActiva('ficha')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    tabActiva === 'ficha' ? 'bg-zinc-950 text-white font-bold' : 'text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Ficha RAT
                </button>
                <button
                  type="button"
                  onClick={() => setTabActiva('matriz')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    tabActiva === 'matriz' ? 'bg-zinc-950 text-white font-bold' : 'text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Matriz APDP
                </button>
              </div>
            </div>

            {tabActiva === 'ficha' ? (
              /* Deliverable View 1: Clean Official Technical Card */
              <div className="space-y-3 font-mono text-xs">
                
                <div className="bg-white p-4 rounded-xl border border-zinc-200 space-y-2">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="text-[10px] text-zinc-400">DOCUMENTO RAT-CL-2026</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                      Conforme Art. 14 ter
                    </span>
                  </div>
                  <strong className="text-zinc-950 text-sm block font-sans font-bold">
                    Registro de Actividades de Tratamiento (RAT)
                  </strong>
                  <p className="text-[11px] text-zinc-600 font-sans">
                    Identificación del Responsable: Razón Social, RUT, Oficial de Privacidad y finalidades declaradas ante la autoridad.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>ÁREA 01: CLIENTES & FACTURACIÓN</span>
                    <span className="text-zinc-700 font-bold">Base: Art. 13 letra a)</span>
                  </div>
                  <span className="text-zinc-900 font-bold text-xs block font-sans">Datos de Contacto, Pagos y Facturas</span>
                  <span className="text-zinc-500 text-[11px] font-sans block">Conservación: 5 años según plazo legal tributario.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>ÁREA 02: RECURSOS HUMANOS</span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-1 rounded">Datos Sensibles</span>
                  </div>
                  <span className="text-zinc-900 font-bold text-xs block font-sans">Nóminas, Huella de Reloj y Licencias Médicas</span>
                  <span className="text-zinc-500 text-[11px] font-sans block">Acceso: Restringido a jefatura con clave cifrada.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>ÁREA 03: PROVEEDORES & NUBE</span>
                    <span className="text-orange-700 font-bold">Encargados Regulados</span>
                  </div>
                  <span className="text-zinc-900 font-bold text-xs block font-sans">Hosting, ERP Contable y Software de Envío</span>
                  <span className="text-zinc-500 text-[11px] font-sans block">Contratos con cláusulas de protección de datos firmados.</span>
                </div>

              </div>
            ) : (
              /* Deliverable View 2: APDP Compliance Matrix */
              <div className="space-y-3 text-xs">
                <div className="bg-white p-4 rounded-xl border border-zinc-200 space-y-2">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block">MATRIZ DE DILIGENCIA PROACTIVA (ACCOUNTABILITY)</span>
                  <strong className="text-zinc-950 text-sm block font-display font-bold">
                    Acreditación Legal de Medidas de Seguridad
                  </strong>
                  <p className="text-zinc-600 text-xs font-normal">
                    La APDP evalúa si la empresa cuenta con procedimientos técnicos y organizativos para mitigar riesgos de filtración.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-3 bg-white rounded-xl border border-zinc-200">
                    <span className="text-emerald-700 font-bold block">✓ Base de Licitud</span>
                    <span className="text-zinc-500 text-[10px]">Contratos y consentimientos ordenados</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-zinc-200">
                    <span className="text-emerald-700 font-bold block">✓ SLA de 48 Horas</span>
                    <span className="text-zinc-500 text-[10px]">Procedimiento para Bloqueo Temporal</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-zinc-200">
                    <span className="text-emerald-700 font-bold block">✓ Cláusulas Tipo</span>
                    <span className="text-zinc-500 text-[10px]">Anexos laborales y con proveedores</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-zinc-200">
                    <span className="text-emerald-700 font-bold block">✓ Estatuto Pyme</span>
                    <span className="text-zinc-500 text-[10px]">Ley 20.416 amonestación en 1ra falta</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Entrega en formato PDF y JSON oficial</span>
              <button
                type="button"
                onClick={() => onNavigate('agente-rat')}
                className="text-orange-600 font-bold hover:underline"
              >
                Generar el tuyo →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default RatExplainerSection;
