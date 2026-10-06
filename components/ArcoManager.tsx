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
    <div id="derechos-arco" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600">timer</span>
              <span>SLAS LEGALES PERENTORIOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Gestor de Derechos ARCO+
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              La Ley 21.719 no da tregua en tiempos de respuesta: <strong className="text-orange-600 font-bold">2 días hábiles</strong> para Bloqueo Temporal y <strong className="text-zinc-950 font-bold">30 días corridos</strong> para el resto.
            </p>
          </div>

          <button
            onClick={() => setModalNueva(true)}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Registrar Solicitud</span>
          </button>
        </div>

        {/* 6 Rights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          
          <div className="bg-orange-50 p-4 rounded-2xl border-2 border-orange-500 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-white bg-orange-500 px-2 py-0.5 rounded block w-fit mb-2 shadow-sm">
              2 DÍAS HÁBILES
            </span>
            <strong className="text-sm font-display font-black text-zinc-950 block">Bloqueo Temporal</strong>
            <p className="text-xs text-zinc-700 mt-1 leading-tight">Congela el uso del dato ante controversias.</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl border-2 border-zinc-200">
            <span className="text-[10px] font-mono text-zinc-500 font-bold block mb-2">30 DÍAS CORRIDOS</span>
            <strong className="text-sm font-display font-black text-zinc-950 block">Acceso</strong>
            <p className="text-xs text-zinc-600 mt-1 leading-tight">Saber qué datos trata la empresa.</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl border-2 border-zinc-200">
            <span className="text-[10px] font-mono text-zinc-500 font-bold block mb-2">30 DÍAS CORRIDOS</span>
            <strong className="text-sm font-display font-black text-zinc-950 block">Rectificación</strong>
            <p className="text-xs text-zinc-600 mt-1 leading-tight">Corregir datos inexactos o falsos.</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl border-2 border-zinc-200">
            <span className="text-[10px] font-mono text-zinc-500 font-bold block mb-2">30 DÍAS CORRIDOS</span>
            <strong className="text-sm font-display font-black text-zinc-950 block">Supresión</strong>
            <p className="text-xs text-zinc-600 mt-1 leading-tight">Borrar datos sin base de licitud.</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl border-2 border-zinc-200">
            <span className="text-[10px] font-mono text-zinc-500 font-bold block mb-2">30 DÍAS CORRIDOS</span>
            <strong className="text-sm font-display font-black text-zinc-950 block">Oposición</strong>
            <p className="text-xs text-zinc-600 mt-1 leading-tight">Oponerse a envíos comerciales.</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl border-2 border-zinc-200">
            <span className="text-[10px] font-mono text-zinc-500 font-bold block mb-2">30 DÍAS CORRIDOS</span>
            <strong className="text-sm font-display font-black text-zinc-950 block">Portabilidad</strong>
            <p className="text-xs text-zinc-600 mt-1 leading-tight">Entrega en formato JSON o CSV.</p>
          </div>

        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-3xl border-2 border-zinc-900 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="font-display font-black text-base text-zinc-950">
              Bandeja de Control de Solicitudes ARCO+
            </h3>
            <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full border border-zinc-200">
              {solicitudes.length} solicitudes en monitoreo
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white font-mono text-[11px]">
                  <th className="py-3 px-4 font-bold">Titular & Solicitud</th>
                  <th className="py-3 px-4 font-bold">Derecho Ejercido</th>
                  <th className="py-3 px-4 font-bold">SLA Legal</th>
                  <th className="py-3 px-4 font-bold">Tiempo Restante</th>
                  <th className="py-3 px-4 font-bold">Estado</th>
                  <th className="py-3 px-4 font-bold text-right">Plantilla</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {solicitudes.map((s) => {
                  const esCritico = s.diasRestantes <= 1 && s.estado !== 'Respondida';
                  const esVencido = s.diasRestantes < 0 && s.estado !== 'Respondida';

                  return (
                    <tr key={s.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="text-zinc-950 font-display font-bold text-sm block">{s.titularNombre}</strong>
                        <span className="text-[11px] text-zinc-500 font-mono">RUT: {s.titularRUT} • {s.titularEmail}</span>
                        <p className="text-[11px] text-zinc-600 italic mt-0.5 max-w-sm">"{s.detalle}"</p>
                      </td>

                      <td className="py-3.5 px-4 align-top">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${
                          s.tipoSolicitud === 'Bloqueo Temporal'
                            ? 'bg-orange-100 text-orange-950 border-orange-300'
                            : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                        }`}>
                          {s.tipoSolicitud}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 align-top font-mono text-zinc-600">
                        <span className="font-bold block text-zinc-900">{s.slaMaximo}</span>
                        <span className="text-[10px] text-zinc-400">Ingreso: {s.fechaIngreso}</span>
                      </td>

                      <td className="py-3.5 px-4 align-top font-mono">
                        {s.estado === 'Respondida' ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                            Completada ✓
                          </span>
                        ) : esVencido ? (
                          <span className="text-red-700 font-bold bg-red-100 px-2.5 py-1 rounded border border-red-300">
                            VENCIDA ({Math.abs(s.diasRestantes)}d)
                          </span>
                        ) : esCritico ? (
                          <span className="text-orange-800 font-bold bg-orange-100 px-2.5 py-1 rounded border border-orange-300 animate-pulse">
                            ¡URGENTE ({s.diasRestantes}d)!
                          </span>
                        ) : (
                          <span className="text-zinc-900 font-bold">{s.diasRestantes} días restantes</span>
                        )}
                        <span className="text-[10px] text-zinc-400 block mt-0.5">Vence: {s.fechaVencimiento}</span>
                      </td>

                      <td className="py-3.5 px-4 align-top">
                        <select
                          value={s.estado}
                          onChange={(e) => handleCambiarEstado(s.id, e.target.value as any)}
                          className="bg-zinc-50 border border-zinc-300 rounded-lg px-2.5 py-1 text-xs text-zinc-900 font-medium focus:outline-none"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En Proceso">En Proceso</option>
                          <option value="Respondida">Respondida</option>
                          <option value="Rechazada Justificada">Rechazada</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 align-top text-right">
                        <button
                          onClick={() => setModalPlantilla(s.tipoSolicitud)}
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 px-3 py-1.5 rounded-lg transition-colors"
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

        {/* Modal Registrar Solicitud */}
        {modalNueva && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
                <h3 className="font-display font-black text-zinc-950 text-base">
                  Registrar Solicitud ARCO+ de Titular
                </h3>
                <button onClick={() => setModalNueva(false)} className="text-zinc-400 hover:text-zinc-950 text-base">✕</button>
              </div>

              <form onSubmit={handleCrearSolicitud} className="space-y-4">
                <div>
                  <label className="block font-bold text-zinc-900 mb-1 font-mono">Nombre Completo del Titular *</label>
                  <input
                    type="text"
                    required
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="w-full bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-950 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Ej. Juan Pérez González"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-zinc-900 mb-1 font-mono">RUT del Titular</label>
                    <input
                      type="text"
                      value={nuevoRUT}
                      onChange={(e) => setNuevoRUT(e.target.value)}
                      className="w-full bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-950 text-sm font-mono focus:border-orange-500 focus:outline-none"
                      placeholder="12.xxx.xxx-x"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-900 mb-1 font-mono">Email *</label>
                    <input
                      type="email"
                      required
                      value={nuevoEmail}
                      onChange={(e) => setNuevoEmail(e.target.value)}
                      className="w-full bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-950 text-sm focus:border-orange-500 focus:outline-none"
                      placeholder="correo@titular.cl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-900 mb-1 font-mono">Derecho Ejercido *</label>
                  <select
                    value={nuevoTipo}
                    onChange={(e) => setNuevoTipo(e.target.value as any)}
                    className="w-full bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-950 text-sm focus:border-orange-500 focus:outline-none"
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
                  <label className="block font-bold text-zinc-900 mb-1 font-mono">Motivo o Detalle</label>
                  <textarea
                    value={nuevoDetalle}
                    onChange={(e) => setNuevoDetalle(e.target.value)}
                    rows={2}
                    className="w-full bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-950 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Descripción de la petición..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 mt-4">
                  <button
                    type="button"
                    onClick={() => setModalNueva(false)}
                    className="px-4 py-2 font-mono font-bold text-zinc-600 hover:text-zinc-950"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-orange-500/25"
                  >
                    Iniciar SLA
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Plantilla */}
        {modalPlantilla && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
                <h3 className="font-display font-black text-zinc-950 text-base">
                  Plantilla Legal de Respuesta: {modalPlantilla}
                </h3>
                <button onClick={() => setModalPlantilla(null)} className="text-zinc-400 hover:text-zinc-950 text-base">✕</button>
              </div>

              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-300 font-mono text-[11px] text-zinc-800 space-y-2.5 leading-relaxed max-h-[50vh] overflow-y-auto">
                <p className="text-zinc-500">De: privacidad@tuempresa.cl</p>
                <p className="text-zinc-500">Asunto: Respuesta Formal a Ejercicio de Derecho de {modalPlantilla} - Ley Nº 21.719</p>
                <hr className="border-zinc-300" />
                <p>Estimado(a) Titular:</p>
                <p>
                  Acusamos recibo de su comunicación mediante la cual ejerce su derecho de <strong>{modalPlantilla}</strong>, 
                  conforme a las disposiciones de la Ley Nº 19.628 modificada por la Ley Nº 21.719 de Protección de Datos Personales.
                </p>
                {modalPlantilla === 'Bloqueo Temporal' ? (
                  <p className="text-orange-950 bg-orange-100 p-2.5 rounded-lg border border-orange-300">
                    Le informamos que dentro del plazo legal de 2 días hábiles se ha procedido al BLOQUEO TEMPORAL de sus datos 
                    en nuestros sistemas, impidiendo cualquier operación de tratamiento mientras se resuelve su solicitud de fondo.
                  </p>
                ) : (
                  <p className="text-zinc-900">
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

              <div className="flex justify-end pt-4 mt-2">
                <button
                  onClick={() => setModalPlantilla(null)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-xs"
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
