# Arquitectura de Software - leydedatospersonaleschile.cl

Este documento describe la arquitectura modular, escalable y desacoplada de la plataforma LegalTech **leydedatospersonaleschile.cl**, diseñada para cumplir con los estándares de la Ley Nº 21.719 en Chile.

---

## 1. Principio Fundamental: Separación de Responsabilidades

El proyecto implementa una estricta separación de capas para garantizar que **ningún componente React contenga fórmulas de negocio, números mágicos ni grandes bloques de texto hardcodeados**:

```
/
├── config/             # Parámetros centralizados y variables de negocio
│   ├── site.config.ts        # Metadatos del sitio, branding, enlaces oficiales BCN
│   ├── business.config.ts    # UTM oficial, topes legales, SLAs, beneficio Pyme
│   ├── calculator.config.ts  # Tipos de infracción, ponderaciones y opciones
│   ├── assessment.config.ts  # Preguntas del diagnóstico, ponderaciones y umbrales
│   ├── rat.config.ts         # Actividades predefinidas para el Registro RAT
│   └── seo.config.ts         # Configuración OpenGraph, Twitter y Schema.org
│
├── content/            # Contenidos, textos legales y copys estructurados
│   ├── home.ts               # Propuesta de valor Hero, métricas y rubros
│   ├── arcop.ts              # Catálogo exhaustivo de Derechos ARCOP y SLAs
│   ├── law-21719.ts          # Hitos de vigencia y compendio de artículos
│   ├── cases.ts              # Casos prácticos operativos en Pymes
│   └── faq.ts                # Banco de preguntas frecuentes
│
├── lib/                # Lógica pura de dominio y funciones de cálculo (sin JSX)
│   ├── calculations/
│   │   ├── utmCalculator.ts      # Cálculo de multas APDP, conversión a CLP y riesgo
│   │   └── complianceScoring.ts  # Algoritmo de scoring y diagnóstico de madurez
│   └── rat/
│       └── ratGenerator.ts       # Generación de códigos y exportación JSON oficial
│
├── types.ts            # Tipado TypeScript estricto de dominio e interfaces
├── data/               # Fuentes de datos estructurados (ej. posts del carrusel)
├── services/           # Integraciones externas (ej. Google Gemini API)
└── components/         # Componentes UI de presentación pura y captura de eventos
```

---

## 2. Capa de Configuración (`/config`)

Centraliza todo valor susceptible de cambiar en el tiempo sin necesidad de tocar componentes visuales:
- **`business.config.ts`**: Define el valor oficial de la UTM (`67.294 CLP`), los plazos legales (SLA de 2 días hábiles para Bloqueo Temporal según Art. 10 bis; 30 días para ARCOP) y los topes de sanción (5.000, 10.000 y 20.000 UTM).
- **`assessment.config.ts`**: Contiene los ítems del test diagnóstico con sus respectivas ponderaciones y los umbrales de riesgo (`Avanzado >= 80`, `Moderado >= 45`, `Crítico < 45`).
- **`calculator.config.ts`**: Tipificación de hechos constitutivos de infracciones leves, graves y gravísimas.
- **`rat.config.ts`**: Inventario preconfigurado para el Registro de Actividades de Tratamiento (RRHH, CRM, E-commerce, CCTV, Marketing y Proveedores).

---

## 3. Capa de Dominio y Cálculos (`/lib`)

Contiene **funciones puras** de TypeScript, determinísticas y 100% testeables:
- `calcularMultaAPDP(params)`: Evalúa gravedad, condición Pyme (Ley 20.416), reincidencia y factores de control (RAT, SLAs, datos sensibles) para devolver el monto en CLP y el dictamen legal.
- `calcularPuntajeCumplimiento(respuestas)`: Pondera las respuestas del checklist de madurez.
- `evaluarDiagnostico(puntaje)`: Determina la categoría de riesgo y genera la lista de acciones prioritarias.
- `exportarRATaJSON(empresa, actividades)`: Estructura la ficha estandarizada para presentación ante la APDP.

---

## 4. Capa de Presentación (`/components`)

Los componentes de React se limitan a:
1. Renderizar la interfaz visual con Tailwind CSS.
2. Capturar interacciones del usuario (clics, inputs, filtros).
3. Invocar las funciones de cálculo de la capa `lib/`.
4. Mostrar los textos provistos por la capa `content/`.

---

## 5. Enrutamiento y Navegación

El proyecto utiliza un enrutador ligero basado en hash (`#/seccion`) sincronizado con el historial del navegador (`App.tsx`):
- `inicio`: Landing ejecutiva de conversión y carrusel de actualidad.
- `agente-rat`: Asistente con IA para redactar la ficha Art. 14 ter en 3 minutos.
- `test-cumplimiento`: Checklist de autoevaluación en 60 segundos.
- `multas-utm`: Simulador financiero con valor oficial fijado de la UTM.
- `derechos-arcop`: Catálogo de derechos y monitor de plazos legales (2 días vs 30 días).
- `ley-21719`: Calendario interactivo de vacancia y compendio de artículos.
- `casos-pymes`: Escenarios prácticos reales.
- `guias-recursos`: Blog y biblioteca de guías especializadas.
