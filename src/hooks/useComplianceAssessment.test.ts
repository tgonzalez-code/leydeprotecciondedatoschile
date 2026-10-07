import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useComplianceAssessment } from './useComplianceAssessment';

describe('hooks/useComplianceAssessment', () => {
  it('inicializa con el conjunto de respuestas por defecto y calcula el score inicial', () => {
    const { result } = renderHook(() => useComplianceAssessment());

    expect(result.current.respuestas).toBeDefined();
    expect(result.current.respuestas.rat).toBe(false);
    expect(result.current.respuestas.derechos_arcop).toBe(true);
    expect(result.current.respuestas.seguridad_tecnica).toBe(true);

    // Score inicial con derechos_arcop (15) + seguridad_tecnica (15) = 30
    expect(result.current.puntajeTotal).toBe(30);
    expect(result.current.diagnostico.categoria).toBe('Crítico');
    expect(result.current.esCumplidor).toBe(false);
    expect(result.current.totalPreguntas).toBe(6);
  });

  it('permite alternar respuestas con toggleRespuesta y recalcula score en tiempo real', () => {
    const { result } = renderHook(() => useComplianceAssessment());

    // Marcar rat (ponderacion 25)
    act(() => {
      result.current.toggleRespuesta('rat');
    });

    expect(result.current.respuestas.rat).toBe(true);
    // 30 + 25 = 55
    expect(result.current.puntajeTotal).toBe(55);
    expect(result.current.diagnostico.categoria).toBe('Moderado');
  });

  it('alcanza nivel Avanzado y estado cumplidor cuando se marcan todas las preguntas', () => {
    const { result } = renderHook(() => useComplianceAssessment());

    act(() => {
      result.current.setRespuesta('rat', true);
      result.current.setRespuesta('base_licitud', true);
      result.current.setRespuesta('bloqueo_2dias', true);
      result.current.setRespuesta('derechos_arcop', true);
      result.current.setRespuesta('seguridad_tecnica', true);
      result.current.setRespuesta('contratos_encargados', true);
    });

    expect(result.current.puntajeTotal).toBe(100);
    expect(result.current.diagnostico.categoria).toBe('Avanzado');
    expect(result.current.esCumplidor).toBe(true);
    expect(result.current.progresoPorcentaje).toBe(100);
  });

  it('calcula 0 puntos si todas las respuestas son falsas', () => {
    const { result } = renderHook(() =>
      useComplianceAssessment({
        initialAnswers: {
          rat: false,
          base_licitud: false,
          bloqueo_2dias: false,
          derechos_arcop: false,
          seguridad_tecnica: false,
          contratos_encargados: false,
        },
      })
    );

    expect(result.current.puntajeTotal).toBe(0);
    expect(result.current.diagnostico.categoria).toBe('Crítico');
    expect(result.current.progresoPorcentaje).toBe(0);
  });

  it('restablece las respuestas originales mediante resetRespuestas()', () => {
    const { result } = renderHook(() => useComplianceAssessment());

    act(() => {
      result.current.toggleRespuesta('rat');
      result.current.toggleRespuesta('derechos_arcop');
    });

    expect(result.current.respuestas.rat).toBe(true);
    expect(result.current.respuestas.derechos_arcop).toBe(false);

    act(() => {
      result.current.resetRespuestas();
    });

    expect(result.current.respuestas.rat).toBe(false);
    expect(result.current.respuestas.derechos_arcop).toBe(true);
    expect(result.current.puntajeTotal).toBe(30);
  });
});
