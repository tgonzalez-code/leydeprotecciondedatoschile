import { DEFAULT_ASSESSMENT_CONFIG } from '../../domain/assessment/assessmentRules';
import {
  calculateAssessmentScore,
  evaluateAssessment,
} from '../../domain/assessment/scoringEngine';
import { DiagnosticoCumplimiento } from '../../types';

export function calcularPuntajeCumplimiento(respuestas: Record<string, boolean>): number {
  return calculateAssessmentScore(respuestas, DEFAULT_ASSESSMENT_CONFIG.questions);
}

export function evaluarDiagnostico(puntaje: number): DiagnosticoCumplimiento {
  const result = evaluateAssessment(puntaje, DEFAULT_ASSESSMENT_CONFIG);

  return {
    nivel: result.label,
    categoria: result.level,
    mensaje: result.message,
    color: result.color,
    recomendaciones: result.recommendaciones,
    puntaje: result.score,
  };
}
