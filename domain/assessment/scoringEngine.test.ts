import { describe, expect, it } from 'vitest';
import { DEFAULT_ASSESSMENT_CONFIG } from './assessmentRules';
import {
  calculateAssessmentScore,
  evaluateAssessment,
  runAssessment,
} from './scoringEngine';
import { AssessmentAnswerMap, AssessmentConfig, AssessmentQuestion } from './types';

describe('domain/assessment/scoringEngine', () => {
  const sampleQuestions: AssessmentQuestion[] = [
    { id: 'q1', pregunta: 'P1', articulos: 'Art. 1', ponderacion: 20, consejo: 'C1' },
    { id: 'q2', pregunta: 'P2', articulos: 'Art. 2', ponderacion: 25, consejo: 'C2' },
    { id: 'q3', pregunta: 'P3', articulos: 'Art. 3', ponderacion: 15, consejo: 'C3' },
    { id: 'q4', pregunta: 'P4', articulos: 'Art. 4', ponderacion: 40, consejo: 'C4' },
  ]; // Suma total = 100

  const sampleConfig: AssessmentConfig = {
    ...DEFAULT_ASSESSMENT_CONFIG,
    questions: sampleQuestions,
    thresholds: {
      avanzadoMin: 80,
      moderadoMin: 45,
    },
  };

  describe('Cálculo de puntaje (calculateAssessmentScore)', () => {
    it('devuelve 0 puntos cuando todas las respuestas son falsas', () => {
      const answers: AssessmentAnswerMap = { q1: false, q2: false, q3: false, q4: false };
      expect(calculateAssessmentScore(answers, sampleQuestions)).toBe(0);
    });

    it('devuelve 100 puntos cuando todas las respuestas son verdaderas', () => {
      const answers: AssessmentAnswerMap = { q1: true, q2: true, q3: true, q4: true };
      expect(calculateAssessmentScore(answers, sampleQuestions)).toBe(100);
    });

    it('calcula puntaje intermedio sumando ponderaciones correctas', () => {
      const answers: AssessmentAnswerMap = { q1: true, q2: false, q3: true, q4: false };
      // q1 (20) + q3 (15) = 35
      expect(calculateAssessmentScore(answers, sampleQuestions)).toBe(35);
    });

    it('trata preguntas no respondidas como falsas (0 puntos)', () => {
      const answers: AssessmentAnswerMap = { q1: true }; // solo q1
      expect(calculateAssessmentScore(answers, sampleQuestions)).toBe(20);
    });
  });

  describe('Evaluación de umbrales y niveles (evaluateAssessment)', () => {
    it('clasifica como Crítico si el puntaje es menor que 45 (ej: 0, 44)', () => {
      const res0 = evaluateAssessment(0, sampleConfig);
      expect(res0.level).toBe('Crítico');
      expect(res0.isCompliant).toBe(false);

      const res44 = evaluateAssessment(44, sampleConfig);
      expect(res44.level).toBe('Crítico');
      expect(res44.isCompliant).toBe(false);
    });

    it('clasifica exactamente en el límite de Moderado (puntaje = 45)', () => {
      const res45 = evaluateAssessment(45, sampleConfig);
      expect(res45.level).toBe('Moderado');
      expect(res45.isCompliant).toBe(false);
    });

    it('clasifica en el límite superior de Moderado (puntaje = 79)', () => {
      const res79 = evaluateAssessment(79, sampleConfig);
      expect(res79.level).toBe('Moderado');
      expect(res79.isCompliant).toBe(false);
    });

    it('clasifica exactamente en el límite de Avanzado (puntaje = 80)', () => {
      const res80 = evaluateAssessment(80, sampleConfig);
      expect(res80.level).toBe('Avanzado');
      expect(res80.isCompliant).toBe(true);
    });

    it('clasifica como Avanzado con 100 puntos', () => {
      const res100 = evaluateAssessment(100, sampleConfig);
      expect(res100.level).toBe('Avanzado');
      expect(res100.isCompliant).toBe(true);
      expect(res100.recommendaciones.length).toBeGreaterThan(0);
    });
  });

  describe('Ejecución unificada del diagnóstico (runAssessment)', () => {
    it('ejecuta correctamente el diagnóstico con preguntas por defecto del sistema', () => {
      const allTrueAnswers: AssessmentAnswerMap = {};
      DEFAULT_ASSESSMENT_CONFIG.questions.forEach((q) => {
        allTrueAnswers[q.id] = true;
      });

      const result = runAssessment(allTrueAnswers);
      expect(result.score).toBe(100);
      expect(result.level).toBe('Avanzado');
      expect(result.isCompliant).toBe(true);
      expect(result.unansweredCount).toBe(0);
    });

    it('calcula la cantidad de preguntas sin responder', () => {
      const partialAnswers: AssessmentAnswerMap = {
        [DEFAULT_ASSESSMENT_CONFIG.questions[0].id]: true,
      };

      const result = runAssessment(partialAnswers);
      expect(result.unansweredCount).toBe(DEFAULT_ASSESSMENT_CONFIG.questions.length - 1);
    });
  });

  describe('Inyección de configuración personalizada (desacoplamiento total)', () => {
    it('obedece a umbrales personalizados sin depender de números fijos', () => {
      const customConfig: AssessmentConfig = {
        ...sampleConfig,
        thresholds: {
          avanzadoMin: 90, // umbral más estricto
          moderadoMin: 60,
        },
      };

      // Un puntaje de 80 con el umbral default es Avanzado, pero con el personalizado es Moderado
      const res80 = evaluateAssessment(80, customConfig);
      expect(res80.level).toBe('Moderado');

      // Un puntaje de 50 con el umbral default es Moderado, pero con el personalizado es Crítico
      const res50 = evaluateAssessment(50, customConfig);
      expect(res50.level).toBe('Crítico');
    });
  });
});
