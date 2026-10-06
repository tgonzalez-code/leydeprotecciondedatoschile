import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Diagnóstico Inicial',
    desc: 'Entrevista ágil de 3 minutos para evaluar cómo fluyen los datos en tu organización y calcular tu nivel de exposición.',
    tag: '3 minutos',
    icon: 'quiz',
  },
  {
    num: '02',
    title: 'Mapeo de Datos',
    desc: 'Identificamos las fuentes reales: planillas, CRM, correos, software contable, plataformas e-commerce y proveedores externos.',
    tag: 'Flujos reales',
    icon: 'hub',
  },
  {
    num: '03',
    title: 'Registro RAT',
    desc: 'Construimos el Registro de Actividades de Tratamiento requerido por la ley: qué datos tienes, para qué y bajo qué justificación.',
    tag: 'Piedra angular',
    icon: 'inventory_2',
  },
  {
    num: '04',
    title: 'Detección de Brechas',
    desc: 'Contrastamos tu operación actual contra las exigencias de la Ley 21.719 para detectar riesgos antes de una fiscalización.',
    tag: 'Prevención',
    icon: 'rule',
  },
  {
    num: '05',
    title: 'Plan de Acción',
    desc: 'Te entregamos una ruta paso a paso priorizada: qué resolver primero, qué cláusulas ajustar y cómo responder a tus clientes.',
    tag: 'Ruta clara',
    icon: 'checklist',
  },
  {
    num: '06',
    title: 'Acompañamiento',
    desc: 'Soporte continuo, actualización ante nuevos reglamentos de la APDP y apoyo en la respuesta de solicitudes ARCOP.',
    tag: 'Soporte continuo',
    icon: 'support_agent',
  },
];

interface SolutionProcessProps {
  onStartDiagnosis: () => void;
}

const SolutionProcess: React.FC<SolutionProcessProps> = ({ onStartDiagnosis }) => {
  return (
    <section id="como-funciona" className="py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              NUESTRA METODOLOGÍA LEGALTECH
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight leading-tight">
              Convertimos la incertidumbre legal en un plan claro, simple y accionable.
            </h2>
            <p className="mt-3 text-base text-zinc-600 font-normal">
              Sin informes de 200 páginas que nadie lee. Diseñamos un camino por etapas para cumplir con la ley sin detener las operaciones de tu negocio.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartDiagnosis}
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all self-start md:self-auto shadow-sm"
          >
            <span>Iniciar Paso 01: Diagnóstico</span>
            <span className="material-symbols-outlined text-sm text-orange-400">arrow_forward</span>
          </button>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs hover:border-orange-500/80 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200/60">
                    Paso {step.num}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 font-medium">
                    {step.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <span className="material-symbols-outlined text-zinc-900 text-xl group-hover:text-orange-600 transition-colors">
                    {step.icon}
                  </span>
                  <h3 className="text-base font-display font-bold text-zinc-950">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mt-2">
                  {step.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:text-orange-600 transition-colors">
                <span>Fase estructurada</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SolutionProcess;
