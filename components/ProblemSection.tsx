import React, { useState } from 'react';

interface ProblemCardData {
  id: string;
  question: string;
  subtitle: string;
  riskDetail: string;
  icon: string;
}

const PROBLEM_CARDS: ProblemCardData[] = [
  {
    id: 'p1',
    question: '¿Sabes exactamente qué datos personales almacena tu empresa?',
    subtitle: 'Nombres, RUTs, correos, sueldos, datos de compras o historiales de navegación.',
    riskDetail: 'La mayoría de las empresas dispersa datos entre Google Drive, planillas Excel, CRMs y casillas de correo sin un inventario centralizado.',
    icon: 'folder_open',
  },
  {
    id: 'p2',
    question: '¿Sabes para qué finalidades específicas los utilizas?',
    subtitle: 'Cada uso requiere una base de justificación legal según la nueva normativa.',
    riskDetail: 'Usar bases de datos comerciales para fines distintos a los originalmente autorizados tipifica infracciones graves bajo la Ley 21.719.',
    icon: 'help_outline',
  },
  {
    id: 'p3',
    question: '¿Sabes quién tiene acceso real a esa información?',
    subtitle: 'Colaboradores internos, proveedores de TI, agencias de marketing y plataformas cloud.',
    riskDetail: 'Compartir bases con terceros sin contratos formales de encargado de tratamiento expone a la empresa a multas solidarias.',
    icon: 'key',
  },
  {
    id: 'p4',
    question: '¿Sabes cuánto tiempo los conservas y cuándo eliminarlos?',
    subtitle: 'El principio de limitación de plazo prohíbe retener datos indefinidamente.',
    riskDetail: 'Conservar currículums o datos de exclientes por años sin respaldo legal vulnera el derecho al olvido y a la supresión de datos.',
    icon: 'hourglass_empty',
  },
  {
    id: 'p5',
    question: '¿Puedes responder a tiempo una solicitud de un titular?',
    subtitle: 'La ley exige congelar datos en 2 días hábiles (bloqueo) y resolver solicitudes en 30 días.',
    riskDetail: 'No contar con un canal y procedimiento estructurado para derechos ARCOP puede derivar en denuncias directas ante la APDP.',
    icon: 'schedule',
  },
  {
    id: 'p6',
    question: '¿Tienes documentados tus tratamientos ante una auditoría?',
    subtitle: 'El principio de responsabilidad proactiva exige probar documentalmente el cumplimiento.',
    riskDetail: 'La Agencia de Protección de Datos no preguntará tus intenciones; solicitará ver tu Registro de Actividades de Tratamiento (RAT).',
    icon: 'description',
  },
];

interface ProblemSectionProps {
  onStartDiagnosis: () => void;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ onStartDiagnosis }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="problema" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
            EL DESAFÍO COMÚN DE LAS EMPRESAS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight leading-tight">
            La mayoría de las empresas no sabe exactamente qué datos tiene, dónde están ni cómo los utiliza.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            No es falta de voluntad: es que los datos crecen día a día en correos, planillas, software contable y plataformas de venta.
            Hazte estas 6 preguntas clave para conocer la realidad de tu organización:
          </p>
        </div>

        {/* 6 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEM_CARDS.map((item, idx) => {
            const isHovered = activeCard === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isHovered
                    ? 'border-orange-500 bg-orange-50/20 shadow-md -translate-y-0.5'
                    : 'border-zinc-200/90 bg-zinc-50/50 hover:border-zinc-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-2xs">
                      <span className="material-symbols-outlined text-xl text-orange-500">
                        {item.icon}
                      </span>
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-bold text-zinc-950 leading-snug">
                    {item.question}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-200/70">
                  <div className="text-[11px] text-zinc-500 leading-normal flex items-start gap-1.5">
                    <span className="text-orange-500 font-bold shrink-0">•</span>
                    <span>{item.riskDetail}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-display font-bold text-white">
              ¿Identificaste al menos 2 dudas en tu empresa?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Es completamente normal en el 90% de las PYMEs chilenas. Nuestro diagnóstico inteligente de 3 minutos te ayuda a ordenar el mapa sin fricción.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartDiagnosis}
            className="shrink-0 w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Evaluar mi empresa ahora</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
