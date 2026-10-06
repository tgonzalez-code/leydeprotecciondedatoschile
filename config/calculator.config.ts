import { InfraccionDetalle, TipoInfraccion } from '../types';
import { BUSINESS_CONFIG } from './business.config';

export const INFRACCIONES_CONFIG: Record<TipoInfraccion, InfraccionDetalle> = {
  leve: {
    tipo: 'leve',
    nombre: 'Infracción Leve',
    maxUtm: BUSINESS_CONFIG.sanciones.topeLeveUTM,
    articulos: 'Art. 41 letra a)',
    ejemplos: [
      'No mantener debidamente actualizado el Registro de Actividades de Tratamiento (RAT).',
      'Demoras menores sin perjuicio grave en la entrega de información ante solicitudes de acceso.',
      'No comunicar oportunamente modificaciones no sustanciales en las políticas de privacidad.',
    ],
  },
  grave: {
    tipo: 'grave',
    nombre: 'Infracción Grave',
    maxUtm: BUSINESS_CONFIG.sanciones.topeGraveUTM,
    articulos: 'Art. 41 letra b) y e)',
    ejemplos: [
      'Tratar datos personales sin base de licitud (sin consentimiento expreso ni relación contractual).',
      'No contar con el Registro de Actividades de Tratamiento (RAT - Art. 14 ter obligatorio).',
      'Incumplir el plazo perentorio de 2 días hábiles para el Bloqueo Temporal (Art. 10 bis).',
      'Traspasar bases de datos a proveedores sin contrato con cláusula de encargado de tratamiento.',
    ],
  },
  gravisima: {
    tipo: 'gravisima',
    nombre: 'Infracción Gravísima',
    maxUtm: BUSINESS_CONFIG.sanciones.topeGravisimaUTM,
    articulos: 'Art. 41 letra c)',
    ejemplos: [
      'Fuga masiva de datos sensibles (salud, biometría, datos financieros, RUT) por negligencia grave.',
      'Venta o comercialización no autorizada de bases de datos de clientes o trabajadores.',
      'Desacato deliberado y reiterado de instrucciones, fiscalizaciones o medidas cautelares de la APDP.',
    ],
  },
};

export const CALCULATOR_OPTIONS = [
  { key: 'leve' as TipoInfraccion, label: 'Leve', utm: `Hasta ${BUSINESS_CONFIG.sanciones.topeLeveUTM.toLocaleString('es-CL')} UTM` },
  { key: 'grave' as TipoInfraccion, label: 'Grave', utm: `Hasta ${BUSINESS_CONFIG.sanciones.topeGraveUTM.toLocaleString('es-CL')} UTM` },
  { key: 'gravisima' as TipoInfraccion, label: 'Gravísima', utm: `Hasta ${BUSINESS_CONFIG.sanciones.topeGravisimaUTM.toLocaleString('es-CL')} UTM` },
];

export const CALCULATOR_RISK_WEIGHTS = {
  sinRAT: 40,
  sinBloqueo2Dias: 30,
  conDatosSensibles: 20,
  thresholds: {
    critico: 60,
    medio: 30,
  },
};
