import React from 'react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenAiChat: () => void;
}

const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenAiChat }) => {
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
              <strong> Ley Nº 21.719</strong> y los requerimientos de la <strong>Agencia de Protección de Datos Personales (APDP)</strong>.
            </p>
            <div className="inline-block bg-orange-100 text-orange-950 border border-orange-200 font-mono text-[11px] font-bold px-2.5 py-1 rounded">
              Propuesta de valor: "Cumplir sin frenar el negocio"
            </div>
          </div>

          {/* Direct Navigation */}
          <div>
            <h4 className="font-mono font-bold text-zinc-950 uppercase text-[11px] mb-3">
              Módulos del Sistema
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  onClick={() => onScrollTo('agente-rat')}
                  className="hover:text-orange-600 transition-colors font-bold text-zinc-950 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Agente RAT (Art. 14 ter)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('multas-utm')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Simulador de Multas UTM
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('derechos-arco')}
                  className="hover:text-orange-600 transition-colors"
                >
                  SLAs Derechos ARCO+ (2 días)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('casos')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Casos Prácticos en Pymes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('guia-legal')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Compendio Normativo Ley 21.719
                </button>
              </li>
            </ul>
          </div>

          {/* Legal references */}
          <div>
            <h4 className="font-mono font-bold text-zinc-950 uppercase text-[11px] mb-3">
              Marco Regulatorio
            </h4>
            <ul className="space-y-1.5 text-[11px] text-zinc-600 font-mono">
              <li>• Ley Nº 21.719 (Protección de Datos)</li>
              <li>• Ley Nº 19.628 (Vida Privada)</li>
              <li>• Ley Nº 20.416 (Estatuto Pyme)</li>
              <li>• Fiscalizador: APDP Chile</li>
              <li className="pt-2">
                <button
                  onClick={onOpenAiChat}
                  className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  <span className="material-symbols-outlined text-sm text-orange-400">smart_toy</span>
                  <span>Abrir Asistente IA</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Legal Disclaimer */}
        <div className="pt-6 border-t border-zinc-200 text-center space-y-2">
          <p className="text-[11px] text-zinc-500 max-w-4xl mx-auto leading-relaxed">
            <strong>Descargo de Responsabilidad:</strong> Esta plataforma brinda orientación técnica y operativa sobre la Ley 21.719 
            y facilita la estructuración del Registro de Actividades de Tratamiento (RAT - Art. 14 ter) para entidades en Chile. 
            Para asuntos contenciosos específicos, reclamaciones formales o litigios complejos, siempre se recomienda validación jurídica profesional.
          </p>
          <p className="text-[10px] text-zinc-400 font-mono">
            © {new Date().getFullYear()} leydedatospersonaleschile.cl • Santiago de Chile • República de Chile
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
