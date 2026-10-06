import React, { useState } from 'react';

interface UTMCalculatorProps {
  onGoToRat: () => void;
}

const UTMCalculator: React.FC<UTMCalculatorProps> = ({ onGoToRat }) => {
  const [utmValue, setUtmValue] = useState<number>(66362); // Valor real referencial UTM en Chile
  const [tipoInfraccion, setTipoInfraccion] = useState<'leve' | 'grave' | 'gravisima'>('grave');
  const [esPyme, setEsPyme] = useState<boolean>(true);
  const [esReincidente, setEsReincidente] = useState<boolean>(false);
  const [ventasAnualesCLP, setVentasAnualesCLP] = useState<number>(500000000); // 500 millones para cálculo de %

  // Quiz rápido de riesgo
  const [tieneRAT, setTieneRAT] = useState<boolean>(false);
  const [respondeBloqueo2Dias, setRespondeBloqueo2Dias] = useState<boolean>(false);
  const [manejaDatosSensibles, setManejaDatosSensibles] = useState<boolean>(true);

  const getDetallesInfraccion = () => {
    switch (tipoInfraccion) {
      case 'leve':
        return {
          nombre: 'Infracción Leve',
          maxUtm: 5000,
          ejemplos: [
            'No mantener actualizado el Registro de Actividades de Tratamiento (RAT).',
            'Demoras no graves en la entrega de información ante solicitudes de acceso.',
            'No comunicar cambios menores en las políticas de privacidad.',
          ],
        };
      case 'grave':
        return {
          nombre: 'Infracción Grave',
          maxUtm: 10000,
          ejemplos: [
            'Tratar datos personales sin base de licitud (sin consentimiento ni contrato legal).',
            'No contar con el Registro de Actividades de Tratamiento (RAT - Art. 14 ter).',
            'Incumplir el plazo perentorio de 2 días hábiles para el Bloqueo Temporal.',
            'Traspasar datos a terceros proveedores sin cláusulas de encargado de tratamiento.',
          ],
        };
      case 'gravisima':
        return {
          nombre: 'Infracción Gravísima',
          maxUtm: 20000,
          ejemplos: [
            'Filtración o fuga de datos sensibles (salud, biométricos, menores) por negligencia grave.',
            'Tratamiento ilícito doloso o venta no autorizada de bases de datos.',
            'Desacato reiterado de instrucciones o medidas cautelares de la APDP.',
          ],
        };
    }
  };

  const detalle = getDetallesInfraccion();
  const montoMaximoCLP = detalle.maxUtm * utmValue;
  const porcentajeVentasMax = tipoInfraccion === 'gravisima' && esReincidente ? ventasAnualesCLP * 0.04 : 0;

  // Cálculo de nivel de riesgo
  const puntosRiesgo = (!tieneRAT ? 40 : 0) + (!respondeBloqueo2Dias ? 30 : 0) + (manejaDatosSensibles ? 20 : 0);
  const nivelRiesgo = puntosRiesgo >= 60 ? 'Crítico' : puntosRiesgo >= 30 ? 'Medio' : 'Controlado';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-red-950/80 border border-red-800/60 px-3 py-1 rounded-full text-xs text-red-300 font-mono mb-3">
          <span className="material-symbols-outlined text-sm text-red-400">gavel</span>
          <span>RÉGIMEN SANCIONATORIO • LEY 21.719</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Simulador Oficial de Multas UTM & Riesgo APDP
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          La nueva Agencia de Protección de Datos Personales (APDP) cuenta con facultades 
          fiscalizadoras reales y potestad sancionatoria en UTM o porcentaje de ventas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Controls & Parameters */}
        <div className="lg:col-span-7 bg-[#0b1633] p-6 sm:p-8 rounded-3xl border border-blue-900/60 shadow-xl space-y-6">
          <div className="border-b border-blue-900/40 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400">tune</span>
              Parámetros de Evaluación
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Ajusta las condiciones de tu empresa para proyectar el escenario ante una fiscalización.
            </p>
          </div>

          {/* Valor UTM */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <label className="font-semibold text-slate-200">
                Valor Referencial de la UTM (Chile):
              </label>
              <span className="font-mono text-blue-300 font-bold">
                ${utmValue.toLocaleString('es-CL')} CLP
              </span>
            </div>
            <input
              type="range"
              min={60000}
              max={75000}
              step={500}
              value={utmValue}
              onChange={(e) => setUtmValue(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>$60.000 CLP</span>
              <span>Actual: ~$66.362 CLP</span>
              <span>$75.000 CLP</span>
            </div>
          </div>

          {/* Grado de Infracción */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-2">
              Gravedad de la Infracción Evaluada:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'leve', label: 'Leve', utm: 'Hasta 5.000 UTM', color: 'border-yellow-700 bg-yellow-950/20' },
                { key: 'grave', label: 'Grave', utm: 'Hasta 10.000 UTM', color: 'border-orange-700 bg-orange-950/20' },
                { key: 'gravisima', label: 'Gravísima', utm: 'Hasta 20.000 UTM', color: 'border-red-700 bg-red-950/20' },
              ].map((g) => (
                <button
                  key={g.key}
                  onClick={() => setTipoInfraccion(g.key as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    tipoInfraccion === g.key
                      ? 'border-blue-500 bg-blue-600/20 ring-2 ring-blue-500/50'
                      : 'border-slate-800 bg-[#08122c] opacity-70 hover:opacity-100'
                  }`}
                >
                  <strong className="block text-white text-xs sm:text-sm font-bold">{g.label}</strong>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{g.utm}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Switch Beneficio Pyme */}
          <div className="bg-[#08122c] p-4 rounded-2xl border border-blue-900/60 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-lg">verified</span>
                <h3 className="font-bold text-sm text-white">
                  Beneficio Pyme (Ley 20.416 - Estatuto Pyme)
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Permite a Micro y Pequeñas empresas acceder a <strong>Amonestación Escrita</strong> en lugar de multa económica en la 1ra infracción, 
                <strong className="text-amber-300"> siempre que acrediten regularización inmediata presentando su RAT</strong>.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={esPyme}
                onChange={(e) => setEsPyme(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Switch Reincidencia */}
          <div className="flex items-center justify-between text-xs text-slate-300 px-1">
            <span>¿Existe reincidencia en los últimos 24 meses?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={esReincidente}
                onChange={(e) => setEsReincidente(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          {/* Ejemplos de infracción */}
          <div className="bg-[#091533] p-4 rounded-2xl border border-blue-900/50">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">
              Hechos que tipifican como {detalle.nombre}:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {detalle.ejemplos.map((ej, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 text-xs mt-0.5">•</span>
                  <span>{ej}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Col: Calculation Results & Impact */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Calculation Card */}
          <div className="bg-gradient-to-br from-[#0c1a40] to-[#070e24] p-6 sm:p-8 rounded-3xl border-2 border-red-500/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-600/20 text-red-300 text-[10px] font-mono px-3 py-1 rounded-bl-xl font-bold">
              TOPE LEGAL APDP
            </div>

            <span className="text-xs text-slate-400 uppercase font-mono font-semibold block">
              Sanción Económica Máxima Aplicable:
            </span>

            <div className="mt-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight block">
                ${montoMaximoCLP.toLocaleString('es-CL')}
                <span className="text-xs font-sans text-slate-400 ml-1">CLP</span>
              </span>
              <span className="text-sm font-mono text-red-400 font-semibold block mt-1">
                Equivalente a {detalle.maxUtm.toLocaleString('es-CL')} UTM
              </span>
            </div>

            {/* Pyme Benefit Callout */}
            {esPyme && !esReincidente ? (
              <div className="mt-5 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-600/60 text-xs text-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-emerald-100 text-sm mb-1">
                  <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
                  <span>Atenuante Activa: Amonestación Escrita</span>
                </div>
                <p className="leading-relaxed">
                  Gracias a la Ley 20.416, la APDP puede sustituir esta multa por una <strong>amonestación</strong>, 
                  pero la ley exige <strong>regularizar y acreditar el RAT de inmediato</strong>. Si no presentas el RAT, la multa se hace efectiva.
                </p>
              </div>
            ) : (
              <div className="mt-5 p-4 rounded-2xl bg-red-950/50 border border-red-700/60 text-xs text-red-200">
                <p className="font-bold text-red-100 mb-1">
                  ⚠️ Riesgo Patrimonial Directo
                </p>
                <p className="leading-relaxed">
                  Sin beneficio Pyme o en caso de reincidencia, la APDP ejecuta directamente la cobranza a través de la Tesorería General de la República.
                </p>
              </div>
            )}

            {/* Action CTA */}
            <div className="mt-6">
              <button
                onClick={onGoToRat}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-base">shield</span>
                <span>Generar RAT y blindar mi Pyme ahora</span>
              </button>
            </div>
          </div>

          {/* Quick Risk Scorecard */}
          <div className="bg-[#0b1633] p-6 rounded-3xl border border-blue-900/60 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center justify-between">
              <span>Termómetro de Cumplimiento Rápido</span>
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                nivelRiesgo === 'Crítico' ? 'bg-red-950 text-red-300 border border-red-800' :
                nivelRiesgo === 'Medio' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                Riesgo {nivelRiesgo}
              </span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#08122c] border border-blue-900/40 cursor-pointer">
                <span>¿Ya cuentas con tu RAT (Art. 14 ter)?</span>
                <input
                  type="checkbox"
                  checked={tieneRAT}
                  onChange={(e) => setTieneRAT(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0 w-4 h-4 bg-slate-800 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#08122c] border border-blue-900/40 cursor-pointer">
                <span>¿Puedes responder un Bloqueo en 2 días?</span>
                <input
                  type="checkbox"
                  checked={respondeBloqueo2Dias}
                  onChange={(e) => setRespondeBloqueo2Dias(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0 w-4 h-4 bg-slate-800 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#08122c] border border-blue-900/40 cursor-pointer">
                <span>¿Manejas RUT, planillas o cámaras CCTV?</span>
                <input
                  type="checkbox"
                  checked={manejaDatosSensibles}
                  onChange={(e) => setManejaDatosSensibles(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0 w-4 h-4 bg-slate-800 border-slate-700"
                />
              </label>
            </div>

            {!tieneRAT && (
              <p className="text-[11px] text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/40">
                🚨 <strong>Atención:</strong> Sin el RAT formalizado, tu empresa está en causal de infracción grave directa ante cualquier denuncia ciudadana en la APDP.
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default UTMCalculator;
