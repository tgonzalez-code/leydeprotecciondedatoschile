import React, { useState } from 'react';
import { TipoSolicitudARCO } from '../types';

interface ArcoManagerProps {
  onGoToRat: () => void;
}

interface DerechoDetalle {
  tipo: TipoSolicitudARCO;
  articulo: string;
  sla: string;
  esCritico?: boolean;
  resumen: string;
  descripcionCompleta: string;
  requisitosTitular: string;
  obligacionEmpresa: string;
  modeloRespuesta: {
    asunto: string;
    cuerpo: string;
  };
}

const CATALOGO_DERECHOS: DerechoDetalle[] = [
  {
    tipo: 'Bloqueo Temporal',
    articulo: 'Art. 10 bis',
    sla: '2 días hábiles',
    esCritico: true,
    resumen: 'Congela de inmediato cualquier uso o comunicación del dato mientras se resuelve una controversia.',
    descripcionCompleta: 'El titular puede exigir la suspensión temporal de las operaciones de tratamiento cuando se cuestione la exactitud de los datos o la licitud del tratamiento. Es el SLA más estricto de toda la Ley 21.719.',
    requisitosTitular: 'Individualización del titular, indicación de los datos cuestionados y fundamento de la controversia.',
    obligacionEmpresa: 'Suspender todo tratamiento técnico y comercial en un plazo improrrogable de 2 días hábiles e informar al titular de la medida cautelar adoptada.',
    modeloRespuesta: {
      asunto: 'Respuesta Formal: Bloqueo Temporal de Datos - Ley Nº 21.719',
      cuerpo: `Estimado(a) Titular:

Acusamos recibo de su solicitud de Bloqueo Temporal ingresada con fecha [FECHA_INGRESO], conforme a las facultades consagradas en el Artículo 10 bis de la Ley Nº 19.628 (modificada por la Ley Nº 21.719).

Le informamos que dentro del plazo legal perentorio de 2 días hábiles se ha procedido al BLOQUEO TEMPORAL de sus datos personales en la totalidad de nuestros sistemas operativos, bases de datos comerciales y plataformas en la nube. Durante la vigencia del bloqueo, sus datos se mantendrán aislados técnicamente y no serán objeto de tratamiento, cesión ni comunicación a terceros.

Se procederá al análisis de fondo del requerimiento, notificándole la resolución definitiva dentro del plazo correspondiente.

Atentamente,
Oficina de Privacidad y Cumplimiento Normativo
[NOMBRE_EMPRESA]`
    }
  },
  {
    tipo: 'Acceso',
    articulo: 'Art. 5',
    sla: '30 días corridos',
    resumen: 'Conocer qué datos personales de la persona mantiene la empresa, con qué fin y a quién se transmiten.',
    descripcionCompleta: 'El titular tiene derecho a solicitar y obtener información clara sobre si sus datos están siendo tratados, el origen de los mismos, los fines del tratamiento, el plazo de conservación y los destinatarios o encargados a quienes se hayan transferido.',
    requisitosTitular: 'Acreditar identidad mediante documento idóneo (cédula de identidad chilena o poder formal).',
    obligacionEmpresa: 'Emitir un informe estructurado y legible con la información registrada en el Registro de Actividades de Tratamiento (RAT).',
    modeloRespuesta: {
      asunto: 'Respuesta a Solicitud de Acceso a Datos Personales - Ley Nº 21.719',
      cuerpo: `Estimado(a) Titular:

En respuesta a su solicitud de Acceso formulada con fecha [FECHA_INGRESO], y dentro del plazo de 30 días corridos establecido en el Artículo 5 y 11 de la Ley 21.719, cumplimos con certificar lo siguiente:

1. Categorías de datos tratados: [Nombres, RUT, Correo Electrónico, Historial de Compras].
2. Finalidad del tratamiento: [Gestión comercial y facturación tributaria conforme a contrato].
3. Base de licitud: Art. 13 letra a) (Ejecución contractual).
4. Plazo de conservación previsto: Vigencia de la relación contractual más 5 años para efectos de prescripción tributaria.
5. Destinatarios de datos: No se transfieren a terceros ajenos a encargados de procesamiento de pagos regulados.

Usted tiene la facultad de ejercer sus derechos de rectificación o supresión si estima que la información es inexacta o excesiva.

Atentamente,
Responsable del Tratamiento
[NOMBRE_EMPRESA]`
    }
  },
  {
    tipo: 'Rectificación',
    articulo: 'Art. 6',
    sla: '30 días corridos',
    resumen: 'Corregir o actualizar información personal que sea inexacta, incompleta o desactualizada.',
    descripcionCompleta: 'Obliga a la empresa a modificar o complementar los datos erróneos en todas sus bases activas y comunicar la rectificación a los encargados y terceros que hayan recibido previamente dicha información.',
    requisitosTitular: 'Identificar con precisión el dato erróneo y acompañar los antecedentes que respalden la corrección solicitada.',
    obligacionEmpresa: 'Actualizar las bases en un plazo de 30 días corridos y notificar fehacientemente al titular una vez corregido el registro.',
    modeloRespuesta: {
      asunto: 'Certificado de Rectificación de Datos Personales - Ley Nº 21.719',
      cuerpo: `Estimado(a) Titular:

Cumplimos con informarle que, en conformidad con el Artículo 6 de la Ley 21.719, su solicitud de Rectificación ha sido procesada exitosamente en nuestros sistemas.

Los datos individualizados en su solicitud han sido debidamente actualizados a: [DATO_ACTUALIZADO]. Asimismo, se ha instruido a nuestros proveedores y encargados de tratamiento sobre dicha modificación para garantizar la coherencia de los registros.

Atentamente,
Área de Cumplimiento de Datos
[NOMBRE_EMPRESA]`
    }
  },
  {
    tipo: 'Supresión',
    articulo: 'Art. 7',
    sla: '30 días corridos',
    resumen: 'Eliminar o borrar datos cuando hayan dejado de ser necesarios o no cuenten con base legal.',
    descripcionCompleta: 'También denominado "derecho al olvido", procede cuando el tratamiento carezca de base de licitud, el titular haya revocado su consentimiento, o los datos hayan cumplido el plazo de retención previsto en el RAT.',
    requisitosTitular: 'Especificar las razones por las cuales estima que los datos deben ser borrados o acreditar la revocación de consentimiento.',
    obligacionEmpresa: 'Eliminar de forma irreversible el dato, salvo que exista una obligación legal de conservación (ej. Código Tributario o Código del Trabajo).',
    modeloRespuesta: {
      asunto: 'Notificación de Supresión / Cancelación de Datos - Ley Nº 21.719',
      cuerpo: `Estimado(a) Titular:

En relación a su solicitud de Supresión de datos personales formulada con fecha [FECHA_INGRESO], le informamos que se ha procedido a la eliminación técnica de su cuenta y registros personales en nuestras bases de datos comerciales.

[En caso de retención legal]: Dejamos constancia de que los comprobantes tributarios (facturas/boletas electrónicas) se conservarán bajo archivo pasivo restringido durante el plazo de 5 años por mandato expreso del Artículo 17 del Código Tributario, tras el cual se procederá a su destrucción definitiva.

Atentamente,
Oficina de Protección de Datos
[NOMBRE_EMPRESA]`
    }
  },
  {
    tipo: 'Oposición',
    articulo: 'Art. 8',
    sla: '30 días corridos',
    resumen: 'Exigir el cese del tratamiento con fines de marketing, publicidad o analítica de perfiles.',
    descripcionCompleta: 'El titular puede oponerse en cualquier momento al uso de sus datos personales para fines de prospección comercial, publicidad directa, telemarketing o tratamientos sustentados en el interés legítimo.',
    requisitosTitular: 'Expresar su voluntad de no recibir más comunicaciones publicitarias o de oponerse al tratamiento específico.',
    obligacionEmpresa: 'Cesar de manera inmediata y definitiva el envío de comunicaciones y dar de baja al titular de listas de difusión.',
    modeloRespuesta: {
      asunto: 'Confirmación de Oposición al Tratamiento Comercial - Ley Nº 21.719',
      cuerpo: `Estimado(a) Titular:

Confirmamos que su solicitud de Oposición al tratamiento con fines publicitarios y de prospección comercial ha sido acogida íntegramente.

Su dirección de correo electrónico y teléfono han sido incorporados a nuestra lista interna de exclusión permanente (Opt-out), asegurando que no recibirá nuevas ofertas, promociones ni llamadas comerciales de nuestra empresa.

Atentamente,
Departamento de Comunicaciones y Privacidad
[NOMBRE_EMPRESA]`
    }
  },
  {
    tipo: 'Portabilidad',
    articulo: 'Art. 9',
    sla: '30 días corridos',
    resumen: 'Recibir una copia digital estructurada de los datos para transferirlos a otro proveedor.',
    descripcionCompleta: 'Faculta al titular a obtener una copia de sus datos personales en un formato estructurado, genérico y legible por máquina (ej. JSON, XML o CSV) o solicitar su traspaso directo a otro proveedor cuando sea técnicamente factible.',
    requisitosTitular: 'Indicar el formato digital preferido o las especificaciones del prestador de destino.',
    obligacionEmpresa: 'Poner a disposición del titular el archivo electrónico interoperable sin costo adicional en un plazo de 30 días corridos.',
    modeloRespuesta: {
      asunto: 'Entrega de Archivo de Portabilidad de Datos - Ley Nº 21.719',
      cuerpo: `Estimado(a) Titular:

En cumplimiento del Artículo 9 de la Ley 21.719 sobre Portabilidad de Datos Personales, ponemos a su disposición el enlace seguro para la descarga del archivo estructurado en formato JSON con su historial y antecedentes personales.

El enlace cuenta con cifrado y expirará en un plazo de 7 días corridos por motivos de seguridad informática.

Atentamente,
Sistemas y Cumplimiento Normativo
[NOMBRE_EMPRESA]`
    }
  },
];

