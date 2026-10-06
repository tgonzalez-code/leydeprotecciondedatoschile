import React, { useState } from 'react';
import { ActividadRAT, DatosEmpresaRAT, CategoriaActividad, BaseLicitudTipo } from '../types';

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
  const [nuevaActividadNombre, setNuevaActividadNombre] = useState('');
  const [nuevaActividadFinalidad, setNuevaActividadFinalidad] = useState('');
  const [mostrarModalNueva, setMostrarModalNueva] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Manejo de selección de actividades
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

  const imprimirPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Wizard Header */}
      <div className="bg-gradient-to-r from-[#0c1a40] via-[#0e245c] to-[#0c1a40] p-6 sm:p-8 rounded-3xl border border-blue-800/60 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-600/50 px-3 py-1 rounded-full text-xs text-emerald-300 font-mono mb-3">
              <span className="material-symbols-outlined text-sm text-emerald-400">psychology</span>
              <span>AGENTE IA TRAMO 1 • ARTÍCULO 14 TER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Constructor Inteligente de RAT
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              "Cumplir sin frenar": Responde las preguntas de negocio. Nuestro Agente clasifica 
              automáticamente los datos sensibles y asigna la base de licitud legal para la APDP.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center gap-2 bg-[#08122c] p-2 rounded-2xl border border-blue-900/60 self-start md:self-auto">
            {[
              { num: 1, label: 'Empresa' },
              { num: 2, label: 'Tratamientos' },
              { num: 3, label: 'IA Clasificación' },
              { num: 4, label: 'Ficha Oficial' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setPaso(s.num)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  paso === s.num
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                    : paso > s.num
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  paso === s.num ? 'bg-white text-blue-900' : 'bg-slate-800 text-slate-300'
                }`}>
                  {paso > s.num ? '✓' : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 1: Datos de la Empresa */}
      {paso === 1 && (
        <div className="bg-[#0b1633] p-6 sm:p-8 rounded-3xl border border-blue-900/60 shadow-xl space-y-6">
          <div className="border-b border-blue-900/40 pb-4">
            <span className="text-xs font-mono text-blue-400 font-semibold uppercase">Paso 1 de 4</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Identificación del Responsable del Tratamiento
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Información formal exigida por la Agencia de Protección de Datos Personales (APDP) en el encabezado del RAT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Razón Social o Nombre de la Empresa *
              </label>
              <input
                type="text"
                value={datosEmpresa.razonSocial}
                onChange={(e) => setDatosEmpresa({ ...datosEmpresa, razonSocial: e.target.value })}
                className="w-full bg-[#08122c] border border-blue-900/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Ej. Mi Empresa SpA"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                RUT de la Empresa (con puntos y guión) *
              </label>
              <input
                type="text"
                value={datosEmpresa.rutEmpresa}
                onChange={(e) => setDatosEmpresa({ ...datosEmpresa, rutEmpresa: e.target.value })}
                className="w-full bg-[#08122c] border border-blue-900/80 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Ej. 76.543.210-K"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Representante Legal *
              </label>
              <input
                type="text"
                value={datosEmpresa.representanteLegal}
                onChange={(e) => setDatosEmpresa({ ...datosEmpresa, representanteLegal: e.target.value })}
                className="w-full bg-[#08122c] border border-blue-900/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Rubro o Giro Comercial
              </label>
              <input
                type="text"
                value={datosEmpresa.rubro}
                onChange={(e) => setDatosEmpresa({ ...datosEmpresa, rubro: e.target.value })}
                className="w-full bg-[#08122c] border border-blue-900/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Ej. Servicios de tecnología, Comercio minorista, Clínica"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Clasificación de Tamaño de Empresa
              </label>
              <select
                value={datosEmpresa.clasificacionTamano}
                onChange={(e) => setDatosEmpresa({ ...datosEmpresa, clasificacionTamano: e.target.value as any })}
                className="w-full bg-[#08122c] border border-blue-900/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Microempresa">Microempresa (1 a 9 trabajadores / hasta 2.400 UF)</option>
                <option value="Pequeña Pyme">Pequeña Pyme (10 a 49 trabajadores / 2.400 a 25.000 UF)</option>
                <option value="Mediana Empresa">Mediana Empresa (50 a 199 trabajadores / 25.000 a 100.000 UF)</option>
                <option value="Gran Empresa">Gran Empresa (200+ trabajadores / más de 100.000 UF)</option>
              </select>
              <p className="text-[11px] text-emerald-400 mt-1">
                ✓ Elegible para beneficio de amonestación en 1ra infracción (Ley 20.416 Estatuto Pyme).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Responsable del Tratamiento de Datos / DPO
              </label>
              <input
                type="text"
                value={datosEmpresa.responsableTratamientoDPO}
                onChange={(e) => setDatosEmpresa({ ...datosEmpresa, responsableTratamientoDPO: e.target.value })}
                className="w-full bg-[#08122c] border border-blue-900/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Ej. Gerente General / Encargado de Datos"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email de Contacto para Derechos ARCO+ *
              </label>
              <input
                type="email"
                value={datosEmpresa.emailContacto}
                onChange={(e) => setDatosEmpresa({ ...datosEmpresa, emailContacto: e.target.value })}
                className="w-full bg-[#08122c] border border-blue-900/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="privacidad@tuempresa.cl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Comuna y Región
              </label>
              <input
                type="text"
                value={datosEmpresa.ciudadRegion}
                onChange={(e) => setDatosEmpresa({ ...datosEmpresa, ciudadRegion: e.target.value })}
                className="w-full bg-[#08122c] border border-blue-900/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Ej. Providencia, Santiago"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setPaso(2)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>Continuar al Inventario de Datos</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Detección y Selección de Tratamientos */}
      {paso === 2 && (
        <div className="bg-[#0b1633] p-6 sm:p-8 rounded-3xl border border-blue-900/60 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-900/40 pb-4">
            <div>
              <span className="text-xs font-mono text-blue-400 font-semibold uppercase">Paso 2 de 4</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                ¿Qué datos maneja tu empresa en el día a día?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Marca las actividades habituales de tu operación. El Agente de IA ya tiene pre-mapeadas 
                las categorías de datos más críticas en Chile.
              </p>
            </div>
            <button
              onClick={() => setMostrarModalNueva(true)}
              className="inline-flex items-center gap-1.5 bg-[#122247] hover:bg-[#1a3064] text-blue-300 border border-blue-700/60 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              <span>+ Agregar Actividad Personalizada</span>
            </button>
          </div>

          {/* Cards of Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actividades.map((act) => (
              <div
                key={act.id}
                onClick={() => toggleSeleccion(act.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  act.seleccionada
                    ? 'bg-[#0e214d] border-blue-500/80 shadow-md shadow-blue-950'
                    : 'bg-[#08122c] border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        act.seleccionada ? 'bg-blue-600 text-white' : 'border border-slate-600 text-transparent'
                      }`}>
                        ✓
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        {act.nombre}
                      </h3>
                    </div>
                    {act.contieneSensibles && (
                      <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono px-2 py-0.5 rounded shrink-0">
                        ⚠️ Datos Sensibles
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    {act.finalidad}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {act.datosTratados.map((d, i) => (
                      <span key={i} className="bg-blue-950/80 text-blue-200 border border-blue-800/40 text-[10px] px-2 py-0.5 rounded-full">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-900/40 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Almacenamiento: {act.almacenamiento}</span>
                  <span className="font-mono text-emerald-400 font-semibold">{act.seleccionada ? 'Incluida en RAT' : 'Omitida'}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-blue-900/30">
            <button
              onClick={() => setPaso(1)}
              className="text-xs sm:text-sm text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Volver a Datos de Empresa
            </button>
            <button
              onClick={() => setPaso(3)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>Ejecutar Clasificación de IA (Paso 3)</span>
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Clasificación Inteligente y Asignación de Base de Licitud */}
      {paso === 3 && (
        <div className="bg-[#0b1633] p-6 sm:p-8 rounded-3xl border border-blue-900/60 shadow-xl space-y-6">
          <div className="border-b border-blue-900/40 pb-4">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              Paso 3 de 4 • Motor Regulatorio Ley 21.719
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Clasificación de Datos & Asignación de Bases de Licitud
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Nuestro agente analizó tus actividades seleccionadas, segregó datos sensibles 
              (Art. 2 y 16) y asoció el fundamento legal específico según los Artículos 12 y 13.
            </p>
          </div>

          {/* Alert summary of sensitive data */}
          <div className="bg-amber-950/40 border border-amber-800/60 p-4 rounded-2xl flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-400 text-xl shrink-0 mt-0.5">security</span>
            <div className="text-xs text-amber-200">
              <p className="font-bold text-amber-100">
                Alerta de Categorías Especiales / Sensibles Detectadas:
              </p>
              <p className="mt-1">
                Se identificaron datos de <strong>Salud (licencias médicas)</strong>, <strong>Biométricos (huella dactilar/reloj control y CCTV)</strong> y <strong>RUT</strong>. 
                Bajo la Ley 21.719, estos datos tienen un estándar de seguridad reforzado y no pueden tratarse bajo mero "interés comercial".
              </p>
            </div>
          </div>

          {/* Detailed activities table */}
          <div className="space-y-4">
            {actividadesSeleccionadas.map((act) => (
              <div key={act.id} className="bg-[#08122c] p-5 rounded-2xl border border-blue-900/50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <span className="text-blue-400 font-mono text-xs">[{act.categoria.toUpperCase()}]</span>
                      {act.nombre}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{act.finalidad}</p>
                  </div>
                  <div className="inline-block bg-blue-950 text-emerald-300 border border-emerald-800/60 px-3 py-1 rounded-xl text-xs font-mono font-semibold self-start lg:self-auto">
                    ⚖️ {act.baseLicitud}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-3 border-t border-blue-900/30">
                  <div>
                    <span className="text-slate-500 font-medium block">Datos tratados:</span>
                    <span className="text-slate-300">{act.datosTratados.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium block">Fundamento y Ley:</span>
                    <span className="text-blue-200">{act.justificacionLegal}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium block">Plazo de Conservación:</span>
                    <span className="text-amber-200">{act.plazoConservacion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-blue-900/30">
            <button
              onClick={() => setPaso(2)}
              className="text-xs sm:text-sm text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Ajustar Actividades
            </button>
            <button
              onClick={() => setPaso(4)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <span>Generar Ficha Oficial RAT (Art. 14 ter)</span>
              <span className="material-symbols-outlined text-sm">verified</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Ficha Oficial RAT Generada & Exportación */}
      {paso === 4 && (
        <div className="space-y-6">
          
          {/* Top Actions Bar */}
          <div className="bg-[#0b1633] p-6 rounded-3xl border border-blue-900/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-3 py-0.5 rounded-full text-xs font-mono mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                TRAMO 1 OBLIGATORIO COMPLETADO
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Ficha Oficial del Registro de Actividades de Tratamiento (RAT)
              </h2>
              <p className="text-xs text-slate-300">
                Conforme a los estándares del Artículo 14 ter de la Ley 21.719 ante la Agencia de Protección de Datos Personales (APDP).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={exportarJSON}
                className="inline-flex items-center gap-2 bg-[#091533] hover:bg-[#102352] text-blue-200 border border-blue-700/80 px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105"
              >
                <span className="material-symbols-outlined text-base text-blue-400">data_object</span>
                <span>Exportar JSON (APDP)</span>
              </button>

              <button
                onClick={imprimirPDF}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span className="material-symbols-outlined text-base">print</span>
                <span>Imprimir / Guardar en PDF</span>
              </button>

              <button
                onClick={() => setPaso(1)}
                className="text-xs text-slate-400 hover:text-white px-3 py-2"
              >
                Modificar Datos
              </button>
            </div>
          </div>

          {/* Official Printable RAT Document (Chilean Format) */}
          <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-300 print:shadow-none print:border-none print:p-0">
            
            {/* Header Document */}
            <div className="border-b-2 border-blue-900 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-widest text-blue-900 uppercase">
                    REPÚBLICA DE CHILE • LEY Nº 21.719
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded border border-slate-300">
                    ART. 14 TER
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
                  REGISTRO DE ACTIVIDADES DE TRATAMIENTO (RAT)
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Documento exigible por la Agencia de Protección de Datos Personales (APDP)
                </p>
              </div>

              <div className="text-left sm:text-right border-l-2 sm:border-l-0 sm:border-r-0 border-blue-600 pl-3 sm:pl-0">
                <span className="text-[11px] font-mono font-bold text-blue-900 block">
                  CÓDIGO DE REGISTRO:
                </span>
                <span className="text-base font-mono font-extrabold text-slate-900 bg-slate-100 px-2 py-1 rounded inline-block">
                  {datosEmpresa.codigoCertificadoRAT}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Fecha Emisión: {datosEmpresa.fechaCreacion}
                </span>
              </div>
            </div>

            {/* Entity Identification Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Razón Social:</span>
                <strong className="text-slate-900 text-sm">{datosEmpresa.razonSocial}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">RUT Empresa:</span>
                <strong className="text-slate-900 font-mono text-sm">{datosEmpresa.rutEmpresa}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Representante Legal:</span>
                <span className="text-slate-800">{datosEmpresa.representanteLegal}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Clasificación:</span>
                <span className="text-blue-900 font-semibold">{datosEmpresa.clasificacionTamano} (Ley 20.416)</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Responsable DPO:</span>
                <span className="text-slate-800">{datosEmpresa.responsableTratamientoDPO}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Canal ARCO+ (Email):</span>
                <strong className="text-blue-700">{datosEmpresa.emailContacto}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Ubicación:</span>
                <span className="text-slate-800">{datosEmpresa.ciudadRegion}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Total Tratamientos:</span>
                <strong className="text-emerald-700">{actividadesSeleccionadas.length} actividades declaradas</strong>
              </div>
            </div>

            {/* Activities Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-blue-950 text-white">
                    <th className="p-3 font-semibold rounded-tl-xl">Actividad & Finalidad</th>
                    <th className="p-3 font-semibold">Titulares & Categorías de Datos</th>
                    <th className="p-3 font-semibold">Base de Licitud (Art. 12/13)</th>
                    <th className="p-3 font-semibold">Conservación & Destino</th>
                    <th className="p-3 font-semibold rounded-tr-xl">Medidas de Seguridad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {actividadesSeleccionadas.map((a, idx) => (
                    <tr key={a.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                      <td className="p-3 align-top max-w-[220px]">
                        <strong className="text-slate-900 block font-bold text-xs mb-1">
                          {idx + 1}. {a.nombre}
                        </strong>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {a.finalidad}
                        </p>
                        {a.contieneSensibles && (
                          <span className="inline-block mt-1 bg-red-100 text-red-800 border border-red-200 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            DATOS SENSIBLES
                          </span>
                        )}
                      </td>

                      <td className="p-3 align-top max-w-[200px]">
                        <div className="mb-1 text-slate-700">
                          <strong className="text-slate-900">Titulares:</strong> {a.titulares.join(', ')}
                        </div>
                        <div className="text-[11px] text-slate-600">
                          <strong className="text-slate-900">Datos:</strong> {a.datosTratados.join(', ')}
                        </div>
                      </td>

                      <td className="p-3 align-top max-w-[200px]">
                        <span className="font-semibold text-blue-900 block mb-0.5">
                          {a.baseLicitud}
                        </span>
                        <p className="text-[10px] text-slate-500 italic">
                          {a.justificacionLegal}
                        </p>
                      </td>

                      <td className="p-3 align-top text-[11px] text-slate-600 max-w-[180px]">
                        <div className="mb-1">
                          <strong className="text-slate-900">Plazo:</strong> {a.plazoConservacion}
                        </div>
                        <div>
                          <strong className="text-slate-900">Destinatarios:</strong> {a.destinatarios}
                        </div>
                      </td>

                      <td className="p-3 align-top text-[11px] text-slate-600 max-w-[180px]">
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

            {/* Legal Certification Footer */}
            <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  DECLARACIÓN JURADA DE CUMPLIMIENTO (ART. 14 TER)
                </h4>
                <p className="leading-relaxed text-[11px]">
                  El presente documento da cuenta fidedigna de los tratamientos de datos personales 
                  llevados a cabo por la entidad individualizada, en cumplimiento del deber de responsabilidad proactiva 
                  (Accountability) de la Ley Nº 21.719 de Chile. Cualquier modificación debe ser actualizada inmediatamente en este registro.
                </p>
              </div>

              <div className="flex flex-col justify-end items-start md:items-end">
                <div className="w-64 border-t border-slate-400 pt-2 text-center">
                  <p className="font-bold text-slate-900">{datosEmpresa.representanteLegal}</p>
                  <p className="text-[10px] text-slate-500">Representante Legal / Responsable del Tratamiento</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">RUT: {datosEmpresa.rutEmpresa}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Next steps guide */}
          <div className="bg-[#0b1633] p-6 rounded-3xl border border-blue-900/60 shadow-xl text-xs sm:text-sm text-slate-300">
            <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400">check_circle</span>
              ¿Qué hacer ahora con tu RAT?
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <li className="bg-[#08122c] p-4 rounded-xl border border-blue-900/40">
                <strong className="text-white block mb-1">1. Almacenar copia digital</strong>
                Guarda el archivo JSON y PDF en tu repositorio corporativo seguro o Google Drive/SharePoint de la empresa.
              </li>
              <li className="bg-[#08122c] p-4 rounded-xl border border-blue-900/40">
                <strong className="text-white block mb-1">2. Capacitar al equipo</strong>
                Informa a los encargados de RRHH, finanzas y ventas sobre las medidas de seguridad y los plazos de conservación estipulados.
              </li>
              <li className="bg-[#08122c] p-4 rounded-xl border border-blue-900/40">
                <strong className="text-white block mb-1">3. Presentar ante la APDP</strong>
                En caso de fiscalización o requerimiento por parte de la Agencia, entrega este certificado como acreditación del Tramo 1.
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* Modal for adding custom activity */}
      {mostrarModalNueva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1633] border border-blue-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 mb-4">
              <h3 className="font-bold text-white text-lg">
                Nueva Actividad de Tratamiento
              </h3>
              <button 
                onClick={() => setMostrarModalNueva(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">Nombre de la Actividad *</label>
                <input
                  type="text"
                  value={nuevaActividadNombre}
                  onChange={(e) => setNuevaActividadNombre(e.target.value)}
                  placeholder="Ej. Registro de postulantes a empleos, Encuestas de satisfacción"
                  className="w-full bg-[#08122c] border border-blue-900 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Finalidad específica</label>
                <textarea
                  value={nuevaActividadFinalidad}
                  onChange={(e) => setNuevaActividadFinalidad(e.target.value)}
                  placeholder="Describe para qué necesita tu empresa estos datos..."
                  rows={3}
                  className="w-full bg-[#08122c] border border-blue-900 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5">
              <button
                onClick={() => setMostrarModalNueva(false)}
                className="px-4 py-2 text-xs text-slate-300 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={agregarActividadPersonalizada}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Guardar en RAT
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RatAgentWizard;
