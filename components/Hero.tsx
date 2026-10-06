import React from 'react';

interface HeroProps {
  onStartRat: () => void;
  onOpenCalculator: () => void;
  onOpenAiChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartRat, onOpenCalculator, onOpenAiChat }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Monospaced Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-900 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span>LEY Nº 21.719 EN CHILE</span>
          <span className="text-orange-300">•</span>
          <span className="text-zinc-600">TRAMO 1 OBLIGATORIO: ART. 14 TER</span>
        </div>

        {/* Main Massive Headline */}
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-zinc-950 tracking-tighter leading-[0.95]">
            CUMPLIR LA LEY DE DATOS <br />
            <span className="text-orange-500 underline decoration-orange-300 underline-offset-8">
              SIN FRENAR EL NEGOCIO.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-zinc-600 leading-relaxed max-w-3xl font-normal">
            Reemplaza consultorías legales tradicionales de 4 meses por una 
            <strong className="text-zinc-950 font-bold"> entrevista inteligente de 3 minutos con IA</strong>. 
            Construye y descarga de inmediato tu <strong className="text-orange-600 font-bold font-mono">Registro de Actividades de Tratamiento (RAT - Art. 14 ter)</strong>, 
            el inventario legal obligatorio exigido por la nueva Agencia de Protección de Datos Personales (APDP).
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={onStartRat}
              className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-orange-500/25 transition-all hover:shadow-orange-500/40 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">
                psychology
              </span>
              <span>Construir mi RAT con IA (3 min)</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border-2 border-zinc-300 hover:border-zinc-400 text-zinc-900 font-bold text-sm px-6 py-4 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-orange-500 text-xl">calculate</span>
              <span>Simulador Multas UTM</span>
            </button>

            <button
              onClick={onOpenAiChat}
              className="inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-semibold px-5 py-4 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-amber-400 text-base">smart_toy</span>
              <span>Preguntar al Asistente</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5 text-zinc-700">
              <span className="material-symbols-outlined text-emerald-600 text-base">verified</span>
              Exporta JSON y PDF Oficial APDP
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-zinc-700">
              <span className="material-symbols-outlined text-orange-600 text-base">lock</span>
              Tus datos son privados y no se comparten
            </span>
            <span>•</span>
            <span className="text-zinc-500">
              Aplica Estatuto Pyme (Ley 20.416)
            </span>
          </div>
        </div>

        {/* 4 High-Impact Stat Boxes */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={onOpenCalculator}
            className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-500 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-500 font-bold uppercase">Sanción Máxima</span>
              <span className="text-orange-500 font-bold">APDP CHILE</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-display text-zinc-950 tracking-tight">
              20.000 <span className="text-lg text-orange-600">UTM</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Hasta ~$1.320.000.000 CLP o entre 2% y 4% de las ventas anuales en reincidencia.
            </p>
            <span className="mt-3 text-xs font-mono font-bold text-orange-600 group-hover:underline inline-block">
              Calcular riesgo exacto →
            </span>
          </div>

          <div 
            onClick={onStartRat}
            className="p-6 rounded-2xl bg-orange-50 border-2 border-orange-500 shadow-sm transition-all cursor-pointer group hover:bg-orange-100/50"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-orange-800 font-bold uppercase">Agente IA Tramo 1</span>
              <span className="material-symbols-outlined text-orange-600 text-lg">bolt</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-display text-zinc-950 tracking-tight">
              3 <span className="text-lg text-orange-600">Minutos</span>
            </p>
            <p className="text-xs text-zinc-800 mt-1 leading-relaxed">
              Para clasificar datos sensibles, asignar bases legales (Art. 12 y 13) y generar tu RAT.
            </p>
            <span className="mt-3 text-xs font-mono font-bold text-orange-700 group-hover:underline inline-block">
              Iniciar prueba gratuita →
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 transition-all">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-500 font-bold uppercase">SLA Más Exigente</span>
              <span className="text-zinc-500">ART. 10 BIS</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-display text-zinc-950 tracking-tight">
              2 <span className="text-lg text-zinc-600">Días</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Plazo perentorio improrrogable para ejecutar el Bloqueo Temporal de datos ante reclamos.
            </p>
            <span className="mt-3 text-[11px] font-mono text-zinc-500 block">
              30 días para resto de ARCO+
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 transition-all">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-500 font-bold uppercase">Estatuto Pyme</span>
              <span className="text-emerald-700 font-bold">LEY 20.416</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-display text-zinc-950 tracking-tight">
              Amonestación
            </p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              En la 1ra falta para Pymes, pero la APDP exige presentar el RAT de inmediato para no cursar multa.
            </p>
            <span className="mt-3 text-[11px] font-mono text-emerald-800 font-bold block">
              Requiere acreditar el RAT
            </span>
          </div>

        </div>

        {/* High-Impact Visual Comparison Table */}
        <div className="mt-14 bg-white rounded-3xl border-2 border-zinc-900 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                EFICIENCIA OPERATIVA & COSTO-BENEFICIO
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-zinc-950 mt-1">
                ¿Por qué una Pyme no debe hacer esto a la antigua?
              </h2>
            </div>
            <div className="bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl text-xs font-mono text-orange-900 font-semibold self-start md:self-auto">
              Concepto: "Cumplir sin frenar"
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Tradicional */}
            <div className="bg-zinc-50 p-6 sm:p-8 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-black text-lg text-zinc-600 flex items-center gap-2">
                  <span className="material-symbols-outlined text-zinc-400">hourglass_disabled</span>
                  Consultoría Tradicional
                </span>
                <span className="text-xs font-mono font-bold bg-zinc-200 text-zinc-700 px-2.5 py-1 rounded">
                  Lento & Costoso
                </span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-base shrink-0">✕</span>
                  <span><strong>2 a 4 meses de reuniones:</strong> Desconcentra a tus gerentes, jefaturas y equipos operativos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-base shrink-0">✕</span>
                  <span><strong>Costos de $3M a $12M CLP:</strong> Presupuestos fuera del alcance real de una Pyme en crecimiento.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-base shrink-0">✕</span>
                  <span><strong>Informes teóricos de 150 páginas:</strong> Archivos estáticos en Word que nadie sabe cómo auditar ni presentar a la APDP.</span>
                </li>
              </ul>
            </div>

            {/* Agente IA RAT */}
            <div className="bg-orange-50/60 p-6 sm:p-8 rounded-2xl border-2 border-orange-500 shadow-lg shadow-orange-500/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-black text-lg text-zinc-950 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-600">bolt</span>
                  Agente IA de leydedatospersonaleschile.cl
                </span>
                <span className="text-xs font-mono font-bold bg-orange-500 text-white px-2.5 py-1 rounded shadow-sm">
                  Inmediato (3 min)
                </span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-900 font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold text-base shrink-0">✓</span>
                  <span><strong>Entrevista conversacional de 3 minutos:</strong> Preguntas de negocio cotidianas (sueldos, CRM, web, CCTV).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold text-base shrink-0">✓</span>
                  <span><strong>Clasificación automática legal:</strong> Identifica categorías sensibles (RUT, huella, salud) y asigna Art. 12 y 13.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold text-base shrink-0">✓</span>
                  <span><strong>Ficha Oficial RAT en JSON y PDF:</strong> Estructura técnica oficial para exhibir ante cualquier requerimiento de la APDP.</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onStartRat}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-lg shadow-orange-500/30 transition-all"
            >
              <span>Generar el RAT de mi empresa ahora</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
