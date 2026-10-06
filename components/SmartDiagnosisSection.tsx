import React, { useState } from 'react';
import { PageId } from '../types';

interface Question {
  id: number;
  categoria: string;
  pregunta: string;
  descripcion: string;
  opciones: {
    label: string;
    sublabel: string;
    puntos: number;
    brecha?: string;
  }[];
}

const DIAGNOSIS_QUESTIONS: Question[] = [
  {
    id: 1,
    categoria: 'Inventario de Datos',
    pregunta: '¿Tu empresa tiene un inventario o lista documentada de qué datos personales almacena y dónde están?',
    descripcion: 'Incluye planillas Excel, correos de postulantes, carpetas en Google Drive o sistemas CRM.',
    opciones: [
      {
        label: 'No tenemos nada documentado',
        sublabel: 'Los datos están dispersos en computadores y cuentas personales.',
        puntos: 3,
        brecha: 'Falta de Registro de Actividades de Tratamiento (RAT - Exigencia básica de la ley).',
      },
      {
        label: 'Tenemos una idea general o algunas planillas',
        sublabel: 'Sabemos qué usamos pero no está formalizado ni actualizado.',
        puntos: 2,
        brecha: 'Inventario parcial no estandarizado susceptible a observaciones en fiscalización.',
      },
      {
        label: 'Sí, contamos con un mapa o registro formal',
        sublabel: 'Sabemos qué datos tenemos, quién los gestiona y dónde residen.',
        puntos: 0,
      },
    ],
  },
  {
    id: 2,
    categoria: 'Clientes & Marketing',
    pregunta: '¿Envías correos comerciales, WhatsApp masivos o publicidad a clientes o prospectos?',
    descripcion: 'Uso de bases de datos para ventas, newsletters, promociones o prospección comercial.',
    opciones: [
      {
        label: 'Sí, y no siempre pedimos consentimiento previo explícito',
        sublabel: 'Compramos bases o agregamos contactos de ferias/reuniones sin registro.',
        puntos: 3,
        brecha: 'Tratamiento comercial sin base de licitud válida (Art. 12 Ley 21.719).',
      },
      {
        label: 'Solo a clientes actuales, pero sin opción clara de desuscripción',
        sublabel: 'Comunicamos a quienes ya compraron sin protocolo ARCOP de oposición.',
        puntos: 2,
        brecha: 'Ausencia de mecanismo formal de derecho de oposición y revocación de consentimiento.',
      },
      {
        label: 'Contamos con opt-in formal y enlace de baja en cada comunicación',
        sublabel: 'El cliente autoriza expresamente y puede desuscribirse con 1 clic.',
        puntos: 0,
      },
    ],
  },
  {
    id: 3,
    categoria: 'Trabajadores & Nómina',
    pregunta: '¿Tratas datos sensibles de trabajadores como huellas de reloj control, exámenes o licencias médicas?',
    descripcion: 'La Ley 21.719 clasifica la biometría y los antecedentes de salud como categorías con protección reforzada.',
    opciones: [
      {
        label: 'Sí, usamos reloj biométrico o licencias sin cláusulas de privacidad',
        sublabel: 'El contrato de trabajo no especifica medidas de seguridad ni tratamiento de datos sensibles.',
        puntos: 3,
        brecha: 'Tratamiento de datos sensibles sin salvaguardas técnicas ni consentimiento reforzado.',
      },
      {
        label: 'Usamos biometría y archivamos licencias con resguardos básicos',
        sublabel: 'Acceso restringido a RRHH, pero sin política formal de destrucción.',
        puntos: 1,
        brecha: 'Falta de política de retención y destrucción segura de datos sensibles laborales.',
      },
      {
        label: 'No tratamos datos sensibles o contamos con protocolo formal de seguridad',
        sublabel: 'Solo datos mínimos de nómina con medidas de acceso controladas.',
        puntos: 0,
      },
    ],
  },
  {
    id: 4,
    categoria: 'Proveedores & Nube',
    pregunta: '¿Compartes bases de datos con proveedores externos (contabilidad, agencias, software en la nube)?',
    descripcion: 'Toda empresa externa que procesa tus datos actúa como "encargado de tratamiento".',
    opciones: [
      {
        label: 'Sí, y no tenemos contratos con cláusulas de protección de datos firmados',
        sublabel: 'Enviamos planillas por email o WhatsApp a prestadores sin convenio.',
        puntos: 3,
        brecha: 'Falta de contratos de encargo de tratamiento (responsabilidad solidaria ante filtraciones).',
      },
      {
        label: 'Utilizamos proveedores reconocidos (Google, AWS, etc.) sin auditoría de cláusulas',
        sublabel: 'Aceptamos términos estándar sin revisar dónde se alojan los datos.',
        puntos: 1,
        brecha: 'Revisión pendiente de cláusulas de transferencia internacional de datos.',
      },
      {
        label: 'Contamos con acuerdos de confidencialidad y tratamiento con cada proveedor',
        sublabel: 'Nuestros contratos exigen estándares estrictos de seguridad de la información.',
        puntos: 0,
      },
    ],
  },
  {
    id: 5,
    categoria: 'Derechos de las Personas (ARCOP)',
    pregunta: 'Si un cliente o exempleado exige congelar o borrar sus datos en 48 horas, ¿tu empresa sabría qué hacer?',
    descripcion: 'El derecho de Bloqueo Temporal (Art. 10 bis) otorga un plazo improrrogable de 2 días hábiles.',
    opciones: [
      {
        label: 'No tenemos canal exclusivo ni sabemos cómo congelar los datos técnicamente',
        sublabel: 'Dependería de la buena voluntad de la persona que lea el correo.',
        puntos: 3,
        brecha: 'Incapacidad de cumplir el SLA legal de 2 días hábiles para Bloqueo Temporal.',
      },
      {
        label: 'Podríamos responder informalmente pero no tenemos protocolo de 2 días',
        sublabel: 'Nos tomaría semanas ubicar dónde están guardadas todas las copias.',
        puntos: 2,
        brecha: 'Riesgo de denuncia ante la APDP por vencimiento de plazos perentorios de respuesta.',
      },
      {
        label: 'Tenemos un canal definido (ej. privacidad@empresa.cl) y procedimiento claro',
        sublabel: 'Podemos aislar y suprimir el dato en los plazos legales establecidos.',
        puntos: 0,
      },
    ],
  },
];

