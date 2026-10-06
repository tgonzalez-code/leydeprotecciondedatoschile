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
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-block bg-blue-50 text-blue-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 mb-1.5">
              METODOLOGÍA "CUMPLIR SIN FRENAR"
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Flujo de Regularización Rápida en 4 Pasos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Cómo el Agente de IA sustituye consultorías legales de meses por una ficha oficial en minutos.
            </p>
          </div>

          <button
            onClick={onStartRat}
            className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-sm self-start md:self-auto"
          >
            <span>Iniciar Entrevista con IA</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">{s.icon}</span>
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-400">
                    Paso {s.step}
                  </span>
                </div>

                <span className="text-[9px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200 font-semibold inline-block mb-1.5">
                  {s.badge}
                </span>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {s.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>Fase {idx + 1}/4</span>
                <span className="text-emerald-700 font-bold">Automatizado</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
