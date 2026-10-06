export const SITE_CONFIG = {
  name: 'leydedatospersonaleschile.cl',
  brandName: 'Ley de Datos Personales Chile',
  tagline: 'Cumplir con la Ley 21.719 sin frenar el negocio',
  description: 'Plataforma moderna de Data Privacy Compliance para la Ley 21.719 en Chile. Evalúa tu empresa en 3 minutos, genera tu Registro RAT (Art. 14 ter) con IA y cumple sin frenar el negocio.',
  url: 'https://leydedatospersonaleschile.cl',
  domain: 'leydedatospersonaleschile.cl',
  contactEmail: 'contacto@leydedatospersonaleschile.cl',
  author: 'leydedatospersonaleschile.cl',
  locale: 'es_CL',
  year: 2026,
  country: 'Chile',
  regulatorName: 'Agencia de Protección de Datos Personales (APDP)',
  primaryLaw: 'Ley Nº 21.719',
  frameworkLaws: [
    {
      name: 'Ley Nº 21.719',
      fullName: 'Nueva Ley sobre Protección de Datos Personales',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=1208940',
      description: 'Crea la APDP, consagra derechos ARCOP+ y multas de hasta 20.000 UTM.',
    },
    {
      name: 'Ley Nº 19.628',
      fullName: 'Sobre Protección de la Vida Privada',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=141599',
      description: 'Marco normativo originario modificado y modernizado sustancialmente.',
    },
    {
      name: 'Ley Nº 20.416',
      fullName: 'Estatuto de Acceso al Crédito y Competitividad de las MiPymes',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=1010376',
      description: 'Establece el beneficio de amonestación escrita en primera falta para Pymes.',
    },
    {
      name: 'Ley Nº 21.663',
      fullName: 'Marco de Ciberseguridad e Infraestructura Crítica',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=1202868',
      description: 'Exigencias de reporte de incidentes y seguridad digital institucional.',
    },
  ],
} as const;

export const SITE_PAGES: Record<import('../types').PageId, { title: string; subtitle: string }> = {
  'inicio': { 
    title: 'Portal Ley de Protección de Datos Personales Chile', 
    subtitle: 'Cumplimiento oficial Ley 21.719 y Agente RAT con IA' 
  },
  'ley-21719': { 
    title: 'La Ley 21.719 & Calendario de Vigencia', 
    subtitle: 'Plazos legales, vacancia de 24 meses e instalación de la APDP' 
  },
  'agente-rat': { 
    title: 'Agente de IA para el Registro RAT (Art. 14 ter)', 
    subtitle: 'Entrevista de 3 minutos para generar la Ficha Oficial para la APDP' 
  },
  'derechos-arcop': { 
    title: 'Catálogo de Derechos ARCOP & Monitoreo de SLAs', 
    subtitle: 'SLA crítico de 2 días para Bloqueo Temporal y 30 días para ARCOP+' 
  },
  'multas-utm': { 
    title: 'Simulador de Sanciones y Multas en UTM', 
    subtitle: 'Régimen sancionatorio de la APDP y Beneficio Pyme (Ley 20.416)' 
  },
  'test-cumplimiento': { 
    title: 'Test Diagnóstico de Cumplimiento', 
    subtitle: 'Evalúa en 60 segundos el nivel de riesgo y preparación de tu empresa' 
  },
  'casos-pymes': { 
    title: 'Casos Prácticos en Pymes Chilenas', 
    subtitle: 'Situaciones operativas cotidianas: huellas, marketing y bloqueos' 
  },
  'guias-recursos': { 
    title: 'Guías Especializadas, Artículos & Recursos', 
    subtitle: 'Análisis de fiscalización, accountability y modelos de prevención' 
  },
  'compendio-legal': { 
    title: 'Compendio Normativo Interactivo Ley 21.719', 
    subtitle: 'Articulado completo con comentarios de aplicación práctica' 
  },
};

export const MAIN_NAV_ITEMS: { id: import('../types').PageId; label: string; badge?: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'agente-rat', label: 'Agente RAT (IA)', badge: 'IA' },
  { id: 'test-cumplimiento', label: 'Diagnóstico' },
  { id: 'multas-utm', label: 'Multas UTM' },
  { id: 'derechos-arcop', label: 'ARCOP (2 días)' },
  { id: 'ley-21719', label: 'Ley 21.719' },
  { id: 'guias-recursos', label: 'Recursos' },
];
