import React, { useState } from 'react';
import { PageId } from '../types';

interface ServicesSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

type TamanoEmpresa = 'micro' | 'pequena' | 'mediana';

const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate, onOpenAiChat }) => {
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState<TamanoEmpresa>('pequena');

  return (
    <section id="servicios" className="py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              PROPUESTA PRODUCTIZADA LEGALTECH
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight leading-tight">
              Servicios y Entregables Claros para Cada Etapa.
            </h2>
            <p className="mt-3 text-base text-zinc-600 leading-relaxed font-normal">
              Sin tarifas por hora ni presupuestos opacos. Sabes con exactitud qué documentos y herramientas legales recibe tu empresa.
            </p>
          </div>

          {/* Company Size Interactive Selector */}
          <div className="bg-white p-1 rounded-2xl border-2 border-zinc-900 inline-flex font-mono text-xs font-bold shadow-2xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setTamanoSeleccionado('micro')}
              className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                tamanoSeleccionado === 'micro' ? 'bg-zinc-950 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              1-9 personas
            </button>
            <button
              type="button"
              onClick={() => setTamanoSeleccionado('pequena')}
              className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                tamanoSeleccionado === 'pequena' ? 'bg-orange-500 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              10-49 personas
            </button>
            <button
              type="button"
              onClick={() => setTamanoSeleccionado('mediana')}
              className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                tamanoSeleccionado === 'mediana' ? 'bg-zinc-950 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              50+ personas
            </button>
          </div>
        </div>

        {/* 3 Tier Cards with Tangible Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Level 01: Diagnóstico Express */}
          <div className="bg-white p-7 rounded-3xl border border-zinc-200 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full border border-zinc-200">
                  NIVEL 01 • EVALUACIÓN
                </span>
                <span className="material-symbols-outlined text-zinc-400">speed</span>
              </div>

              <h3 className="text-2xl font-display font-black text-zinc-950">
                Diagnóstico Express
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                Evaluación inicial instantánea para conocer tu exposición real ante la APDP y priorizar las acciones críticas.
              </p>

              {/* Deliverable Box */}
              <div className="my-5 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-mono">
                <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-1">LO QUE OBTIENES:</span>
                <strong className="text-zinc-900 block font-sans">Reporte Ejecutivo de Brechas (PDF)</strong>
                <span className="text-zinc-500 text-[11px] font-sans">Score de exposición + matriz de prioridades</span>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Evaluación inteligente de 5 flujos clave en 3 minutos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Matriz de brechas críticas (clientes, nómina y nube).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Simulación de multas en UTM según el rubro de tu empresa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Hoja de ruta sugerida para la gerencia.</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('diagnostico');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs sm:text-sm py-3 rounded-xl transition-colors text-center"
            >
              Comenzar Diagnóstico Gratis
            </button>
          </div>

          {/* Level 02: Cumplimiento Integral (Core Hero Offer) */}
          <div className="bg-white p-7 rounded-3xl border-2 border-orange-500 shadow-xl flex flex-col justify-between relative">
            
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-mono text-[11px] font-bold px-3.5 py-0.5 rounded-full shadow-sm">
              MÁS ELEGIDO POR PYMES
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold bg-orange-100 text-orange-950 px-3 py-1 rounded-full border border-orange-200">
                  NIVEL 02 • INTEGRAL
                </span>
                <span className="material-symbols-outlined text-orange-500">verified</span>
              </div>

              <h3 className="text-2xl font-display font-black text-zinc-950">
                Cumplimiento & RAT
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                Solución llave en mano: inventario RAT formal, contratos ajustados, avisos legales y protocolo ARCOP de 48 horas.
              </p>

              {/* Deliverable Box */}
              <div className="my-5 p-3.5 rounded-2xl bg-orange-50/80 border border-orange-200 text-xs font-mono">
                <span className="text-orange-950 text-[10px] uppercase font-bold block mb-1">KIT DE ENTREGABLES TANGIBLES:</span>
                <strong className="text-zinc-950 block font-sans">Ficha Oficial RAT (Art. 14 ter) + Kit Legal Completo</strong>
                <span className="text-zinc-600 text-[11px] font-sans">Documentos listos para exhibir ante la APDP</span>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Ficha Técnica Oficial del RAT</strong> en formato PDF/JSON APDP.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Kit de Cláusulas Laborales</strong> (anexos de contrato de trabajo y uso de biometría).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Contratos de Encargado</strong> para proveedores externos (TI, nube, contadores).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Protocolo ARCOP de 48 Horas</strong> para Bloqueo Temporal (Art. 10 bis).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Política de privacidad para sitio web y plataformas e-commerce.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Acreditación para el Beneficio Pyme (Ley 20.416 - amonestación en 1ra falta).</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('agente-rat')}
              className="mt-8 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Generar mi Ficha RAT con IA (3 min)</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Level 03: Oficial Asistido / Acompañamiento Continuo */}
          <div className="bg-white p-7 rounded-3xl border border-zinc-200 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full border border-zinc-200">
                  NIVEL 03 • MONITOREO
                </span>
                <span className="material-symbols-outlined text-zinc-400">sync</span>
              </div>

              <h3 className="text-2xl font-display font-black text-zinc-950">
                Acompañamiento
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                Soporte permanente, actualización continua del RAT y asistencia ante consultas o reclamos de personas ante la APDP.
              </p>

              {/* Deliverable Box */}
              <div className="my-5 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-mono">
                <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-1">ENTREGABLES PERIÓDICOS:</span>
                <strong className="text-zinc-900 block font-sans">Oficial de Privacidad Asistido (DPO Support)</strong>
                <span className="text-zinc-500 text-[11px] font-sans">Soporte SLA y auditoría anual de cumplimiento</span>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Todo lo del Nivel Cumplimiento</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Actualizaciones continuas del RAT ante nuevos softwares o flujos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Asistencia prioritaria para responder solicitudes de bloqueo en 48 horas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Monitoreo de circulares vinculantes dictadas por la APDP.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Auditoría anual de verificación y reporte para el directorio.</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenAiChat}
              className="mt-8 w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-colors text-center flex items-center justify-center gap-2"
            >
              <span>Consultar Plan Continuo</span>
              <span className="material-symbols-outlined text-sm text-orange-400">chat</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
