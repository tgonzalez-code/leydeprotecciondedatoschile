import React from 'react';
import { BREADCRUMB_MAP } from '../config/seo.config';
import { PageId } from '../types';

interface BreadcrumbsProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAiChat?: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  onNavigate,
  onOpenAiChat,
}) => {
  if (currentPage === 'inicio') return null;

  const items = BREADCRUMB_MAP[currentPage] || [
    { label: 'Inicio', pageId: 'inicio' as PageId },
    { label: currentPage, current: true },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-zinc-50 border-b border-zinc-200 py-3 px-4 sm:px-6 lg:px-8 text-xs font-mono"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        
        {/* Microdata Schema BreadcrumbList */}
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="flex items-center gap-1.5 flex-wrap text-zinc-500"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={index}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center gap-1.5"
              >
                {index === 0 && (
                  <span className="material-symbols-outlined text-sm text-zinc-400" aria-hidden="true">
                    home
                  </span>
                )}

                {!isLast && item.pageId ? (
                  <button
                    type="button"
                    onClick={() => onNavigate(item.pageId!)}
                    itemProp="item"
                    className="hover:text-orange-600 transition-colors font-bold text-zinc-700"
                  >
                    <span itemProp="name">{item.label}</span>
                  </button>
                ) : (
                  <span
                    itemProp="name"
                    aria-current={isLast ? 'page' : undefined}
                    className="text-orange-600 font-bold truncate max-w-xs sm:max-w-md"
                  >
                    {item.label}
                  </span>
                )}

                <meta itemProp="position" content={String(index + 1)} />

                {!isLast && (
                  <span className="text-zinc-300" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        {/* Quick action buttons on breadcrumb bar */}
        <div className="flex items-center gap-2">
          {currentPage !== 'agente-rat' && (
            <button
              type="button"
              onClick={() => onNavigate('agente-rat')}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-xs">psychology</span>
              <span>Agente RAT (3 min)</span>
            </button>
          )}

          {onOpenAiChat && (
            <button
              type="button"
              onClick={onOpenAiChat}
              className="inline-flex items-center gap-1 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-xs text-orange-500">smart_toy</span>
              <span>Asistente IA</span>
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};
