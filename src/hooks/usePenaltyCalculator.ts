import { useState, useMemo, useCallback } from 'react';
import { BUSINESS_CONFIG } from '../../config/business.config';
import { CALCULATOR_OPTIONS, INFRACCIONES_CONFIG } from '../../config/calculator.config';
import { calcularMultaAPDP, formatearCLP, formatearUTM } from '../../lib/calculations/utmCalculator';
import { calculatePenalty } from '../../domain/calculator/penaltyCalculator';
import { DEFAULT_PENALTY_CONFIG } from '../../domain/calculator/penaltyRules';
import { CalculoMultaResultado, TipoInfraccion } from '../../types';
import { PenaltyResult } from '../../domain/calculator/types';

export interface UsePenaltyCalculatorOptions {
  initialTipoInfraccion?: TipoInfraccion;
  initialEsPyme?: boolean;
  initialEsReincidente?: boolean;
  initialTieneRAT?: boolean;
  initialRespondeBloqueo2Dias?: boolean;
  initialManejaDatosSensibles?: boolean;
  customUtmValue?: number;
}

export interface UsePenaltyCalculatorReturn {
  // State
  tipoInfraccion: TipoInfraccion;
  esPyme: boolean;
  esReincidente: boolean;
  tieneRAT: boolean;
  respondeBloqueo2Dias: boolean;
  manejaDatosSensibles: boolean;

  // Setters & Actions
  setTipoInfraccion: (tipo: TipoInfraccion) => void;
  setEsPyme: (val: boolean) => void;
  setEsReincidente: (val: boolean) => void;
  setTieneRAT: (val: boolean) => void;
  setRespondeBloqueo2Dias: (val: boolean) => void;
  setManejaDatosSensibles: (val: boolean) => void;
  reset: () => void;

  // Domain Results & Computations
  resultado: CalculoMultaResultado;
  domainResult: PenaltyResult;
  detalleInfraccion: typeof INFRACCIONES_CONFIG[TipoInfraccion];

  // Config & Metadata
  options: typeof CALCULATOR_OPTIONS;
  utmOficialCLP: number;
  utmFuente: string;

  // Helpers
  formatCLP: (amount: number) => string;
  formatUTM: (utm: number) => string;
}

const DEFAULT_INITIAL_STATE = {
  tipoInfraccion: 'grave' as TipoInfraccion,
  esPyme: true,
  esReincidente: false,
  tieneRAT: false,
  respondeBloqueo2Dias: false,
  manejaDatosSensibles: true,
};

/**
 * Hook que desacopla el estado de la calculadora de multas APDP de la presentación visual.
 * Delega todos los cálculos a las funciones puras de src/domain/calculator.
 */
export function usePenaltyCalculator(
  options: UsePenaltyCalculatorOptions = {}
): UsePenaltyCalculatorReturn {
  const [tipoInfraccion, setTipoInfraccion] = useState<TipoInfraccion>(
    options.initialTipoInfraccion ?? DEFAULT_INITIAL_STATE.tipoInfraccion
  );
  const [esPyme, setEsPyme] = useState<boolean>(
    options.initialEsPyme ?? DEFAULT_INITIAL_STATE.esPyme
  );
  const [esReincidente, setEsReincidente] = useState<boolean>(
    options.initialEsReincidente ?? DEFAULT_INITIAL_STATE.esReincidente
  );
  const [tieneRAT, setTieneRAT] = useState<boolean>(
    options.initialTieneRAT ?? DEFAULT_INITIAL_STATE.tieneRAT
  );
  const [respondeBloqueo2Dias, setRespondeBloqueo2Dias] = useState<boolean>(
    options.initialRespondeBloqueo2Dias ?? DEFAULT_INITIAL_STATE.respondeBloqueo2Dias
  );
  const [manejaDatosSensibles, setManejaDatosSensibles] = useState<boolean>(
    options.initialManejaDatosSensibles ?? DEFAULT_INITIAL_STATE.manejaDatosSensibles
  );

  const utmOficialCLP = options.customUtmValue ?? BUSINESS_CONFIG.utm.valorOficialCLP;

  const reset = useCallback(() => {
    setTipoInfraccion(options.initialTipoInfraccion ?? DEFAULT_INITIAL_STATE.tipoInfraccion);
    setEsPyme(options.initialEsPyme ?? DEFAULT_INITIAL_STATE.esPyme);
    setEsReincidente(options.initialEsReincidente ?? DEFAULT_INITIAL_STATE.esReincidente);
    setTieneRAT(options.initialTieneRAT ?? DEFAULT_INITIAL_STATE.tieneRAT);
    setRespondeBloqueo2Dias(
      options.initialRespondeBloqueo2Dias ?? DEFAULT_INITIAL_STATE.respondeBloqueo2Dias
    );
    setManejaDatosSensibles(
      options.initialManejaDatosSensibles ?? DEFAULT_INITIAL_STATE.manejaDatosSensibles
    );
  }, [options]);

  // Delegación del cálculo al dominio (puro y determinístico)
  const resultado = useMemo<CalculoMultaResultado>(() => {
    return calcularMultaAPDP({
      tipoInfraccion,
      esPyme,
      esReincidente,
      tieneRAT,
      respondeBloqueo2Dias,
      manejaDatosSensibles,
      utmCustom: utmOficialCLP,
    });
  }, [
    tipoInfraccion,
    esPyme,
    esReincidente,
    tieneRAT,
    respondeBloqueo2Dias,
    manejaDatosSensibles,
    utmOficialCLP,
  ]);

  const domainResult = useMemo<PenaltyResult>(() => {
    return calculatePenalty(
      {
        severity: tipoInfraccion,
        isPyme: esPyme,
        isRepeatOffender: esReincidente,
        hasRat: tieneRAT,
        respondsWithinDeadline: respondeBloqueo2Dias,
        handlesSensitiveData: manejaDatosSensibles,
      },
      {
        ...DEFAULT_PENALTY_CONFIG,
        utmValue: utmOficialCLP,
      }
    );
  }, [
    tipoInfraccion,
    esPyme,
    esReincidente,
    tieneRAT,
    respondeBloqueo2Dias,
    manejaDatosSensibles,
    utmOficialCLP,
  ]);

  const detalleInfraccion = useMemo(() => {
    return INFRACCIONES_CONFIG[tipoInfraccion];
  }, [tipoInfraccion]);

  return {
    tipoInfraccion,
    esPyme,
    esReincidente,
    tieneRAT,
    respondeBloqueo2Dias,
    manejaDatosSensibles,
    setTipoInfraccion,
    setEsPyme,
    setEsReincidente,
    setTieneRAT,
    setRespondeBloqueo2Dias,
    setManejaDatosSensibles,
    reset,
    resultado,
    domainResult,
    detalleInfraccion,
    options: CALCULATOR_OPTIONS,
    utmOficialCLP,
    utmFuente: BUSINESS_CONFIG.utm.fuente,
    formatCLP: formatearCLP,
    formatUTM: formatearUTM,
  };
}
