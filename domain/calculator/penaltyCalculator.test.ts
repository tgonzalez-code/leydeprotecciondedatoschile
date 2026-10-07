import { describe, expect, it } from 'vitest';
import { calculatePenalty, formatClp, formatUtm } from './penaltyCalculator';
import { DEFAULT_PENALTY_CONFIG } from './penaltyRules';
import { PenaltyConfig, PenaltyInput } from './types';

describe('domain/calculator/penaltyCalculator', () => {
  const baseInput: PenaltyInput = {
    severity: 'grave',
    isPyme: true,
    isRepeatOffender: false,
    hasRat: false,
    respondsWithinDeadline: false,
    handlesSensitiveData: true,
  };

  describe('Cálculo de montos en UTM y CLP según gravedad', () => {
    it('calcula correctamente la sanción para infracción leve (5.000 UTM)', () => {
      const result = calculatePenalty({ ...baseInput, severity: 'leve' });
      expect(result.maxUtm).toBe(5000);
      expect(result.maxClp).toBe(5000 * DEFAULT_PENALTY_CONFIG.utmValue);
      expect(result.severity).toBe('leve');
    });

    it('calcula correctamente la sanción para infracción grave (10.000 UTM)', () => {
      const result = calculatePenalty({ ...baseInput, severity: 'grave' });
      expect(result.maxUtm).toBe(10000);
      expect(result.maxClp).toBe(10000 * DEFAULT_PENALTY_CONFIG.utmValue);
      expect(result.severity).toBe('grave');
    });

    it('calcula correctamente la sanción para infracción gravísima (20.000 UTM)', () => {
      const result = calculatePenalty({ ...baseInput, severity: 'gravisima' });
      expect(result.maxUtm).toBe(20000);
      expect(result.maxClp).toBe(20000 * DEFAULT_PENALTY_CONFIG.utmValue);
      expect(result.severity).toBe('gravisima');
    });
  });

  describe('Parametrización dinámica del valor UTM', () => {
    it('respeta un valor de UTM personalizado inyectado en configuración', () => {
      const customConfig: PenaltyConfig = {
        ...DEFAULT_PENALTY_CONFIG,
        utmValue: 70000,
      };

      const result = calculatePenalty({ ...baseInput, severity: 'leve' }, customConfig);
      expect(result.utmValueUsed).toBe(70000);
      expect(result.maxUtm).toBe(5000);
      expect(result.maxClp).toBe(350000000); // 5.000 * 70.000
    });

    it('funciona con valor de UTM hipotético alternativo', () => {
      const customConfig: PenaltyConfig = {
        ...DEFAULT_PENALTY_CONFIG,
        utmValue: 50000,
      };

      const result = calculatePenalty({ ...baseInput, severity: 'grave' }, customConfig);
      expect(result.maxClp).toBe(500000000); // 10.000 * 50.000
    });
  });

  describe('Reglas del Beneficio Pyme (Ley 20.416)', () => {
    it('concede beneficio de amonestación si es Pyme y NO es reincidente', () => {
      const result = calculatePenalty({
        ...baseInput,
        isPyme: true,
        isRepeatOffender: false,
        hasRat: true,
      });

      expect(result.appliesPymeBenefit).toBe(true);
      expect(result.sanctionText).toContain('Amonestación Escrita');
      expect(result.sanctionText).toContain('Ley Nº 20.416');
    });

    it('advierte sobre riesgo de multa si es Pyme pero NO cuenta con RAT acreditado', () => {
      const result = calculatePenalty({
        ...baseInput,
        isPyme: true,
        isRepeatOffender: false,
        hasRat: false,
      });

      expect(result.appliesPymeBenefit).toBe(true);
      expect(result.sanctionText).toContain('Riesgo de Multa Efectiva');
    });

    it('deniega el beneficio Pyme si la empresa es reincidente en 24 meses', () => {
      const result = calculatePenalty({
        ...baseInput,
        isPyme: true,
        isRepeatOffender: true,
      });

      expect(result.appliesPymeBenefit).toBe(false);
      expect(result.sanctionText).toContain('Multa pecuniaria de hasta');
    });

    it('deniega el beneficio Pyme si la empresa es Gran Empresa (isPyme = false)', () => {
      const result = calculatePenalty({
        ...baseInput,
        isPyme: false,
        isRepeatOffender: false,
      });

      expect(result.appliesPymeBenefit).toBe(false);
      expect(result.sanctionText).toContain('Multa pecuniaria de hasta');
    });
  });

  describe('Termómetro de Riesgo Operativo y Factores de Control', () => {
    it('asigna riesgo Crítico cuando faltan todos los controles (score >= 60)', () => {
      const result = calculatePenalty({
        ...baseInput,
        hasRat: false, // +40
        respondsWithinDeadline: false, // +30
        handlesSensitiveData: true, // +20 = 90
      });

      expect(result.riskScore).toBe(90);
      expect(result.riskLevel).toBe('Crítico');
    });

    it('asigna riesgo Medio con puntaje intermedio (30 <= score < 60)', () => {
      const result = calculatePenalty({
        ...baseInput,
        hasRat: true, // 0
        respondsWithinDeadline: false, // +30
        handlesSensitiveData: false, // 0 = 30
      });

      expect(result.riskScore).toBe(30);
      expect(result.riskLevel).toBe('Medio');
    });

    it('asigna riesgo Controlado cuando los controles esenciales están adoptados (score < 30)', () => {
      const result = calculatePenalty({
        ...baseInput,
        hasRat: true, // 0
        respondsWithinDeadline: true, // 0
        handlesSensitiveData: true, // +20 = 20
      });

      expect(result.riskScore).toBe(20);
      expect(result.riskLevel).toBe('Controlado');
    });
  });

  describe('Utilidades de formateo', () => {
    it('formatea montos en pesos chilenos correctamente', () => {
      expect(formatClp(67294)).toContain('67.294');
      expect(formatClp(67294)).toContain('CLP');
    });

    it('formatea valores en UTM correctamente', () => {
      expect(formatUtm(10000)).toContain('10.000 UTM');
    });
  });

  describe('Determinismo e Inmutabilidad', () => {
    it('devuelve el mismo resultado para las mismas entradas sin alterar el input', () => {
      const inputCopy = { ...baseInput };
      const res1 = calculatePenalty(baseInput);
      const res2 = calculatePenalty(baseInput);
      expect(res1).toEqual(res2);
      expect(baseInput).toEqual(inputCopy);
    });
  });
});
