import React from 'react';

interface FeaturesProps {
  onStartRat: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onStartRat }) => {
  const steps = [
    {
      step: '01',
      title: 'Entrevista Inteligente en 3 Minutos',
      desc: 'Preguntas simples en lenguaje de negocio sobre las actividades de tu Pyme: remuneraciones, CRM de ventas, ecommerce, facturación o cámaras CCTV.',
      icon: 'forum',
      badge: 'Sin jerga legal',
    },
    {
      step: '02',
      title: 'Detección Automática de Datos Sensibles',
      desc: 'El Agente identifica categorías de especial resguardo bajo la Ley 21.719 (salud en licencias médicas, biometría en relojes de control, RUT chileno).',
      icon: 'security',
      badge: 'Art. 2 y 16',
    },
    {
      step: '03',
      title: 'Asignación Precisa de Base de Licitud',
      desc: 'Asocia el fundamento jurídico exacto según los Artículos 12 y 13 (ejecución contractual, deber legal, consentimiento expreso o interés legítimo).',
      icon: 'balance',
      badge: 'Art. 12 y 13',
    },
    {
      step: '04',
      title: 'Descarga de Ficha Oficial RAT (JSON/PDF)',
      desc: 'Genera el documento certificado del Registro de Actividades de Tratamiento (Art. 14 ter) con código de trazabilidad listo para presentar ante la APDP.',
      icon: 'download_for_offline',
      badge: 'Art. 14 ter APDP',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-950 text-blue-300 border border-blue-800 text-xs font-mono px-3 py-1 rounded-full mb-3">
            <span>CÓMO FUNCIONA NUESTRO AGENTE DE IA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            De cero a cumplimiento en 4 pasos simples
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            No pierdas tiempo con formularios incomprensibles. Nuestra inteligencia artificial 
            estructura tu Tramo 1 obligatorio en tiempo récord.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-[#0b1633] p-6 rounded-2xl border border-blue-900/60 hover:border-blue-500/60 transition-all flex flex-col justify-between group hover:scale-[1.02]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-blue-400 transition-colors">
                    {s.step}
                  </span>
                </div>

                <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800/80 px-2 py-0.5 rounded font-semibold inline-block mb-2">
                  {s.badge}
                </span>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {s.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-900/30 flex items-center justify-between text-[11px] text-slate-400">
                <span>Paso {idx + 1} de 4</span>
                <span className="text-blue-400 font-bold">Automatizado</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartRat}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-xl text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">bolt</span>
            <span>Iniciar entrevista con el Agente de IA ahora</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Features;
