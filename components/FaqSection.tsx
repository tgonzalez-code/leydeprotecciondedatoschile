import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
  category: 'pyme' | 'costos' | 'ley';
}

const FAQS: FaqItem[] = [
  {
    category: 'pyme',
    q: '¿La Ley 21.719 aplica a mi empresa si soy una PYME o microempresa?',
    a: 'Sí. La ley no distingue por tamaño de facturación ni cantidad de empleados: aplica a cualquier persona jurídica o natural que trate datos personales en Chile (datos de clientes, prospectos, trabajadores o proveedores). Sin embargo, las micro y pequeñas empresas cuentan con el beneficio del Estatuto Pyme (Ley 20.416), que permite sustituir multas por amonestación en la primera infracción siempre que cuenten con su RAT formalmente documentado.',
  },
  {
    category: 'ley',
    q: '¿Qué es exactamente el RAT y por qué la APDP me lo va a pedir?',
    a: 'El RAT (Registro de Actividades de Tratamiento) es el inventario central que documenta qué datos personales recolecta tu empresa, con qué finalidad, bajo qué justificación legal (consentimiento, contrato o ley), quién tiene acceso y cuánto tiempo se conservan. Es la primera pieza que exigirá la Agencia de Protección de Datos (APDP) ante cualquier fiscalización o denuncia.',
  },
  {
    category: 'ley',
    q: '¿Qué son los derechos ARCOP y qué plazo tiene mi empresa para responder?',
    a: 'Son los derechos de Acceso, Rectificación, Cancelación (supresión), Oposición, Portabilidad y Bloqueo Temporal. El plazo general para resolver una solicitud es de 30 días corridos, con una excepción crítica: el Bloqueo Temporal (Art. 10 bis) exige congelar el uso del dato en un plazo máximo e improrrogable de 2 días hábiles (48 horas).',
  },
  {
    category: 'costos',
    q: '¿Cuánto tiempo y presupuesto necesita mi empresa para prepararse?',
    a: 'Con nuestro enfoque LegalTech, el diagnóstico inicial toma solo 3 minutos y la estructuración del primer inventario RAT se realiza en una sola sesión guiada con IA. A diferencia de las consultorías tradicionales de meses con tarifas por hora indeterminadas, nuestros modelos son productizados con entregables claros y alcance predefinido.',
  },
  {
    category: 'pyme',
    q: '¿Necesito contratar un abogado permanente o un Delegado de Protección de Datos (DPO)?',
    a: 'La ley no exige que todas las empresas tengan un DPO obligatorio exclusivo; solo resulta mandatorio para ciertas entidades con tratamientos masivos o de alto riesgo. Para la gran mayoría de las PYMEs, basta con ordenar sus flujos con herramientas como nuestro RAT y contar con asesoría profesional puntual o continua para revisiones clave.',
  },
  {
    category: 'costos',
    q: '¿Qué pasa si mi empresa todavía no hace nada respecto a la ley?',
    a: 'Actualmente rige un período de vacancia legal para la instalación gradual de la Agencia de Protección de Datos (APDP). Quienes preparen su inventario y contratos con anticipación evitarán cuellos de botella de última hora y podrán ampararse en las atenuantes legales por responsabilidad proactiva en caso de reclamos.',
  },
  {
    category: 'costos',
    q: '¿El diagnóstico inteligente de 3 minutos reemplaza una asesoría legal formal?',
    a: 'El diagnóstico inteligente es una herramienta tecnológica de evaluación preliminar que te entrega una radiografía operativa inmediata de tus brechas y riesgos. No constituye patrocinio judicial para litigios ni reemplaza dictámenes contenciosos específicos, pero sirve como base documental rigurosa para estructurar tu plan de cumplimiento profesional.',
  },
];

const FaqSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pyme' | 'costos' | 'ley'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter((f) => filter === 'all' || f.category === filter);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
            RESOLVEMOS TUS DUDAS EN LENGUAJE DE NEGOCIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 font-normal">
            Todo lo que necesitas saber sobre la Ley 21.719, plazos, costos y cómo proteger a tu empresa sin burocracia.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => { setFilter('all'); setOpenIndex(0); }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'all' ? 'bg-zinc-950 text-white shadow-2xs' : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Todas ({FAQS.length})
            </button>
            <button
              type="button"
              onClick={() => { setFilter('pyme'); setOpenIndex(0); }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'pyme' ? 'bg-orange-500 text-white shadow-2xs' : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Para PYMEs
            </button>
            <button
              type="button"
              onClick={() => { setFilter('costos'); setOpenIndex(0); }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'costos' ? 'bg-orange-500 text-white shadow-2xs' : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Costos y Tiempos
            </button>
            <button
              type="button"
              onClick={() => { setFilter('ley'); setOpenIndex(0); }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'ley' ? 'bg-orange-500 text-white shadow-2xs' : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Multas y RAT
            </button>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-zinc-950">
                    {faq.q}
                  </span>
                  <span className={`w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-600 transition-transform ${
                    isOpen ? 'rotate-180 bg-orange-100 text-orange-700' : ''
                  }`}>
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
