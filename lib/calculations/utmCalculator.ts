import { BUSINESS_CONFIG } from '../../config/business.config';
import { CALCULATOR_RISK_WEIGHTS, INFRACCIONES_CONFIG } from '../../config/calculator.config';
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
  return `$${Math.round(monto).toLocaleString('es-CL')} CLP`;
}

export function formatearUTM(utm: number): string {
  return `${utm.toLocaleString('es-CL')} UTM`;
}

export function calcularMultaAPDP(params: ParametrosCalculoMulta): CalculoMultaResultado {
  const utmOficial = params.utmCustom ?? BUSINESS_CONFIG.utm.valorOficialCLP;
  const configInfraccion = INFRACCIONES_CONFIG[params.tipoInfraccion];
  const maxUtm = configInfraccion.maxUtm;
  const montoMaximoCLP = maxUtm * utmOficial;

  // Cálculo de puntos de riesgo
  const { sinRAT, sinBloqueo2Dias, conDatosSensibles, thresholds } = CALCULATOR_RISK_WEIGHTS;
  const puntosRiesgo = 
    (!params.tieneRAT ? sinRAT : 0) + 
    (!params.respondeBloqueo2Dias ? sinBloqueo2Dias : 0) + 
    (params.manejaDatosSensibles ? conDatosSensibles : 0);

  let nivelRiesgo: 'Controlado' | 'Medio' | 'Crítico' = 'Controlado';
  if (puntosRiesgo >= thresholds.critico) {
    nivelRiesgo = 'Crítico';
  } else if (puntosRiesgo >= thresholds.medio) {
    nivelRiesgo = 'Medio';
  }

  // Evaluación de Beneficio Pyme (Ley 20.416)
  const aplicaBeneficioPyme = params.esPyme && !params.esReincidente;
  let sancionEstimadaTexto = '';

  if (aplicaBeneficioPyme) {
    sancionEstimadaTexto = params.tieneRAT
      ? 'Amonestación Escrita (Beneficio Pyme Ley 20.416 garantizado al contar con RAT).'
      : 'Riesgo de Multa Efectiva (Para invocar Beneficio Pyme la APDP exigirá regularizar con RAT de inmediato).';
  } else {
    sancionEstimadaTexto = `Multa pecuniaria de hasta ${formatearUTM(maxUtm)} (${formatearCLP(montoMaximoCLP)}).`;
  }

  return {
    utmOficial,
    tipoInfraccion: params.tipoInfraccion,
    maxUtm,
    montoMaximoCLP,
    aplicaBeneficioPyme,
    esReincidente: params.esReincidente,
    puntosRiesgo,
    nivelRiesgo,
    tieneRAT: params.tieneRAT,
    respondeBloqueo2Dias: params.respondeBloqueo2Dias,
    manejaDatosSensibles: params.manejaDatosSensibles,
    sancionEstimadaTexto,
  };
}
