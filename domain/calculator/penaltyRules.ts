import { BUSINESS_CONFIG } from '../../config/business.config';
import { CALCULATOR_RISK_WEIGHTS } from '../../config/calculator.config';
import { PenaltyConfig } from './types';

/**
 * REGLAS DE NEGOCIO Y CONFIGURACIÓN PREDETERMINADA - SANCIONES APDP
 *
 * NOTAS DE REVISIÓN LEGAL:
 * - LEGAL_REVIEW_REQUIRED: Graduación intermedia de multas según atenuantes del Art. 43
 *   (cooperación, programas de cumplimiento previos, autodenuncia).
 *   Actualmente se modela el tope legal máximo de cada escala.
 *
 * - TODO / BUSINESS_RULE_PENDING_REVIEW: Sanción alternativa del 2% al 4% de ingresos
 *   anuales por ventas del ejercicio anterior para infracciones gravísimas o reincidencia
 *   (Ley 21.719 Art. 42). Pendiente de requerir facturación anual a la empresa.
 */

export const DEFAULT_PENALTY_CONFIG: PenaltyConfig = {
  utmValue: BUSINESS_CONFIG.utm.valorOficialCLP,
  penaltyLimits: {
    leve: BUSINESS_CONFIG.sanciones.topeLeveUTM,
    grave: BUSINESS_CONFIG.sanciones.topeGraveUTM,
    gravisima: BUSINESS_CONFIG.sanciones.topeGravisimaUTM,
  },
  riskWeights: {
    sinRAT: CALCULATOR_RISK_WEIGHTS.sinRAT,
    sinBloqueo2Dias: CALCULATOR_RISK_WEIGHTS.sinBloqueo2Dias,
    conDatosSensibles: CALCULATOR_RISK_WEIGHTS.conDatosSensibles,
    thresholds: {
      critico: CALCULATOR_RISK_WEIGHTS.thresholds.critico,
      medio: CALCULATOR_RISK_WEIGHTS.thresholds.medio,
    },
  },
  pymeBenefitLaw: BUSINESS_CONFIG.beneficioPyme.leyNumero,
};
