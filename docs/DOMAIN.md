# Arquitectura de Dominio (Domain Layer) — Ley 21.719 LegalTech

Este documento describe la capa de negocio pura ubicada en `src/domain/` (accesible en `/domain`).

## 1. Principio Fundamental de Aislamiento

La capa `domain/` es 100% agnóstica de frameworks de presentación y de interfaces gráficas:
- **Cero dependencias** de React, JSX, Hooks, DOM o LocalStorage.
- **Determinismo matemático y legal**: dada la misma entrada y configuración, produce exactamente la misma salida sin mutar el estado exterior.
- **Ejecución universal**: se ejecuta tanto en Node.js, CLI, Web Workers, como en el navegador.

```
CONTENT → CONFIG → DOMAIN → SERVICES → HOOKS → COMPONENTS → UI
```

## 2. Módulos de Dominio

### 2.1 Calculadora de Multas y Sanciones (`src/domain/calculator/`)
- **`penaltyCalculator.ts`**: Motor puro de proyección de multas APDP.
  - Sanciones máximas según gravedad: Leve (5.000 UTM), Grave (10.000 UTM), Gravísima (20.000 UTM).
  - Ponderación de atenuantes y agravantes (Registro RAT, SLA de bloqueo en 2 días hábiles, manejo de datos sensibles).
  - Aplicación del Estatuto Pyme (Ley Nº 20.416, sustitución por amonestación escrita condicionada a regularización inmediata con RAT).
  - Parámetro dinámico e inyectable de valor UTM (por defecto oficial SII/Banco Central).
- **`penaltyRules.ts`**: Definición inmutable de límites sancionatorios, umbrales y reglas legales.
- **`types.ts`**: Tipos estrictos para inputs, configuración y resultados.

> **LEGAL_REVIEW_REQUIRED / BUSINESS_RULE_PENDING_REVIEW**:
> El artículo 16 ter / sanciones agravadas por reincidencia gravísima que contempla un tope alternativo entre el 2% y 4% de las ventas anuales para grandes empresas no está modelado en esta fase inicial para evitar inventar fórmulas sin validación fiscal y contable. Se preserva el comportamiento actual de la plataforma en UTM.

### 2.2 Diagnóstico y Evaluación de Cumplimiento (`src/domain/assessment/`)
- **`scoringEngine.ts`**: Motor determinístico de cálculo de score de cumplimiento (0 a 100 puntos).
  - Cálculo aditivo mediante ponderaciones configurables por pregunta.
  - Evaluación cualitativa según umbrales (Avanzado $\ge 80$, Moderado $\ge 45$, Crítico $< 45$).
  - Generación de recomendaciones y nivel de riesgo regulatorio.
- **`assessmentRules.ts`**: Plantillas oficiales de resultado, umbrales y preguntas por defecto.
- **`types.ts`**: Interfaces de preguntas, ponderaciones y diagnósticos.

### 2.3 Registro de Actividades de Tratamiento — RAT (`src/domain/rat/`)
- **`rutValidator.ts`**: Algoritmo Módulo 11 puro para validación y formateo de RUT chileno (personas naturales y personas jurídicas). Soporta formatos estándar, sin puntos, sin guion y con DV "K"/"0".
- **`ratValidator.ts`**: Validador de antecedentes legales de la empresa responsable del tratamiento (Art. 14 ter Nº 1: Razón Social, RUT chileno válido, Representante Legal, Correo electrónico formal).
- **`ratSerializer.ts`**: Serializador de fichas y documentos RAT conforme al esquema estandarizado de la APDP (Tramo 1 Obligatorio). Generador de código único de certificado verificable.
- **`catalog.ts`**: Catálogo base de actividades predefinidas y bases de licitud (Arts. 12 y 13).

### 2.4 Derechos ARCO+ y Plazos Legales (`src/domain/arcop/`)
- **`slaRules.ts`**: Reglas de cálculo de SLA legal: 2 días hábiles para Bloqueo Temporal (Art. 10 bis) y 30 días corridos para Acceso, Rectificación, Supresión, Oposición y Portabilidad (Art. 10).

---

## 3. Cobertura de Pruebas Unitarias
Todas las funciones puras de dominio cuentan con pruebas unitarias en Vitest con más del 98% de cobertura de código.
