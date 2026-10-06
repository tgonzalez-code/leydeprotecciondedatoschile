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
    <div id="guia-legal" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span>COMPENDIO NORMATIVO CHILENO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-950 tracking-tight">
              Artículos Clave Ley 21.719
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Acceso articulado a las exigencias jurídicas aplicables a toda empresa en Chile.
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por artículo, término..."
              className="w-full bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-950 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {articulosFiltrados.map((art) => {
            const isOpen = articuloAbierto === art.numero;

            return (
              <div
                key={art.numero}
                className="bg-zinc-50 rounded-2xl border-2 border-zinc-200 overflow-hidden transition-all hover:border-zinc-300"
              >
                <button
                  onClick={() => setArticuloAbierto(isOpen ? '' : art.numero)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded border border-orange-200">
                        {art.numero}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-zinc-600 bg-white px-2 py-0.5 rounded border border-zinc-300">
                        {art.tag}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-black text-zinc-950">
                      {art.titulo}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-1">
                      {art.resumen}
                    </p>
                  </div>

                  <span className="w-8 h-8 rounded-full bg-white border border-zinc-300 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-zinc-600 text-sm">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-200 text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line bg-white">
                    {art.contenido}

                    {art.numero === 'Artículo 14 ter' && (
                      <div className="mt-6 p-5 rounded-2xl bg-orange-50 border-2 border-orange-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <strong className="text-sm font-display font-black text-zinc-950 block">
                            Cumple el Art. 14 ter con nuestro Agente IA
                          </strong>
                          <span className="text-xs text-zinc-700 mt-0.5 block">
                            Entrevista en 3 minutos y descarga de la ficha oficial en JSON y PDF.
                          </span>
                        </div>
                        <button
                          onClick={onGoToRat}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/25 shrink-0"
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
