import { RubroExposicion } from '../types';

export const HERO_CONTENT = {
  badge: {
    category: 'LEGALTECH & PRIVACIDAD DE DATOS',
    law: 'LEY Nº 21.719 CHILE',
  },
  headline: {
    prefix: '¿Tu empresa está preparada para la nueva',
    highlight: 'Ley de Datos Personales?',
  },
  subheadline: {
    prefix: 'Descubre en',
    time: '3 minutos',
    middle: 'qué necesitas hacer para proteger la información de tus clientes, trabajadores y proveedores. Evita multas de la APDP y',
    highlight: 'cumple sin frenar tu negocio',
  },
  primaryCta: 'Evaluar mi empresa (3 min)',
  secondaryCta: 'Generar RAT con IA',
  trustBadges: [
    { icon: 'verified', label: 'Diagnóstico gratis en 3 min' },
    { icon: 'lock', label: '100% Confidencial' },
    { icon: 'business', label: 'PYMEs y empresas chilenas' },
  ],
};

export const RUBROS_EXPOSICION: RubroExposicion[] = [
  {
    id: 'retail',
    name: 'E-commerce & Retail',
    riesgo: 'Alto',
    datosTipicos: 'Datos de compras, direcciones de despacho, pasarelas de pago y cookies.',
    urgencia: 'Consentimiento para marketing y contratos con couriers.',
    beneficioPyme: 'Amonestación si cuenta con RAT regularizado.',
  },
  {
    id: 'servicios',
    name: 'Servicios Profesionales',
    riesgo: 'Medio',
    datosTipicos: 'Contratos B2B, datos de nómina, RUTs y correos de contacto comercial.',
    urgencia: 'Cláusulas de encargado de tratamiento con clientes y proveedores.',
    beneficioPyme: 'Aplica beneficio Pyme Ley 20.416.',
  },
  {
    id: 'saas',
    name: 'Software & Tecnología',
    riesgo: 'Alto',
    datosTipicos: 'Bases de datos de usuarios, telemetría y hosting internacional.',
    urgencia: 'Transferencia internacional y SLAs de bloqueo en 48 horas.',
    beneficioPyme: 'Aplica beneficio Pyme con Ficha Técnica RAT.',
  },
  {
    id: 'rrhh',
    name: 'Empresas con +15 Trabajadores',
    riesgo: 'Crítico',
    datosTipicos: 'Huellas biométricas de reloj control, licencias médicas y remuneraciones.',
    urgencia: 'Datos sensibles requieren salvaguardas técnicas reforzadas.',
    beneficioPyme: 'Riesgo de multas graves sin consentimiento reforzado.',
  },
];

export const HOME_METRICS = [
  {
    valor: '24 Meses',
    titulo: 'Vacancia Legal',
    descripcion: 'Plazo para adecuar contratos y procesos',
    color: 'text-orange-400',
  },
  {
    valor: '2 Días',
    titulo: 'SLA Crítico (Art. 10 bis)',
    descripcion: 'Plazo para responder Bloqueo Temporal',
    color: 'text-white',
  },
  {
    valor: '20.000 UTM',
    titulo: 'Multa Máxima',
    descripcion: 'O hasta el 4% de ventas anuales',
    color: 'text-orange-400',
  },
  {
    valor: 'Ley 20.416',
    titulo: 'Estatuto Pyme',
    descripcion: 'Sustituye multas por amonestación',
    color: 'text-emerald-400',
  },
];

export const TRUST_BAR_ITEMS = [
  { icon: 'verified', label: 'Ley Nº 21.719' },
  { icon: 'speed', label: 'Diagnóstico en 3 min' },
  { icon: 'lock', label: '100% Confidencial' },
  { icon: 'business_center', label: 'Enfoque de Negocio' },
];

export const HOME_TOOLS_CONTENT = {
  header: {
    badge: 'HERRAMIENTAS CLAVE DE CUMPLIMIENTO',
    title: 'Todo lo esencial para preparar tu empresa',
    subtitle: 'Accede a las 3 soluciones centrales para cumplir la Ley 21.719 de forma simple, rápida y sin burocracia.',
  },
  tools: [
    {
      id: 'test-cumplimiento',
      icon: 'checklist',
      badge: 'Diagnóstico Inicial',
      title: 'Test de Cumplimiento (60 seg)',
      desc: 'Detecta en 1 minuto las principales brechas de tu empresa frente a la Ley 21.719 y recibe prioridades inmediatas.',
      cta: 'Iniciar Diagnóstico',
      ctaIcon: 'arrow_forward',
      highlight: false,
    },
    {
      id: 'agente-rat',
      icon: 'psychology',
      badge: 'LegalTech con IA',
      floatingBadge: 'Obligatorio Art. 14 ter',
      title: 'Agente RAT Inteligente',
      desc: 'Entrevista guiada de 3 minutos para generar la Ficha Oficial del Registro de Actividades de Tratamiento para la APDP.',
      cta: 'Generar Ficha con IA',
      ctaIcon: 'auto_awesome',
      highlight: true,
    },
    {
      id: 'multas-utm',
      icon: 'calculate',
      badge: 'Impacto Financiero',
      title: 'Simulador de Multas UTM',
      desc: 'Calcula sanciones en UTM y pesos chilenos según la gravedad y conoce los requisitos del Beneficio Pyme (Ley 20.416).',
      cta: 'Calcular Multas',
      ctaIcon: 'arrow_forward',
      highlight: false,
    },
  ],
};

export const HOME_CTA_CONTENT = {
  badge: 'Orientación Inmediata',
  title: '¿Tienes dudas sobre los datos en tu empresa?',
  subtitle: 'Resuelve consultas sobre la Ley 21.719 con nuestro Asistente Especializado o realiza el diagnóstico de 60 segundos.',
  primaryBtn: 'Consultar Asistente IA',
  secondaryBtn: 'Iniciar Diagnóstico',
};
