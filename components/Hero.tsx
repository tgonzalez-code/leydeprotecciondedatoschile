import React, { useState } from 'react';
import { HERO_CONTENT, RUBROS_EXPOSICION } from '../content/home';
import { PageId, RubroExposicion } from '../types';

interface HeroProps {
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [rubroSeleccionado, setRubroSeleccionado] = useState<RubroExposicion>(RUBROS_EXPOSICION[0]);

  const goToDiagnosis = () => {
    onNavigate('test-cumplimiento');
  };

  const goToRat = () => {
    onNavigate('agente-rat');
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 bg-white">
      {/* Background glow sutil */}
      <div className="absolute top-0 right-1/4 -z-10 w-[500px] h-[500px] bg-orange-100/35 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: 5-Second Test Winner (Customer Problem + Solution + CTA) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-orange-50/80 border border-orange-200 text-orange-950 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true" />
              <span>{HERO_CONTENT.badge.category}</span>
              <span className="text-orange-300" aria-hidden="true">•</span>
              <span className="text-zinc-600">{HERO_CONTENT.badge.law}</span>
            </div>

            {/* Single High-Impact H1 */}
            <h1 id="main-heading" className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-zinc-950 tracking-tight leading-[1.08]">
              ¿Tu empresa está preparada para la nueva <br className="hidden sm:inline" />
              <span className="text-orange-500 underline decoration-orange-300/80 underline-offset-8">
                Ley de Datos Personales?
              </span>
            </h1>

            {/* Direct Value Proposition */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal max-w-2xl">
              Descubre en <strong className="text-zinc-950 font-bold">3 minutos</strong> qué necesitas hacer para proteger la información de tus clientes, 
              trabajadores y proveedores. Evita multas de la APDP y <strong className="text-orange-600 font-bold">cumple sin frenar tu negocio</strong>.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={goToDiagnosis}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>{HERO_CONTENT.primaryCta}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={goToRat}
                className="inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 active:scale-95 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-base text-orange-400">psychology</span>
                <span>{HERO_CONTENT.secondaryCta}</span>
              </button>
            </div>

            {/* Quick Access Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
              <button
                type="button"
                onClick={() => onNavigate('multas-utm')}
                className="text-zinc-600 hover:text-orange-600 font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>Simulador de multas UTM</span>
                <span className="material-symbols-outlined text-xs">calculate</span>
              </button>
              <span className="text-zinc-300">•</span>
              <button
                type="button"
                onClick={() => onNavigate('derechos-arcop')}
                className="text-zinc-600 hover:text-orange-600 font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>Catálogo derechos ARCOP</span>
                <span className="material-symbols-outlined text-xs">shield_person</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
              {HERO_CONTENT.trustBadges.map((badge, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-zinc-300">•</span>}
                  <span className="flex items-center gap-1.5 text-zinc-700 font-semibold">
                    <span className="material-symbols-outlined text-sm text-emerald-600">{badge.icon}</span>
                    <span>{badge.label}</span>
                  </span>
                </React.Fragment>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Sector Readiness Explorer (Instant Value in <5 seconds) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border-2 border-zinc-950 p-6 sm:p-7 shadow-xl space-y-5 relative">
              
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  <span className="text-xs font-mono font-bold text-zinc-900 uppercase">
                    SIMULADOR DE EXPOSICIÓN POR RUBRO
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded border border-zinc-200">
                  APDP Chile
                </span>
              </div>

              {/* Rubro Tabs Selector */}
              <div>
                <span className="text-[11px] font-mono text-zinc-500 block mb-2">
                  Selecciona la actividad de tu empresa:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {RUBROS_EXPOSICION.map((item) => {
                    const isSelected = rubroSeleccionado.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRubroSeleccionado(item)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-zinc-950 text-white font-bold shadow-xs'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200/80'
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Simulated Exposure Card */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-zinc-600 font-bold uppercase">
                    Nivel de Exposición:
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    rubroSeleccionado.riesgo === 'Crítico' 
                      ? 'bg-red-100 text-red-800 border border-red-200' 
                      : 'bg-orange-100 text-orange-900 border border-orange-200'
                  }`}>
                    Riesgo {rubroSeleccionado.riesgo}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 text-[11px] block">Datos que tratas habitualmente:</span>
                  <strong className="text-zinc-900 font-medium block mt-0.5">{rubroSeleccionado.datosTipicos}</strong>
                </div>

                <div className="pt-2 border-t border-orange-200/80">
                  <span className="text-zinc-500 text-[11px] block">Prioridad urgente según Ley 21.719:</span>
                  <span className="text-orange-950 font-bold block mt-0.5">{rubroSeleccionado.urgencia}</span>
                </div>
              </div>

              {/* Bottom Trigger */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={goToDiagnosis}
                  className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm text-orange-400">psychology</span>
                  <span>Evaluar la situación real de mi empresa (3 min)</span>
                </button>
                <p className="text-[10px] font-mono text-zinc-400 text-center mt-2">
                  Diagnóstico confidencial sin costo • Entrega informe inmediato
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
