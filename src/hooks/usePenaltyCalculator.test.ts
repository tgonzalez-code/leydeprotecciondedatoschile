import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePenaltyCalculator } from './usePenaltyCalculator';

describe('hooks/usePenaltyCalculator', () => {
  it('inicializa con los valores por defecto esperados (grave, pyme=true, sin reincidencia)', () => {
    const { result } = renderHook(() => usePenaltyCalculator());

    expect(result.current.tipoInfraccion).toBe('grave');
    expect(result.current.esPyme).toBe(true);
    expect(result.current.esReincidente).toBe(false);
    expect(result.current.tieneRAT).toBe(false);
    expect(result.current.respondeBloqueo2Dias).toBe(false);
    expect(result.current.manejaDatosSensibles).toBe(true);

    // Valores derivados
    expect(result.current.resultado.maxUtm).toBe(10000);
    expect(result.current.resultado.aplicaBeneficioPyme).toBe(true);
    expect(result.current.detalleInfraccion.nombre).toBe('Infracción Grave');
  });

  it('permite actualizar el tipo de infracción a leves o gravísimas', () => {
    const { result } = renderHook(() => usePenaltyCalculator());

    act(() => {
      result.current.setTipoInfraccion('gravisima');
    });

    expect(result.current.tipoInfraccion).toBe('gravisima');
    expect(result.current.resultado.maxUtm).toBe(20000);
    expect(result.current.detalleInfraccion.nombre).toBe('Infracción Gravísima');

    act(() => {
      result.current.setTipoInfraccion('leve');
    });

    expect(result.current.tipoInfraccion).toBe('leve');
    expect(result.current.resultado.maxUtm).toBe(5000);
  });

  it('anula el beneficio Pyme si se marca reincidencia', () => {
    const { result } = renderHook(() => usePenaltyCalculator());

    expect(result.current.resultado.aplicaBeneficioPyme).toBe(true);

    act(() => {
      result.current.setEsReincidente(true);
    });

    expect(result.current.esReincidente).toBe(true);
    expect(result.current.resultado.aplicaBeneficioPyme).toBe(false);
  });

  it('actualiza factores de riesgo operativo y termómetro APDP', () => {
    const { result } = renderHook(() => usePenaltyCalculator());

    // Inicialmente sin RAT y con datos sensibles -> riesgo Crítico
    expect(result.current.resultado.nivelRiesgo).toBe('Crítico');

    // Al regularizar RAT y respuesta en 2 días, disminuye el riesgo
    act(() => {
      result.current.setTieneRAT(true);
      result.current.setRespondeBloqueo2Dias(true);
    });

    expect(result.current.tieneRAT).toBe(true);
    expect(result.current.respondeBloqueo2Dias).toBe(true);
    expect(result.current.resultado.puntosRiesgo).toBe(20);
    expect(result.current.resultado.nivelRiesgo).toBe('Controlado');
  });

  it('permite reiniciar el estado a los valores por defecto con reset()', () => {
    const { result } = renderHook(() => usePenaltyCalculator());

    act(() => {
      result.current.setTipoInfraccion('gravisima');
      result.current.setEsPyme(false);
      result.current.setEsReincidente(true);
      result.current.setTieneRAT(true);
    });

    expect(result.current.tipoInfraccion).toBe('gravisima');
    expect(result.current.esPyme).toBe(false);

    act(() => {
      result.current.reset();
    });

    expect(result.current.tipoInfraccion).toBe('grave');
    expect(result.current.esPyme).toBe(true);
    expect(result.current.esReincidente).toBe(false);
    expect(result.current.tieneRAT).toBe(false);
  });

  it('soporta opciones personalizadas de inicialización y UTM custom', () => {
    const { result } = renderHook(() =>
      usePenaltyCalculator({
        initialTipoInfraccion: 'leve',
        initialEsPyme: false,
        customUtmValue: 70000,
      })
    );

    expect(result.current.tipoInfraccion).toBe('leve');
    expect(result.current.esPyme).toBe(false);
    expect(result.current.resultado.montoMaximoCLP).toBe(5000 * 70000);
  });
});
