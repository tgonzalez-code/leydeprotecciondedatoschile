import { PageId } from '../types';

export interface ThematicNode {
  id: string;
  name: string;
  shortTitle: string;
  pageId: PageId;
  description: string;
  primaryKeyword: string;
  path: string;
  children?: ThematicNode[];
}

export interface BreadcrumbItem {
  label: string;
  pageId?: PageId;
  path?: string;
  current?: boolean;
}

/**
 * Arquitectura Temática y Silos SEO Oficial conforme al esquema:
 *
 *                 LEY DE DATOS PERSONALES (Root / Hub)
 *                          |
 *        +-----------------+-----------------+
 *        |                 |                 |
 *        v                 v                 v
 *    Ley 21.719       Ley 19.628        Cumplimiento
 *        |                 |                 |
 *        v                 v                 v
 *      ARCOP              RAT            Diagnóstico
 *                                            |
 *                                            v
 *                                       Calculadora
 *                                            |
 *                                            v
 *                                        Servicios
 */
export const THEMATIC_SILOS = {
  root: {
    id: 'hub-root',
    name: 'Ley de Datos Personales en Chile',
    shortTitle: 'Ley de Datos Personales',
    pageId: 'inicio' as PageId,
    description: 'Portal integral y LegalTech de protección de datos personales en Chile.',
    primaryKeyword: 'Ley de Datos Personales Chile',
    path: '#/inicio',
  },
  silos: [
    {
      id: 'silo-ley-21719',
      name: 'Ley 21.719 (Reforma & APDP)',
      shortTitle: 'Ley 21.719',
      pageId: 'ley-21719' as PageId,
      description: 'Marco regulatorio moderno, vacancia legal de 24 meses y creación de la Agencia de Protección de Datos Personales (APDP).',
      primaryKeyword: 'Ley 21.719 Chile',
      path: '#/ley-21719',
      children: [
        {
          id: 'topic-arcop',
          name: 'Derechos ARCOP & SLA de 2 Días',
          shortTitle: 'ARCOP',
          pageId: 'derechos-arcop' as PageId,
          description: 'Catálogo de derechos de los titulares (Acceso, Rectificación, Cancelación, Oposición, Portabilidad y Bloqueo Temporal).',
          primaryKeyword: 'Derechos ARCOP Chile',
          path: '#/derechos-arcop',
        },
      ],
    },
    {
      id: 'silo-ley-19628',
      name: 'Ley 19.628 (Norma Base Modificada)',
      shortTitle: 'Ley 19.628',
      pageId: 'compendio-legal' as PageId,
      description: 'Ley sobre Protección de la Vida Privada reformada sustancialmente en su articulado permanente.',
      primaryKeyword: 'Ley 19.628',
      path: '#/compendio-legal',
      children: [
        {
          id: 'topic-rat',
          name: 'Registro RAT (Artículo 14 ter)',
          shortTitle: 'RAT',
          pageId: 'agente-rat' as PageId,
          description: 'Registro de Actividades de Tratamiento (Tramo 1 obligatorio), bases de licitud (Art. 12 y 13) e inventario formal exigible por la APDP.',
          primaryKeyword: 'Registro RAT Art 14 ter',
          path: '#/agente-rat',
        },
      ],
    },
    {
      id: 'silo-cumplimiento',
      name: 'Ruta de Cumplimiento Empresarial',
      shortTitle: 'Cumplimiento',
      pageId: 'test-cumplimiento' as PageId,
      description: 'Metodología integral paso a paso para adecuar operaciones, evaluar riesgos y regularizar la empresa.',
      primaryKeyword: 'Cumplimiento datos personales Chile',
      path: '#/test-cumplimiento',
      children: [
        {
          id: 'topic-diagnostico',
          name: 'Diagnóstico de Preparación',
          shortTitle: 'Diagnóstico',
          pageId: 'test-cumplimiento' as PageId,
          description: 'Evaluación de brechas en 60 segundos con ponderación de riesgos y recomendaciones regulatorias.',
          primaryKeyword: 'Diagnostico Ley 21.719',
          path: '#/test-cumplimiento',
        },
        {
          id: 'topic-calculadora',
          name: 'Calculadora de Multas en UTM',
          shortTitle: 'Calculadora',
          pageId: 'multas-utm' as PageId,
          description: 'Simulador sancionatorio oficial conforme a las potestades de la APDP y el beneficio Pyme (Ley 20.416).',
          primaryKeyword: 'Calculadora multas APDP UTM',
          path: '#/multas-utm',
        },
        {
          id: 'topic-servicios',
          name: 'Servicios & Casos Prácticos',
          shortTitle: 'Servicios',
          pageId: 'casos-pymes' as PageId,
          description: 'Soluciones aplicadas, análisis de casos cotidianos en Pymes chilenas y soporte del Agente IA.',
          primaryKeyword: 'Servicios compliance datos personales',
          path: '#/casos-pymes',
        },
      ],
    },
  ],
} as const;

/**
 * Jerarquías temáticas de Breadcrumbs por cada página
 */
