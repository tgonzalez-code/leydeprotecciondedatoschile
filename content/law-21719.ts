import { ArticuloLeyCompendio, TimelineHito } from '../types';

export const HITOS_LEY_21719: TimelineHito[] = [
  {
    fase: 'Hito 1',
    fecha: 'Diciembre 2024',
    titulo: 'Promulgación y Publicación en Diario Oficial',
    descripcion: 'Aprobación unánime del Congreso Nacional de Chile y publicación oficial que reforma la Ley 19.628 e introduce la Ley 21.719.',
    estado: 'Completado',
    articulosClave: ['Ley 21.719', 'Disposiciones Transitorias'],
    impactoEmpresa: 'Inicio del cómputo de plazos de vacancia legal y adecuación interna.',
  },
  {
    fase: 'Hito 2',
    fecha: '2025 - 2026',
    titulo: 'Instalación de la Agencia de Protección de Datos (APDP)',
    descripcion: 'Nombramiento por el Presidente y ratificación del Senado de los directores de la APDP. Dictación de estatuto orgánico y planta funcionaria.',
    estado: 'En curso',
    articulosClave: ['Título V', 'Art. 35 a 39'],
    impactoEmpresa: 'Definición de directrices, circulares interpretativas y formatos oficiales de fiscalización.',
  },
  {
    fase: 'Hito 3',
    fecha: 'Primer Semestre 2026',
    titulo: 'Dictación de Reglamentos Oficiales y Guías Técnicas',
    descripcion: 'El Ministerio de Economía y Justicia aprueban los reglamentos sobre transferencias internacionales, medidas mínimas de seguridad y modelos de prevención.',
    estado: 'Próximo hito',
    articulosClave: ['Art. 14 ter', 'Art. 25 a 30'],
    impactoEmpresa: 'Obligatoriedad de implementar el Registro de Actividades de Tratamiento (RAT) y canales ARCOP.',
  },
  {
    fase: 'Hito 4',
    fecha: '2026 (Mes 24 post-publicación)',
    titulo: 'Entrada en Plena Vigencia de Derechos ARCOP y Sanciones',
    descripcion: 'Exigibilidad total de la ley para el 100% de empresas y personas jurídicas. Inicio de la potestad sancionatoria con multas de hasta 20.000 UTM.',
    estado: 'Plena vigencia',
    articulosClave: ['Art. 40 al 52', 'Ley 20.416'],
    impactoEmpresa: 'Fiscalizaciones activas. Aplicación del Beneficio Pyme (amonestación) condicionado al RAT.',
  },
];

export const ARTICULOS_LEY_COMPENDIO: ArticuloLeyCompendio[] = [
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
• Infracciones Gravísimas: Hasta 20.000 UTM (~$1.320M CLP) o entre el 2% y 4% de los ingresos anuales por ventas.
• Beneficio Pyme (Ley 20.416): Permite conmutar la multa por amonestación escrita en la primera infracción, siempre que se regularice inmediatamente mediante la adopción del RAT.`,
    obligatorio: true,
    tag: 'Sanciones & Fiscalización',
  },
];
