# Guía de Custom Hooks — Fase 2: Extracción de Estado y Lógica

Este documento detalla la arquitectura de Hooks ubicada en `src/hooks/` (re-exportada en `/hooks`), su interacción con la capa de Dominio y la separación estricta respecto a los componentes de interfaz.

---

## 1. Diagrama de Flujo y Dirección de Dependencias

```
     ┌────────────────────────────────┐
     │      CONTENT / CONFIG          │
     └───────────────┬────────────────┘
                     │
                     ▼
     ┌────────────────────────────────┐
     │      DOMAIN (Lógica Pura)      │  <-- Sin dependencias de React
     └───────────────┬────────────────┘
                     │
                     ▼
     ┌────────────────────────────────┐
     │      SERVICES / AI             │  <-- Servicios externos / SDK
     └───────────────┬────────────────┘
                     │
                     ▼
     ┌────────────────────────────────┐
     │      HOOKS (Gestión de Estado) │  <-- Encapsula React, useState, useMemo
     └───────────────┬────────────────┘
                     │
                     ▼
     ┌────────────────────────────────┐
     │      COMPONENTS (Presentación) │  <-- Render, inputs, botones, JSX
     └───────────────┬────────────────┘
                     │
                     ▼
     ┌────────────────────────────────┐
     │              UI                │
     └────────────────────────────────┘
```

**Regla de Oro**:
- `DOMAIN` **nunca** importa Hooks, Components, JSX o React.
- `HOOKS` consume `DOMAIN`, `CONFIG`, `CONTENT` y `SERVICES`.
- `COMPONENTS` consume `HOOKS` y se concentra exclusivamente en renderizar y capturar eventos del usuario.

---

## 2. Responsabilidades por Hook

### 2.1 `usePenaltyCalculator`
- **Ubicación**: `src/hooks/usePenaltyCalculator.ts`
- **Componente asociado**: `components/UTMCalculator.tsx`
- **Responsabilidad del Hook**:
  - Gestiona el estado de selección de gravedad (`leve`, `grave`, `gravisima`).
  - Controla los toggles: Estatuto Pyme, reincidencia y factores operacionales (RAT, SLA de 2 días, datos sensibles).
  - Gestiona la inyección del valor oficial de la UTM desde configuración o parámetro dinámico.
  - Ofrece acción `reset()` para reiniciar el simulador.
- **Lógica que pertenece al Dominio (`domain/calculator/`)**:
  - `calculatePenalty()`: asignación de límites sancionatorios, cálculo en CLP, ponderación de puntos de riesgo y evaluación del beneficio de amonestación escrita.
  - `formatClp()`, `formatUtm()`: formateo numérico determinístico.
- **Lógica que permanece en UI (`components/UTMCalculator.tsx`)**:
  - Renderizado de tarjetas de selección visual, estilos condicionales (`peer-checked`), badges y botón CTA de navegación (`onGoToRat`).

```tsx
// Ejemplo de uso
import { usePenaltyCalculator } from '../hooks/usePenaltyCalculator';

function MiSimulador() {
  const {
    tipoInfraccion,
    setTipoInfraccion,
    esPyme,
    setEsPyme,
    resultado,
    formatCLP,
    formatUTM,
  } = usePenaltyCalculator();

  return (
    <div>
      <button onClick={() => setTipoInfraccion('gravisima')}>Gravísima</button>
      <p>Monto máximo: {formatCLP(resultado.montoMaximoCLP)}</p>
    </div>
  );
}
```

---

### 2.2 `useComplianceAssessment`
- **Ubicación**: `src/hooks/useComplianceAssessment.ts`
- **Componente asociado**: `components/ComplianceChecklist.tsx`
- **Responsabilidad del Hook**:
  - Gestiona el diccionario reactivo de respuestas del usuario (`Record<string, boolean>`).
  - Expone acciones `toggleRespuesta(id)`, `setRespuesta(id, value)`, y `resetRespuestas()`.
  - Calcula el progreso porcentual (`progresoPorcentaje`) y el conteo de preguntas afirmativas.
