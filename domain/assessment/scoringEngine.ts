import { DEFAULT_ASSESSMENT_CONFIG } from './assessmentRules';
import {
  AssessmentAnswerMap,
  AssessmentConfig,
  AssessmentLevel,
  AssessmentQuestion,
  AssessmentResult,
} from './types';

/**
 * Calcula el puntaje total sumando las ponderaciones de las preguntas marcadas como afirmativas.
 * Función pura: no contiene números fijos hardcodeados, itera sobre las preguntas provistas.
 */
export function calculateAssessmentScore(
  answers: AssessmentAnswerMap,
  questions: AssessmentQuestion[]
): number {
  return questions.reduce((total, question) => {
    return total + (answers[question.id] ? question.ponderacion : 0);
  }, 0);
}

/**
 * Evalúa el resultado cualitativo y las recomendaciones del diagnóstico
 * en base al puntaje obtenido y los umbrales configurados.
 */
export function evaluateAssessment(
  score: number,
  config: AssessmentConfig = DEFAULT_ASSESSMENT_CONFIG
): AssessmentResult {
  const { thresholds, resultTemplates, questions } = config;

  const maxScore = questions.reduce((acc, q) => acc + q.ponderacion, 0);

  let level: AssessmentLevel = 'Crítico';
  let template = resultTemplates.critico;

  if (score >= thresholds.avanzadoMin) {
    level = 'Avanzado';
    template = resultTemplates.avanzado;
  } else if (score >= thresholds.moderadoMin) {
    level = 'Moderado';
    template = resultTemplates.moderado;
  }

  return {
    score,
    maxScore,
    level,
    label: template.nivel,
    message: template.mensaje,
    color: template.color,
    recommendaciones: [...template.recomendaciones],
    isCompliant: level === 'Avanzado',
    unansweredCount: 0,
  };
}

/**
 * Ejecuta el diagnóstico completo a partir de un mapa de respuestas.
 */
export function runAssessment(
  answers: AssessmentAnswerMap,
  config: AssessmentConfig = DEFAULT_ASSESSMENT_CONFIG
): AssessmentResult {
  const score = calculateAssessmentScore(answers, config.questions);
  const result = evaluateAssessment(score, config);

  const answeredIds = Object.keys(answers);
  const unansweredCount = config.questions.filter((q) => !answeredIds.includes(q.id)).length;

  return {
    ...result,
    unansweredCount,
  };
}
