import React from 'react';

const WhyUsSection: React.FC = () => {
  return (
    <section id="por-que-nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
            NUESTRO ENFOQUE DIFERENCIADOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight leading-tight">
            La agilidad de una LegalTech moderna con la rigurosidad normativa de expertos.
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed font-normal">
            No creemos en consultorías interminables que paralizan a los equipos con minutas complejas.
            Combinamos tecnología, automatización e inteligencia normativa para darte claridad inmediata.
          </p>
        </div>

        {/* 4 Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-3">
            <span className="material-symbols-outlined text-orange-500 text-2xl">bolt</span>
            <strong className="text-base font-display font-bold text-zinc-950 block">
              Velocidad sin Fricción
            </strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Diagnósticos iniciales e inventarios RAT en minutos, no en meses. Adaptado a los tiempos reales de un negocio en marcha.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-3">
            <span className="material-symbols-outlined text-orange-500 text-2xl">translate</span>
            <strong className="text-base font-display font-bold text-zinc-950 block">
              Lenguaje Simple y Práctico
            </strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Traducimos los artículos y directrices legales en listas de tareas concretas que tu equipo de ventas, TI o RRHH puede implementar.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-3">
            <span className="material-symbols-outlined text-orange-500 text-2xl">shield</span>
            <strong className="text-base font-display font-bold text-zinc-950 block">
              Estándar Normativo Chileno
            </strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Diseñado 100% para la Ley 21.719, las facultades de la APDP, la Ley 19.628 y el beneficio para empresas del Estatuto Pyme (Ley 20.416).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-3">
            <span className="material-symbols-outlined text-orange-500 text-2xl">lock</span>
            <strong className="text-base font-display font-bold text-zinc-950 block">
              Máxima Confidencialidad
            </strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Tus respuestas y datos operativos son tratados con reserva absoluta bajo estándares de seguridad informática y secreto profesional.
            </p>
          </div>

        </div>

        {/* Clean Comparison Box */}
        <div className="bg-zinc-50 rounded-3xl border border-zinc-200 p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-1">
              COMPARATIVA DE MODELOS
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-black text-zinc-950">
              ¿En qué se diferencia nuestra solución frente a un estudio jurídico tradicional?
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 font-mono text-xs uppercase">
                  <th className="py-3 px-3">Criterio</th>
                  <th className="py-3 px-3 text-zinc-600">Estudio Jurídico Tradicional</th>
                  <th className="py-3 px-3 text-orange-950 font-bold bg-orange-100/60 rounded-t-xl">Solución LegalTech / Data Privacy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 font-sans text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-3 font-bold text-zinc-900">Tiempo de Diagnóstico</td>
                  <td className="py-3.5 px-3 text-zinc-600">Semanas de reuniones y minutas</td>
                  <td className="py-3.5 px-3 text-orange-900 font-semibold bg-orange-50/50">3 minutos mediante diagnóstico inteligente</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-zinc-900">Enfoque de Negocio</td>
                  <td className="py-3.5 px-3 text-zinc-600">Centrado en la norma teórica</td>
                  <td className="py-3.5 px-3 text-orange-900 font-semibold bg-orange-50/50">Centrado en no frenar las ventas ni la operación</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-zinc-900">Entregable del RAT</td>
                  <td className="py-3.5 px-3 text-zinc-600">Planillas aisladas difíciles de mantener</td>
                  <td className="py-3.5 px-3 text-orange-900 font-semibold bg-orange-50/50">Ficha técnica estandarizada lista para fiscalización</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-zinc-900">Soporte Continuo</td>
                  <td className="py-3.5 px-3 text-zinc-600">Cobro por hora de asesoría</td>
                  <td className="py-3.5 px-3 text-orange-900 font-semibold bg-orange-50/50">Modelo predecible con herramientas y alertas continuas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUsSection;
