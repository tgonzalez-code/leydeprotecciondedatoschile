import React, { useState } from 'react';
import { ARTICULOS_LEY_COMPENDIO } from '../content/law-21719';

interface LegalArticlesGuideProps {
  onGoToRat: () => void;
}

const LegalArticlesGuide: React.FC<LegalArticlesGuideProps> = ({ onGoToRat }) => {
  const [busqueda, setBusqueda] = useState('');
  const [articuloAbierto, setArticuloAbierto] = useState<string>('Artículo 14 ter');

  const articulosFiltrados = ARTICULOS_LEY_COMPENDIO.filter(
    (a) =>
      a.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.resumen.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.contenido.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div id="guia-legal" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span>COMPENDIO NORMATIVO CHILENO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Artículos Clave de la Ley 21.719
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Análisis operativo y comentarios prácticos de las disposiciones legales que regularán a las empresas en Chile.
            </p>
          </div>

          <div className="w-full md:w-72">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">search</span>
              <input
                type="text"
                placeholder="Buscar artículo o concepto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-zinc-200 focus:border-orange-500 focus:outline-none text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Articles Accordion */}
        <div className="space-y-4">
          {articulosFiltrados.map((art) => {
            const isOpen = articuloAbierto === art.numero;
            return (
              <div
                key={art.numero}
                className="rounded-2xl border-2 border-zinc-200 overflow-hidden bg-white shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setArticuloAbierto(isOpen ? '' : art.numero)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-zinc-50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold bg-orange-100 text-orange-950 px-2 py-0.5 rounded border border-orange-200">
                        {art.numero}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {art.tag}
                      </span>
                    </div>
                    <strong className="text-base sm:text-lg font-display font-black text-zinc-950 block">
                      {art.titulo}
                    </strong>
                    <p className="text-xs text-zinc-600 font-normal">
                      {art.resumen}
                    </p>
                  </div>

                  <span className="material-symbols-outlined text-zinc-400 text-xl shrink-0 mt-1">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-zinc-100 bg-zinc-50/50 space-y-4">
                    <div className="p-4 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm text-zinc-800 font-mono whitespace-pre-line leading-relaxed">
                      {art.contenido}
                    </div>

                    {art.numero === 'Artículo 14 ter' && (
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={onGoToRat}
                          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all"
                        >
                          <span>Cumplir Art. 14 ter con el Agente RAT</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default LegalArticlesGuide;
