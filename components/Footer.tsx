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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-lg">shield</span>
              </div>
              <span className="font-display font-black text-lg text-zinc-950 tracking-tight">
                leydedatospersonaleschile<span className="text-orange-500">.cl</span>
              </span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed font-normal">
              Portal y LegalTech para que las empresas en Chile cumplan con la 
              <strong> {SITE_CONFIG.primaryLaw}</strong> y las directrices de la <strong>{SITE_CONFIG.regulatorName}</strong>.
            </p>
            <div className="inline-block bg-orange-100 text-orange-950 border border-orange-200 font-mono text-[10px] font-bold px-2 py-1 rounded">
              "{SITE_CONFIG.tagline}"
            </div>
          </div>

          {/* SILO 1: Ley 21.719 & ARCOP */}
          <div>
            <div className="flex items-center gap-1.5 text-zinc-950 font-mono font-bold uppercase text-[11px] mb-3 pb-1 border-b border-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>1. Ley 21.719 & APDP</span>
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('ley-21719')}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  • La Ley 21.719 & Vacancia
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('derechos-arcop')}
                  className="hover:text-orange-600 transition-colors text-left font-bold text-orange-600"
                >
                  • Derechos ARCOP (SLA 2 días)
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('guias-recursos')}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  • Guías, Artículos & Recursos
                </button>
              </li>
            </ul>
          </div>

          {/* SILO 2: Ley 19.628 & RAT */}
          <div>
            <div className="flex items-center gap-1.5 text-zinc-950 font-mono font-bold uppercase text-[11px] mb-3 pb-1 border-b border-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>2. Ley 19.628 & RAT</span>
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('compendio-legal')}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  • Ley 19.628 Modificada
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('agente-rat')}
                  className="hover:text-orange-600 transition-colors text-left font-bold text-orange-600"
                >
                  • Registro RAT (Art. 14 ter)
                </button>
              </li>
              <li>
                <a
                  href="https://www.bcn.cl/leychile/navegar?idNorma=1208940"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors flex items-center justify-between group"
                >
                  <span>• BCN: Texto Oficial Ley</span>
                  <span className="material-symbols-outlined text-xs text-zinc-400 group-hover:text-orange-600">open_in_new</span>
                </a>
              </li>
            </ul>
          </div>

          {/* SILO 3: Ruta de Cumplimiento (Diagnóstico -> Calculadora -> Servicios) */}
          <div>
            <div className="flex items-center gap-1.5 text-zinc-950 font-mono font-bold uppercase text-[11px] mb-3 pb-1 border-b border-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>3. Cumplimiento Pyme</span>
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('test-cumplimiento')}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  1. Test Diagnóstico (60s)
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('multas-utm')}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  2. Calculadora de Multas UTM
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('casos-pymes')}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  3. Servicios & Casos Prácticos
                </button>
              </li>
              <li className="pt-1.5">
                <button
                  type="button"
                  onClick={onOpenAiChat}
                  className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-xs text-orange-400">smart_toy</span>
                  <span>Consultar Asistente IA</span>
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
