import React from 'react';
import { PageId } from '../types';

interface ThematicArchitectureSiloProps {
  onNavigate: (page: PageId) => void;
}

export const ThematicArchitectureSilo: React.FC<ThematicArchitectureSiloProps> = ({ onNavigate }) => {
  return (
    <section aria-labelledby="thematic-architecture-title" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-950 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-3 uppercase">
            <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">account_tree</span>
            <span>ARQUITECTURA TEMÁTICA & REGULATORIA</span>
          </div>
          <h2 id="thematic-architecture-title" className="text-2xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
            Estructura de la Ley de Protección de Datos Personales
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2 font-normal leading-relaxed">
            Comprende cómo se articulan la normativa histórica, la nueva reforma integral y la ruta de adecuación operativa para tu empresa en Chile.
          </p>
        </div>

        {/* Tree Container */}
        <div className="bg-zinc-50 border-2 border-zinc-900 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {/* ROOT NODE: LEY DE DATOS PERSONALES */}
          <div className="flex flex-col items-center">
            <div className="bg-zinc-950 text-white border-2 border-orange-500 rounded-2xl px-6 py-4 shadow-lg text-center max-w-md w-full">
              <span className="text-[10px] font-mono font-bold text-orange-400 tracking-wider uppercase block">
                Pilar Central / Ecosistema Regulatorio
              </span>
              <strong className="text-base sm:text-lg font-display font-black tracking-tight text-white block mt-0.5">
                LEY DE DATOS PERSONALES EN CHILE
              </strong>
              <p className="text-[11px] text-zinc-400 font-mono mt-1">
                Marco general aplicable a toda entidad que trate datos
              </p>
            </div>

            {/* Central Vertical Connector */}
            <div className="w-0.5 h-8 bg-zinc-400 my-0"></div>

            {/* Horizontal Splitter Line */}
            <div className="hidden md:block w-3/4 max-w-3xl h-0.5 bg-zinc-400 relative">
              <div className="absolute left-0 top-0 w-0.5 h-6 bg-zinc-400"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-6 bg-zinc-400"></div>
              <div className="absolute right-0 top-0 w-0.5 h-6 bg-zinc-400"></div>
            </div>
          </div>

          {/* 3 SILO BRANCHES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 md:pt-6">
            
            {/* SILO 1: LEY 21.719 -> ARCOP */}
            <div className="flex flex-col items-center space-y-4">
              <div 
                onClick={() => onNavigate('ley-21719')}
                className="w-full bg-white border-2 border-zinc-900 hover:border-orange-500 p-5 rounded-2xl shadow-md transition-all cursor-pointer group text-center"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600 mb-2 font-bold">
                  <span className="material-symbols-outlined text-base">gavel</span>
                </div>
                <h3 className="font-display font-black text-sm sm:text-base text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Ley Nº 21.719
                </h3>
                <p className="text-[11px] text-zinc-600 mt-1 leading-snug">
                  Reforma integral, creación de la <strong>APDP</strong>, régimen sancionatorio y vacancia de 24 meses.
                </p>
                <span className="inline-block mt-3 text-[10px] font-mono font-bold text-orange-600 group-hover:underline">
                  Ver Ley 21.719 & Vigencia →
                </span>
              </div>

              {/* Connector Down */}
              <div className="w-0.5 h-6 bg-zinc-400"></div>

              {/* Subtopic: ARCOP */}
              <div 
                onClick={() => onNavigate('derechos-arcop')}
                className="w-full bg-orange-50/70 border-2 border-orange-300 hover:border-orange-500 p-4 rounded-2xl shadow-sm transition-all cursor-pointer group text-center"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-orange-950 mb-1">
                  <span className="material-symbols-outlined text-sm text-orange-600">timer</span>
                  <span>DERECHOS ARCOP</span>
                </div>
                <strong className="text-xs font-bold text-zinc-950 block">
                  SLA Crítico de 2 Días Hábiles
                </strong>
                <p className="text-[10px] text-zinc-600 mt-1 leading-tight">
                  Bloqueo Temporal inmediato (Art. 10 bis) y 30 días para Acceso, Rectificación y Portabilidad.
                </p>
                <span className="inline-block mt-2 text-[10px] font-mono font-bold text-orange-600 group-hover:underline">
                  Catálogo ARCOP →
                </span>
              </div>
            </div>

            {/* SILO 2: LEY 19.628 -> RAT */}
            <div className="flex flex-col items-center space-y-4">
              <div 
                onClick={() => onNavigate('compendio-legal')}
                className="w-full bg-white border-2 border-zinc-900 hover:border-orange-500 p-5 rounded-2xl shadow-md transition-all cursor-pointer group text-center"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600 mb-2 font-bold">
                  <span className="material-symbols-outlined text-base">menu_book</span>
                </div>
                <h3 className="font-display font-black text-sm sm:text-base text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Ley Nº 19.628
                </h3>
                <p className="text-[11px] text-zinc-600 mt-1 leading-snug">
                  Norma sobre Protección de la Vida Privada, cuyo articulado permanente fue modernizado por completo.
                </p>
                <span className="inline-block mt-3 text-[10px] font-mono font-bold text-orange-600 group-hover:underline">
                  Compendio Normativo →
                </span>
              </div>

              {/* Connector Down */}
              <div className="w-0.5 h-6 bg-zinc-400"></div>

              {/* Subtopic: RAT */}
              <div 
                onClick={() => onNavigate('agente-rat')}
                className="w-full bg-orange-500 text-white border-2 border-orange-600 hover:bg-orange-600 p-4 rounded-2xl shadow-md transition-all cursor-pointer group text-center"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-black text-orange-100 mb-1 uppercase">
                  <span className="material-symbols-outlined text-sm text-white">psychology</span>
                  <span>REGISTRO RAT (ART. 14 TER)</span>
                </div>
                <strong className="text-xs font-bold text-white block">
                  Tramo 1 Obligatorio APDP
                </strong>
                <p className="text-[10px] text-orange-100 mt-1 leading-tight">
                  Inventario de tratamientos, bases de licitud (Art. 12/13) y acreditación para acogerse al Estatuto Pyme.
                </p>
                <span className="inline-block mt-2 text-[10px] font-mono font-bold text-white underline">
                  Generar RAT con IA (3 min) →
                </span>
              </div>
            </div>

            {/* SILO 3: CUMPLIMIENTO -> DIAGNÓSTICO -> CALCULADORA -> SERVICIOS */}
            <div className="flex flex-col items-center space-y-3">
              <div 
                onClick={() => onNavigate('test-cumplimiento')}
                className="w-full bg-white border-2 border-zinc-900 hover:border-orange-500 p-4 rounded-2xl shadow-md transition-all cursor-pointer group text-center"
              >
                <span className="text-[10px] font-mono font-bold text-orange-600 uppercase block">Ruta Empresarial</span>
                <h3 className="font-display font-black text-sm text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Cumplimiento
                </h3>
                <p className="text-[10px] text-zinc-600 mt-0.5">
                  Plan ordenado en 3 etapas operativas:
                </p>
              </div>

              {/* Connector Down */}
              <div className="w-0.5 h-3 bg-zinc-400"></div>

              {/* Step 1: Diagnóstico */}
              <div 
                onClick={() => onNavigate('test-cumplimiento')}
                className="w-full bg-white border border-zinc-300 hover:border-orange-500 p-3 rounded-xl shadow-xs transition-all cursor-pointer group flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[11px] font-mono">1</span>
                  <div>
                    <strong className="text-xs font-bold text-zinc-950 block group-hover:text-orange-600">Diagnóstico</strong>
                    <span className="text-[10px] text-zinc-500 block">Test de preparación en 60 segundos</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-zinc-400 group-hover:text-orange-600">arrow_forward</span>
              </div>

              {/* Connector Down */}
              <div className="w-0.5 h-3 bg-zinc-400"></div>

              {/* Step 2: Calculadora */}
              <div 
                onClick={() => onNavigate('multas-utm')}
                className="w-full bg-white border border-zinc-300 hover:border-orange-500 p-3 rounded-xl shadow-xs transition-all cursor-pointer group flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[11px] font-mono">2</span>
                  <div>
                    <strong className="text-xs font-bold text-zinc-950 block group-hover:text-orange-600">Calculadora</strong>
                    <span className="text-[10px] text-zinc-500 block">Simulador multas UTM y Beneficio Pyme</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-zinc-400 group-hover:text-orange-600">arrow_forward</span>
              </div>

              {/* Connector Down */}
              <div className="w-0.5 h-3 bg-zinc-400"></div>

              {/* Step 3: Servicios */}
              <div 
                onClick={() => onNavigate('casos-pymes')}
                className="w-full bg-white border border-zinc-300 hover:border-orange-500 p-3 rounded-xl shadow-xs transition-all cursor-pointer group flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-950 text-orange-400 flex items-center justify-center font-bold text-[11px] font-mono">3</span>
                  <div>
                    <strong className="text-xs font-bold text-zinc-950 block group-hover:text-orange-600">Servicios</strong>
                    <span className="text-[10px] text-zinc-500 block">Casos prácticos, kits y soporte IA</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-zinc-400 group-hover:text-orange-600">arrow_forward</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
