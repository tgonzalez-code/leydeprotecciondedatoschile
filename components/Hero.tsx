import React, { useState } from 'react';
import { PageId } from '../types';

interface HeroProps {
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const RUBROS_DEMO = [
  {
    id: 'retail',
    name: 'E-commerce & Retail',
    riesgo: 'Alto',
    datosTipicos: 'Datos de compras, direcciones, pasarelas de pago y cookies.',
    urgencia: 'Consentimiento para marketing y contratos con couriers.',
    beneficioPyme: 'Amonestación si cuenta con RAT regularizado.',
  },
  {
    id: 'servicios',
    name: 'Servicios Profesionales',
    riesgo: 'Medio',
    datosTipicos: 'Contratos B2B, datos de nómina, RUTs y correos de contacto.',
    urgencia: 'Cláusulas de encargado de tratamiento con clientes y proveedores.',
    beneficioPyme: 'Aplica beneficio Pyme Ley 20.416.',
  },
  {
    id: 'saas',
    name: 'Software & Tecnología',
    riesgo: 'Alto',
    datosTipicos: 'Bases de datos de usuarios, telemetría y hosting internacional.',
    urgencia: 'Transferencia internacional y SLAs de bloqueo en 48 horas.',
    beneficioPyme: 'Aplica beneficio Pyme con Ficha Técnica RAT.',
  },
  {
    id: 'rrhh',
    name: 'Empresas con +15 Trabajadores',
    riesgo: 'Crítico',
    datosTipicos: 'Huellas biométricas de reloj control, licencias médicas y remuneraciones.',
    urgencia: 'Datos sensibles requieren salvaguardas técnicas reforzadas.',
    beneficioPyme: 'Riesgo de multas graves sin consentimiento reforzado.',
  },
];

const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAiChat }) => {
  const [rubroSeleccionado, setRubroSeleccionado] = useState(RUBROS_DEMO[0]);

  const scrollToDiagnosis = () => {
    const el = document.getElementById('diagnostico');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('test-cumplimiento');
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('como-funciona');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
              <span>LEGALTECH & PRIVACIDAD DE DATOS</span>
              <span className="text-orange-300" aria-hidden="true">•</span>
              <span className="text-zinc-600">LEY Nº 21.719 CHILE</span>
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
                onClick={scrollToDiagnosis}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Evaluar mi empresa ahora</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border-2 border-zinc-200 hover:border-zinc-300 text-zinc-800 font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-all"
              >
                <span>Ver cómo funciona</span>
                <span className="material-symbols-outlined text-base text-zinc-400">expand_more</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5 text-zinc-700 font-semibold">
                <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>
                <span>Diagnóstico gratis en 3 min</span>
              </span>
              <span className="text-zinc-300">•</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-orange-500">lock</span>
                <span>100% Confidencial</span>
              </span>
              <span className="text-zinc-300">•</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-zinc-500">business</span>
                <span>PYMEs y empresas chilenas</span>
              </span>
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
                  {RUBROS_DEMO.map((item) => {
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
                  onClick={scrollToDiagnosis}
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