- **Lógica que pertenece al Dominio (`domain/assessment/`)**:
  - `calculateAssessmentScore()`: suma de ponderaciones por pregunta afirmativa.
  - `evaluateAssessment()`: clasificación en niveles (*Crítico*, *Moderado*, *Avanzado*), mensajes regulatorios y recomendaciones oficiales.
- **Lógica que permanece en UI (`components/ComplianceChecklist.tsx`)**:
  - Barra de progreso visual animada (`w-full bg-orange-500 transition-all`), atributos ARIA (`role="progressbar"`, `aria-checked`), teclado accesible (Enter / Espacio) y llamada `onGoToRat`.

```tsx
// Ejemplo de uso
import { useComplianceAssessment } from '../hooks/useComplianceAssessment';

function MiChecklist() {
  const { respuestas, toggleRespuesta, puntajeTotal, diagnostico } = useComplianceAssessment();

  return (
    <div>
      <span>Puntaje: {puntajeTotal}/100 - {diagnostico.nivel}</span>
      <button onClick={() => toggleRespuesta('rat')}>Tengo RAT</button>
    </div>
  );
}
```

---

### 2.3 `useRatWizard`
- **Ubicación**: `src/hooks/useRatWizard.ts`
- **Componente asociado**: `components/RatAgentWizard.tsx`
- **Responsabilidad del Hook**:
  - Navegación del wizard en 4 pasos (`paso`, `siguientePaso`, `pasoAnterior`, `irAPaso`).
  - Estado y actualización de la entidad empresa (`datosEmpresa`, `actualizarDatosEmpresa`, `actualizarCampoEmpresa`).
  - Control de selección y deselección de actividades de tratamiento (`toggleActividad`).
  - Filtro activo por categoría (`filtroCategoria`, `actividadesFiltradas`).
  - Creación de actividades personalizadas (`agregarActividadPersonalizada`).
  - Estado del modal de nueva actividad (`mostrarModalNueva`, `abrirModalNuevaActividad`, `cerrarModalNuevaActividad`).
  - Generación y descarga de archivo JSON para la APDP (`exportarJSON()`, `generarJSONString()`).
- **Lógica que pertenece al Dominio (`domain/rat/`)**:
  - `validateCompanyData()`: validación formal de campos y algoritmo Módulo 11 en `validateRut()`.
  - `serializeRATToJSON()`: construcción del payload formal estructurado para la APDP.
  - `generateRATCertificateCode()`: generación del identificador oficial de trazabilidad.
- **Lógica que permanece en UI (`components/RatAgentWizard.tsx`)**:
  - Vista condicional de pasos (`paso === 1`, etc.), tabla maquetada con estilos Tailwind, diseño de certificado imprimible y llamada nativa a `window.print()`.

```tsx
// Ejemplo de uso
import { useRatWizard } from '../hooks/useRatWizard';

function MiWizardRAT() {
  const {
    paso,
    siguientePaso,
    datosEmpresa,
    actualizarCampoEmpresa,
    exportarJSON,
  } = useRatWizard();

  return (
    <div>
      <p>Paso actual: {paso}</p>
      <input
        value={datosEmpresa.razonSocial}
        onChange={(e) => actualizarCampoEmpresa('razonSocial', e.target.value)}
      />
      <button onClick={siguientePaso}>Siguiente</button>
      <button onClick={exportarJSON}>Descargar JSON</button>
    </div>
  );
}
```

---

### 2.4 `useAiAssistant`
- **Ubicación**: `src/hooks/useAiAssistant.ts`
- **Componente asociado**: `components/AIAssistantModal.tsx`
- **Responsabilidad del Hook**:
  - Lista cronológica de mensajes de usuario y asistente (`mensajes`).
  - Campo de texto actual (`input`, `setInput`).
  - Estado de carga y consulta al servicio de IA (`cargando`).
  - Captura y manejo de errores con fallback normativo (`error`).
  - Despacho de consulta asíncrona (`enviarMensaje`) y reinicio de conversación (`reiniciarChat`).
