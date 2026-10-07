import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePageSeo } from './usePageSeo';
import { SEO_PAGE_METAS } from '../../config/seo.config';
import { PageId } from '../../types';

describe('usePageSeo', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = `
      <meta name="description" content="initial" />
      <link rel="canonical" href="https://example.com" />
      <meta property="og:title" content="initial" />
      <meta property="og:description" content="initial" />
      <meta name="twitter:title" content="initial" />
      <meta name="twitter:description" content="initial" />
    `;
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('actualiza el título del documento y meta tags para la página de inicio', () => {
    renderHook(() => usePageSeo('inicio'));

    expect(document.title).toBe(SEO_PAGE_METAS['inicio'].title);

    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    expect(metaDesc).toBe(SEO_PAGE_METAS['inicio'].description);

    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    expect(canonical).toBe(SEO_PAGE_METAS['inicio'].canonical);

    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    expect(ogTitle).toBe(SEO_PAGE_METAS['inicio'].title);

    const twTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    expect(twTitle).toBe(SEO_PAGE_METAS['inicio'].title);
  });

  it('actualiza correctamente al cambiar de ruta a agente-rat', () => {
    const { rerender } = renderHook(({ page }: { page: PageId }) => usePageSeo(page), {
      initialProps: { page: 'inicio' as PageId },
    });

    expect(document.title).toBe(SEO_PAGE_METAS['inicio'].title);

    rerender({ page: 'agente-rat' });

    expect(document.title).toBe(SEO_PAGE_METAS['agente-rat'].title);

    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    expect(metaDesc).toBe(SEO_PAGE_METAS['agente-rat'].description);

    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    expect(canonical).toBe(SEO_PAGE_METAS['agente-rat'].canonical);

    // Dynamic breadcrumb schema script
    const breadcrumbScript = document.getElementById('dynamic-breadcrumb-schema');
    expect(breadcrumbScript).not.toBeNull();
    const parsedSchema = JSON.parse(breadcrumbScript!.textContent || '{}');
    expect(parsedSchema['@type']).toBe('BreadcrumbList');
    expect(parsedSchema.itemListElement.length).toBeGreaterThan(0);
  });

  it('actualiza correctamente para derechos-arcop y multas-utm', () => {
    const { rerender } = renderHook(({ page }: { page: PageId }) => usePageSeo(page), {
      initialProps: { page: 'derechos-arcop' as PageId },
    });

    expect(document.title).toBe(SEO_PAGE_METAS['derechos-arcop'].title);

    rerender({ page: 'multas-utm' });
    expect(document.title).toBe(SEO_PAGE_METAS['multas-utm'].title);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(SEO_PAGE_METAS['multas-utm'].canonical);
  });

  it('crea elementos faltantes si no existen previamente en el DOM', () => {
    document.head.innerHTML = ''; // completely empty head

    renderHook(() => usePageSeo('ley-21719'));

    expect(document.title).toBe(SEO_PAGE_METAS['ley-21719'].title);
    expect(document.querySelector('meta[name="description"]')).not.toBeNull();
    expect(document.querySelector('link[rel="canonical"]')).not.toBeNull();
    expect(document.querySelector('meta[property="og:title"]')).not.toBeNull();
    expect(document.querySelector('meta[property="og:description"]')).not.toBeNull();
    expect(document.querySelector('meta[property="og:url"]')).not.toBeNull();
    expect(document.querySelector('meta[name="twitter:title"]')).not.toBeNull();
    expect(document.querySelector('meta[name="twitter:description"]')).not.toBeNull();
  });
});