interface SmartDiagnosisSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const SmartDiagnosisSection: React.FC<SmartDiagnosisSectionProps> = ({ onNavigate, onOpenAiChat }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // Lead Capture State
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSent, setLeadSent] = useState(false);

  const totalQuestions = DIAGNOSIS_QUESTIONS.length;

  const handleSelectOption = (questionId: number, points: number) => {
    const updatedAnswers = { ...answers, [questionId]: points };
    setAnswers(updatedAnswers);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  };

  const score = calculateScore();
  const maxPossibleScore = 15;
  // Percentage of compliance (0 points penalty = 100% compliance)
  const compliancePercentage = Math.max(10, Math.round(((maxPossibleScore - score) / maxPossibleScore) * 100));

  let riskLevel: 'Bajo' | 'Medio' | 'Alto' = 'Bajo';
  let riskColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  let riskBadge = 'Cumplimiento Avanzado';
  let riskAdvice = 'Tu empresa cuenta con bases sólidas. El paso crítico inmediato es documentar formalmente tu Ficha RAT (Art. 14 ter) para respaldar el cumplimiento documental ante la APDP.';

  if (score >= 8) {
    riskLevel = 'Alto';
    riskColor = 'text-red-700 bg-red-50 border-red-300';
    riskBadge = 'Riesgo Alto de Brechas';
    riskAdvice = 'Presentas brechas operativas importantes en inventario de datos, contratos con terceros y SLAs de respuesta (bloqueo en 48 horas). Es urgente regularizar tus tratamientos para evitar multas de la APDP.';
  } else if (score >= 4) {
    riskLevel = 'Medio';
    riskColor = 'text-amber-700 bg-amber-50 border-amber-300';
    riskBadge = 'Riesgo Moderado';
    riskAdvice = 'Tienes medidas operativas informales pero careces de estandarización legal. Con un Registro RAT estructurado y actualización de cláusulas laborales puedes regularizar tu situación en pocos días.';
  }

  // Get detected gaps
  const detectedGaps: string[] = [];
  DIAGNOSIS_QUESTIONS.forEach((q) => {
    const chosenPoints = answers[q.id];
    if (chosenPoints !== undefined) {
      const chosenOpt = q.opciones.find((opt) => opt.puntos === chosenPoints);
      if (chosenOpt && chosenOpt.brecha) {
        detectedGaps.push(chosenOpt.brecha);
      }
    }
  });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;
    setLeadSent(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setIsStarted(true);
    setLeadSent(false);
  };

  return (
    <section id="diagnostico" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-950 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span>DIAGNÓSTICO INTELIGENTE EN 3 MINUTOS</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight leading-tight">
            Descubre en 3 minutos qué tan preparada está tu empresa.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Sin tecnicismos jurídicos. Analiza cómo fluyen los datos en tu organización, identifica posibles brechas y obtén una orientación clara sobre los pasos a seguir.
          </p>
        </div>

        {/* Diagnosis Interactive Card / SaaS Container */}
        <div className="bg-white rounded-3xl border-2 border-zinc-950 shadow-xl overflow-hidden transition-all duration-300">
          
          {!isStarted ? (
            /* State 0: Welcome / Onboarding Card */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 border-2 border-orange-200 text-orange-600 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <h3 className="text-2xl font-display font-black text-zinc-950">
                  Evaluación Rápida de Cumplimiento Ley 21.719
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  Solo 5 preguntas prácticas sobre tus clientes, colaboradores, proveedores y almacenamiento de información.
                </p>
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-left text-xs font-mono">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-orange-600 font-bold block">01. Rápido</span>
                  <span className="text-zinc-600 text-[11px]">3 minutos aprox.</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-orange-600 font-bold block">02. Simple</span>
                  <span className="text-zinc-600 text-[11px]">Preguntas directas</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-orange-600 font-bold block">03. Privado</span>
                  <span className="text-zinc-600 text-[11px]">Sin datos sensibles</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-orange-600 font-bold block">04. Accionable</span>
                  <span className="text-zinc-600 text-[11px]">Próximos pasos</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsStarted(true)}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all"
                >
                  <span>Comenzar diagnóstico gratuito →</span>
                </button>
                <p className="text-[11px] font-mono text-zinc-400 mt-3">
                  No requiere tarjeta ni datos bancarios • Resultado inmediato en pantalla
                </p>
              </div>
            </div>
          ) : !showResult ? (
            /* State 1: Active Question Card with Microinteractions */
            <div className="p-6 sm:p-10">
              
              {/* Progress Bar & Header */}
              <div className="border-b border-zinc-200 pb-5 mb-6">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-500 mb-2">
                  <span className="text-orange-600 uppercase">
                    MÓDULO {currentStep + 1} DE {totalQuestions}: {DIAGNOSIS_QUESTIONS[currentStep].categoria}
                  </span>
                  <span>{Math.round(((currentStep + 1) / totalQuestions) * 100)}% Completado</span>
                </div>

                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-2 mb-6">
                <h3 className="text-xl sm:text-2xl font-display font-black text-zinc-950 leading-snug">
                  {DIAGNOSIS_QUESTIONS[currentStep].pregunta}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-normal">
                  {DIAGNOSIS_QUESTIONS[currentStep].descripcion}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {DIAGNOSIS_QUESTIONS[currentStep].opciones.map((opt, idx) => {
                  const isSelected = answers[DIAGNOSIS_QUESTIONS[currentStep].id] === opt.puntos;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(DIAGNOSIS_QUESTIONS[currentStep].id, opt.puntos)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                          : 'border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50/70 bg-white'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-orange-500 text-white' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>

                      <div className="space-y-1">
                        <strong className="block text-sm sm:text-base font-display font-bold text-zinc-950">
                          {opt.label}
                        </strong>
                        <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                          {opt.sublabel}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back button */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="hover:text-zinc-950 transition-colors flex items-center gap-1 font-bold"
                  >
                    <span>← Volver a la pregunta anterior</span>
                  </button>
                ) : (
                  <span>Pregunta 1 de {totalQuestions}</span>
                )}
                <span>100% Confidencial</span>
              </div>

            </div>
          ) : (
            /* State 2: Diagnosis Results & Personalized Lead Capture */
            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Header result with Compliance Meter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                    RESULTADO DEL DIAGNÓSTICO
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-950 mt-1">
                    Radiografía de Cumplimiento Ley 21.719
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-400 block">Nivel Estimado:</span>
                    <strong className="text-xl font-black font-mono text-zinc-950">{compliancePercentage}%</strong>
                  </div>
                  <div className={`px-4 py-2 rounded-xl border font-mono font-bold text-xs sm:text-sm ${riskColor}`}>
                    {riskBadge}
                  </div>
                </div>
              </div>

              {/* Assessment Message */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                <span className="text-xs font-mono font-bold text-zinc-900 uppercase block">
                  Conclusión preliminar:
                </span>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                  {riskAdvice}
                </p>
              </div>

              {/* Detected Gaps Checklist */}
              {detectedGaps.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-mono font-bold text-zinc-900 uppercase flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-orange-600 text-base">warning</span>
                    <span>Brechas Operativas a Resolver ({detectedGaps.length}):</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {detectedGaps.map((gap, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 text-xs text-zinc-800 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-orange-200/80 text-orange-950 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="font-medium">{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HIGH CONVERTING LEAD CAPTURE BOX: "Recibir Informe Ejecutivo Completo" */}
              <div className="bg-zinc-950 text-white p-6 sm:p-8 rounded-3xl space-y-5 relative overflow-hidden">
                {!leadSent ? (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                        ENTREGABLE INMEDIATO
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-black text-white">
                        Recibe tu Plan de Adecuación y Resumen Ejecutivo en tu email
                      </h4>
                      <p className="text-xs text-zinc-300 max-w-xl font-normal leading-relaxed">
                        Te enviamos el detalle con la hoja de ruta priorizada, la plantilla del RAT oficial (Art. 14 ter) y las recomendaciones específicas para tu empresa.
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] font-mono text-zinc-400 block mb-1">Nombre y Apellido *</label>
                        <input
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Ej. Carolina Silva"
                          className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-sans"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-zinc-400 block mb-1">Empresa / Razón Social *</label>
                        <input
                          type="text"
                          required
                          value={leadCompany}
                          onChange={(e) => setLeadCompany(e.target.value)}
                          placeholder="Ej. Comercializadora SpA"
                          className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-sans"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-zinc-400 block mb-1">Email Corporativo *</label>
                        <input
                          type="email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="carolina@empresa.cl"
                          className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-sans"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-zinc-400 block mb-1">Teléfono / WhatsApp (Opcional)</label>
                        <input
                          type="tel"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="+56 9 1234 5678"
                          className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-sans"
                        />
                      </div>

                      <div className="sm:col-span-2 pt-2">
                        <button
                          type="submit"
                          className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">mail</span>
                          <span>Enviar mi Plan de Adecuación y Resumen Ejecutivo →</span>
                        </button>
                        <span className="text-[10px] font-mono text-zinc-400 text-center block mt-2">
                          100% Confidencial • Sin spam ni llamadas molestas
                        </span>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">check</span>
                    </div>
                    <h4 className="text-xl font-display font-black text-white">
                      ¡Informe generado con éxito para {leadCompany || 'tu empresa'}!
                    </h4>
                    <p className="text-xs text-zinc-300 max-w-md mx-auto">
                      Hemos enviado el resumen ejecutivo y plan sugerido a <strong>{leadEmail}</strong>.
                    </p>
                    <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => onNavigate('agente-rat')}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
                      >
                        Generar Ficha RAT Oficial con IA (3 min) →
                      </button>
                      <button
                        type="button"
                        onClick={onOpenAiChat}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs px-4 py-2.5 rounded-xl"
                      >
                        Consultar con Asistente Legal
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-zinc-500 hover:text-zinc-950 transition-colors flex items-center gap-1 font-bold"
                >
                  <span className="material-symbols-outlined text-sm">refresh</span>
                  <span>Repetir evaluación</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('multas-utm')}
                  className="text-orange-600 font-bold hover:underline"
                >
                  Ver simulador de multas UTM de la APDP →
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default SmartDiagnosisSection;
