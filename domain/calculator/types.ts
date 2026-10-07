import { TipoInfraccion } from '../../types';

export type PenaltySeverity = TipoInfraccion;

export interface PenaltyInput {
  severity: PenaltySeverity;
  isPyme: boolean;
  isRepeatOffender: boolean;
  hasRat: boolean;
  respondsWithinDeadline: boolean;
  handlesSensitiveData: boolean;
}

export interface PenaltyLimitsConfig {
  leve: number;
  grave: number;
  gravisima: number;
}

export interface RiskWeightsConfig {
  sinRAT: number;
  sinBloqueo2Dias: number;
  conDatosSensibles: number;
  thresholds: {
    critico: number;
    medio: number;
  };
}

export interface PenaltyConfig {
  utmValue: number;
  penaltyLimits: PenaltyLimitsConfig;
  riskWeights: RiskWeightsConfig;
  pymeBenefitLaw: string;
}

export type RiskLevel = 'Controlado' | 'Medio' | 'Crítico';

export interface PenaltyResult {
  utmValueUsed: number;
  severity: PenaltySeverity;
  maxUtm: number;
  maxClp: number;
  appliesPymeBenefit: boolean;
  riskScore: number;
  riskLevel: RiskLevel;
  sanctionText: string;
  mitigatingFactorsSummary: string[];
}
