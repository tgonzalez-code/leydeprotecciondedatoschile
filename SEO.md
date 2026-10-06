# Estrategia de SEO & Structured Data - leydedatospersonaleschile.cl

Este documento resume la implementación técnica de Search Engine Optimization (SEO), metadatos sociales y datos estructurados Schema.org.

---

## 1. Metadatos Principales en `index.html`

- **Title Tag**: `Ley 21.719 Chile | Cumplimiento y Diagnóstico de Datos Personales para Empresas` (68 caracteres, enfocado en intención de búsqueda transaccional e informativa).
- **Meta Description**: `Plataforma moderna de Data Privacy Compliance para la Ley 21.719 en Chile. Evalúa tu empresa en 3 minutos, genera tu Registro RAT (Art. 14 ter) con IA y cumple sin frenar el negocio.` (178 caracteres, con llamado a la acción directo).
- **Keywords**: `Ley 21.719, Ley de datos personales Chile, proteccion de datos personales Chile, cumplimiento Ley 21.719, RAT Chile, Registro de Actividades de Tratamiento, derechos ARCOP, compliance proteccion de datos, asesoria Ley 21.719`.
- **Canonical Tag**: `<link rel="canonical" href="https://leydedatospersonaleschile.cl">`.

---

## 2. Redes Sociales y Tarjetas de Enlace (OpenGraph & Twitter Cards)

Optimizadas para previsualizaciones en Slack, LinkedIn, WhatsApp y Twitter/X:
- `og:type`: `website`
- `og:site_name`: `leydedatospersonaleschile.cl`
- `og:locale`: `es_CL`
- `twitter:card`: `summary_large_image`
- `twitter:title` y `og:title` sincronizados.

---

## 3. Datos Estructurados Schema.org (JSON-LD)

Incrustados en el encabezado mediante `<script type="application/ld+json">`:

1. **`WebApplication`**:
   - `name`: "Portal Ley de Datos Personales Chile & Agente RAT"
   - `applicationCategory`: "BusinessApplication"
   - `offers`: Precio $0 CLP para el diagnóstico y asistente inicial.

2. **`FAQPage`**:
   - Responde directamente a las consultas de búsqueda más frecuentes en Chile:
     - *¿Qué es la Ley 21.719 de Protección de Datos Personales en Chile?*
     - *¿Qué son los derechos ARCOP en Chile?*
     - *¿Qué es el Registro de Actividades de Tratamiento (RAT) y el Art. 14 ter?*
     - *¿Cuál es el beneficio para Pymes bajo la Ley 20.416?*
     - *¿Cuáles son las multas que puede cursar la APDP?*

Esto permite calificar para **Rich Snippets (Fragmentos enriquecidos)** en los resultados de Google.

---

## 4. Accesibilidad y Estructura Semántica

- **Jerarquía de Encabezados**: Un único `<h1>` por página (`id="main-heading"`), seguido ordenadamente por `<h2>` y `<h3>`.
- **Etiquetas ARIA**: 
  - `role="checkbox"` y `aria-checked` para ítems interactivos de evaluación.
  - `role="progressbar"` para el termómetro de cumplimiento.
  - `aria-label` para controles del carrusel y menú móvil.
- **Contraste y Legibilidad**: Cumplimiento del estándar WCAG AA con tipografías `Plus Jakarta Sans` y `JetBrains Mono`.
