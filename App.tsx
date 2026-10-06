import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TimelineVigencia from './components/TimelineVigencia';
import ComplianceChecklist from './components/ComplianceChecklist';
import Features from './components/Features';
import RatAgentWizard from './components/RatAgentWizard';
import UTMCalculator from './components/UTMCalculator';
import ArcoManager from './components/ArcoManager';
import LabSection from './components/LabSection';
import LegalArticlesGuide from './components/LegalArticlesGuide';
import BlogSection from './components/BlogSection';
import FloatingNav from './components/FloatingNav';
import AIAssistantModal from './components/AIAssistantModal';
import Footer from './components/Footer';
import { PageId } from './types';

const VALID_PAGES: PageId[] = [
  'inicio',
  'ley-21719',
  'agente-rat',
  'derechos-arcop',
  'multas-utm',
  'test-cumplimiento',
  'casos-pymes',
  'guias-recursos',
  'compendio-legal',
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace(/^#\/?/, '') as PageId;
    return VALID_PAGES.includes(hash) ? hash : 'inicio';
  });

  const [isAiOpen, setIsAiOpen] = useState(false);

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '') as PageId;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      } else if (!window.location.hash || window.location.hash === '#/' || window.location.hash === '#') {
        setCurrentPage('inicio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const pageNames: Record<PageId, { title: string; subtitle: string }> = {
    'inicio': { 
      title: 'Portal Ley de Protección de Datos Personales Chile', 
      subtitle: 'Cumplimiento oficial Ley 21.719 y Agente RAT con IA' 
    },
    'ley-21719': { 
      title: 'La Ley 21.719 & Calendario de Vigencia', 
      subtitle: 'Plazos legales, vacancia de 24 meses e instalación de la APDP' 
    },
    'agente-rat': { 
      title: 'Agente de IA para el Registro RAT (Art. 14 ter)', 
      subtitle: 'Entrevista de 3 minutos para generar la Ficha Oficial para la APDP' 
    },
    'derechos-arcop': { 
      title: 'Catálogo de Derechos ARCOP & Monitoreo de SLAs', 
      subtitle: 'SLA crítico de 2 días para Bloqueo Temporal y 30 días para ARCOP+' 
    },
    'multas-utm': { 
      title: 'Simulador de Sanciones y Multas en UTM', 
      subtitle: 'Régimen sancionatorio de la APDP y Beneficio Pyme (Ley 20.416)' 
    },
    'test-cumplimiento': { 
      title: 'Test Diagnóstico de Cumplimiento', 
      subtitle: 'Evalúa en 60 segundos el nivel de riesgo y preparación de tu empresa' 
    },
    'casos-pymes': { 
      title: 'Casos Prácticos en Pymes Chilenas', 
      subtitle: 'Situaciones operativas cotidianas: huellas, marketing y bloqueos' 
    },
    'guias-recursos': { 
      title: 'Guías Especializadas, Artículos & Recursos', 
      subtitle: 'Análisis de fiscalización, accountability y modelos de prevención' 
    },
    'compendio-legal': { 
      title: 'Compendio Normativo Interactivo Ley 21.719', 
      subtitle: 'Articulado completo con comentarios de aplicación práctica' 
    },
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAiChat={() => setIsAiOpen(true)}
      />

      {/* Page Breadcrumb (for subpages) */}
      {currentPage !== 'inicio' && (
        <div className="bg-zinc-50 border-b border-zinc-200 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-500">
              <button 
                onClick={() => handleNavigate('inicio')}
                className="hover:text-orange-600 transition-colors flex items-center gap-1 font-bold text-zinc-700"
              >
                <span className="material-symbols-outlined text-sm">home</span>
                <span>Inicio</span>
              </button>
              <span className="text-zinc-300">/</span>
              <span className="text-orange-600 font-bold truncate max-w-xs sm:max-w-md">
                {pageNames[currentPage]?.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {currentPage !== 'agente-rat' && (
                <button
                  onClick={() => handleNavigate('agente-rat')}
                  className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-xs">psychology</span>
                  <span>Agente RAT (3 min)</span>
                </button>
              )}
              <button
                onClick={() => setIsAiOpen(true)}
                className="inline-flex items-center gap-1 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-xs text-orange-500">smart_toy</span>
                <span>Asistente IA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Section Page Routing */}
      <main className="flex-1">
        
        {/* VIEW 1: INICIO (Ultra-fast summary hub & executive dashboard) */}
        {currentPage === 'inicio' && (
          <div>
            <Hero
              onNavigate={handleNavigate}
              onOpenAiChat={() => setIsAiOpen(true)}
            />

            {/* 4-Step Methodology quick view */}
            <Features
              onStartRat={() => handleNavigate('agente-rat')}
            />

            {/* High Impact Conversion Callout */}
            <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white relative overflow-hidden">
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <span className="inline-block bg-orange-500 text-white font-mono text-xs font-bold px-3 py-1 rounded-full mb-3">
                  TRAMO 1 OBLIGATORIO • ARTÍCULO 14 TER
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white">
                  ¿Tu empresa está preparada para una fiscalización de la APDP?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
                  En solo 3 minutos tendrás tu Registro de Actividades de Tratamiento (RAT) listo para acreditar 
                  cumplimiento, acceder al beneficio del Estatuto Pyme y proteger a tu organización.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
                  <button
                    onClick={() => handleNavigate('agente-rat')}
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Construir RAT con IA ahora (Gratis)</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('test-cumplimiento')}
                    className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono font-bold px-6 py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-orange-400">fact_check</span>
                    <span>Test de Cumplimiento (60 seg)</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: LA LEY 21.719 (Timeline + Compendio) */}
        {currentPage === 'ley-21719' && (
          <div>
            <TimelineVigencia onNavigate={handleNavigate} />
            <LegalArticlesGuide onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

        {/* VIEW 3: AGENTE RAT (Art. 14 ter - Tramo 1 Obligatorio) */}
        {currentPage === 'agente-rat' && (
          <div>
            <Features onStartRat={() => {
              const el = document.getElementById('agente-rat');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} />
            <RatAgentWizard />
          </div>
        )}

        {/* VIEW 4: DERECHOS ARCOP & MONITOR DE SLAs */}
        {currentPage === 'derechos-arcop' && (
          <div>
            <ArcoManager onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

        {/* VIEW 5: SIMULADOR DE MULTAS UTM & APDP */}
        {currentPage === 'multas-utm' && (
          <div>
            <UTMCalculator onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

        {/* VIEW 6: TEST DE CUMPLIMIENTO */}
        {currentPage === 'test-cumplimiento' && (
          <div>
            <ComplianceChecklist onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

        {/* VIEW 7: CASOS PRÁCTICOS EN PYMES */}
        {currentPage === 'casos-pymes' && (
          <div>
            <LabSection 
              onGoToRat={() => handleNavigate('agente-rat')}
              onOpenAiChat={() => setIsAiOpen(true)}
            />
          </div>
        )}

        {/* VIEW 8: GUÍAS, ARTÍCULOS & RECURSOS */}
        {currentPage === 'guias-recursos' && (
          <div>
            <BlogSection onNavigate={handleNavigate} />
          </div>
        )}

        {/* VIEW 9: COMPENDIO LEGAL */}
        {currentPage === 'compendio-legal' && (
          <div>
            <LegalArticlesGuide onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

      </main>

      {/* Floating Bottom Navigator */}
      <FloatingNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onAiClick={() => setIsAiOpen(true)}
      />

      {/* Global Interactive AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onGoToRat={() => handleNavigate('agente-rat')}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAiChat={() => setIsAiOpen(true)}
      />

    </div>
  );
};

export default App;
