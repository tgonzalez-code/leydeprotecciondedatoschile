import { DEFAULT_PENALTY_CONFIG } from '../../domain/calculator/penaltyRules';
import {
  calculatePenalty,
  formatClp,
  formatUtm,
} from '../../domain/calculator/penaltyCalculator';
import { CalculoMultaResultado, TipoInfraccion } from '../../types';

export interface ParametrosCalculoMulta {
  tipoInfraccion: TipoInfraccion;
  esPyme: boolean;
  esReincidente: boolean;
  tieneRAT: boolean;
  respondeBloqueo2Dias: boolean;
  manejaDatosSensibles: boolean;
  utmCustom?: number;
}

export function formatearCLP(monto: number): string {
  return formatClp(monto);
}

export function formatearUTM(utm: number): string {
  return formatUtm(utm);
}

export function calcularMultaAPDP(params: ParametrosCalculoMulta): CalculoMultaResultado {
  const config = params.utmCustom
    ? { ...DEFAULT_PENALTY_CONFIG, utmValue: params.utmCustom }
    : DEFAULT_PENALTY_CONFIG;

  const result = calculatePenalty(
    {
      severity: params.tipoInfraccion,
      isPyme: params.esPyme,
      isRepeatOffender: params.esReincidente,
      hasRat: params.tieneRAT,
      respondsWithinDeadline: params.respondeBloqueo2Dias,
      handlesSensitiveData: params.manejaDatosSensibles,
    },
    config
  );

  return {
    utmOficial: result.utmValueUsed,
    tipoInfraccion: result.severity,
    maxUtm: result.maxUtm,
    montoMaximoCLP: result.maxClp,
    aplicaBeneficioPyme: result.appliesPymeBenefit,
    esReincidente: params.esReincidente,
    puntosRiesgo: result.riskScore,
    nivelRiesgo: result.riskLevel,
    tieneRAT: params.tieneRAT,
    respondeBloqueo2Dias: params.respondeBloqueo2Dias,
    manejaDatosSensibles: params.manejaDatosSensibles,
    sancionEstimadaTexto: result.sanctionText,
  };
}
