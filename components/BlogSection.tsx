import React, { useState } from 'react';
import { PageId } from '../types';

interface ArticuloBlog {
  id: string;
  categoria: string;
  titulo: string;
  fecha: string;
  lecturaMin: string;
  extracto: string;
  contenidoCompleto: string;
  enlaceInternoTexto: string;
  enlaceInternoDestino: PageId;
}

const ARTICULOS_ESPECIALIZADOS: ArticuloBlog[] = [
  {
    id: 'art-apdp-fiscalizacion',
    categoria: 'Fiscalización & APDP',
    titulo: 'Cómo fiscalizará la Agencia de Protección de Datos Personales (APDP) en Chile',
    fecha: 'Marzo 2026',
    lecturaMin: '4 min de lectura',
    extracto: 'La nueva autoridad contará con potestad de allanamiento, auditorías de oficio, aplicación de medidas cautelares y cobranza de multas en UTM.',
    contenidoCompleto: `La creación de la Agencia de Protección de Datos Personales (APDP) marca un hito histórico en Chile, terminando con la ineficacia de la antigua Ley 19.628 donde los titulares debían acudir a tribunales civiles ordinarios.

La APDP cuenta con facultades expresas para:
1. Iniciar investigaciones de oficio o por denuncias ciudadanas a través de su portal electrónico.
2. Dictar instrucciones generales, circulares vinculantes y guías técnicas de obligado cumplimiento.
3. Decretar medidas cautelares inmediatas, como la suspensión temporal del tratamiento de datos o el bloqueo de servidores.
4. Aplicar sanciones de hasta 20.000 UTM o el 4% de las ventas anuales en casos gravísimos o de reincidencia.

Para una Pyme, la primera defensa legal frente a un requerimiento de la APDP consiste en exhibir el Registro de Actividades de Tratamiento (RAT) del Artículo 14 ter, requisito sin el cual se presume la falta de diligencia.`,
    enlaceInternoTexto: 'Calcular sanciones en el Simulador de Multas UTM',
    enlaceInternoDestino: 'multas-utm',
  },
  {
    id: 'art-accountability-rat',
    categoria: 'Compliance & RAT',
    titulo: 'El Principio de Responsabilidad Proactiva (Accountability): Por qué el RAT es ineludible',
    fecha: 'Febrero 2026',
    lecturaMin: '5 min de lectura',
    extracto: 'Ya no basta con decir que cumples: la ley exige demostrar y documentar cada tratamiento mediante el inventario formal del Artículo 14 ter.',
    contenidoCompleto: `El Artículo 4 letra f) de la Ley 21.719 consagra el principio de "responsabilidad proactiva", también conocido internacionalmente como accountability. Este principio invierte la carga de la prueba: es la empresa quien debe demostrar con documentación técnica previa que trata los datos de forma lícita, segura y proporcional.

El corazón de este deber es el Registro de Actividades de Tratamiento (RAT), normado en el Artículo 14 ter:
• Debe identificar con exactitud qué datos se recopilan (especialmente categorías sensibles como salud, biometría o RUT).
• Debe asociar a cada proceso una base de licitud válida del Artículo 12 o 13 (consentimiento, contrato laboral o mandato legal).
• Debe definir los plazos de supresión y las medidas técnicas de seguridad implementadas.

Sin un RAT documentado, las empresas pierden automáticamente el beneficio de amonestación del Estatuto Pyme (Ley 20.416).`,
    enlaceInternoTexto: 'Generar Ficha RAT oficial en 3 minutos con el Agente IA',
    enlaceInternoDestino: 'agente-rat',
  },
  {
    id: 'art-modelo-prevencion',
    categoria: 'Modelos de Prevención',
    titulo: 'Modelos de Prevención de Infracciones: La atenuante legal ante infracciones graves',
    fecha: 'Enero 2026',
    lecturaMin: '4 min de lectura',
    extracto: 'La Ley 21.719 premia a las empresas que adopten programas de cumplimiento corporativo y designen un Delegado de Protección de Datos (DPO).',
    contenidoCompleto: `De manera análoga a la Ley 20.393 sobre responsabilidad penal de las personas jurídicas, la Ley 21.719 establece que la existencia y adopción eficaz de un "Modelo de Prevención de Infracciones" constituye una circunstancia atenuante muy calificada para rebajar multas o eximir de responsabilidad.

Un modelo de prevención eficaz debe contar con:
1. Designación de un encargado de prevención o Delegado de Protección de Datos (DPO).
2. Protocolos formales para la recepción y resolución de derechos ARCOP en los plazos legales (2 días para bloqueo, 30 días para acceso).
3. Mecanismos de auditoría periódica y actualización continua del RAT.
4. Cláusulas contractuales estrictas con los encargados de tratamiento (proveedores de hosting, nóminas y marketing).`,
    enlaceInternoTexto: 'Revisar plazos legales en el Gestor de Derechos ARCOP',
    enlaceInternoDestino: 'derechos-arcop',
  },
];

