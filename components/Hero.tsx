import React, { useState } from 'react';
import { PageId } from '../types';
import InformativeCarousel from './InformativeCarousel';

interface HeroProps {
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAiChat }) => {
  const [perfilActivo, setPerfilActivo] = useState<'empresas' | 'ciudadanos'>('empresas');

  return (
    <section id="top" aria-labelledby="main-heading" className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Monospaced Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-900 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></span>
          <span>CHILE: LEY Nº 21.719 • MODIFICA LEY 19.628</span>
          <span className="text-orange-300" aria-hidden="true">•</span>
          <span className="text-zinc-600">FISCALIZADOR: APDP</span>
        </div>

        {/* The SINGLE REQUIRED <h1> for WCAG 2.1 AA and SEO */}
        <div className="max-w-5xl">
          <h1 id="main-heading" className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-zinc-950 tracking-tight leading-[1.05]">
            Ley de Protección de Datos Personales en Chile: <br />
            <span className="text-orange-500 underline decoration-orange-300 underline-offset-8">
              Guía y Cumplimiento Ley 21.719
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-600 leading-relaxed max-w-3xl font-normal">
            Portal oficial de información, derechos ARCOP y cumplimiento técnico. Adaptamos tu Pyme bajo el principio de 
            <strong className="text-zinc-950 font-bold"> "Cumplir sin frenar el negocio"</strong>, reemplazando consultorías tradicionales de meses 
            por una entrevista inteligente de 3 minutos con IA para generar tu <strong className="text-orange-600 font-bold font-mono">Registro de Actividades de Tratamiento (RAT - Art. 14 ter)</strong>.
          </p>

          {/* User Profile Segment Switch (Ciudadanos vs Empresas) */}
          <div className="mt-8 bg-zinc-100 p-1.5 rounded-2xl border-2 border-zinc-900 inline-flex max-w-full font-mono text-xs sm:text-sm font-bold shadow-sm" role="tablist" aria-label="Segmentación de perfil de usuario">
            <button
              type="button"
              role="tab"
              aria-selected={perfilActivo === 'empresas'}
              aria-controls="panel-empresas"
              id="tab-empresas"
              onClick={() => setPerfilActivo('empresas')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all ${
                perfilActivo === 'empresas'
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              🏢 Para Empresas y Consultores
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={perfilActivo === 'ciudadanos'}
              aria-controls="panel-ciudadanos"
              id="tab-ciudadanos"
              onClick={() => setPerfilActivo('ciudadanos')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all ${
                perfilActivo === 'ciudadanos'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              👤 Para Ciudadanos y Titulares
            </button>
          </div>

          {/* Profile Panels */}
          {perfilActivo === 'empresas' ? (
            <div id="panel-empresas" role="tabpanel" aria-labelledby="tab-empresas" className="mt-6 bg-zinc-50 p-6 sm:p-8 rounded-3xl border-2 border-zinc-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3">
                <h2 className="text-base sm:text-lg font-display font-black text-zinc-950">
                  Obligaciones Corporativas, Sanciones y Adecuación Inmediata
                </h2>
                <span className="text-xs font-mono font-bold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded border border-orange-200 self-start sm:self-auto">
                  Tramo 1 Obligatorio
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Toda empresa que trate datos de clientes, empleados o proveedores en Chile está sujeta a fiscalización por la APDP. 
                El primer paso ineludible es el <strong>Registro de Actividades de Tratamiento (RAT - Art. 14 ter)</strong>. 
                Sin él, se pierden las atenuantes del Estatuto Pyme (Ley 20.416) y se configuran infracciones graves (hasta 10.000 UTM).
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('agente-rat')}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">psychology</span>
                  <span>Ir al Agente RAT con IA (3 min)</span>
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('multas-utm')}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-100 border-2 border-zinc-300 text-zinc-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
                >
                  <span className="material-symbols-outlined text-orange-500 text-base" aria-hidden="true">calculate</span>
                  <span>Calcular Sanciones UTM</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('test-cumplimiento')}
                  className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-800 font-mono text-xs font-bold px-4 py-3 rounded-xl transition-all"
                >
                  <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">fact_check</span>
                  <span>Test Diagnóstico (60 seg)</span>
                </button>
              </div>
            </div>
          ) : (
            <div id="panel-ciudadanos" role="tabpanel" aria-labelledby="tab-ciudadanos" className="mt-6 bg-orange-50 p-6 sm:p-8 rounded-3xl border-2 border-orange-300 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-200 pb-3">
                <h2 className="text-base sm:text-lg font-display font-black text-zinc-950">
                  Conoce y Ejerce tus Derechos ARCOP ante Cualquier Empresa
                </h2>
                <span className="text-xs font-mono font-bold text-white bg-orange-500 px-2.5 py-0.5 rounded shadow-sm self-start sm:self-auto">
                  SLA Crítico: 2 Días
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal">
                La Ley 21.719 te entrega el control soberano sobre tu información: exige <strong>Acceso</strong> a tus datos, 
                <strong>Rectificación</strong> de errores, <strong>Cancelación/Supresión</strong> definitiva, <strong>Oposición</strong> a publicidad o spam, 
                <strong>Portabilidad</strong> y el derecho de <strong>Bloqueo Temporal</strong> (la empresa debe suspender el uso en 2 días hábiles).
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('derechos-arcop')}
                  className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  <span className="material-symbols-outlined text-orange-400 text-lg" aria-hidden="true">verified_user</span>
                  <span>Ver Página de Derechos ARCOP</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenAiChat}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-orange-100 border-2 border-orange-300 text-orange-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
                >
                  <span className="material-symbols-outlined text-orange-500 text-base" aria-hidden="true">help</span>
                  <span>¿Cómo denuncio ante la APDP?</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Informative Carousel with links to posts for continuous law content */}
        <div className="mt-10">
          <InformativeCarousel onNavigate={onNavigate} />
        </div>

        {/* 4 Metrics Quadrant */}
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
              Hasta ~$1.320.000.000 CLP o 4% de ventas anuales en reincidencia.
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
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-500 font-bold uppercase">Bloqueo Temporal</span>
              <span className="text-orange-600 font-bold">ART. 10 BIS</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-display text-zinc-950 tracking-tight">
              2 <span className="text-base text-zinc-600">Días</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Plazo legal perentorio para congelar el dato ante controversias o reclamos.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('multas-utm')}
            className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('multas-utm')}
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-500 font-bold uppercase">Estatuto Pyme</span>
              <span className="text-emerald-700 font-bold">LEY 20.416</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-display text-zinc-950 tracking-tight">
              Amonestación
            </p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              En 1ra infracción para Pymes, sujeta a acreditar la regularización con el RAT.
            </p>
          </div>

        </div>

        {/* High-Impact Section Hub Grid: Explora las Secciones del Portal */}
        <div className="mt-14 pt-10 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider block">
                ARQUITECTURA DE INFORMACIÓN
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-zinc-950 mt-1">
                Explora el Portal por Secciones
              </h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              Acceso directo a herramientas, calculadoras y compendio legal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Card 1: La Ley 21.719 */}
            <div 
              onClick={() => onNavigate('ley-21719')}
              className="p-6 rounded-3xl bg-zinc-50 hover:bg-orange-50/40 border-2 border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">event_repeat</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-zinc-700 px-2.5 py-1 rounded-full border border-zinc-300">
                    24 meses de vacancia
                  </span>
                </div>
                <h3 className="text-lg font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  La Ley 21.719 & Vigencia
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Línea de tiempo detallada con las 4 fases de implementación gradual, estatuto orgánico de la APDP y reglamentos.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Ver calendario completo</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Card 2: Agente RAT */}
            <div 
              onClick={() => onNavigate('agente-rat')}
              className="p-6 rounded-3xl bg-orange-50 border-2 border-orange-500 shadow-sm transition-all cursor-pointer group flex flex-col justify-between hover:bg-orange-100/60"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-orange-800 px-2.5 py-1 rounded-full border border-orange-300">
                    Tramo 1 Obligatorio
                  </span>
                </div>
                <h3 className="text-lg font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Agente RAT con Inteligencia Artificial
                </h3>
                <p className="text-xs text-zinc-800 mt-1.5 leading-relaxed">
                  Entrevista inteligente de 3 minutos. Asigna bases de licitud, clasifica datos sensibles y descarga tu ficha técnica oficial.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-orange-200 flex items-center justify-between text-xs font-mono font-bold text-orange-950">
                <span>Construir RAT ahora</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Card 3: Derechos ARCOP */}
            <div 
              onClick={() => onNavigate('derechos-arcop')}
              className="p-6 rounded-3xl bg-zinc-50 hover:bg-orange-50/40 border-2 border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">verified_user</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-zinc-700 px-2.5 py-1 rounded-full border border-zinc-300">
                    SLA 2d / 30d
                  </span>
                </div>
                <h3 className="text-lg font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Derechos ARCOP & Gestor de SLAs
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Acceso, Rectificación, Supresión, Oposición, Portabilidad y Bloqueo. Simulador de bandeja y plantillas de respuesta.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Gestionar derechos</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Card 4: Multas UTM */}
            <div 
              onClick={() => onNavigate('multas-utm')}
              className="p-6 rounded-3xl bg-zinc-50 hover:bg-orange-50/40 border-2 border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">calculate</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-zinc-700 px-2.5 py-1 rounded-full border border-zinc-300">
                    Hasta 20.000 UTM
                  </span>
                </div>
                <h3 className="text-lg font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Simulador de Multas & Beneficio Pyme
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Calcula el valor real en pesos chilenos según la severidad de la infracción y verifica si aplicas a la amonestación escrita.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Simular sanciones</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Card 5: Test Diagnóstico */}
            <div 
              onClick={() => onNavigate('test-cumplimiento')}
              className="p-6 rounded-3xl bg-zinc-50 hover:bg-orange-50/40 border-2 border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">fact_check</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-zinc-700 px-2.5 py-1 rounded-full border border-zinc-300">
                    60 segundos
                  </span>
                </div>
                <h3 className="text-lg font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Test Diagnóstico de Cumplimiento
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Evalúa con 6 preguntas clave el nivel de preparación de tu empresa ante una fiscalización formal de la APDP.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Iniciar test diagnóstico</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Card 6: Guías, Casos y Compendio */}
            <div 
              onClick={() => onNavigate('guias-recursos')}
              className="p-6 rounded-3xl bg-zinc-50 hover:bg-orange-50/40 border-2 border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">menu_book</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-zinc-700 px-2.5 py-1 rounded-full border border-zinc-300">
                    Recursos & Blog
                  </span>
                </div>
                <h3 className="text-lg font-display font-black text-zinc-950 group-hover:text-orange-600 transition-colors">
                  Guías, Casos Prácticos & Compendio
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Artículos técnicos sobre la APDP, accountability, modelos de prevención y casos reales en Pymes chilenas.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                <span>Explorar guías y casos</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </div>

        {/* High-Impact Minimalist Comparison Matrix: Tradicional vs Agente IA */}
        <div className="mt-14 bg-white rounded-3xl border-2 border-zinc-950 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider block">
                ANÁLISIS COMPARATIVO DE EFICIENCIA
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-black text-zinc-950 mt-1">
                Consultoría Legal Tradicional vs. Agente de IA para el RAT
              </h2>
            </div>
            <span className="text-xs font-mono font-bold bg-orange-100 text-orange-950 px-3 py-1 rounded-full border border-orange-200 self-start sm:self-auto">
              Metodología "Cumplir sin frenar"
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-zinc-200 font-mono text-[11px] text-zinc-500 uppercase">
                  <th className="py-2.5 px-3">Criterio Operativo</th>
                  <th className="py-2.5 px-3 text-zinc-600 bg-zinc-50 rounded-tl-xl">Consultoría Tradicional</th>
                  <th className="py-2.5 px-3 text-orange-950 bg-orange-50 font-bold rounded-tr-xl">Agente RAT con IA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans text-xs">
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900">Tiempo de Entrega</td>
                  <td className="py-3 px-3 text-zinc-600 bg-zinc-50/50">3 a 6 meses de reuniones y minutas</td>
                  <td className="py-3 px-3 text-orange-700 bg-orange-50/50 font-bold">3 minutos mediante entrevista guiada</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900">Costo Estimado</td>
                  <td className="py-3 px-3 text-zinc-600 bg-zinc-50/50">$2.500.000 a $6.000.000+ CLP</td>
                  <td className="py-3 px-3 text-orange-700 bg-orange-50/50 font-bold">Autoservicio gratuito e instantáneo</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900">Formato del RAT (Art. 14 ter)</td>
                  <td className="py-3 px-3 text-zinc-600 bg-zinc-50/50">Planillas Excel manuales desarticuladas</td>
                  <td className="py-3 px-3 text-orange-700 bg-orange-50/50 font-bold">Ficha técnica estandarizada APDP (JSON y PDF)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900">Clasificación de Sensibles</td>
                  <td className="py-3 px-3 text-zinc-600 bg-zinc-50/50">Cuestionarios jurídicos complejos</td>
                  <td className="py-3 px-3 text-orange-700 bg-orange-50/50 font-bold">Detección automática de biometría, salud y RUT</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900">Asignación Base Licitud</td>
                  <td className="py-3 px-3 text-zinc-600 bg-zinc-50/50">Horas de revisión jurisprudencial</td>
                  <td className="py-3 px-3 text-orange-700 bg-orange-50/50 font-bold">Mapeo normativo automático (Art. 12 y 13)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900">Acreditación Beneficio Pyme</td>
                  <td className="py-3 px-3 text-zinc-600 bg-zinc-50/50">Demoras que exponen a multas en UTM</td>
                  <td className="py-3 px-3 text-orange-700 bg-orange-50/50 font-bold">Descarga inmediata para acreditar regularización</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600 font-normal">
              Empieza ahora sin costo y evita multas de hasta <strong>20.000 UTM</strong> ante la APDP.
            </p>
            <button
              onClick={() => onNavigate('agente-rat')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all"
            >
              <span>Generar RAT Gratis en 3 min</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
