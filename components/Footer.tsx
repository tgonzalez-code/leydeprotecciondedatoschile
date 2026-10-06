import React from 'react';
import { SITE_CONFIG } from '../config/site.config';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenAiChat: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAiChat }) => {
  return (
    <footer className="bg-white border-t-2 border-zinc-950 pt-12 pb-8 text-xs text-zinc-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-lg">shield</span>
              </div>
              <span className="font-display font-black text-lg text-zinc-950 tracking-tight">
                leydedatospersonaleschile<span className="text-orange-500">.cl</span>
              </span>
            </div>
            <p className="text-zinc-600 max-w-md text-xs leading-relaxed font-normal">
              Plataforma tecnológica diseñada para que micro, pequeñas y medianas empresas en Chile cumplan con la 
              <strong> {SITE_CONFIG.primaryLaw}</strong> y los requerimientos de la <strong>{SITE_CONFIG.regulatorName}</strong>.
            </p>
            <div className="inline-block bg-orange-100 text-orange-950 border border-orange-200 font-mono text-[11px] font-bold px-2.5 py-1 rounded">
              Propuesta de valor: "{SITE_CONFIG.tagline}"
            </div>
          </div>

          {/* Direct Navigation */}
          <div>
            <h4 className="font-mono font-bold text-zinc-950 uppercase text-[11px] mb-3">
              Páginas del Sistema
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('ley-21719')}
                  className="hover:text-orange-600 transition-colors"
                >
                  La Ley 21.719 & Vigencia
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('agente-rat')}
                  className="hover:text-orange-600 transition-colors font-bold text-orange-600 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Agente RAT (Art. 14 ter)</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('derechos-arcop')}
                  className="hover:text-orange-600 transition-colors"
                >
                  SLAs Derechos ARCO+ (2 días)
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('multas-utm')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Simulador de Multas UTM
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('test-cumplimiento')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Test Diagnóstico
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('casos-pymes')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Casos Prácticos en Pymes
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('guias-recursos')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Guías & Recursos
                </button>
              </li>
            </ul>
          </div>

          {/* Legal references */}
          <div>
            <h4 className="font-mono font-bold text-zinc-950 uppercase text-[11px] mb-3">
              Marco Regulatorio Oficial
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {SITE_CONFIG.frameworkLaws.map((law, idx) => (
                <li key={idx}>
                  <a
                    href={law.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 transition-colors flex items-center justify-between group"
                    title={`Ver texto oficial de ${law.name} en Biblioteca del Congreso Nacional de Chile`}
                  >
                    <span className="group-hover:underline">{law.name}</span>
                    <span className="material-symbols-outlined text-xs text-zinc-400 group-hover:text-orange-600">open_in_new</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compendio-legal')}
                  className="text-orange-600 font-bold hover:underline transition-colors flex items-center gap-1 mt-1"
                >
                  <span>→ Compendio de Artículos Analizados</span>
                </button>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAiChat}
                  className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm text-orange-400">smart_toy</span>
                  <span>Consultar Asistente Legal</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div>
            © {SITE_CONFIG.year} {SITE_CONFIG.name}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Orientación técnica y operativa para empresas chilenas.</span>
            <span>•</span>
            <span className="text-zinc-600 font-bold">Ley Nº 21.719</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
