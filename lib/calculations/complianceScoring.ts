import { ASSESSMENT_RESULTS_CONTENT, ASSESSMENT_THRESHOLDS, COMPLIANCE_QUESTIONS } from '../../config/assessment.config';
import { DiagnosticoCumplimiento } from '../../types';

export function calcularPuntajeCumplimiento(respuestas: Record<string, boolean>): number {
  return COMPLIANCE_QUESTIONS.reduce((acc, p) => {
    return acc + (respuestas[p.id] ? p.ponderacion : 0);
  }, 0);
}

export function evaluarDiagnostico(puntaje: number): DiagnosticoCumplimiento {
  if (puntaje >= ASSESSMENT_THRESHOLDS.avanzadoMin) {
    return {
      ...ASSESSMENT_RESULTS_CONTENT.avanzado,
      puntaje,
    };
  }

  if (puntaje >= ASSESSMENT_THRESHOLDS.moderadoMin) {
    return {
      ...ASSESSMENT_RESULTS_CONTENT.moderado,
      puntaje,
    };
  }

  return {
    ...ASSESSMENT_RESULTS_CONTENT.critico,
    puntaje,
  };
}
