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
    detalle: 'Solicita suspender todo tratamiento y contacto comercial mientras se resuelve reclamo de cobro no reconocido.',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-amber-950/80 border border-amber-700/60 px-3 py-1 rounded-full text-xs text-amber-300 font-mono mb-3">
          <span className="material-symbols-outlined text-sm text-amber-400">timer</span>
          <span>SLAS LEGALES PERENTORIOS • LEY 21.719</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Gestor de Derechos ARCO+ & Monitoreo de Plazos
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          La Ley 21.719 impone plazos estrictos e improrrogables para responder a los titulares de datos. 
          El Bloqueo Temporal exige respuesta en <strong className="text-amber-300">2 días hábiles</strong> y el resto en <strong className="text-blue-300">30 días corridos</strong>.
        </p>
      </div>

      {/* Grid of the 6 Rights Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        
        {/* Bloqueo Temporal - Special Attention */}
        <div className="bg-[#141b3a] p-3.5 rounded-2xl border-2 border-amber-500/80 relative shadow-lg">
          <span className="absolute -top-2.5 right-2 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
            2 DÍAS HÁBILES
          </span>
          <span className="material-symbols-outlined text-amber-400 text-xl block mb-1">lock_clock</span>
          <strong className="text-xs font-bold text-white block">Bloqueo Temporal</strong>
          <p className="text-[10px] text-slate-300 mt-1 leading-tight">
            Congela el uso del dato mientras se revisa un reclamo. Plazo más exigente de la ley.
          </p>
        </div>

        {/* Acceso */}
        <div className="bg-[#0b1633] p-3.5 rounded-2xl border border-blue-900/60">
          <span className="text-[9px] font-mono text-blue-400 block font-bold mb-0.5">30 DÍAS CORRIDOS</span>
          <span className="material-symbols-outlined text-blue-400 text-xl block mb-1">visibility</span>
          <strong className="text-xs font-bold text-white block">Acceso</strong>
          <p className="text-[10px] text-slate-300 mt-1 leading-tight">
            Saber qué datos tiene la empresa, para qué fin y a quién se comparten.
          </p>
        </div>

        {/* Rectificación */}
        <div className="bg-[#0b1633] p-3.5 rounded-2xl border border-blue-900/60">
          <span className="text-[9px] font-mono text-blue-400 block font-bold mb-0.5">30 DÍAS CORRIDOS</span>
          <span className="material-symbols-outlined text-blue-400 text-xl block mb-1">edit_note</span>
          <strong className="text-xs font-bold text-white block">Rectificación</strong>
          <p className="text-[10px] text-slate-300 mt-1 leading-tight">
            Corregir datos inexactos, desactualizados, falsos o erróneos.
          </p>
        </div>

        {/* Supresión */}
        <div className="bg-[#0b1633] p-3.5 rounded-2xl border border-blue-900/60">
          <span className="text-[9px] font-mono text-blue-400 block font-bold mb-0.5">30 DÍAS CORRIDOS</span>
          <span className="material-symbols-outlined text-blue-400 text-xl block mb-1">delete_forever</span>
          <strong className="text-xs font-bold text-white block">Supresión (Borrado)</strong>
          <p className="text-[10px] text-slate-300 mt-1 leading-tight">
            Eliminar datos cuando no haya base de licitud o venza el plazo legal.
          </p>
        </div>

        {/* Oposición */}
        <div className="bg-[#0b1633] p-3.5 rounded-2xl border border-blue-900/60">
          <span className="text-[9px] font-mono text-blue-400 block font-bold mb-0.5">30 DÍAS CORRIDOS</span>
          <span className="material-symbols-outlined text-blue-400 text-xl block mb-1">front_hand</span>
          <strong className="text-xs font-bold text-white block">Oposición</strong>
          <p className="text-[10px] text-slate-300 mt-1 leading-tight">
            Oponerse a tratamientos basados en interés legítimo o envíos publicitarios.
          </p>
        </div>

        {/* Portabilidad */}
        <div className="bg-[#0b1633] p-3.5 rounded-2xl border border-blue-900/60">
          <span className="text-[9px] font-mono text-blue-400 block font-bold mb-0.5">30 DÍAS CORRIDOS</span>
          <span className="material-symbols-outlined text-blue-400 text-xl block mb-1">sync_alt</span>
          <strong className="text-xs font-bold text-white block">Portabilidad</strong>
          <p className="text-[10px] text-slate-300 mt-1 leading-tight">
            Entregar los datos al titular en formato electrónico estándar interoperable.
          </p>
        </div>

      </div>

      {/* Interactive Tracker Box */}
      <div className="bg-[#0b1633] p-6 sm:p-8 rounded-3xl border border-blue-900/60 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-900/40 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400">inbox</span>
              Bandeja de Monitoreo de Solicitudes ARCO+
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Simulador interactivo del canal de atención de derechos. Evita denuncias automáticas ante la APDP.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalNueva(true)}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Registrar Nueva Solicitud</span>
            </button>
          </div>
        </div>

        {/* Table of Requests */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-blue-900/60 text-slate-400">
                <th className="py-3 px-3 font-semibold">ID / Solicitante</th>
                <th className="py-3 px-3 font-semibold">Tipo Derecho</th>
                <th className="py-3 px-3 font-semibold">SLA Máximo</th>
                <th className="py-3 px-3 font-semibold">Plazo Restante</th>
                <th className="py-3 px-3 font-semibold">Estado</th>
                <th className="py-3 px-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/30">
              {solicitudes.map((s) => {
                const esCritico = s.diasRestantes <= 1 && s.estado !== 'Respondida';
                const esVencido = s.diasRestantes < 0 && s.estado !== 'Respondida';

                return (
                  <tr key={s.id} className="hover:bg-blue-950/40 transition-colors">
                    <td className="py-3.5 px-3">
                      <strong className="text-white font-bold block text-sm">{s.titularNombre}</strong>
                      <span className="text-[11px] text-slate-400 font-mono">RUT: {s.titularRUT} • {s.titularEmail}</span>
                      <p className="text-[11px] text-slate-400 mt-1 italic max-w-sm">"{s.detalle}"</p>
                    </td>

                    <td className="py-3.5 px-3 align-top">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        s.tipoSolicitud === 'Bloqueo Temporal'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-blue-950 text-blue-200 border border-blue-800'
                      }`}>
                        {s.tipoSolicitud}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 align-top font-mono text-slate-300">
                      <div>{s.slaMaximo}</div>
                      <span className="text-[10px] text-slate-500">Ingreso: {s.fechaIngreso}</span>
                    </td>

                    <td className="py-3.5 px-3 align-top font-mono">
                      {s.estado === 'Respondida' ? (
                        <span className="text-emerald-400 font-bold">Completado ✓</span>
                      ) : esVencido ? (
                        <div className="flex items-center gap-1 text-red-400 font-bold bg-red-950/80 px-2 py-1 rounded border border-red-800">
                          <span className="material-symbols-outlined text-xs">warning</span>
                          <span>VENCIDO ({Math.abs(s.diasRestantes)}d)</span>
                        </div>
                      ) : esCritico ? (
                        <div className="flex items-center gap-1 text-amber-300 font-bold bg-amber-950/80 px-2 py-1 rounded border border-amber-800 animate-pulse">
                          <span className="material-symbols-outlined text-xs">alarm</span>
                          <span>¡URGENTE! ({s.diasRestantes} día)</span>
                        </div>
                      ) : (
                        <span className="text-slate-200 font-semibold">{s.diasRestantes} días restantes</span>
                      )}
                      <span className="text-[10px] text-slate-400 block mt-0.5">Vence: {s.fechaVencimiento}</span>
                    </td>

                    <td className="py-3.5 px-3 align-top">
                      <select
                        value={s.estado}
                        onChange={(e) => handleCambiarEstado(s.id, e.target.value as any)}
                        className="bg-[#08122c] border border-blue-900 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Respondida">Respondida</option>
                        <option value="Rechazada Justificada">Rechazada Justificada</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-3 align-top text-right">
                      <button
                        onClick={() => setModalPlantilla(s.tipoSolicitud)}
                        className="inline-flex items-center gap-1 text-[11px] bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">drafts</span>
                        <span>Ver Plantilla Oficial</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Info callout on why RAT is essential */}
        <div className="bg-[#08122c] p-5 rounded-2xl border border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-400 text-2xl shrink-0 mt-0.5">lightbulb</span>
            <div className="text-xs text-slate-300">
              <p className="font-bold text-white text-sm">
                ¿Cómo responder a tiempo estas solicitudes si no sabes dónde están los datos?
              </p>
              <p className="mt-1">
                Para contestar un Acceso o ejecutar un Bloqueo Temporal en 2 días, necesitas tener mapeadas tus bases de datos. 
                Por esta razón el <strong>Tramo 1 (RAT - Art. 14 ter)</strong> es el primer paso indispensable.
              </p>
            </div>
          </div>
          <button
            onClick={onGoToRat}
            className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
          >
            Construir RAT con IA
          </button>
        </div>

      </div>

      {/* Modal Registrar Nueva Solicitud */}
      {modalNueva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1633] border border-blue-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 mb-4">
              <h3 className="font-bold text-white text-lg">
                Registrar Solicitud de Titular (ARCO+)
              </h3>
              <button onClick={() => setModalNueva(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCrearSolicitud} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">Nombre Completo del Titular *</label>
                <input
                  type="text"
                  required
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  placeholder="Ej. Juan Pérez González"
                  className="w-full bg-[#08122c] border border-blue-900 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">RUT del Titular</label>
                  <input
                    type="text"
                    value={nuevoRUT}
                    onChange={(e) => setNuevoRUT(e.target.value)}
                    placeholder="12.345.678-9"
                    className="w-full bg-[#08122c] border border-blue-900 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Email del Titular *</label>
                  <input
                    type="email"
                    required
                    value={nuevoEmail}
                    onChange={(e) => setNuevoEmail(e.target.value)}
                    placeholder="titular@correo.cl"
                    className="w-full bg-[#08122c] border border-blue-900 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Derecho Ejercido *</label>
                <select
                  value={nuevoTipo}
                  onChange={(e) => setNuevoTipo(e.target.value as any)}
                  className="w-full bg-[#08122c] border border-blue-900 rounded-xl px-3 py-2 text-white"
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
                <label className="block font-semibold text-slate-200 mb-1">Motivo o Detalle de la Solicitud</label>
                <textarea
                  value={nuevoDetalle}
                  onChange={(e) => setNuevoDetalle(e.target.value)}
                  rows={3}
                  placeholder="Explica qué solicitó específicamente el titular..."
                  className="w-full bg-[#08122c] border border-blue-900 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalNueva(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Iniciar Monitoreo de Plazo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Plantilla de Respuesta Oficial */}
      {modalPlantilla && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1633] border border-blue-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 mb-4">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400">mail</span>
                Modelo de Respuesta Legal: {modalPlantilla}
              </h3>
              <button onClick={() => setModalPlantilla(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-3 leading-relaxed max-h-[50vh] overflow-y-auto">
              <p className="text-slate-400">De: privacidad@tuempresa.cl</p>
              <p className="text-slate-400">Asunto: Respuesta Formal a Ejercicio de Derecho {modalPlantilla} - Ley Nº 21.719</p>
              <hr className="border-slate-800" />
              <p>Estimado(a) Titular:</p>
              <p>
                Acusamos recibo de su comunicación mediante la cual ejerce su derecho de <strong>{modalPlantilla}</strong>, 
                conforme a las disposiciones de la Ley Nº 19.628 modificada por la Ley Nº 21.719 de Protección de Datos Personales.
              </p>
              {modalPlantilla === 'Bloqueo Temporal' ? (
                <p className="text-amber-300">
                  Le informamos que dentro del plazo legal de 2 días hábiles se ha procedido al BLOQUEO TEMPORAL de sus datos 
                  en nuestros sistemas comerciales y de marketing, impidiendo cualquier operación de tratamiento mientras se resuelve su solicitud de fondo.
                </p>
              ) : (
                <p className="text-blue-300">
                  En cumplimiento del plazo legal de 30 días corridos, adjuntamos la información formal relativa a las actividades de 
                  tratamiento registradas en nuestro Registro de Actividades de Tratamiento (RAT - Art. 14 ter), individualizando fines, 
                  base de licitud y plazos de conservación.
                </p>
              )}
              <p>
                Ante cualquier duda o disconformidad, usted tiene derecho a presentar una reclamación ante la Agencia de Protección de Datos Personales (APDP).
              </p>
              <p>Atentamente,<br />Oficina de Protección de Datos Personales<br />Tu Empresa SpA</p>
            </div>

            <div className="flex justify-end gap-3 pt-5">
              <button
                onClick={() => setModalPlantilla(null)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Cerrar Plantilla
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ArcoManager;
