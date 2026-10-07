import { useState, useMemo, useCallback } from 'react';
import { COMPLIANCE_QUESTIONS } from '../../config/assessment.config';
import { DEFAULT_ASSESSMENT_CONFIG } from '../../domain/assessment/assessmentRules';
import {
  calculateAssessmentScore,
  evaluateAssessment,
} from '../../domain/assessment/scoringEngine';
import {
  AssessmentConfig,
  AssessmentQuestion,
  AssessmentResult,
} from '../../domain/assessment/types';
import { DiagnosticoCumplimiento } from '../../types';

export interface UseComplianceAssessmentOptions {
  initialAnswers?: Record<string, boolean>;
  config?: AssessmentConfig;
}

export interface UseComplianceAssessmentReturn {
  // State
  respuestas: Record<string, boolean>;

  // Actions
  toggleRespuesta: (id: string) => void;
  setRespuesta: (id: string, value: boolean) => void;
  resetRespuestas: () => void;

  // Domain derived results
  puntajeTotal: number;
  evaluacion: AssessmentResult;
  diagnostico: DiagnosticoCumplimiento;

  // Questions & metadata
  preguntas: AssessmentQuestion[];
  totalPreguntas: number;
  afirmativasCount: number;
  progresoPorcentaje: number;
  esCumplidor: boolean;
}

const DEFAULT_INITIAL_ANSWERS: Record<string, boolean> = {
  rat: false,
  base_licitud: false,
  bloqueo_2dias: false,
  derechos_arcop: true,
  seguridad_tecnica: true,
  contratos_encargados: false,
};

/**
 * Hook que encapsula el estado reactivo del cuestionario de evaluación de cumplimiento.
 * El cálculo del puntaje y los diagnósticos regulatorios se delegan a src/domain/assessment.
 */
export function useComplianceAssessment(
  options: UseComplianceAssessmentOptions = {}
): UseComplianceAssessmentReturn {
  const assessmentConfig = options.config ?? DEFAULT_ASSESSMENT_CONFIG;
  const questions = assessmentConfig.questions ?? COMPLIANCE_QUESTIONS;

  const [respuestas, setRespuestas] = useState<Record<string, boolean>>(
    options.initialAnswers ?? DEFAULT_INITIAL_ANSWERS
  );

  const toggleRespuesta = useCallback((id: string) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const setRespuesta = useCallback((id: string, value: boolean) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const resetRespuestas = useCallback(() => {
    setRespuestas(options.initialAnswers ?? DEFAULT_INITIAL_ANSWERS);
  }, [options.initialAnswers]);

  // Delegación del cálculo al motor de scoring del dominio
  const puntajeTotal = useMemo(() => {
    return calculateAssessmentScore(respuestas, questions);
  }, [respuestas, questions]);

  const evaluacion = useMemo<AssessmentResult>(() => {
    return evaluateAssessment(puntajeTotal, assessmentConfig);
  }, [puntajeTotal, assessmentConfig]);

  const diagnostico = useMemo<DiagnosticoCumplimiento>(() => {
    return {
      nivel: evaluacion.label,
      categoria: evaluacion.level,
      color: evaluacion.color,
      mensaje: evaluacion.message,
      puntaje: evaluacion.score,
      recomendaciones: evaluacion.recommendaciones,
    };
  }, [evaluacion]);

  const afirmativasCount = useMemo(() => {
    return Object.values(respuestas).filter(Boolean).length;
  }, [respuestas]);

  const totalPreguntas = questions.length;

  const progresoPorcentaje = useMemo(() => {
    if (totalPreguntas === 0) return 0;
    return Math.round((afirmativasCount / totalPreguntas) * 100);
  }, [afirmativasCount, totalPreguntas]);

  return {
    respuestas,
    toggleRespuesta,
    setRespuesta,
    resetRespuestas,
    puntajeTotal,
    evaluacion,
    diagnostico,
    preguntas: questions,
    totalPreguntas,
    afirmativasCount,
    progresoPorcentaje,
    esCumplidor: evaluacion.isCompliant,
  };
}
