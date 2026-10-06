import { PageId } from '../types';

export interface PostLey {
  id: string;
  slug: string;
  categoria: string;
  tagBadge: string;
  titulo: string;
  bajada: string;
  fecha: string;
  lecturaMin: string;
  autor: string;
  resumenPuntos: string[];
  contenidoCompleto: string;
  articulosRelacionados: string[];
  enlaceAccionTexto: string;
  enlaceAccionDestino: PageId;
}

export const POSTS_ACTUALIDAD_LEY: PostLey[] = [
  {
    id: 'post-fiscalizacion-apdp',
    slug: 'como-fiscalizara-la-apdp-en-chile',
    categoria: 'Fiscalización & APDP',
    tagBadge: 'NUEVA AUTORIDAD',
    titulo: 'Cómo fiscalizará la Agencia de Protección de Datos Personales (APDP) en Chile',
    bajada: 'La nueva autoridad contará con potestades inéditas en Chile: allanamientos, auditorías de oficio, medidas cautelares y multas en UTM.',
    fecha: 'Octubre 2026',
    lecturaMin: '4 min',
    autor: 'Equipo Legal leydedatospersonaleschile.cl',
    resumenPuntos: [
      'Fin de la autotutela judicial: Las denuncias ya no requerirán comparecer ante juzgados civiles ordinarios.',
      'Potestad cautelar inmediata: La APDP podrá suspender el tratamiento de datos o bloquear bases en 48 horas.',
      'Sanciones de hasta 20.000 UTM (~$1.320M CLP) o hasta el 4% de las ventas anuales en reincidencia.',
    ],
    contenidoCompleto: `La creación de la Agencia de Protección de Datos Personales (APDP) marca un hito histórico en la institucionalidad chilena, equiparando nuestro marco regulatorio al Reglamento General de Protección de Datos (RGPD) de la Unión Europea.

Bajo la antigua Ley 19.628, los titulares de datos debían contratar abogados y acudir a largos juicios ordinarios civiles. Con la Ley 21.719, la APDP operará como un servicio público descentralizado con personalidad jurídica, patrimonio propio y plena autonomía funcional.

Principales facultades de la APDP:
1. Investigación y Allanamiento: Podrá inspeccionar instalaciones físicas y servidores en la nube sin previo aviso si constata riesgo grave.
2. Instrucciones Vinculantes: Dictará directrices técnicas obligatorias sobre cómo almacenar y cifrar bases de datos de clientes y colaboradores.
3. Potestad Sancionatoria Gradual: Clasificará las infracciones en Leves (hasta 5.000 UTM), Graves (hasta 10.000 UTM) y Gravísimas (hasta 20.000 UTM).

Para una Pyme, la primera línea de defensa frente a una fiscalización consiste en exhibir de inmediato su Registro de Actividades de Tratamiento (RAT - Art. 14 ter), sin el cual se presume la negligencia operativa de la empresa.`,
    articulosRelacionados: ['Art. 35 a 39', 'Art. 40 al 52', 'Art. 14 ter'],
    enlaceAccionTexto: 'Simular sanciones en la Calculadora UTM',
    enlaceAccionDestino: 'multas-utm',
  },
  {
    id: 'post-beneficio-pyme',
    slug: 'beneficio-pyme-ley-20416-amonestacion-y-rat',
    categoria: 'Pymes & Beneficios',
    tagBadge: 'ESTATUTO PYME',
    titulo: 'Beneficio Pyme (Ley 20.416): Amonestación escrita y el requisito ineludible del RAT',
    bajada: 'Las micro y pequeñas empresas pueden salvarse de multas en UTM en su primera infracción, siempre que cumplan una condición estricta.',
    fecha: 'Septiembre 2026',
    lecturaMin: '3 min',
    autor: 'Área Pymes & Emprendimiento',
    resumenPuntos: [
      'Amonestación en 1ra infracción: Sustituye las multas en dinero para empresas con ventas bajo 25.000 UF anuales.',
      'Condición de regularización: Exige presentar de inmediato el inventario del Art. 14 ter ante la APDP.',
      'Pérdida del beneficio: Empresas que no documenten su RAT pierden el beneficio y reciben multas directas.',
    ],
    contenidoCompleto: `El Estatuto de la Micro y Pequeña Empresa (Ley Nº 20.416) contempla una norma protectora fundamental: ante la primera infracción cometida por una Pyme en materias fiscalizadas por organismos estatales, la autoridad debe aplicar una "amonestación escrita" en lugar de cursar multas pecuniarias.

Sin embargo, el Artículo 48 de la Ley 21.719 establece expresamente que este beneficio no opera de forma automática ni incondicional.

Para acogerse a la amonestación escrita:
1. La empresa no debe ser reincidente en la misma falta.
2. Debe presentar un plan de regularización inmediata acreditando que cuenta con su Registro de Actividades de Tratamiento (RAT).
3. Debe subsanar la controversia que dio origen a la denuncia en el plazo otorgado por la Agencia.

En conclusión: si una Pyme es denunciada y no tiene su RAT documentado (Art. 14 ter), no puede acreditar diligencia y la APDP procederá a aplicar multas graves que parten en los cientos de millones de pesos.`,
    articulosRelacionados: ['Ley 20.416', 'Art. 14 ter', 'Art. 48'],
    enlaceAccionTexto: 'Construir Ficha RAT en 3 minutos con IA',
    enlaceAccionDestino: 'agente-rat',
  },
  {
    id: 'post-bloqueo-2dias',
    slug: 'sla-2-dias-habiles-bloqueo-temporal-art-10-bis',
    categoria: 'Derechos ARCOP',
    tagBadge: 'SLA CRÍTICO: 48 HORAS',
    titulo: 'El SLA de 2 días hábiles para Bloqueo Temporal: El plazo más desafiante de la Ley 21.719',
    bajada: 'Mientras que responder un derecho ARCOP da 30 días de margen, congelar un dato en disputa exige actuar en 48 horas hábiles.',
    fecha: 'Septiembre 2026',
    lecturaMin: '4 min',
    autor: 'Unidad de Derechos ARCOP',
    resumenPuntos: [
      'Plazo perentorio de 2 días hábiles normado en el Art. 10 bis para cesar el uso de los datos objetados.',
      'Afecta tanto a marketing como a cobranzas y antecedentes de trabajadores en litigio.',
      'Requiere saber de antemano en qué planillas, servidores o CRMs están guardados los datos.',
    ],
    contenidoCompleto: `Uno de los mayores errores que cometen los equipos de gerencia y operaciones al estudiar la Ley 21.719 es asumir que todas las solicitudes de los titulares cuentan con un plazo de 30 días corridos para ser resueltas.

El Artículo 10 bis introduce una excepción perentoria: el derecho de Bloqueo Temporal.

¿Cuándo procede el Bloqueo Temporal?
• Cuando el titular alegue que los datos personales en poder de la empresa son inexactos.
• Cuando reclame que el tratamiento es ilícito y prefiera suspender el uso en vez de la supresión definitiva mientras se investiga.
• Cuando la empresa ya no necesite los datos, pero el titular los requiera para entablar o defender reclamaciones legales.

¿Qué debe hacer la empresa en 2 días hábiles?
Debe aislar técnicamente los datos del titular de modo que ningún colaborador, sistema automatizado ni proveedor externo pueda acceder a ellos ni utilizarlos para llamadas, correos o procesamiento comercial.

Si la empresa no cuenta con un RAT que indique con exactitud la ubicación de los datos, cumplir este plazo resulta materialmente imposible.`,
    articulosRelacionados: ['Art. 10 bis', 'Art. 11', 'Art. 14 ter'],
    enlaceAccionTexto: 'Revisar Catálogo y Modelos ARCOP',
    enlaceAccionDestino: 'derechos-arcop',
  },
  {
    id: 'post-accountability-rat',
    slug: 'principio-de-responsabilidad-proactiva-accountability',
    categoria: 'Compliance & RAT',
    tagBadge: 'TRAMO 1 OBLIGATORIO',
    titulo: 'Responsabilidad Proactiva (Accountability): Por qué el inventario RAT es ineludible',
    bajada: 'Ya no basta con decir que cumples: la ley invierte la carga probatoria y exige demostrarlo documentalmente ante la APDP.',
    fecha: 'Agosto 2026',
    lecturaMin: '5 min',
    autor: 'Equipo Legal leydedatospersonaleschile.cl',
    resumenPuntos: [
      'Inversión de la carga de la prueba: La empresa debe probar documentalmente que trata los datos de forma lícita.',
      'El RAT (Art. 14 ter) es la piedra angular para identificar datos comunes y sensibles (salud, huellas, RUT).',
      'Sin inventario, no es posible fundamentar las bases de licitud del Art. 12 y 13 ante una auditoría.',
    ],
    contenidoCompleto: `El Artículo 4 letra f) de la Ley 21.719 consagra formalmente el principio de "responsabilidad proactiva", conocido en el derecho comparado internacional como *accountability*.

Este principio transforma la relación entre las empresas y la fiscalización: ya no es la autoridad quien debe descubrir irregularidades, sino la empresa quien debe tener la capacidad técnica de demostrar en todo momento que cumple con los estándares legales.

El corazón indiscutible de la responsabilidad proactiva es el Registro de Actividades de Tratamiento (RAT - Art. 14 ter):
1. Finalidades Explícitas: Debe individualizar el propósito exacto de cada flujo (nóminas, CRM, facturación electrónica, ecommerce, cámaras CCTV).
2. Base de Licitud: Debe fundamentar si el tratamiento descansa en el consentimiento libre e informado (Art. 12), en la ejecución de un contrato (Art. 13 letra a) o en un mandato legal expreso (Art. 13 letra b).
3. Clasificación de Sensibles: Debe catalogar con medidas de cifrado reforzadas los datos de salud (licencias médicas) y biométricos (huellas de reloj control).

Nuestro Agente de IA para el RAT reemplaza consultorías tradicionales de meses mediante una entrevista de 3 minutos que genera este expediente oficial.`,
    articulosRelacionados: ['Art. 4 letra f', 'Art. 12', 'Art. 13', 'Art. 14 ter'],
    enlaceAccionTexto: 'Generar Ficha RAT oficial con IA',
    enlaceAccionDestino: 'agente-rat',
  },
  {
    id: 'post-modelo-prevencion',
    slug: 'modelos-de-prevencion-de-infracciones-y-dpo',
    categoria: 'Modelos de Prevención',
    tagBadge: 'ATENUANTE MUY CALIFICADA',
    titulo: 'Modelos de Prevención de Infracciones: La atenuante legal para rebajar multas o eximir culpas',
    bajada: 'De forma análoga a la Ley 20.393 penal corporativa, la Ley 21.719 premia a las organizaciones con programas formales de compliance.',
    fecha: 'Julio 2026',
    lecturaMin: '4 min',
    autor: 'Consultoría Legal Corporativa',
    resumenPuntos: [
      'Atenuante muy calificada que puede rebajar las multas pecuniarias de la APDP hasta en un 50% o más.',
      'Designación de un Delegado de Protección de Datos (DPO) interno o externalizado.',
      'Protocolos claros para la gestión de incidentes y resolución oportuna de derechos ARCOP.',
    ],
    contenidoCompleto: `El Artículo 49 de la Ley 21.719 establece un incentivo decisivo para la autorregulación: la existencia y adopción eficaz de un "Modelo de Prevención de Infracciones" constituye una circunstancia atenuante muy calificada para graduar cualquier sanción impuesta por la APDP.

Elementos esenciales de un Modelo de Prevención eficaz:
1. Designación de un Oficial o Delegado de Protección de Datos (DPO) dotado de autonomía y recursos suficientes.
2. Mantenimiento y actualización continua del Registro de Actividades de Tratamiento (RAT).
3. Procedimientos formales de auditoría periódica y capacitación continua de colaboradores que manipulen bases de clientes o trabajadores.
4. Cláusulas contractuales estrictas de encargado de datos con proveedores externos de nube, software y contabilidad.

Para las Pymes chilenas, contar con este modelo demuestra buena fe y diligencia debida, transformando un potencial riesgo patrimonial en una ventaja competitiva y de confianza comercial.`,
    articulosRelacionados: ['Art. 49', 'Art. 25 a 30', 'Art. 14 ter'],
    enlaceAccionTexto: 'Realizar Test de Preparación Pyme',
    enlaceAccionDestino: 'test-cumplimiento',
  },
  {
    id: 'post-ciberseguridad-reglamentos',
    slug: 'ciberseguridad-y-notificacion-de-brechas-en-72-horas',
    categoria: 'Ciberseguridad & Reglamentos',
    tagBadge: 'MEDIDAS TÉCNICAS',
    titulo: 'Ciberseguridad y Notificación de Brechas en 72 horas ante la APDP',
    bajada: 'Toda filtración, hackeo o extravío de datos sensibles debe ser comunicado a la Agencia y a los titulares afectados sin dilación indebida.',
    fecha: 'Junio 2026',
    lecturaMin: '4 min',
    autor: 'Área de Seguridad de la Información',
    resumenPuntos: [
      'Obligación de notificar incidentes de seguridad y fugas de datos en un plazo máximo de 72 horas hábiles.',
      'Exigencia de medidas técnicas proporcionales: autenticación de doble factor (MFA) y cifrado en tránsito.',
      'Ocultar una brecha de seguridad tipifica como infracción gravísima sancionada con hasta 20.000 UTM.',
    ],
    contenidoCompleto: `La Ley 21.719 no solo regula aspectos jurídicos y contractuales, sino que consagra el deber técnico de ciberseguridad sobre cualquier activo digital que contenga datos personales.

Principales obligaciones de seguridad:
1. Deber de Notificación de Brechas: Si la empresa sufre un ataque de ransomware, filtración de credenciales o extravío de equipos con datos de clientes, debe notificar formalmente a la APDP dentro de las 72 horas siguientes a haber tomado conocimiento del hecho.
2. Comunicación a los Titulares: Si la filtración involucra datos sensibles (salud, biometría, RUT o datos financieros), la empresa debe informar a los afectados con recomendaciones de mitigación.
3. Medidas Técnicas Mínimas: Contraseñas robustas, autenticación multifactor (MFA) en accesos a nubes y copias de seguridad inmutables.

La omisión maliciosa o negligente de notificar una brecha constituye una infracción gravísima que expone a la empresa a las multas más elevadas de la legislación chilena.`,
    articulosRelacionados: ['Art. 4 letra e', 'Art. 20 y 21', 'Art. 43'],
    enlaceAccionTexto: 'Ver Casos Reales en Pymes',
    enlaceAccionDestino: 'casos-pymes',
  },
];
