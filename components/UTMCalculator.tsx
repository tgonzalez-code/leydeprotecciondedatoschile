import React, { useState } from 'react';

interface UTMCalculatorProps {
  onGoToRat: () => void;
}

const UTMCalculator: React.FC<UTMCalculatorProps> = ({ onGoToRat }) => {
  const [utmValue, setUtmValue] = useState<number>(66362); // Valor real referencial UTM en Chile
  const [tipoInfraccion, setTipoInfraccion] = useState<'leve' | 'grave' | 'gravisima'>('grave');
  const [esPyme, setEsPyme] = useState<boolean>(true);
  const [esReincidente, setEsReincidente] = useState<boolean>(false);

  // Checklist de cumplimiento rápido
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
            'Demoras no sustanciales en la entrega de copias ante solicitudes de acceso.',
            'No comunicar modificaciones menores en la política de privacidad.',
          ],
        };
      case 'grave':
        return {
          nombre: 'Infracción Grave',
          maxUtm: 10000,
          ejemplos: [
            'Tratar datos sin base de licitud (sin consentimiento ni relación contractual).',
            'No contar con el Registro de Actividades de Tratamiento (RAT - Art. 14 ter).',
            'Incumplir el plazo legal perentorio de 2 días hábiles para el Bloqueo Temporal.',
            'Traspasar bases de datos a proveedores sin contrato de encargado de datos.',
          ],
        };
      case 'gravisima':
        return {
          nombre: 'Infracción Gravísima',
          maxUtm: 20000,
          ejemplos: [
            'Fuga o filtración masiva de datos sensibles (salud, biometría) por negligencia grave.',
            'Comercialización ilícita de datos de clientes o colaboradores.',
            'Desacato deliberado de medidas cautelares o resoluciones de la APDP.',
          ],
        };
    }
  };

  const detalle = getDetallesInfraccion();
  const montoMaximoCLP = detalle.maxUtm * utmValue;
  const puntosRiesgo = (!tieneRAT ? 40 : 0) + (!respondeBloqueo2Dias ? 30 : 0) + (manejaDatosSensibles ? 20 : 0);
  const nivelRiesgo = puntosRiesgo >= 60 ? 'Crítico' : puntosRiesgo >= 30 ? 'Medio' : 'Bajo';

  return (
    <div className="bg-slate-50 min-h-screen py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs">
              <span className="font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                APDP • RÉGIMEN SANCIONATORIO
              </span>
              <span className="text-slate-500 font-mono">
                Artículos 40 al 52 de la Ley 21.719
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Simulador Oficial de Multas UTM & Evaluación de Riesgo
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Calcula las sanciones económicas máximas según la gravedad de la falta y la aplicación del Estatuto Pyme (Ley 20.416).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg border border-slate-200 text-xs font-mono">
            <span className="text-slate-600">UTM Vigente:</span>
            <strong className="text-slate-900">${utmValue.toLocaleString('es-CL')} CLP</strong>
          </div>
        </div>

        {/* Dense Grid: Controls + Calculation + Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Col */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Severity selector */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  1. Gravedad de la Infracción Evaluada
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Escala APDP</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'leve', label: 'Infracción Leve', utm: 'Hasta 5.000 UTM' },
                  { key: 'grave', label: 'Infracción Grave', utm: 'Hasta 10.000 UTM' },
                  { key: 'gravisima', label: 'Infracción Gravísima', utm: 'Hasta 20.000 UTM' },
                ].map((g) => (
                  <button
                    key={g.key}
                    onClick={() => setTipoInfraccion(g.key as any)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      tipoInfraccion === g.key
                        ? 'border-blue-900 bg-blue-50/50 ring-1 ring-blue-900 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <strong className="block text-slate-900 text-xs">{g.label}</strong>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{g.utm}</span>
                  </button>
                ))}
              </div>

              {/* UTM Slider */}
              <div className="pt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-700 font-medium">Ajustar valor UTM de referencia:</span>
                  <span className="font-mono text-slate-900 font-bold">${utmValue.toLocaleString('es-CL')} CLP</span>
                </div>
                <input
                  type="range"
                  min={60000}
                  max={75000}
                  step={500}
                  value={utmValue}
                  onChange={(e) => setUtmValue(Number(e.target.value))}
                  className="w-full accent-blue-900 cursor-pointer"
                />
              </div>
            </div>

            {/* Pyme Switch & Reincidencia */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  2. Calificación de la Empresa & Agravantes
                </h3>
                <span className="text-[11px] font-mono text-emerald-700 font-bold">Ley 20.416</span>
              </div>

              <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <strong className="text-xs text-slate-900 block">
                    Beneficio Pyme: Amonestación Escrita en 1ra Falta
                  </strong>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Aplica para Micro y Pequeñas empresas sin sanciones previas. La APDP sustituye la multa en dinero por amonestación, 
                    <strong> bajo condición resolutoria de acreditar de inmediato el RAT (Art. 14 ter)</strong>.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={esPyme}
                    onChange={(e) => setEsPyme(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-700 px-1">
                <span>¿Registra reincidencia en los últimos 24 meses?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={esReincidente}
                    onChange={(e) => setEsReincidente(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>

            {/* Examples of specific infractions */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
                Conductas típicas que configuran {detalle.nombre}:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {detalle.ejemplos.map((ej, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span>{ej}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Results & Scorecard Col */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Calculation Result Box */}
            <div className="bg-white p-6 rounded-xl border-2 border-slate-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Sanción Económica Proyectada
                </span>
                <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {detalle.maxUtm.toLocaleString('es-CL')} UTM MÁX
                </span>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight block">
                  ${montoMaximoCLP.toLocaleString('es-CL')} <span className="text-xs font-sans text-slate-500">CLP</span>
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Calculado a valor UTM de ${utmValue.toLocaleString('es-CL')} CLP
                </span>
              </div>

              {/* Pyme Benefit Outcome */}
              {esPyme && !esReincidente ? (
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <span className="material-symbols-outlined text-emerald-700 text-base">verified</span>
                    <span>Atenuante Aplicable: Amonestación Escrita</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-800">
                    Bajo el Estatuto Pyme (Ley 20.416), puedes evitar el desembolso de esta multa si 
                    <strong> regularizas y exhibes el RAT de inmediato ante la APDP</strong>.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900">
                  <strong className="block mb-0.5">Cobro Forzoso Tesorería General</strong>
                  <p className="text-[11px] leading-relaxed text-red-800">
                    Sin atenuante de Pyme o con reincidencia, la APDP ejecuta la cobranza inmediata de la sanción económica.
                  </p>
                </div>
              )}

              <button
                onClick={onGoToRat}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2.5 px-4 rounded-lg text-xs shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-sm">shield</span>
                <span>Generar RAT y blindar mi empresa ahora</span>
              </button>
            </div>

            {/* Quick Compliance Thermometer */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Termómetro de Riesgo Rápido</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  nivelRiesgo === 'Crítico' ? 'bg-red-50 text-red-700 border-red-200' :
                  nivelRiesgo === 'Medio' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                  'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  Riesgo {nivelRiesgo}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <span className="text-slate-700">¿Cuentas con tu RAT (Art. 14 ter)?</span>
                  <input
                    type="checkbox"
                    checked={tieneRAT}
                    onChange={(e) => setTieneRAT(e.target.checked)}
                    className="rounded text-blue-900 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <span className="text-slate-700">¿Puedes bloquear datos en 2 días hábiles?</span>
                  <input
                    type="checkbox"
                    checked={respondeBloqueo2Dias}
                    onChange={(e) => setRespondeBloqueo2Dias(e.target.checked)}
                    className="rounded text-blue-900 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <span className="text-slate-700">¿Tratas RUT, nóminas o cámaras CCTV?</span>
                  <input
                    type="checkbox"
                    checked={manejaDatosSensibles}
                    onChange={(e) => setManejaDatosSensibles(e.target.checked)}
                    className="rounded text-blue-900 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>

              {!tieneRAT && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                  🚨 <strong>Causal Inmediata:</strong> No contar con el RAT tipifica como infracción grave según el Art. 14 ter y Art. 44 de la ley.
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
