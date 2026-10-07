import { DEFAULT_PENALTY_CONFIG } from './penaltyRules';
import { PenaltyConfig, PenaltyInput, PenaltyResult, RiskLevel } from './types';

/**
 * Formatea un monto monetario en Pesos Chilenos (CLP).
 */
export function formatClp(amount: number): string {
  return `$${Math.round(amount).toLocaleString('es-CL')} CLP`;
}

/**
 * Formatea un valor en Unidades Tributarias Mensuales (UTM).
 */
export function formatUtm(utm: number): string {
  return `${utm.toLocaleString('es-CL')} UTM`;
}

/**
 * Motor de cálculo determinístico de sanciones y riesgo APDP (Ley Nº 21.719).
 *
 * Función 100% pura:
 * - Sin efectos secundarios
 * - Sin dependencias del DOM ni de React
 * - Parámetros de UTM y topes inyectables vía configuración
 */
export function calculatePenalty(
  input: PenaltyInput,
  config: PenaltyConfig = DEFAULT_PENALTY_CONFIG
): PenaltyResult {
  const { utmValue, penaltyLimits, riskWeights, pymeBenefitLaw } = config;

  const maxUtm = penaltyLimits[input.severity];
  const maxClp = Math.round(maxUtm * utmValue);

  // Puntos del termómetro de riesgo operativo
  let riskScore = 0;
  const mitigatingFactors: string[] = [];

  if (!input.hasRat) {
    riskScore += riskWeights.sinRAT;
  } else {
    mitigatingFactors.push('Cuenta con Registro RAT regularizado (Art. 14 ter)');
  }

  if (!input.respondsWithinDeadline) {
    riskScore += riskWeights.sinBloqueo2Dias;
  } else {
    mitigatingFactors.push('Capacidad de responder a Bloqueo Temporal en SLA de 2 días hábiles (Art. 10 bis)');
  }

  if (input.handlesSensitiveData) {
    riskScore += riskWeights.conDatosSensibles;
  }

  // Nivel de riesgo según umbrales de configuración
  let riskLevel: RiskLevel = 'Controlado';
  if (riskScore >= riskWeights.thresholds.critico) {
    riskLevel = 'Crítico';
  } else if (riskScore >= riskWeights.thresholds.medio) {
    riskLevel = 'Medio';
  }

  // Evaluación del beneficio Pyme (Ley 20.416 / Estatuto Pyme)
  const appliesPymeBenefit = input.isPyme && !input.isRepeatOffender;

  let sanctionText = '';
  if (appliesPymeBenefit) {
    if (input.hasRat) {
      sanctionText = `Amonestación Escrita (Beneficio Pyme ${pymeBenefitLaw} garantizado al contar con RAT acreditado).`;
    } else {
      sanctionText = `Riesgo de Multa Efectiva (Para acogerse al beneficio de ${pymeBenefitLaw}, la APDP exigirá regularizar de inmediato con el RAT).`;
    }
  } else {
    sanctionText = `Multa pecuniaria de hasta ${formatUtm(maxUtm)} (${formatClp(maxClp)}).`;
  }

  return {
    utmValueUsed: utmValue,
    severity: input.severity,
    maxUtm,
    maxClp,
    appliesPymeBenefit,
    riskScore,
    riskLevel,
    sanctionText,
    mitigatingFactorsSummary: mitigatingFactors,
  };
}
