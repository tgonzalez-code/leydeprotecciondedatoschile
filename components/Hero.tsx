import React from 'react';
import { PageId } from '../types';
import InformativeCarousel from './InformativeCarousel';

interface HeroProps {
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAiChat }) => {
  return (
    <section id="top" aria-labelledby="main-heading" className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Monospaced Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-900 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></span>
          <span>CHILE: LEY Nº 21.719</span>
          <span className="text-orange-300" aria-hidden="true">•</span>
          <span className="text-zinc-600">FISCALIZADOR OFICIAL: APDP</span>
        </div>

        {/* The SINGLE REQUIRED <h1> for WCAG 2.1 AA and SEO */}
        <div className="max-w-4xl">
          <h1 id="main-heading" className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-zinc-950 tracking-tight leading-[1.05]">
            Ley de Protección de Datos Personales en Chile: <br />
            <span className="text-orange-500 underline decoration-orange-300 underline-offset-8">
              Guía y Cumplimiento Ley 21.719
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            Portal oficial de referencia técnica y derechos ARCOP. Evalúa el riesgo de tu empresa, 
            genera tu <strong className="text-zinc-950 font-bold">Registro RAT (Art. 14 ter) con IA en 3 minutos</strong> y 
            accede a las guías prácticas para cumplir sin frenar el negocio.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('agente-rat')}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">psychology</span>
              <span>Generar RAT con IA (3 min)</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('multas-utm')}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-100 border-2 border-zinc-900 text-zinc-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-orange-500 text-base" aria-hidden="true">calculate</span>
              <span>Simulador de Multas UTM</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('test-cumplimiento')}
              className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-800 font-mono text-xs font-bold px-4 py-3 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">fact_check</span>
              <span>Test Diagnóstico (60 seg)</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('derechos-arcop')}
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-orange-600 hover:text-orange-700 hover:underline px-2 py-2 transition-colors ml-auto sm:ml-0"
            >
              <span>👤 ¿Eres titular? Conoce tus derechos ARCOP</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Carrusel Informativo: Novedades & Artículos de la Ley */}
        <div className="mt-12">
          <InformativeCarousel onNavigate={onNavigate} />
        </div>

        {/* 4 Métricas Clave */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => onNavigate('multas-utm')}
            className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('multas-utm')}
            aria-label="Abrir simulador de multas en UTM"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-500 font-bold uppercase">Sanción Máxima</span>
              <span className="text-orange-500 font-bold">APDP</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-display text-zinc-950 tracking-tight">
              20.000 <span className="text-base text-orange-600">UTM</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Hasta ~$1.345M CLP o 4% de ventas anuales en faltas gravísimas.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('agente-rat')}
            className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-500 shadow-sm transition-all cursor-pointer group hover:bg-orange-100/50"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('agente-rat')}
            aria-label="Iniciar generación del RAT con inteligencia artificial"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-orange-800 font-bold uppercase">Agente IA Tramo 1</span>
              <span className="material-symbols-outlined text-orange-600 text-base" aria-hidden="true">bolt</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-display text-zinc-950 tracking-tight">
              3 <span className="text-base text-orange-600">Minutos</span>
            </p>
            <p className="text-xs text-zinc-800 mt-1 leading-relaxed">
              Para generar la ficha técnica oficial del RAT exigida por el Art. 14 ter.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('derechos-arcop')}
            className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('derechos-arcop')}
            aria-label="Ver página de derechos ARCOP"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-500 font-bold uppercase">Bloqueo Temporal</span>
              <span className="text-orange-600 font-bold">ART. 10 BIS</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-display text-zinc-950 tracking-tight">
              2 <span className="text-base text-zinc-600">Días</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Plazo perentorio para congelar el dato ante controversias o reclamos.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('multas-utm')}
            className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('multas-utm')}
            aria-label="Ver beneficio del estatuto pyme"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-500 font-bold uppercase">Estatuto Pyme</span>
              <span className="text-emerald-700 font-bold">LEY 20.416</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-display text-zinc-950 tracking-tight">
              Amonestación
            </p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              En 1ra infracción para Pymes que acrediten su regularización con el RAT.
            </p>
          </div>

        </div>

        {/* Explora las Secciones del Portal (6 accesos directos limpios) */}
        <div className="mt-14 pt-10 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider block">
                SECCIONES CLAVE DEL PORTAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-zinc-950 mt-1">
                Herramientas y Recursos de Cumplimiento
              </h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              Accede a cada módulo según la necesidad de tu empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* 1: La Ley 21.719 */}
            <div 
              onClick={() => onNavigate('ley-21719')}
              className="p-5 rounded-2xl bg-zinc-50 hover:bg-orange-50/40 border border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">event_repeat</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">24 meses vacancia</span>
                </div>
                <h3 className="text-base font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  La Ley 21.719 & Vigencia
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Línea de tiempo con las 4 fases de vigencia y conformación de la APDP.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Ver calendario</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 2: Agente RAT */}
            <div 
              onClick={() => onNavigate('agente-rat')}
              className="p-5 rounded-2xl bg-orange-50/70 border-2 border-orange-400 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">psychology</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-orange-800 px-2 py-0.5 rounded border border-orange-200">
                    Art. 14 ter
                  </span>
                </div>
                <h3 className="text-base font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Agente RAT con IA
                </h3>
                <p className="text-xs text-zinc-700 mt-1 leading-relaxed">
                  Genera la ficha técnica oficial del inventario de datos en 3 minutos.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-orange-200 flex items-center justify-between text-xs font-mono font-bold text-orange-950">
                <span>Construir RAT</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 3: Derechos ARCOP */}
            <div 
              onClick={() => onNavigate('derechos-arcop')}
              className="p-5 rounded-2xl bg-zinc-50 hover:bg-orange-50/40 border border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">verified_user</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">SLA 2d / 30d</span>
                </div>
                <h3 className="text-base font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Catálogo de Derechos ARCOP
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Acceso, Rectificación, Supresión, Oposición, Portabilidad y Bloqueo.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Ver catálogo</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 4: Multas UTM */}
            <div 
              onClick={() => onNavigate('multas-utm')}
              className="p-5 rounded-2xl bg-zinc-50 hover:bg-orange-50/40 border border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">calculate</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Hasta 20.000 UTM</span>
                </div>
                <h3 className="text-base font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Simulador de Multas UTM
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Calcula el valor en CLP según gravedad y evalúa el Beneficio Pyme.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Simular sanciones</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 5: Test Diagnóstico */}
            <div 
              onClick={() => onNavigate('test-cumplimiento')}
              className="p-5 rounded-2xl bg-zinc-50 hover:bg-orange-50/40 border border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">fact_check</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">60 segundos</span>
                </div>
                <h3 className="text-base font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Test Diagnóstico de Riesgo
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Diagnóstico rápido para conocer el nivel de exposición de tu empresa.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Iniciar test</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 6: Guías & Casos */}
            <div 
              onClick={() => onNavigate('guias-recursos')}
              className="p-5 rounded-2xl bg-zinc-50 hover:bg-orange-50/40 border border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">menu_book</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Artículos & Blog</span>
                </div>
                <h3 className="text-base font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Guías & Casos Prácticos
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Artículos sobre fiscalización APDP, biometría, telemarketing y más.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Explorar recursos</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
