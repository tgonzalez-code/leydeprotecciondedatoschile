import React from 'react';
import { PageId } from '../types';

interface LeyExplainerSectionProps {
  onNavigate: (page: PageId) => void;
}

const LeyExplainerSection: React.FC<LeyExplainerSectionProps> = ({ onNavigate }) => {
  return (
    <section id="ley-21719" className="py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              CLAVES DE LA NUEVA REGULACIÓN CHILENA
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight leading-tight">
              ¿Qué cambia con la Ley 21.719 para tu empresa?
            </h2>
            <p className="mt-3 text-base text-zinc-600 font-normal leading-relaxed">
              Chile modernizó su marco de protección de datos al nivel del estándar europeo (RGPD).
              Aquí te explicamos lo que realmente importa para la gestión de tu negocio:
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('ley-21719')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-orange-600 hover:text-orange-700 hover:underline self-start md:self-auto"
          >
            <span>Ver articulado y calendario de vigencia completo</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* 4 Pillars of the Law */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-xl">domain</span>
            </div>
            <strong className="text-base font-display font-bold text-zinc-950 block">
              1. ¿A quiénes aplica?
            </strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              A <strong>toda empresa</strong> que opere en Chile y maneje datos personales de clientes, usuarios, colaboradores o proveedores, sin importar si es micro, pequeña o gran empresa.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-xl">gavel</span>
            </div>
            <strong className="text-base font-display font-bold text-zinc-950 block">
              2. Nueva Autoridad: APDP
            </strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Se crea la <strong>Agencia de Protección de Datos Personales</strong>, con facultades para fiscalizar de oficio, dictar normas vinculantes e investigar denuncias de personas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-xl">lock_person</span>
            </div>
            <strong className="text-base font-display font-bold text-zinc-950 block">
              3. Derechos ARCOP
            </strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Los ciudadanos pueden exigir: <strong>Acceso</strong>, <strong>Rectificación</strong>, <strong>Cancelación</strong>, <strong>Oposición</strong>, <strong>Portabilidad</strong> y <strong>Bloqueo Temporal</strong> (este último en máx. 48 horas hábiles).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-xl">trending_up</span>
            </div>
            <strong className="text-base font-display font-bold text-zinc-950 block">
              4. Beneficio Pyme
            </strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Bajo la Ley 20.416, las PYMEs en su primera infracción pueden sustituir multas pecuniarias por <strong>amonestación escrita</strong>, siempre que cuenten con su RAT formalmente documentado.
            </p>
          </div>

        </div>

        {/* Quick Action Navigation Strip */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-zinc-900 block">
              ¿Quieres calcular las multas en UTM según la gravedad de una infracción?
            </span>
            <span className="text-xs text-zinc-500">
              Las sanciones van desde leves (hasta 5.000 UTM) hasta gravísimas (hasta 20.000 UTM).
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('multas-utm')}
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
            >
              Simulador de Multas UTM
            </button>
            <button
              type="button"
              onClick={() => onNavigate('derechos-arcop')}
              className="bg-orange-50 hover:bg-orange-100 text-orange-950 border border-orange-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
            >
              Guía Derechos ARCOP
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeyExplainerSection;
