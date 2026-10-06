import React, { useState } from 'react';
import { SolicitudARCO, TipoSolicitudARCO } from '../types';

const SOLICITUDES_INICIALES: SolicitudARCO[] = [
  {
    id: 'ARCO-001',
    titularNombre: 'Constanza Valenzuela Morales',
    titularRUT: '18.420.315-7',
    titularEmail: 'constanza.valenzuela@gmail.com',
    tipoSolicitud: 'Bloqueo Temporal',
    fechaIngreso: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    slaMaximo: '2 días hábiles',
    fechaVencimiento: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    diasRestantes: 1,
    estado: 'Pendiente',
    detalle: 'Solicita suspender todo contacto comercial y publicidad mientras se resuelve reclamo de cobro no reconocido.',
  },
  {
    id: 'ARCO-002',
    titularNombre: 'Rodrigo Fuentes Abarca',
    titularRUT: '15.932.104-3',
    titularEmail: 'r.fuentes@empresa-cliente.cl',
    tipoSolicitud: 'Acceso',
    fechaIngreso: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    slaMaximo: '30 días corridos',
    fechaVencimiento: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    diasRestantes: 20,
    estado: 'En Proceso',
    detalle: 'Exige conocer qué datos personales de su historial de compras y RUT mantiene la empresa en sus servidores.',
  },
  {
    id: 'ARCO-003',
    titularNombre: 'Mariana Soto Pavez',
    titularRUT: '19.112.450-K',
    titularEmail: 'mariana.soto@outlook.com',
    tipoSolicitud: 'Supresión',
    fechaIngreso: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    slaMaximo: '30 días corridos',
    fechaVencimiento: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    diasRestantes: 5,
    estado: 'En Proceso',
    detalle: 'Pide eliminación total de su cuenta y correo tras cancelar suscripción el mes anterior.',
  },
  {
    id: 'ARCO-004',
    titularNombre: 'Andrés Baeza Silva',
    titularRUT: '12.890.312-1',
    titularEmail: 'abaeza@proveedor.cl',
    tipoSolicitud: 'Portabilidad',
    fechaIngreso: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    slaMaximo: '30 días corridos',
    fechaVencimiento: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    diasRestantes: -2,
    estado: 'Pendiente',
    detalle: 'Solicitó entrega de su historial de transacciones en archivo estructurado (JSON o CSV). Vencido hace 2 días.',
  },
];

interface ArcoManagerProps {
  onGoToRat: () => void;
}

