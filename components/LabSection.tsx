import React, { useState } from 'react';

interface LabSectionProps {
  onGoToRat: () => void;
  onOpenAiChat: () => void;
}

const CASOS_PRACTICOS = [
  {
    titulo: 'Caso 1: Empresa de Servicios y Reloj Control Biométrico',
    rubro: 'Servicios de Aseo y Seguridad (35 trabajadores)',
    situacion: 'Implementaron reloj de asistencia por huella dactilar sin cláusula en contrato ni registro en el RAT.',
    riesgo: 'La huella dactilar es un dato biométrico (categoría especial/sensible según Art. 2 y 16). Exige consentimiento específico o justificación estricta de proporcionalidad y medidas de cifrado.',
    solucionRAT: 'En nuestro Agente RAT se clasifica automáticamente como dato biométrico laboral (Art. 13 letra a), documentando el fin y las medidas de seguridad para la APDP.',
  },
  {
    titulo: 'Caso 2: Tienda Online y Carrito Abandonado por WhatsApp',
    rubro: 'Ecommerce de Calzado y Accesorios',
    situacion: 'Enviaban mensajes promocionales y recordatorios por WhatsApp a números de clientes que no habían finalizado la compra.',
    riesgo: 'Si el cliente no dio consentimiento expreso (Art. 12) para prospección comercial por mensajería, puede formular una denuncia por spam ante la APDP.',
    solucionRAT: 'El Agente segrega la base de datos de marketing con base en Consentimiento (Art. 12) y establece el mecanismo de desuscripción obligatoria.',
  },
  {
    titulo: 'Caso 3: Ex-colaborador exige Bloqueo Temporal de sus Datos',
    rubro: 'Consultora de Ingeniería (12 personas)',
    situacion: 'Un ex-empleado en litigio laboral exigió por correo formal el Bloqueo Temporal de sus antecedentes.',
    riesgo: 'La empresa tardó 10 días hábiles en contestar. El SLA perentorio de la Ley 21.719 para Bloqueo Temporal es de sólo 2 DÍAS HÁBILES.',
    solucionRAT: 'Al tener el RAT al día, la empresa sabe de inmediato en qué carpetas y sistemas están los datos y aplica el bloqueo sin superar las 48 horas hábiles.',
  },
];

const LabSection: React.FC<LabSectionProps> = ({ onGoToRat, onOpenAiChat }) => {
  const [casoActivo, setCasoActivo] = useState(0);

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <span className="text-blue-900 font-mono text-[10px] font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            CASOS PRÁCTICOS EN PYMES CHILENAS
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Situaciones Reales donde las Empresas Arriesgan Sanciones
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Cómo opera la fiscalización de la APDP en operaciones cotidianas y cómo el RAT previene contingencias.
          </p>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Buttons */}
          <div className="lg:col-span-5 space-y-2">
            {CASOS_PRACTICOS.map((c, i) => (
              <button
                key={i}
                onClick={() => setCasoActivo(i)}
                className={`w-full p-3.5 rounded-lg text-left border transition-all ${
                  casoActivo === i
                    ? 'bg-blue-50/50 border-blue-900 shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">CASO #{i + 1}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{c.rubro}</span>
                </div>
                <strong className={`block text-xs font-bold ${casoActivo === i ? 'text-blue-950' : 'text-slate-800'}`}>
                  {c.titulo}
                </strong>
              </button>
            ))}

            <div className="pt-2">
              <button
                onClick={onOpenAiChat}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 p-2.5 rounded-lg text-xs font-medium transition-all"
              >
                <span className="material-symbols-outlined text-sm text-amber-500">smart_toy</span>
                <span>Consultar caso específico de mi negocio con IA</span>
              </button>
            </div>
          </div>

          {/* Right Detail Card */}
          <div className="lg:col-span-7 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                {CASOS_PRACTICOS[casoActivo].titulo}
              </h3>
              <span className="text-[10px] font-mono text-slate-500">{CASOS_PRACTICOS[casoActivo].rubro}</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-0.5">1. Situación Operativa:</span>
              <p className="text-slate-600 leading-relaxed">{CASOS_PRACTICOS[casoActivo].situacion}</p>
            </div>

            <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-xs">
              <span className="font-bold text-red-900 block mb-0.5">2. Riesgo ante la APDP (Ley 21.719):</span>
              <p className="text-red-800 leading-relaxed">{CASOS_PRACTICOS[casoActivo].riesgo}</p>
            </div>

            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-900 block mb-0.5">3. Solución con el Agente RAT:</span>
              <p className="text-emerald-800 leading-relaxed">{CASOS_PRACTICOS[casoActivo].solucionRAT}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onGoToRat}
                className="inline-flex items-center gap-1 bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg text-xs"
              >
                <span>Generar mi RAT para este caso</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LabSection;
