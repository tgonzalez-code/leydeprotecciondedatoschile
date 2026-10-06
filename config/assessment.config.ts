import { ChecklistItem, DiagnosticoCumplimiento } from '../types';

export const COMPLIANCE_QUESTIONS: ChecklistItem[] = [
  {
    id: 'rat',
    pregunta: '¿Cuenta tu empresa con un Registro de Actividades de Tratamiento (RAT) documentado y al día?',
    articulos: 'Art. 14 ter',
    ponderacion: 25,
    consejo: 'Es el Tramo 1 obligatorio exigido de entrada por la APDP. Sin él, no hay defensa posible ante una fiscalización.',
  },
  {
    id: 'base_licitud',
    pregunta: '¿Cada tratamiento de datos (nóminas, clientes, CRM, marketing) tiene asignada y respaldada su base de licitud legal?',
    articulos: 'Art. 12 y 13',
    ponderacion: 20,
    consejo: 'Tratar datos sin consentimiento o sin ejecución contractual válida tipifica como infracción grave (hasta 10.000 UTM).',
  },
  {
    id: 'bloqueo_2dias',
    pregunta: '¿Posees un protocolo interno para ejecutar el Bloqueo Temporal de datos en un plazo máximo de 2 días hábiles?',
    articulos: 'Art. 10 bis',
    ponderacion: 15,
    consejo: 'Es el SLA legal más exigente de la Ley 21.719. Si un titular reclama, debes suspender el uso del dato en 48 horas hábiles.',
  },
  {
    id: 'derechos_arcop',
    pregunta: '¿Tienes un canal oficial habilitado (ej. email) para responder solicitudes ARCOP en un plazo máximo de 30 días corridos?',
    articulos: 'Art. 5 al 11',
    ponderacion: 15,
    consejo: 'Debes certificar fecha de ingreso y emitir respuesta motivada en plazo para evitar denuncias ante la Agencia.',
  },
  {
    id: 'seguridad_tecnica',
    pregunta: '¿Implementas medidas de seguridad técnicas (doble factor MFA, cifrado, accesos por rol y copias de respaldo)?',
    articulos: 'Art. 4 letra e)',
    ponderacion: 15,
    consejo: 'El principio de seguridad exige salvaguardas proporcionales para evitar filtraciones y accesos no autorizados.',
  },
  {
    id: 'contratos_encargados',
    pregunta: '¿Tus contratos con proveedores que acceden a datos (software en la nube, contadores, agencias) incluyen cláusulas de encargado?',
    articulos: 'Art. 15 y 16',
    ponderacion: 10,
    consejo: 'La empresa responsable responde solidariamente por las infracciones cometidas por sus proveedores encargados.',
  },
];

export const ASSESSMENT_THRESHOLDS = {
  avanzadoMin: 80,
  moderadoMin: 45,
};

export const ASSESSMENT_RESULTS_CONTENT: Record<'avanzado' | 'moderado' | 'critico', Omit<DiagnosticoCumplimiento, 'puntaje'>> = {
  avanzado: {
    nivel: 'Nivel Avanzado',
    categoria: 'Avanzado',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    mensaje: 'Tu empresa cuenta con bases sólidas. Recuerda mantener actualizado el RAT ante cualquier cambio de proceso y auditar periódicamente a tus proveedores.',
    recomendaciones: [
      'Mantener el Registro RAT actualizado semestralmente.',
      'Revisar las cláusulas de privacidad en contratos con proveedores internacionales.',
      'Capacitar a los colaboradores con acceso a datos sensibles.',
    ],
  },
  moderado: {
    nivel: 'Riesgo Moderado',
    categoria: 'Moderado',
    color: 'text-orange-800 bg-orange-50 border-orange-300',
    mensaje: 'Presentas brechas críticas. En caso de una denuncia en la APDP, la falta de RAT o protocolos de bloqueo te expone a sanciones graves.',
    recomendaciones: [
      'Generar inmediatamente el Registro RAT oficial (Tramo 1 - Art. 14 ter).',
      'Definir el procedimiento operativo para responder bloqueos en 2 días hábiles.',
      'Formalizar contratos de encargado de tratamiento con tus proveedores de software.',
    ],
  },
  critico: {
    nivel: 'Riesgo Crítico de Sanción',
    categoria: 'Crítico',
    color: 'text-red-800 bg-red-50 border-red-300',
    mensaje: 'Infracción inminente ante cualquier fiscalización o reclamo. El Estatuto Pyme exige regularizar de inmediato con el RAT para optar a amonestación.',
    recomendaciones: [
      'Iniciar hoy mismo la entrevista con el Agente RAT para documentar tus operaciones.',
      'Designar a un responsable interno de privacidad y atención de solicitudes ARCOP.',
      'Suspender el envío de comunicaciones comerciales que carezcan de consentimiento verificable.',
    ],
  },
};
