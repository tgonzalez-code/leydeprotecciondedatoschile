import React, { useState } from 'react';
import { POSTS_ACTUALIDAD_LEY, PostLey } from '../data/postsData';
import { PageId } from '../types';

interface BlogSectionProps {
  onNavigate?: (page: PageId) => void;
  onScrollTo?: (id: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onNavigate, onScrollTo }) => {
  const [articuloAbierto, setArticuloAbierto] = useState<PostLey | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');

  const categorias = [
    'todos',
    ...Array.from(new Set(POSTS_ACTUALIDAD_LEY.map((p) => p.categoria))),
  ];

  const articulosFiltrados = filtroCategoria === 'todos'
    ? POSTS_ACTUALIDAD_LEY
    : POSTS_ACTUALIDAD_LEY.filter((p) => p.categoria === filtroCategoria);

  const handleLinkClick = (destino: PageId) => {
    setArticuloAbierto(null);
    if (onNavigate) {
      onNavigate(destino);
    } else if (onScrollTo) {
      onScrollTo(destino);
    }
  };

  return (
    <section id="guias-recursos" aria-labelledby="heading-blog" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">menu_book</span>
              <span>AUTORIDAD TEMÁTICA & PUBLICACIÓN CONTINUA</span>
            </div>
            <h2 id="heading-blog" className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Guías y Recursos Especializados
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Análisis jurídicos y operativos sobre fiscalización de la APDP, modelos de prevención, reglamentos técnicos y derechos ARCOP.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto font-mono text-xs">
            <span className="text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-300">
              {POSTS_ACTUALIDAD_LEY.length} Artículos Publicados
            </span>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 text-xs font-mono">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFiltroCategoria(cat)}
              className={`px-3 py-1.5 rounded-full transition-all shrink-0 font-bold ${
                filtroCategoria === cat
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {cat === 'todos' ? 'Todos los Artículos' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articulosFiltrados.map((art) => (
            <article
              key={art.id}
              className="bg-zinc-50 p-6 rounded-3xl border-2 border-zinc-200 flex flex-col justify-between hover:border-orange-500 transition-all shadow-sm group hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                  <span className="text-orange-600 font-bold bg-orange-100/60 px-2 py-0.5 rounded border border-orange-200">
                    {art.categoria}
                  </span>
                  <span className="text-zinc-400">{art.lecturaMin} de lectura</span>
                </div>

                <h3 className="text-base sm:text-lg font-display font-black text-zinc-950 mb-2 leading-snug group-hover:text-orange-600 transition-colors">
                  {art.titulo}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed font-normal mb-4">
                  {art.bajada}
                </p>

                {/* Bullet Highlights */}
                <div className="bg-white p-3 rounded-xl border border-zinc-200/80 mb-4 space-y-1.5 text-[11px] text-zinc-700">
                  {art.resumenPuntos.slice(0, 2).map((pt, i) => (
                    <div key={i} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-orange-500 font-bold shrink-0">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setArticuloAbierto(art)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-orange-400 text-sm">article</span>
                  <span>Leer análisis completo</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLinkClick(art.enlaceAccionDestino)}
                  className="w-full text-left text-[11px] font-mono text-orange-700 bg-orange-50/80 p-2 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors flex items-center justify-between"
                >
                  <span className="truncate">→ {art.enlaceAccionTexto}</span>
                  <span className="material-symbols-outlined text-xs shrink-0">open_in_new</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Lectura Completa */}
        {articuloAbierto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
            <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {articuloAbierto.categoria}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {articuloAbierto.fecha} • {articuloAbierto.lecturaMin} de lectura
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setArticuloAbierto(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 flex items-center justify-center text-sm font-bold"
                  aria-label="Cerrar artículo"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-black text-zinc-950 mb-2 leading-snug">
                {articuloAbierto.titulo}
              </h3>

              <p className="text-xs text-zinc-500 font-mono mb-4">
                Por {articuloAbierto.autor} • Artículos relacionados: {articuloAbierto.articulosRelacionados.join(', ')}
              </p>

              <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4 whitespace-pre-line font-normal border-t border-zinc-100 pt-4">
                {articuloAbierto.contenidoCompleto}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleLinkClick(articuloAbierto.enlaceAccionDestino)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all inline-flex items-center gap-1.5"
                >
                  <span>{articuloAbierto.enlaceAccionTexto}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={() => setArticuloAbierto(null)}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-900"
                >
                  Cerrar lectura
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default BlogSection;
