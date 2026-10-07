import { useEffect } from 'react';
import { PageId } from '../../types';
import { SEO_PAGE_METAS, BREADCRUMB_MAP } from '../../config/seo.config';

/**
 * Hook para sincronizar dinámicamente el SEO (título, descripción, canonical, OpenGraph, Twitter y JSON-LD de migas de pan)
 * cuando cambia la ruta o página activa según el esquema temático oficial.
 */
export function usePageSeo(currentPage: PageId): void {
  useEffect(() => {
    const meta = SEO_PAGE_METAS[currentPage] || SEO_PAGE_METAS['inicio'];
    if (!meta) return;

    // 1. Título del documento (<title>)
    document.title = meta.title;

    // 2. Meta Description (<meta name="description">)
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', meta.description);

    // 3. Canonical Link (<link rel="canonical">)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonical);

    // 4. OpenGraph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', meta.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', meta.canonical);

    // 5. Twitter Card Tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twTitle) {
      twTitle = document.createElement('meta');
      twTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twTitle);
    }
    twTitle.setAttribute('content', meta.title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twDesc) {
      twDesc = document.createElement('meta');
      twDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twDesc);
    }
    twDesc.setAttribute('content', meta.description);

    // 6. JSON-LD dinámico de BreadcrumbList para la página activa
    const breadcrumbs = BREADCRUMB_MAP[currentPage];
    let breadcrumbScript = document.getElementById('dynamic-breadcrumb-schema') as HTMLScriptElement | null;
    if (breadcrumbs && breadcrumbs.length > 0) {
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'dynamic-breadcrumb-schema';
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      const schemaBreadcrumbs = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.label,
          'item': item.pageId ? `https://leydedatospersonaleschile.cl/#/${item.pageId}` : undefined,
        })),
      };
      breadcrumbScript.textContent = JSON.stringify(schemaBreadcrumbs, null, 2);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }
  }, [currentPage]);
}
