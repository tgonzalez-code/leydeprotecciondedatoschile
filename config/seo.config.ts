import { SITE_CONFIG } from './site.config';

export const SEO_CONFIG = {
  title: 'Ley 21.719 Chile | Cumplimiento y Diagnóstico de Datos Personales para Empresas',
  titleTemplate: '%s | leydedatospersonaleschile.cl',
  description: 'Plataforma moderna de Data Privacy Compliance para la Ley 21.719 en Chile. Evalúa tu empresa en 3 minutos, genera tu Registro RAT (Art. 14 ter) con IA y cumple sin frenar el negocio.',
  canonicalUrl: SITE_CONFIG.url,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Ley 21.719 Chile | Cumplimiento y Diagnóstico de Datos Personales para Empresas',
    description: 'Plataforma moderna de Data Privacy Compliance para la Ley 21.719 en Chile. Evalúa tu empresa en 3 minutos, genera tu Registro RAT con IA y cumple sin frenar el negocio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ley 21.719 Chile | Cumplimiento y Diagnóstico de Datos Personales para Empresas',
    description: 'Plataforma moderna de Data Privacy Compliance para la Ley 21.719 en Chile. Evalúa tu empresa en 3 minutos, genera tu Registro RAT con IA y cumple sin frenar el negocio.',
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Portal Ley de Datos Personales Chile & Agente RAT',
        url: SITE_CONFIG.url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        description: 'Plataforma de cumplimiento normativo de la Ley 21.719 en Chile. Agente de IA para el Registro de Actividades de Tratamiento (RAT - Art. 14 ter) en 3 minutos.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CLP',
        },
      },
    ],
  },
} as const;
