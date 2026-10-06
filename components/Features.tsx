import React from 'react';

interface FeaturesProps {
  onStartRat: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onStartRat }) => {
  const steps = [
    {
      step: '01',
      title: 'Entrevista de Negocio (3 min)',
      desc: 'Preguntas simples y cotidianas sobre las operaciones de tu Pyme: nóminas, CRM, ventas, ecommerce, facturación o cámaras CCTV.',
      icon: 'forum',
      badge: 'Sin jerga legal',
    },
    {
      step: '02',
      title: 'Detección Automática de Sensibles',
      desc: 'El Agente identifica categorías de especial resguardo legal (salud en licencias médicas, biometría en relojes de control, RUT chileno).',
      icon: 'security',
      badge: 'Art. 2 y 16',
    },
    {
      step: '03',
      title: 'Asignación de Base de Licitud',
      desc: 'Fundamenta jurídicamente cada tratamiento conforme a los Artículos 12 y 13 (ejecución contractual, mandato legal, consentimiento o interés legítimo).',
      icon: 'balance',
      badge: 'Art. 12 y 13',
    },
    {
      step: '04',
      title: 'Exportación Oficial APDP',
      desc: 'Descarga inmediata de tu Ficha Oficial del Registro de Actividades de Tratamiento (RAT) en JSON y versión PDF para acreditar diligencia.',
      icon: 'download_for_offline',
      badge: 'Art. 14 ter',
    },
  ];

  return (
    <section className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span>METODOLOGÍA "CUMPLIR SIN FRENAR"</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              De cero a cumplimiento en 4 pasos
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              No pierdas tiempo con cuestionarios incomprensibles. Nuestra inteligencia artificial estructura tu Tramo 1 obligatorio en tiempo récord.
            </p>
          </div>

          <button
            onClick={onStartRat}
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all self-start md:self-auto"
          >
            <span>Iniciar entrevista con IA</span>
            <span className="material-symbols-outlined text-sm text-orange-400">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 p-6 rounded-3xl border-2 border-zinc-200 hover:border-orange-500 transition-all flex flex-col justify-between group hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">{s.icon}</span>
                  </span>
                  <span className="font-mono text-xl font-black text-zinc-400 group-hover:text-orange-500 transition-colors">
                    {s.step}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold bg-white text-zinc-800 px-2 py-0.5 rounded border border-zinc-300 inline-block mb-2">
                  {s.badge}
                </span>

                <h3 className="text-base font-display font-black text-zinc-950 mb-2">
                  {s.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                <span>Paso {idx + 1} de 4</span>
                <span className="text-orange-600 font-bold">Automatizado</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
