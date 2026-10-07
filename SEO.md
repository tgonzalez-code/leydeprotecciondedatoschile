# Estrategia de SEO & Structured Data - leydedatospersonaleschile.cl

Este documento describe la arquitectura técnica de Search Engine Optimization (SEO), metadatos dinámicos por ruta, silos temáticos y datos estructurados Schema.org conforme al esquema oficial del proyecto.

---

## 1. Esquema de Arquitectura Temática y Silos SEO

La estructura semántica del sitio se organiza en 3 grandes silos temáticos derivados del nodo central (*Hub*):

```
                 LEY DE DATOS PERSONALES (Root / Hub)
                          |
        +-----------------+-----------------+
        |                 |                 |
        v                 v                 v
    Ley 21.719       Ley 19.628        Cumplimiento
        |                 |                 |
        v                 v                 v
      ARCOP              RAT            Diagnóstico
                                            |
                                            v
                                       Calculadora
                                            |
                                            v
                                        Servicios
```

- **Pilar Central (Root/Hub)**: `inicio` (Ley de Datos Personales en Chile).
- **Silo 1 (Reforma & APDP)**: `ley-21719` -> Subtema: `derechos-arcop` (SLA de 2 días y catálogo de derechos).
- **Silo 2 (Norma Base Reformada)**: `compendio-legal` -> Subtema: `agente-rat` (Registro RAT Art. 14 ter obligatorio).
- **Silo 3 (Ruta de Cumplimiento Empresarial)**: `test-cumplimiento` -> Subtema 1: `test-cumplimiento` (Diagnóstico 60s) -> Subtema 2: `multas-utm` (Calculadora APDP) -> Subtema 3: `casos-pymes` (Servicios y casos prácticos).

---

## 2. Metadatos Principales en `index.html` (Entry Point)

- **Title Tag**: `Ley de Datos Personales Chile - Agente RAT | Ley 21.719` (59 caracteres, respetando el rango de 30–60 caracteres).
- **Meta Description**: `Plataforma oficial de orientación Ley 21.719 y Agente de IA para el Registro de Actividades de Tratamiento (RAT - Art. 14 ter) para Pymes en Chile.` (150 caracteres, respetando el rango de 120–160 caracteres).
- **Keywords**: `Ley 21.719, Ley de datos personales Chile, proteccion de datos personales Chile, cumplimiento Ley 21.719, RAT Chile, Registro de Actividades de Tratamiento, derechos ARCOP, compliance proteccion de datos, asesoria Ley 21.719, APDP`.
- **Robots Tag**: `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`.
- **Geolocalización & Idioma**: `<meta name="geo.region" content="CL">`, `<meta name="geo.placename" content="Santiago, Chile">`, hreflang `es-cl` y `x-default`.
- **Canonical Tag**: `<link rel="canonical" href="https://leydedatospersonaleschile.cl">`.

---

## 3. SEO Dinámico por Ruta (`usePageSeo`)

El hook `usePageSeo(currentPage)` sincroniza en tiempo real cada navegación:
- `document.title` según `SEO_PAGE_METAS[currentPage]`.
- `<meta name="description">` específico y optimizado (120–160 caracteres).
- `<link rel="canonical">` apuntando a la URL canónica de la sección.
- Tags de OpenGraph (`og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`).
- Tarjetas de Twitter (`twitter:card`, `twitter:title`, `twitter:description`).
- Script JSON-LD inyectado dinámicamente (`#dynamic-breadcrumb-schema`) con el `BreadcrumbList` de la ruta activa.

---

## 4. Datos Estructurados Schema.org (JSON-LD)

Incrustados en el encabezado mediante `<script type="application/ld+json">` dentro de un `@graph` conectado:

1. **`Organization`**:
   - Entidad publicadora legal y técnica en Chile.
   - Logo oficial y área geográfica de servicio (`CL`).

2. **`WebSite`**:
   - Referencia canónica con `@id: ".../#website"`.
   - Propiedad `hasPart` detallando todas las páginas correspondientes a los silos temáticos.

3. **`SiteNavigationElement`**:
   - Modelo de navegación semántica estructurado según los 3 silos temáticos.

4. **`BreadcrumbList`**:
   - Listado jerárquico de migas de pan para snippets de Google Search.

5. **`WebApplication`**:
   - Nombre: `Ley de Datos Personales Chile - Agente RAT`.
   - Categoría: `BusinessApplication`.
   - Requerimientos: `Requires JavaScript. Requires HTML5.`.
   - Versión de software: `2.1.0`.
   - Lista de características principales (Generador RAT con IA, Diagnóstico 60s, Calculadora UTM, Monitor ARCOP 2 días).
   - Oferta libre de costo ($0 CLP).

6. **`FAQPage`**:
   - Preguntas clave con respuesta oficial para calificar a Rich Snippets:
     - *¿Qué es la Ley 21.719 de Protección de Datos Personales en Chile?*
     - *¿Qué son los derechos ARCOP en Chile y cuál es su SLA legal?*
     - *¿Qué es el Registro de Actividades de Tratamiento (RAT) del Artículo 14 ter de la Ley 19.628?*
     - *¿Cómo beneficia el Estatuto Pyme (Ley 20.416) en las multas de la APDP?*
     - *¿Cuál es la ruta recomendada de cumplimiento para una empresa?*

---

## 5. Migas de Pan Semánticas con Microdata (`Breadcrumbs.tsx`)

Renderizado en todas las subpáginas:
- `<ol itemscope itemtype="https://schema.org/BreadcrumbList">`
- Cada nivel con `itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"`.
- Marcado de `itemprop="name"`, `itemprop="item"` y `itemprop="position"`.
- Conectado a la jerarquía de silos en `BREADCRUMB_MAP`.

---

## 6. Componente Visual de Arquitectura Temática (`ThematicArchitectureSilo.tsx`)

Desplegado en la página principal (`inicio`):
- Muestra el diagrama interactivo del árbol: Hub central -> Silo 1 (Ley 21.719 / ARCOP), Silo 2 (Ley 19.628 / RAT) y Silo 3 (Cumplimiento: Diagnóstico -> Calculadora -> Servicios).
- Facilita el rastreo de bots de búsqueda mediante enlaces semánticos y botones contextuales a cada nodo.
