import { CasoPractico } from '../types';

export const CASOS_PRACTICOS_PYMES: CasoPractico[] = [
  {
    titulo: 'Caso 1: Empresa de Servicios y Reloj Control Biométrico',
    rubro: 'Servicios de Aseo y Seguridad (35 trabajadores)',
    situacion: 'Implementaron reloj de asistencia por huella dactilar sin cláusula en contrato laboral ni registro formal en el RAT.',
    riesgo: 'La huella dactilar es un dato biométrico (categoría especial/sensible según Art. 2 y 16). Exige consentimiento específico o justificación estricta de proporcionalidad y medidas reforzadas de seguridad.',
    solucionRAT: 'En nuestro Agente RAT se clasifica automáticamente como dato biométrico laboral (Art. 13 letra a), documentando el fin legítimo y las medidas de cifrado para la APDP.',
  },
  {
    titulo: 'Caso 2: Tienda Online y Carrito Abandonado por WhatsApp',
    rubro: 'Ecommerce de Calzado y Accesorios',
    situacion: 'Enviaban mensajes promocionales y recordatorios por WhatsApp a números de clientes que no habían finalizado la compra.',
    riesgo: 'Si el cliente no dio consentimiento previo e informado (Art. 12) para prospección comercial por mensajería, puede formular una denuncia por spam ante la APDP.',
    solucionRAT: 'El Agente segrega la base de datos de marketing con base en Consentimiento (Art. 12) y establece el mecanismo de desuscripción obligatoria.',
  },
  {
    titulo: 'Caso 3: Ex-colaborador exige Bloqueo Temporal de sus Datos',
    rubro: 'Consultora de Ingeniería (12 personas)',
    situacion: 'Un ex-empleado en litigio laboral exigió por correo formal el Bloqueo Temporal de sus antecedentes personales.',
    riesgo: 'La empresa tardó 10 días hábiles en contestar. El SLA perentorio de la Ley 21.719 para Bloqueo Temporal es de sólo 2 DÍAS HÁBILES.',
    solucionRAT: 'Al tener el RAT al día, la empresa sabe de inmediato en qué carpetas y sistemas están los datos y ejecuta el bloqueo sin superar las 48 horas hábiles.',
  },
];
