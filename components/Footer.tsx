import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAiChat: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAiChat }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-10 pb-8 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-900 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm">shield</span>
              </div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                leydedatospersonaleschile<span className="text-blue-900">.cl</span>
              </span>
            </div>
            <p className="text-slate-600 max-w-md text-xs leading-relaxed">
              Plataforma tecnológica diseñada para que micro, pequeñas y medianas empresas en Chile cumplan con la 
              <strong> Ley Nº 21.719</strong> y los requerimientos de la <strong>Agencia de Protección de Datos Personales (APDP)</strong>.
            </p>
            <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
              <span>✓ Propuesta de valor: "Cumplir sin frenar el negocio"</span>
            </div>
          </div>

          {/* Module Links */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-2 font-mono">
              Módulos del Sistema
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => onSelectTab('inicio')}
                  className="hover:text-blue-900 transition-colors"
                >
                  Panel General
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('agente-rat')}
                  className="hover:text-blue-900 transition-colors flex items-center gap-1 font-semibold text-blue-900"
                >
                  <span>Agente RAT (Art. 14 ter)</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1 rounded font-mono font-bold">3 min</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('calculadora-utm')}
                  className="hover:text-blue-900 transition-colors"
                >
                  Simulador de Multas UTM
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('gestion-arco')}
                  className="hover:text-blue-900 transition-colors"
                >
                  Gestor de Derechos ARCO+
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('guia-ley')}
                  className="hover:text-blue-900 transition-colors"
                >
                  Compendio Normativo Ley 21.719
                </button>
              </li>
            </ul>
          </div>

          {/* Legal references */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-2 font-mono">
              Marco Legal
            </h4>
            <ul className="space-y-1 text-[11px] text-slate-600 font-mono">
              <li>• Ley Nº 21.719 (Protección de Datos)</li>
              <li>• Ley Nº 19.628 (Vida Privada)</li>
              <li>• Ley Nº 20.416 (Estatuto Pyme)</li>
              <li>• Fiscalizador: APDP Chile</li>
              <li className="pt-2">
                <button
                  onClick={onOpenAiChat}
                  className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 px-3 py-1 rounded text-xs font-bold"
                >
                  <span className="material-symbols-outlined text-xs text-amber-500">smart_toy</span>
                  <span>Consultar con el Asistente</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="pt-5 border-t border-slate-200 text-center space-y-1.5">
          <p className="text-[11px] text-slate-500 max-w-4xl mx-auto leading-relaxed">
            <strong>Descargo de Responsabilidad:</strong> Esta plataforma brinda orientación técnica y operativa sobre la Ley 21.719 
            y facilita la estructuración del Registro de Actividades de Tratamiento (RAT - Art. 14 ter) para entidades en Chile. 
            Para asuntos contenciosos específicos, reclamaciones formales o litigios complejos, siempre se recomienda validación jurídica profesional.
          </p>
          <p className="text-[10px] text-slate-400 font-mono">
            © {new Date().getFullYear()} leydedatospersonaleschile.cl • Santiago de Chile • República de Chile
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
