import React, { useState } from 'react';

const ARTICULOS_LEY = [
  {
    numero: 'Artículo 14 ter',
    titulo: 'El Registro de Actividades de Tratamiento (RAT) - Tramo 1 Obligatorio',
    resumen: 'Obligación formal de inventariar todas las operaciones de tratamiento de datos personales y sensibles.',
    contenido: `Todo responsable del tratamiento deberá llevar y mantener permanentemente actualizado un Registro de Actividades de Tratamiento (RAT). 

El RAT debe contener obligatoriamente:
1. Nombre y datos de contacto del responsable y, en su caso, del Delegado de Protección de Datos (DPO).
2. Las finalidades específicas del tratamiento para cada proceso de negocio.
3. Descripción de las categorías de titulares y de las categorías de datos tratados (especificando si trata datos sensibles como salud, biometría o RUT).
4. La base de licitud aplicable a cada actividad (Art. 12 o 13).
5. Los destinatarios o categorías de destinatarios a quienes se comuniquen o transfieran datos (ej. Previred, SII, pasarelas de pago, nubes).
6. Los plazos previstos para la supresión de las diferentes categorías de datos.
7. Una descripción general de las medidas de seguridad técnicas y organizativas adoptadas.

Este registro deberá ponerse a disposición de la Agencia de Protección de Datos Personales (APDP) a su solo requerimiento.`,
    obligatorio: true,
    tag: 'Tramo 1 Obligatorio',
  },
  {
    numero: 'Artículo 12 y 13',
    titulo: 'Bases de Licitud del Tratamiento de Datos',
    resumen: 'Condiciones jurídicas que habilitan a una empresa a tratar datos personales legítimamente en Chile.',
    contenido: `El tratamiento de datos personales es lícito únicamente cuando concurre alguna de las siguientes bases legales:

• Art. 12 - Consentimiento del Titular: Manifestación de voluntad libre, específica, informada e inequívoca, otorgada mediante declaración o acción afirmativa clara.
• Art. 13 letra a) - Ejecución de Contrato: Cuando sea necesario para la celebración o cumplimiento de un contrato o relación laboral en el que el titular es parte (ej. planillas de sueldos, contratos con clientes).
• Art. 13 letra b) - Obligación Legal: Cuando el tratamiento sea exigido expresamente por una ley (ej. retención de impuestos SII, normativas de la Dirección del Trabajo).
• Art. 13 letra e) - Interés Legítimo: Tratamiento necesario para la satisfacción de intereses legítimos perseguidos por el responsable, siempre que sobre ellos no prevalezcan los derechos y libertades del titular (ej. videovigilancia de seguridad).`,
    obligatorio: true,
    tag: 'Bases de Licitud',
  },
  {
    numero: 'Artículos 5 al 11',
    titulo: 'Catálogo de Derechos ARCO+ y Plazos de Cumplimiento',
    resumen: 'Facultades directas e irrenunciables de los titulares de datos frente a las empresas.',
    contenido: `Los titulares tienen derecho a:
1. Acceso: Conocer si la empresa trata sus datos, finalidades y plazos.
2. Rectificación: Exigir la corrección de datos inexactos o incompletos.
3. Supresión (Borrado): Exigir la eliminación cuando no exista justificación jurídica.
4. Oposición: Negarse al tratamiento con fines publicitarios o de prospección comercial.
5. Portabilidad: Solicitar una copia digital estructurada en formato legible y abierto (JSON/CSV).
6. Bloqueo Temporal: Impedir la utilización de sus datos mientras se sustancia un reclamo.

Plazos legales perentorios:
• Bloqueo Temporal: Máximo 2 días hábiles (Art. 10 bis).
• Resto de derechos ARCO+: Máximo 30 días corridos (Art. 11).`,
    obligatorio: true,
    tag: 'Derechos ARCO+',
  },
  {
    numero: 'Artículos 40 al 52',
    titulo: 'Régimen Sancionatorio & Facultades de la APDP',
    resumen: 'Multas de hasta 20.000 UTM, amonestaciones y procedimientos de fiscalización.',
    contenido: `La Agencia de Protección de Datos Personales (APDP) es la entidad pública fiscalizadora con autonomía funcional y atribuciones para inspeccionar, ordenar medidas cautelares y aplicar multas:

• Infracciones Leves: Hasta 5.000 UTM (~$330M CLP).
• Infracciones Graves: Hasta 10.000 UTM (~$660M CLP).
• Infracciones Gravísimas: Hasta 20.000 UTM (~$1.320M CLP) o entre el 2% y 4% de los ingresos anuales de la empresa reincidente.

Beneficio Pyme (Ley 20.416): Las Micro y Pequeñas empresas sin reincidencia previa pueden optar a amonestación escrita en la primera infracción, bajo la obligación imperativa de regularizar inmediatamente mediante la presentación de su RAT (Art. 14 ter).`,
    obligatorio: true,
    tag: 'Sanciones & APDP',
  },
  {
    numero: 'Artículo 4',
    titulo: 'Principios Rectores del Tratamiento de Datos',
    resumen: 'Licitud, finalidad, proporcionalidad, seguridad, calidad y responsabilidad proactiva (Accountability).',
    contenido: `Toda empresa que opere en Chile debe someterse a los principios fundamentales de:
1. Licitud y lealtad: Tratar datos sólo cuando exista una base legal válida.
2. Finalidad: Recopilar datos para fines explícitos, legítimos y comunicados.
3. Proporcionalidad y minimización: Tratar únicamente los datos estrictamente necesarios.
4. Calidad y exactitud: Mantener datos veraces, completos y actualizados.
5. Seguridad: Aplicar medidas técnicas (cifrado, control de acceso) para evitar fugas.
6. Responsabilidad proactiva (Accountability): La empresa no sólo debe cumplir, sino demostrar y documentar que cumple (a través de su RAT y políticas).`,
    obligatorio: false,
    tag: 'Principios',
  },
];

