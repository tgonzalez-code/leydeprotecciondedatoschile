import React, { useState } from 'react';
import { ActividadRAT, DatosEmpresaRAT } from '../types';

const ACTIVIDADES_PREDEFINIDAS: ActividadRAT[] = [
  {
    id: 'act-rrhh',
    categoria: 'rrhh',
    nombre: 'Gestión de Personal y Planilla de Remuneraciones',
    finalidad: 'Contratación laboral, pago de sueldos, liquidaciones, cotizaciones previsionales (Previred) y registro de asistencia.',
    titulares: ['Trabajadores contratados', 'Cargas familiares', 'Ex-trabajadores'],
    datosTratados: ['Nombres y Apellidos', 'RUT chileno', 'Domicilio', 'Cuenta bancaria', 'Sueldo pactado', 'Huella digital/reloj control', 'Licencias médicas (salud)'],
    contieneSensibles: true,
    categoriasSensibles: ['Salud (Licencias médicas)', 'Biométricos (Control de asistencia por huella/facial)', 'RUT'],
    baseLicitud: 'Art. 13 letra a) - Ejecución de contrato o relación laboral/comercial',
    justificacionLegal: 'Obligación del Código del Trabajo, DFL 1 y cumplimiento de obligaciones previsionales y tributarias.',
    almacenamiento: 'Sistema de RRHH en la nube / Software contable / Planillas seguras',
    plazoConservacion: 'Durante la relación laboral + 5 años post-término para fines de prescripción laboral y fiscal.',
    destinatarios: 'Previred, Dirección del Trabajo, SII, Entidades Bancarias y Mutuales.',
    medidasSeguridad: ['Acceso restringido por roles', 'Contraseñas con doble factor (MFA)', 'Cifrado en tránsito y reposo'],
    seleccionada: true,
  },
  {
    id: 'act-clientes-crm',
    categoria: 'clientes',
    nombre: 'Gestión Comercial, CRM y Servicio al Cliente',
    finalidad: 'Contacto comercial, cotizaciones, gestión de ventas B2B/B2C, soporte postventa y fidelización.',
    titulares: ['Clientes vigentes', 'Contactos de empresas clientes', 'Potenciales compradores (Leads)'],
    datosTratados: ['Nombre y Apellido', 'RUT de facturación', 'Correo electrónico', 'Teléfono móvil', 'Historial de compras'],
    contieneSensibles: false,
    categoriasSensibles: [],
    baseLicitud: 'Art. 13 letra a) - Ejecución de contrato o relación laboral/comercial',
    justificacionLegal: 'Necesario para la ejecución de la relación comercial o medidas precontractuales solicitadas por el cliente.',
    almacenamiento: 'CRM en la nube (ej. HubSpot, Salesforce, Zoho, Google Drive)',
    plazoConservacion: 'Vigencia de la relación comercial + 3 años para soporte de garantías.',
    destinatarios: 'No se transfieren a terceros (uso estrictamente interno).',
    medidasSeguridad: ['Autenticación centralizada', 'Copias de respaldo periódicas', 'Cláusulas de confidencialidad con colaboradores'],
    seleccionada: true,
  },
  {
    id: 'act-ecommerce',
    categoria: 'ecommerce',
    nombre: 'Ventas en Sitio Web, Pagos y Despacho a Domicilio',
    finalidad: 'Procesamiento de compras online, emisión de boletas/facturas electrónicas y entrega logística.',
    titulares: ['Compradores online', 'Destinatarios de envíos'],
    datosTratados: ['Nombre', 'RUT', 'Dirección de envío', 'Teléfono', 'Email', 'Identificador de transacción pasarela'],
    contieneSensibles: false,
    categoriasSensibles: [],
    baseLicitud: 'Art. 13 letra a) - Ejecución de contrato o relación laboral/comercial',
    justificacionLegal: 'Perfeccionamiento y cumplimiento de la compraventa digital y entrega del producto.',
    almacenamiento: 'Plataforma eCommerce (Shopify, WooCommerce, Vtex)',
    plazoConservacion: '5 años conforme a exigencias del Código Tributario para comprobantes de venta.',
    destinatarios: 'Pasarelas de Pago (Webpay/Transbank, Mercado Pago), Empresas de Envíos (Chilexpress, Starken, Blue Express).',
    medidasSeguridad: ['Certificado SSL/TLS', 'Tokenización de pagos (no se almacenan números de tarjetas)', 'Políticas de contraseñas seguras'],
    seleccionada: true,
  },
  {
    id: 'act-cctv',
    categoria: 'seguridad',
    nombre: 'Circuito Cerrado de Televisión (CCTV) y Videovigilancia',
    finalidad: 'Seguridad física de instalaciones, prevención de delitos y resguardo de colaboradores y visitantes.',
    titulares: ['Trabajadores', 'Clientes presenciales', 'Proveedores y visitantes'],
    datosTratados: ['Imágenes en video', 'Hora y fecha de ingreso/salida', 'Fisonomía facial'],
    contieneSensibles: true,
    categoriasSensibles: ['Imágenes y datos biométricos fisonómicos'],
    baseLicitud: 'Art. 13 letra e) - Interés legítimo ponderado',
    justificacionLegal: 'Interés legítimo del responsable en proteger la vida e integridad física y los activos de la empresa, debidamente señalizado.',
    almacenamiento: 'DVR / NVR en sitio o almacenamiento en la nube con acceso cifrado',
    plazoConservacion: '30 días corridos, tras los cuales se sobreescriben automáticamente salvo incidente en investigación.',
    destinatarios: 'Ministerio Público o Carabineros de Chile sólo mediante orden judicial o requerimiento formal.',
    medidasSeguridad: ['Carteles visibles de advertencia en accesos', 'DVR bajo llave', 'Acceso exclusivo al jefe de seguridad'],
    seleccionada: true,
  },
  {
    id: 'act-marketing',
    categoria: 'marketing',
    nombre: 'Marketing Digital, Boletines y Prospección',
    finalidad: 'Envío de ofertas, promociones, invitaciones a eventos y analítica web.',
    titulares: ['Suscriptores de newsletter', 'Usuarios web'],
    datosTratados: ['Email', 'Nombre', 'Cookies analíticas', 'Intereses de navegación'],
    contieneSensibles: false,
    categoriasSensibles: [],
    baseLicitud: 'Art. 12 - Consentimiento expreso e informado',
    justificacionLegal: 'Consentimiento previo, libre, informado y específico del titular con mecanismo fácil de revocación (Opt-out).',
    almacenamiento: 'Herramienta de Email Marketing (Mailchimp, Brevo, Klaviyo)',
    plazoConservacion: 'Hasta que el titular solicite la baja (revocación de consentimiento) o 24 meses de inactividad.',
    destinatarios: 'Proveedores de analítica web y plataformas de distribución de correo bajo contrato de encargado de datos.',
    medidasSeguridad: ['Doble Opt-in de confirmación', 'Enlace directo de desuscripción en cada correo', 'Registros de trazabilidad del consentimiento'],
    seleccionada: false,
  },
  {
    id: 'act-proveedores',
    categoria: 'proveedores',
    nombre: 'Gestión y Pago a Proveedores y Prestadores de Servicios',
    finalidad: 'Emisión de órdenes de compra, recepción de facturas, pagos bancarios y cumplimiento tributario.',
    titulares: ['Proveedores personas naturales', 'Representantes legales de empresas proveedoras'],
    datosTratados: ['Razón social o Nombre', 'RUT', 'Cuenta corriente bancaria', 'Teléfono de contacto', 'Facturas DTE'],
    contieneSensibles: false,
    categoriasSensibles: [],
    baseLicitud: 'Art. 13 letra a) - Ejecución de contrato o relación laboral/comercial',
    justificacionLegal: 'Gestión contractual de adquisición de bienes o servicios y obligaciones tributarias con el SII.',
    almacenamiento: 'ERP contable / Portal SII / Archivo administrativo',
    plazoConservacion: '6 años según prescripción del Código Tributario y de Comercio.',
    destinatarios: 'Servicio de Impuestos Internos (SII) y Bancos Comerciales.',
    medidasSeguridad: ['Control dual para transferencias', 'Verificación de cuentas corrientes', 'Acceso restringido a finanzas'],
    seleccionada: true,
  },
];

