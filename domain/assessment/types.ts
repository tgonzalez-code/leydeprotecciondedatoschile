export interface AssessmentQuestion {
  id: string;
  pregunta: string;
  articulos: string;
  ponderacion: number;
  consejo: string;
}

export type AssessmentAnswerMap = Record<string, boolean>;

export interface AssessmentThresholds {
  avanzadoMin: number;
  moderadoMin: number;
}

export type AssessmentLevel = 'Avanzado' | 'Moderado' | 'Crítico';

export interface AssessmentLevelTemplate {
  nivel: AssessmentLevel;
  mensaje: string;
  color: string;
  recomendaciones: string[];
}

export interface AssessmentResultTemplates {
  avanzado: AssessmentLevelTemplate;
  moderado: AssessmentLevelTemplate;
  critico: AssessmentLevelTemplate;
}

export interface AssessmentConfig {
  questions: AssessmentQuestion[];
  thresholds: AssessmentThresholds;
  resultTemplates: AssessmentResultTemplates;
}

export interface AssessmentResult {
  score: number;
  maxScore: number;
  level: AssessmentLevel;
  label: string;
  message: string;
  color: string;
  recommendaciones: string[];
  isCompliant: boolean;
  unansweredCount: number;
}