const ArcoManager: React.FC<ArcoManagerProps> = ({ onGoToRat }) => {
  const [derechoSeleccionado, setDerechoSeleccionado] = useState<DerechoDetalle>(CATALOGO_DERECHOS[0]);
  const [modalPlantilla, setModalPlantilla] = useState<DerechoDetalle | null>(null);
  const [copiado, setCopiado] = useState(false);

  const handleCopiarPlantilla = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div id="derechos-arco" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">timer</span>
              <span>DERECHOS ARCOP • ARTÍCULOS 5 AL 11 LEY 21.719</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Catálogo de Derechos ARCOP & Plazos de Cumplimiento
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              La Ley 21.719 consagra facultades irrenunciables para los titulares de datos con plazos perentorios: 
              <strong className="text-orange-600 font-bold"> 2 días hábiles</strong> para Bloqueo Temporal y 
              <strong className="text-zinc-950 font-bold"> 30 días corridos</strong> para el resto de derechos.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setModalPlantilla(derechoSeleccionado)}
              className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
            >
              <span className="material-symbols-outlined text-orange-400 text-sm" aria-hidden="true">description</span>
              <span>Ver Modelo de Respuesta</span>
            </button>
            <button
              onClick={onGoToRat}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all"
            >
              <span>Inventario RAT (Art. 14 ter)</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* High-Alert SLA Warning Banner */}
        <div className="mb-10 p-6 rounded-3xl bg-orange-50 border-2 border-orange-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">warning</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <strong className="text-base font-display font-black text-orange-950">
                  ¡Atención Pymes! El Bloqueo Temporal tiene un SLA de 48 Horas Hábiles
                </strong>
                <span className="text-[10px] font-mono font-bold bg-orange-600 text-white px-2 py-0.5 rounded">
                  Art. 10 bis
                </span>
              </div>
              <p className="text-xs text-orange-900 mt-1 max-w-3xl leading-relaxed">
                Si un cliente, colaborador o proveedor reclama por el uso de sus datos, tu empresa debe suspender su tratamiento en un plazo 
                máximo de <strong>2 días hábiles</strong>. No contestar a tiempo tipifica como infracción grave ante la APDP, arriesgando multas de hasta <strong>10.000 UTM</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={onGoToRat}
            className="shrink-0 bg-white hover:bg-orange-100 text-orange-950 border border-orange-300 font-mono font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Preparar RAT para responder en plazo →
          </button>
        </div>

        {/* 6 Rights Selector Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {CATALOGO_DERECHOS.map((d) => {
            const isSelected = derechoSeleccionado.tipo === d.tipo;
            return (
              <div
                key={d.tipo}
                onClick={() => setDerechoSeleccionado(d)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-600 shadow-lg scale-102'
                    : 'bg-zinc-50 border-zinc-200 hover:border-zinc-400 text-zinc-950'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setDerechoSeleccionado(d)}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white text-orange-950 font-black'
                        : d.esCritico
                        ? 'bg-orange-100 text-orange-950 border border-orange-300 font-black'
                        : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {d.sla}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-orange-200' : 'text-zinc-400'}`}>
                      {d.articulo}
                    </span>
                  </div>
                  <strong className="text-sm font-display font-black block">
                    {d.tipo}
                  </strong>
                  <p className={`text-[11px] mt-1 leading-snug line-clamp-2 ${isSelected ? 'text-orange-100' : 'text-zinc-600'}`}>
                    {d.resumen}
                  </p>
                </div>

                <div className={`mt-3 pt-2 border-t text-[10px] font-mono flex items-center justify-between ${
                  isSelected ? 'border-orange-400/60 text-white font-bold' : 'border-zinc-200 text-zinc-500'
                }`}>
                  <span>{isSelected ? 'Seleccionado' : 'Ver detalle'}</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Inspector for Selected Right */}
        <div className="bg-white rounded-3xl border-2 border-zinc-950 p-6 sm:p-10 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                  derechoSeleccionado.esCritico
                    ? 'bg-orange-100 text-orange-950 border border-orange-300 font-black'
                    : 'bg-zinc-100 text-zinc-800 border border-zinc-300'
                }`}>
                  SLA Legal: {derechoSeleccionado.sla}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Normativa: {derechoSeleccionado.articulo}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-950">
                Derecho de {derechoSeleccionado.tipo}
              </h3>
            </div>

            <button
              onClick={() => setModalPlantilla(derechoSeleccionado)}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              <span>Abrir Plantilla de Respuesta Oficial</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <strong className="block text-zinc-900 font-bold uppercase font-mono text-xs">
                1. Alcance y Definición Legal:
              </strong>
              <p className="text-zinc-600 leading-relaxed font-normal">
                {derechoSeleccionado.descripcionCompleta}
              </p>
            </div>

            <div className="space-y-2">
              <strong className="block text-zinc-900 font-bold uppercase font-mono text-xs">
                2. Requisitos Exigibles al Titular:
              </strong>
              <p className="text-zinc-600 leading-relaxed font-normal">
                {derechoSeleccionado.requisitosTitular}
              </p>
            </div>

            <div className="space-y-2 bg-orange-50/60 p-4 rounded-2xl border border-orange-200">
              <strong className="block text-orange-950 font-bold uppercase font-mono text-xs">
                3. Obligación Operativa de la Empresa:
              </strong>
              <p className="text-zinc-800 leading-relaxed font-medium">
                {derechoSeleccionado.obligacionEmpresa}
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Protocol for Chilean Companies when receiving ARCOP */}
        <div className="bg-zinc-50 rounded-3xl border-2 border-zinc-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                ESTÁNDAR DE COMPLIANCE
              </span>
              <h3 className="text-lg sm:text-xl font-display font-black text-zinc-950 mt-0.5">
                Protocolo Obligatorio para Recepción de Solicitudes ARCOP
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500 bg-white px-3 py-1 rounded-lg border border-zinc-300 self-start sm:self-auto">
              Evita Multas ante la APDP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">Paso 01</span>
                <span className="text-zinc-400">Canal Único</span>
              </div>
              <strong className="text-sm font-display font-black text-zinc-950 block mb-1">
                Acuse y Cómputo de Plazos
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Establece un buzón exclusivo (ej. privacidad@empresa.cl) que emita confirmación con fecha y hora exacta de recepción.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">Paso 02</span>
                <span className="text-zinc-400">Seguridad</span>
              </div>
              <strong className="text-sm font-display font-black text-zinc-950 block mb-1">
                Verificación de Identidad
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Asegúrate de corroborar que quien solicita es el titular real o su representante formal antes de entregar datos sensibles.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">Paso 03</span>
                <span className="text-zinc-400">Inventario</span>
              </div>
              <strong className="text-sm font-display font-black text-zinc-950 block mb-1">
                Búsqueda en el RAT
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Consulta el Registro de Actividades de Tratamiento (Art. 14 ter) para ubicar en qué servidores, planillas o CRMs residen los datos.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">Paso 04</span>
                <span className="text-zinc-400">Resolución</span>
              </div>
              <strong className="text-sm font-display font-black text-zinc-950 block mb-1">
                Notificación Formal
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Emite respuesta fundada y conserva el respaldo digital para acreditar diligencia en caso de una auditoría de la APDP.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Plantilla Legal de Respuesta */}
        {modalPlantilla && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
            <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-orange-100 text-orange-950 px-2 py-0.5 rounded border border-orange-200">
                    SLA Legal: {modalPlantilla.sla}
                  </span>
                  <h3 className="font-display font-black text-zinc-950 text-base sm:text-lg mt-1">
                    Modelo de Respuesta Formal: Derecho de {modalPlantilla.tipo}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalPlantilla(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 flex items-center justify-center text-sm font-bold"
                  aria-label="Cerrar modelo de respuesta"
                >
                  ✕
                </button>
              </div>

              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-300 font-mono text-[11px] text-zinc-800 space-y-2.5 leading-relaxed max-h-[50vh] overflow-y-auto whitespace-pre-line">
                <div className="border-b border-zinc-200 pb-2 text-zinc-500">
                  <p><strong>Asunto:</strong> {modalPlantilla.modeloRespuesta.asunto}</p>
                </div>
                <div>{modalPlantilla.modeloRespuesta.cuerpo}</div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-2 border-t border-zinc-200">
                <span className="text-[11px] font-mono text-zinc-500">
                  {copiado ? '✓ Texto copiado al portapapeles' : 'Plantilla estandarizada para Pymes'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopiarPlantilla(modalPlantilla.modeloRespuesta.cuerpo)}
                    className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold px-4 py-2 rounded-xl text-xs transition-all"
                  >
                    <span className="material-symbols-outlined text-sm text-orange-400">content_copy</span>
                    <span>{copiado ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalPlantilla(null)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ArcoManager;
