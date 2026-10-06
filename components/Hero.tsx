import React from 'react';

interface HeroProps {
  onStartRat: () => void;
  onOpenCalculator: () => void;
  onOpenAiChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartRat, onOpenCalculator, onOpenAiChat }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-blue-900/30">
      {/* Background Glow & Chilean Colors ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full text-xs text-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="font-semibold">Regulación Oficial Chile</span>
            <span className="text-slate-500">•</span>
            <span>Nueva Ley 21.719</span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1 rounded-full text-xs text-emerald-300 font-medium">
            <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
            Estatuto Pyme (Ley 20.416) Aplica
          </div>

          <div className="inline-flex items-center gap-1.5 bg-red-950/40 border border-red-800/40 px-3 py-1 rounded-full text-xs text-red-300 font-mono">
            Fiscaliza: APDP
          </div>
        </div>

        {/* Main Title & Slogan */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Cumplir la Ley de Datos <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              sin frenar el negocio
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Reemplaza consultorías legales tradicionales de meses y honorarios millonarios por una 
            <strong className="text-white font-semibold"> entrevista conversacional de 3 minutos con IA</strong>. 
            Genera de inmediato tu <strong className="text-blue-300 font-semibold">Registro de Actividades de Tratamiento (RAT - Art. 14 ter)</strong>, 
            el Tramo 1 obligatorio exigido por la nueva Agencia de Protección de Datos Personales (APDP).
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartRat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-xl text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all hover:scale-105 active:scale-95 group"
            >
              <span className="material-symbols-outlined text-xl text-white group-hover:rotate-12 transition-transform">
                psychology
              </span>
              <span>Construir RAT con IA (3 min)</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#101c3d] hover:bg-[#15234d] border border-blue-800/60 text-slate-200 hover:text-white font-semibold px-6 py-4 rounded-xl text-base transition-all hover:border-blue-500"
            >
              <span className="material-symbols-outlined text-amber-400 text-xl">
                calculate
              </span>
              <span>Simulador Multas UTM</span>
            </button>

            <button
              onClick={onOpenAiChat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#091124] hover:bg-[#0e1b38] border border-slate-800 text-slate-300 hover:text-blue-300 font-medium px-5 py-4 rounded-xl text-sm transition-all"
            >
              <span className="material-symbols-outlined text-blue-400 text-lg">
                chat
              </span>
              <span>Consultar al Asistente</span>
            </button>
          </div>

          {/* Trust Banner / Legal Realities */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span className="material-symbols-outlined text-emerald-400 text-sm">lock</span>
            <span>Tus datos no se comparten. Descarga inmediata en PDF y JSON oficial APDP.</span>
          </div>
        </div>

        {/* 4 Pillars Grid (Tramo 1, Multas, ARCO+, Pyme) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Tramo 1 RAT */}
          <div className="bg-[#0b1633] p-5 sm:p-6 rounded-2xl border border-blue-900/60 hover:border-blue-700 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-blue-400 text-2xl">description</span>
              </div>
              <div className="inline-block bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-mono px-2 py-0.5 rounded mb-2">
                PASO 1 OBLIGATORIO
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                RAT: Art. 14 ter
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ninguna empresa puede proteger datos si desconoce qué tiene, dónde se guardan y con qué base legal opera (Art. 12 y 13).
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-900/40 text-xs font-semibold text-blue-400 flex items-center gap-1">
              <span>Solución lista en 3 min</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </div>

          {/* Card 2: Sanciones UTM */}
          <div className="bg-[#0b1633] p-5 sm:p-6 rounded-2xl border border-blue-900/60 hover:border-red-900/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-red-400 text-2xl">gavel</span>
              </div>
              <div className="inline-block bg-red-950 text-red-300 border border-red-800 text-[10px] font-mono px-2 py-0.5 rounded mb-2">
                HASTA 20.000 UTM
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Régimen Sancionatorio
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multas de 5.000 a 20.000 UTM (~$330M a $1.320M CLP) o hasta 4% de ventas. La APDP ya no perdona la ignorancia digital.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-900/40 text-xs font-semibold text-red-400 flex items-center gap-1">
              <span>Calcular riesgo UTM</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </div>

          {/* Card 3: SLAs ARCO+ */}
          <div className="bg-[#0b1633] p-5 sm:p-6 rounded-2xl border border-blue-900/60 hover:border-amber-900/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-amber-400 text-2xl">timer</span>
              </div>
              <div className="inline-block bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono px-2 py-0.5 rounded mb-2">
                SLAs PERENTORIOS
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Derechos ARCO+
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                SLA crítico de <strong>2 días hábiles</strong> para Bloqueo Temporal y <strong>30 días corridos</strong> para Acceso, Rectificación y Supresión.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-900/40 text-xs font-semibold text-amber-400 flex items-center gap-1">
              <span>Gestionar solicitudes</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </div>

          {/* Card 4: Beneficio Pyme */}
          <div className="bg-[#0b1633] p-5 sm:p-6 rounded-2xl border border-blue-900/60 hover:border-emerald-900/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-emerald-400 text-2xl">store</span>
              </div>
              <div className="inline-block bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded mb-2">
                LEY 20.416 (PYMES)
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Amonestación Escrita
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Las Pymes acceden a amonestación en 1ra infracción, pero la APDP exige presentar el RAT en plazo perentorio para no cursar multa.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-900/40 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <span>Acreditar diligencia</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </div>

        </div>

        {/* Comparison Table: Consultoría tradicional vs Agente IA RAT */}
        <div className="mt-14 bg-gradient-to-br from-[#0c1839] to-[#070e24] p-6 sm:p-8 rounded-3xl border border-blue-900/70 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">
              Comparativa de Eficiencia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              ¿Por qué elegir nuestro Agente de IA para el Tramo 1?
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Cumplir la ley no debe asfixiar el flujo de caja ni frenar tus operaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tradicional */}
            <div className="bg-[#091126] p-6 rounded-2xl border border-red-900/30 relative">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-red-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-400">history_toggle_off</span>
                  Consultoría Legal Tradicional
                </h4>
                <span className="text-xs bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-900">
                  Lento y costoso
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-500 text-base shrink-0 mt-0.5">close</span>
                  <span><strong>2 a 4 meses</strong> de reuniones interminables que desconcentran a tu equipo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-500 text-base shrink-0 mt-0.5">close</span>
                  <span>Costos entre <strong>$3.000.000 y $12.000.000 CLP</strong> inalcanzables para una Pyme.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-500 text-base shrink-0 mt-0.5">close</span>
                  <span>Documentos teóricos densos de 150 páginas que nadie lee ni sabe cómo actualizar.</span>
                </li>
              </ul>
            </div>

            {/* Agente IA RAT */}
            <div className="bg-[#0e214d] p-6 rounded-2xl border-2 border-blue-500/70 shadow-lg shadow-blue-900/30 relative">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow">
                CUMPLIR SIN FRENAR
              </div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">bolt</span>
                  Agente IA de leydedatospersonaleschile.cl
                </h4>
                <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                  Inmediato
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">check_circle</span>
                  <span><strong>3 minutos</strong> mediante una entrevista estructurada de preguntas simples.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Clasificación automática de <strong>datos sensibles (RUT, biométricos, salud)</strong> y bases de licitud (Art. 12 y 13).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">check_circle</span>
                  <span>Exportación instantánea en <strong>Ficha Oficial RAT (PDF y JSON)</strong> lista para inspección APDP.</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onStartRat}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span className="material-symbols-outlined text-base">rocket_launch</span>
              <span>Probar el Agente IA de RAT ahora mismo</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
