import React from 'react';
import { useRatWizard } from '../hooks/useRatWizard';

const RatAgentWizard: React.FC = () => {
  const {
    paso,
    setPaso,
    datosEmpresa,
    setDatosEmpresa,
    toggleActividad: toggleSeleccion,
    filtroCategoria,
    setFiltroCategoria,
    mostrarModalNueva,
    setMostrarModalNueva,
    nuevaActividadNombre,
    setNuevaActividadNombre,
    nuevaActividadFinalidad,
    setNuevaActividadFinalidad,
    agregarActividadPersonalizada,
    actividadesSeleccionadas,
    actividadesFiltradas,
    exportarJSON,
  } = useRatWizard();

  return (
    <div id="agente-rat" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600">psychology</span>
              <span>TRAMO 1 OBLIGATORIO • ARTÍCULO 14 TER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Agente de IA para el Registro RAT
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Entrevista guiada de 3 minutos. El motor clasifica automáticamente datos sensibles (salud, biometría, RUT) y asigna bases de licitud para presentar ante la APDP.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1.5 rounded-xl border border-zinc-200 self-start md:self-auto font-mono text-xs">
            {[
              { num: 1, label: '1. Empresa' },
              { num: 2, label: '2. Tratamientos' },
              { num: 3, label: '3. Clasificación' },
              { num: 4, label: '4. Ficha Oficial' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setPaso(s.num)}
                className={`px-3 py-2 rounded-lg font-bold transition-all ${
                  paso === s.num
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : paso > s.num
                    ? 'bg-white text-zinc-900 border border-zinc-300'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 1: Datos de la Empresa */}
        {paso === 1 && (
          <div className="bg-zinc-50 p-6 sm:p-10 rounded-3xl border-2 border-zinc-900 shadow-xl space-y-6">
            <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-orange-600 uppercase">Paso 1 de 4</span>
                <h3 className="text-xl font-display font-black text-zinc-950 mt-0.5">
                  Identificación de la Empresa (Responsable del Tratamiento)
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">Exigido por Art. 14 ter Nº 1</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
                  Razón Social o Nombre Legal *
                </label>
                <input
                  type="text"
                  value={datosEmpresa.razonSocial}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, razonSocial: e.target.value })}
                  className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-950 font-bold focus:border-orange-500 focus:outline-none"
                  placeholder="Ej. Comercializadora SpA"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
                  RUT de la Empresa *
                </label>
                <input
                  type="text"
                  value={datosEmpresa.rutEmpresa}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, rutEmpresa: e.target.value })}
                  className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm font-mono text-zinc-950 font-black focus:border-orange-500 focus:outline-none"
                  placeholder="76.xxx.xxx-x"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
                  Representante Legal *
                </label>
                <input
                  type="text"
                  value={datosEmpresa.representanteLegal}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, representanteLegal: e.target.value })}
                  className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-950 font-medium focus:border-orange-500 focus:outline-none"
                  placeholder="Nombre y Apellidos"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
                  Clasificación Pyme (Ley 20.416)
                </label>
                <select
                  value={datosEmpresa.clasificacionTamano}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, clasificacionTamano: e.target.value as any })}
                  className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-950 font-bold focus:border-orange-500 focus:outline-none"
                >
                  <option value="Microempresa">Microempresa (1 a 9 trabajadores / hasta 2.400 UF)</option>
                  <option value="Pequeña Pyme">Pequeña Pyme (10 a 49 trabajadores / 2.400 a 25.000 UF)</option>
                  <option value="Mediana Empresa">Mediana Empresa (50 a 199 trabajadores)</option>
                  <option value="Gran Empresa">Gran Empresa (200+ trabajadores)</option>
                </select>
                <span className="text-[11px] text-orange-600 font-bold block mt-1.5 font-mono">
                  ✓ Amparado por beneficio de amonestación (Estatuto Pyme)
                </span>
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
                  Email de Contacto Canal ARCO+ *
                </label>
                <input
                  type="email"
                  value={datosEmpresa.emailContacto}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, emailContacto: e.target.value })}
                  className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm font-mono text-zinc-950 font-bold focus:border-orange-500 focus:outline-none"
                  placeholder="privacidad@tuempresa.cl"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1.5 uppercase font-mono">
                  Comuna y Región
                </label>
                <input
                  type="text"
                  value={datosEmpresa.ciudadRegion}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, ciudadRegion: e.target.value })}
                  className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-950 font-medium focus:border-orange-500 focus:outline-none"
                  placeholder="Santiago, Región Metropolitana"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-200">
              <button
                onClick={() => setPaso(2)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Continuar a Selección de Tratamientos</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Detección y Selección de Tratamientos */}
        {paso === 2 && (
          <div className="bg-zinc-50 p-6 sm:p-10 rounded-3xl border-2 border-zinc-900 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-orange-600 uppercase">Paso 2 de 4</span>
                <h3 className="text-xl font-display font-black text-zinc-950 mt-0.5">
                  ¿Qué datos maneja tu empresa en el día a día?
                </h3>
                <p className="text-xs text-zinc-600 mt-1">
                  Marca las operaciones activas. El Agente de IA ya tiene precargados los datos y finalidades de mayor riesgo legal.
                </p>
              </div>

              <button
                onClick={() => setMostrarModalNueva(true)}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-100 border-2 border-zinc-300 text-zinc-900 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-base text-orange-500">add_circle</span>
                <span>+ Agregar Actividad Personalizada</span>
              </button>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 font-mono">
              <span className="text-zinc-400 font-bold mr-2 uppercase text-[10px]">Filtrar:</span>
              {[
                { key: 'todas', label: 'Todas' },
                { key: 'rrhh', label: 'RRHH' },
                { key: 'clientes', label: 'CRM / Ventas' },
                { key: 'ecommerce', label: 'Ecommerce' },
                { key: 'seguridad', label: 'CCTV' },
                { key: 'marketing', label: 'Marketing' },
                { key: 'proveedores', label: 'Proveedores' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFiltroCategoria(f.key)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold transition-all ${
                    filtroCategoria === f.key
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-white text-zinc-700 hover:bg-zinc-200 border border-zinc-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Activity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actividadesFiltradas.map((act) => (
                <div
                  key={act.id}
                  onClick={() => toggleSeleccion(act.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
                    act.seleccionada
                      ? 'bg-white border-orange-500 shadow-md shadow-orange-500/10'
                      : 'bg-white/60 border-zinc-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                          act.seleccionada ? 'bg-orange-500 text-white' : 'border-2 border-zinc-300'
                        }`}>
                          {act.seleccionada ? '✓' : ''}
                        </div>
                        <h4 className="font-display font-black text-sm sm:text-base text-zinc-950">
                          {act.nombre}
                        </h4>
                      </div>
                      {act.contieneSensibles && (
                        <span className="bg-orange-100 text-orange-900 border border-orange-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0">
                          DATOS SENSIBLES
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-600 mb-3 leading-relaxed pl-7">
                      {act.finalidad}
                    </p>

                    <div className="pl-7 flex flex-wrap gap-1.5 mb-3">
                      {act.datosTratados.map((d, i) => (
                        <span key={i} className="bg-zinc-100 text-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-200">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pl-7 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span>Base: <strong className="text-zinc-900">{act.baseLicitud.split(' - ')[0]}</strong></span>
                    <span className="text-orange-600 font-bold">{act.seleccionada ? 'Incluida en RAT' : 'Omitida'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
              <button
                onClick={() => setPaso(1)}
                className="text-xs font-mono font-bold text-zinc-600 hover:text-zinc-950"
              >
                ← Volver a Datos de Empresa
              </button>
              <button
                onClick={() => setPaso(3)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Ejecutar Clasificación de IA (Paso 3)</span>
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Clasificación Inteligente y Asignación de Base de Licitud */}
        {paso === 3 && (
          <div className="bg-zinc-50 p-6 sm:p-10 rounded-3xl border-2 border-zinc-900 shadow-xl space-y-6">
            <div className="border-b border-zinc-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-orange-600 uppercase">Paso 3 de 4</span>
                <h3 className="text-xl font-display font-black text-zinc-950 mt-0.5">
                  Clasificación de Datos Sensibles & Asignación de Bases de Licitud
                </h3>
                <p className="text-xs text-zinc-600 mt-1">
                  El motor legal procesó tus actividades, segregó datos sensibles (Art. 2 y 16) y fundamentó cada tratamiento según Art. 12 y 13.
                </p>
              </div>
              <span className="bg-orange-500 text-white font-mono font-bold text-xs px-3 py-1 rounded-lg shadow-sm">
                VALIDADO APDP
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-2xl border-2 border-zinc-200 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-white font-mono text-[11px]">
                    <th className="py-3 px-4 font-bold">Actividad Declarada</th>
                    <th className="py-3 px-4 font-bold">Datos Tratados</th>
                    <th className="py-3 px-4 font-bold">Base Legal (Art. 12/13)</th>
                    <th className="py-3 px-4 font-bold">Conservación</th>
                    <th className="py-3 px-4 font-bold">Medidas de Seguridad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {actividadesSeleccionadas.map((act) => (
                    <tr key={act.id} className="hover:bg-orange-50/20 transition-colors">
                      <td className="py-3.5 px-4 align-top max-w-[200px]">
                        <strong className="text-zinc-950 font-display font-bold text-xs block">{act.nombre}</strong>
                        <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{act.finalidad}</p>
                        {act.contieneSensibles && (
                          <span className="inline-block mt-1.5 bg-orange-100 text-orange-900 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-orange-300">
                            SENSIBLES: {act.categoriasSensibles.join(', ')}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 align-top max-w-[190px] text-[11px] text-zinc-700 font-mono">
                        {act.datosTratados.join(', ')}
                      </td>

                      <td className="py-3.5 px-4 align-top max-w-[220px]">
                        <span className="font-bold text-orange-600 block text-xs font-mono">{act.baseLicitud}</span>
                        <p className="text-[10px] text-zinc-500 mt-0.5 italic">{act.justificacionLegal}</p>
                      </td>

                      <td className="py-3.5 px-4 align-top text-[11px] text-zinc-700 max-w-[150px] font-mono">
                        {act.plazoConservacion}
                      </td>

                      <td className="py-3.5 px-4 align-top text-[11px] text-zinc-600 max-w-[170px]">
                        <ul className="list-disc pl-3 space-y-0.5">
                          {act.medidasSeguridad.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
              <button
                onClick={() => setPaso(2)}
                className="text-xs font-mono font-bold text-zinc-600 hover:text-zinc-950"
              >
                ← Modificar Selección
              </button>
              <button
                onClick={() => setPaso(4)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Generar Ficha Oficial RAT (Paso 4)</span>
                <span className="material-symbols-outlined text-sm">verified</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Ficha Oficial RAT Generada & Exportación */}
        {paso === 4 && (
          <div className="space-y-6">
            
            {/* Top Bar */}
            <div className="bg-zinc-950 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-orange-400 bg-orange-950 px-2.5 py-1 rounded border border-orange-800">
                  TRAMO 1 OBLIGATORIO REGULARIZADO
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white mt-2">
                  Ficha Oficial del Registro RAT (Art. 14 ter)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Documento exigible por la Agencia de Protección de Datos Personales (APDP) de Chile.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportarJSON}
                  className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-mono font-bold shadow-md transition-all"
                >
                  <span className="material-symbols-outlined text-orange-500 text-base">data_object</span>
                  <span>Descargar JSON APDP</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-orange-500/30 transition-all"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  <span>Imprimir / PDF Oficial</span>
                </button>
              </div>
            </div>

            {/* Official Printable Chilean RAT Document */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-zinc-900 shadow-2xl print:border-none print:shadow-none print:p-0">
              
              {/* Header */}
              <div className="border-b-2 border-zinc-950 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-600 uppercase">
                    <span>REPÚBLICA DE CHILE</span>
                    <span>•</span>
                    <span>LEY Nº 21.719</span>
                    <span>•</span>
                    <span className="bg-orange-100 text-orange-900 px-2 py-0.5 rounded border border-orange-300">ART. 14 TER</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-zinc-950 mt-1 tracking-tight">
                    REGISTRO DE ACTIVIDADES DE TRATAMIENTO (RAT)
                  </h1>
                  <p className="text-xs text-zinc-600 font-mono">
                    Acreditación del Deber de Responsabilidad Proactiva (Accountability) ante la APDP
                  </p>
                </div>

                <div className="text-left sm:text-right border-l sm:border-l-0 border-zinc-300 pl-3 sm:pl-0 font-mono text-xs">
                  <span className="text-zinc-500 block">CÓDIGO DE REGISTRO:</span>
                  <span className="font-black text-base text-zinc-950 bg-zinc-100 px-2.5 py-1 rounded border border-zinc-300 inline-block">
                    {datosEmpresa.codigoCertificadoRAT}
                  </span>
                  <span className="text-[10px] text-zinc-500 block mt-1">Fecha Emisión: {datosEmpresa.fechaCreacion}</span>
                </div>
              </div>

              {/* Entity Matrix */}
              <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-300 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Razón Social:</span>
                  <strong className="text-zinc-950 font-bold text-sm">{datosEmpresa.razonSocial}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">RUT Entidad:</span>
                  <strong className="text-zinc-950 font-bold text-sm">{datosEmpresa.rutEmpresa}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Representante Legal:</span>
                  <span className="text-zinc-800">{datosEmpresa.representanteLegal}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Estatuto Pyme:</span>
                  <span className="text-orange-700 font-bold">{datosEmpresa.clasificacionTamano} (Ley 20.416)</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Responsable DPO:</span>
                  <span className="text-zinc-800">{datosEmpresa.responsableTratamientoDPO}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Canal ARCO+ (Email):</span>
                  <span className="text-orange-600 font-bold">{datosEmpresa.emailContacto}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Ubicación:</span>
                  <span className="text-zinc-800">{datosEmpresa.ciudadRegion}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Total Tratamientos:</span>
                  <strong className="text-zinc-950">{actividadesSeleccionadas.length} actividades</strong>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mb-8 border border-zinc-300 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-950 text-white font-mono text-[11px]">
                      <th className="p-3">Actividad & Finalidad</th>
                      <th className="p-3">Titulares & Datos</th>
                      <th className="p-3">Base Legal (Art. 12/13)</th>
                      <th className="p-3">Conservación & Destino</th>
                      <th className="p-3">Medidas de Seguridad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {actividadesSeleccionadas.map((a, idx) => (
                      <tr key={a.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                        <td className="p-3 align-top max-w-[200px]">
                          <strong className="text-zinc-950 block font-display font-bold text-xs">{idx + 1}. {a.nombre}</strong>
                          <p className="text-zinc-600 text-[11px] mt-0.5 leading-relaxed">{a.finalidad}</p>
                          {a.contieneSensibles && (
                            <span className="inline-block mt-1 bg-orange-100 text-orange-900 font-mono font-bold text-[9px] px-1.5 py-0.5 rounded border border-orange-300">
                              DATOS SENSIBLES
                            </span>
                          )}
                        </td>

                        <td className="p-3 align-top max-w-[190px] text-[11px] text-zinc-700 font-mono">
                          <div><strong>Titulares:</strong> {a.titulares.join(', ')}</div>
                          <div className="mt-1"><strong>Datos:</strong> {a.datosTratados.join(', ')}</div>
                        </td>

                        <td className="p-3 align-top max-w-[200px]">
                          <span className="font-mono font-bold text-orange-600 block text-xs">{a.baseLicitud}</span>
                          <p className="text-[10px] text-zinc-500 italic mt-0.5">{a.justificacionLegal}</p>
                        </td>

                        <td className="p-3 align-top max-w-[160px] text-[11px] text-zinc-700 font-mono">
                          <div><strong>Plazo:</strong> {a.plazoConservacion}</div>
                          <div className="mt-1 text-[10px] text-zinc-500"><strong>Destino:</strong> {a.destinatarios}</div>
                        </td>

                        <td className="p-3 align-top max-w-[160px] text-[10px] text-zinc-600">
                          <ul className="list-disc pl-3 space-y-0.5">
                            {a.medidasSeguridad.map((m, mi) => (
                              <li key={mi}>{m}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signatures */}
              <div className="pt-6 border-t-2 border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-600 font-mono">
                <div>
                  <h4 className="font-bold text-zinc-950 uppercase text-[10px]">
                    Declaración Jurada de Cumplimiento (Art. 14 ter)
                  </h4>
                  <p className="text-[11px] leading-relaxed mt-1">
                    El presente inventario da cuenta fidedigna de las actividades de tratamiento de datos personales efectuadas por la entidad individualizada, bajo el deber de responsabilidad proactiva de la Ley Nº 21.719 de Chile.
                  </p>
                </div>
                <div className="flex flex-col sm:items-end justify-end">
                  <div className="border-t border-zinc-400 w-56 text-center pt-2 text-zinc-900 font-bold text-xs">
                    {datosEmpresa.representanteLegal}
                    <span className="block font-normal text-[10px] text-zinc-500">Representante Legal / Responsable DPO</span>
                    <span className="block text-[9px] text-zinc-400">RUT: {datosEmpresa.rutEmpresa}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Modal Nueva Actividad */}
        {mostrarModalNueva && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
                <h3 className="font-display font-black text-zinc-950 text-base">
                  Agregar Actividad de Tratamiento
                </h3>
                <button onClick={() => setMostrarModalNueva(false)} className="text-zinc-400 hover:text-zinc-950 text-base">✕</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-zinc-900 mb-1 font-mono">Nombre de la Actividad *</label>
                  <input
                    type="text"
                    value={nuevaActividadNombre}
                    onChange={(e) => setNuevaActividadNombre(e.target.value)}
                    placeholder="Ej. Registro de postulantes a vacantes"
                    className="w-full bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-950 text-sm focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-900 mb-1 font-mono">Finalidad específica</label>
                  <textarea
                    value={nuevaActividadFinalidad}
                    onChange={(e) => setNuevaActividadFinalidad(e.target.value)}
                    rows={3}
                    placeholder="Para qué usa la empresa estos datos..."
                    className="w-full bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-950 text-sm focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 mt-6">
                <button
                  onClick={() => setMostrarModalNueva(false)}
                  className="px-4 py-2 font-mono font-bold text-zinc-600 hover:text-zinc-950"
                >
                  Cancelar
                </button>
                <button
                  onClick={agregarActividadPersonalizada}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-orange-500/25"
                >
                  Guardar en el RAT
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RatAgentWizard;
