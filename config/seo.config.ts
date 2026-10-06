import { SITE_CONFIG } from './site.config';

export const SEO_CONFIG = {
  title: 'Ley 21.719 Chile | Cumplimiento de Datos Personales',
  titleTemplate: '%s | leydedatospersonaleschile.cl',
  description: 'Cumple con la Ley 21.719 en Chile sin frenar tu negocio. Evalúa tu empresa en 3 min, genera tu Registro RAT (Art. 14 ter) con IA y evita multas de la APDP.',
  canonicalUrl: `${SITE_CONFIG.url}/`,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: `${SITE_CONFIG.url}/`,
    siteName: SITE_CONFIG.name,
    title: 'Ley 21.719 Chile | Cumplimiento de Datos Personales',
    description: 'Cumple con la Ley 21.719 en Chile sin frenar tu negocio. Evalúa tu empresa en 3 min, genera tu Registro RAT (Art. 14 ter) con IA y evita multas de la APDP.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ley 21.719 Chile | Cumplimiento de Datos Personales',
    description: 'Cumple con la Ley 21.719 en Chile sin frenar tu negocio. Evalúa tu empresa en 3 min, genera tu Registro RAT (Art. 14 ter) con IA y evita multas de la APDP.',
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
        description: 'Cumple con la Ley 21.719 en Chile sin frenar tu negocio. Evalúa tu empresa en 3 min, genera tu Registro RAT (Art. 14 ter) con IA y evita multas de la APDP.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CLP',
        },
      },
    ],
  },
} as const;