interface BlogSectionProps {
  onNavigate?: (page: PageId) => void;
  onScrollTo?: (id: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onNavigate, onScrollTo }) => {
  const [articuloAbierto, setArticuloAbierto] = useState<string | null>(null);

  const handleLinkClick = (destino: PageId) => {
    setArticuloAbierto(null);
    if (onNavigate) {
      onNavigate(destino);
    } else if (onScrollTo) {
      onScrollTo(destino);
    }
  };

  return (
    <section id="guias-recursos" aria-labelledby="heading-blog" className="py-14 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">menu_book</span>
              <span>AUTORIDAD TEMÁTICA & ANÁLISIS E-E-A-T</span>
            </div>
            <h2 id="heading-blog" className="text-2xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
              Guías y Recursos Especializados
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Análisis jurídicos y operativos sobre dictámenes, modelos de prevención y reglamentos de la Ley 21.719 en Chile.
            </p>
          </div>

          <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-300 self-start md:self-auto">
            Actualización Continua
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICULOS_ESPECIALIZADOS.map((art) => (
            <article
              key={art.id}
              className="bg-zinc-50 p-6 rounded-3xl border-2 border-zinc-200 flex flex-col justify-between hover:border-zinc-400 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {art.categoria}
                  </span>
                  <span className="text-zinc-400">{art.lecturaMin}</span>
                </div>

                <h3 className="text-base sm:text-lg font-display font-black text-zinc-950 mb-2 leading-snug">
                  {art.titulo}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed font-normal mb-4">
                  {art.extracto}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200 space-y-3">
                <button
                  type="button"
                  onClick={() => setArticuloAbierto(art.id)}
                  className="text-xs font-bold text-zinc-950 hover:text-orange-600 flex items-center gap-1 transition-colors"
                >
                  <span>Leer análisis completo</span>
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLinkClick(art.enlaceInternoDestino)}
                  className="w-full text-left text-[11px] font-mono text-orange-700 bg-orange-50/80 p-2 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors block"
                >
                  → {art.enlaceInternoTexto}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Lectura Completa */}
        {articuloAbierto && (() => {
          const art = ARTICULOS_ESPECIALIZADOS.find(a => a.id === articuloAbierto);
          if (!art) return null;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
              <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
                  <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {art.categoria}
                  </span>
                  <button
                    type="button"
                    onClick={() => setArticuloAbierto(null)}
                    className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 flex items-center justify-center text-sm font-bold"
                    aria-label="Cerrar artículo"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-black text-zinc-950 mb-4">
                  {art.titulo}
                </h3>

                <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4 whitespace-pre-line font-normal">
                  {art.contenidoCompleto}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleLinkClick(art.enlaceInternoDestino)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
                  >
                    {art.enlaceInternoTexto} →
                  </button>
                  <button
                    type="button"
                    onClick={() => setArticuloAbierto(null)}
                    className="text-xs font-mono text-zinc-500 hover:text-zinc-900"
                  >
                    Cerrar lectura
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};

export default BlogSection;
