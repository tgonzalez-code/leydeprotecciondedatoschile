import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAiChat: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAiChat }) => {
  return (
    <footer className="bg-[#050b1a] border-t border-blue-900/40 pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-lg">shield_with_heart</span>
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                leydedatospersonaleschile<span className="text-blue-400">.cl</span>
              </span>
            </div>
            <p className="text-slate-300 max-w-md text-xs leading-relaxed">
              La plataforma tecnológica chilena diseñada para que micro, pequeñas y medianas empresas cumplan con la 
              <strong> Ley 21.719</strong> y las exigencias de la <strong>Agencia de Protección de Datos Personales (APDP)</strong> sin frenar su productividad.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>Propuesta de valor: "Cumplir sin frenar el negocio"</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Módulos del Sistema
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onSelectTab('inicio')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Inicio & Diagnóstico
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('agente-rat')}
                  className="hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  <span>Agente IA RAT (Tramo 1)</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1 rounded">3 min</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('calculadora-utm')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Simulador de Multas UTM
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('gestion-arco')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Gestor de Derechos ARCO+
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('guia-ley')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Guía Artículos Ley 21.719
                </button>
              </li>
            </ul>
          </div>

          {/* Legal references */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Marco Regulatorio
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>• Ley Nº 21.719 (Protección de Datos)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>• Ley Nº 19.628 (Vida Privada)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>• Ley Nº 20.416 (Estatuto Pyme)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>• Fiscalizador: APDP Chile</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAiChat}
                  className="inline-flex items-center gap-1.5 bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/60 px-3 py-1.5 rounded-lg font-bold"
                >
                  <span className="material-symbols-outlined text-sm text-amber-300">smart_toy</span>
                  <span>Consultar Asistente IA</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer mandated by system instruction */}
        <div className="pt-6 border-t border-blue-900/30 text-center space-y-2">
          <p className="text-[11px] text-slate-400 max-w-4xl mx-auto leading-relaxed">
            <strong>Descargo de Responsabilidad:</strong> Esta plataforma brinda orientación técnica y operativa sobre la Ley 21.719 
            y facilita la estructuración del Registro de Actividades de Tratamiento (RAT - Art. 14 ter) para entidades en Chile. 
            Para asuntos contenciosos específicos, reclamaciones formales o litigios complejos, siempre se recomienda validación jurídica profesional.
          </p>
          <p className="text-[10px] text-slate-500 font-mono">
            © {new Date().getFullYear()} leydedatospersonaleschile.cl • Santiago de Chile • República de Chile
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