interface LegalArticlesGuideProps {
  onGoToRat: () => void;
}

const LegalArticlesGuide: React.FC<LegalArticlesGuideProps> = ({ onGoToRat }) => {
  const [busqueda, setBusqueda] = useState('');
  const [articuloAbierto, setArticuloAbierto] = useState<string>('Artículo 14 ter');

  const articulosFiltrados = ARTICULOS_LEY.filter(
    (a) =>
      a.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.resumen.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.contenido.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs">
              <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                COMPENDIO NORMATIVO CHILE
              </span>
              <span className="text-slate-500 font-mono">
                Ley Nº 21.719 en el Diario Oficial
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Guía Legal Articulada de Protección de Datos
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Acceso directo a las exigencias normativas esenciales para preparar a tu empresa ante la APDP.
            </p>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por artículo, término..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-900"
            />
          </div>
        </div>

        {/* Articles Accordion List */}
        <div className="space-y-3">
          {articulosFiltrados.map((art) => {
            const isOpen = articuloAbierto === art.numero;

            return (
              <div
                key={art.numero}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setArticuloAbierto(isOpen ? '' : art.numero)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.2 rounded border border-blue-200">
                        {art.numero}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                        {art.tag}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {art.titulo}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {art.resumen}
                    </p>
                  </div>

                  <span className="material-symbols-outlined text-slate-400 text-sm">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/30">
                    {art.contenido}

                    {art.numero === 'Artículo 14 ter' && (
                      <div className="mt-4 p-3.5 rounded-lg bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <strong className="text-xs text-blue-950 block">
                            Genera tu RAT conforme al Art. 14 ter
                          </strong>
                          <span className="text-[11px] text-blue-800">
                            El Agente de IA entrevista a tu empresa en 3 minutos y descarga la ficha en JSON/PDF.
                          </span>
                        </div>
                        <button
                          onClick={onGoToRat}
                          className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg text-xs shrink-0"
                        >
                          Crear mi RAT ahora →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default LegalArticlesGuide;
