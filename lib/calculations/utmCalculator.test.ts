import { describe, expect, it } from 'vitest';
import { calcularMultaAPDP, formatearCLP, formatearUTM } from './utmCalculator';

describe('lib/calculations/utmCalculator (Compatibility Layer)', () => {
  it('formatea CLP y UTM correctamente a través de adaptadores', () => {
    expect(formatearCLP(67294)).toContain('67.294');
    expect(formatearUTM(5000)).toContain('5.000');
  });

  it('ejecuta calcularMultaAPDP con parámetros y devuelve estructura esperada', () => {
    const res = calcularMultaAPDP({
      tipoInfraccion: 'grave',
      esPyme: true,
      esReincidente: false,
      tieneRAT: true,
      respondeBloqueo2Dias: true,
      manejaDatosSensibles: false,
    });

    expect(res.maxUtm).toBe(10000);
    expect(res.aplicaBeneficioPyme).toBe(true);
    expect(res.nivelRiesgo).toBe('Controlado');
  });
});