- **Lógica que pertenece al Servicio (`services/geminiService.ts`)**:
  - Llamada al SDK oficial `@google/genai` con `gemini-2.5-flash`, System Prompt de la Ley 21.719 y fallback determinístico ante indisponibilidad de API Key.
- **Lógica que permanece en UI (`components/AIAssistantModal.tsx`)**:
  - Diálogo modal con backdrop desenfocado (`fixed inset-0 bg-black/50 backdrop-blur-sm`).
  - Evento de escape (`Escape` keydown) y foco.
  - Scroll automático al último mensaje (`scrollRef.current.scrollTop = scrollRef.current.scrollHeight`).
  - Parser visual de negritas y bullets (`renderTexto`).

---

## 3. Matriz de Clasificación de Estado

| Estado | Clasificación | Ubicación Final | Justificación |
|---|---|---|---|
| `tipoInfraccion` | FORM_STATE / DOMAIN_STATE | `usePenaltyCalculator` | Input clave para el cálculo determinístico de sanciones. |
| `esPyme` | FORM_STATE / DOMAIN_STATE | `usePenaltyCalculator` | Determina la conmutación de sanción pecuniaria por amonestación. |
| `esReincidente` | FORM_STATE / DOMAIN_STATE | `usePenaltyCalculator` | Anula el Estatuto Pyme y activa régimen de reincidencia. |
| `tieneRAT`, `respondeBloqueo2Dias`, `manejaDatosSensibles` | FORM_STATE / DOMAIN_STATE | `usePenaltyCalculator` | Parámetros que alimentan el termómetro de riesgo APDP. |
| `resultado` | DOMAIN_STATE (Derivado) | `usePenaltyCalculator` | Cálculo determinístico generado por la capa de dominio. |
| `respuestas` | FORM_STATE / DOMAIN_STATE | `useComplianceAssessment` | Respuestas a la matriz de verificación regulatoria. |
| `puntajeTotal`, `diagnostico` | DOMAIN_STATE (Derivado) | `useComplianceAssessment` | Resultado cuantitativo y cualitativo derivado del scoring engine. |
| `paso` (Wizard) | NAVIGATION_STATE | `useRatWizard` | Control de etapa activa en el flujo de 4 pasos del RAT. |
| `datosEmpresa` | FORM_STATE / DOMAIN_STATE | `useRatWizard` | Información jurídica exigida por el Art. 14 ter Nº 1. |
| `actividades` | DOMAIN_STATE | `useRatWizard` | Registro y selección de actividades de tratamiento de datos. |
| `filtroCategoria` | UI_STATE / PRESENTATION | `useRatWizard` | Filtro por pestaña de tratamientos (RRHH, clientes, etc.). |
| `mostrarModalNueva` | UI_STATE | `useRatWizard` | Control de apertura/cierre del diálogo modal. |
| `mensajes`, `cargando`, `input` | SERVER_STATE / CONVERSATION | `useAiAssistant` | Estado de la interacción conversacional con el modelo de IA. |
| `isOpen` (Modales) | UI_STATE | Componente (`App.tsx` / `AIAssistantModal.tsx`) | Visibilidad del modal en la interfaz gráfica. |
| `currentPage` | NAVIGATION_STATE | `App.tsx` | Hash routing de vista activa en la SPA. |
| `rubroSeleccionado` | UI_STATE / PRESENTATION | `Hero.tsx` | Selector de pestaña interactiva para exploración instantánea. |
| `scrollRef` | UI_STATE | `AIAssistantModal.tsx` | Referencia DOM para desplazamiento automático del chat. |

---

## 4. Estado de Validación y Calidad
- **Total de pruebas de Hooks**: 24 pruebas dedicadas en Vitest con `@testing-library/react` y `happy-dom`.
- **Cobertura de Hooks**: > 95% Statements, > 98% Lines.
- **TypeScript (`tsc --noEmit`)**: 0 errores.
- **Build (`vite build`)**: Exitoso.
