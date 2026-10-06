import React, { useState } from 'react';

interface UTMCalculatorProps {
  onGoToRat: () => void;
}

// Valor oficial fijado por la plataforma según publicación SII / Banco Central
const VALOR_UTM_OFICIAL = 67294;

const UTMCalculator: React.FC<UTMCalculatorProps> = ({ onGoToRat }) => {
  const utmValue = VALOR_UTM_OFICIAL;
  const [tipoInfraccion, setTipoInfraccion] = useState<'leve' | 'grave' | 'gravisima'>('grave');
  const [esPyme, setEsPyme] = useState<boolean>(true);
  const [esReincidente, setEsReincidente] = useState<boolean>(false);

  // Checklist de cumplimiento
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
            'No mantener debidamente actualizado el Registro de Actividades de Tratamiento (RAT).',
            'Demoras no graves en la entrega de información ante solicitudes de acceso.',
            'No comunicar modificaciones menores en los avisos de privacidad.',
          ],
        };
      case 'grave':
        return {
          nombre: 'Infracción Grave',
          maxUtm: 10000,
          ejemplos: [
            'Tratar datos personales sin base de licitud (sin consentimiento expreso ni contrato).',
            'No contar con el Registro de Actividades de Tratamiento (RAT - Art. 14 ter).',
            'Incumplir el plazo perentorio de 2 días hábiles para el Bloqueo Temporal.',
            'Traspasar bases de datos a proveedores sin cláusula de encargado de tratamiento.',
          ],
        };
      case 'gravisima':
        return {
          nombre: 'Infracción Gravísima',
          maxUtm: 20000,
          ejemplos: [
            'Fuga masiva de datos sensibles (salud, biometría, RUT) por negligencia grave.',
            'Venta o comercialización ilícita de datos personales de clientes o trabajadores.',
            'Desacato reiterado de instrucciones o medidas cautelares de la APDP.',
          ],
        };
    }
  };

  const detalle = getDetallesInfraccion();
  const montoMaximoCLP = detalle.maxUtm * utmValue;
  const puntosRiesgo = (!tieneRAT ? 40 : 0) + (!respondeBloqueo2Dias ? 30 : 0) + (manejaDatosSensibles ? 20 : 0);
  const nivelRiesgo = puntosRiesgo >= 60 ? 'Crítico' : puntosRiesgo >= 30 ? 'Medio' : 'Controlado';

  return (
    <div id="multas-utm" className="py-14 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600">gavel</span>
              <span>POTESTAD SANCIONATORIA DE LA APDP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Simulador de Multas en UTM
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl">
              Proyecta el riesgo financiero real ante fiscalizaciones de la Agencia de Protección de Datos Personales (Ley 21.719).
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border-2 border-zinc-900 font-mono text-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-lg">lock</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">VALOR OFICIAL UTM FIJADO:</span>
              <strong className="text-zinc-950 text-sm font-black">${utmValue.toLocaleString('es-CL')} CLP</strong>
              <span className="text-[10px] text-orange-600 ml-1.5 font-bold">(SII Chile)</span>
            </div>
          </div>
        </div>

        {/* Calculation & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Col */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-zinc-900 shadow-xl space-y-6">
            
            {/* Severity selection */}
            <div>
              <label className="block text-xs font-mono font-bold text-zinc-900 uppercase mb-2">
                1. Selecciona la Gravedad de la Infracción
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'leve', label: 'Leve', utm: 'Hasta 5.000 UTM' },
                  { key: 'grave', label: 'Grave', utm: 'Hasta 10.000 UTM' },
                  { key: 'gravisima', label: 'Gravísima', utm: 'Hasta 20.000 UTM' },
                ].map((g) => (
                  <button
                    key={g.key}
                    onClick={() => setTipoInfraccion(g.key as any)}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                      tipoInfraccion === g.key
                        ? 'border-orange-500 bg-orange-50/60 shadow-sm'
                        : 'border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    <strong className="block text-zinc-950 font-display font-bold text-xs sm:text-sm">{g.label}</strong>
                    <span className="text-[10px] text-orange-600 font-mono font-bold block mt-1">{g.utm}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fixed Official UTM Info Card */}
            <div className="p-4 rounded-2xl bg-zinc-50 border-2 border-zinc-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-orange-500 text-xl">verified_user</span>
                <div>
                  <span className="text-xs font-mono font-bold text-zinc-900 block">
                    Valor UTM Oficial Vigente Fijado por Sistema:
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Calculado automáticamente conforme a la publicación tributaria del SII y Banco Central.
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm sm:text-base font-mono font-black text-orange-600">
                  ${utmValue.toLocaleString('es-CL')} CLP
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block">1 UTM</span>
              </div>
            </div>

            {/* Estatuto Pyme Switch */}
            <div className="p-4 rounded-2xl bg-zinc-50 border-2 border-zinc-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 font-display font-bold text-sm text-zinc-950">
                  <span className="material-symbols-outlined text-orange-500 text-lg">verified</span>
                  Beneficio Pyme: Amonestación Escrita (Ley 20.416)
                </div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Para Micro y Pequeñas empresas sin reincidencia, la APDP sustituye la multa por amonestación escrita, 
                  <strong className="text-zinc-950"> con la condición obligatoria de presentar de inmediato el RAT regularizado</strong>.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={esPyme}
                  onChange={(e) => setEsPyme(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            {/* Reincidencia */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-700 px-1">
              <span>¿Registra infracciones previas en los últimos 24 meses?</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={esReincidente}
                  onChange={(e) => setEsReincidente(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {/* Infracciones tipificadas */}
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200">
              <span className="text-[11px] font-mono font-bold text-orange-900 uppercase block mb-1.5">
                Hechos que constituyen {detalle.nombre}:
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-700">
                {detalle.ejemplos.map((ej, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>{ej}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Results Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-zinc-900 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
                  Sanción Máxima Proyectada
                </span>
                <span className="text-xs font-mono font-bold bg-orange-100 text-orange-900 px-2.5 py-1 rounded-full border border-orange-300">
                  {detalle.maxUtm.toLocaleString('es-CL')} UTM
                </span>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
                  ${montoMaximoCLP.toLocaleString('es-CL')} <span className="text-sm font-sans text-zinc-500">CLP</span>
                </p>
                <span className="text-xs font-mono text-orange-600 font-bold block mt-1">
                  Potestad sancionatoria de la APDP
                </span>
              </div>

              {/* Status Outcome */}
              {esPyme && !esReincidente ? (
                <div className="mt-6 p-4 rounded-2xl bg-orange-50 border-2 border-orange-500 text-xs text-zinc-900">
                  <div className="flex items-center gap-1.5 font-bold font-display text-sm text-zinc-950 mb-1">
                    <span className="material-symbols-outlined text-orange-600 text-base">verified</span>
                    Atenuante Activa: Amonestación Escrita
                  </div>
                  <p className="leading-relaxed text-zinc-700">
                    Bajo el Estatuto Pyme (Ley 20.416), la APDP no cobra la multa si 
                    <strong> acreditas de inmediato el RAT (Art. 14 ter)</strong>. Si no tienes el RAT, la multa se aplica en su totalidad.
                  </p>
                </div>
              ) : (
                <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-300 text-xs text-red-950">
                  <strong className="block text-sm font-bold text-red-900 mb-1">Cobro Coactivo Inmediato</strong>
                  <p className="leading-relaxed text-red-800">
                    Sin amparo de Pyme o con reincidencia, la multa se deriva directamente a la Tesorería General de la República.
                  </p>
                </div>
              )}

              <button
                onClick={onGoToRat}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-4 px-6 rounded-xl text-sm shadow-xl shadow-orange-500/25 transition-all"
              >
                <span className="material-symbols-outlined text-base">shield</span>
                <span>Generar RAT y blindar mi empresa ahora</span>
              </button>
            </div>

            {/* Quick checklist */}
            <div className="bg-white p-6 rounded-3xl border-2 border-zinc-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-zinc-900 uppercase">Termómetro de Riesgo Pyme</span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  nivelRiesgo === 'Crítico' ? 'bg-red-100 text-red-800 border border-red-300' :
                  nivelRiesgo === 'Medio' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  Riesgo {nivelRiesgo}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200 cursor-pointer">
                  <span className="text-zinc-800">¿Ya tienes tu RAT (Art. 14 ter)?</span>
                  <input
                    type="checkbox"
                    checked={tieneRAT}
                    onChange={(e) => setTieneRAT(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200 cursor-pointer">
                  <span className="text-zinc-800">¿Puedes bloquear datos en 2 días hábiles?</span>
                  <input
                    type="checkbox"
                    checked={respondeBloqueo2Dias}
                    onChange={(e) => setRespondeBloqueo2Dias(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200 cursor-pointer">
                  <span className="text-zinc-800">¿Manejas RUT, planillas o cámaras CCTV?</span>
                  <input
                    type="checkbox"
                    checked={manejaDatosSensibles}
                    onChange={(e) => setManejaDatosSensibles(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>

              {!tieneRAT && (
                <p className="text-[11px] text-orange-900 bg-orange-100/70 p-3 rounded-xl border border-orange-300 leading-relaxed">
                  🚨 <strong>Atención:</strong> Sin el RAT formalizado, tu empresa está en causal de infracción grave directa ante cualquier denuncia ciudadana en la APDP.
                </p>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UTMCalculator;
