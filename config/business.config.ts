export const BUSINESS_CONFIG = {
  // Parámetros económicos oficiales
  utm: {
    valorOficialCLP: 67294, // Publicación oficial SII / Banco Central de Chile
    fuente: 'Servicio de Impuestos Internos (SII)',
    actualizacion: '2026',
  },

  // Plazos legales perentorios (SLAs de la Ley 21.719)
  slas: {
    bloqueoTemporalDiasHabiles: 2, // Art. 10 bis (SLA crítico)
    arcopDiasCorridos: 30, // Art. 11 (Acceso, Rectificación, Supresión, Oposición, Portabilidad)
    vacanciaLegalMeses: 24, // Período de adecuación previo a fiscalizaciones completas
    conservacionCCTVMaxDias: 30, // Plazo estándar de sobrescritura de grabaciones
    conservacionTributariaAnos: 5, // Código Tributario para comprobantes y facturas
  },

  // Escala de sanciones de la APDP (Art. 41 a 43 Ley 21.719)
  sanciones: {
    topeLeveUTM: 5000,
    topeGraveUTM: 10000,
    topeGravisimaUTM: 20000,
    topePorcentajeVentasAnualesReincidencia: {
      min: 2,
      max: 4,
    },
  },

  // Beneficio Pyme (Ley 20.416)
  beneficioPyme: {
    leyNumero: 'Ley Nº 20.416',
    nombre: 'Estatuto Pyme',
    permiteAmonestacionEnPrimeraFalta: true,
    condicionExigida: 'Acreditar adopción inmediata del modelo de prevención y Registro RAT (Art. 14 ter).',
  },

  // Agente RAT
  agenteRAT: {
    duracionEntrevistaMinutos: 3,
    tramoObligatorio: 'Tramo 1 (Art. 14 ter)',
    articulos: ['Art. 14 ter', 'Art. 12', 'Art. 13', 'Art. 4 letra e'],
  },
} as const;
