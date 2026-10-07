import { TipoSolicitudARCO } from '../../types';

export type ArcopRightType = TipoSolicitudARCO;

export interface ArcopRightRule {
  type: ArcopRightType;
  article: string;
  slaDays: number;
  slaType: 'dias_habiles' | 'dias_corridos';
  slaLabel: string;
  isCritical: boolean;
  requiresImmediateSuspension: boolean;
}

/**
 * REGLAS DE NEGOCIO - DERECHOS ARCOP Y SLAS LEGALES
 *
 * NOTAS DE REVISIÓN LEGAL:
 * - LEGAL_REVIEW_REQUIRED: El Art. 10 bis fija "dos días hábiles" para el Bloqueo Temporal.
 *   El cómputo de días hábiles administrativos en Chile excluye sábados, domingos y festivos
 *   según la Ley 19.880. En la Fase 2 se implementará el calendario de feriados oficiales.
 */
export const ARCOP_SLA_RULES: Record<ArcopRightType, ArcopRightRule> = {
  'Bloqueo Temporal': {
    type: 'Bloqueo Temporal',
    article: 'Art. 10 bis',
    slaDays: 2,
    slaType: 'dias_habiles',
    slaLabel: '2 días hábiles (48h)',
    isCritical: true,
    requiresImmediateSuspension: true,
  },
  'Acceso': {
    type: 'Acceso',
    article: 'Art. 5',
    slaDays: 30,
    slaType: 'dias_corridos',
    slaLabel: '30 días corridos',
    isCritical: false,
    requiresImmediateSuspension: false,
  },
  'Rectificación': {
    type: 'Rectificación',
    article: 'Art. 6',
    slaDays: 30,
    slaType: 'dias_corridos',
    slaLabel: '30 días corridos',
    isCritical: false,
    requiresImmediateSuspension: false,
  },
  'Supresión': {
    type: 'Supresión',
    article: 'Art. 7',
    slaDays: 30,
    slaType: 'dias_corridos',
    slaLabel: '30 días corridos',
    isCritical: false,
    requiresImmediateSuspension: false,
  },
  'Oposición': {
    type: 'Oposición',
    article: 'Art. 8',
    slaDays: 30,
    slaType: 'dias_corridos',
    slaLabel: '30 días corridos',
    isCritical: false,
    requiresImmediateSuspension: false,
  },
  'Portabilidad': {
    type: 'Portabilidad',
    article: 'Art. 9',
    slaDays: 30,
    slaType: 'dias_corridos',
    slaLabel: '30 días corridos',
    isCritical: false,
    requiresImmediateSuspension: false,
  },
};
