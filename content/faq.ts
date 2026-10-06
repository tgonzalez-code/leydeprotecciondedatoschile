export interface FaqItem {
  id: string;
  pregunta: string;
  respuesta: string;
  categoria: 'general' | 'pyme' | 'rat' | 'multas';
}

export const FAQS_CONTENT: FaqItem[] = [
  {
    id: 'que-es-ley-21719',
    categoria: 'general',
    pregunta: '¿Qué es la Ley 21.719 y a qué empresas aplica en Chile?',
    respuesta: 'La Ley 21.719 es la nueva normativa chilena de protección de datos personales que actualiza integralmente la Ley 19.628. Crea la Agencia de Protección de Datos Personales (APDP) e impone estándares equiparables al RGPD europeo. Aplica obligatoriamente a toda persona natural o jurídica en Chile que recopile, almacene o procese datos personales de clientes, prospectos, trabajadores o proveedores.',
  },
  {
    id: 'que-es-el-rat',
    categoria: 'rat',
    pregunta: '¿Qué es el Registro de Actividades de Tratamiento (RAT) y por qué es obligatorio?',
    respuesta: 'El RAT (Art. 14 ter) es el inventario formal donde cada empresa documenta qué categorías de datos posee, con qué fines los trata, bajo qué base legal (consentimiento, contrato o ley), con quién los comparte y por cuánto tiempo los conserva. Es el documento base e inexcusable que la APDP fiscalizará como primer paso ante cualquier investigación o denuncia.',
  },
  {
    id: 'beneficio-pyme-ley-20416',
    categoria: 'pyme',
    pregunta: '¿Cómo funciona el Beneficio Pyme para evitar multas millonarias?',
    respuesta: 'Conforme a la Ley 20.416 (Estatuto Pyme), las micro, pequeñas y medianas empresas que incurran en una primera infracción pueden solicitar que la sanción económica sea conmutada por una amonestación escrita con plazo para regularizar. Para que la APDP acoja este beneficio, la empresa debe acreditar que cuenta con un modelo de cumplimiento y su Registro RAT (Art. 14 ter).',
  },
  {
    id: 'plazo-bloqueo-2-dias',
    categoria: 'general',
    pregunta: '¿Cuál es el plazo para responder un Bloqueo Temporal de datos?',
    respuesta: 'El Art. 10 bis establece un plazo máximo improrrogable de 2 días hábiles para ejecutar el Bloqueo Temporal tras el reclamo de un titular. Durante este plazo, la empresa debe congelar técnica y operativamente el uso del dato hasta resolver la controversia.',
  },
  {
    id: 'monto-multas-utm',
    categoria: 'multas',
    pregunta: '¿Cuáles son las multas máximas que puede cursar la APDP?',
    respuesta: 'La ley contempla multas de hasta 5.000 UTM para infracciones leves, hasta 10.000 UTM para infracciones graves y hasta 20.000 UTM (o entre el 2% y 4% de los ingresos anuales por ventas) para infracciones gravísimas o en casos de reincidencia.',
  },
];
