import React, { useState } from 'react';

const ARTICULOS_LEY = [
  {
    numero: 'Artículo 14 ter',
    titulo: 'El Registro de Actividades de Tratamiento (RAT) - Tramo 1',
    resumen: 'Obligación formal de documentar e inventariar todas las operaciones de tratamiento de datos personales y sensibles que realiza la empresa.',
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
    titulo: 'Bases de Licitud del Tratamiento',
    resumen: 'Condiciones jurídicas que habilitan a una empresa a tratar datos personales legítimamente en Chile.',
    contenido: `El tratamiento de datos personales es lícito únicamente cuando concurre alguna de las siguientes bases legales:

• Art. 12 - Consentimiento del Titular: Manifestación de voluntad libre, específica, informada e inequívoca, otorgada mediante declaración o acción afirmativa clara.
• Art. 13 letra a) - Ejecución de Contrato: Cuando sea necesario para la celebración o cumplimiento de un contrato o relación laboral en el que el titular es parte (ej. planillas de sueldos, contratos con clientes).
• Art. 13 letra b) - Obligación Legal: Cuando el tratamiento sea exigido expresamente por una ley (ej. retención de impuestos SII, normativas de la Dirección del Trabajo).
• Art. 13 letra e) - Interés Legítimo: Tratamiento necesario para la satisfacción de intereses legítimos perseguidos por el responsable, siempre que sobre ellos no prevalezcan los derechos y libertades del titular (ej. videovigilancia de seguridad).`,
    obligatorio: true,
    tag: 'Legalidad',
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
    tag: 'Derechos Titulares',
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
    tag: 'Fiscalización & Multas',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-blue-950/80 border border-blue-700/60 px-3 py-1 rounded-full text-xs text-blue-300 font-mono mb-3">
          <span className="material-symbols-outlined text-sm text-blue-400">menu_book</span>
          <span>COMPENDIO NORMATIVO CHILENO</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Guía Legal de la Nueva Ley 21.719
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Análisis práctico y articulado oficial de la ley que moderniza la protección de datos en Chile 
          y crea la Agencia de Protección de Datos Personales (APDP).
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por artículo, tema (ej. RAT, multas, bloqueo, consentimiento)..."
            className="w-full bg-[#0b1633] border border-blue-900 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 shadow-lg"
          />
        </div>
      </div>

      {/* Articles Accordion */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {articulosFiltrados.map((art) => {
          const isOpen = articuloAbierto === art.numero;

          return (
            <div
              key={art.numero}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-[#0b1633] border-blue-500/80 shadow-xl'
                  : 'bg-[#08122c] border-blue-900/40 hover:border-blue-800'
              }`}
            >
              <button
                onClick={() => setArticuloAbierto(isOpen ? '' : art.numero)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {art.numero}
                    </span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded font-mono">
                      {art.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {art.titulo}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {art.resumen}
                  </p>
                </div>

                <div className="shrink-0 w-8 h-8 rounded-full bg-[#08122c] border border-blue-900/80 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-sm transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                    expand_more
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-2 border-t border-blue-900/40 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {art.contenido}

                  {art.numero === 'Artículo 14 ter' && (
                    <div className="mt-5 p-4 rounded-xl bg-blue-950/80 border border-blue-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <strong className="text-white block text-xs">
                          Cumple con el Art. 14 ter en 3 minutos
                        </strong>
                        <span className="text-[11px] text-blue-200">
                          Nuestro Agente de IA genera el documento oficial requerido.
                        </span>
                      </div>
                      <button
                        onClick={onGoToRat}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all shrink-0"
                      >
                        Crear mi RAT ahora
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
  );
};

export default LegalArticlesGuide;
