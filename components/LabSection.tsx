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
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">
            Laboratorio de Casos Prácticos en Chile
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            Situaciones reales donde las Pymes arriesgan sanciones
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Aprende cómo opera la Ley 21.719 en el terreno diario de las empresas chilenas y cómo el RAT te protege.
          </p>
        </div>

        {/* Interactive Case Study Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Case Buttons */}
          <div className="lg:col-span-4 space-y-3">
            {CASOS_PRACTICOS.map((c, i) => (
              <button
                key={i}
                onClick={() => setCasoActivo(i)}
                className={`w-full p-4 rounded-2xl text-left border transition-all ${
                  casoActivo === i
                    ? 'bg-[#0e214d] border-blue-500 shadow-lg shadow-blue-950'
                    : 'bg-[#08122c] border-blue-900/40 text-slate-400 hover:text-white hover:bg-[#0c1839]'
                }`}
              >
                <span className="text-[10px] font-mono text-blue-400 font-bold block mb-1">
                  CASO PRÁCTICO #{i + 1}
                </span>
                <strong className={`block text-xs sm:text-sm font-bold ${casoActivo === i ? 'text-white' : 'text-slate-300'}`}>
                  {c.titulo}
                </strong>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {c.rubro}
                </span>
              </button>
            ))}

            <div className="pt-2">
              <button
                onClick={onOpenAiChat}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0d1e44] hover:bg-[#122857] border border-blue-700/60 text-blue-200 p-3.5 rounded-2xl text-xs font-bold transition-all"
              >
                <span className="material-symbols-outlined text-amber-300 text-sm">smart_toy</span>
                <span>Consultar caso específico de mi empresa</span>
              </button>
            </div>
          </div>

          {/* Right: Active Case Detail */}
          <div className="lg:col-span-8 bg-[#0b1633] p-6 sm:p-8 rounded-3xl border border-blue-900/70 shadow-2xl">
            <div className="inline-block bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-mono px-2.5 py-0.5 rounded mb-3">
              ANÁLISIS DE RIESGO REGULATORIO
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {CASOS_PRACTICOS[casoActivo].titulo}
            </h3>
            <p className="text-xs font-mono text-blue-400 mb-6">
              Rubro evaluado: {CASOS_PRACTICOS[casoActivo].rubro}
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-[#08122c] p-4 rounded-2xl border border-blue-900/40">
                <span className="text-slate-400 font-semibold block text-xs mb-1">
                  1. El Escenario Cotidiano:
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {CASOS_PRACTICOS[casoActivo].situacion}
                </p>
              </div>

              <div className="bg-red-950/30 p-4 rounded-2xl border border-red-900/50">
                <span className="text-red-300 font-semibold block text-xs mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  2. El Riesgo Legal ante la APDP:
                </span>
                <p className="text-red-200 leading-relaxed">
                  {CASOS_PRACTICOS[casoActivo].riesgo}
                </p>
              </div>

              <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/60">
                <span className="text-emerald-300 font-semibold block text-xs mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  3. Cómo lo resuelve el Agente RAT (Tramo 1):
                </span>
                <p className="text-emerald-100 leading-relaxed">
                  {CASOS_PRACTICOS[casoActivo].solucionRAT}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                ¿Manejas situaciones similares en tu empresa?
              </span>
              <button
                onClick={onGoToRat}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-105 shrink-0"
              >
                Construir mi RAT ahora (3 min) →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LabSection;