export const BREADCRUMB_MAP: Record<PageId, BreadcrumbItem[]> = {
  'inicio': [
    { label: 'Ley de Datos Personales', pageId: 'inicio', current: true },
  ],
  'ley-21719': [
    { label: 'Inicio', pageId: 'inicio' },
    { label: 'Ley 21.719', pageId: 'ley-21719', current: true },
  ],
  'derechos-arcop': [
    { label: 'Inicio', pageId: 'inicio' },
    { label: 'Ley 21.719', pageId: 'ley-21719' },
    { label: 'ARCOP', pageId: 'derechos-arcop', current: true },
  ],
  'compendio-legal': [
    { label: 'Inicio', pageId: 'inicio' },
    { label: 'Ley 19.628', pageId: 'compendio-legal', current: true },
  ],
  'agente-rat': [
    { label: 'Inicio', pageId: 'inicio' },
    { label: 'Ley 19.628', pageId: 'compendio-legal' },
    { label: 'RAT (Art. 14 ter)', pageId: 'agente-rat', current: true },
  ],
  'test-cumplimiento': [
    { label: 'Inicio', pageId: 'inicio' },
    { label: 'Cumplimiento', pageId: 'test-cumplimiento' },
    { label: 'Diagnóstico', pageId: 'test-cumplimiento', current: true },
  ],
  'multas-utm': [
    { label: 'Inicio', pageId: 'inicio' },
    { label: 'Cumplimiento', pageId: 'test-cumplimiento' },
    { label: 'Calculadora', pageId: 'multas-utm', current: true },
  ],
  'casos-pymes': [
    { label: 'Inicio', pageId: 'inicio' },
    { label: 'Cumplimiento', pageId: 'test-cumplimiento' },
    { label: 'Servicios & Casos Pymes', pageId: 'casos-pymes', current: true },
  ],
  'guias-recursos': [
    { label: 'Inicio', pageId: 'inicio' },
    { label: 'Recursos', pageId: 'guias-recursos', current: true },
  ],
};

/**
 * Metadatos SEO específicos por página optimizados para Search Engines
 */
export const SEO_PAGE_METAS: Record<PageId, { title: string; description: string; canonical: string }> = {
  'inicio': {
    title: 'Ley de Datos Personales Chile | Portal Oficial & Agente RAT',
    description: 'Portal de la Ley de Datos Personales en Chile (Ley 21.719 y 19.628). Diagnóstico interactivo, simulador de multas y Agente RAT con IA para empresas.',
    canonical: 'https://leydedatospersonaleschile.cl/#/inicio',
  },
  'ley-21719': {
    title: 'Ley 21.719 Chile | Vigencia & Creación de la APDP',
    description: 'Análisis de la Ley 21.719 de Protección de Datos Personales en Chile. Plazos de vacancia legal de 24 meses, potestades de la APDP y sanciones aplicables.',
    canonical: 'https://leydedatospersonaleschile.cl/#/ley-21719',
  },
  'derechos-arcop': {
    title: 'Derechos ARCOP Chile | SLA 2 Días & Ley 21.719',
    description: 'Conoce los Derechos ARCOP en Chile y el estricto SLA de 2 días hábiles para Bloqueo Temporal (Art. 10 bis). Gestión conforme a la Ley 21.719.',
    canonical: 'https://leydedatospersonaleschile.cl/#/derechos-arcop',
  },
  'compendio-legal': {
    title: 'Ley 19.628 Modificada | Compendio Normativo Oficial',
    description: 'Texto actualizado de la Ley 19.628 sobre Protección de la Vida Privada tras la reforma de la Ley 21.719. Articulado comentado y análisis técnico para empresas.',
    canonical: 'https://leydedatospersonaleschile.cl/#/compendio-legal',
  },
  'agente-rat': {
    title: 'Registro RAT Chile (Art. 14 ter) | Generador con IA',
    description: 'Genera el Registro de Actividades de Tratamiento (RAT - Art. 14 ter) exigible por la APDP bajo la Ley 19.628 y 21.719. Entrevista con IA y descarga en JSON.',
    canonical: 'https://leydedatospersonaleschile.cl/#/agente-rat',
  },
  'test-cumplimiento': {
    title: 'Test Diagnóstico Ley 21.719 | Evalúa tu Empresa',
    description: 'Test gratuito de 60 segundos para medir la preparación de tu empresa ante la Ley 21.719 de Protección de Datos Personales. Obtén puntaje y plan de acción.',
    canonical: 'https://leydedatospersonaleschile.cl/#/test-cumplimiento',
  },
  'multas-utm': {
    title: 'Simulador de Multas APDP en UTM | Ley 21.719 & Pyme',
    description: 'Calcula el riesgo de multas de la APDP en UTM y CLP. Simula sanciones leves, graves y gravísimas bajo la Ley 21.719 y conoce el beneficio del Estatuto Pyme.',
    canonical: 'https://leydedatospersonaleschile.cl/#/multas-utm',
  },
  'casos-pymes': {
    title: 'Servicios & Casos Pymes | Adecuación Ley 21.719',
    description: 'Casos prácticos de adecuación a la Ley 21.719 en Pymes: control biométrico, bases de datos comerciales, videovigilancia y contratos de tratamiento.',
    canonical: 'https://leydedatospersonaleschile.cl/#/casos-pymes',
  },
  'guias-recursos': {
    title: 'Recursos & Guías | Protección de Datos Chile',
    description: 'Artículos técnicos, guías operativas y documentación sobre accountability, oficiales de protección de datos (DPO) y mejores prácticas en Chile.',
    canonical: 'https://leydedatospersonaleschile.cl/#/guias-recursos',
  },
};