const ArcoManager: React.FC<ArcoManagerProps> = ({ onGoToRat }) => {
  const [solicitudes, setSolicitudes] = useState<SolicitudARCO[]>(SOLICITUDES_INICIALES);
  const [modalNueva, setModalNueva] = useState(false);
  const [modalPlantilla, setModalPlantilla] = useState<string | null>(null);

  // Form nueva solicitud
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRUT, setNuevoRUT] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState<TipoSolicitudARCO>('Bloqueo Temporal');
  const [nuevoDetalle, setNuevoDetalle] = useState('');

  const handleCrearSolicitud = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoEmail) return;

    const esBloqueo = nuevoTipo === 'Bloqueo Temporal';
    const dias = esBloqueo ? 2 : 30;
    const fechaVenc = new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const nueva: SolicitudARCO = {
      id: `ARCO-${String(solicitudes.length + 1).padStart(3, '0')}`,
      titularNombre: nuevoNombre,
      titularRUT: nuevoRUT || 'Sin RUT especificado',
      titularEmail: nuevoEmail,
      tipoSolicitud: nuevoTipo,
      fechaIngreso: new Date().toISOString().split('T')[0],
      slaMaximo: esBloqueo ? '2 días hábiles' : '30 días corridos',
      fechaVencimiento: fechaVenc,
      diasRestantes: dias,
      estado: 'Pendiente',
      detalle: nuevoDetalle || 'Solicitud formal de ejercicio de derecho ARCO+ ingresada por el titular.',
    };

    setSolicitudes([nueva, ...solicitudes]);
    setModalNueva(false);
    setNuevoNombre('');
    setNuevoRUT('');
    setNuevoEmail('');
    setNuevoDetalle('');
  };

  const handleCambiarEstado = (id: string, nuevoEstado: SolicitudARCO['estado']) => {
    setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs">
              <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                SLAS LEGALES PERENTORIOS
              </span>
              <span className="text-slate-500 font-mono">
                Artículos 5 al 11 de la Ley 21.719
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Gestor de Solicitudes ARCO+ & SLAs de Respuesta
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Control estricto de plazos: <strong className="text-slate-900">2 días hábiles</strong> para Bloqueo Temporal y <strong className="text-slate-900">30 días corridos</strong> para el resto de derechos.
            </p>
          </div>

          <button
            onClick={() => setModalNueva(true)}
            className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Registrar Solicitud</span>
          </button>
        </div>

        {/* 6 Rights Dense Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
          
          <div className="bg-white p-3 rounded-lg border-2 border-amber-400 shadow-sm">
            <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200 block w-fit mb-1">
              2 DÍAS HÁBILES
            </span>
            <strong className="text-xs font-bold text-slate-900 block">Bloqueo Temporal</strong>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Congela el uso del dato ante reclamos.</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[9px] font-mono text-slate-500 block mb-1">30 DÍAS CORRIDOS</span>
            <strong className="text-xs font-bold text-slate-900 block">Acceso</strong>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Conocer qué datos trata la empresa.</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[9px] font-mono text-slate-500 block mb-1">30 DÍAS CORRIDOS</span>
            <strong className="text-xs font-bold text-slate-900 block">Rectificación</strong>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Corregir datos falsos o erróneos.</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[9px] font-mono text-slate-500 block mb-1">30 DÍAS CORRIDOS</span>
            <strong className="text-xs font-bold text-slate-900 block">Supresión</strong>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Borrar datos sin base legal.</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[9px] font-mono text-slate-500 block mb-1">30 DÍAS CORRIDOS</span>
            <strong className="text-xs font-bold text-slate-900 block">Oposición</strong>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Oponerse a envíos comerciales.</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[9px] font-mono text-slate-500 block mb-1">30 DÍAS CORRIDOS</span>
            <strong className="text-xs font-bold text-slate-900 block">Portabilidad</strong>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Copia estructurada en JSON/CSV.</p>
          </div>

        </div>

        {/* Requests Table Box */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Bandeja de Control de Solicitudes Registradas
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {solicitudes.length} solicitudes activas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">ID / Titular</th>
                  <th className="py-2.5 px-3">Derecho</th>
                  <th className="py-2.5 px-3">SLA Legal</th>
                  <th className="py-2.5 px-3">Plazo Restante</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-right">Plantilla</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {solicitudes.map((s) => {
                  const esCritico = s.diasRestantes <= 1 && s.estado !== 'Respondida';
                  const esVencido = s.diasRestantes < 0 && s.estado !== 'Respondida';

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <strong className="text-slate-900 block text-xs">{s.titularNombre}</strong>
                        <span className="text-[11px] text-slate-500 font-mono">RUT: {s.titularRUT} • {s.titularEmail}</span>
                        <p className="text-[11px] text-slate-600 italic mt-0.5 max-w-sm">"{s.detalle}"</p>
                      </td>

                      <td className="py-3 px-3 align-top">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          s.tipoSolicitud === 'Bloqueo Temporal'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {s.tipoSolicitud}
                        </span>
                      </td>

                      <td className="py-3 px-3 align-top font-mono text-slate-600">
                        <span className="font-semibold block">{s.slaMaximo}</span>
                        <span className="text-[10px] text-slate-400">Ingreso: {s.fechaIngreso}</span>
                      </td>

                      <td className="py-3 px-3 align-top font-mono">
                        {s.estado === 'Respondida' ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Completada ✓
                          </span>
                        ) : esVencido ? (
                          <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            VENCIDA ({Math.abs(s.diasRestantes)}d)
                          </span>
                        ) : esCritico ? (
                          <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            ¡URGENTE ({s.diasRestantes}d)!
                          </span>
                        ) : (
                          <span className="text-slate-800 font-semibold">{s.diasRestantes} días restantes</span>
                        )}
                        <span className="text-[10px] text-slate-400 block mt-0.5">Vence: {s.fechaVencimiento}</span>
                      </td>

                      <td className="py-3 px-3 align-top">
                        <select
                          value={s.estado}
                          onChange={(e) => handleCambiarEstado(s.id, e.target.value as any)}
                          className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs text-slate-900 focus:outline-none"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En Proceso">En Proceso</option>
                          <option value="Respondida">Respondida</option>
                          <option value="Rechazada Justificada">Rechazada</option>
                        </select>
                      </td>

                      <td className="py-3 px-3 align-top text-right">
                        <button
                          onClick={() => setModalPlantilla(s.tipoSolicitud)}
                          className="inline-flex items-center gap-1 text-[11px] bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-2.5 py-1 rounded"
                        >
                          <span>Ver Modelo</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Nueva Solicitud */}
        {modalNueva && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 shadow-xl text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h3 className="font-bold text-slate-900 text-sm">
                  Registrar Solicitud ARCO+ de Titular
                </h3>
                <button onClick={() => setModalNueva(false)} className="text-slate-400 hover:text-slate-800">✕</button>
              </div>

              <form onSubmit={handleCrearSolicitud} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">RUT Titular</label>
                    <input
                      type="text"
                      value={nuevoRUT}
                      onChange={(e) => setNuevoRUT(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono"
                      placeholder="12.xxx.xxx-x"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={nuevoEmail}
                      onChange={(e) => setNuevoEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                      placeholder="correo@titular.cl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Tipo de Derecho *</label>
                  <select
                    value={nuevoTipo}
                    onChange={(e) => setNuevoTipo(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  >
                    <option value="Bloqueo Temporal">Bloqueo Temporal (SLA: 2 días hábiles)</option>
                    <option value="Acceso">Acceso a sus Datos (SLA: 30 días corridos)</option>
                    <option value="Rectificación">Rectificación de Datos (SLA: 30 días corridos)</option>
                    <option value="Supresión">Supresión / Borrado (SLA: 30 días corridos)</option>
                    <option value="Oposición">Oposición a Tratamiento (SLA: 30 días corridos)</option>
                    <option value="Portabilidad">Portabilidad de Datos (SLA: 30 días corridos)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Detalle o Motivo</label>
                  <textarea
                    value={nuevoDetalle}
                    onChange={(e) => setNuevoDetalle(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Descripción de la petición..."
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 mt-4">
                  <button
                    type="button"
                    onClick={() => setModalNueva(false)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-1.5 rounded-lg"
                  >
                    Iniciar SLA
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Plantilla de Respuesta */}
        {modalPlantilla && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white border border-slate-300 rounded-xl max-w-xl w-full p-6 shadow-xl text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                <h3 className="font-bold text-slate-900 text-sm">
                  Plantilla Legal de Respuesta: {modalPlantilla}
                </h3>
                <button onClick={() => setModalPlantilla(null)} className="text-slate-400 hover:text-slate-800">✕</button>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 space-y-2.5 leading-relaxed max-h-[50vh] overflow-y-auto">
                <p className="text-slate-500">De: privacidad@tuempresa.cl</p>
                <p className="text-slate-500">Asunto: Respuesta Formal a Ejercicio de Derecho de {modalPlantilla} - Ley Nº 21.719</p>
                <hr className="border-slate-200" />
                <p>Estimado(a) Titular:</p>
                <p>
                  Acusamos recibo de su comunicación mediante la cual ejerce su derecho de <strong>{modalPlantilla}</strong>, 
                  conforme a las disposiciones de la Ley Nº 19.628 modificada por la Ley Nº 21.719 de Protección de Datos Personales.
                </p>
                {modalPlantilla === 'Bloqueo Temporal' ? (
                  <p className="text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                    Le informamos que dentro del plazo legal de 2 días hábiles se ha procedido al BLOQUEO TEMPORAL de sus datos 
                    en nuestros sistemas, impidiendo cualquier operación de tratamiento mientras se resuelve su solicitud de fondo.
                  </p>
                ) : (
                  <p className="text-slate-900">
                    En cumplimiento del plazo legal de 30 días corridos, adjuntamos la información formal relativa a las actividades de 
                    tratamiento registradas en nuestro Registro de Actividades de Tratamiento (RAT - Art. 14 ter), individualizando fines, 
                    base de licitud y plazos de conservación.
                  </p>
                )}
                <p>
                  Ante cualquier disconformidad, usted tiene derecho a presentar una reclamación ante la Agencia de Protección de Datos Personales (APDP).
                </p>
                <p>Atentamente,<br />Oficina de Protección de Datos Personales<br />Tu Empresa SpA</p>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={() => setModalPlantilla(null)}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-1.5 rounded-lg"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ArcoManager;
