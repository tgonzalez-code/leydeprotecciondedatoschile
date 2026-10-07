import {
  ASSESSMENT_RESULTS_CONTENT,
  ASSESSMENT_THRESHOLDS,
  COMPLIANCE_QUESTIONS,
} from '../../config/assessment.config';
import { AssessmentConfig } from './types';

/**
 * REGLAS DE NEGOCIO Y CONFIGURACIÓN PREDETERMINADA - TEST DE CUMPLIMIENTO
 *
 * NOTAS DE REVISIÓN LEGAL:
 * - LEGAL_REVIEW_REQUIRED: Ponderación de la Ley 21.663 (Ciberseguridad) frente a
 *   las obligaciones estrictas de la Ley 21.719. Se mantiene actualmente con peso de 15 puntos.
 *
 * - TODO / BUSINESS_RULE_PENDING_REVIEW: En compliance legal estricto, la falta del RAT (Art. 14 ter)
 *   o de base de licitud (Art. 12/13) debería considerarse factor descalificatorio crítico automático
 *   en lugar de una resta puramente lineal de puntos.
 *   Se preserva temporalmente el modelo de suma lineal hasta la Fase 2 de revisión legal.
 */

export const DEFAULT_ASSESSMENT_CONFIG: AssessmentConfig = {
  questions: COMPLIANCE_QUESTIONS,
  thresholds: {
    avanzadoMin: ASSESSMENT_THRESHOLDS.avanzadoMin,
    moderadoMin: ASSESSMENT_THRESHOLDS.moderadoMin,
  },
  resultTemplates: {
    avanzado: {
      nivel: 'Avanzado',
      mensaje: ASSESSMENT_RESULTS_CONTENT.avanzado.mensaje,
      color: ASSESSMENT_RESULTS_CONTENT.avanzado.color,
      recomendaciones: ASSESSMENT_RESULTS_CONTENT.avanzado.recomendaciones,
    },
    moderado: {
      nivel: 'Moderado',
      mensaje: ASSESSMENT_RESULTS_CONTENT.moderado.mensaje,
      color: ASSESSMENT_RESULTS_CONTENT.moderado.color,
      recomendaciones: ASSESSMENT_RESULTS_CONTENT.moderado.recomendaciones,
    },
    critico: {
      nivel: 'Crítico',
      mensaje: ASSESSMENT_RESULTS_CONTENT.critico.mensaje,
      color: ASSESSMENT_RESULTS_CONTENT.critico.color,
      recomendaciones: ASSESSMENT_RESULTS_CONTENT.critico.recomendaciones,
    },
  },
};
