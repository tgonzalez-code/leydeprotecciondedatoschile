import React, { useState } from 'react';
import { PageId } from '../types';

interface TimelineEvent {
  fase: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  estado: 'Completado' | 'En curso' | 'Próximo hito' | 'Plena vigencia';
  articulosClave: string[];
  impactoEmpresa: string;
}

const HITOS_LEY: TimelineEvent[] = [
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

interface TimelineVigenciaProps {
  onNavigate?: (page: PageId) => void;
}

const TimelineVigencia: React.FC<TimelineVigenciaProps> = ({ onNavigate }) => {
  const [selectedHito, setSelectedHito] = useState<number>(1);

  return (
    <section id="timeline-ley" aria-labelledby="heading-timeline" className="py-14 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-200 text-xs font-mono font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm text-orange-600" aria-hidden="true">event_repeat</span>
              <span>CALENDARIO DE APLICACIÓN GRADUAL</span>
            </div>
            <h2 id="heading-timeline" className="text-2xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
              Línea de Tiempo: Entrada en Vigencia Ley 21.719
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-1 max-w-2xl font-normal">
              Conoce los plazos oficiales de vacancia legal, instalación de la APDP y fecha límite para que tu empresa esté regularizada.
            </p>
          </div>

          <span className="text-xs font-mono text-zinc-500 bg-white px-3 py-1.5 rounded-lg border border-zinc-300 self-start md:self-auto">
            Plazo de Adecuación: 24 meses
          </span>
        </div>

        {/* Timeline Horizontal / Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {HITOS_LEY.map((hito, idx) => {
            const isSelected = selectedHito === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedHito(idx)}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'bg-white border-orange-500 shadow-lg shadow-orange-500/10'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    hito.estado === 'Completado' ? 'bg-zinc-100 text-zinc-800' :
                    hito.estado === 'En curso' ? 'bg-orange-100 text-orange-900 font-bold' :
                    hito.estado === 'Próximo hito' ? 'bg-blue-50 text-blue-900' :
                    'bg-emerald-50 text-emerald-900 font-bold'
                  }`}>
                    {hito.estado}
                  </span>
                  <span className="font-mono text-xs text-zinc-500 font-bold">{hito.fecha}</span>
                </div>

                <strong className={`block text-sm font-display font-bold mt-1 ${
                  isSelected ? 'text-zinc-950' : 'text-zinc-700'
                }`}>
                  {hito.titulo}
                </strong>

                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                  {hito.descripcion}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Hito Detailed Dossier */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-zinc-900 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4 mb-4">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                {HITOS_LEY[selectedHito].fase} • Fecha Clave: {HITOS_LEY[selectedHito].fecha}
              </span>
              <h3 className="text-xl font-display font-black text-zinc-950 mt-0.5">
                {HITOS_LEY[selectedHito].titulo}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {HITOS_LEY[selectedHito].articulosClave.map((art, i) => (
                <span key={i} className="text-xs font-mono bg-zinc-100 text-zinc-800 px-2 py-1 rounded border border-zinc-300">
                  {art}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <strong className="block text-zinc-900 font-bold uppercase font-mono text-xs mb-1">
                Alcance Institucional y Legal:
              </strong>
              <p className="text-zinc-600 leading-relaxed font-normal">
                {HITOS_LEY[selectedHito].descripcion}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <strong className="block text-orange-950 font-bold uppercase font-mono text-xs mb-1">
                Impacto Operativo para tu Empresa:
              </strong>
              <p className="text-zinc-800 leading-relaxed font-medium">
                {HITOS_LEY[selectedHito].impactoEmpresa}
              </p>
            </div>
          </div>

          {onNavigate && (
            <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-zinc-500 font-mono">
                ¿Tu empresa ya cuenta con el inventario del Art. 14 ter exigido para el Hito 3 y 4?
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('agente-rat')}
                  className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md shadow-orange-500/20 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  <span>Generar RAT con IA (3 min)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('multas-utm')}
                  className="inline-flex items-center gap-1 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 font-mono text-xs font-bold px-3 py-2 rounded-xl transition-all"
                >
                  <span>Simular Multas</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default TimelineVigencia;