const RatAgentWizard: React.FC = () => {
  const [paso, setPaso] = useState<number>(1);
  const [datosEmpresa, setDatosEmpresa] = useState<DatosEmpresaRAT>({
    razonSocial: 'Comercial & Servicios SpA',
    rutEmpresa: '76.845.120-K',
    representanteLegal: 'Carlos Muñoz Rojas',
    rubro: 'Servicios Profesionales y Comercio',
    clasificacionTamano: 'Pequeña Pyme',
    responsableTratamientoDPO: 'Carlos Muñoz (Gerente General)',
    emailContacto: 'contacto@pyme-ejemplo.cl',
    ciudadRegion: 'Santiago, Región Metropolitana',
    fechaCreacion: new Date().toLocaleDateString('es-CL'),
    codigoCertificadoRAT: `RAT-CL-${Math.floor(100000 + Math.random() * 900000)}`,
  });

  const [actividades, setActividades] = useState<ActividadRAT[]>(ACTIVIDADES_PREDEFINIDAS);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [nuevaActividadNombre, setNuevaActividadNombre] = useState('');
  const [nuevaActividadFinalidad, setNuevaActividadFinalidad] = useState('');
  const [mostrarModalNueva, setMostrarModalNueva] = useState(false);

  const toggleSeleccion = (id: string) => {
    setActividades(prev =>
      prev.map(a => (a.id === id ? { ...a, seleccionada: !a.seleccionada } : a))
    );
  };

  const agregarActividadPersonalizada = () => {
    if (!nuevaActividadNombre.trim()) return;
    const nueva: ActividadRAT = {
      id: `act-custom-${Date.now()}`,
      categoria: 'clientes',
      nombre: nuevaActividadNombre,
      finalidad: nuevaActividadFinalidad || 'Finalidad operativa definida por la empresa',
      titulares: ['Clientes o Usuarios'],
      datosTratados: ['Nombre', 'RUT', 'Email', 'Teléfono'],
      contieneSensibles: false,
      categoriasSensibles: [],
      baseLicitud: 'Art. 13 letra a) - Ejecución de contrato o relación laboral/comercial',
      justificacionLegal: 'Tratamiento necesario para el desarrollo de la actividad comercial.',
      almacenamiento: 'Sistemas informáticos internos de la empresa',
      plazoConservacion: 'Durante la vigencia de la relación + 3 años de prescripción ordinaria.',
      destinatarios: 'Uso interno de la empresa.',
      medidasSeguridad: ['Acceso restringido mediante usuario y clave'],
      seleccionada: true,
    };
    setActividades(prev => [...prev, nueva]);
    setNuevaActividadNombre('');
    setNuevaActividadFinalidad('');
    setMostrarModalNueva(false);
  };

  const actividadesSeleccionadas = actividades.filter(a => a.seleccionada);
  const actividadesFiltradas = actividades.filter(a => filtroCategoria === 'todas' || a.categoria === filtroCategoria);

  const exportarJSON = () => {
    const payload = {
      documentoOficial: "Registro de Actividades de Tratamiento (RAT) - Ley 21.719",
      articuloFundante: "Artículo 14 ter de la Ley 19.628 modificada por Ley 21.719",
      entidadFiscalizadora: "Agencia de Protección de Datos Personales (APDP) - Chile",
      codigoCertificacion: datosEmpresa.codigoCertificadoRAT,
      fechaGeneracion: new Date().toISOString(),
      responsableTratamiento: datosEmpresa,
      resumenEstadistico: {
        totalActividadesRegistradas: actividadesSeleccionadas.length,
        actividadesConDatosSensibles: actividadesSeleccionadas.filter(a => a.contieneSensibles).length,
        estadoCumplimientoTramo1: "COMPLETO Y VIGENTE"
      },
      actividadesDeTratamiento: actividadesSeleccionadas.map(a => ({
        id: a.id,
        nombreActividad: a.nombre,
        categoria: a.categoria,
        finalidadEspecifica: a.finalidad,
        categoriasTitulares: a.titulares,
        datosTratados: a.datosTratados,
        trataDatosSensiblesOEspeciales: a.contieneSensibles,
        detalleCategoriasSensibles: a.categoriasSensibles,
        baseDeLicitudAsignada: a.baseLicitud,
        fundamentoJuridico: a.justificacionLegal,
        lugarDeAlmacenamiento: a.almacenamiento,
        plazoDeConservacion: a.plazoConservacion,
        destinatariosTransferencias: a.destinatarios,
        medidasDeSeguridadTecnicasYOrganizativas: a.medidasSeguridad
      }))
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RAT_${datosEmpresa.rutEmpresa.replace(/\./g, '').replace(/-/g, '_')}_APDP.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wizard Control Header */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                AGENTE IA • ART. 14 TER
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {actividadesSeleccionadas.length} actividades seleccionadas ({actividadesSeleccionadas.filter(a => a.contieneSensibles).length} con datos sensibles)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Generador del Registro de Actividades de Tratamiento (RAT)
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              "Cumplir sin frenar": Responde las preguntas operativas. El sistema clasifica datos y asigna bases de licitud para la APDP.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto">
            {[
              { num: 1, label: '1. Empresa' },
              { num: 2, label: '2. Tratamientos' },
              { num: 3, label: '3. Clasificación' },
              { num: 4, label: '4. Ficha Oficial' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setPaso(s.num)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  paso === s.num
                    ? 'bg-blue-900 text-white shadow-sm font-bold'
                    : paso > s.num
                    ? 'bg-white text-emerald-800 border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 1: Datos de la Empresa */}
        {paso === 1 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Paso 1: Identificación Formal de la Empresa (Responsable del Tratamiento)
                </h2>
                <p className="text-xs text-slate-500">
                  Datos que encabezarán el RAT obligatorio ante la Agencia de Protección de Datos Personales (APDP).
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Requerido por Art. 14 ter Nº 1</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Razón Social o Nombre Legal *
                </label>
                <input
                  type="text"
                  value={datosEmpresa.razonSocial}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, razonSocial: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:border-blue-900 focus:outline-none"
                  placeholder="Ej. Comercializadora SpA"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  RUT de la Empresa *
                </label>
                <input
                  type="text"
                  value={datosEmpresa.rutEmpresa}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, rutEmpresa: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-900 font-bold focus:bg-white focus:border-blue-900 focus:outline-none"
                  placeholder="76.xxx.xxx-x"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Representante Legal *
                </label>
                <input
                  type="text"
                  value={datosEmpresa.representanteLegal}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, representanteLegal: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-blue-900 focus:outline-none"
                  placeholder="Nombre y Apellidos"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Tamaño de Empresa (Estatuto Pyme)
                </label>
                <select
                  value={datosEmpresa.clasificacionTamano}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, clasificacionTamano: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-blue-900 focus:outline-none"
                >
                  <option value="Microempresa">Microempresa (1 a 9 trabajadores / hasta 2.400 UF)</option>
                  <option value="Pequeña Pyme">Pequeña Pyme (10 a 49 trabajadores / 2.400 a 25.000 UF)</option>
                  <option value="Mediana Empresa">Mediana Empresa (50 a 199 trabajadores)</option>
                  <option value="Gran Empresa">Gran Empresa (200+ trabajadores)</option>
                </select>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                  ✓ Amparado por beneficio de amonestación (Ley 20.416)
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Email de Contacto Canal ARCO+ *
                </label>
                <input
                  type="email"
                  value={datosEmpresa.emailContacto}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, emailContacto: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:bg-white focus:border-blue-900 focus:outline-none"
                  placeholder="privacidad@tuempresa.cl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Comuna y Región
                </label>
                <input
                  type="text"
                  value={datosEmpresa.ciudadRegion}
                  onChange={(e) => setDatosEmpresa({ ...datosEmpresa, ciudadRegion: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-blue-900 focus:outline-none"
                  placeholder="Santiago, Región Metropolitana"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => setPaso(2)}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-lg text-xs shadow-sm transition-all"
              >
                <span>Siguiente: Seleccionar Tratamientos de Datos</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Detección y Selección de Tratamientos */}
        {paso === 2 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Paso 2: Inventario de Operaciones Habituales de tu Empresa
                </h2>
                <p className="text-xs text-slate-500">
                  Selecciona los tratamientos que realiza tu Pyme. El Agente ya trae preconfigurados los datos y finalidades de mayor impacto.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMostrarModalNueva(true)}
                  className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Agregar Actividad</span>
                </button>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1">
              <span className="text-slate-500 font-medium mr-2">Filtrar:</span>
              {[
                { key: 'todas', label: 'Todas' },
                { key: 'rrhh', label: 'RRHH & Nóminas' },
                { key: 'clientes', label: 'CRM & Clientes' },
                { key: 'ecommerce', label: 'Ecommerce' },
                { key: 'seguridad', label: 'CCTV' },
                { key: 'marketing', label: 'Marketing' },
                { key: 'proveedores', label: 'Proveedores' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFiltroCategoria(f.key)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
                    filtroCategoria === f.key
                      ? 'bg-blue-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Dense Activity Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {actividadesFiltradas.map((act) => (
                <div
                  key={act.id}
                  onClick={() => toggleSeleccion(act.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                    act.seleccionada
                      ? 'bg-blue-50/40 border-blue-900 ring-1 ring-blue-900/20'
                      : 'bg-white border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={act.seleccionada}
                          onChange={() => {}}
                          className="rounded text-blue-900 focus:ring-0 w-4 h-4 cursor-pointer"
                        />
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                          {act.nombre}
                        </h3>
                      </div>
                      {act.contieneSensibles && (
                        <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0">
                          DATOS SENSIBLES
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mb-2 leading-relaxed pl-6">
                      {act.finalidad}
                    </p>

                    <div className="pl-6 flex flex-wrap gap-1 mb-2">
                      {act.datosTratados.map((d, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.2 rounded border border-slate-200 font-mono">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pl-6 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Base: <strong className="text-slate-800">{act.baseLicitud.split(' - ')[0]}</strong></span>
                    <span className="font-mono text-[10px]">{act.almacenamiento}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setPaso(1)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                ← Volver a Datos de Empresa
              </button>
              <button
                onClick={() => setPaso(3)}
                className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-lg text-xs shadow-sm transition-all"
              >
                <span>Revisar Clasificación IA & Bases de Licitud</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Clasificación Inteligente y Asignación de Base de Licitud */}
        {paso === 3 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Paso 3: Matriz de Bases de Licitud (Art. 12 y 13) y Salvaguardas
                </h2>
                <p className="text-xs text-slate-500">
                  El motor legal asignó el fundamento jurídico y segregó los datos de categoría especial según los estándares de la APDP.
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold px-2 py-1 rounded">
                Art. 14 ter Validado
              </span>
            </div>

            {/* Dense High-Information Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">Actividad</th>
                    <th className="py-2.5 px-3">Datos Tratados</th>
                    <th className="py-2.5 px-3">Base de Licitud (Art. 12/13)</th>
                    <th className="py-2.5 px-3">Plazo de Conservación</th>
                    <th className="py-2.5 px-3">Medidas Técnicas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {actividadesSeleccionadas.map((act) => (
                    <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 align-top max-w-[200px]">
                        <strong className="text-slate-900 block text-xs">{act.nombre}</strong>
                        <p className="text-[11px] text-slate-500 mt-0.5">{act.finalidad}</p>
                        {act.contieneSensibles && (
                          <span className="inline-block mt-1 bg-red-50 text-red-700 font-mono text-[9px] font-bold px-1.5 py-0.2 rounded border border-red-200">
                            Sensible: {act.categoriasSensibles.join(', ')}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 align-top max-w-[200px] text-[11px] text-slate-700">
                        {act.datosTratados.join(', ')}
                      </td>

                      <td className="py-3 px-3 align-top max-w-[220px]">
                        <span className="font-semibold text-blue-900 block text-xs">
                          {act.baseLicitud}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-0.5 italic">
                          {act.justificacionLegal}
                        </p>
                      </td>

                      <td className="py-3 px-3 align-top text-[11px] text-slate-700 max-w-[160px]">
                        {act.plazoConservacion}
                      </td>

                      <td className="py-3 px-3 align-top text-[11px] text-slate-600 max-w-[180px]">
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

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setPaso(2)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                ← Modificar Actividades
              </button>
              <button
                onClick={() => setPaso(4)}
                className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-lg text-xs shadow-sm transition-all"
              >
                <span>Generar Documento Oficial RAT (Paso 4)</span>
                <span className="material-symbols-outlined text-xs">verified</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Ficha Oficial RAT Generada & Exportación */}
        {paso === 4 && (
          <div className="space-y-4">
            
            {/* Action Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  TRAMO 1 OBLIGATORIO REGULARIZADO
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  Ficha Oficial del Registro de Actividades de Tratamiento (Art. 14 ter)
                </h2>
                <p className="text-xs text-slate-500">
                  Documento exigible por la Agencia de Protección de Datos Personales (APDP) de Chile.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportarJSON}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3.5 py-2 rounded-lg text-xs font-bold"
                >
                  <span className="material-symbols-outlined text-sm text-blue-900">data_object</span>
                  <span>Descargar JSON APDP</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Imprimir / PDF Oficial</span>
                </button>
                <button
                  onClick={() => setPaso(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 px-2"
                >
                  Editar
                </button>
              </div>
            </div>

            {/* Official Printable Chilean RAT Document */}
            <div className="bg-white text-slate-900 p-8 rounded-xl shadow-sm border border-slate-300 print:border-none print:shadow-none print:p-0">
              
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold font-mono text-slate-700 uppercase">
                    <span>REPÚBLICA DE CHILE</span>
                    <span>•</span>
                    <span>LEY Nº 21.719</span>
                    <span>•</span>
                    <span className="bg-slate-100 px-1.5 py-0.2 rounded border border-slate-300">ART. 14 TER</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-950 mt-1 tracking-tight">
                    REGISTRO DE ACTIVIDADES DE TRATAMIENTO (RAT)
                  </h1>
                  <p className="text-xs text-slate-600">
                    Ficha de cumplimiento ante la Agencia de Protección de Datos Personales (APDP)
                  </p>
                </div>

                <div className="text-left sm:text-right border-l sm:border-l-0 border-slate-300 pl-3 sm:pl-0 font-mono text-xs">
                  <span className="text-slate-500 block">CÓDIGO OFICIAL:</span>
                  <span className="font-extrabold text-sm text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300 inline-block">
                    {datosEmpresa.codigoCertificadoRAT}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Emisión: {datosEmpresa.fechaCreacion}</span>
                </div>
              </div>

              {/* Entity Identification Matrix */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Razón Social:</span>
                  <strong className="text-slate-900 font-semibold">{datosEmpresa.razonSocial}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">RUT Entidad:</span>
                  <strong className="text-slate-900 font-mono">{datosEmpresa.rutEmpresa}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Representante Legal:</span>
                  <span className="text-slate-800">{datosEmpresa.representanteLegal}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Estatuto Pyme:</span>
                  <span className="text-emerald-800 font-bold">{datosEmpresa.clasificacionTamano} (Ley 20.416)</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Responsable DPO:</span>
                  <span className="text-slate-800">{datosEmpresa.responsableTratamientoDPO}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Canal ARCO+ (Email):</span>
                  <span className="text-blue-900 font-bold">{datosEmpresa.emailContacto}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Comuna / Región:</span>
                  <span className="text-slate-800">{datosEmpresa.ciudadRegion}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Total Actividades:</span>
                  <strong className="text-slate-900">{actividadesSeleccionadas.length} actividades</strong>
                </div>
              </div>

              {/* Dense Table */}
              <div className="overflow-x-auto mb-6 border border-slate-300 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-[11px]">
                      <th className="p-2.5">Actividad & Finalidad</th>
                      <th className="p-2.5">Titulares & Datos</th>
                      <th className="p-2.5">Base Legal (Art. 12/13)</th>
                      <th className="p-2.5">Conservación & Destino</th>
                      <th className="p-2.5">Medidas de Seguridad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {actividadesSeleccionadas.map((a, idx) => (
                      <tr key={a.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2.5 align-top max-w-[200px]">
                          <strong className="text-slate-900 block text-xs">{idx + 1}. {a.nombre}</strong>
                          <p className="text-slate-600 text-[11px] mt-0.5">{a.finalidad}</p>
                          {a.contieneSensibles && (
                            <span className="inline-block mt-1 bg-red-100 text-red-800 font-bold text-[9px] px-1 py-0.2 rounded border border-red-300">
                              DATOS SENSIBLES
                            </span>
                          )}
                        </td>

                        <td className="p-2.5 align-top max-w-[190px] text-[11px] text-slate-700">
                          <div><strong>Titulares:</strong> {a.titulares.join(', ')}</div>
                          <div className="mt-1"><strong>Datos:</strong> {a.datosTratados.join(', ')}</div>
                        </td>

                        <td className="p-2.5 align-top max-w-[200px]">
                          <span className="font-bold text-slate-900 block text-[11px]">{a.baseLicitud}</span>
                          <p className="text-[10px] text-slate-500 italic mt-0.5">{a.justificacionLegal}</p>
                        </td>

                        <td className="p-2.5 align-top max-w-[160px] text-[11px] text-slate-700">
                          <div><strong>Plazo:</strong> {a.plazoConservacion}</div>
                          <div className="mt-1 text-[10px] text-slate-500"><strong>Destino:</strong> {a.destinatarios}</div>
                        </td>

                        <td className="p-2.5 align-top max-w-[160px] text-[10px] text-slate-600">
                          <ul className="list-disc pl-3">
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

              {/* Sign-off footer */}
              <div className="pt-4 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[10px]">
                    Declaración de Responsabilidad Proactiva (Accountability)
                  </h4>
                  <p className="text-[11px] leading-relaxed mt-0.5">
                    Este documento constituye el inventario fidedigno exigible por la Agencia de Protección de Datos Personales (APDP) conforme al Artículo 14 ter de la Ley Nº 21.719.
                  </p>
                </div>
                <div className="flex flex-col sm:items-end justify-end">
                  <div className="border-t border-slate-400 w-48 text-center pt-1 text-slate-800 font-semibold text-xs">
                    {datosEmpresa.representanteLegal}
                    <span className="block font-normal text-[10px] text-slate-500">Responsable del Tratamiento</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Modal for adding custom activity */}
        {mostrarModalNueva && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 shadow-xl text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h3 className="font-bold text-slate-900 text-sm">
                  Agregar Nueva Actividad de Tratamiento
                </h3>
                <button onClick={() => setMostrarModalNueva(false)} className="text-slate-400 hover:text-slate-800">✕</button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Nombre de la Actividad *</label>
                  <input
                    type="text"
                    value={nuevaActividadNombre}
                    onChange={(e) => setNuevaActividadNombre(e.target.value)}
                    placeholder="Ej. Registro de visitas, Encuestas posventa"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Finalidad específica</label>
                  <textarea
                    value={nuevaActividadFinalidad}
                    onChange={(e) => setNuevaActividadFinalidad(e.target.value)}
                    rows={3}
                    placeholder="Para qué usa la empresa estos datos..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 mt-4">
                <button
                  onClick={() => setMostrarModalNueva(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  onClick={agregarActividadPersonalizada}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-1.5 rounded-lg"
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
